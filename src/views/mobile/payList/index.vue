<template>
  <div class="payList">
    <div v-for="(item,index) of payList" :key="index">

      <aLiPayAndWei class="pay" :data = 'item' :paymentId='paymentId'  @payment='order'></aLiPayAndWei>
    </div>
    <div class="more">
      <img src="@/assets/transactions/ico_add_gray.png">
      <span @click="bindPay">新增{{type == 1 ? '银行卡' : type == 2 ? '微信' :'支付宝'}}收款方式</span>
    </div>
     <balancepop ref="balancepop" @toCharges="toCharges"></balancepop>
      <ordersNotComp ref="ordersNotComp" @Tohandle="Tohandle"></ordersNotComp>
      <verTransaPwd ref='verTransaPwd' @varTransaSu='varTransaSu'></verTransaPwd>
  </div>
</template>

<script>
//未处理订单
import ordersNotComp from "@/components/ordersNotComp";
import orderInfoApi from "@/api/orderInfo";
import userInfoApi from "@/api/userInfo";
import aLiPayAndWei from "./components/aLiPayAndWei";
//去充币弹框
import balancepop from "@/views/mobile/home/components/insufficientBalance";
import verTransaPwd from '@/components/verTransaPwd' //验证交易密码
export default {
  name: "mPayList",
  data() {
    return {
      type:1,//1银行卡，2微信，3支付宝
      payList:[],
      sellUsdt:{},
      Tohandleid: "", //未处理的订单id
      paymentId:''  //当前选中的id
    }
  },
  components: {
    aLiPayAndWei,
    balancepop,
    ordersNotComp,
    verTransaPwd
  },
  
  created(){
    this.type = this.$route.params.type
    // console.log(this.type)
    this.sellUsdt =JSON.parse(window.localStorage.getItem('sellUsdt')) 
    console.log(this.sellUsdt)
    this.getPayment()
  },
  mounted(){
  },
  methods:{
    varTransaSu(value){
      if(value.length < 6){
        this.$toast('请输入6位支付密码！')
        return
      }
       userInfoApi.verifyPwd({
        pwd:value,
        pwdType: 2
      }).then(res => {
        this.$refs.verTransaPwd.hide()
        if(this.sellUsdt.totalMoney){
        orderInfoApi.bulkTrading({
          totalMoney: this.sellUsdt.totalMoney,
          payment: this.type,
          tradeType: 2,
          coinName: "USDT",
          bindId: this.paymentId
        }).then(res => {
          this.$router.push({
            path: "/msellUsdt/" + res.data.data
          })
        }).catch(err => {
          if (err.data.code == "10094") {
              this.Tohandleid = err.data.data;
              this.$refs.ordersNotComp.show();
            } else if (err.data.code == 10005){
              this.$refs.balancepop.show();
            }else{
              this.$toast(err.data.message);
              this.$router.push('/mbulkTrading')
            }
        })
      }else{
        orderInfoApi.bulkTrading({
          tradeAmount: this.sellUsdt.tradeAmount,
          payment: this.type,
          tradeType: 2,
          coinName: "USDT",
          bindId: this.paymentId
        }).then(res => {
          this.$router.push({
            path: "/msellUsdt/" + res.data.data
          })
        }).catch(err => {
          if (err.data.code == "10094") {
              this.Tohandleid = err.data.data;
              this.$refs.ordersNotComp.show();
            } else if (err.data.code == 10005){
              this.$refs.balancepop.show();
            }else{
              this.$toast(err.data.message);
              this.$router.push('/mbulkTrading')
            }
        })
      }
      })
    },
    //去处理未处理的订单
    Tohandle() {
      this.$router.push({
          path: "/msellUsdt/" + this.Tohandleid
          
        });
    },
    //去充币
    toCharges() {
      this.$router.push("/mCharges");
    },
    order(value){
      this.paymentId = value
      this.$refs.verTransaPwd.show()

      console.log('**********',value)
      console.log('**********',this.sellUsdt)
      // console.log(value)
      // if(this.sellUsdt.totalMoney){
      //   orderInfoApi.bulkTrading({
      //     totalMoney: this.sellUsdt.totalMoney,
      //     payment: this.type,
      //     tradeType: 2,
      //     coinName: "USDT",
      //     bindId: value
      //   }).then(res => {
      //     this.$router.push({
      //       path: "/msellUsdt/" + res.data.data
      //     })
      //   }).catch(err => {
      //     if (err.data.code == "10094") {
      //         this.Tohandleid = err.data.data;
      //         this.$refs.ordersNotComp.show();
      //       } else if (err.data.code == 10005){
      //         this.$refs.balancepop.show();
      //       }else{
      //         this.$toast(err.data.message);
      //         this.$router.push('/mbulkTrading')
      //       }
      //   })
      // }else{
      //   orderInfoApi.bulkTrading({
      //     tradeAmount: this.sellUsdt.tradeAmount,
      //     payment: this.type,
      //     tradeType: 2,
      //     coinName: "USDT",
      //     bindId: value
      //   }).then(res => {
      //     this.$router.push({
      //       path: "/msellUsdt/" + res.data.data
      //     })
      //   }).catch(err => {
      //     if (err.data.code == "10094") {
      //         this.Tohandleid = err.data.data;
      //         this.$refs.ordersNotComp.show();
      //       } else if (err.data.code == 10005){
      //         this.$refs.balancepop.show();
      //       }else{
      //         this.$toast(err.data.message);
      //         this.$router.push('/mbulkTrading')
      //       }
      //   })
      // }
    },
    // 获取收款方式详细信息
    getPayment() {
      userInfoApi
        .getPayment({
          bindType: this.type
        })
        .then(res => {
          console.log(res);
          let data = res.data.data
					if(data.length > 0){
            this.payList  =data[0];
					}
          
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    //新增收款方式
    bindPay(){
      if(this.type == 1){
        this.$router.push('/mcardInfo')
        window.localStorage.setItem("bank", "")
      }else if(this.type == 2){
        this.$router.push('/mBindZfb/2')
        window.localStorage.setItem("wx", "");
      }else{
        this.$router.push('/mBindZfb/3')
        window.localStorage.setItem("zfb", "");
      }
    }
  }

};
</script>
 
<style lang="less" scoped>
.payList {
  padding: .24rem;
  
  .pay{
    margin-top: .24rem;
  }

  .more{
    width: 100%;
    height: 1.12rem;
    margin-top: .24rem;
    box-shadow: 0 .08rem .48rem rgba(64, 64, 94, 0.08);
    border-radius: .12rem;
    display: flex;
    align-items: center;

    img{
      width: .56rem;
      height: .56rem;
      margin-left: .4rem;
    }
    
    span{
      font-size: .32rem;
      color: #40405E;
      margin-left: .24rem;
    }
  }
}
</style> 