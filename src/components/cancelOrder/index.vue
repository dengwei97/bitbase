<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">

      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup1">
        <div class="pop_center1">
          <div class="pop_head1">
            <img src="@/assets/transactions/ico_alert_red.png" alt />
            <div class="pop_text1">确认取消订单</div>
            <div class="pop_ts1">{{ tradeType == 1 ? '如果您已付款，请千万不要点击“取消订单”' : '如果您已完成转币，请千万不要点击“取消订单”' }}</div>
            <div class="pop_ts2">{{ tradeType == 1 ? '若买家当日累计取消订单达三笔，将会限制当日买入功能' : '若卖家当日累计取消订单达三笔，将会限制当日出售功能' }}</div>
          </div>
          <div class="pop_btns">
            <div class="btn1" @click="hide">{{ tradeType == 1 ? '去付款' : '去转账' }}</div>
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
  left: 50%;
  width: 440px;
  height: 330px;
  margin-top: -165px;
  margin-left: -220px;
  // transform: translate3d(calc(-50% + 0.5px), calc(-50% + 0.5px), 0);
  z-index: 2002;

  .pop_center1 {
    width: 100%;
    background-color: #ffffff;
    border-radius: 6px;

    .pop_head1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 32px 40px 32px;
      img {
        width: 72px;
        height: 72px;
      }
      .pop_text1 {
        padding-top: 20px;
        font-family: PingFangSC;
        font-size: 18px;
        line-height: 21px;
        color: #40405e;
      }
      .pop_ts1 {
        padding-top: 6px;
        font-family: PingFangSC;
        font-size: 14px;
        line-height: 18px;
        color: #a0a0b3;
      }
      .pop_ts2 {
        padding-top: 8px;
        font-family: PingFangSC;
        font-size: 12px;
        line-height: 16px;
        color: #f2a145;
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
        color: @cl-m;
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
        cursor: pointer;
        color: #a0a0b3;
      }
    }
  }
}

@media(max-width: 767px){
  .popup1 {
  width: 6rem;
  margin-top: -3.19rem;
  margin-left:-3rem ;
  .pop_center1 {
    border-radius: 0.12rem;

    .pop_head1 {
      padding: 0.64rem 0.64rem 0.8rem 0.64rem;
      img {
        width: 1.44rem;
        height: 1.44rem;
      }
      .pop_text1 {
        padding-top: 0.4rem;
        font-size: 0.36rem;
        line-height: 0.42rem;
      }
      .pop_ts1 {
        padding-top: 0.12rem;
        font-size: 0.28rem;
        line-height: 0.36rem;
      }
      .pop_ts2 {
        padding-top: 0.16rem;
        font-size: 0.24rem;
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
