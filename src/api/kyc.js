import { request } from "@/utils/request"

export default {
  // 轮播图
  kycSubmit: function(data) {
    return request({
      url: "/user-info/kyc/submit",
      method: "GET",
      params: {
        ...data,
        processData: true // 序列化数据
      }
    })
  }
}
