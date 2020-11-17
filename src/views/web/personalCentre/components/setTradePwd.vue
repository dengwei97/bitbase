<template>
  <div class="pop" v-if="pop">
    <div class="popcontent">
      <div class="header">
        <div>
          {{
            user.type == 1 ? "设置" : user.type == 2 ? "修改" : "忘记"
          }}交易密码
        </div>
        <img
          @click="hide"
          src="@/assets/transactions/ico_web_close.png"
          alt=""
        />
      </div>
      <div class="content">
        <div v-if="user.type != 2">
          <div class="tips">验证码已发送至{{ user.account | mobile }}</div>
          <div class="code">
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <span v-show="!countdown.show">{{ countdown.count }}s</span>
            <span v-show="countdown.show" @click="send" style="cursor: pointer"
              >发送</span
            >
          </div>
        </div>

      
        <div v-if="user.type == 3">

          <div class="flex_center_between tips"  >
              <div>输入身份验证信息</div>
              <div class="cl_m">{{this.user.certificateType == 1 ? '身份证' : this.user.certificateType == 2 ? '驾照' : '护照'}}</div>
            </div>
            <input
              class="input "
              type="text"
              placeholder="请输入您的真实姓名"
              v-model="realName"
            />
            <input
              class="input card"
              type="text"
              placeholder="请输入您的证件号码"
              v-model="idCard"
            />
        </div>
        <div v-if="user.type != 3" class="tips">{{user.type == 1 ? '交易密码' : '原交易密码'}}</div>
        <input type="password" ref='pwd' maxlength="6" v-model="pwd" @input="tradepwd" class="pwdInput">

        <pwdLattice v-if="user.type != 3" :msg='pwd'   @click.native="onClickPwd('pwd')"></pwdLattice>

        <div v-if="user.type != 1" class="tips">新交易密码</div>
        <input type="password" ref='newPwd1' maxlength="6" v-model="newPwd1" @input="newTradepwd1" class="pwdInput">

        <pwdLattice v-if="user.type != 1" :msg='newPwd1' @click.native="onClickPwd('newPwd1')"></pwdLattice>

        <div v-if="user.type != 1" class="tips">确认交易密码</div>
        <input type="password" ref='newPwd2' maxlength="6" v-model="newPwd2" @input="newTradepwd2" class="pwdInput">

        <pwdLattice v-if="user.type != 1" :msg='newPwd2' @click.native="onClickPwd('newPwd2')"></pwdLattice>
      </div>
      <div class="footer">
        <button @click="submit">确定</button>
      </div>
      <div class="recovery" v-if="user.type == 2">
        忘记交易密码？<span @click="recoveryPwd">前往找回</span>
      </div>
    </div>
  </div>
</template>

<script>
import pwdLattice from "@/components/pwdLattice";
import buyApi from "@/api/buy";
import userInfoApi from "@/api/userInfo";
export default {
  data() {
    return {
      pop: false,
      user: {}, //电话区号类型 1 设置  2 修改  3 忘记
      // 倒计时相关
      countdown: {
        show: true,
        count: "",
        timer: null
      },
      pwd: "", //交易密码  原交易密码
      newPwd1: "", //新交易密码
      newPwd2: "", //新交易密码2
      code: "", //验证码
      idCard: "", //重置密码卡号
      realName: "" //重置密码姓名
    };
  },
  components: {
    pwdLattice
  },

  methods: {
    //找回密码
    recoveryPwd() {
      this.$emit("recoveryPwd");
    },
    //密码
    tradepwd() {
      if (/[^\d]/g.test(this.pwd)) {
        this.pwd = this.pwd.replace(/[^\d]/g, "");
      } 
      // console.log('原',this.pwd) 
    },

    onClickPwd(value){
      if(value == 'pwd'){

        this.$refs.pwd.focus();
      }else if(value == 'newPwd1'){
        this.$refs.newPwd1.focus();

      }else if(value == 'newPwd2'){
        this.$refs.newPwd2.focus();
      }
    },
    //新交易密码1
    newTradepwd1() {
      if (/[^\d]/g.test(this.newPwd1)) {
        this.newPwd1 = this.newPwd1.replace(/[^\d]/g, "");
      } 
      // console.log('新',this.newPwd1)
    },
    //新交易密码2
    newTradepwd2() {
      if (/[^\d]/g.test(this.newPwd2)) {
        this.newPwd2 = this.newPwd2.replace(/[^\d]/g, "");
      } 
      // console.log('新xing',this.newPwd2)
    },
    submit() {
      // console.log('原密码',this.pwd)
      // console.log('密码',this.newPwd1)
      // console.log('密码2',this.newPwd2)
      let data;
      if (this.user.type == 1) {
        if(!this.code || !this.pwd){
          this.$toast('还有内容没有填写完')
          return
        }
        data = {
          account: this.user.account,
          areaNo: this.user.areaNo,
          pwd: this.pwd,
          code: this.code,
          pwdType: 2
        };
      } else if (this.user.type == 2) {
        if(!this.pwd ||  !this.newPwd2){
          this.$toast('还有内容没有填写完')
          return
        }
        if (this.newPwd1 !== this.newPwd2) {
          this.$toast("两次输入的密码不同！");
          return;
        }
        data = {
          oldPwd: this.pwd,
          pwd: this.newPwd2,
          pwdType: 2
        };
      } else {
        if(!this.code || !this.idCard || !this.realName || !this.newPwd2){
          this.$toast('还有内容没有填写完')
          return
        }
        if (this.newPwd1 !== this.newPwd2) {
          this.$toast("两次输入的密码不同！");
          return;
        }
        data = {
          account: this.user.account,
          areaNo: this.user.areaNo,
          pwd: this.newPwd2,
          code: this.code,
          pwdType: 2,
          idCard: this.idCard,
          realName: this.realName
        };
      }
      userInfoApi
        .changePwd(data)
        .then(res => {
          this.$toast.success("操作成功！");
          setTimeout(() => {
            this.$toast.clear();
            this.pop = false;
            this.$emit("submit");
          }, 1000);
        })
        .catch(err => {
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
    },
    // 获取验证码
    send() {
      buyApi
        .mobileCode({
          account:this.user.account,
          areaNo:this.user.areaNo
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.CountdownNumber();
          }
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    show(value) {
      this.user = value;
      this.pwd = "";
      this.newPwd1 = "";
      this.newPwd2 = "";
      this.code = "";
      if (value.type != 2) {
        this.CountdownNumber();
      }
      // this.user = value
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
  input::-webkit-input-placeholder {
    color: #babcbf;
  }

  .popcontent {
    width: 440px;
    background: #ffffff;
    border-radius: 10px;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 30px 20px 16px;
      font-size: 18px;
      line-height: 20px;
      border-bottom: 1px solid #dddde6;
      img {
        width: 16px;
        height: 16px;
      }
    }
    .content {
      .pwdInput{
        position: absolute;
        // left: 100%;
        width: 1px;
        height:1px;
        z-index: -1;
        opacity: 0;
      }
      padding: 5px 20px 0;
      .tips {
        font-size: 14px;
        line-height: 20px;
        color: #40405e;
        padding: 20px 0 8px;
      }
      .cl_m{
        color: @cl-m;
      }
      .flex_center_between {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .input {
        font-size: 16px;
        width: 100%;
        padding: 14px 13px;
        border: 1px solid #dddde6;
        border-radius: 4px;
      }
      .card {
        margin-top: 16px;
      }
      .code {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 22px;
        padding: 14px 13px;
        border: 1px solid #dddde6;
        border-radius: 4px;

        input {
          flex: 1;
        }
        span {
          color: @cl-m;
        }
      }
    }
    .footer {
      width: 100%;
      padding: 30px 20px 20px;

      display: flex;
      button {
        width: 100%;
        height: 48px;
        background: @cl-m;
        border-radius: 41px;
        text-align: center;
        line-height: 48px;
        color: #ffffff;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .recovery {
      display: flex;
      justify-content: center;
      font-size: 14px;
      line-height: 20px;
      color: #40405e;
      padding-bottom: 28px;
      span {
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 1200px) {
  .pop {
    .popcontent {
      width: 440px * 0.8;
      .header {
        padding: 30px * 0.8 20px * 0.8 16px * 0.8;
        font-size: 18px * 0.8;
        line-height: 20px * 0.8;
        img {
          width: 16px * 0.8;
          height: 16px * 0.8;
        }
      }
      .content {
        padding: 5px * 0.8 20px * 0.8 0;
        .tips {
          font-size: 14px * 0.8;
          line-height: 20px * 0.8;
          padding: 20px * 0.8 0 8px * 0.8;
        }
        .input {
          font-size: 16px * 0.8;
          padding: 14px * 0.8 13px * 0.8;
        }
        .card {
          margin-top: 16px * 0.8;
        }
        .code {
          font-size: 16px * 0.8;
          line-height: 22px * 0.8;
          padding: 14px * 0.8 13px * 0.8;
        }
      }
      .footer {
        padding: 30px * 0.8 20px * 0.8 20px * 0.8;

        button {
          height: 48px * 0.8;
          line-height: 48px * 0.8;
          font-size: 18px * 0.8;
        }
      }
      .recovery {
        font-size: 14px * 0.8;
        line-height: 20px * 0.8;
        padding-bottom: 28px * 0.8;
      }
    }
  }
}
</style>
