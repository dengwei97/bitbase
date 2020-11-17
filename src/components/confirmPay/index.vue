<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">
      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup">
        <div class="pop_center">
          <div class="pop_head">
            <img src="@/assets/transactions/ico_paid_yellow.png" alt />
            <div class="pop_text">{{ tradeType == 1 ? '确认已向展示的账户完成转账' : '确认已向展示的账户完成转币' }}</div>
            <div class="pop_ts">恶意点击将直接冻结您的账户</div>
          </div>
          <div class="pop_btns">
            <div class="btn1" @click="hide">取消</div>
            <div class="btn2" @click="confirmPay">{{ tradeType == 1 ? '我已付款成功' : '我已转币成功' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pop: false,
      tradeType: 1
    };
  },

  created() {},

  methods: {
    show(value) {
      this.tradeType = value | 1
      this.pop = true;
    },
    hide() {
      this.pop = false;
    },
    confirmPay() {
      this.$emit('confirmPay')
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 440px;
  margin-left: -220px;
  margin-top: -127px;

  z-index: 2002;

  .pop_center {
    width: 100%;
    background-color: #ffffff;
    border-radius: 6px;
    .pop_head {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 0 40px 0;
      img {
        width: 72px;
        height: 72px;
      }
      .pop_text {
        padding-top: 20px;
        font-family: PingFangSC;
        font-size: 16px;
        line-height: 19px;
        color: #40405e;
      }
      .pop_ts {
        padding-top: 6px;
        font-family: PingFangSC;
        font-size: 14px;
        line-height: 16px;
        color: #f46666;
      }
    }
    .pop_btns {
      display: flex;
      height: 52px;
      align-items: center;
      border-top: 1px solid #f5f5fa;
      .btn1 {
        flex: 1;
        height: 52px;
        line-height: 52px;
        font-family: PingFangSC;
        font-size: 16px;
        text-align: center;
        color: #a0a0b3;
        border-right: 1px solid #f5f5fa;
        cursor: pointer;
      }
      .btn2 {
        flex: 1;
        height: 52px;
        line-height: 52px;
        font-family: PingFangSC;
        font-size: 16px;
        text-align: center;
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}
@media(max-width: 767px){
  .popup {
  width: 6rem;
  margin-left: -3rem;
  margin-top: -2.57rem;
  .pop_center {
    border-radius: 0.12rem;
    .pop_head {
      padding: 0.64rem 0 0.8rem 0;
      img {
        width: 1.44rem;
        height: 1.44rem;
      }
      .pop_text {
        padding-top: 0.4rem;
        font-size: 0.32rem;
        line-height: 0.38rem;
      }
      .pop_ts {
        padding-top: 0.12rem;
        font-size: 0.28rem;
        line-height: 0.32rem;
      }
    }
    .pop_btns {
      height: 1.04rem;
      .btn1 {
        height: 1.04rem;
        line-height: 1.04rem;
        font-size: 0.32rem;
      }
      .btn2 {
        height: 1.04rem;
        line-height: 1.04rem;
        font-size: 0.32rem;
      }
    }
  }
}
}
</style>
