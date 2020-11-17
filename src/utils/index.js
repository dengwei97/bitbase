/**
 * Created by jiachenpan on 16/11/18.
 */
import Vue from "vue";
import userInfoApi from "@/api/userInfo"
import orderInfoApi from "@/api/orderInfo";
import axios from "axios";

const app = process.env.VUE_APP_NAME
const appConfig = require('../../appConfig/' + app + '/index')
// 多语
// import VueI18n from "vue-i18n";
// import messages from "../assets/lang/index";

// 刷新组件
// Vue.use(VueI18n);
// /*vue上挂在vant i18n方法*/
// const i18n = new VueI18n({
//   // 定义默认语言
//   locale: localStorage.getItem("lang") || "ja",
//   messages
// });
/**
 * 时间转化为指定格式
 * @param {number} time 时间戳
 * @param {string} cFormat 时间格式
 *
 */

export const parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  if (!time) return null
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
  let date
  if (typeof time === "object") {
    date = time
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === "a") return ["一", "二", "三", "四", "五", "六", "日"][value - 1]
    if (result.length > 0 && value < 10) {
      value = "0" + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 显示与当前时间差的方法
 * @param {number} time 时间戳
 * @param {string} option 时间格式
 */

export function formatTime(time, option) {
  time = time - 0
  const now = Date.now()
  if (time * 1000 < now) {
    time = time * 1000
  }
  const d = new Date(time)
  const diff = (now - d) / 1000

  if (diff < 30) {
    return diff + (i18n.messages[i18n.locale]['秒'] || '秒')
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + (i18n.messages[i18n.locale]['分钟前'] || '分钟前')
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + (i18n.messages[i18n.locale]['小时前'] || '小时前')
  } else if (diff < 3600 * 24 * 2) {
    return (i18n.messages[i18n.locale]['1天前'] || '1天前')
  }
  return parseTime(time, option)
  // if (option) {
  //   return parseTime(time, option)
  // } else {
  //   return d.getMonth() + 1 + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分"
  // }
}

// 判断时间是不是今天
export function isDay(time) {
  time = time - 0
  const now = Date.now()
  if (time * 1000 < now) {
    time = time * 1000
  }
  const d = new Date(time)
  if (new Date().getFullYear() === d.getFullYear() && new Date().getMonth() === d.getMonth() && new Date().getDate() === d.getDate()) {
    return true
  } else {
    return false
  }
}

/**
 * 获取url所有参数方法
 * @param {string} url Url地址
 */

export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf("?") + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number}  value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ""
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ""
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
    })
  ).join("&")
}

export function param2Obj(url) {
  const search = url.split("?")[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement("div")
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== "object") {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += "" + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: "今天",
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit("pick", [start, end])
    }
  },
  {
    text: "最近一周",
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit("pick", [start, end])
    }
  },
  {
    text: "最近一个月",
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit("pick", [start, end])
    }
  },
  {
    text: "最近三个月",
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit("pick", [start, end])
    }
  }
]

export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 深度克隆
 * @param {object} source 时间戳
 */

export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone")
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 清空对象所有属性
 * @param temp
 */
export function resetTemp(temp) {
  for (const prop in temp) {
    temp[prop] = null
  }
  return temp
}

export const tool = {
  /**
   * 是否去除所有空格
   * @param str
   * @param is_global 如果为g或者G去除所有的
   * @returns
   */
  Trim(str, is_global = "g") {
    var result
    result = str.replace(/(^\s+)|(\s+$)/g, "")
    if (is_global.toLowerCase() === "g") {
      result = result.replace(/\s/g, "")
    }
    return result
  },
  /**
   *@desc 格式处理方法
   *@author
   *@date 2020/01/11 17:47:31
   */
  priceFormat(num, len = 5) {
    let value = num - 0
    if (isNaN(value)) {
      return num
    }
    let isPositive = true
    if (value >= 0) {
      isPositive = true
    } else {
      value = 0 - value
      isPositive = false
    }
    let returnData
    if (value > 1) {
      returnData = value.toFixed(len) - 0
    } else if (value < 1 && value > 0.000001) {
      // 最多保留两位有效数字
      const valueString = value.toString().split("")
      let index = 0
      let state = false
      const isSub = false
      let j = 0
      for (var i = 0; i < valueString.length; i++) {
        if (valueString[i] === ".") {
          state = true
        }
        if (state && valueString[i] !== ".") {
          j++
        }
        if (state && valueString[i] !== "." && valueString[i] !== "0") {
          index++
        }
        if (index >= len || (j >= len && index >= 1)) {
          break
        }
      }

      returnData = value.toFixed(j) - 0
    } else {
      returnData = value.toFixed(8) - 0
    }
    if (isPositive) {
      return returnData
    } else {
      return 0 - returnData
    }
  }
}

// 保留小数
export function formatNumber(num, len = 5) {
  const value = num - 0
  if (isNaN(value)) {
    return num
  }
  var toFixedNum = Number(value).toFixed(len)
  return toFixedNum
}

export function priceFormat(num, len = 5) {
  return tool.priceFormat(num, len)
}

/**
 * 电话号码隐藏处理
 */
export function hidePhoneNum(cellValue) {
  if (!cellValue) {
    return ''
  }
  if (Number(cellValue)) {
    var mobile = String(cellValue)
    var reg = /^(\d{3})\d{4,6}(\d{2})$/
    return mobile.replace(reg, '$1****$2')
  } else if (cellValue.indexOf('@') !== -1) {
    const index = cellValue.indexOf('@')
    const str = cellValue.substring(0, 1) + '****' + cellValue.substring(index)
    return str
  } else {
    return cellValue
  }
}

/**
 *@desc  根据宽度是否大于767来判断是否为移动端
 *@author 王磊
 *@date 2019/07/03 19:41:08
 */
export function ismobile() {
  return !(document.body.offsetWidth > 767);
}
/**
 * 跳转下载页
 */
export function getDownUrl() {
  orderInfoApi.getDownUrl({
    setting: "downloadUrl"
  }).then(res => {
    window.location.href = res.data.data.value
  })
}
/**
 * 调用客服
 */
export function customerService() {
  // window.location.href = config.Serviceurl
  // orderInfoApi.getCustomerInfo().then(res => {
  //   window.location.href = res.data.data
  // })

  console.log(appConfig.Serviceurl)
  // 功能模块Serviceurl start
  if (appConfig.moduleControl.Serviceurl === 1) {
    var personalInfo = JSON.parse(window.localStorage.getItem('personalInfo'))
    if (personalInfo) {
      axios.post('https://kapi.fdriu.com/call/v1/open/login', {
        merKey: "F20D12BDD67822AE",
        merSecret: "4413C263F899AFEA70AA4214AA3E21B1FD30BD68B3C6780B561A5361E3F0C7B7",
        gameId: personalInfo.userId
      }).then(res => {
        console.log(res)
        window.location.href = 'https://imh5.fdriu.com/chat?t=' + res.data.data.token
      })
    } else {
      axios.post('https://kapi.fdriu.com/call/v1/open/login', {
        merKey: "F20D12BDD67822AE",
        merSecret: "4413C263F899AFEA70AA4214AA3E21B1FD30BD68B3C6780B561A5361E3F0C7B7",
        gameId: parseInt(Math.random() * 1000000)
      }).then(res => {
        console.log(res)
        window.location.href = 'https://imh5.fdriu.com/chat?t=' + res.data.data.token
      })
    }

  } else {
    orderInfoApi.getCustomerInfo().then(res => {
      window.location.href = res.data.data
    })
    // orderInfoApi.getDownUrl({
    //   setting: 'customerAddress'
    // }).then(res => {
    //   console.log(res)
    //   window.location.href = res.data.data.value
    // })
  }

  // 功能模块Serviceurl end
}
/**
 * 输入框只能输入2位小数
 */
export function inputTwoNumber(value) {
  value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  value = value.replace(/^\./g, ""); //验证第一个字符是数字
  value = value.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  return value;
}


//可以输入负值
export function inputTwoNumber2(value) {
  value = value.replace(/[^\d.-]/g, ""); //清除"数字"和"."以外的字符
  value = value.replace(/^\./g, ""); //验证第一个字符是数字
  value = value.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  return value;
}
