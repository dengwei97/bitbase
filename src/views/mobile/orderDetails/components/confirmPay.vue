<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">
      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup">
        <div class="pop_center">
          <div class="pop_head">
            <img src="../../../../assets/transactions/ico_paid_yellow.png" alt />
            <div class="pop_text">确认已向展示的账户完成转账</div>
            <div class="pop_ts">恶意点击将直接冻结您的账户</div>
          </div>
          <div class="pop_btns">
            <div class="btn1" @click="hide">取消</div>
            <div class="btn2" @click="confirmPay">我已付款成功</div>
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
      pop: false
    };
  },

  created() {},

  methods: {
    show() {
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
  // left: 50%;
  margin-top: -2.57rem;
  // transform: translate3d(calc(-50% + 0.5px), calc(-50% + 0.5px), 0);
  z-index: 2002;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 0 0.8rem;
  .pop_center {
    width: 100%;
    background-color: #ffffff;
    border-radius: 0.12rem;
    .pop_head {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.64rem 0 0.8rem 0;
      img {
        width: 1.44rem;
        height: 1.44rem;
      }
      .pop_text {
        padding-top: 0.4rem;
        font-family: PingFangSC;
        font-size: 0.32rem;
        line-height: 0.38rem;
        color: #40405e;
      }
      .pop_ts {
        padding-top: 0.12rem;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
        color: #f46666;
      }
    }
    .pop_btns {
      display: flex;
      height: 1.04rem;
      align-items: center;
      border-top: 1px solid #f5f5fa;
      .btn1 {
        flex: 1;
        height: 1.04rem;
        line-height: 1.04rem;
        font-family: PingFangSC;
        font-size: 0.32rem;
        text-align: center;
        color: #a0a0b3;
        border-right: 1px solid #f5f5fa;
      }
      .btn2 {
        flex: 1;
        height: 1.04rem;
        line-height: 1.04rem;
        font-family: PingFangSC;
        font-size: 0.32rem;
        text-align: center;
        color: @cl-m;
      }
    }
  }
}
</style>
