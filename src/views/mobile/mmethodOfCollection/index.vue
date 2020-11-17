<template>
  <div class="data">
		<h3>收款方式</h3>
		<ul>
			<li class="flex_center_between" @click="goPayList(1)">
				<div class="flex Ttext">
					<img class="pay_img" src="@/assets/transactions/ic_bankpay_yhq.png" alt="">
					
					银行卡
				</div>
				<div class="flex text text_red" :class="{text_lv: pay.bankList.length > 0}">
					{{pay.bankList.length > 0 ? '已绑定' + pay.bankList.length + '张' : '未绑定'}}
					<img class="right_img" src="@/assets/transactions/ico_arrow_right.png" alt="">
				</div>
			</li>
			<li class="flex_center_between" @click="goPayList(3)">
				<div class="flex Ttext">
					<img class="pay_img" src="@/assets/transactions/ic_bankpay_zfb.png" alt="">
					
					支付宝
				</div>
				<div class="flex text text_red" :class="{text_lv: pay.zfbList.length > 0}">
					{{pay.zfbList.length > 0 ? '已绑定' + pay.zfbList.length + '个' : '未绑定'}}
					<img class="right_img" src="@/assets/transactions/ico_arrow_right.png" alt="">
				</div>
			</li>
			<li class="flex_center_between" @click="goPayList(2)">
				<div class="flex Ttext">
					<img class="pay_img" src="@/assets/transactions/ic_bankpay_weixin.png" alt="">
					
					微信
				</div>
				<div class="flex text text_red" :class="{text_lv: pay.wxList.length > 0}">
					{{pay.wxList.length > 0 ? '已绑定' + pay.wxList.length + '个' : '未绑定'}}
					<img class="right_img" src="@/assets/transactions/ico_arrow_right.png" alt="">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
export default {
  data() {
    return {
			pay:{
				bankList:[],
				wxList:[],
				zfbList:[]
			}
		};
	},
	created(){
		this.getPayment()
	},
	methods:{
			// 获取收款方式详细信息
    getPayment() {
      userInfoApi
        .getPayment()
        .then(res => {
          // console.log('***********',res.data.data[0]);
					let data = res.data.data[0]
					if(data){
						data.map(item => {
							if(item.bindType == 1){
								this.pay.bankList.push(item)
							}else if(item.bindType == 2){
								this.pay.wxList.push(item)
							}else {
								this.pay.zfbList.push(item)
							}
						})
					}
        })
        
		},
		
		goPayList(value){
			console.log(value)
			this.$router.push('/mBindList/' + value)
		}
	}
};
</script>

<style lang='less' scoped>
.data{
	padding: 0 0.24rem;
	background: #F7F7FA;
	min-height: calc(100vh - 1.16rem);
	h3{
		font-size: 0.4rem;
		line-height: 0.56rem;
		color: #40405E;
		padding: 0.6rem 0 0.4rem;
	}
	.text{
		font-size: 0.24rem;
	}
	.Ttext{
		font-size: 0.28rem;
		color: #40405E;
	}
	.text_red{
		color: #F0446B;
	}
	.text_lv{
		color: #00CF00;
	}
	.flex{
		display: flex;
		align-items: center;
	}
	.flex_center_between{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	ul li{
		padding: 0.32rem 0.4rem;
		background: #FFFFFF;
		box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
		border-radius: 0.12rem;
		margin-bottom: 0.24rem;
		.pay_img{
			width: 0.56rem;
			height: 0.56rem;
			margin-right: 0.24rem;
		}
		.right_img{
			margin-left: 0.16rem;
			width: 0.12rem;
			height: 0.2rem;
		}
	}
}
</style>