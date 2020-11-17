
const readline = require('readline');
const CopyWebpackPlugin = require("copy-webpack-plugin")
var path = require('path')

function readApp() {
  let tips = '请输入包名：';
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(tips, (answer) => {
      rl.close();
      let res = answer.trim().toLowerCase() || 'bitbase'
      resolve(res);
    });
  });
}


const defaults = {
  clean: true,
  target: 'app',
  formats: 'commonjs,umd,umd-min',
  'unsafe-inline': true
}

const buildModes = {
  lib: 'library',
  wc: 'web component',
  'wc-async': 'web component (async)'
}

const modifyConfig = (config, fn) => {
  if (Array.isArray(config)) {
    config.forEach(c => fn(c))
  } else {
    fn(config)
  }
}

module.exports = (api, options1) => {
  api.registerCommand('build', {
    description: 'build for production',
    usage: 'vue-cli-service build [options] [entry|pattern]',
    options: {
      '--mode': `specify env mode (default: production)`,
      '--dest': `specify output directory (default: ${options1.outputDir})`,
      '--modern': `build app targeting modern browsers with auto fallback`,
      '--no-unsafe-inline': `build app without introducing inline scripts`,
      '--target': `app | lib | wc | wc-async (default: ${defaults.target})`,
      '--inline-vue': 'include the Vue module in the final bundle of library or web component target',
      '--formats': `list of output formats for library builds (default: ${defaults.formats})`,
      '--name': `name for lib or web-component mode (default: "name" in package.json or entry filename)`,
      '--filename': `file name for output, only usable for 'lib' target (default: value of --name)`,
      '--no-clean': `do not remove the dist directory before building the project`,
      '--report': `generate report.html to help analyze bundle content`,
      '--report-json': 'generate report.json to help analyze bundle content',
      '--skip-plugins': `comma-separated list of plugin names to skip for this run`,
      '--watch': `watch for changes`
    }
  }, async (args, rawArgs) => {

    let appName = await readApp()
    let appConfig = require('../appConfig/' + appName + '/index')
    process.env.VUE_APP_NAME = appName
    process.env.VUE_APP_BASE_API = process.env.VUE_APP_MODE == 'prod' ? appConfig.baseUrl.prod : appConfig.baseUrl.test
    let options = options1
    options.outputDir = './dist/' + appName + '-officialWebsite-' + process.env.VUE_APP_MODE
    options.publicPath = process.env.VUE_APP_MODE == 'prod' ? appConfig.publicPath.prod : appConfig.publicPath.test

    // 复制favicon到根目录
    options.configureWebpack.plugins.push(
      new CopyWebpackPlugin(
        {
          patterns: [ //打包时执行拷贝
            {
              from: path.resolve(__dirname, '../appConfig/' + appName + '/source/favicon.ico'),
              to: path.resolve(__dirname, '../dist/' + appName + '-officialWebsite-' + process.env.VUE_APP_MODE + '/favicon.ico')
            }
          ]
        }
      )
    )

    options.pluginOptions['style-resources-loader'].patterns.push(path.resolve(__dirname, '../appConfig/' + appName + '/style.less'))
    // options.pages.index.faviconPath = '../appConfig/' + appName + '/source/favicon.ico'
    // return

    for (const key in defaults) {
      if (args[key] == null) {
        args[key] = defaults[key]
      }
    }
    args.entry = args.entry || args._[0]
    if (args.target !== 'app') {
      args.entry = args.entry || 'src/App.vue'
    }

    process.env.VUE_CLI_BUILD_TARGET = args.target
    if (args.modern && args.target === 'app') {
      process.env.VUE_CLI_MODERN_MODE = true
      if (!process.env.VUE_CLI_MODERN_BUILD) {
        // main-process for legacy build
        await build(Object.assign({}, args, {
          modernBuild: false,
          keepAlive: true
        }), api, options)
        // spawn sub-process of self for modern build
        const { execa } = require('../node_modules/@vue/cli-shared-utils')
        const cliBin = require('path').resolve(__dirname, '../node_modules/@vue/cli-service/bin/vue-cli-service.js')
        await execa(cliBin, ['build', ...rawArgs], {
          stdio: 'inherit',
          env: {
            VUE_CLI_MODERN_BUILD: true
          }
        })
      } else {
        // sub-process for modern build
        await build(Object.assign({}, args, {
          modernBuild: true,
          clean: false
        }), api, options)
      }
      delete process.env.VUE_CLI_MODERN_MODE
    } else {
      if (args.modern) {
        const { warn } = require('../node_modules/@vue/cli-shared-utils')
        warn(
          `Modern mode only works with default target (app). ` +
          `For libraries or web components, use the browserslist ` +
          `config to specify target browsers.`
        )
      }
      await build(args, api, options)
    }
    delete process.env.VUE_CLI_BUILD_TARGET
  })
}

async function build(args, api, options) {
  const fs = require('fs-extra')
  const path = require('path')
  const webpack = require('webpack')
  const { chalk } = require('../node_modules/@vue/cli-shared-utils')
  const formatStats = require('../node_modules/@vue/cli-service/lib/commands/build/formatStats')
  const validateWebpackConfig = require('../node_modules/@vue/cli-service/lib/util/validateWebpackConfig')
  const {
    log,
    done,
    info,
    logWithSpinner,
    stopSpinner
  } = require('../node_modules/@vue/cli-shared-utils')

  log()
  const mode = api.service.mode
  if (args.target === 'app') {
    const bundleTag = args.modern
      ? args.modernBuild
        ? `modern bundle `
        : `legacy bundle `
      : ``
    logWithSpinner(`Building ${bundleTag}for ${mode}...`)
  } else {
    const buildMode = buildModes[args.target]
    if (buildMode) {
      const additionalParams = buildMode === 'library' ? ` (${args.formats})` : ``
      logWithSpinner(`Building for ${mode} as ${buildMode}${additionalParams}...`)
    } else {
      throw new Error(`Unknown build target: ${args.target}`)
    }
  }

  if (args.dest) {
    // Override outputDir before resolving webpack config as config relies on it (#2327)
    options.outputDir = args.dest
  }

  const targetDir = api.resolve(options.outputDir)
  const isLegacyBuild = args.target === 'app' && args.modern && !args.modernBuild

  // resolve raw webpack config
  let webpackConfig
  if (args.target === 'lib') {
    webpackConfig = require('../node_modules/@vue/cli-service/lib/commands/build/resolveLibConfig')(api, args, options)
  } else if (
    args.target === 'wc' ||
    args.target === 'wc-async'
  ) {
    webpackConfig = require('../node_modules/@vue/cli-service/lib/commands/build/resolveWcConfig')(api, args, options)
  } else {
    webpackConfig = require('../node_modules/@vue/cli-service/lib/commands/build/resolveAppConfig')(api, args, options)
  }

  // check for common config errors
  validateWebpackConfig(webpackConfig, api, options, args.target)

  if (args.watch) {
    modifyConfig(webpackConfig, config => {
      config.watch = true
    })
  }

  // Expose advanced stats
  if (args.dashboard) {
    const DashboardPlugin = require('../node_modules/@vue/cli-service/lib/webpack/DashboardPlugin')
    modifyConfig(webpackConfig, config => {
      config.plugins.push(new DashboardPlugin({
        type: 'build',
        modernBuild: args.modernBuild,
        keepAlive: args.keepAlive
      }))
    })
  }

  if (args.report || args['report-json']) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    modifyConfig(webpackConfig, config => {
      const bundleName = args.target !== 'app'
        ? config.output.filename.replace(/\.js$/, '-')
        : isLegacyBuild ? 'legacy-' : ''
      config.plugins.push(new BundleAnalyzerPlugin({
        logLevel: 'warn',
        openAnalyzer: false,
        analyzerMode: args.report ? 'static' : 'disabled',
        reportFilename: `${bundleName}report.html`,
        statsFilename: `${bundleName}report.json`,
        generateStatsFile: !!args['report-json']
      }))
    })
  }

  if (args.clean) {
    await fs.remove(targetDir)
  }

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      stopSpinner(false)
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        return reject(`Build failed with errors.`)
      }

      if (!args.silent) {
        const targetDirShort = path.relative(
          api.service.context,
          targetDir
        )
        log(formatStats(stats, targetDirShort, api))
        if (args.target === 'app' && !isLegacyBuild) {
          if (!args.watch) {
            done(`Build complete. The ${chalk.cyan(targetDirShort)} directory is ready to be deployed.`)
            info(`Check out deployment instructions at ${chalk.cyan(`https://cli.vuejs.org/guide/deployment.html`)}\n`)
          } else {
            done(`Build complete. Watching for changes...`)
          }
        }
      }

      // test-only signal
      if (process.env.VUE_CLI_TEST) {
        console.log('Build complete.')
      }

      resolve()
    })
  })
}

module.exports.defaultModes = {
  build: 'production'
}
