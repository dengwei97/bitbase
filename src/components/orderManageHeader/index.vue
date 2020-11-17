<template>
  <div class="transactions">
		<div class="nav flex_center_between">
			<ul class="flex">
				<li  :class="{active:Onactive == 1}"><router-link to="/orderList">订单管理</router-link></li>
				<li  :class="{active:Onactive == 2}"><router-link to="/adverList">挂单管理</router-link></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
		};
	},
	props:{
		Onactive:{
			type: String | Number
		}
	},
	methods:{
		
	}
};
</script>

<style lang='less' scoped>
.transactions{
	width: 100%;
	background: #F8F8F8;
	.flex{
		display: flex;
		align-items: center;
	}
	.flex_center_between{
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.nav{
		width: 1200px;
		margin: 0 auto;
		padding-top: 76px;
		font-size: 16px;
		line-height: 24px;
		
		li{
			margin-right: 40px;
			color: #9EA8B7;
			cursor: pointer;
			padding-bottom: 20px;
		}
		.active{
			color: #000000;
			border-bottom: 2px solid @cl-m;
		}
		.right{
			.Gactive{
				color: @cl-m;
			}
			padding-bottom: 20px;
			.right_item{
				padding-left: 40px;
				display: flex;
				align-items: center;
			}
			img{
				width: 16px;
				height: 16px;
			}
			span{
				color: #000000;
				padding-left: 10px;
			}
		}
	}
}
@media (max-width: 1200px){
	.transactions{
	.nav{
		width: 1200px * 0.8;
		padding-top: 76px * 0.8;
		font-size: 16px * 0.8;
		line-height: 24px * 0.8;
		li{
			margin-right: 40px * 0.8;
			padding-bottom: 20px * 0.8;
		}
		.right{
			padding-bottom: 20px * 0.8;
			img{
				width: 16px * 0.8;
				height: 16px * 0.8;
			}
			span{
				padding-left: 10px * 0.8;
			}
		}
	}
}
}
@media (max-width: 980px){
		.transactions{
	.nav{
		width: 1200px * 0.6;
		padding-top: 76px * 0.6;
		li{
			margin-right: 40px * 0.6;
			padding-bottom: 20px * 0.6;
		}
		.right{
			padding-bottom: 20px * 0.6;
			
			span{
				padding-left: 10px * 0.6;
			}
		}
	}
}
}
</style>