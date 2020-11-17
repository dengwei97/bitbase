<template>
  <div class="register">
    <h2>登录{{ $appConfig.upperName }}</h2>
    <div class="type">
      <div :class="{ active: type == 1 }" class="typetext" @click="choice(1)">
        验证码登录
      </div>
      <div
        :class="{ active: type == 2 }"
        class="typetext type2"
        @click="choice(2)"
      >
        密码登录
      </div>
    </div>
    <div>
      <ul>
        <li>
          <div class="code" @click="toCode">
            <span>{{ areaNo }}</span>
            <img
              class="small_bottom"
              src="@/assets/transactions/ico_select_solid_small_bottom.png"
              alt=""
            />
          </div>
          <input
            v-model="form.mobile"
            type="text"
            placeholder="请输入手机号"
            @input="inputFunction()"
          />
        </li>
        <li v-if="type == 1">
          <input
            v-model="form.code"
            type="text"
            placeholder="请输入验证码"
            @input="inputFunction()"
          />
          <div v-show="show" class="send" @click="send">发送</div>
          <div v-show="!show" class="send">{{ count }}s</div>
        </li>
        <li v-if="type == 2">
          <input
            v-model="form.pwd"
            :type="pwd.pwdType"
            placeholder="请输入密码"
            @input="inputFunction()"
          />
          <div class="eyeimg" @click="changType">
            <img :src="pwd.seen ? pwd.openeye : pwd.nopeneye" alt />
          </div>
        </li>
      </ul>
      <button
        class="button"
        :disabled="disabled"
        :class="{ active: !disabled }"
        @click="Submitted"
      >
        登录
      </button>
      <router-link to="/mregister" class="mregister"
        >暂无账号，去注册</router-link
      >
      <router-link to="/mForget" class="forget">忘记密码？</router-link>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import buyApi from "@/api/buy";
import { regular } from "@/utils/constants";
export default {
  name: "MLogin",
  data() {
    return {
      type: 1,
      // 密码显示  不显示 相关
      pwd: {
        seen: true,
        pwdType: "password",
        openeye: require("@/assets/transactions/ico_unvisible.png"),
        nopeneye: require("@/assets/transactions/ico_visible.png")
      },
      form: {
        mobile: "", // 手机号
        code: "", // 验证码
        pwd: "" // 第一次密码
      },
      disabled: true,
      // 倒计时相关
      show: true,
      count: "",
      timer: null
      // openId: window.localStorage.getItem("openId"),
      // productId: window.localStorage.getItem("productId")
    };
  },
  computed: {
    areaNo() {
      return window.localStorage.getItem("areaNo");
      // return this.$store.state.user.areaNo;
    }
  },
  created() {
    // this.getIp()
  },
  mounted() {},
  methods: {
    // getIp(){
    //   userInfoApi.ipApi({}).then(res => {
    //     console.log(res.data.data.callCode)
    //     if(!res.data.data.callCode){
    //        this.$store.state.user.areaNo = '+86'
    //     }else{
    //       this.$store.state.user.areaNo = '+' + res.data.data.callCode
    //     }
    //   })
    // },
    choice(value) {
      this.disabled = true;
      this.form.mobile = "";
      this.form.code = "";
      this.form.pwd = "";
      this.type = value;
    },
    toCode() {
      this.$router.push("/mChoiceAreaNo");
    },
    changType() {
      this.pwd.pwdType = this.pwd.pwdType == "password" ? "text" : "password";
      this.pwd.seen = !this.pwd.seen;
    },

    // 判断注册按钮是否启用
    inputFunction() {
      if (this.type == 1) {
        if (this.form.mobile != "" && this.form.code != "") {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      } else {
        if (this.form.mobile != "" && this.form.pwd != "") {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    },
    // 获取验证码
    send() {
      // console.log(this.areaNo.split('+')[1])
      // this.areaNo.splict(0,1)
      if (!this.form.mobile) {
        this.$toast("请输入手机号");
        return;
      }
      buyApi
        .mobileCode({
          account: this.form.mobile,
          areaNo: this.areaNo.split("+")[1]
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.Countdown();
          }
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    // 倒计时
    Countdown() {
      const timecount = 60;
      if (!this.timer) {
        this.count = timecount;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= timecount) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 登录
    Submitted() {
      console.log("---------------");
      if (this.type == 1) {
        buyApi
          .register1({
            account: this.form.mobile,
            areaNo: this.areaNo.split("+")[1],
            code: this.form.code,
            location: 2
            // openId: this.openId,
            // productId: this.productId
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              window.localStorage.setItem("token", res.data.data.token);
              this.$store.state.user.isToken = res.data.data.token;

              userInfoApi.getUserInfoKSY().then(res => {
                res = res.data.data;
                res.kyc = res.kyc - 0;
                window.localStorage.setItem("type", res.tradeType);
                window.localStorage.setItem(
                  "personalInfo",
                  JSON.stringify(res)
                );
                if (res.kyc <= 0) {
                  this.$router.push({
                    path: "/mregistrationSuccess",
                    params: {
                      register: true
                    }
                  });
                } else {
                  this.$router.push({
                    path: "/home",
                    name: "home"
                  });
                }
              });
            }
          })
          .catch(err => {
            this.$toast(err.data.message);
          });
      } else {
        buyApi
          .register1({
            account: this.form.mobile,
            areaNo: this.areaNo.split("+")[1],
            loginPwd: this.form.pwd,
            location: 2
            // openId: this.openId,
            // productId: this.productId
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              window.localStorage.setItem("token", res.data.data.token);
              this.$store.state.user.isToken = res.data.data.token;
              userInfoApi.getUserInfoKSY().then(res => {
                res = res.data.data;
                res.kyc = res.kyc - 0;
                window.localStorage.setItem("type", res.tradeType);
                window.localStorage.setItem(
                  "personalInfo",
                  JSON.stringify(res)
                );
                if (res.kyc <= 0) {
                  this.$router.push({
                    path: "/mregistrationSuccess",
                    params: {
                      register: true
                    }
                  });
                } else {
                  this.$router.push({
                    path: "/home",
                    name: "home"
                  });
                }
              });
            }
          })
          .catch(err => {
            this.$toast(err.data.message);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  padding: 0 0.32rem;
  h2 {
    padding: 1.2rem 0;
    margin: 0;
    font-family: PingFangSC;
    font-size: 0.44rem;
    line-height: 0.62rem;
    color: #21233d;
    text-align: center;
  }
  .type {
    display: flex;
    justify-content: center;
    padding-bottom: 0.56rem;
    .typetext {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #a0a0b3;
      border-radius: 0.32rem;
      background: #ffffff;
      padding: 0.12rem 0.4rem;
    }
    .type2 {
      margin-left: 0.24rem;
    }
    .active {
      color: @cl-m;
      background: #f5f5fa;
    }
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
    .code {
      height: 100%;
      padding: 0 0.24rem;
      display: flex;
      align-items: center;
      font-family: PingFang HK;
      font-size: 0.3rem;
      color: #40405e;
      border-right: 1px solid #ededf2;
      .small_bottom {
        width: 0.1rem;
        margin-left: 0.14rem;
      }
    }
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
    .send {
      width: 1.32rem;
      // height: 100%;
      align-self: center;
      text-align: center;
      font-family: PingFangSC;
      font-size: 0.26rem;
      color: @cl-m;
      border-left: 1px solid #ededf2;
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
    margin-top: 0.24rem;
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
    padding-top: 0.48rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    text-align: center;

    color: @cl-m;
  }
  .mregister {
    margin-top: 0.46rem;
    display: block;
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: center;
    font-size: 0.32rem;
    color: #0cb397;
    border: 1px solid #0cb397;
    border-radius: 0.48rem;
  }
}
</style>
