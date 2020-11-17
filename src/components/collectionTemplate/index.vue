<template>
  <div class="card">
		<div class="up">
			<div class="up_left">
				<img v-if="data.bindType == 1" class="pay_img" src="@/assets/transactions/ic_bankpay_yhq.png" />
				<img v-if="data.bindType == 2" class="pay_img" src="@/assets/transactions/ico_weixinpay.png" />
				<img v-if="data.bindType == 3" class="pay_img" src="@/assets/transactions/ic_bankpay_zfb.png" />
				<div class="title">{{data.bindType == 1 ? data.paymentCode : data.bindType == 2 ? '微信' : '支付宝' }}</div>
			</div>
			<div class="up_right" @click.stop="choice(data.id)" v-if="paymentId">
				<span :class="{'choice':data.id == paymentId}">选择</span>
				<img v-if="data.id == paymentId" src="@/assets/transactions/bankChoice_active.png" />
				<img v-else src="@/assets/transactions/bankChoice.png" />
			</div>
		</div>
		<div class="down">
			<div class="left">
				<div class="stext">{{data.name}}</div>
				<div class="code">{{data.account}}</div>
			</div>
			<div class="right" :style="{alignItems:data.bindType  == 1? '' :'center'}">
				<div v-if="data.bindType == 1" class="stext">{{data.addition}}</div>
				<img v-else class="right_img" src="@/assets/transactions/ico_qr_code.png" />
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data(){
		return{

		}
	},
	props:{
		data:{
			type: Object | Array
		},
		paymentId:{
			type: Number | Array
		},
	},
	methods:{
		choice(id) {
			this.$emit('choice',id)
		},
	}
}
</script>

<style lang='less' scoped>
.card{
	width: 100%;
	border: 1px solid #DDDDE6;
	border-radius: 6px;
	background: #ffffff;
	padding: 3px;
	.up{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 13px 17px 16px;
		.up_left{
			display: flex;
			align-items: center;
			.pay_img{
				width: 28px;
				height: 28px;
				margin-right: 6px;
			}
			.title{
				font-size: 16px;
			color: #40405E;
			}
		}
		.up_right{
			display: flex;
			align-items: center;
			color: #d5d5ed;
			font-size: 12px;
			cursor: pointer;
			.choice {
				color: @cl-m;

			}

			img {
				width: 16px;
				height: 16px;
				margin-left: 4px;
			}

		}

	}
	.down{
		padding: 16px 17px;
		background: #F7F7FA;
		display: flex;
		justify-content: space-between;
		border-radius: 0 0 6px 6px;
		.stext{
			font-size: 14px;
			color: #A0A0B3;
		}
		.left{
			.code{
				font-size: 16px;
				font-weight: bold;
				padding-top: 6px;
			}
		}
		.right{
			display: flex;
			.right_img{
				width: 16px;
				height: 16px;
			}
		}
	}
}


@media(max-width: 1200px){
	.card{
	
	.up{
		padding: 13px * 0.8 17px * 0.8 16px * 0.8;
		.up_left{
			.pay_img{
				width: 28px * 0.8;
				height: 28px * 0.8;
				margin-right: 6px * 0.8;
			}
			.title{
				font-size: 16px * 0.8;
			}
		}
		.up_right{
			font-size: 12px * 0.8;


			img {
				width: 16px * 0.8;
				height: 16px * 0.8;
				margin-left: 4px * 0.8;
			}

		}

	}
	.down{
		padding: 16px * 0.8 17px * 0.8;
		.stext{
			font-size: 14px * 0.8;
		}
		.left{
			.code{
				font-size: 16px * 0.8;
				padding-top: 6px * 0.8;
			}
		}
		.right{
			.right_img{
				width: 16px * 0.8;
				height: 16px * 0.8;
			}
		}
	}
}
}

@media (max-width: 767px){
	 .card{
		border: 0;
		padding: 0.06rem;
	.up{
		padding: 0.26rem 0.34rem 0.32rem;
		.up_left{

			.pay_img{
				width: 0.56rem;
				height: 0.56rem;
				margin-right: 0.24rem;
			}
			.title{
				font-size: 0.28rem;
			}
		}
		.up_right{
			font-size: 0.24rem;
			img {
				width: 0.32rem;
				height: 0.32rem;
				margin-left: 0.08rem;
			}
		}
	}
	.down{
		padding: 0.32rem 0.34rem;
		border-radius: 0 0 0.12rem 0.12rem;
		.stext{
			font-size: 0.28rem;
		}
		.left{
			.code{
				font-size: 0.32rem;
				padding-top: 0.12rem;
			}
		}
		.right{
			.right_img{
				width: 0.32rem;
				height: 0.32rem;
			}
		}
	}
}
}
</style>