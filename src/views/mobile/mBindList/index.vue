<template>
  <div class="data">
		<h3>{{type == 1 ? '银行卡' : type == 2 ? '微信' : '支付宝'}}</h3>
		<div v-for="(item,index) of payList" :key="index">
			<collectionTemplate @click.native="bindPay(item)"
      class="pay_item" :data='item' ></collectionTemplate>
		</div>
		<div class="more">
      <img src="@/assets/transactions/ico_add_gray.png">
      <span @click="bindPay()">新增{{type == 1 ? '银行卡' : type == 2 ? '微信' :'支付宝'}}收款方式</span>
    </div>
  </div>
</template>

<script>
import userInfoApi from '@/api/userInfo'
import collectionTemplate from '@/components/collectionTemplate'
export default {
	data() {
		return {
			type:1,//1 银行卡 2微信 3支付宝
      payList:[],
		}
	},
	components:{
		collectionTemplate
	},
	created(){
		this.type = this.$route.params.type
		this.getPayment()
	},
	methods: {
    // 获取收款方式详细信息
    getPayment() {
      userInfoApi
        .getPayment({
          bindType: this.type
        })
        .then(res => {
          console.log("***********", res.data.data);
          let data = res.data.data;
          if (data.length > 0) {
            this.payList = data[0];
          }
        });
    },
    // 修改或新增
    bindPay(value) {
      if (value) {
        if (value.bindType == 1) {
          window.localStorage.setItem("bank", JSON.stringify(value));
          this.$router.push("/mcardInfo");
        } else if (value.bindType == 2) {
          window.localStorage.setItem("wx", JSON.stringify(value));
          this.$router.push("/mBindZfb/" + value.bindType);
        } else {
          window.localStorage.setItem("zfb", JSON.stringify(value));
          this.$router.push("/mBindZfb/" + value.bindType);
        }
      } else {
        if (this.type == 1) {
          this.$router.push("/mcardInfo");
          window.localStorage.setItem("bank", "");
        } else if (this.type == 2) {
          this.$router.push("/mBindZfb/2");
          window.localStorage.setItem("wx", "");
        } else {
          this.$router.push("/mBindZfb/3");
          window.localStorage.setItem("zfb", "");
        }
      }
    }
  }
}
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
	.pay_item{
		margin-bottom: 0.24rem;
	}
	.more {
    background: #ffffff;
    box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
    border-radius: 6px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
    }
    span {
      padding-left: 12px;
      font-size: 16px;
      color: #40405e;
    }
  }
}
</style>