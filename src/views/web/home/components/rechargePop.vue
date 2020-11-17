<template>
  <div v-show="showPop" class="recharge">
    <div class="bg"></div>
    <div class="content">
      <div class="img_box img-box">
        <img class="img" src="@/assets/transactions/ico_alert_red12313.png" />
      </div>
      <div class="txt">当前交易账户余额不足，请完成充币后再继续交易</div>
      <div class="btn_box flex flex_middle">
        <div class="btn flex_1 pointer" @click="hide">取消</div>
        <div class="btn flex_1 pointer" @click="recharge">去充币</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RechargePop",
  props: {},
  data() {
    return {
      showPop: false
    };
  },
  mounted() {},
  methods: {
    show() {
      this.showPop = true
    },
    hide() {
      this.showPop = false
    },
    recharge() {
      this.$emit('recharge')
    }
  }
};
</script>

<style lang="less" scoped>
  .recharge{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
    }
    .content{
      position: relative;
      width: 440px;
      background: #FFFFFF;
      border-radius: 4px;
      z-index: 101;
      .img_box{
        padding-top: 48px;
        text-align: center;
        .img{
          width: 72px;
          height: 72px;
        }
      }
      .txt{
        padding: 20px 0 50px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color: #40405E;
      }
      .btn_box{
        border-top: 1px solid #F5F5FA;
        height: 70px;
        line-height: 70px;
        .btn{
          text-align: center;
          font-size: 16px;
          line-height: 22px;
          color: #A0A0B3;
          &:last-child{
            border-left: 1px solid #F5F5FA;
            color: #0CB397;
          }
        }
      }
    }
  }

</style>
