<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">
      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup">
        <div class="pop_center">
          <div class="notcomp_content">

            <img class="alert_img" src="@/assets/transactions/ico_paid_yellow.png" alt="" />
            <div class="tips">您已存在正在进行交易的订单，请处理完成后方可再次下单</div>
          </div>
          <div class="notcomp_buttom">
            <div class="cancel" @click="hide">取消</div>
            <div class="confirm" @click="Tohandle">去处理</div>
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
      this.pop = true
    },
    hide() {
      this.pop = false
    },
    Tohandle() {
      console.log('去处理')
      this.$emit('Tohandle')
    }
  }
};
</script>

<style lang="less" scoped>
.popup{
    position: absolute;
    width: 100%;
    height: 4.96rem;
    top: 50%;
    margin-top: -2.48rem;
    overflow-y: auto;
    z-index: 1002;
    left: 0;
    padding: 0 0.8rem;

    .pop_center{
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 0.15rem;
      .notcomp_content{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.64rem 0.8rem 0.8rem;
        .alert_img{
          width: 1.44rem;
          height: 1.44rem;
          text-align: center;
        }
        .tips{
          padding-top: 0.4rem;
          font-family: PingFangSC;
          font-size: 0.28rem;
          line-height: 0.32rem;
          text-align: center;

          color: #40405E;
        }
      }
      .notcomp_buttom{
        display: flex;
        border-top: 1px solid #F5F5FA;
        align-items: center;
        height: 1.04rem;
      }
      .cancel{
        flex: 1;
        font-size: 0.32rem;
        text-align: center;
        color: #A0A0B3;
      }
      .confirm{
        flex: 1;
        font-size: 0.32rem;
        text-align: center;
        color: #0CB397;
      }
    }

}
</style>
