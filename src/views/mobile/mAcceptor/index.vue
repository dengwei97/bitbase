<template>
  <div class="data">
		<h4>申请成为承兑商</h4>
		<p class="text title1">承兑商昵称<span class="text_red">(*昵称设置后不可以修改)</span></p>
		<div class="inputs text">
			<input type="text" @input="nameInnput" v-model="form.nickname" maxlength="10" placeholder="请输入您的承兑商昵称">
		</div>
		<p class="title text">手机号码</p>
		<div class="inputs text">
			您绑定的手机号为“<span class="text_lv">{{userInfoDetails.mobile | mobile}}</span>”
		</div>
		<p class="title text">手机验证码</p>
		<div class="inputs text flex">
			<input type="text" v-model="form.code" placeholder="请输入验证码">
			<div class="text_lv send" v-show="!countdown.show">{{ countdown.count }}s</div>
			<div class="text_lv send" v-show="countdown.show" @click="send">发送</div>
		</div>
		<p class="title text">微信号</p>
		<div class="inputs text ">
			<input type="text" v-model="form.wechat" placeholder="请输入您的微信号">
		</div>
		<button :class="{btn_active:btnDisabled}" :disabled='!btnDisabled' @click="submit">立即申请</button>
  </div>
</template>

<script>
import buyApi from '@/api/buy'
import userInfo from '@/api/userInfo'
export default {
	name:'mAcceptor',
	data() {
		return {
			form:{
				nickname:'',
				code:'',
				wechat:''
			},
			// 倒计时相关
      countdown: {
        show: true,
        count: "",
        timer: null
			},
			userInfoDetails: {} //用户信息
		}
  },
  computed:{
    btnDisabled(){
      let state = true
      if(!this.form.nickname){
        return false
      }
      if(!this.form.code){
        return false
      }
      if(!this.form.wechat){
        return false
      }
      return state
    }
  },
  created(){
    this.userInfoDetails = JSON.parse(localStorage.getItem('userInfoDetails'))
  },
	methods:{
    //承兑商昵称判定
		nameInnput(){
       this.form.nickname = this.form.nickname.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,"")
    },
    //申请
    submit(){
      userInfo.advertiserApply(this.form).then(res => {
        console.log(res)
        this.$router.push('/acceptorReview')
      })
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
}
</script>

<style lang='less' scoped>
.data{
	padding: 0.6rem 0.32rem;
	.text{
		font-size: 0.28rem;
		line-height: 0.4rem;
		color: #40405E;
	}
	.flex{
		display: flex;
		align-items: center;
	}
	.text_red{
		color: #F46666;
	}
	.text_lv{
		color: @cl-m;
	}
	input{
		flex: 1;
		background: transparent;
		border: 0;
		outline: 0;
	}
	input::-webkit-input-placeholder{
		color: #C9C9D1;
	}
	h4{
		font-size: 0.4rem;
		line-height: 0.56rem;
		color: #40405E;
		padding-bottom: 0.4rem;
	}
	.inputs{
		background: #F7F7FA;
		border-radius: 0.12rem;
		padding: 0.28rem 0.32rem;
	}
	.title1{
		padding-bottom: 0.32rem;
	}
	.title{
		padding: 0.56rem 0 0.32rem;
	}
	.send{
		padding-left: 0.32rem;
		border-left: 1px solid #EDEDF2;
	}
	button{
		margin-top: 0.64rem;
		height: 0.96rem;
		font-size: 0.32rem;
		line-height: 0.96rem;
		width: 100%;
		color: #ffffff;
		background: linear-gradient(0deg, #DDDDE6, #DDDDE6);
    border-radius: 0.48rem;
    &.btn_active{
      background: @cl-m;
    }
	}
}
</style>