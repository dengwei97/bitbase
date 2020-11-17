<template>
  <div class="webLogin">
    <div class="content">
      <div class="title">
        <div class="typeText" :class="{active:type == 1}" @click="choice(1)">验证码登录</div>
        <div class="typeText type2" :class="{active:type == 2}" @click="choice(2)">密码登录</div>
      </div>
      <div class="form_item">
        <el-select v-model="value" filterable @change="areaNo">
          <el-option
            v-for="(item,index) in codelist"
            :key="index"
            :label="item.label"
            :value="item.areaNo"
          >
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
        <div class="input">
          <input
            v-model="form.name"
            class="content_text nameInput"
            placeholder="请输入手机号"
            type="text"
            @input="inputFunction()"
          />
        </div>
      </div>
      <div v-if="type == 1" class="form_item formInterval">
        <div class="input">
          <input
            v-model="form.code"
            type="text"
            class="content_text codeInput"
            placeholder="请输入验证码"
            @input="inputFunction()"
          />
        </div>
        <div v-show="countdown.show" class="send content_text" @click="send">发送</div>
        <div v-show="!countdown.show" class="send content_text">{{ countdown.count }}s</div>
      </div>
      <div v-if="type == 2" class="form_item formInterval">
        <div class="input">
          <input
            v-model="form.pwd"
            :type="pwd.pwdType"
            class="content_text"
            placeholder="请输入密码"
            @input="inputFunction()"
          />
        </div>
        <div class="eyeimg" @click="changType">
          <img :src="pwd.seen?pwd.openeye:pwd.nopeneye" alt />
        </div>
      </div>

      <router-link to="/forget" class="loginTips">忘记密码？</router-link>
      <div class="btns">
        <button class="btn1" :disabled="disabled" :class="{active:!disabled}" @click="submit">登录</button>
        <router-link to="/register" class="btn2">去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import buyApi from "@/api/buy";
import { phoneCode } from "@/utils/constants";
export default {
  name: "WebLogin",
  data() {
    return {
      type: 1,
      codelist: [], // 区号
      // value: "+86", //默认的显示区号
      value: window.localStorage.getItem("areaNo"),

      form: {
        areaNos: window.localStorage.getItem("areaNo").split("+")[1], // 传出的区号
        name: "",
        code: "",
        pwd: "",
        // openId: window.localStorage.getItem("openId"),
        // productId: window.localStorage.getItem("productId")
      },
      // 密码相关
      pwd: {
        seen: true,
        pwdType: "password",
        openeye: require("@/assets/transactions/ico_unvisible.png"),
        nopeneye: require("@/assets/transactions/ico_visible.png")
      },
      // 倒计时相关
      countdown: {
        show: true,
        count: "",
        timer: null
      },
      disabled: true
    };
  },
  mounted() {
    const codes = phoneCode.codes;
    codes.forEach((item, index) => {
      this.codelist.push({
        value: phoneCode.countrys_cn[index],
        label: "+" + codes[index],
        areaNo: codes[index]
      });
    });
    // this.getIp()
  },
  methods: {
    // getIp(){
    //   userInfoApi.ipApi({}).then(res => {
    //     console.log(res.data.data.callCode )
    //     if(!res.data.data.callCode ){
    //       this.value = '+86'
    //     }else{
    //       this.value = '+' + res.data.data.callCode
    //     }
    //   })
    // },
    choice(value) {
      this.type = value;
      this.form.name = ''
      this.form.code = ''
      this.form.pwd = ''
      this.disabled = true
    },
    submit() {
      if (this.type == 1) {
        buyApi.register1({
          account: this.form.name,
          areaNo: this.form.areaNos,
          code: this.form.code,
          location: 2
          // openId: this.form.openId,
          // productId: this.form.productId
        }).then(res => {
          if (res.data.code == 0) {
            window.localStorage.setItem("token", res.data.data.token);
            this.$store.state.user.isToken = res.data.data.token;
            userInfoApi.getUserInfoKSY().then(res => {
              res = res.data.data
              res.kyc = res.kyc - 0
              window.localStorage.setItem('type',res.tradeType)
              window.localStorage.setItem('personalInfo',JSON.stringify(res))
            if(res.kyc <= 0){
              this.$router.push({
              path: '/registerSuccess',
              params: {
                register: true
              }
            })
            } else {
              this.$router.push({
              path:'/home',
              name:'home'
            })
            }
            })
          }
        }).catch(err => {
          this.$toast(err.data.message)
        })
      } else {
        buyApi.register1({
          account: this.form.name,
          areaNo: this.form.areaNos,
          loginPwd: this.form.pwd,
          location: 2
          // openId: this.form.openId,
          // productId: this.form.productId
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            window.localStorage.setItem("token", res.data.data.token);
            this.$store.state.user.isToken = res.data.data.token;
            userInfoApi.getUserInfoKSY().then(res => {
              res = res.data.data
              res.kyc = res.kyc - 0
              window.localStorage.setItem('type',res.tradeType)
              window.localStorage.setItem('personalInfo',JSON.stringify(res))
              // this.$store.state.user.personalInfo = res;

              console.log('*/*/*/*',res)
            if(res.kyc <= 0){
              this.$router.push({
              path: '/registerSuccess',
              params: {
                register: true
              }
            })
            } else {
              this.$router.push({
              path:'/home',
              name:'home'
            })
            }
            })
          }
        }).catch(err => {
          this.$toast(err.data.message)
        })
      }
    },
    // 判断注册按钮是否启用
    inputFunction() {
      if (this.type == 1) {
        if (this.form.name != '' && this.form.code != '') {
          this.disabled = false;
        } else {
          this.disabled = true
        }
      } else {
        if (this.form.name != '' && this.form.pwd != '') {
          this.disabled = false;
        } else {
          this.disabled = true
        }
      }
    },
    changType() {
      this.pwd.pwdType = this.pwd.pwdType == "password" ? "text" : "password";
      this.pwd.seen = !this.pwd.seen;
    },

    areaNo(e) {
      this.form.areaNos = e;
      window.localStorage.setItem("areaNo", '+' + e);
    },
    // 获取验证码
    send() {
      if (!this.form.name) {
        this.$toast('请输入手机号')
        return
      }
      buyApi
        .mobileCode({
          account: this.form.name,
          areaNo: this.form.areaNos
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            this.CountdownNumber();
          }
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    // 倒计时
    CountdownNumber() {
      const timecount = 60;
      if (!this.countdown.timer) {
        this.countdown.count = timecount;
        this.countdown.show = false;
        this.countdown.timer = setInterval(() => {
          if (this.countdown.count > 0 && this.countdown.count <= timecount) {
            this.countdown.count--;
          } else {
            this.countdown.show = true;
            clearInterval(this.countdown.timer);
            this.countdown.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style  lang="less" scoped>
.webLogin {
  background: #ffffff;
  padding-top: 40px;
  .content {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 790px;
    height: 494px;
    margin: 0 auto;
    padding-top: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      display: flex;
      justify-content: center;
      padding-bottom: 40px;
      .typeText {
        font-size: 18px;
        line-height: 24px;
        font-weight: 600;
        color: #40405e;
        cursor: pointer;
      }
      .type2 {
        padding-left: 40px;
      }
      .active {
        color: @cl-m;
      }
    }
    .form_item {
      width: 481px;
      height: 52px;
      display: flex;
      border: 1px solid #dcdfe4;
      border-radius: 6px;
      .content_text {
        font-size: 14px;
        color: #14171a;
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
      .input {
        flex: 1;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          padding: 0 14px;
          height: 24px;
          border: 0;
          box-sizing: border-box;
          border-radius: 0;
        }
        .nameInput {
          border-left: 1px solid #dcdfe4;
        }

        .codeInput {
          border-right: 1px solid #dcdfe4;
        }
      }
      .send {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 68px;
        height: 52px;
        color: @cl-m;
        cursor: pointer;
      }
      .eyeimg {
        width: 68px;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @cl-m;
        cursor: pointer;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .formInterval {
      margin-top: 16px;
    }
    .loginTips {
      display: flex;
      width: 481px;
      padding: 15px 0 0 15px;
      font-size: 14px;
      line-height: 20px;
      color: @cl-m;
      cursor: pointer;
    }
    .btns {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      width: 481px;
      .btn1 {
        width: 280px;
        height: 48px;
        font-size: 16px;
        color: #ffffff;
        background: #dddde6;
        border-radius: 41px;
        cursor: pointer;
        &.active {
          background: @gd-m1;
        }
      }
      .btn2 {
        display: inline-block;
        width: 170px;
        height: 48px;
        border: 1px solid @cl-m;
        border-radius: 41px;
        font-weight: 500;
        font-size: 16px;
        line-height: 48px;
        text-align: center;
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 1200px) {
  .webLogin {
  padding-top: 40px * 0.8;
  .content {
    width: 790px * 0.8;
    height: 494px * 0.8;
    padding-top: 110px * 0.8;
    .title {
      padding-bottom: 40px * 0.8;
      .typeText {
        font-size: 18px * 0.8;
        line-height: 24px * 0.8;
      }
      .type2 {
        padding-left: 40px * 0.8;
      }
    }
    .form_item {
      width: 481px * 0.8;
      height: 52px * 0.8;
      .content_text {
        font-size: 14px * 0.8;
      }
      .input {
        input {
          padding: 0 14px * 0.8;
          height: 24px * 0.8;
        }
      }
      .send {
        width: 68px * 0.8;
        height: 52px * 0.8;
      }
      .eyeimg {
        width: 68px * 0.8;
        height: 52px * 0.8;
        img {
          width: 16px * 0.8;
          height: 16px * 0.8;
        }
      }
    }
    .formInterval {
      margin-top: 16px * 0.8;
    }
    .loginTips {
      width: 481px * 0.8;
      padding: 15px * 0.8 0 0 15px * 0.8;
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
    }
    .btns {
      margin-top: 30px * 0.8;
      width: 481px * 0.8;
      .btn1 {
        width: 280px * 0.8;
        height: 48px * 0.8;
        font-size: 16px * 0.8;
        border-radius: 41px * 0.8;
      }
      .btn2 {
        width: 170px * 0.8;
        height: 48px * 0.8;
        border-radius: 41px * 0.8;
        font-size: 16px * 0.8;
        line-height: 48px * 0.8;
      }
    }
  }
}
}
</style>
