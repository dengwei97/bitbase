<template>
  <div class="registrationSuccess">
    <div class="tips">
      <img class="success" src="@/assets/transactions/ico_success.png" alt />
      <div class="title">{{ register?'账户登录成功':'账户注册成功' }}</div>
      <div class="content">{{ register?'账户已登录成功，请下载'+$appConfig.upperName+' app直接进行登录使用':'账户已注册完成，请下载'+$appConfig.upperName+' app直接进行账户登录' }}</div>
    </div>
    <div class="btn" @click="downloadApp">
      <!-- <a :href="downurl"> 去下载APP</a> -->
      <button>去下载APP</button>
    </div>
  </div>
</template>

<script>
import { getDownUrl } from "@/utils/index"
export default {
  name: "RegistrationSuccess",
  components: {
  },
  data() {
    return {
      register: false
    };
  },
  created() {
    this.register = this.$route.params.register
  },
  methods: {
    downloadApp() {
      getDownUrl()
    }
  }
};
</script>

<style lang='less' scoped>
.registrationSuccess {
  .tips {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.28rem 0 0.56rem 0;
    .success {
      width: 1.44rem;
      height: 1.44rem;
    }
    .title {
      font-family: PingFangSC;
      font-size: 0.36rem;
      line-height: 0.42rem;
      color: #40405e;
      padding: 0.48rem 0 0.12rem 0;
      font-weight: 600;
    }
    .content {
      font-family: PingFangSC;
      font-size: 0.28rem;
      line-height: 0.36rem;
      color: #a0a0b3;
      padding: 0 1.4rem;
      text-align: center;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .btn {
    padding: 0 0.32rem;
    button {
      width: 100%;
      height: 0.96rem;
      background: @cl-m;
      border-radius: 0.48rem;
      font-family: PingFangSC;
      font-size: 0.32rem;
      line-height: 0.96rem;
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>
