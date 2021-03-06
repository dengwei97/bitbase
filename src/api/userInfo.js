import { request } from "@/utils/request"

export default {
  // 首页信息展示
  getPrice: function(data) {
    return request({
      url: "/public/price",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 公告中心
  getAnnouncement: function(data) {
    return request({
      url: "/user-info/msg/bulletin/list",
      method: "GET",
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 公告详情页
  getnoticeDetails: function(data) {
    return request({
      url: "/user-info/msg/bulletin/detail",
      method: "GET",
      params: {
        ...data,
        processData: true
      }
    })
  },
  // 商户合作
  getcooperation: function(data) {
    return request({
      url: "/public/cooperation",
      method: "GET",
      params: {
        ...data,
        processData: true
      }
    })
  },
  // 获取配置
  getCustomerInfo: function(data) {
    return request({
      url: "/public/setting",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 登陆
  login: function(data) {
    return request({
      url: "/zb/auth/login",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取用户信息
  getUserInfo: function(data) {
    return request({
      url: "/user-info/detail",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取用户信息_收银台专用
  getUserInfoKSY: function(data) {
    return request({
      url: "/user-info/kyc/status",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取收款信息列表
  // 获取收款信息 列表,
  getPayment: function(data) {
    return request({
      url: "/user-info/bind/payment_v2/list",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 绑定银行卡
  bindPayment: function(data) {
    return request({
      url: "/user-info/cashier/bind/bind_v2",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 删除银行卡
  unbindPayment: function(data) {
    return request({
      url: "/user-info/cashier/bind/unbind_v2",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取ip对应的区号
  ipApi: function(data) {
    return request({
      url: "/user-info/ipApi",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取配置
  getCustomerInfo: function(data) {
    return request({
      url: "/public/setting",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 邀请码注册
  invitationRegistration: function(data) {
    return request({
      url: "/user-info/register",
      method: 'POST',
      data: {
        ...data,
        processData: true
      }
    })
  },
  //登录状态的修改密码
  changePwd: function(data) {
    return request({
      url: "/user-info/pwd/set",
      method: 'POST',
      data: {
        ...data,
        processData: true
      }
    })
  },
  // 个人详细信息
  getUserInfoDetails: function(data){
    return request({
      url: '/user-info/detail',
      method: 'GET',
      params: {
        ...data,
        processData:true
      }
    })
  },
  //修改个人信息
  simple: function(data){
    return request({
      url: '/user-info/setting/simple',
      method: 'POST',
      data: {
        ...data,
        processData:true
      }

    })
  },
  //生成谷歌验证密钥
  getGenerate: function(data){
    return request({
      url:"/user-info/google/generate",
      method: 'POST',
      data:{
        ...data,
        processData: true
      }
    })
  },
  //校验密码
  getVerify: function(data){
    return request({
      url:"/user-info/pwd/verify",
      method: 'POST',
      data:{
        ...data,
        processData: true
      }
    })
  },
  //谷歌验证校验
  getVerGoogle: function(data){
    return request({
      url:"/user-info/google/auth",
      method: 'POST',
      data:{
        ...data,
        processData: true
      }
    })
  },
  //钱包列表
  getWallet: function(data){
    return request({
      url:'/wallet/wallets',
      method: 'GET',
      params:{
        ...data,
        processData: true
      }

    })
  },
  //钱包总额
  getWalletTotal: function(data){
    return request({
      url:'/wallet/total',
      method: 'GET',
      params:{
        ...data,
        processData: true
      }
    })
  },
  //钱包详情
  getWallDetails: function(data){
    return request({
      url:"/wallet/detail",
      method: 'GET',
      params:{
        ...data,
        processData: true
      }
    })
  },
  //判断是否是小金库地址
  isBbf: function(data){
    return request({
      url:"/wallet/address/isBbf",
      method: 'GET',
      params:{
        ...data,
        processData: true
      }
    })
  },
  //提币
  wallatCash(data){
    return request({
      url:'/wallet/cash',
      method:'GET',
      params:{
        ...data,
        processData: true
      }
    })
  },
  //校验密码下单
  verifyPwd(data){
    return request({
      url:'/user-info/pwd/verify',
      method:'GET',
      params:{
        ...data,
        processData: true
      }
    })
  },
  //获取钱包流水
  getWalletFlows(data){
    return request({
      url:'/wallet/flows',
      method:'GET',
      params:{
        ...data,
        processData: true
      }
    })
  },
  //获取绑定的收款方式个数
  getBindPayment(data){
    return request({
      url:'/user-info/bind/payment_v2',
      method:'GET',
      params:{
        ...data,
        processData:true
      }
    })
  },
  //承兑商申请
  advertiserApply(data){
    return request({
      url:'/trade/advertiser/apply',
      method:'GET',
      params:{
        ...data,
        processData:true
      }
    })
  },
  //承兑商挂单
  advertiserCreate(data){
    return request({
      url:'/trade/advertiser/order/create_v2',
      method:'GET',
      params:{
        ...data,
        processData:true
      }
    })
  },
  //查看挂单列表
  adverOrderList(data){
    return request({
      url:'/trade/advertiser/order/list',
      method:'GET',
      params:{
        ...data,
        processData:true
      }
    })
  }
}
