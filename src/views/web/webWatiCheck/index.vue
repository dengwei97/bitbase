<template>
  <div class="webWatiCheck">
    <img src="@/assets/transactions/ico_wart.png" />
    <p>正在验证中</p>
    <p class="con">身份验证需要1-2小时，请耐心等待</p>
    <button @click="go()">好的</button>
  </div>
</template>

<script>
export default {
	methods: {
    go() {
      this.$router.push({
        path: '/transactions',
      })
    }
  }
};
</script>

<style scoped lang="less">
.webWatiCheck{
	width: 790px;
	height: 494px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	img{
		width: 72px;
		height: 72px;
	}
	p{
		margin-top:24px;
		font-weight: 500;
		font-size: 18px;
		color: #40405E;
	}
	.con{
		margin-top: 6px;
		font-weight: normal;
		font-size: 14px;
		color: #A0A0B3;
	}
	button{
		width: 343px;
		height: 48px;
		background: @gd-m1;
		border-radius: 41px;
		font-weight: 500;
		font-size: 16px;
		color: #FFFFFF;
		margin-top: 48px;
		cursor: pointer;
	}
}
@media (max-width: 1200px) {
	.webWatiCheck{
	width: 790px *.8;
	height: 494px *.8;
	box-shadow: 0px 0px 10px *.8 rgba(0, 0, 0, 0.1);
	margin: 40px *.8 auto;
	img{
		width: 72px *.8;
		height: 72px *.8;
	}
	p{
		margin-top:24px *.8;
		font-weight: 500;
		font-size: 18px *.8;
	}
	.con{
		margin-top: 6px *.8;
		font-size: 14px *.8;
	}
	button{
		width: 343px *.8;
		height: 48px *.8;
		border-radius: 41px *.8;
		font-size: 16px *.8;
		margin-top: 48px *.8;
	}
}
}
@media (max-width: 960px) {
	.webWatiCheck{
	width: 790px *.6;
	height: 494px *.6;
	margin: 40px *.6 auto;
	img{
		width: 72px *.6;
		height: 72px *.6;
	}
	p{
		margin-top:24px *.6;
		font-weight: 500;
		font-size: 18px *.6;
	}
	.con{
		margin-top: 6px *.6;
		font-size: 14px *.6;
	}
	button{
		width: 343px *.6;
		height: 48px *.6;
		border-radius: 41px *.6;
		font-size: 16px *.6;
		margin-top: 48px *.6;
	}
}
}
</style>
