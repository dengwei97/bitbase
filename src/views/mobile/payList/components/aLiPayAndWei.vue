<template>
  <div class="aLiPayAndWei" @click="bindPay(data)">
    <div class="pay">
      <div class="left">
				<img v-if="data.bindType == 1" class="pay_img" src="@/assets/transactions/ic_bankpay_yhq.png" />
				<img v-else-if="data.bindType == 2" class="pay_img" src="@/assets/transactions/ic_bankpay_weixin.png" />
        <img v-else class="pay_img" src="@/assets/transactions/ic_bankpay_zfb.png" />
				<span>{{data.bindType == 1 ? data.paymentCode : data.bindType == 2 ? '微信' : '支付宝' }}</span>
      </div>
      <div class="right" @click.stop="choose(data.id)">
        <span :class="{'choose':data.id == paymentId}">选择</span>
        <img v-if="data.id == paymentId" src="@/assets/transactions/bankChoice_active.png" />
        <img v-else src="@/assets/transactions/bankChoice.png" />
      </div>
    </div>
    <div class="card" :style="{alignItems:data.bindType  == 1? '' :'center'}">
      <div class="cardInfo">
        <span>{{data.name}}</span>
        <span>{{data.account}}</span>
      </div>
			<span v-if="data.bindType == 1" class="branch">{{data.addition}}</span>
      <img v-else src="@/assets/transactions/ico_qr_code.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "aLiPayAndWei",
  data() {
    return {
			chooseStatus: false,
      // type: 1 ,//1银行卡 2微信 3支付宝
      
    };
  },
  props:{
    data:{
      type: Object
    },

    paymentId:{
      type: Number | Array
    },
    
  
  },
	created(){
    // this.type = this.$parent.type;
    
	},
  methods: {
    choose(id) {
      this.chooseStatus = true;
      this.$emit('payment',id)
      
      
    },
    bindPay(value){
      if(value.bindType == 1){
        window.localStorage.setItem("bank", JSON.stringify(value));
        this.$router.push('/mcardInfo')
      }else if(value.bindType == 2){
        window.localStorage.setItem("wx", JSON.stringify(value));
        this.$router.push('/mBindZfb/' + value.bindType)
      }else{
        window.localStorage.setItem("zfb", JSON.stringify(value));
        this.$router.push('/mBindZfb/' + value.bindType)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.aLiPayAndWei {
  width: 100%;
  height: 2.8rem;
  box-shadow: 0 0.08rem 0.48rem rgba(64, 64, 94, 0.08);
  border-radius: 0.12rem;
  padding: 0.06rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .pay {
    display: flex;
    justify-content: space-between;
    padding: 0.32rem 0.34rem 0;

    .left {
      display: flex;
      align-items: center;

      .pay_img {
        width: 0.56rem;
        height: 0.56rem;
      }

      span {
        font-size: 0.28rem;

        color: #40405e;
        padding-left: 0.24rem;
      }
    }

    .right {
      display: flex;
      align-items: center;
      color: #d5d5ed;
      font-size: 0.24rem;

      .choose {
        color: @cl-m;

      }

      img {
        width: 0.32rem;
        height: 0.32rem;
        margin-left: 0.08rem;
      }
    }
  }

  .card {
    width: 100%;
    height: 1.54rem;
    background: #f7f7fa;
    padding: 0.32rem;
    display: flex;
		justify-content: space-between;
		// align-items: center;

    .cardInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.28rem;
      color: #a0a0b3;

      span:nth-child(2) {
        font-size: 0.32rem;
        color: #40405e;
        font-weight: 600;
      }
		}
		
		.branch{
			font-size: 14px;
			color: #A0A0B3;
		}

    img {
      width: 0.32rem;
      height: 0.32rem;
    }
  }
}
</style>