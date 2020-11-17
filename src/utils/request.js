import axios from "axios"
import Vue from "vue"
import { Toast } from "vant"
Vue.use(Toast)
import { Loading } from "element-ui"
import Code from "@/utils/code"
import router from "@/router"
import { ismobile } from "./index";
import store from "@/store"
// import { getToken } from "@/utils/auth"

let loading

// 序列化参数
function objectToFormData(obj, rootName, ignoreList) {
  var formData = new FormData()

  function appendFormData(data, root) {
    if (!ignore(root)) {
      root = root || ""
      if (data instanceof File) {
        formData.append(root, data)
      } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          appendFormData(data[i], root + "[" + i + "]")
        }
      } else if (typeof data === "object" && data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (root === "") {
              appendFormData(data[key], key)
            } else {
              appendFormData(data[key], root + "." + key)
            }
          }
        }
      } else {
        if (data !== null && typeof data !== "undefined" && data !== "") {
          formData.append(root, data)
        }
      }
    }
  }

  function ignore(root) {
    return (
      Array.isArray(ignoreList) &&
      ignoreList.some(function(x) {
        return x === root
      })
    );
  }

  appendFormData(obj, rootName)
  return formData
}

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 30000, // request timeout
  xsrfCookieName: "JSESSIONID",
  withCredentials: false // 使前台能够保存cookie
})

// request interceptor
request.interceptors.request.use(
  config => {
    config.data = config.data || {}
    config.params = config.params || {}
    if (config.data && config.data.ajaxLoading) {
      loading = Loading.service({
        lock: true,
        body: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0)"
      })
      delete config.data.ajaxLoading
    }
    if (localStorage.getItem("lang")) {
      config.headers["lang"] = localStorage.getItem("lang") || 'zh'
    }
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = localStorage.getItem("token")
    }
    // 是否需要序列化数据
    if (config.data && config.data.processData) {
      delete config.data.processData
      config.data = objectToFormData(config.data)
    }
    // console.log(config.data, config.params, config.url)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
request.interceptors.response.use(
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   * 根据项目实际情况，判定返回状态，再调起回调
   */
  res => {
    if (loading) {
      loading.close()
    }
    if (res.data.code === 0) {
      // 如果后台返回的json显示成功，pass
      return res
    } else {
      // if (res.data.code === 401 || res.data.code === 4403) {
      //   localStorage.removeItem("token")
      //   router.replace("/login")
      // } else {
      //   // Toast({ message: res.data.message })
      //   // router.push("/login")
      //   // 其它错误弹出错误信息
      //   console.log(res.data.message)
      // }
      if (res.data.code === 10001) {
        Toast({ message: '用户未登陆或者登陆信息过期，请退出后重新进入' })
        localStorage.removeItem("token")
        store.state.user.isToken = ''
        if (ismobile()) {
          router.push({
            path: '/mlogin'
          })
        } else {
          router.push({
            path: '/login'
          })
        }
      } else {
        // Toast({ message: res.data.message })
        // router.push("/login")
        // 其它错误弹出错误信息
        console.log(res.data.message)
      }
      return Promise.reject(res)
    }
  },

  /**
   * 请求发生错误，一般都是服务器抛异常了
   */
  error => {
    // localStorage.removeItem("token");
    console.error("request err: %o", error.message)
    Toast({ message: error.message })
    return Promise.reject(error)
  }
)

export { request }
