<template>
  <div v-if="Object.keys(details).length != 0" class="orderDetails">
    <!-- v-if="Object.keys(details).length != 0" -->
    <div class="orderDetails_content">
      <!-- 头部 -->
      <div class="header">
        <!-- 待付款 -->
        <div v-if="details.orderState == 1" class="head_l">
          <div class="head_l_t">
            <img src="../../../assets/transactions/ico_stopwatch_red.png" alt />
            <div class="head_tit">请付款</div>
          </div>
          <div class="header_text head_time">
            请在
            <div class="times">
              <van-count-down class="cuntdown" :time="countdown" format="mm:ss" />
            </div>内付款给卖家
          </div>
        </div>
        <!-- 等待卖家转币 -->
        <div v-if="details.orderState == 2 || details.orderState == 6" class="head_l">
          <div class="head_l_t">
            <img src="../../../assets/transactions/ico_stopwatch_yellow.png" alt />
            <div class="head_tit head_tit_f">等待卖家转币</div>
          </div>
          <div v-if="countdown > 0" class="header_text head_time">
            预计在
            <div class="times">
              <van-count-down class="cuntdown" format="mm:ss" :time="countdown" />
            </div>内收到资产
          </div>
          <div v-if="countdown < 0" class="header_text head_time">等待卖家转币到我的账户中</div>
        </div>
        <!-- 已完成 -->
        <div v-if="details.orderState == 3" class="head_l">
          <div class="head_l_t">
            <img src="../../../assets/transactions/ico_finish_green.png" alt />
            <div class="head_tit head_tit_w">已完成</div>
          </div>
          <div class="header_text head_time">订单已完成</div>
        </div>
        <!-- 已取消 -->
        <div v-if="details.orderState == 4" class="head_l">
          <div class="head_l_t">
            <img src="../../../assets/transactions/ico_cancelled_gray.png" alt />
            <div class="head_tit head_tit_q">已取消</div>
          </div>
          <div class="header_text head_time">订单已取消，无法查看支付信息</div>
        </div>
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
      <!-- 购买信息 -->
      <!-- 信息1 -->
      <div v-if="details.orderState == 1 || details.orderState == 2 || details.orderState == 6" class="payinformation">
        <div class="infor_tit">
          请使用本人(
          <div class="names">*{{ details.payBindInfoDetail.name.slice(1) }}</div>
          ){{ details.payBindInfoDetail.bindType == 1 ? '银行卡' : details.payBindInfoDetail.bindType == 2 ? '微信' : '支付宝' }}向以下账户自行转账
        </div>
        <ul>
          <li class="lists">
            <div class="text">支付方式</div>
            <div class="list_r">
              <div
                class="text"
              >{{ details.receiveBindInfoDetail.bindType == 1 ?'银行卡':details.receiveBindInfoDetail.bindType == 2 ? '微信支付':'支付宝' }}</div>
              <img
                v-if="details.receiveBindInfoDetail.bindType == 1 "
                class="payimg"
                src="../../../assets/transactions/ico_bankpay.png"
                alt
              />
              <img
                v-if="details.receiveBindInfoDetail.bindType == 2 "
                class="payimg"
                src="../../../assets/transactions/ico_weixinpay.png"
                alt
              />
              <img
                v-if="details.receiveBindInfoDetail.bindType == 3 "
                class="payimg"
                src="../../../assets/transactions/ico_alipay.png"
                alt
              />
            </div>
          </li>
          <li class="lists">
            <div class="text">{{ details.receiveBindInfoDetail.bindType == 1 ? '持卡人' : '收款人 ' }}</div>
            <div class="list_r">
              <div class="text">{{ details.receiveBindInfoDetail.name }}</div>
              <copy class="icon" :text="details.receiveBindInfoDetail.name" />
            </div>
          </li>
          <li v-if="details.receiveBindInfoDetail.bindType == 1" class="lists">
            <div class="text">银行卡账号</div>
            <div class="list_r">
              <div class="text">{{ details.receiveBindInfoDetail.account }}</div>
              <copy class="icon" :text="details.receiveBindInfoDetail.account" />
            </div>
          </li>
          <li v-if="details.receiveBindInfoDetail.bindType == 1" class="lists">
            <div class="text">开户银行</div>
            <div class="list_r">
              <div class="text">{{ details.receiveBindInfoDetail.paymentCode }}</div>
            </div>
          </li>
          <li v-if="details.receiveBindInfoDetail.bindType == 1" class=" addition">
            <div class="text ">所属分行</div>
            <div class="list_r ding">
              <div class="text dindan">{{ details.receiveBindInfoDetail.addition }}[切勿备注USDT等敏感字样，防冻结]、[本账户受公安系统检测，黑钱请自重]</div>
            </div>
          </li>
          <li v-if="details.receiveBindInfoDetail.bindType != 1" class="lists">
            <div class="text">收款二维码</div>
            <div class="list_r" @click="QRcodeshow">
              <img class="ewm" src="../../../assets/transactions/ico_qr_code.png" alt />
            </div>
          </li>
          <li v-if="details.receiveBindInfoDetail.bindType != 1" class="lists">
            <div class="text">{{ details.receiveBindInfoDetail.bindType == 2 ? '微信支付' : '支付宝' }}</div>
            <div class="list_r">
              <div class="text">{{ details.receiveBindInfoDetail.account }} 转账不要备注</div>
              <copy class="icon" :text="details.receiveBindInfoDetail.account" />
            </div>
          </li>
        </ul>
      </div>
      <!-- 信息2 -->
      <ul class="pay_uname">
        <li class="lists">
          <div class="text">卖家昵称</div>
          <div class="text">{{ details.businessNickName }}</div>
        </li>
        <li
          v-if="details.orderState == 1 || details.orderState == 2 || details.orderState == 3 || details.orderState == 6"
          class="lists"
        >
          <div class="text">卖家实名</div>
          <div class="list_r">
            <div class="text">{{ details.businessRealName }}</div>
            <copy class="icon" :text="details.businessRealName" />
          </div>
        </li>
        <li class="lists dingID">
          <div class="text">平台订单号</div>
          <div class="list_r ding">
            <div class="text dindan">{{ details.id }}</div>
            <copy class="icon" :text="details.id" />
          </div>
        </li>
        <li v-if="details.billNo != ''" class="lists dingID">
          <div class="text">商家订单号</div>
          <div class="list_r ding">
            <div class="text dindan">{{ details.billNo }}</div>
            <copy class="icon" :text="details.billNo" />
          </div>
        </li>
        <li v-if="details.orderState == 4 || details.orderState == 3" class="lists">
          <div class="text">订单创建时间</div>
          <div class="list_r">
            <div class="text">{{ details.createTime - 0 | getTimeData }}</div>
          </div>
        </li>
        <li v-if="details.orderState == 4 " class="lists">
          <div class="text">交易结束时间</div>
          <div class="list_r">
            <div class="text">{{ details.updateTime - 0 | getTimeData }}</div>
          </div>
        </li>
        <li v-if="details.orderState != 4" class="lists dingID">
          <div class="text">USDT接收地址</div>
          <div class="list_r ding">
            <div class="text dindan">{{ details.formAddress }}</div>
            <copy class="icon" :text="details.formAddress" />
          </div>
        </li>
        <li v-if="details.orderState == 3" class="lists">
          <div class="text">转账手续费</div>
          <div class="list_r">
            <div class="text">{{ details.tradeFee }}</div>
          </div>
        </li>
        <li class="lists" v-if="details.orderState == 3" @click="toEleCer()">
            <div class="text">电子凭证</div>
            <img class="arrowright" src="@/assets/transactions/ico_arrow_right.png" alt/>
        </li>
      </ul>
      <!-- 提示语句 -->
      <div v-if="details.orderState != 3" class="questions">
        有疑问?可咨询
        <div class="kefu" @click="kefu">官方客服</div>
      </div>
      <div v-if="details.orderState == 1 || details.orderState == 2 || details.orderState == 6" class="tishi">
        <img src="../../../assets/transactions/ico_tip_small.png" alt />
        <div class="tishi_text">在转账过程中请勿备注BTC、USDT等信息，防止回款被拦截、银行卡被冻结等问题</div>
      </div>
      <div v-if="details.orderState == 3" class="tishi">
        <img src="../../../assets/transactions/ico_tip_small.png" alt />
        <div class="tishi_text">付款成功后，USDT将存入您的充值地址，请前往钱包进行查看</div>
      </div>
    </div>
    <!-- 待付款 -->
    <div v-if="details.orderState == 1 " class="btns">
      <div class="button">
        <button class="button1 " @click="cancelOrderPop">取消订单</button>
        <button class="button2 " @click="confirmPayPop">我已付款成功</button>
      </div>
    </div>
    <!-- 等待卖家转币 -->
    <div v-if="details.orderState == 2 || details.orderState == 6 " class="btns">
      <div class="button">
        <button class="cancel_button" :class="{cancel_active:countdown < 0}" :disabled="countdown > 0" @click="cancelOrderPop">取消订单</button>
      </div>
    </div>
    <!-- 已完成 -->
    <div v-if="details.orderState == 3 " class="btns return">
      <div class="button">
        <button class="returned" @click="returned">返回</button>
      </div>
    </div>
    <QRcode ref="QRcode" />
    <confirmPay ref="confirmPay" @confirmPay="confirmPay" />
    <cancelOrder ref="cancelOrder" @cancelOrder="cancelOrder" />
  </div>
</template>

<script>
// 二维码
import QRcode from "@/components/QRcode/index";
// 我已付款
import confirmPay from "@/components/confirmPay";
// 取消订单
import cancelOrder from "@/components/cancelOrder";
// 复制
import copy from "@/components/copy/index";
import { customerService } from "@/utils/index";
import buyApi from "@/api/buy.js"
export default {
  name: "OrderDetails",
  components: {
    QRcode,
    confirmPay,
    cancelOrder,
    copy
  },
  data() {
    return {
      details: {
        // orderState: 1,
        // businessNickName: "sss",
        // businessRealName: "saj",
        // id: "564132163132165156132513121",
        // createTime: "123156316315616",
        // totalMoney: 2001.02,
        // tradePrice: 696530.008,
        // tradeAmount: 0.027945,
        // coinName: "USDT",
        // coinImgUrl: require("../../../assets/ico_usdt.png"),
        // realName: "洼不",
        // payBindInfoDetail: {
        //   bindType: 1
        // },
        // receiveBindInfoDetail: {
        //   bindType: 2,
        //   name: "阿舍",
        //   account: "523121325613265132231",
        //   addition: "成都支行",
        //   paymentCode: require("../../../assets/ico_usdt.png")
        // }
      },
      countdown: 0,
      id: '',
      timer: null // 定时器
    };
  },
  created() {
    this.id = this.$route.params.id
    this.getorderdetail()
  },
  mounted() {},
  // 离开页面销毁
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    // 二维码展示
    QRcodeshow() {
      if (this.details.receiveBindInfoDetail.paymentCode != "") {
        this.$refs.QRcode.show(this.details.receiveBindInfoDetail.paymentCode);
      } else {
        this.$toast("该用户未上传收款二维码请根据转账信息完成转账");
      }
    },
    // 客服
    kefu() {
      customerService();
    },
    // 我已付款弹框
    confirmPayPop() {
      var tradeType = 1
      this.$refs.confirmPay.show(tradeType)
    },
    // 我已付款
    confirmPay() {
      buyApi.confirmPay({
        id: this.id
      }).then(res => {
        // console.log('确认付款',res)
        if (res.data.code == 0) {
          this.getorderdetail()
          this.$refs.confirmPay.hide()
        }
      }).catch(err => {
        // console.log(err)
      })
    },
    // 取消订单弹框
    cancelOrderPop() {
      var tradeType = 1
      this.$refs.cancelOrder.show(tradeType)
    },
    // 取消订单
    cancelOrder() {
      buyApi.cancelOrder({
        id: this.id
      }).then(res => {
        // console.log('取消订单',res)
        if (res.data.code == 0) {
          this.$refs.cancelOrder.hide()
          this.getorderdetail()
        }
      }).catch(err => {
        // console.log(err)
      })
    },
    // 返回
    returned() {
      // this.$router.push('/moblie')
      this.$router.go(-1);
    },
    // 获取详细信息
    getorderdetail() {
      buyApi.orderdetail({
        id: this.id
      }).then(res => {
        // console.log(res)
        this.details = res.data.data
        this.countdown = res.data.data.restTime - 0
        // if(this.countdown > 0){

        //   // setTimeout(()=>{
        //   //   this.getorderdetail()
        //   // },this.countdown)
        // }else{
        //     this.countdown = res.data.data.restTime - 0
        // }
        if (res.data.data.orderState == 2 || res.data.data.orderState == 6 || res.data.data.orderState == 1) {
          this.setTime()
        }
        // console.log(res)
      }).catch(err => {
        // console.log(err)
      })
    },
    // 定时器请求
    setTime() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getorderdetail();
      }, 2000);
    },
    //跳转生成电子凭证页面
    toEleCer(){
    this.$router.push({
      path: "/mElectronicCertificate/" + this.id,
    })
    }

  }
};
</script>

<style lang="less" scoped>
.orderDetails {
  width: 100%;
  min-height: 100vh;
  background: #f7f7fa;
  .orderDetails_content {
    padding: 0.16rem 0.32rem 1.6rem 0.32rem;
    .text {
      font-family: PingFangSC;
      font-size: 0.28rem;
      line-height: 0.32rem;
      color: #40405e;
    }
    .header {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.4rem;
      .header_text {
        font-family: Roboto;
        font-size: 0.28rem;
        line-height: 0.32rem;
        color: #40405e;
      }
      .head_l_t {
        display: flex;
        align-items: center;
        img {
          width: 0.48rem;
          height: 0.48rem;
          margin-right: 0.08rem;
        }
        .head_tit {
          font-family: PingFangSC;
          font-size: 0.48rem;
          // font-weight: 600;
          font-style: normal;
          color: #f46666;
        }
        .head_tit_f {
          color: #f2a145;
        }
        .head_tit_w {
          color: #00cf00;
        }
        .head_tit_q {
          color: #a0a0b3;
        }
      }
      .head_time {
        padding-top: 0.14rem;
        display: flex;
        align-items: center;
        color: #a0a0b3;
        .times {
          color: #40405e;
        }
      }
      .head_r {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 0.64rem;
          height: 0.64rem;
        }
        .head_r_tit {
          padding-top: 0.12rem;
          color: #a0a0b3;
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
    .payinformation {
      margin-top: 0.24rem;
      padding: 0 0.32rem;
      background: #ffffff;
      border-radius: 0.12rem;
      .infor_tit {
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.92rem;

        font-family: PingFangSC;
        font-size: 0.24rem;
        line-height: 0.28rem;

        color: #aeaec2;
        .names {
          color: #f2a145;
        }
      }
    }
    .pay_uname {
      margin-top: 0.24rem;
      padding: 0 0.32rem;
      background: #ffffff;
      border-radius: 0.12rem;
    }
    .lists {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 1.04rem;
      // padding:  0.32rem 0;
      align-items: center;
      border-top: 0.02rem solid #f5f5fa;
      .arrowright{
        width: .12rem;
        height: .2rem;
      }
    }
    .list_r {
      display: flex;
      align-items: center;
      .payimg {
        margin-left: 0.16rem;
        width: 0.56rem;
        height: 0.56rem;
      }
      .icon {
        margin-left: 0.12rem;
        width: 0.24rem;
        height: 0.24rem;
      }
      .ewm {
        width: 0.32rem;
        height: 0.32rem;
      }
    }

    .ding{
      display: flex;
      align-items: flex-start;
      text-align:right;
    }
    .dindan {
      width: 3.8rem;

    //  display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 2;
    // overflow: hidden;
    word-break: break-all;
    }
    .dingID{
      padding:   0.32rem 0;
      height: 1.34rem;
      align-items: flex-start;
    }
    .addition{
      padding:   0.32rem 0;
      // height: 1.66rem;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      border-top: 0.02rem solid #f5f5fa;

    }
    .questions {
      padding: 0.34rem 0 0 0.56rem;
      display: flex;

      font-family: PingFangSC;
      font-size: 0.24rem;
      line-height: 0.28rem;

      color: #a0a0b3;
      .kefu {
        color: @cl-m;
      }
    }
    .tishi {
      padding: 0.32rem 0 0.6rem 0;
      display: flex;
      img {
        width: 0.32rem;
        height: 0.32rem;
        margin-top: 0.04rem;
      }
      .tishi_text {
        padding-left: 0.16rem;
        font-family: PingFangSC;
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: #f2a145;
      }
    }
  }
  .btns{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1.52rem;
    width: 100%;
    background: #F7F7FA;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.04);
    .button{
      padding: 0.32rem;
      display: flex;
      justify-content: space-between;
      .button1{
        background: linear-gradient(0deg, #DDDDE6, #DDDDE6);
        border-radius: 0.48rem;
        font-size: 0.28rem;
        text-align: center;
        color: #40405E;
        width: 2.3rem;
        height: 0.96rem;
        line-height: 0.96rem;
      }
      .button2{
        background: #0CB397;
        border-radius: 0.48rem;
        font-size: 0.28rem;
        text-align: center;
        color: #FFFFFF;
        width:4.32rem;
        height: 0.96rem;
        line-height: 0.96rem;
      }
      .cancel_button{
        width: 100%;
        height: 0.96rem;
        line-height: 0.96rem;
        border-radius: 0.48rem;
        font-size: 0.28rem;
        text-align: center;
        color: #FFFFFF;
        background: linear-gradient(0deg, #DDDDE6, #DDDDE6);

        &.cancel_active{
          background: #FCC478;
        }
      }
      .returned{
        width: 100%;
        height: 0.96rem;
        line-height: 0.96rem;
        border-radius: 0.48rem;
        font-size: 0.28rem;
        text-align: center;
        color: #FFFFFF;
        background: #0CB397;
      }

    }
  }
  .return{
    box-shadow: none;
  }
}
</style>
