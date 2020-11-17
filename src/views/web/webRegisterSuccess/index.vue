<template>
  <div class="webRegisterSuccess">
    <div class="tips">
      <img class="success" src="@/assets/transactions/ico_success.png" alt />
      <div class="title">{{ register?'账户登录成功':'账户注册成功' }}</div>
      <div
        class="content"
      >{{ register?'账户已登录成功，请下载'+$appConfig.upperName+' app直接进行登录使用':'账户已注册完成，请下载'+$appConfig.upperName+' app直接进行账户登录' }}</div>
      <button class="btn" @click="downloadApp">去下载APP</button>
    </div>
  </div>
</template>

<script>
import { getDownUrl } from "@/utils/index";
export default {
  name: "WebRegisterSuccess",
  data() {
    return {
      register: false
    };
  },
  created() {
    this.register = this.$route.params.register;
    // console.log(this.register)
  },
  mounted() {},
  methods: {
    downloadApp() {
      // window.location.href = config.downurl;

      getDownUrl();
    }
  }
};
</script>

<style lang="less" scoped>
.webRegisterSuccess {
  padding-top: 40px;
  background: #ffffff;
  .tips {
    margin: 0 auto;
    width: 790px;
    height: 494px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .success {
      width: 72px;
      height: 72px;
    }
    .title {
      padding-top: 25px;
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      color: #40405e;
    }
    .content {
      padding: 20px 0 50px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;

      color: #a0a0b3;
    }
    .btn {
      width: 226px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: 1px solid #15b894;
      border-radius: 41px;
      font-size: 16px;
      color: #15b894;
      cursor: pointer;
    }
  }
}
@media (max-width: 1200px) {
  .webRegisterSuccess {
    padding-top: 40px * 0.8;
    .tips {
      width: 790px * 0.8;
      height: 494px * 0.8;
      .success {
        width: 72px * 0.8;
        height: 72px * 0.8;
      }
      .title {
        padding-top: 25px * 0.8;
      }
      .content {
        padding: 20px * 0.8 0 50px * 0.8;
      }
      .btn {
        width: 226px * 0.8;
        height: 48px * 0.8;
        line-height: 48px * 0.8;
      }
    }
  }
}
</style>
