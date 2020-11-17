<template>
  <div>
    <div class="pop_absolute_box" v-if="popup">
      <div class="pop_absolute_box_bg"></div>
      <div class="popup" v-if="popup">
        <ul class="pop_center">
          <div class="pop_tits">账号信息</div>
          <li>
            <div class="tit">UID</div>
            <div class="tit_h">{{ personalInfo.userId }}</div>
          </li>
          <li>
            <div class="tit">账号</div>
            <div class="tit_h">{{ personalInfo.mobile }}</div>
          </li>
          <li @click="gomwallet">
            <div class="tit">资产</div>
            <div class="flex">
              
              <img src="@/assets/transactions/ico_arrow_right.png" alt />
            </div>
          </li>
          <li @click="goUserCentre">
            <div class="tit">个人中心</div>
            <div class="flex">
              <!-- <span class="tit_h">修改</span> -->
              <img src="@/assets/transactions/ico_arrow_right.png" alt />
            </div>
          </li>
          <!-- <li>
            <div class="tit">修改密码</div>
            <div class="flex" @click="mChangePwd">
              <span class="tit_h">修改</span>
              <img src="@/assets/transactions/ico_arrow_right.png" alt />
            </div>
          </li>
          <li>
            <div class="tit">身份验证</div>
            <div class="flex" @click="mAuthentication">
              <span v-if="personalInfo.kycStatus == 2" class="tit Verification">已验证</span>
              <span v-else class="tit noVerification">未认证</span>
              <img src="@/assets/transactions/ico_arrow_right.png" alt />
            </div>
          </li> -->
          <div class="btns">
            <button class="btn1 tit" @click="hide">取消</button>
            <button class="btn2 tit" @click="removeToken">退出账号</button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: false,
      personalInfo: ""
    };
  },

  created() {
    this.personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
  },

  methods: {
    show(value) {
      this.personalInfo = value;
      this.popup = true;
    },
    hide() {
      this.popup = false;
    },
    removeToken() {
      this.$emit("removeToken");
      this.popup = false;
    },
    mChangePwd() {
      this.popup = false;
      this.$router.push("/mChangePwd");
    },
    mAuthentication() {
      this.popup = false;
      this.$router.push("/mThrough");
    },
    goUserCentre() {
      this.$router.push({
        path:'/mpersonalCentre'
      })
      this.popup = false;
    },
    gomwallet() {
      this.$router.push({
        path:'/mwallet'
      })
      this.popup = false;
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: absolute;
  width: 100%;
  max-height: 100%;
  z-index: 1002;
  left: 0;
  bottom: 0.56rem;
  padding: 0 0.32rem;

  .pop_center {
    width: 100%;
    background-color: #fff;
    border-radius: 0.15rem;

    .tit {
      font-family: PingFangSC;
      font-size: 0.28rem;
      color: #40405e;
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .tit_h {
      font-size: 0.28rem;
      color: #a0a0b3;
    }
    .pop_tits {
      padding: 0 0.32rem;
      height: 1.3rem;
      font-size: 0.32rem;
      font-weight: bold;
      line-height: 1.3rem;
      color: #40405e;
      border-bottom: 1px solid #f5f5fa;
    }
    li {
      padding: 0 0.32rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.32rem;
      border-bottom: 1px solid #f5f5fa;
      img {
        width: 0.12rem;
      }
      span {
        padding-right: 0.24rem;
      }
      .Verification {
        color: #00cf00;
      }
      .noVerification {
        color: #f0446b;
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0.2rem;
      .btn1 {
        width: 2.6rem;
        height: 0.96rem;
        line-height: 0.96rem;
        background: linear-gradient(0deg, #dddde6, #dddde6);
        border-radius: 0.48rem;
      }
      .btn2 {
        width: 3.6rem;
        height: 0.96rem;
        line-height: 0.96rem;
        background: #0cb397;
        border-radius: 0.48rem;
        color: #ffffff;
      }
    }
  }
}
</style>
