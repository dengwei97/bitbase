/**
 * 项目配置文件
 * @param index 项目序号
 * @param name 名字
 * @param webName 项目代号
 * @param reg 用于地址栏匹配的正则表达式
 * @param url 请求URl
 *
 */
function isHTTPS() {
  return /^https/i.test(location.href);
}
function getHost() {
  const host = location.host;
  if (
    /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test()
  ) {
    return host;
  } else if (!/yykik/.test(host)) {
    if (/^www./.test(host)) {
      return host;
    } else {
      return 'www.' + host;
    }
  } else {
    return host;
  }
}
const isProduction = process.env.NODE_ENV === "production"
export default {
  name: "pockhash",
  webName: "bzhb",
  reg: /\/bzhb/,
  // url: isProduction ? '/api/v2' : '/api/v2',
  url: isProduction ? '/app' : '/app'
}
