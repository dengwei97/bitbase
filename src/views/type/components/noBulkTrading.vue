<template>
  <div class="pop" v-if="pop">
    <div class="popcontent">
      <div class="header">
        <img src="@/assets/transactions/ico_alert_red.png" alt="" />
        <div class="text">
          对不起，您暂时没有大宗交易区权限
					<br>
				您可以联系客服开通交易权限
        </div>
      </div>
      <div class="btns">
        <button class="btn1" @click="hide">取消</button>
        <button class="btn2" @click="customerService">联系客服</button>
      </div>
    </div>
  </div>
</template>

<script>
import { customerService } from "@/utils/index";
export default {
  data() {
    return {
      pop: false
    };
  },

  methods: {
    customerService() {
      customerService()
    },
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
.pop {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

  .popcontent {
    width: 6rem;
    background: #ffffff;
    border-radius: 0.12rem;
    .header {
      text-align: center;
      padding: 0.64rem 0 0.8rem;
      img {
        width: 1.44rem;
        height: 1.44rem;
      }
      .text {
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #a0a0b3;
      }
    }
    .btns {
      display: flex;
      height: 1.04rem;
      align-items: center;
      border-top: 1px solid #f5f5fa;
      button {
        flex: 1;
        cursor: pointer;
        height: 100%;
        font-size: 0.32rem;
        color: #a0a0b3;
      }
      .btn2 {
        color: @cl-m;
        border-left: 1px solid #f5f5fa;
      }
    }
  }
}
</style>
