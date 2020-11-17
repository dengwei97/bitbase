<template>
  <div class="register">
    <h2>忘记密码</h2>
    <div>
      <ul>
        <li>
          <div class="code" @click="toCode">
            <span>{{ areaNo }}</span>
            <img class="small_bottom" src="@/assets/transactions/ico_select_solid_small_bottom.png" alt="">
          </div>
          <input v-model="mobile" type="text" placeholder="请输入手机号" @input="inputFunction()" />
        </li>
        <li>
          <input v-model="code" type="text" placeholder="请输入验证码" @input="inputFunction()" />
          <div v-show="show" class="send" @click="send">发送</div>
          <div v-show="!show" class="send">{{ count }}s</div>
        </li>
        <li>
          <input v-model="pwd1" :type="pwdType1" placeholder="请设置密码" @input="inputFunction()" />
          <div class="eyeimg" @click="changType1">
            <img :src="seen1?openeye:nopeneye" alt />
          </div>
        </li>
        <li>
          <input v-model="pwd2" :type="pwdType2" placeholder="再次确认密码" @input="inputFunction()" />
          <div class="eyeimg" @click="changType2">
            <img :src="seen2?openeye:nopeneye" alt />
          </div>
        </li>
      </ul>
      <button class="button" :disabled="disabled" :class="{active:!disabled}" @click="Submitted">确认修改</button>
      
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import buyApi from "@/api/buy";
import { regular } from "@/utils/constants";
export default {
  name: "mForget",
  data() {
    return {
      // 密码显示  不显示 相关
      seen1: true,
      seen2: true,
      pwdType1: "password",
      pwdType2: "password",
      openeye: require("@/assets/transactions/ico_unvisible.png"),
      nopeneye: require("@/assets/transactions/ico_visible.png"),
      mobile: "", //手机号
      code: "", //验证码
      pwd1: "", //第一次密码
      pwd2: "", //确认密码
      disabled: true,
      // 倒计时相关
      show: true,
      count: "",
      timer: null,
      openId: window.localStorage.getItem("openId"),
      productId: window.localStorage.getItem("productId")
    };
  },
  computed: {
    areaNo() {
      // return this.$store.state.user.areaNo;
      return window.localStorage.getItem("areaNo")
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
    toCode() {
      this.$router.push("/mChoiceAreaNo");
    },
    changType1() {
      this.pwdType1 = this.pwdType1 == "password" ? "text" : "password";
      this.seen1 = !this.seen1;
    },
    changType2() {
      this.pwdType2 = this.pwdType2 == "password" ? "text" : "password";
      this.seen2 = !this.seen2;
    },
    // 判断注册按钮是否启用
    inputFunction() {
      if (
        this.mobile != "" &&
        this.code != "" &&
        this.pwd1 != "" &&
        this.pwd2 != ""
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 获取验证码
    send() {
      // console.log(this.areaNo.split('+')[1])
      // this.areaNo.splict(0,1)
      if (!this.mobile) {
        this.$toast("请输入手机号");
        return;
      }
      buyApi
        .mobileCode({
          account: this.mobile,
          areaNo: this.areaNo.split("+")[1]
        })
        .then(res => {
          // console.log(res);
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
    // 注册
    Submitted() {
      // console.log("---------------");
      if (this.pwd1.length < 6 || this.pwd2.length < 6) {
        this.$toast('密码长度不能少于6位')
        return
      }
      if (this.pwd1 !== this.pwd2) {
        this.$toast("两次密码不一样，请确认");
        return
      }
      buyApi
        .getReset({
          account: this.mobile,
          areaNo: this.areaNo.split("+")[1],
          pwd: this.pwd2,
          code: this.code

        })
        .then(res => {
          // console.log(res);
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
    .code {
      height: 100%;
      padding: 0 0.24rem;
      display: flex;
      align-items: center;
      font-family: PingFang HK;
      font-size: 0.3rem;
      color: #40405e;
      border-right: 1px solid #ededf2;
      .small_bottom{
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
  .btn1 {
    display: block;
    width: 100%;
    height: 0.96rem;
    text-align: center;
    line-height: 0.96rem;
    border: 1px solid @cl-m;
    border-radius: 0.48rem;
    font-size: 0.32rem;
    color: @cl-m;
    margin-top: 0.46rem;
  }
}
</style>
