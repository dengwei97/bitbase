<template>
  <div v-if="Object.keys(details).length != 0" class="sellUsdt">

    <!-- 转币给卖家 -->
    <!-- <div class="header" v-if="details.orderState == 7">
      <div class="flex">
        <img class="img1" src="@/assets/ico_stopwatch_yellow.png" alt />
        <div class="header_text text_y">等待卖家转币</div>
      </div>
      <div class="header_tips">99.7%的订单会在5分钟内完成</div>
    </div> -->
    <!-- 待收款 -->
    <div v-if="details.orderState == 1" class="header">
      <div class="flex">
        <img class="img1" src="@/assets/transactions/ico_stopwatch_yellow.png" alt />
        <div class="header_text text_y">等待付款</div>
      </div>
      <div class="header_tips head_time">
        等待买家付款
      </div>
      <!-- <div class="header_tips head_time" v-if="countdown > 0">
        预计在
        <div class="times">
          <van-count-down class="cuntdown" :time="countdown" format="mm:ss" />
        </div>内收到买家付款
      </div> -->
    </div>
    <!-- 待放行 -->
    <div v-if="details.orderState == 2" class="header">
      <div class="flex">
        <img class="img1" src="@/assets/transactions/ico_stopwatch_yellow.png" alt />
        <div class="header_text text_y">待放行</div>
      </div>
      <div class="header_tips">等待资产到账</div>
    </div>
    <!-- 已完成 -->
    <div v-if="details.orderState == 3" class="header">
      <div class="flex">
        <img class="img1" src="@/assets/transactions/ico_finish_green.png" alt />
        <div class="header_text text_l">已完成</div>
      </div>
      <div class="header_tips">订单已完成</div>
    </div>
    <!-- 已取消 -->
    <div v-if="details.orderState == 4" class="header">
      <div class="flex">
        <img class="img1" src="@/assets/transactions/ico_cancelled_gray.png" alt />
        <div class="header_text text_h">已取消</div>
      </div>
      <div class="header_tips">订单已取消，无法查看支付信息</div>
    </div>
    <!-- 购买数量 -->
    <div class="numform">
      <div v-if="details.totalMoney" class="nf_t">
        <div class="nums">￥{{ details.totalMoney | toIntegerFilter }}.</div>
        <div class="nums Decimal">{{ details.totalMoney | toDecimalFilter }}</div>
        <copy :text="details.totalMoney" />
      </div>
      <div class="nf_b">
        <div>
          <div class="row">
            <div class="text tit_h">单价</div>
            <div class="text">￥{{ details.tradePrice }}</div>
          </div>
          <div class="row row2">
            <div class="text tit_h">数量</div>
            <div class="text">{{ details.tradeAmount }} {{ details.coinName }}</div>
          </div>
        </div>
        <div class="timg">
          <img :src="details.coinImgUrl" alt />
          <div class="type_m">{{ details.coinName }}</div>
        </div>
      </div>
    </div>
    <div class="numform_tips">*转账金额须一致，包含小数</div>
    <!-- 订单信息 -->

    <!-- <div class="address flex_row" v-if="details.orderState == 7">
      <div class="addressText">请转账至买家收币地址</div>
      <div class="addresstype">ERC20</div>
    </div> -->
    <!-- <div class="orderDetails">
      <div class="addressEwm" v-show="details.orderState == 7">
        <div class="ewmImg" id="qrcode1" ref="qrcode1"></div>
        <div class="addressTips">请长按图片二维码保存至相册</div>
      </div>
      <div class="row1" v-if="details.orderState != 4 && details.orderState != 3 && details.orderState != 2">
        <div class="text">买家收币地址</div>
        <div class="flex_row">
          <div class="addressNum">{{address.address}}</div>
          <copy class="copy" :text="address.address"></copy>
        </div>
      </div>
      <div class="flex_row row dingId">
        <div class="text">订单号</div>
        <div class="flex ding">
          <div class="text dindan">{{details.id}}</div>
          <copy class="copy" :text="details.id"></copy>
        </div>
      </div>
      <div class="flex_row row">
        <div class="text">订单创建时间</div>
        <div class="text">{{details.createTime - 0 | getTimeData}}</div>
      </div>
    </div> -->
    <!-- 买家信息 -->
    <ul class="orderDetails">
      <li class="flex_row row">
        <div class="text">买家昵称</div>
        <div class="text">{{ details.businessNickName }}</div>
      </li>
      <li v-if="details.orderState != 4" class="flex_row row">
        <div class="text">买家实名</div>
        <div class="flex">

          <div class="text">{{ details.payBindInfoDetail.name }}</div>
          <copy class="copy" :text="details.payBindInfoDetail.name" />
        </div>
      </li>
      <li class="flex_row row dingId">
        <div class="text">平台订单号</div>
        <div class="flex ding">
          <div class="text dindan">{{ details.id }}</div>
          <copy class="copy" :text="details.id" />
        </div>
      </li>
      <li v-if="details.billNo != ''" class="flex_row row dingId">
        <div class="text">商家订单号</div>
        <div class="flex ding">
          <div class="text dindan">{{ details.billNo }}</div>
          <copy class="copy" :text="details.billNo" />
        </div>
      </li>
      <li v-if="details.orderState != 4" class="flex_row row">
        <div class="text">收款方式</div>
        <div class="flex">
          <div class="text">{{ details.receiveBindInfoDetail.bindType == 1 ? '银行卡' : details.receiveBindInfoDetail.bindType == 2 ? '微信' : '支付宝' }}({{ details.receiveBindInfoDetail.account.slice(details.receiveBindInfoDetail.account.length - 4) }})</div>
          <img v-if="details.receiveBindInfoDetail.bindType == 1" class="bankpayImg" src="@/assets/transactions/ico_bankpay.png" alt />
          <img v-if="details.receiveBindInfoDetail.bindType == 2" class="bankpayImg" src="@/assets/transactions/ico_weixinpay.png" alt />
          <img v-if="details.receiveBindInfoDetail.bindType == 3" class="bankpayImg" src="@/assets/transactions/ico_alipay.png" alt />
        </div>
      </li>
      <li v-if="details.orderState == 4 || details.orderState == 3" class="flex_row row">
        <div class="text">订单创建时间</div>
        <div class="text">{{ details.createTime - 0 | getTimeData }}</div>
      </li>
      <li v-if="details.orderState == 4 || details.orderState == 3" class="flex_row row">
        <div class="text">交易结束时间</div>
        <div class="text">{{ details.updateTime - 0 | getTimeData }}</div>
      </li>
       <li class="flex_row row" v-if="details.orderState == 3" @click="toEleCer()">
            <div class="text">电子凭证</div>
            <img class="arrowright" src="@/assets/transactions/ico_arrow_right.png" alt/>
      </li>
    </ul>
    <!-- 提示语句 -->
    <div class="questions">
      有疑问?可咨询
      <div class="kefu" @click="service">官方客服</div>
    </div>
    <!-- 按钮 -->
    <!-- <div class="submit_2" v-if="details.orderState == 7">
      <button class="sub1" @click="cancelOrderPop">取消订单</button>
      <button class="sub2" @click="confirmPayPop">我已转账USDT</button>
    </div> -->
    <div v-if="details.orderState == 1" class="submit_2">
      <!-- <button class="sub1" @click="cancelOrderPop">取消订单</button> -->
      <button class="sub2" @click="orderList">查看所有订单</button>
    </div>

    <div v-if="details.orderState == 2" class="submit_2">
      <!-- <button class="sub1" @click="cancelOrderPop">取消订单</button> -->
      <button class="sub2" @click="bankCurrency">放行USDT</button>
    </div>
     <verTransaPwd ref='verTransaPwd' @varTransaSu='toBankCurrency'></verTransaPwd>
    <!-- <bankCurrencyPop ref="bankCurrencyPop" @toBankCurrency="toBankCurrency" /> -->
    <!-- <confirmPay ref="confirmPay" @confirmPay="confirmPay"></confirmPay> -->
    <!-- <cancelOrder ref="cancelOrder" @cancelOrder='cancelOrder'></cancelOrder> -->
  </div>
</template>

<script>
import buyApi from "@/api/buy.js";
import orderInfoApi from '@/api/orderInfo.js'
import copy from "@/components/copy/index";
import { customerService } from "@/utils/index";
// import bankCurrencyPop from "./components/bankCurrency.vue"
import verTransaPwd from '@/components/verTransaPwd' //验证交易密码
// 我已转币
// import confirmPay from "@/components/confirmPay";
// 取消订单
// import cancelOrder from "@/components/cancelOrder";
// //地址转二维码
// import QRCode from "qrcodejs2";
export default {
  name: "MoblieTest",
  components: {
    copy,
    verTransaPwd
    // bankCurrencyPop
    // confirmPay,
    // cancelOrder,
  },
  data() {
    return {
      id: "",
      details: {},
      address: [], // 充币地址
      timer: null, // 定时器
      countdown: 0// 倒计时
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getorderdetail();
  },
  mounted() {
    // this.getAll();
  },
  // 离开页面销毁
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    
    //跳转生成电子凭证页面
    toEleCer(){
      this.$router.push({
          path: "/mElectronicCertificate/" + this.id,
    })
    },
    // 放行币二次确认弹框
    bankCurrency() {
      // this.$refs.bankCurrencyPop.show()
      this.$refs.verTransaPwd.show()
    },
    toBankCurrency(value) {
      orderInfoApi.receiveOrder({
        id: this.id,
        tradePwd:value

      }).then(res => {
        console.log(res)
        // this.$refs.bankCurrencyPop.hide()
        this.$refs.verTransaPwd.hide()
        this.getorderdetail()
      }).catch(err => {
        console.log(err)
        // this.$refs.bankCurrencyPop.hide()
        this.$refs.verTransaPwd.hide()
        this.$toast(err.data.message)
      })
    },
    // //我已转币弹框
    // confirmPayPop() {
    //   var tradeType = 2;
    //   this.$refs.confirmPay.show(tradeType);
    // },
    // //我已转币
    // confirmPay() {
    //   //  console.log(11);
    //   buyApi
    //     .transfers({
    //       id: this.id
    //     })
    //     .then(res => {
    //       // console.log(res)
    //       this.$refs.confirmPay.hide();
    //       this.getorderdetail();
    //     })
    //     .catch(err => {
    //       // console.log(err)
    //       this.$refs.confirmPay.hide();
    //       this.$toast(err.data.message);
    //     });
    //   // Toast("该收币地址暂未收到您的转账请确认转账后重试");
    // },
    // 获取充币地址
    getaddress() {
      buyApi
        .getaddress({
          coinName: "USDT",
          type: 1
        })
        .then(res => {
          this.address = res.data.data;
          // this.$nextTick(() => {
          //   var o = document.getElementById("qrcode1");
          //   // console.log(o)
          //   var w = o.offsetWidth;
          //   var h = o.offsetHeight;
          //   new QRCode(this.$refs.qrcode1, {
          //     width: w, // 设置宽度，单位像素
          //     height: h, // 设置高度，单位像素
          //     text: res.data.data.address // 设置二维码内容或跳转地址
          //   });
          // });
        })
        .catch(err => {
          // console.log(err);
        });
    },
    Cancellation() {
      this.$router.go(-1);
    },
    // 获取详细信息
    getorderdetail() {
      buyApi
        .orderdetail({
          id: this.id
        })
        .then(res => {
          this.details = res.data.data;
          this.countdown = res.data.data.restTime - 0
          // console.log(res.data.data.orderState)
          // this.getaddress();

          if (res.data.data.orderState == 1 || res.data.data.orderState == 2) {
            this.setTime()
          }

          // console.log(res);
        })
        .catch(err => {
          // console.log(err);
        });
    },
    // 定时器请求
    setTime() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getorderdetail()
      }, 5000);
    },

    // 客服跳转
    service() {
      customerService();
    },

    // 查看所有订单
    orderList() {
      this.$router.push('/mOrderList');
    }
  }
};
</script>

<style lang="less" scoped>
.sellUsdt {
  background: #f7f7fa;
  width: 100%;
  min-height: 100vh;
  padding: 0.32rem 0.32rem 2.1rem 0.32rem;
  .flex_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .header_text {
    font-size: 0.48rem;
    line-height: 0.68rem;
  }
  .text {
    font-family: PingFangSC;
    font-size: 0.28rem;
    line-height: 0.32rem;
    color: #40405e;
  }
  .header {
    .img1 {
      width: 0.48rem;
      height: 0.48rem;
      margin-right: 0.08rem;
    }
    .text_y {
      color: #f2a145;
    }
    .text_hong {
      color: #f46666;
    }
    .text_l {
      color: #00cf00;
    }
    .text_h {
      color: #a0a0b3;
    }
    .header_tips {
      padding-top: 0.1rem;
      font-size: 0.26rem;
      line-height: 0.36rem;

      color: #a0a0b3;
    }
    .head_time{

      display: flex;
      align-items: center;
      .times {
        color: #40405e;
      }

    }
  }
  .numform {
    margin-top: 0.24rem;
    padding: 0.32rem;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    border-radius: 0.12rem;
    .nf_t {
      display: flex;
      align-items: center;
      .nums {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 0.48rem;
        line-height: 0.56rem;
        color: #40405e;
      }
      .Decimal {
        padding-right: 0.16rem;
        color: #f46666;
      }
    }
    .nf_b {
      display: flex;
      justify-content: space-between;
      padding-top: 0.2rem;
      align-items: center;
      .row {
        display: flex;
        .tit_h {
          color: #a0a0b3;
          padding-right: 0.24rem;
        }
      }
      .row2 {
        padding-top: 0.12rem;
      }
      .timg {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 0.56rem;
          height: 0.56rem;
        }
        .type_m {
          padding-top: 0.08rem;
          font-family: PingFangSC;
          font-size: 0.24rem;
          line-height: 0.28rem;

          color: #40405e;
        }
      }
    }
  }
  .numform_tips {
    font-size: 0.24rem;
    line-height: 0.28rem;
    color: #f46666;
    padding: 0.28rem 0 0.28rem 0.16rem;
  }
  .address {
    padding: 0.68rem 0 0.16rem;
    .addressText {
      font-weight: 500;
      font-size: 0.32rem;
      line-height: 0.44rem;
      color: #40405e;
    }
    .addresstype {
      background: rgba(12, 179, 151, 0.1);
      border: 1px solid @cl-m;
      box-sizing: border-box;
      border-radius: 0.32rem;
      width: 2.08rem;
      height: 0.56rem;
      font-size: 0.28rem;
      line-height: 0.56rem;
      text-align: center;
      color: @cl-m;
    }
  }
  .orderDetails {
    // margin-top: 0.24rem;
    padding: 0 0.32rem;
    background: linear-gradient(0deg, #ffffff, #ffffff);
    border-radius: 0.12rem;
    .addressEwm {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.66rem;
      border-bottom: 1px solid #f5f5fa;
      .ewmImg {
        width: 3.52rem;
        height: 3.52rem;
      }
      .addressTips {
        padding: 0.6rem 0;
        font-size: 0.26rem;
        line-height: 0.36rem;
        color: @cl-m;
      }
    }
    .arrowright{
        width: .12rem;
        height: .2rem;
      }
    .row1 {
      height: 1.32rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .row {
      border-top: 1px solid #f5f5fa;
      height: 1.04rem;
    }
    .dingId{
      height: 1.34rem;
      align-items: flex-start;
      padding: 0.32rem 0;
    }
    .ding{
      display: flex;
      align-items: flex-start;
    }
    .dindan {
      text-align: right;
      width: 4rem;
       word-break: break-all;
      // overflow: hidden;
      // -webkit-box-orient: vertical;
      // text-overflow: ellipsis;
    }
    .copy {
      margin-left: 0.12rem;
    }
    .bankpayImg {
      width: 0.56rem;
      height: 0.56rem;
      margin-left: 0.16rem;
    }
    .addressNum {
      font-size: 0.24rem;
      line-height: 0.36rem;
      color: #a0a0b3;
      flex: 1;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }
  .questions {
    padding: 0.6rem 0 0.6rem 0.6rem;
    display: flex;

    font-family: PingFangSC;
    font-size: 0.24rem;
    line-height: 0.28rem;

    color: #a0a0b3;
    .kefu {
      color: @cl-m;
    }
  }

  .submit_2 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #f7f7fa;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.04);
    padding: 0.56rem 0.32rem 0.56rem 0.32rem;
    display: flex;
    justify-content: space-between;
    // .sub1 {
    //   width: 2.3rem;
    //   height: 0.96rem;
    //   background: linear-gradient(0deg, #dddde6, #dddde6);
    //   border-radius: 0.48rem;
    //   font-size: 0.28rem;
    //   color: #40405e;
    // }
    .sub2 {
      // width: 4.32rem;
      width: 100%;
      height: 0.96rem;
      background: @cl-m;
      border-radius: 0.48rem;
      font-size: 0.28rem;
      color: #ffffff;
    }
  }
}
</style>
