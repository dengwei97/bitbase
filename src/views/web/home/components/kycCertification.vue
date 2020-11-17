<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">

      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup1">
        <div class="pop_center1">
          <div class="pop_head1">
            <img src="@/assets/transactions/ico_alert_red.png" alt />
            <div class="pop_text1">请填写资料，进行更高额度交易</div>
          </div>
          <div class="pop_btns">
            <div class="btn1" @click="hide">取消</div>
            <div class="btn2" @click="toKyc">去填写</div>
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
    toKyc() {
      console.log('确定取消')
      this.$emit('toKyc')
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
  margin-top: -200px;
  margin-left: -220px;

  z-index: 2002;

  .pop_center1 {
    width: 100%;
    background-color: #ffffff;
    border-radius: 6px;

    .pop_head1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 0 50px;
      img {
        width: 72px;
        height: 72px;
      }
      .pop_text1 {
        padding-top: 20px;
        font-size: 14px;
        line-height: 20px;
        color: #40405e;
      }
    }
    .pop_btns {
      display: flex;
      height: 72px;
      align-items: center;
      border-top: 1px solid #f5f5fa;
      .btn1 {
        flex: 1;
        height: 72px;
        line-height: 72px;
        font-family: PingFangSC;
        font-size: 16px;
        text-align: center;
        color: #A0A0B3;
        border-right: 1px solid #f5f5fa;
        cursor: pointer;
      }
      .btn2 {
        flex: 1;
        height: 72px;
        line-height: 72px;
        font-family: PingFangSC;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        color: #0CB397;
      }
    }
  }
}
@media (max-width: 1200px){
  .popup1 {
  width: 440px * 0.8;
  margin-top: -200px * 0.8;
  margin-left: -220px * 0.8;
  .pop_center1 {
    .pop_head1 {
      padding: 48px * 0.8 0 50px * 0.8;

      .pop_text1 {
        padding-top: 20px * 0.8;
      }
    }
    .pop_btns {
      height: 72px * 0.8;
      .btn1 {
        height: 72px * 0.8;
        line-height: 72px * 0.8;
      }
      .btn2 {
        height: 72px * 0.8;
        line-height: 72px * 0.8;
      }
    }
  }
}
}
</style>
