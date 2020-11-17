<template>
  <div class="data">
    <div class="content">
			<img src="@/assets/transactions/ico_wart.png" alt="">
			<h3>审核中</h3>
			<div class="text">
				您成为承兑商的申请已提交成功，正在通过审核，请耐心等待。 
			</div>
			<div class="text">
				审核时间为工作日内北京时间9:00-18:00，审核最快30分钟完成。 
			</div>
			<div class="text">
				如有疑问，请联系Bitbase官方客服。
			</div>
		</div>
		<button @click="onClick">好的</button>
  </div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods:{
		onClick(){
			this.$router.push('/type')
		}
	}
}
</script>

<style lang='less' scoped>
	.data{
		padding: 0.32rem;
		.content{
			padding: 0.32rem;
			text-align: center;
			img{
				margin-top: 0.64rem;
				width: 1.44rem;
				height: 1.44rem;
			}
			h3{
				padding-top: 0.28rem;
				font-size: 0.36rem;
				line-height: 0.5rem;
				color: #40405E;
				font-weight: bold;
			}
			.text{
				text-align: left;
				padding-top: 0.32rem;
				font-size: 0.28rem;
				line-height: 0.4rem;
				color: #A0A0B3;
			}
		}
		button{
			width: 100%;
			height: 0.96rem;
			line-height: 0.96rem;
			text-align: center;
			color: #ffffff;
			background: @cl-m;
			border-radius: 0.48rem;
			font-size: 0.32rem;
		}
	}
</style>