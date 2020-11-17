<template>
  <div class="data" >
    <div class="flex_center_between header">
      <div class="flex">
        <div
          :class="{ active_header: type == 'sell' }"
          @click="switchType('sell')"
        >
          发布卖出挂单
        </div>
        <div
          :class="{ active_header: type == 'buy' }"
          @click="switchType('buy')"
        >
          发布买入挂单
        </div>
      </div>
      <img
        class="ic_gray"
        src="@/assets/transactions/ico_order_gray_cl.png"
        alt=""
      />
    </div>
    <section class="section1 text">
      <div class="sect_head flex_center_between">
        <span>{{ type == "sell" ? "我要卖" : "我要买" }}</span>
        <span>USDT/CNY</span>
      </div>
      <div class="sect_cont">
        <div class="flex_center_between row">
          <span>委托价格</span>
          <div class="flex " @click="switchPrice">
            <span class="price">
              {{ priceFlag == 1 ? "固定价格" : "动态价格" }}
            </span>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.05442L1.04494 0L6 5L1.04494 10L0 8.94558L3.90952 4.99973L0 1.05442Z"
                fill="#D5D5ED"
              />
            </svg>
          </div>
        </div>
        <div class="flex price_input" v-if="priceFlag == 1">
          <input
            type="text"
            @input="inputNum"
            v-model="form.coinPrice"
            :placeholder="
              type == 'sell' ? '请输入出售的单价' : '请输入购买的单价'
            "
          />
          <span>CNY</span>
        </div>
        <div v-if="priceFlag == 2">
          <div class="flex price_input">
            <input
              type="text"
              v-model="form.premiumRatio"
              @input="inputNum"
              placeholder="请输入溢价百分比"
            />
            <span>%</span>
          </div>
          <div class="flex benchmarkPrice">
            <div>
              <span>基准价：</span>
              <span>{{ websocketCny }} CNY</span>
            </div>
            <div>
              <span>实际委托价：</span>
              <span>{{ actualPrice }} CNY</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="advertiseType flex_center_between"
      v-if="userInfoDetails.advertiserDoBigSale == 1"
    >
      <span class="text">挂单类型</span>
      <div class="flex" @click="clickType">
        <span class="adv_type">{{
          bigSale == 2 ? "C2C挂单" : "大宗挂单"
        }}</span>
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1.05442L1.04494 0L6 5L1.04494 10L0 8.94558L3.90952 4.99973L0 1.05442Z"
            fill="#D5D5ED"
          />
        </svg>
      </div>
    </section>
    <section class="section text">
      <p>{{ type == "sell" ? "挂单卖出总数量" : "挂单买入总数量" }}</p>
      <div class="inpnt_row flex_center_between">
        <input
          type="text"
          @input="inputNum"
          :placeholder="
            type == 'sell' ? '可输入最大数量' + restNumber : '请输入挂单总数量'
          "
          v-model="form.coinNum"
        />
        <span>USDT</span>
      </div>
      <div class="about">≈ {{ formCny.coinNumCny }} CNY</div>
    </section>
    <section class="section text">
      <p>最小交易量</p>
      <div class="inpnt_row flex_center_between">
        <input
          type="text"
          @input="inputNum"
          :placeholder="'可输入最小交易量' + coinlist.fastTradeLowLimit"
          v-model="form.lowerLimitCoin"
        />
        <span>USDT</span>
      </div>
      <div class="about">≈ {{ formCny.lowerLimitCoinCny }} CNY</div>
    </section>
    <section class="section text">
      <p>最大交易量</p>
      <div class="inpnt_row flex_center_between">
        <input
          type="text"
          @input="inputNum"
          :placeholder="
            type == 'sell'
              ? '可输入最大交易量' + restNumber
              : '请输入最大交易量'
          "
          v-model="form.upperLimitCoin"
        />
        <span>USDT</span>
      </div>
      <div class="about">≈ {{ formCny.upperLimitCoinCny }} CNY</div>
    </section>
    <button @click="submit">
      {{ type == "sell" ? "发布卖出挂单" : "发布买入挂单" }}
    </button>
    <div class="tips">
      <div class="flex tip_title">
        <img
          class="ic_tip"
          src="@/assets/transactions/ic_addlak_buy.png"
          alt=""
        />
        <span class="text">交易说明</span>
      </div>
      <ul>
        <li>
          成为承兑商的用户可免费发布买卖广告，当前可挂卖单总数量的额度为{{
            restNumber
          }}
          USDT；
        </li>
        <li>
          购买广告发布后，将展示在出售交易市场；出售广告发布后，将展示在购买交易市场；
        </li>
        <li>
          动态价格计算公式：委托价=基准价x(1+溢价)；溢价可填写正数、负数，溢价可填写在-5%～5%区间内，最多可保留2位小数。
        </li>
      </ul>
    </div>
    <switchPrice ref="switchPrice" @paymentPrice="paymentPrice"></switchPrice>
    <switchType ref="switchAdvType" @payment="payment"></switchType>
    <paymentType ref="paymentType" @payment="payType"></paymentType>
    <verTransaPwd ref="verTransaPwd" @varTransaSu="varTransaSu"></verTransaPwd>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import buyApi from "@/api/buy";
import orderInfoApi from "@/api/orderInfo";
import switchPrice from "./components/switchPrice";
import switchType from "./components/switchType";
import { inputTwoNumber } from "@/utils";
import paymentType from "@/views/mobile/home/components/paymentType"; //收款付款方式
import verTransaPwd from "@/components/verTransaPwd"; //交易密码弹框
export default {
  data() {
    return {
      websock: null,
      type: "sell", //buy 买 sell 卖
      priceFlag: 1, //1固定价格 2 动态价格
      bigSale: 2, //2 c2c挂单 1大宗挂单
      form: {
        coinPrice: "", //挂单价格
        premiumRatio: "", //溢价比，动态价格需要填写
        lowerLimitCoin: "", //最小交易限额
        upperLimitCoin: "", //最大交易限额
        coinNum: "" //数量
      },
      userInfoDetails: {}, //个人信息
      coinlist: {}, //币种详情
      restNumber: 0, //余额  
      formCny: {
        coinNumCny: "0.00",
        lowerLimitCoinCny: "0.00",
        upperLimitCoinCny: "0.00"
      }, //展示的换算cny
      websocketCny: 0, //长连接的价格
      actualPrice: "0.00", //实际委托价
      payList: "", //收款方式 支付方式
      bindId: "", //收款方式id
      bankList: [] //获取当前已绑定的收款方式
    };
  },
  components: {
    switchPrice,
    switchType,
    paymentType,
    verTransaPwd
  },
  watch: {
    websocketCny: function(val) {
      console.log("----------", val);
      if (this.priceFlag == 2) {
        this.actualPrice = (
          Number(val) *
          (1 + this.form.premiumRatio / 100)
        ).toFixed(2);
        this.formCny.coinNumCny = (
          this.form.coinNum * Number(this.actualPrice)
        ).toFixed(2);
        this.formCny.lowerLimitCoinCny = (
          this.form.lowerLimitCoin * Number(this.actualPrice)
        ).toFixed(2);
        this.formCny.upperLimitCoinCny = (
          this.form.upperLimitCoin * Number(this.actualPrice)
        ).toFixed(2);
      }
    }
  },
  created() {
    // this.getDetails();
    this.getcoinlist();
    this.getWallet();
    this.initWebSocket();
    this.getBindPayment();
    this.userInfoDetails = JSON.parse(localStorage.getItem('userInfoDetails'))
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  mounted() {},
  methods: {
    //获取收款方式
    getBindPayment() {
      userInfoApi.getBindPayment({}).then(res => {
        this.bankList = res.data.data;
      });
    },
    //支付收款方式
    payType(val) {
      console.log("===", val);
      if (val.value == 3 && this.bankList.aliPay == "0") {
          this.$toast("您当前没有绑定支付宝，请选择其他方式");
          return;
        }
        if (val.value == 1 && this.bankList.bank == "0") {
          this.$toast("您当前没有绑定银行卡，请选择其他方式");
          return;
        }
        if (val.value == 2 && this.bankList.wechat == "0") {
          this.$toast("您当前没有绑定微信，请选择其他方式");
          return;
        }
      this.payList = val.value;
      if (this.type == "sell") {
        ////
        //pro承兑商
        if (this.userInfoDetails.advertiserLevel == "3") {
          this.$refs.verTransaPwd.show();
        } else {
          // 不是pro承兑商
          let adverDetail = {};
          if (this.priceFlag == 1) {
            //固定价格
            adverDetail = {
              tradeType: 2,
              coinName: "USDT",
              coinNum: this.form.coinNum,
              coinPrice: this.form.coinPrice,
              priceFlag: this.priceFlag,
              lowerLimitCoin: this.form.lowerLimitCoin,
              upperLimitCoin: this.form.upperLimitCoin,
              bigSale: this.bigSale,
              payList: this.payList
            };
            sessionStorage.setItem("adverDetails", JSON.stringify(adverDetail));
          } else {
            //动态价格
            adverDetail = {
              tradeType: 2,
              coinName: "USDT",
              coinNum: this.form.coinNum,
              premiumRatio: this.form.premiumRatio / 100,
              priceFlag: this.priceFlag,
              lowerLimitCoin: this.form.lowerLimitCoin,
              upperLimitCoin: this.form.upperLimitCoin,
              bigSale: this.bigSale,
              payList: this.payList
            };
            sessionStorage.setItem("adverDetails", JSON.stringify(adverDetail));
          }

          this.$router.push("/mAdverPayList/" + val.value);
        }
      }else{
        this.$refs.verTransaPwd.show();
      }
    },
    varTransaSu(val) {
      if (val.length < 6) {
        this.$toast("请输入6位支付密码！");
        return;
      }
      let tradeType;
      if(this.type == "sell"){
        tradeType = 2
      }else{
        tradeType = 1
      }
      //固定价格
      if (this.priceFlag == 1) {
        userInfoApi
          .advertiserCreate({
            tradeType: tradeType,
            coinName: "USDT",
            coinNum: this.form.coinNum,
            coinPrice: this.form.coinPrice,
            priceFlag: this.priceFlag,
            lowerLimitCoin: this.form.lowerLimitCoin,
            upperLimitCoin: this.form.upperLimitCoin,
            tradePwd: val,
            bigSale: this.bigSale,
            payList: this.payList
          })
          .then(res => {
            this.$refs.verTransaPwd.hide();
            // console.log('-----',res)
            this.$toast("挂单发布成功");
            this.initialization();
          })
          .catch(err => {
            // this.$refs.verTransaPwd.hide()
            this.$toast(err.data.message);
          });
      } else {
        //动态价格
        userInfoApi
          .advertiserCreate({
            tradeType: tradeType,
            coinName: "USDT",
            coinNum: this.form.coinNum,
            premiumRatio: this.form.premiumRatio / 100,
            priceFlag: this.priceFlag,
            lowerLimitCoin: this.form.lowerLimitCoin,
            upperLimitCoin: this.form.upperLimitCoin,
            tradePwd: val,
            bigSale: this.bigSale,
            payList: this.payList
          })
          .then(res => {
            this.$refs.verTransaPwd.hide();
            // console.log('-----',res)
            this.$toast("挂单发布成功");
            this.initialization();
          })
          .catch(err => {
            // this.$refs.verTransaPwd.hide()
            this.$toast(err.data.message);
          });
      }
    },
    //发布挂单
    submit() {
      //固定价格
      if (this.priceFlag == 1) {
        if (
          !this.form.coinPrice ||
          !this.form.lowerLimitCoin ||
          !this.form.upperLimitCoin ||
          !this.form.coinNum
        ) {
          this.$toast("请填写完整");
          return;
        }
        if (
          this.form.coinPrice >
            (Number(this.coinlist.coinToCny) * 1.05).toFixed(2) ||
          this.form.coinPrice <
            (Number(this.coinlist.coinToCny) * 0.95).toFixed(2)
        ) {
          this.$toast(
            "委托价格在" +
              (Number(this.coinlist.coinToCny) * 0.95).toFixed(2) +
              "~" +
              (Number(this.coinlist.coinToCny) * 1.05).toFixed(2)
          );
          return;
        }
      } else {
        //动态价格
        if (
          !this.form.premiumRatio ||
          !this.form.lowerLimitCoin ||
          !this.form.upperLimitCoin ||
          !this.form.coinNum
        ) {
          this.$toast("请填写完整");
          return;
        }
        if (this.form.premiumRatio > 5 || this.form.premiumRatio < -5) {
          this.$toast("溢价比的范围在-5%~5%之间");
          return;
        }
      }
      if (
        Number(this.form.lowerLimitCoin) <
        Number(this.coinlist.fastTradeLowLimit)
      ) {
        this.$toast("最小交易量不能小于" + this.coinlist.fastTradeLowLimit);
        return;
      }
      if (
        Number(this.form.lowerLimitCoin) > Number(this.form.coinNum) ||
        Number(this.form.lowerLimitCoin) > Number(this.form.upperLimitCoin)
      ) {
        this.$toast("最小交易量不能大于挂单总数量或最大交易量");
        return;
      }
      if (Number(this.form.upperLimitCoin) > Number(this.form.coinNum)) {
        this.$toast("最大交易量不能大于挂单总数量");
        return;
      }
      if (this.type == "sell") {
        

        if (Number(this.form.coinNum) > Number(this.restNumber)) {
          this.$toast("挂单总数量不能大于余额");
          return;
        }             

        

        this.$refs.paymentType.show(2);
      } else {
        this.$refs.paymentType.show(1);
      }
    },
    // 连接socket
    initWebSocket() {
      //初始化weosocket
      var wsuri = this.$appConfig.webscoket;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { type: "1" };
      this.websocketsend(JSON.stringify(actions));
      // console.log("连接成功");
    },
    websocketonerror() {
      //连接建立失败重连
      console.log("连接失败");
      setTimeout(() => {
        this.initWebSocket();
      }, 2000);
    },
    websocketonmessage(e) {
      const redata = JSON.parse(e.data);
      if (redata.type == "2") {
        this.websocketCny = redata.data[0].coinToCny;
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },

    //数据初始化
    initialization() {
      this.form.coinPrice = "";
      this.form.premiumRatio = "";
      this.form.lowerLimitCoin = "";
      this.form.upperLimitCoin = "";
      this.form.coinNum = "";
      this.formCny.coinNumCny = "0.00";
      this.formCny.lowerLimitCoinCny = "0.00";
      this.formCny.upperLimitCoinCny = "0.00";
      this.actualPrice = "0.00";
    },
    inputNum() {
      this.form.coinPrice = inputTwoNumber(this.form.coinPrice);
      if (this.form.premiumRatio.charAt(0) == "-") {
        this.form.premiumRatio = "-" + inputTwoNumber(this.form.premiumRatio);
      } else {
        this.form.premiumRatio = inputTwoNumber(this.form.premiumRatio);
      }
      this.form.lowerLimitCoin = inputTwoNumber(this.form.lowerLimitCoin);
      this.form.upperLimitCoin = inputTwoNumber(this.form.upperLimitCoin);
      this.form.coinNum = inputTwoNumber(this.form.coinNum);

      if (this.priceFlag == 2) {
        this.actualPrice = (
          Number(this.websocketCny) *
          (1 + this.form.premiumRatio / 100)
        ).toFixed(2);
        this.formCny.coinNumCny = (
          this.form.coinNum * Number(this.actualPrice)
        ).toFixed(2);
        this.formCny.lowerLimitCoinCny = (
          this.form.lowerLimitCoin * Number(this.actualPrice)
        ).toFixed(2);
        this.formCny.upperLimitCoinCny = (
          this.form.upperLimitCoin * Number(this.actualPrice)
        ).toFixed(2);
      } else {
        this.formCny.coinNumCny = (
          this.form.coinNum * Number(this.coinlist.coinToCny)
        ).toFixed(2);
        this.formCny.lowerLimitCoinCny = (
          this.form.lowerLimitCoin * Number(this.coinlist.coinToCny)
        ).toFixed(2);
        this.formCny.upperLimitCoinCny = (
          this.form.upperLimitCoin * Number(this.coinlist.coinToCny)
        ).toFixed(2);
      }
    },
    //获取钱包余额
    getWallet() {
      orderInfoApi
        .getWallet({
          coinName: "USDT",
          walletType: 1
        })
        .then(res => {
          this.restNumber = res.data.data;
        });
    },
    //获取币种信息
    getcoinlist() {
      buyApi
        .getcoinlist({
          coinName: "USDT"
        })
        .then(res => {
          // console.log(res);
          this.coinlist = res.data.data[0];
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },

    // //获取个人详情
    // getDetails() {
    //   userInfoApi.getUserInfoDetails().then(res => {
    //     this.userInfoDetails = res.data.data;
    //   });
    // },
    //买卖单切换
    switchType(val) {
      this.type = val;
      this.priceFlag = 1;
      this.bigSale = 2;
      this.initialization();
    },
    //委托价格切换
    switchPrice() {
      this.$refs.switchPrice.show(this.priceFlag);
    },
    //挂单类型切换
    clickType() {
      this.$refs.switchAdvType.show(this.bigSale);
    },
    paymentPrice(val) {
      this.priceFlag = val;
      this.initialization();
    },
    payment(val) {
      this.bigSale = val;
      // this.initialization();
    }
  }
};
</script>

<style lang='less' scoped>
.data {
  padding: 0.6rem 0.32rem;
  background: #f7f7fa;
  input::-webkit-input-placeholder {
    color: #dddde6;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex_center_between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #40405e;
  }
  .header {
    padding: 0 0 0.36rem 0.18rem;
    div {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #a0a0b3;
      padding-right: 0.48rem;
      &.active_header {
        font-size: 0.36rem;
        color: #40405e;
        font-weight: bold;
      }
    }
    .ic_gray {
      width: 0.48rem;
      height: 0.48rem;
    }
  }
  .section1 {
    padding: 0.24rem 0.32rem;
    background: #fff;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
    .sect_head {
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #f5f5fa;
    }
    .sect_cont {
      .row {
        padding: 0.24rem 0 0.16rem;
        .price {
          font-size: 0.24rem;
          padding-right: 0.16rem;
        }
      }
      .price_input {
        input {
          flex: 1;
          font-size: 0.4rem;
        }
        span {
          padding-left: 0.32rem;
          font-size: 0.32rem;
        }
      }

      .benchmarkPrice {
        font-size: 0.24rem;
        margin-top: 0.24rem;
        padding-top: 0.24rem;
        border-top: 1px solid #f5f5fa;
        div:first-child {
          padding-right: 0.6rem;
        }
      }
    }
  }
  .advertiseType {
    padding: 0.32rem;
    background: #fff;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
    .adv_type {
      font-size: 0.24rem;
      padding-right: 0.16rem;
    }
  }
  .section {
    padding: 0.24rem 0.32rem;
    background: #fff;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
    .inpnt_row {
      padding: 0.18rem 0 0.2rem;
      border-bottom: 1px solid #f5f5fa;
      input {
        flex: 1;
        font-size: 0.32rem;
      }
      span {
        padding-left: 0.32rem;
      }
    }
    .about {
      padding-top: 0.24rem;
      font-size: 0.24rem;
      line-height: 0.28rem;
    }
  }
  button {
    margin-top: 0.48rem;
    font-size: 0.32rem;
    height: 0.96rem;
    width: 100%;
    color: #fff;
    background: @cl-m;
    border-radius: 0.48rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tips {
    padding-top: 0.48rem;
    .tip_title {
      .ic_tip {
        width: 0.32rem;
        height: 0.32rem;
      }
      span {
        font-weight: bold;
        padding-left: 0.16rem;
      }
    }
    ul li {
      font-size: 0.26rem;
      line-height: 0.4rem;
      padding: 0.2rem 0 0 0.48rem;
      color: #a0a0b3;
    }
  }
}
</style>