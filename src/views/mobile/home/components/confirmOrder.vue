<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">
      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup">
        <div class="pop_center">
          <div class="pop_t">
            <ul>
              <li>
                <div class="poptitle">购买USDT</div>
                <img class="pop_img" src="@/assets/transactions/ico_usdt.png" alt />
              </li>
              <li>
                <div class="poptext">单价</div>
                <div class="poptext text_h">{{ details.price }} CNY</div>
              </li>
              <li>
                <div class="poptext">交易数量</div>
                <div class="poptext text_h">{{ details.usdt }} USDT</div>
              </li>
              <li>
                <div class="poptext">实付款</div>
                <div class="popnum">￥{{ details.cny }}</div>
              </li>
            </ul>
            <div class="tips">
              <img class="tips_img" src="@/assets/transactions/ico_tip_small.png" alt />
              <div class="tips_text">转账金额必须保持一致，包含小数位</div>
            </div>
          </div>
          <div class="btns">
            <div class="poptext btn1" @click="hide">取消</div>
            <div class="poptext text_b btn2" @click="confirm">确认购买</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buyApi from "@/api/buy.js";
export default {
  data() {
    return {
      details: {
        purchaseType: '',
        type: '',
        from: '',
        price: '',
        usdt: '',
        cny: ''
      },
      pop: false
    };
  },

  created() {},

  methods: {
    show(value) {
      this.details.price = value.price
      this.details.purchaseType = value.purchaseType
      this.details.type = value.type
      this.details.from = value.from

      if (value.purchaseType == 1) {
        this.details.cny = value.cny
        this.details.usdt = (value.cny / value.price).toFixed(6)

        // var num = value.cny / value.price
        // var num1 = num.toString()
        // var index = num1.indexOf('.')
        // this.details.usdt = num1.slice(0, index + 3);
      } else {
        this.details.usdt = value.usdt
        this.details.cny = (value.usdt * value.price).toFixed(2)
        // var num = value.usdt * value.price
        // var num1 = num.toString()
        // var index = num1.indexOf('.')
        // this.details.cny = num1.slice(0, index + 3);
      }
      this.pop = true;
    },
    hide() {
      this.pop = false;
    },
    confirm() {
      console.log('确认购买')
      this.$emit('confirmOrder', this.details)
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: absolute;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  z-index: 1002;
  left: 0;
  bottom: 0.56rem;
  padding: 0 0.32rem;

  .pop_center {
    width: 100%;
    background-color: #fff;
    border-radius: 0.15rem;
    .poptext {
      font-family: PingFangSC;
      font-size: 0.28rem;
      line-height: 0.32rem;
    }
    .text_h {
      color: #a0a0b3;
    }
    .text_b {
      color: #ffffff;
    }
    .pop_t {
      padding: 0.08rem 0.32rem 0;
      .poptitle {
        font-size: 0.32rem;
        line-height: 0.38rem;
        color: #40405e;
      }
      .pop_img {
        width: 0.56rem;
        height: 0.56rem;
      }
      .popnum {
        font-size: 0.48rem;
        line-height: 0.56rem;
        color: @cl-m;
      }
      ul li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5fa;
        padding: 0.36rem 0;
      }
      .tips {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.4rem 0 0.56rem;
        .tips_img {
          width: 0.32rem;
          height: 0.32rem;
        }
        .tips_text {
          padding-left: 0.16rem;
          font-family: PingFangSC;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #f2a145;
        }
      }
    }
    .btns {
      padding: 0 0.2rem 0.54rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn1 {
        background: linear-gradient(0deg, #dddde6, #dddde6);
        border-radius: 0.48rem;
        width: 2.6rem;
        height: 0.96rem;
        line-height: 0.96rem;
        text-align: center;
      }
      .btn2 {
        background: @cl-m;
        border-radius: 0.48rem;
        width: 3.6rem;
        height: 0.96rem;
         line-height: 0.96rem;
        text-align: center;
      }
    }
  }
}
</style>
