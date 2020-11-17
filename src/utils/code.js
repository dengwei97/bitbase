/**
* 这里配置项目请求返回状态码
*/

const Code = {

  /** 成功 */
  SUCC: 0,

  /** 失败 */
  FAIL: 1,

  /** 未登录 */
  UNAUTHEN: 401,

  /** 未授权，拒绝访问 */
  UNAUTHZ: 4403,

  /** session超时退出了登录 */
  SESSION_TIMOUT: 401,

  /** 服务端异常 */
  SERVER_ERR: 5500

}

export default Code

