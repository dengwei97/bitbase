<template>
  <div class="waitCheck">
    <img src="@/assets/transactions/ico_wart.png" />
    <p>正在验证中</p>
    <p class="con">身份验证需要1-2小时，请耐心等待</p>
    <button @click="go()">好的</button>
  </div>
</template>

<script>
export default {
  name: "MWaitCheck",
  methods: {
    go() {
      this.$router.push('/mtransactions')
    }
  }
};
</script>
<style lang="less" scoped>
.waitCheck {
  width: 100vw;
  height: calc(100vh - 1.16rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.32rem;
  img {
    width: 1.44rem;
    height: 1.44rem;
    margin-top:1.28rem;
  }
  p {
    margin-top: 0.48rem;
    padding: 0;
    font-weight: 500;
    font-size: 18px;
    color: #40405e;
    margin-top:.48rem;
  }
  .con {
    font-size: 14px;
    font-weight: normal;
    color: #a0a0b3;
    margin-top: 0.12rem;
  }
  button {
    width: 100%;
    height: 0.96rem;
    background: @cl-m;
    border-radius: 0.48rem;
    font-weight: 500;
    font-size: 0.32rem;
    color: #ffffff;
    margin-top: 0.96rem;
  }
}
</style>
