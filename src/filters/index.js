// import parseTime, formatTime and set to filter
import { wordLib } from "../utils/constants"
export { parseTime, formatTime, priceFormat, hidePhoneNum, formatNumber } from "@/utils"

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + "s"
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute")
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour")
  } else {
    return pluralize(~~(between / 86400), " day")
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 数据保留两位小数
export function numberToTwo(value) {
  var toFixedNum = Number(value).toFixed(3)
  var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
  return realVal
}

// 保留4位小数
export function numberToFour(num, len = 4) {
  const value = num - 0
  if (isNaN(value)) {
    return num
  }
  var toFixedNum = Number(value).toFixed(len)
  return toFixedNum
  // var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
  // return realVal
}

export function timeFormat(timestamp, format) {
  if (isNaN(timestamp)) {
    return timestamp
  }
  if (timestamp < 4100000000) {
    timestamp = timestamp * 1000
  }
  const time = new Date(timestamp)
  const week = wordLib.week
  const y = time.getFullYear()
  const M = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const m = time.getMinutes()
  const s = time.getSeconds()
  format = format.replace(/[y]{4}/, y)
  format = format.replace(/[M]{2}/, M > 9 ? M : "0" + M)
  format = format.replace(/[d]{2}/, d > 9 ? d : "0" + d)
  format = format.replace(/[h]{2}/, h > 9 ? h : "0" + h)
  format = format.replace(/[m]{2}/, m > 9 ? m : "0" + m)
  format = format.replace(/[s]{2}/, s > 9 ? s : "0" + s)
  format = format.replace(/[w]{2}/, week[time.getDay()])
  return format
}

// 通过用户ID来计算对应的头像class

export function getAvtClass(userId) {
  if (!userId) {
    return 'comon_avt_1'
  }
  const num = ((userId - 0) % 10) % 5 + 1
  return ['comon_avt_' + num]
}

// 时间转换 (MM/dd hh:mm)
export function getTime(value) {
  const date = new Date(value);
  const y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  // 拼接
  return MM + '/' + d + ' ' + h + ':' + m;
}
// 时间转换 (YY-MM-dd hh:mm)
export function getTimes(value) {
  const date = new Date(value);
  const y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  // 拼接
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
}
// 时间转换 (MM-dd hh:mm:ss)
export function getTimeData(value) {
  const date = new Date(value);
  const y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  // 拼接
  return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}
// 时间转换 (y年MM月dd日 hh:mm)
export function getTimeZW(value) {
  const date = new Date(value);
  const y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  // 拼接
  return y + '年' + MM + '月' + d + '日' + ' ' + h + ':' + m;
}
export function formatMsgTime(timespan) {
  var dateTime = new Date(timespan);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString()); // typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - timespan;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;
}

/**
 * 10000.25 => "10,000"
 * 保留整数并用,分割
 * @param {number} num
 */
export function toIntegerFilter(num) {
  let num1 = num.toString()
  let num2 = num1.split('.')[0]
  return (+num2 || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","))
}
/**
 * 10000.25 => "25"
 * 获取小数点后的数,没有返回 00 ，不够2位，用0 补足
 * @param {number} num
 */
export function toDecimalFilter(num) {
  let num1 = num.toString()
  let index = num1.indexOf('.')
  // let num2 = num1.slice(0, index + 3);

  if(index < 0){
    return '00'
  }
  let num2 = num1.replace(/\d+\.(\d*)/,"$1")
  return num2.length < 2 ? num2 + '0' : num2
  // let num3 = num2.replace(/\d+\.(\d*)/,"$1")
  // return num3.length < 2 ? num3 + '0' : num3
}

/**
 *@desc 对银行卡的显示处理
 *@author
 *@date 2020/07/24 15:28:43
 */
export function yhqFormat(str) {
  let strTemp = str + ''
  if(typeof strTemp != 'string') {
    return str
  }
  let sliceNum = str.length - 4 || 0
  return  '**** **** **** ' + strTemp.slice(sliceNum)
}
//手机号四位处理;
export function mobile(str){
  let tel = str;
  if(!isNaN(str)){
    tel = tel.toString();
  }
  return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
}
//证件号保留后3位
export function certificateNum(str){
  let cer = str;
  if(!isNaN(str)){
     cer = cer.toString();
  }
  return "*******"+cer.substr(cer.length-3);
}


//截取字符串后四位
export function lastFour(str){
  return str.substring(str.length-4);
}