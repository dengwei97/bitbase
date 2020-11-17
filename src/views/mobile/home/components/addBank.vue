<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">
      <div class="pop_absolute_box_bg"></div>
      <div v-if="pop" class="popup">
        <div class="pop_center">
          <div class="notcomp_content">
            <img class="alert_img" src="@/assets/transactions/ico_alert_red.png" alt />
            <div class="pop_title">添加银行卡</div>
            <div class="tips">请确认姓名准确无误，后续将只能添加同一持卡人名下的银行卡</div>
          </div>
          <div class="notcomp_buttom" @click="hide">确认</div>
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
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: absolute;
  width: 100%;
  height: 5.52rem;
  top: 50%;
  margin-top: -2.76rem;
  overflow-y: auto;
  z-index: 1002;
  left: 0;
  padding: 0 0.8rem;

  .pop_center {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 0.15rem;
    .notcomp_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.64rem 0.8rem 0.8rem;
      .alert_img {
        width: 1.44rem;
        height: 1.44rem;
        text-align: center;
      }
      .pop_title {
        padding-top: 0.4rem;
        font-size: 0.36rem;
        line-height: 0.42rem;
        text-align: center;
        color: #40405e;
      }
      .tips {
        padding-top: 0.12rem;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
        text-align: center;
        color: #a0a0b3;
      }
    }
    .notcomp_buttom {
      border-top: 1px solid #f5f5fa;
      height: 1.04rem;
      line-height: 1.04rem;
      font-family: PingFangSC;
      font-size: 0.32rem;
      text-align: center;

      color: #f2a145;
    }
  }
}
</style>
