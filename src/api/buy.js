import { request } from "@/utils/request"

export default {
  // 轮播图
  // banner: function(data){
  //   return request({
  //     url:"/public/banner",
  //     method:"GET",
  //     params:{
  //       ...data,
  //       processData: true // 序列化数据
  //     }
  //   })
  // },
  // 获取币种信息
  getcoinlist: function(data) {
    return request({
      url: '/public/coin/list',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取用户kyc状态
  kycstatus: function(data) {
    return request({
      url: '/user-info/kyc/status',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 一键买入
  onebuy: function(data) {
    return request({
      url: "/trade/order/cashier_v2",
      method: "GET",
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 查看我的订单
  myorder: function(data) {
    return request({
      url: "/trade/order/list",
      method: "GET",
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 订单详情
  orderdetail: function(data) {
    return request({
      url: '/trade/order/detail',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 确认已付款
  confirmPay: function(data) {
    return request({
      url: '/trade/order/pay',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 取消订单
  cancelOrder: function(data) {
    return request({
      url: '/trade/order/cancel',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 上传图片视频
  uploadphoto: function(data) {
    return request({
      url: '/public/upload',
      method: 'POST',
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 申诉
  ordercomp: function(data) {
    return request({
      url: '/trade/order/complain',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取下载二维码
  publicsetting: function(data) {
    return request({
      url: '/public/setting',
      method: 'GET',
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 发送验证码
  mobileCode: function(data) {
    return request({
      url: '/public/code',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  },
  // 注册
  register1: function(data) {
    return request({
      url: '/user-info/cashier/bind',
      method: 'POST',
      data: {
        ...data,
        processData: true
      }
    })
  },
  // 充币地址
  getaddress: function(data) {
    return request({
      url: '/wallet/address',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  },
  // 我已转账USDT
  transfers: function(data) {
    return request({
      url: '/trade/order/activate',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  },
  // 获取账户余额
  getBalance: function(data) {
    return request({
      url: '/wallet/rest',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }

    })
  },
  // //登录
  // getLogin:function(data){
  //   return request({
  //     url:'/user-info/login',
  //     method:'POST',
  //     data:{
  //       ...data,
  //       processData: true
  //     }

  //   })
  // },

  // 重置密码
  getReset: function(data) {
    return request({
      url: '/user-info/pwd/reset',
      method: 'POST',
      data: {
        ...data,
        processData: true
      }

    })
  },

  // //测试获取token
  // gettoken:function(data){
  //   return request({
  //     url:'/public/entrance',
  //     method:'GET',
  //     params:{
  //       ...data,
  //       processData: true
  //     }

  //   })
  // },
  //充币列表
  walletRecord(data){
    return request({
      url: '/wallet/records/recharge',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }

    })
  },
  //提币列表
  walletWithdraw(data){
    return request({
      url: '/wallet/records/withdraw',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  },
  //充币详情
  walletRecordDetails(data){
    return request({
      url: '/wallet/record/recharge',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  },
  //提币详情
  walletWithdrawDetails(data){
    return request({
      url: '/wallet/record/withdraw',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  }
}
