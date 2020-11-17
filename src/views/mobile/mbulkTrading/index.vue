<template>
  <div class="home">
    <div class="bulkTitle flex">
      <img src="@/assets/transactions/ic_large.png" alt />
      大宗交易专区
    </div>
		<div class="purchase">
      <div class="flex_row">
        <div class="flex_end">
          <div class="buySellTitle" :class="{buySellusdt: BuyorSell == 1}" @click="buySellClick(1)">一键买入</div>
          <div class="buySellTitle" :class="{buySellusdt: BuyorSell == 2}" style="padding-left:0.4rem" @click="buySellClick(2)">一键卖出</div>
        </div>
      </div>

      <!-- 购买数量金额 -->
      <div class="buyrow">
        <div class="flex_row buyrow1">
          <div class="flex">
            <div class="rateTit buyrow1_text">汇率约</div>
            <div class="rateNum buyrow1_text">1 USDT = {{coinlist.coinToCny | toThousandFilter}} CNY</div>
          </div>
          <div class="flex" @click="clickType">
            <img class="buyimg" src="@/assets/transactions/ic_switch.png" alt />
            <div class="buyrow1_text rateL">{{form.type == 1 && BuyorSell == 1 ? '按数量购买' : form.type == 2 && BuyorSell == 1 ? '按金额购买' : form.type == 1 && BuyorSell == 2 ? '按数量出售' : '按金额出售'}}</div>
          </div>
        </div>
        <div class="flex_row buyrow2">
          <div class="flex">
            <img
              v-if="form.type == 1"
              class="ico_img"
              src="@/assets/transactions/ico_cny.png"
              alt
            />
            <img
              v-if="form.type == 2"
              class="ico_img"
              src="@/assets/transactions/ico_usdt.png"
              alt
            />
            <div class="mybuy">
              <div class="mym">{{BuyorSell == 1 ? '我要买' : '我要卖'}}</div>
              <div class="flex inputs">
                <span class="buyrow2_type" v-if="form.type == 1">￥</span>
                <input
                  class="input"
                  v-if=" form.type == 1"
                  placeholder="0.00"
                  v-model="form.cny"
                  type="text"
                  @input="inputNum"
                />
                <input
                  class="input"
                  v-if="form.type == 2"
                  placeholder="0.0000"
                  v-model="form.usdt"
                  type="text"
                  @input="inputNum"
                />
              </div>
            </div>
          </div>
          <div class="buyrow2_type">{{form.type == 1 ? 'CNY' : 'USDT'}}</div>
        </div>
        <div class="flex buyrow3">
          <div class="support">支持</div>
          <img src="@/assets/transactions/ico_bankpay.png" alt />
          <img src="@/assets/transactions/ico_alipay.png" alt />
          <img src="@/assets/transactions/ico_weixinpay.png" alt />
        </div>
      </div>
      <button class="button" @click="Buyimmediately">
        <img src="@/assets/transactions/ico_zap.png" alt />
        <p>{{BuyorSell == 1 ? '立即买入' : '立即卖出'}}</p>
      </button>
    </div>
   
    
    <!-- 订单列表 -->
    <!--  
      <div class="flex_row orderrow1">
        <div class="order_title">我的订单</div>
        <div class="flex" @click="morelist">
          <div class="alltext">全部</div>
          <img class="allimg" src="@/assets/transactions/ico_arrow_right.png" alt />
        </div>
      </div>
      <nolist class="nolist" v-if="orderList.length == 0"></nolist>
      <div v-else class="orderrow2">
        <orderItem
          v-for="(item,index) of orderList"
          :key="index"
          :item="item"
          class="order_item"
          @click.native="getorderDetails(item)"
        ></orderItem>
      </div>
    </div> -->
    <!-- 底部 -->
    <!-- <div class="provision">
      交易服务由
      <div style="color:#0CB397;">{{$appConfig.lowerName}}</div>提供支持
    </div> -->

    <paymentType ref="paymentType" @payment="payment"></paymentType>
    <ordersNotComp ref="ordersNotComp" @Tohandle="Tohandle"></ordersNotComp>
  
 
    <kycCertification ref="kycCertification" @toKyc="toKyc"></kycCertification>
    <noSetTradePwd ref='noSetTradePwd' @goSet='goSet'></noSetTradePwd>
    <verTransaPwd ref='verTransaPwd' @varTransaSu='varTransaSu'></verTransaPwd>
  </div>
</template>

<script>
import orderInfoApi from "@/api/orderInfo";
import buyApi from "@/api/buy.js";
import userInfoApi from "@/api/userInfo.js";
import { customerService } from "@/utils/index";
import orderItem from "@/components/orderTemplate/index";
import nolist from "@/components/nolist/index";
//支付方式
import paymentType from "@/views/mobile/home/components/paymentType";

//未处理订单
import ordersNotComp from "@/components/ordersNotComp";


//kyc认证弹框
import kycCertification from "@/views/mobile/home/components/kycCertification.vue";
import verTransaPwd from '@/components/verTransaPwd' //验证交易密码
import noSetTradePwd from '@/components/noSetTradePwd'//没有设置交易密码
export default {
  name: "mobilehome",
  data() {
    return {
      item:{},//选择方式后保存的数据
      BuyorSell: 1, //1买  2 卖
      coinlist: [], //币种详情
      Tohandleid: "", //未处理的订单id
      orderList: [], //订单列表
			userInfo:{},//个人信息
			form:{
				type: 1,//类型 1 金额 2 数量
				cny:"",
				usdt:"",
			},
     
      kycInformation: [],//kyc信息
      priceLimit:{} //买卖区间
    };
  },
  components: {
    orderItem,
    nolist,
    paymentType,
    kycCertification,
    ordersNotComp,
    noSetTradePwd,
     verTransaPwd
  },
  created() {

    this.BuyorSell = window.localStorage.getItem("bulktype")
    this.getUserInfo()
    this.getPriceLimit()
    this.getBalance();
    this.kycstatus();
    this.getcoinlist();
    this.getorderList();
  },
  mounted() {},
  methods: {
    //获取订单区间
    getPriceLimit(){
      orderInfoApi.getPriceLimit({
          bigSale:1
        }).then(res => {
          this.priceLimit = res.data.data
          console.log('---------====================-----',res.data.data)
        })
    },
    goSet(){
      console.log('去设置交易密码')
      this.$router.push('/mpersonalCentre')
    },
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
        if(this.BuyorSell == 1){
					if(this.form.type == 1){
						orderInfoApi.bulkTrading({
							totalMoney: this.form.cny,
							payment: this.item.value,
							tradeType: this.BuyorSell,
							coinName: "USDT"
						}).then(res => {
							this.$router.push({
								path: "/morderDetails/" + res.data.data
							})
						}).catch(err => {
							if (err.data.code == "10094") {
								this.Tohandleid = err.data.data;
								this.$refs.ordersNotComp.show();
								return;
							} else {
								this.$toast(err.data.message);
							}
						});
					}else{
						orderInfoApi.bulkTrading({
							tradeAmount: this.form.usdt,
							payment: this.item.value,
							tradeType: this.BuyorSell,
							coinName: "USDT"
						}).then(res => {
							this.$router.push({
								path: "/morderDetails/" + res.data.data
							})
						}).catch(err => {
							if (err.data.code == "10094") {
								this.Tohandleid = err.data.data;
								this.$refs.ordersNotComp.show();
								return;
							} else {
								this.$toast(err.data.message);
							}
						});
					}
      }
      // else{

      //   this.$router.push({
      //     path:'/mPayList/' + this.item.value,
      //   })
      //   const sellUsdts = {
      //     totalMoney: this.form.cny,
      //     tradeAmount: this.form.usdt
      //   }
      //   window.localStorage.setItem('sellUsdt', JSON.stringify(sellUsdts) )
			// }
      }).catch(err => {
        this.$toast(err.data.message)
      })
    },
    // 用户基本信息
    getUserInfo() {
      userInfoApi
        .getUserInfo()
        .then(res => {
          console.log('----------------',res)
          this.userInfo = res.data.data;
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    //买卖切换
    buySellClick(value) {
      window.localStorage.setItem("bulktype", value);
			this.BuyorSell = value;
			this.form.type = 1
			this.form.cny = ''
			this.form.usdt = ''
      this.getorderList();
    },
    //kyc认证填写
    toKyc() {
      console.log("去填写");
      if (
        this.kycInformation.kycStatus == 1 ||
        this.kycInformation.kycMiddleStatus == 1 ||
        this.kycInformation.kycUpgradeStatus == 1
      ) {
        this.$router.push("/mWaitCheck");
      } else {
        this.$router.push("/mThrough");
      }
    },

    inputNum() {
      this.form.cny = this.form.cny.replace(/[^\d.]/g, "");
      this.form.usdt = this.form.usdt.replace(/[^\d.]/g, "");
    },
    //获取余额
    getBalance() {
      buyApi
        .getBalance({
          coinName: "USDT"
        })
        .then(res => {
          this.balance = res.data.data;
        })
        .catch(err => {
          console.log(err);
          this.$toast(err.data.message);
        });
    },
    
   
  
    //获取kyc状态
    kycstatus() {
      buyApi
        .kycstatus({})
        .then(res => {
          // console.log(res)
          var data = res.data.data;
          this.kycInformation = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取币种信息
    getcoinlist() {
      buyApi
        .getcoinlist({
          coinName: "USDT"
        })
        .then(res => {
          // console.log(res);
          this.coinlist = res.data.data[0];
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    //获取订单列表
    getorderList() {
      buyApi
        .myorder({
          orderType: 5,
          current: 1,
          size: 3,
          // active: 3,
          tradeType: this.BuyorSell
        })
        .then(res => {
          // console.log(res);
          this.orderList = res.data.data.records;
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    //跳转详情
    getorderDetails(item) {
      // console.log(item);
      if (item.isSeller == 0) {
        this.$router.push({
          path: "/morderDetails/" + item.id
          // params: {
          //   id: item.id
          // }
        });
      } else {
        this.$router.push({
          path: "/msellUsdt/" + item.id
          // params: {
          //   id: item.id
          // }
        });
      }
    },
    //客服
    customerService() {
      customerService();
    },
    //购买出售类型
    clickType() {
			if(this.form.type == 1){
				this.form.type = 2
			}else{
				this.form.type = 1
			}
			this.form.cny = ''
			this.form.usdt = ''
			
    },
    
    //立即买入选择方式弹框
    Buyimmediately() {

      if(this.userInfo.tradePwdSet == 0){
          this.$refs.noSetTradePwd.show()
          return
        }
			if(this.BuyorSell == 1){
				if(this.form.type == 1){
					if(!this.form.cny){
				    this.$toast("请输入购买金额");
          	return;
          }
          if(this.form.cny < this.priceLimit.minCnyBuyAmount - 0 || this.form.cny  > this.priceLimit.maxCnyBuyAmount - 0){
          this.$toast('当前最小交易金额是' + this.priceLimit.minCnyBuyAmount + ',最大交易金额是' + this.priceLimit.maxCnyBuyAmount + '，请输入正确的金额');
          return
        }
				}else{
					if(!this.form.usdt){
				    this.$toast("请输入购买数量");
          	return;
          }
          if(this.form.usdt < this.priceLimit.minUsdtBuyAmount - 0 || this.form.usdt  > this.priceLimit.maxUsdtBuyAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtBuyAmount + ',最大交易数量是' + this.priceLimit.maxUsdtBuyAmount + '，请输入正确的数量');
          return
        }
				}
				
			}else{
				if(this.form.type == 1){
					if(!this.form.cny){
				    this.$toast("请输入出售金额");
          	return;
          }
          if(this.form.cny < this.priceLimit.minCnySaleAmount - 0 || this.form.cny  > this.priceLimit.maxCnySaleAmount - 0){
          this.$toast('当前最小交易金额是' + this.priceLimit.minCnySaleAmount + ',最大交易金额是' + this.priceLimit.maxCnySaleAmount + '，请输入正确的金额');
          return
        }
				}else{
					if(!this.form.usdt){
				    this.$toast("请输入出售数量");
          	return;
          }
          if(this.form.usdt < this.priceLimit.minUsdtSaleAmount - 0 || this.form.usdt  > this.priceLimit.maxUsdtSaleAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtSaleAmount + ',最大交易数量是' + this.priceLimit.maxUsdtSaleAmount + '，请输入正确的数量');
          return
        }
				}
				
				
			}
			if (this.kycInformation.kycStatus != 2) {
					this.$refs.kycCertification.show();
					return;
				}
				this.$refs.paymentType.show(this.BuyorSell);
     
    },
    // 选择的支付 收款方式 下单
    payment(item) {
      this.item = item
      if(this.BuyorSell == 1){
        this.$refs.verTransaPwd.show()
      }else {

        this.$router.push({
          path:'/mPayList/' + this.item.value,
        })
        const sellUsdts = {
          totalMoney: this.form.cny,
          tradeAmount: this.form.usdt
        }
        window.localStorage.setItem('sellUsdt', JSON.stringify(sellUsdts) )
      }
      // if(this.BuyorSell == 1){
			// 		if(this.form.type == 1){
			// 			orderInfoApi.bulkTrading({
			// 				totalMoney: this.form.cny,
			// 				payment: item.value,
			// 				tradeType: this.BuyorSell,
			// 				coinName: "USDT"
			// 			}).then(res => {
			// 				this.$router.push({
			// 					path: "/morderDetails/" + res.data.data
			// 				})
			// 			}).catch(err => {
			// 				if (err.data.code == "10094") {
			// 					this.Tohandleid = err.data.data;
			// 					this.$refs.ordersNotComp.show();
			// 					return;
			// 				} else {
			// 					this.$toast(err.data.message);
			// 				}
			// 			});
			// 		}else{
			// 			orderInfoApi.bulkTrading({
			// 				tradeAmount: this.form.usdt,
			// 				payment: item.value,
			// 				tradeType: this.BuyorSell,
			// 				coinName: "USDT"
			// 			}).then(res => {
			// 				this.$router.push({
			// 					path: "/morderDetails/" + res.data.data
			// 				})
			// 			}).catch(err => {
			// 				if (err.data.code == "10094") {
			// 					this.Tohandleid = err.data.data;
			// 					this.$refs.ordersNotComp.show();
			// 					return;
			// 				} else {
			// 					this.$toast(err.data.message);
			// 				}
			// 			});
			// 		}
			// }else{

      //   this.$router.push({
      //     path:'/mPayList/' + item.value,
      //   })
      //   const sellUsdts = {
      //     totalMoney: this.form.cny,
      //     tradeAmount: this.form.usdt
      //   }
      //   window.localStorage.setItem('sellUsdt', JSON.stringify(sellUsdts) )
			// }
    },
    
   
    //去处理未处理的订单
    Tohandle() {
      if (this.BuyorSell == 1) {
        this.$router.push({
          path: "/morderDetails/" + this.Tohandleid
          // params: {
          //   id: this.Tohandleid
          // }
        });
      } else {
        this.$router.push({
          path: "/msellUsdt/" + this.Tohandleid
          // params: {
          //   id: this.Tohandleid
          // }
        });
      }
    },
    
    //全部订单
    morelist() {
      this.$router.push({
        path: "/mOrderList"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
	padding-top: 0.6rem;
  .bulkTitle {
		padding:0 0.32rem;
		font-size: 0.4rem;
		line-height: 0.56rem;
		img{
			width: 0.4rem;
			margin-right: 0.12rem;
		}
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #dddde6;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #dddde6;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #dddde6;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #dddde6;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex_end {
    display: flex;
    align-items: flex-end;
  }
  .flex_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logorow {
    padding: 0.28rem 0.32rem;
    .logo {
      width: 2.7rem;
      height: auto;
    }
    .kefu {
      width: 0.44rem;
      height: auto;
    }
  }
  .buyrow {
    padding-top: 0.64rem;
    .buyrow1 {
      padding-bottom: 0.32rem;
      .buyrow1_text {
        font-family: PingFangSC;
        font-size: 0.26rem;
        line-height: 0.3rem;
      }
      .rateTit {
        color: #a0a0b3;
        padding-right: 0.12rem;
      }
      .rateNum {
        color: #40405e;
      }
      .buyimg {
        width: 0.2rem;
        height: 0.16rem;
        align-self: center;
      }
      .rateL {
        padding-left: 0.12rem;
        color: @cl-m;
      }
    }
    .buyrow2 {
      background: #ffffff;
      border: 1px solid #f2f2f5;
      box-sizing: border-box;
      border-radius: 0.12rem;
      height: 1.6rem;
      padding: 0.4rem;
      .ico_img {
        width: 0.8rem;
        height: 0.8rem;
      }
      .mybuy {
        padding-left: 0.32rem;
        .mym {
          font-family: PingFangSC;
          font-size: 0.24rem;
          line-height: 0.28rem;
          color: #a0a0b3;
        }
        .inputs {
          padding-top: 0.04rem;
          .input {
            height: 0.46rem;
            width: 3rem;
            font-size: 0.4rem;
          }
        }
      }
      .buyrow2_type {
        font-size: 0.32rem;
        line-height: 0.38rem;
        color: #40405e;
      }
    }
    .buyrow3 {
      padding: 0.32rem 0 0.6rem 0;
      .support {
        font-family: PingFangSC;
        font-size: 0.26rem;
        line-height: 0.3rem;
        color: #a0a0b3;
      }
      img {
        margin-left: 0.2rem;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
  .button {
    width: 100%;
    height: 0.96rem;
    background: @cl-m;
    border-radius: 0.48rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    p {
      padding-left: 0.16rem;
      height: 0.4rem;
      font-family: PingFangSC;
      font-size: 0.32rem;
      color: #ffffff;
      line-height: 0.38rem;
    }
  }
  .button_h {
    background: linear-gradient(0deg, #dddde6, #dddde6);
  }
  .tips {
    display: flex;
    justify-content: center;
    padding-top: 0.3rem;
    font-family: PingFangSC;
    font-size: 0.24rem;
    line-height: 0.4rem;
    color: #f2a145;
  }
  .tipssell {
    display: flex;
    justify-content: flex-start;
    padding-top: 0.3rem;
    font-family: PingFangSC;
    font-size: 0.24rem;
    line-height: 0.4rem;
    color: #f2a145;
  }

  .balance {
    padding-top: 0.28rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.26rem;
    line-height: 0.36rem;
    color: #a0a0b3;
    .balance_left {
      display: flex;
    }
    .Charges {
      color: @cl-m;
    }
  }
  .buySellTitle {
		font-size: 0.28rem;
    line-height: 0.4rem;
    color: #a0a0b3;
  }
	.buySellusdt {
		font-family: PingFangSC;
		font-size: 0.36rem;
		line-height: 0.42rem;
		color: #40405e;
	}
  .help_img {
    width: 0.36rem;
    height: 0.36rem;
    align-self: center;
  }
  .helptext {
    padding-left: 0.04rem;
    align-self: center;
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #40405e;
  }
  //购买
  .purchase {
    padding: 0.4rem 0.32rem 0.8rem 0.32rem;
    .userrow {
      margin-top: 0.4rem;
      height: 1.04rem;
      padding: 0.32rem;
      border: 1px solid #f2f2f5;
      box-sizing: border-box;
      border-radius: 0.12rem;
      .user_text {
        font-size: 0.28rem;
        line-height: 0.32rem;
      }
      .user {
        color: #a0a0b3;
      }
      .user_num {
        color: #40405e;
      }
    }
  }
  //出售
  .sale {
    padding: 0.4rem 0.32rem 0.8rem 0.32rem;

    .saletype {
      font-family: PingFangSC;
      font-size: 0.32rem;
      line-height: 0.38rem;

      color: #40405e;
      padding: 0.6rem 0 0.32rem 0;
    }
    .add_gray {
      background: #ffffff;
      border: 1px solid #f2f2f5;
      box-sizing: border-box;
      border-radius: 6px;
      height: 1.12rem;
      display: flex;
      align-items: center;
      padding: 0.28rem;
      margin-bottom: 0.6rem;
      .addgray_img {
        width: 0.56rem;
        height: 0.56rem;
      }
      .addtext {
        padding-left: 0.24rem;
        font-family: PingFangSC;
        font-size: 0.32rem;
        line-height: 0.38rem;
        color: #40405e;
      }
    }
    .bank {
      background: #ffffff;
      box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
      border-radius: 6px;
      border: 0.03rem solid #fff;
      margin-bottom: 0.24rem;
      .bank_text {
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
      }
      .bank_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.32rem 0.4rem;
        .bank_header_name {
          display: flex;
          align-items: center;
          .bankpay {
            width: 0.56rem;
            height: 0.56rem;
          }
          .text_block {
            color: #40405e;
            padding-left: 0.24rem;
          }
        }
        .bankChoice {
          display: flex;
          align-items: center;
          .choiceText {
            font-size: 0.24rem;
            padding-right: 0.1rem;
            color: #a0a0b3;
          }
          .choiceActive {
            color: @cl-m;
          }
          .choiceImg {
            width: 0.32rem;
            height: 0.32rem;
          }
        }
      }
      .bank_content {
        background: #f7f7fa;
        padding: 0.32rem 0.34rem;
        .bankcard {
          padding-top: 0.12rem;
          font-size: 0.32rem;
          line-height: 0.38rem;
          color: #40405e;
        }
      }
    }
  }
  //订单列表
  .orderList {
    padding-top: 0.8rem;
    .nolist {
      margin-top: 0.6rem;
    }
    .orderrow1 {
      padding: 0 0.32rem;
      .order_title {
        font-family: PingFangSC;
        font-size: 0.32rem;
        line-height: 0.38rem;
        color: #40405e;
      }
      .alltext {
        padding-right: 0.1rem;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
        color: #a0a0b3;
        align-self: flex-end;
      }
      .allimg {
        align-self: center;
        width: 0.12rem;
        height: 0.2rem;
      }
    }
    .orderrow2 {
      padding: 0.5rem 0.24rem 0;
      .order_item {
        margin-top: 0.36rem;
      }
    }
  }
  //底部提供
  .provision {
    padding: 0.92rem 0 0.44rem 0;
    display: flex;
    justify-content: center;
    font-family: PingFangSC;
    font-size: 0.26rem;
    line-height: 0.3rem;
    color: #a0a0b3;
  }
}
</style>
