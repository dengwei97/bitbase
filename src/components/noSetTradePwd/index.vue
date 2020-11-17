<template>
  <div class="pop" v-if="pop">
    <div class="popcontent">
      <div class="header">
        <img src="@/assets/transactions/ico_alert_red.png" alt="" />
				<div class="title">设置交易密码</div>
				<div class="text">
					当前账号未设置支付密码无法完成交易
					<br>
				请先去设置支付密码
				</div>
      </div>
			<div class="btns">
				<button class="btn1" @click="hide">取消</button>
				<button class="btn2" @click="goSet">去设置</button>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pop: false
    };
  },

  methods: {
		goSet(){
			this.$emit('goSet')
		},
    show() {
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

  .popcontent {
    width: 440px;
    background: #ffffff;
    border-radius: 4px;
    .header {
			text-align: center;
			padding: 48px 0 30px;
			img{
				width: 72px;
				height: 72px;
			}
			.title{
				display: none;
			}
			.text{
				font-size: 14px;
				line-height: 20px;
				color: #40405E;
			}
		}
		.btns{
			display: flex;
			height: 72px;
			align-items: center;
			border-top: 1px solid #F5F5FA;
			button{
				flex: 1;
				cursor: pointer;
				height: 100%;
				font-size: 16px;
				color: #A0A0B3;
			}
			.btn2{
				color:@cl-m;
				border-left: 1px solid #F5F5FA;
			}
		}
  }
}
@media (max-width: 1200px) {
	.pop {

  .popcontent {
    width: 440px * 0.8;
    .header {
			padding: 48px * 0.8 0 30px * 0.8;
			img{
				width: 72px * 0.8;
				height: 72px * 0.8;
			}
			.text{
				font-size: 14px * 0.8;
				line-height: 20px * 0.8;
			}
		}
		.btns{
			height: 72px * 0.8;
			button{
				font-size: 16px * 0.8;
				line-height: 22px * 0.8;
			}
		}
  }
}
}
@media(max-width:767px){
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

  .popcontent {
    width: 6rem;
    background: #ffffff;
    border-radius: 0.12rem;
    .header {
			text-align: center;
			padding: 0.64rem 0 0.8rem;
			img{
				width: 1.44rem;
				height: 1.44rem;
			}
			.title{
				display: block;
				font-size: 0.36rem;
				line-height: 0.5rem;
				color: #40405E;
				padding-bottom:  0.12rem;
			}
			.text{
				font-size: 0.28rem;
				line-height: 0.4rem;
				color: #A0A0B3
			}
		}
		.btns{
			display: flex;
			height: 1.04rem;
			align-items: center;
			border-top: 1px solid #F5F5FA;
			button{
				flex: 1;
				cursor: pointer;
				height: 100%;
				font-size: 0.32rem;
				color: #A0A0B3;
			}
			.btn2{
				color:@cl-m;
				border-left: 1px solid #F5F5FA;
			}
		}
  }
}
}
</style>
