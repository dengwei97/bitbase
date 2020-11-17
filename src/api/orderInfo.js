import { request } from "@/utils/request"

export default {
  // 获取币种配置
  getCoinInfo: function(data) {
    return request({
      url: "/public/coin/list",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 收银台买卖
  orderFast: function(data) {
    return request({
      url: "/trade/order/cashier_v2",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取订单列表
  orderList: function(data) {
    return request({
      url: "/trade/order/list",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取 sell 的地址
  getadderSell: function(data) {
    return request({
      url: "/user-info/kyc/status",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取 充币地址
  getWalletAddress: function(data) {
    return request({
      url: "/wallet/address",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 获取 订单详情
  getOrderDetail: function(data) {
    return request({
      url: "/trade/order/detail",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 取消订单
  cancelOrder: function(data) {
    return request({
      url: "/trade/order/cancel",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 确认已付款
  payOrder: function(data) {
    return request({
      url: "/trade/order/pay",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 确认收款
  receiveOrder: function(data) {
    return request({
      url: "/trade/order/receive",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 收银台卖币 确认已打币
  activateOrder: function(data) {
    return request({
      url: "/trade/order/activate",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 客服
  getCustomerInfo: function(data) {
    return request({
      url: "/public/customer/info",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
   // 获取下载页
   getDownUrl: function(data) {
    return request({
      url: "/public/setting",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 查看钱包余额
  getWallet: function(data) {
    return request({
      url: "/wallet/rest",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  // 大宗交易
  bulkTrading : function(data){
    return request({
      url:'/trade/order/block',
      method: 'GET',
      params: {
        ...data,
        processData: true
      }
    })
  },
  // 交易范围
  getPriceLimit: function(data) {
    return request({
      url: "/trade/price/limit",
      method: "POST",
      data: {
        ...data,
        processData: true // 序列化数据
      }
    })
  },
  
}
