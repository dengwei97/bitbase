<template>
  <div class="pop" v-if="pop">
		<div class="popcontent">
			<div class="header">
				<div>
					{{step == 1 ? '验证交易密码' : '验证手机验证码'}}
				</div>
				<img
          @click="hide"
          src="@/assets/transactions/ico_web_close.png"
          alt=""
        />
			</div>
			<div class="content">
         <input type="password" ref='pwd' maxlength="6" v-model="currency.tradePwd" @input="tradepwd" class="pwdInput">

				<pwdLattice :msg='currency.tradePwd'  @click.native="onClickPwd" v-if="step == 1"></pwdLattice>

				<div v-if="step == 2">
					<div class="mobile">
						<div class="areaNo">+{{areaNo}}</div>
						<div class="account">{{mobile}}</div>
					</div>
					<div class="code">
            <input type="text" placeholder="请输入验证码" v-model="currency.smsCode" />
            <span v-show="!countdown.show">{{ countdown.count }}s</span>
            <span v-show="countdown.show" @click="send" style="cursor: pointer"
              >发送</span
            >
          </div>
				</div>
			</div>
			<div class="footer">
        <button @click="submit">确定</button>
      </div>
      <div class="recovery" v-if="step == 1">
        忘记交易密码？<span @click="recoveryPwd">前往找回</span>
      </div>
		</div>
  </div>
</template>

<script>
import pwdLattice from '@/components/pwdLattice'
import buyApi from "@/api/buy";
import userInfoApi from "@/api/userInfo";
export default {
	data(){
		return{
			step:1,
			pop:false,
			areaNo:'',//区号
			mobile:'',//手机号
			// 倒计时相关
      countdown: {
        show: true,
        count: "",
        timer: null
			},
			currency:{
        tradePwd:'',//交易密码
        smsCode:'',//手机验证码
      }
		}
	},
	components:{
		pwdLattice
	},
	methods:{
		recoveryPwd(){
			this.$router.push('/personalCentre')
		},
		submit(){

			if(this.step == 1){
				if(!this.currency.tradePwd){
					this.$toast('请输入交易密码')
					return
				}
				this.step = 2
				console.log(this.step)
				this.send()
			}else{
				let value = 
					{
					tradePwd:this.currency.tradePwd,
					smsCode:this.currency.smsCode
				}
				this.$emit('wallatCash',value)
				
			}
		},
		//交易密码
		tradepwd() {
      if (/[^\d]/g.test(this.currency.tradePwd)) {
        this.currency.tradePwd = this.currency.tradePwd.replace(/[^\d]/g, "");
      } 
      
    },
    onClickPwd(){
      this.$refs.pwd.focus();
    },
		show(value){
			this.areaNo = value.areaNo
			this.mobile = value.mobile
			this.pop = true
		},
		hide(){
			this.pop = false
			this.step = 1
			this.currency.tradePwd = ''
			this.currency.smsCode = ''
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
					account:this.mobile,
					areaNo:this.areaNo
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
	}
}
</script>

<style lang='less' scoped>
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
    .pwdInput{
        position: absolute;
        // left: 100%;
        width: 1px;
        height:1px;
        z-index: -1;
        opacity: 0;
      }
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
      padding: 40px 20px 0;
      .mobile{
				display: flex;
        align-items: center;
        font-size: 16px;
        padding: 15px 14px;
        border: 1px solid #dddde6;
				border-radius: 4px;
				.account{
					padding: 0 14px;
					flex: 1;
				}
				.areaNo{
					padding-right: 14px;
					border-right: 1px solid #EDEDF2;
				}
			}
      .code {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding: 16px 14px;
        border: 1px solid #dddde6;
        border-radius: 4px;
				margin-top: 16px;
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
      padding: 40px 20px 20px;

      display: flex;
      button {
        width: 100%;
        height: 52px;
        background: @cl-m;
        border-radius: 41px;
        text-align: center;
        line-height: 52px;
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
      padding-bottom: 30px;
      span {
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}
@media(max-width:1200px){
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
      padding: 40px * 0.8 20px * 0.8 0;
      .mobile{
        font-size: 16px * 0.8;
        padding: 15px * 0.8 14px * 0.8;
				.account{
					padding: 0 14px * 0.8;
				}
				.areaNo{
					padding-right: 14px * 0.8;
				}
			}
      .code {
        font-size: 14px * 0.8;
        padding: 16px * 0.8 14px * 0.8;
				margin-top: 16px * 0.8;
      }
    }
    .footer {
      padding: 40px * 0.8 20px * 0.8 20px * 0.8;

      button {
        height: 52px * 0.8;
        line-height: 52px * 0.8;
        font-size: 18px * 0.8;
      }
    }
    .recovery {
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
      padding-bottom: 30px * 0.8;
    }
  }
}
}
</style>