<template>
  <div class="register">
    <h2>修改密码</h2>
    <div>
      <ul>
        <li>
          <input :type="pwdType1" placeholder="请输入原密码" v-model="pwd1" @input="inputFunction()" />
          <div @click="changType1" class="eyeimg">
            <img :src="seen1?openeye:nopeneye" alt />
          </div>
        </li>
        <li>
          <input :type="pwdType2" placeholder="请设置新密码" v-model="pwd2" @input="inputFunction()" />
          <div @click="changType2" class="eyeimg">
            <img :src="seen2?openeye:nopeneye" alt />
          </div>
        </li>
        <li>
          <input :type="pwdType3" placeholder="再次确认密码" v-model="pwd3" @input="inputFunction()" />
          <div @click="changType3" class="eyeimg">
            <img :src="seen3?openeye:nopeneye" alt />
          </div>
        </li>
      </ul>
      <button
        class="button"
        :disabled="disabled"
        :class="{active:!disabled}"
        @click="Submitted"
      >确认修改</button>
      <router-link to="/mForget" class="forget">忘记密码？</router-link>
    </div>
  </div>
</template>

<script>
import userInfoApi from '@/api/userInfo'
export default {
  name: "mChangePwd",
  data() {
    return {
      //密码显示  不显示 相关
      seen1: true,
      seen2: true,
      seen3: true,
      pwdType1: "password",
      pwdType2: "password",
      pwdType3: "password",
      openeye: require("@/assets/transactions/ico_unvisible.png"),
      nopeneye: require("@/assets/transactions/ico_visible.png"),
      pwd1: "", //原密码
      pwd2: "", //新密码
      pwd3: "", //确认密码
      disabled: true
    };
  },
  created() {
    // this.getIp()
  },
  mounted() {},
  computed: {},
  methods: {
    changType1() {
      this.pwdType1 = this.pwdType1 == "password" ? "text" : "password";
      this.seen1 = !this.seen1;
    },
    changType2() {
      this.pwdType2 = this.pwdType2 == "password" ? "text" : "password";
      this.seen2 = !this.seen2;
    },
    changType3() {
      this.pwdType3 = this.pwdType3 == "password" ? "text" : "password";
      this.seen3 = !this.seen3;
    },
    //判断注册按钮是否启用
    inputFunction() {
      if (
        this.pwd3 != "" &&
        this.pwd1 != "" &&
        this.pwd2 != ""
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    //确认修改
    Submitted() {
      // console.log("---------------");
      if (this.pwd2.length < 6 || this.pwd3.length < 6) {
        this.$toast("密码长度不能少于6位");
        return;
      }
      if (this.pwd2 !== this.pwd3) {
        this.$toast("两次密码不一样，请确认");
        return;
      }
      userInfoApi
        .changePwd({
          oldPwd:this.pwd1,
          pwd:this.pwd3,
        })
        .then(res => {
          this.$toast.success("修改成功！")
          setTimeout(() => {
            this.$toast.clear();
            this.$router.push('/home');
          }, 1200)
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  padding: 0 0.32rem;
  h2 {
    padding: 1.2rem 0 0.6rem 0;
    margin: 0;
    font-family: PingFangSC;
    font-size: 0.44rem;
    line-height: 0.62rem;
    color: #21233d;
    text-align: center;
  }
  ul li {
    width: 100%;
    height: 0.96rem;
    display: flex;
    align-items: center;
    padding: 0.24rem 0;
    background: #f7f7fa;
    border-radius: 0.12rem;
    margin-bottom: 0.32rem;

    input {
      flex: 1;
      background: transparent;
      font-family: PingFangSC;
      font-size: 0.3rem;
      color: #40405e;
      padding: 0 0.24rem;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #a1abba;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #a1abba;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #a1abba;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #a1abba;
    }
    .eyeimg {
      width: 1.32rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.32rem;
        height: 0.32rem;
      }
    }
  }
  .button {
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    background: linear-gradient(0deg, #dddde6, #dddde6);
    border-radius: 0.48rem;
    font-family: PingFangSC;
    font-size: 0.32rem;
    color: #ffffff;
  }
  .active {
    background: @cl-m;
  }
  .forget {
    display: block;
    padding-top: 0.32rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    text-align: center;

    color: @cl-m;
  }
}
</style>
