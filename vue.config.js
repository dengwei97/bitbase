/**
 * Created by Administrator on 2018/9/26.
 */
"use strict";
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/qtv-test": {
        target: 'http://wenwen.utools.club/api/v1',
        changeOrigin: true
      },
      "/api/v2": {
        target: 'http://www.kpzzhb.com',
        changeOrigin: true
      },
      "/bitpro": {
        target: 'http://www.kpzzhb.com',
        changeOrigin: true
      }

    },
    port: 8080
  },

  // baseUrl: process.env.NODE_ENV === 'production'? '/static' : './',
  // outputDir: process.env.VUE_APP_MODE === 'prod' ? './dist/prod' : './dist/test',
  productionSourceMap: false,

  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    devtool:process.env.NODE_ENV === "production" ? 'none' : 'source-map', //开启断点定位报错
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: true
            },
            // 删除console debugger 删除警告
            compress: {
              warnings: false,
              drop_console: true,//console
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      ]
    },
    plugins: []
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
      ],
    },
  },
  // publicPath: process.env.BASE_URL
};
