<template>
  <div class="pop" v-if="pop">
		<div class="popcontent">
			<div class="header">
				<div>
					验证交易密码
				</div>
				<img
          @click="hide"
          src="@/assets/transactions/ico_web_close.png"
          alt="" 
        />
			</div>
			<div class="content">
        <input type="password" ref='pwd' maxlength="6" v-model="pwd" @input="tradepwd" class="pwdInput">
				<pwdLattice :msg='pwd'   @click.native="onClickPwd"></pwdLattice>

				
			</div>
			<div class="footer">
        <button @click="submit">确定</button>
      </div>
      <div class="recovery" >
        忘记交易密码？<span @click="recoveryPwd">前往找回</span>
      </div>
		</div>
  </div>
</template>

<script>
import pwdLattice from '@/components/pwdLattice'
import { ismobile } from '@/utils/index.js'
export default {
	data(){
		return{
      pop:false,
      pwd:'',//交易密码
		}
	},
	components:{
		pwdLattice
	},
	methods:{
		recoveryPwd(){
			if(ismobile()){
        console.log('找回密码')
          this.$router.push('/mpersonalCentre')
				}else{
					
					this.$router.push('/personalCentre')
			}
		},
		submit(){
			this.$emit('varTransaSu',this.pwd)
		},
		//交易密码
		tradepwd() {
      if (/[^\d]/g.test(this.pwd)) {
        this.pwd = this.pwd.replace(/[^\d]/g, "");
      } 
      // console.log('原',this.pwd) 
    },
    onClickPwd(){
      this.$refs.pwd.focus();
    },
		show(){
      this.pwd = ''
      this.pop = true
		},
		hide(){
			this.pwd = ''
			this.pop = false
		},
	}
}
</script>

<style lang='less' scoped>
.pop {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

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
    }
    .footer {
      width: 100%;
      padding: 40px 20px 20px;

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
    }
    .footer {
      padding: 40px * 0.8 20px * 0.8 20px * 0.8;

      button {
        height: 48px * 0.8;
        line-height: 48px * 0.8;
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
@media(max-width:767px){
	.pop {
  

  .popcontent {
		width: 6.86rem;
		border-radius: 0.12rem;
    .header {
      padding: 0.28rem 0.32rem 0.32rem;
      font-size: 0.32rem;
			line-height: 0.44rem;
      border: 0;
      img {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
    .content {
      padding: 0.24rem 0.32rem 0;
    }
    .footer {
      padding: 0.48rem 0.32rem 0.4rem;

      button {
        height: 0.96rem;
        background: @cl-m;
        border-radius: 0.48rem;
        text-align: center;
        line-height: 0.96rem;
        color: #ffffff;
        font-size: 0.32rem;
        cursor: pointer;
      }
    }
    .recovery {
      display: flex;
      justify-content: center;
      font-size: 0.26rem;
      line-height: 0.36rem;
      color: #40405e;
      padding-bottom: 0.4rem;
      span {
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}
}
</style>