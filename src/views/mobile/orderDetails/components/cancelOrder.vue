<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">

      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup1">
        <div class="pop_center1">
          <div class="pop_head1">
            <img src="../../../../assets/transactions/ico_alert_red.png" alt />
            <div class="pop_text1">确认取消订单</div>
            <div class="pop_ts1">如果您已付款，请千万不要点击“取消订单”</div>
            <div class="pop_ts2">若买家当日累计取消订单达三笔，将会限制当日买入功能</div>
          </div>
          <div class="pop_btns">
            <div class="btn1" @click="hide">去付款</div>
            <div class="btn2" @click="cancelOrder">确认取消</div>
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
    cancelOrder() {
      console.log('确定取消')
      this.$emit('cancelOrder')
    }
  }
};
</script>

<style lang="less" scoped>
.popup1 {
  position: absolute;
  top: 50%;
  // left: 50%;
  margin-top: -3.19rem;
  // transform: translate3d(calc(-50% + 0.5px), calc(-50% + 0.5px), 0);
  z-index: 2002;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 0 0.8rem;
  .pop_center1 {
    width: 100%;
    background-color: #ffffff;
    border-radius: 0.12rem;

    .pop_head1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.64rem 0.64rem 0.8rem 0.64rem;
      img {
        width: 1.44rem;
        height: 1.44rem;
      }
      .pop_text1 {
        padding-top: 0.4rem;
        font-family: PingFangSC;
        font-size: 0.36rem;
        line-height: 0.42rem;
        color: #40405e;
      }
      .pop_ts1 {
        padding-top: 0.12rem;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.36rem;
        color: #a0a0b3;
      }
      .pop_ts2 {
        padding-top: 0.16rem;
        font-family: PingFangSC;
        font-size: 0.24rem;
        line-height: 0.32rem;
        color: #f2a145;
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
        color: @cl-m;
        border-right: 1px solid #f5f5fa;
      }
      .btn2 {
        flex: 1;
        height: 1.04rem;
        line-height: 1.04rem;
        font-family: PingFangSC;
        font-size: 0.32rem;
        text-align: center;

        color: #a0a0b3;
      }
    }
  }
}
</style>
