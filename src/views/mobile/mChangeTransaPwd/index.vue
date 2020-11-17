<template>
  <div class="data">
    <!-- 第一步 -->
    <div v-if="step == 1">
      <div v-if="type == 2">
        <h5>请输入原支付密码</h5>
        <div class="tips_text">请输入原6位数字支付密码</div>
        <div class="pwd_lattice">
					<input type="password" ref='oldPwd' maxlength="6" v-model="form.oldPwd" @input="oldtradepwd" class="pwdInput">

          <pwdLattice  :msg='form.oldPwd'   @click.native="onClickPwd('oldPwd')"></pwdLattice>
        </div>
        <div class="forget" @click="forget">忘记支付密码？</div>
      </div>
      <div v-if="type != 2">
        <div class="form_item text">
          您的登录手机号为“<span class="cl_m">{{userInfoDetails.mobile}}</span>”
        </div>
        <div class="form_item send_code text">
          <input
            type="number"
            v-model="form.code"
            placeholder="请输入手机验证码"
          />
          <div class="send" v-show="!countdown.show">
            {{ countdown.count }}s
          </div>
          <div class="send" v-show="countdown.show" @click="send">发送</div>
        </div>
      </div>

      <div v-if="type == 3">
        <p class="text title">输入身份验证信息</p>
        <div class="form_item text paper_type">
          <span>您的身份验证的证件类型为</span>
          <span class="type">身份证</span>
        </div>
        <div class="form_item text ">
          <input
            type="text"
            v-model="form.papersName"
            placeholder="输入您的真实姓名"
          />
        </div>
        <div class="form_item text ">
          <input
            type="text"
            v-model="form.papersCode"
            placeholder="输入您的证件号码"
          />
        </div>
      </div>
      <button
				v-if="type != 2 "
        class="next_step"
        @click="nextStep"
        :disabled="!nextStepDisabled"
        :class="{ active_btn: nextStepDisabled }"
      >
        下一步
      </button>
    </div>
    <!-- 第二步 -->
    <div v-if="step == 2">
      <h5>{{ type == 1 ? "设置支付密码" : "请设置新支付密码" }}</h5>
      <div class="tips_text">
        {{ type == 1 ? "请输入6位数字支付密码" : "请输入新6位数字支付密码" }}
      </div>
      <div class="pwd_lattice">
        <input type="password" ref='pwd1' maxlength="6" v-model="form.pwd1" @input="tradepwd" class="pwdInput">

        <pwdLattice :msg="form.pwd1"  @click.native="onClickPwd('pwd1')"></pwdLattice>
      </div>
    </div>
    <!-- 第三步 -->
    <div v-if="step == 3">
      <h5>{{ type == 1 ? "确认支付密码" : "请确认新支付密码" }}</h5>
      <div class="tips_text">
        {{
          type == 1
            ? "请再次输入6位数字支付密码"
            : "请再次输入新6位数字支付密码"
        }}
      </div>
      <div class="pwd_lattice">
        <input type="password" ref='pwd2' maxlength="6" v-model="form.pwd2" @input="tradepwd2" class="pwdInput">

        <pwdLattice :msg="form.pwd2" @click.native="onClickPwd('pwd2')"></pwdLattice>
      </div>
    </div>

    <!-- 操作成功 -->
    <div class="operation_success" v-if="step == 4">
      <img src="@/assets/transactions/ico_success.png" alt="" />
      <h5>
        {{
          type == 1
            ? "设置支付密码成功"
            : type == 2
            ? "修改支付密码成功"
            : "重置支付密码成功"
        }}
      </h5>
      <div class="tips_text">支付密码将在交易中使用，请牢记</div>
      <button @click="gompersonalCentre">好的</button>
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
      type: 1, //类型 1 设置 2 修改 3 重置
      step: 1, //步数
      form: {
        code: "", //验证码
        oldPwd: "", //旧密码
        pwd1: "", //密码1
        pwd2: "", //确认密码
        papersName: "", //证件姓名
        papersCode: "" //证件号码
      },
      // 倒计时相关
      countdown: {
        show: true,
        count: "",
        timer: null
      },
      userInfoDetails: {} //用户信息
    };
  },
  components: {
    pwdLattice
  },
  created() {
    this.userInfoDetails = JSON.parse(localStorage.getItem("userInfoDetails"));
    this.type = this.$route.query.type;
  },
  mounted() {
    if (this.type == 1 ) {
      this.send()
    }
  },
  computed: {
    nextStepDisabled: function() {
      let state = true;
      if (this.type == 1) {
        if (!this.form.code) {
          state = false;
        }
        return state;
			}
			if(this.type == 3){
				if(!this.form.code || !this.form.papersName || !this.form.papersCode){
					state = false;
				}
				return state;
			}
    }
	},
	
  methods: {
		gompersonalCentre(){
			this.$router.push('/mpersonalCentre')
		},
		forget(){
			this.$router.push({
        path: "/mChangeTransaPwd",
        query: {
          type: 3
        }
			});
			this.type = this.$route.query.type;
			this.send()
			this.form.code = ''
			this.form.oldPwd = ''
			this.form.pwd1 = ''
			this.form.pwd2 = ''
			this.form.papersName = ''
			this.form.papersCode = ''
		},
    nextStep() {
      // console.log(1);
      this.step = 2;
		},
		onClickPwd(value){
      if(value == 'oldPwd'){

        this.$refs.oldPwd.focus();
      }else if(value == 'pwd1'){
        this.$refs.pwd1.focus();

      }else if(value == 'pwd2'){
        this.$refs.pwd2.focus();
      }
    },
    //原密码
    oldtradepwd() {
			if (/[^\d]/g.test(this.form.oldPwd)) {
        this.form.oldPwd = this.form.oldPwd.replace(/[^\d]/g, "");
			} 
			// console.log('原',this.form.oldPwd) 
			if (this.form.oldPwd.length == 6) {
				setTimeout(() => {
					this.step = 2;
				},500)
			}
    },
    //密码1
    tradepwd() {
      
			if (/[^\d]/g.test(this.form.pwd1)) {
        this.form.pwd1 = this.form.pwd1.replace(/[^\d]/g, "");
			} 
			// console.log('原1',this.form.pwd1) 
			if (this.form.pwd1.length == 6) {
				setTimeout(() => {
					this.step = 3;
				},500)
			}
    },
    //确认密码
    tradepwd2() {
      	if (/[^\d]/g.test(this.form.pwd2)) {
        this.form.pwd2 = this.form.pwd2.replace(/[^\d]/g, "");
			} 
			
			// console.log('原2',this.form.pwd2) 
			

			if (this.form.pwd2.length == 6) {
				let data;
			if(this.type == 1){
				if(this.form.pwd1 !== this.form.pwd2){
					this.$toast('两次输入密码不一致！')
					return
				}
				data = {
          account: this.userInfoDetails.mobile,
          areaNo: this.userInfoDetails.areaNo,
          pwd: this.form.pwd2,
          code: this.form.code,
          pwdType: 2
        };
			}else if (this.type == 2){
				if(this.form.pwd1 !== this.form.pwd2){
					this.$toast('两次输入密码不一致！')
					return
				}
				data = {
          oldPwd: this.form.oldPwd,
          pwd: this.form.pwd2,
          pwdType: 2
        };
			}else if (this.type == 3){
				if(this.form.pwd1 !== this.form.pwd2){
					this.$toast('两次输入密码不一致！')
					return
				}
				data = {
          account: this.userInfoDetails.mobile,
          areaNo: this.userInfoDetails.areaNo,
          pwd: this.form.pwd2,
          code: this.form.code,
          pwdType: 2,
          idCard: this.form.papersCode,
          realName: this.form.papersName
        };
			}
				setTimeout(() => {
					userInfoApi
        .changePwd(data).then(res => {
          setTimeout(() => {
						this.step = 4
          }, 1000);
				}).catch(err => {
					this.$toast(err.data.message);
					this.form.code = ''
					this.form.oldPwd = ''
					this.form.pwd1 = ''
					this.form.pwd2 = ''
					this.form.papersName = ''
					this.form.papersCode = ''
					this.step = 1
        });

				},500)
			}
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
          account: this.userInfoDetails.mobile,
          areaNo: this.userInfoDetails.areaNo
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
    }
  }
};
</script>

<style lang='less' scoped>
.data {
  text-align: center;
	padding: 0.64rem 0.32rem;
	.pwdInput{
        position: absolute;
        // left: 100%;
        width: 1px;
        height:1px;
        z-index: -1;
        opacity: 0;
      }
  input::-webkit-input-placeholder {
    color: #c9c9d1;
  }
  .text {
    font-size: 0.3rem;
    color: #40405e;
  }
  .tips_text {
    font-size: 0.28rem;
    color: #a0a0b3;
  }
  .cl_m {
    color: @cl-m;
  }
  .form_item {
    background: #f7f7fa;
    border-radius: 0.12rem;
    display: flex;
    align-items: center;
    height: 0.96rem;
    padding: 0 0.32rem;
    margin-bottom: 0.32rem;
  }
  .paper_type {
    justify-content: space-between;
    .type {
      color: @cl-m;
    }
  }
  .send_code {
    .send {
      padding-left: 0.3rem;
      font-size: 0.26rem;
      color: @cl-m;
      border-left: 1px solid #ededf2;
    }
  }
  input {
    flex: 1;
    background: transparent;
  }
  .next_step {
    background: linear-gradient(0deg, #dddde6, #dddde6);
    border-radius: 0.48rem;
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: center;
    font-size: 0.32rem;
    color: #ffffff;
    margin-top: 0.24rem;
  }
  h5 {
    font-size: 0.36rem;
    font-weight: bold;
    color: #40405e;
    padding: 0.12rem 0;
  }
  .pwd_lattice {
    padding-top: 0.8rem;
    width: 6.2rem;
    margin: 0 auto;
  }
  .forget {
    padding-top: 0.48rem;
    font-size: 0.28rem;
    color: @cl-m;
  }
  .title {
    padding: 0.18rem 0.32rem 0.32rem;
  }
  .operation_success {
    padding-top: 0.32rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.44rem;
      margin-bottom: 0.24rem;
    }
    button {
      margin-top: 0.96rem;
      width: 100%;
      height: 0.96rem;
      line-height: 0.96rem;
      color: #ffffff;
      font-size: 0.32rem;
      background: @cl-m;
      border-radius: 24px;
    }
  }
  .active_btn {
    background: @cl-m;
  }
}
</style>