<template>
  <section class="card">
		<div class="card_head flex_center_between">
			<div class="head_left flex">
				<img class="ic_usdt" src="@/assets/transactions/ico_usdt.png" alt="">
				<div>
					<h5 class="big_text">{{data.tradeType == '1' ? '买入' : '卖出'}}USDT/CNY</h5>
					<div class="flex_center_between small_text">
						<span v-if="data.priceFlag == '1'" class="color_purple">固定价格</span>
						<span v-if="data.priceFlag == '2'" class="color_green">动态价格</span>
						<span v-if="data.bigSale == '1'" class="color_yellow">大宗挂单</span>
						<span v-if="data.bigSale == '2'" class="color_blue">C2C挂单</span>
					</div>
				</div>
			</div>
			<div class="head_right text color_yellow">
				{{data.orderState == '1' ? '上架中' : data.orderState == '2' ?'已下架':'完成'}}
			</div>
		</div>
		<div class="card_content">
			<div class="card_content_item">

				<div class="text flex_center_between">
					<span v-if="data.priceFlag == '2'">{{data.premiumRatio * 100}}%</span>
					<span v-else>{{data.coinPrice}}</span>
					<span>{{data.lowerLimitCoin}}–{{data.upperLimitCoin}}</span>
				</div>
				<div class="small_text flex_center_between color_ash interval">
					<span  v-if="data.priceFlag == '2'">溢价(实时委托价)</span>
					<span v-else>委托价(CNY)</span>
					<span>限额(USDT)</span>
				</div>
			</div>
			<div class="card_content_item">
				<div class="text flex_center_between">
				<span>{{data.coinNum}}</span>
				<span>{{data.restAmount}}</span>
			</div>
			<div class="small_text flex_center_between color_ash interval">
				<span>挂单数量(USDT)</span>
				<span>待成交数量(USDT)</span>
			</div>
			</div>
			
		</div>
		<div class="card_footer flex_center_between text">
			<span>{{data.createTime - 0 | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
			<button @click="clickSale">下架</button>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	props:{
		data:{}
	},
	methods:{
		clickSale(val){
			this.$emit('clickSale',val)
		}
	}
}
</script>

<style lang='less' scoped>
.card{
	background: #FFFFFF;
	box-shadow: 0 0.08rem 0.48rem rgba(64, 64, 94, 0.08);
	border-radius: 0.12rem;
	width: 100%;
	.text{
		font-size: 0.28rem;
	}
	.small_text{
		font-size: 0.24rem;
	}
	.big_text{
		font-size: 0.32rem;
	}
	.color_purple{
		color: #94A9FE;
	}
	.color_green{
		color: #7ED674;
	}
	.color_blue{
		color: #00BDE7;
	}
	.color_yellow{
		color: #F2A145;
	}
	.color_ash{
		color: #A0A0B3;
	}
	.flex{
		display: flex;
	}
	.flex_center_between{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.card_head{
		padding: 0.4rem 0.4rem 0.32rem;
		.ic_usdt{
			width: 0.56rem;
			height: 0.56rem;
			margin-top: 0.06rem;
			margin-right: 0.24rem;
		}
		h5{
			font-weight: 600;
		}
	}
	.card_content{
		background: #F7F7FA;
		margin: 0 0.06rem;
		padding: 0 0.34rem;
		.card_content_item{
			padding: 0.4rem 0;
			border-bottom:1px solid #EDEDF2;
		}
				.card_content_item:last-child{
					border-bottom: none;
				}
				.interval{
					padding-top: 0.04rem;
				}
	}
	.card_footer{
		padding: 0.2rem 0.4rem ;
		button{
			width: 1.28rem;
			height: 0.56rem;
			line-height: 0.56rem;
			text-align: center;
			border: 1px solid #EDEDF2;
			box-sizing: border-box;
			border-radius: 0.28rem;
		}
		.disabled{
			color: #40405E;
		}
	}
}
</style>