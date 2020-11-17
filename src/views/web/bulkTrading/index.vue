<template>
  <div>
    <Trheader :Onactive="Onactive"></Trheader>
    <div class="bulk_trading" v-if="Object.keys(userInfoList).length > 0">
      <!-- 没有交易权限 -->
      <div class="noPermissions" v-if="noPermissions">
        <img src="@/assets/transactions/ico_alert_red.png" alt />
        <p>未开通交易权限</p>
        <div>
          对不起，您暂时没有大宗交易区权限
          <br />您可以联系客服开通交易权限
        </div>
        <button class="pointer" @click="customerService">联系客服</button>
      </div>

      <!-- 一键购买出售 -->
      <div class="oneBuy" v-if="!noPermissions">
        <div class="flex switchingBuy">
          <div @click="switchBuy(1)" :class="{active:switchingBuy.actived == 1}">一键购买</div>
          <div @click="switchBuy(2)" :class="{active:switchingBuy.actived == 2}">一键出售</div>
        </div>
        <div v-if="switchingBuy.actived == 1">
          <div class="input_box flex_center_between text">
            <div>支付</div>
            <input type="text" v-model="switchingBuy.totalMoney" @input="calculation('totalMoney')" :placeholder=" '单笔购买数量' + priceLimit.minUsdtBuyAmount +'~'+ priceLimit.maxUsdtBuyAmount +'USDT'"  />
            <div>CNY</div>
          </div>
          <div class="coinInfo">参考价格： {{coinInfo.coinToCny}}CNY/USDT</div>
          <div class="input_box flex_center_between text">
            <div>获得≈</div>
            <input
              type="text"
              @input="calculation('tradeAmount')"
              v-model="switchingBuy.tradeAmount"
            />
            <div>USDT</div>
          </div>
        </div>
        <div v-if="switchingBuy.actived == 2">
          <div class="input_box flex_center_between text">
            <div>出售</div>
            <input
              type="text"
              @input="calculation('tradeAmount')"
              v-model="switchingBuy.tradeAmount"
              :placeholder=" '单笔出售数量' + priceLimit.minUsdtSaleAmount +'~'+ priceLimit.maxUsdtSaleAmount +'USDT'"
            />
            <div>USDT</div>
          </div>
          <div class="coinInfo">可用余额：{{ wallet }}USDT</div>
          <div class="input_box flex_center_between text">
            <div>获得≈</div>
            <input type="text" @input="calculation('totalMoney')" v-model="switchingBuy.totalMoney" />
            <div>CNY</div>
          </div>
        </div>

        <!-- 支付或收款方式 -->
        <div class="payType">
          <p class="pay">{{switchingBuy.actived == 1 ? '支付方式' : '收款方式'}}</p>
          <div class="flex">
            <div
              class="payimg pointer"
              :class="{payactive: switchingBuy.payment == 1}"
              @click="changePayment(1)"
            >
              <img class="pay_img" src="@/assets/transactions/ico_cardpay.png" />
              <p class="text">银行卡</p>
            </div>
            <div
              class="payimg pointer"
              :class="{payactive: switchingBuy.payment == 3}"
              @click="changePayment(3)"
            >
              <img class="pay_img" src="@/assets/transactions/ico_alipay.png" />
              <p class="text">支付宝</p>
            </div>
            <div
              class="payimg pointer"
              :class="{payactive: switchingBuy.payment == 2}"
              @click="changePayment(2)"
            >
              <img class="pay_img" src="@/assets/transactions/ico_weixinpay.png" />
              <p class="text">微信</p>
            </div>
          </div>
        </div>
        <!-- 选择收款方式 -->
        <div v-if="switchingBuy.actived == 2">
          <p
            class="switchPayType"
          >{{switchingBuy.payment == 1 ? '选择银行卡' : switchingBuy.payment == 2 ? '选择微信' : '选择支付宝'}}</p>

          <!-- 银行卡收款方式 -->
          <div class="paycard" v-if="switchingBuy.payment == 1">
            <!-- 已有银行卡 -->
            <div
              v-for="(item,index) of payment.banklist"
              :key="index"
              class="getCard"
              @click="bindPay(item)"
            >
              <div class="up">
                <div class="up_left">
                  <img src="@/assets/transactions/ico_bankpay.png" />
                  <div>{{ item.paymentCode }}</div>
                </div>
                <div class="bankChoice" @click.stop="bankChoice(index)">
                  <div class="choiceText" :class="{choiceActive : bankActive == index}">选择</div>
                  <img
                    v-if="bankActive == index"
                    class="choiceImg"
                    src="@/assets/transactions/bankChoice_active.png"
                    alt
                  />
                  <img v-else class="choiceImg" src="@/assets/transactions/bankChoice.png" alt />
                </div>
              </div>
              <div class="down">
                <div class="name">
                  <div>{{ item.name }}</div>
                  <div>{{ item.addition }}</div>
                </div>
                <div class="card">{{ item.account | yhqFormat() }}</div>
              </div>
            </div>
            <!-- 添加银行卡 -->
            <div class="addCard" @click="bindPay()">
              <img src="@/assets/transactions/ico_add_gray.png" />
              <div>添加银行卡</div>
            </div>
          </div>

          <!-- 微信收款方式 -->
          <div class="paycard" v-if="switchingBuy.payment == 2">
            <div
              v-for="(item,index) of payment.wxlist"
              :key="index"
              class="getCard"
              @click="bindPay(item)"
            >
              <div class="up">
                <div class="up_left">
                  <img src="@/assets/transactions/ico_weixinpay.png" />
                  <div>微信</div>
                </div>
                <div class="bankChoice" @click.stop="bankChoice(index)">
                  <div class="choiceText" :class="{choiceActive : bankActive == index}">选择</div>
                  <img
                    v-if="bankActive == index"
                    class="choiceImg"
                    src="@/assets/transactions/bankChoice_active.png"
                    alt
                  />
                  <img v-else class="choiceImg" src="@/assets/transactions/bankChoice.png" alt />
                </div>
              </div>
              <div class="downwx">
                <div class="left">
                  <div class="name">{{ item.name }}</div>
                  <div class="account">{{ item.account }}</div>
                </div>
                <img class="right" src="@/assets/transactions/ico_qr_code.png" />
              </div>
            </div>
            <!-- 添加微信收款方式 -->
            <div class="addCard" @click="bindPay()">
              <img src="@/assets/transactions/ico_add_gray.png" />
              <div>添加微信收款方式</div>
            </div>
          </div>
          <!-- 支付宝收款方式 -->
          <div class="paycard" v-if="switchingBuy.payment == 3">
            <div
              v-for="(item,index) of payment.zfblist"
              :key="index"
              class="getCard"
              @click="bindPay(item)"
            >
              <div class="up">
                <div class="up_left">
                  <img src="@/assets/transactions/ico_alipay.png" />
                  <div>支付宝</div>
                </div>
                <div class="bankChoice" @click.stop="bankChoice(index)">
                  <div class="choiceText" :class="{choiceActive : bankActive == index}">选择</div>
                  <img
                    v-if="bankActive == index"
                    class="choiceImg"
                    src="@/assets/transactions/bankChoice_active.png"
                    alt
                  />
                  <img v-else class="choiceImg" src="@/assets/transactions/bankChoice.png" alt />
                </div>
              </div>
              <div class="downwx">
                <div class="left">
                  <div class="name">{{ item.name }}</div>
                  <div class="account">{{ item.account }}</div>
                </div>
                <img class="right" src="@/assets/transactions/ico_qr_code.png" />
              </div>
            </div>
            <!-- 添加支付宝收款方式 -->
            <div class="addCard" @click="bindPay()">
              <img src="@/assets/transactions/ico_add_gray.png" />
              <div>添加支付宝收款方式</div>
            </div>
          </div>
        </div>

        <!-- 提交按钮 -->
        <button
          class="buybtn pointer"
          :class="{'btnState': getState}"
          :disabled="!getState"
          @click="bulkTrading"
        >
          <img src="@/assets/transactions/ico_zap.png" alt />
          {{switchingBuy.actived == 1 ? '立即购买' : '立即出售'}}
        </button>
      </div>
    </div>

    <!-- 存在正在交易未处理订单时弹出 -->
    <div v-if="proType" class="diopro">
      <div class="prompt">
        <div class="up">
          <img src="@/assets/transactions/ico_paid_yellow.png" />
          <div>您存在正在进行交易的订单，请处理完成后方可再次下单</div>
        </div>
        <div class="down">
          <button class="left" @click="closeDiopro">取消</button>
          <button class="right" @click="clOrdenIng()">去处理</button>
        </div>
      </div>
    </div>
    <kycCertification ref="kycCertification" @toKyc="toKyc" />
    <rechargePop ref="rechargePop" @recharge="recharge" />
    <noSetTradePwd ref='noSetTradePwd' @goSet='goSet'></noSetTradePwd>
    <verTransaPwd ref='verTransaPwd' @varTransaSu='varTransaSu'></verTransaPwd>
  </div>
</template>

<script>
import verTransaPwd from '@/components/verTransaPwd' //验证交易密码
import noSetTradePwd from '@/components/noSetTradePwd'//没有设置交易密码
import Trheader from "@/components/transactionHeader";
import orderInfoApi from "@/api/orderInfo";
import userInfoApi from "@/api/userInfo";
import { customerService } from "@/utils";
// kyc验证弹框
import kycCertification from "@/views/web/home/components/kycCertification";
import rechargePop from "@/views/web/home/components/rechargePop"; // 充币
export default {
  data() {
    return {
      priceLimit:{}, //买卖区间
      proType: false, // 订单未处理弹框
      proTypeId: "", //未处理订单id
      Onactive: 3, //交易头部当前交易类型
      userInfoList: [], //用户详细信息
      noPermissions: false, //是否可以大宗交易
      coinInfo: {}, // 币种信息
      wallet: 0, // 余额
      kycInformation: [], // kyc信息
      switchingBuy: {
        actived: 1, //1买  2卖
        tradeAmount: "", //数量
        totalMoney: "", //金额
        payment: 1 //收款 、支付方式
      },
      bankActive: 0, // 默认选择的银行卡 支付宝 微信
      payment: {
        banklist: [],
        wxlist: [],
        zfblist: []
      }
    };
  },
  components: {
    Trheader,
    kycCertification,
    rechargePop,
    noSetTradePwd,
     verTransaPwd
  },
  computed: {
    getState: function() {
      if (this.switchingBuy.actived == 1) {
        let state = true;
        if (!this.switchingBuy.tradeAmount) {
          state = false;
        }
        if (!this.switchingBuy.totalMoney) {
          state = false;
        }
        return state;
      } else {
        let state = true;
        if (!this.switchingBuy.tradeAmount) {
          state = false;
        }
        if (!this.switchingBuy.totalMoney) {
          state = false;
        }
        if (this.switchingBuy.payment == 1) {
          if (this.payment.banklist.length == 0) {
            state = false;
          }
        }
        if (this.switchingBuy.payment == 2) {
          if (this.payment.wxlist.length == 0) {
            state = false;
          }
        }
        if (this.switchingBuy.payment == 3) {
          if (this.payment.zfblist.length == 0) {
            state = false;
          }
        }
        return state;
      }
    }
  },
  created() {
    this.switchingBuy.actived = localStorage.getItem("bulktype") || 1;
    this.getUserInfoDetails();
    this.getPriceLimit()
    this.getKycList();
    this.getCoinInfo();
    this.getWallet();
    this.getPayment();
  },
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
    //校验密码下单
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
        // console.log(res)
        if (this.switchingBuy.actived == 1) {
        orderInfoApi
          .bulkTrading({
            tradeAmount: this.switchingBuy.tradeAmount,
            payment: this.switchingBuy.payment,
            tradeType: this.switchingBuy.actived,
            coinName: "USDT"
          })
          .then(res => {
            this.$router.push({
              path: "/buyDateils",
              query: {
                id: res.data.data
              }
            });
          })
          .catch(err => {
            if (err.data.code == "10094") {
              this.proType = true;
              this.proTypeId = err.data.data;
            } else {
              this.$toast(err.data.message);
            }
          });
      } else {
        let bindId;

        if (this.switchingBuy.payment == 1) {
          bindId = this.payment.banklist[this.bankActive].id;
        }
        if (this.switchingBuy.payment == 2) {
          bindId = this.payment.wxlist[this.bankActive].id;
        }
        if (this.switchingBuy.payment == 3) {
          bindId = this.payment.zfblist[this.bankActive].id;
        }
        orderInfoApi
          .bulkTrading({
            tradeAmount: this.switchingBuy.tradeAmount,
            payment: this.switchingBuy.payment,
            tradeType: this.switchingBuy.actived,
            bindId: bindId,
            coinName: "USDT"
          })
          .then(res => {
            this.$router.push({
              path: "/sellDateils",
              query: {
                id: res.data.data
              }
            });
          })
          .catch(err => {
            if (err.data.code == "10094") {
              this.proType = true;
              this.proTypeId = err.data.data;
            } else if (err.data.code == 10005) {
              this.$refs.rechargePop.show();
            } else {
              this.$toast(err.data.message);
            }
          });
      }
      }).catch(err => {
        this.$toast(err.data.message)
      })
    },
    // 去充值
    recharge() {
      // console.log(11111);
      this.$router.push({
        path: "/recharge"
      });
    },
    closeDiopro() {
      this.proType = false;
    },
    clOrdenIng() {
      if (this.switchingBuy.actived == 1) {
        this.$router.push({
          path: "/buyDateils",
          query: {
            id: this.proTypeId
          }
        });
      } else {
        this.$router.push({
          path: "/sellDateils",
          query: {
            id: this.proTypeId
          }
        });
      }
    },
    //去设置交易密码
    goSet(){
      this.$router.push('/personalCentre')
    },
    
    //下单验证
    bulkTrading() {
      if(this.userInfoList.tradePwdSet == 0){
        this.$refs.noSetTradePwd.show()
        return
      }
      if (this.kycInformation.kycStatus != 2) {
        // console.log(this.kycInformation)
        this.$refs.kycCertification.show();
        return;
      }
      if (this.switchingBuy.actived == 1) {
        if(this.switchingBuy.tradeAmount < this.priceLimit.minUsdtBuyAmount - 0 || this.switchingBuy.tradeAmount  > this.priceLimit.maxUsdtBuyAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtBuyAmount + ',最大交易数量是' + this.priceLimit.maxUsdtBuyAmount + '，请输入正确的数量');
          return
        }
        this.$refs.verTransaPwd.show()
      }else{
        if(this.switchingBuy.tradeAmount < this.priceLimit.minUsdtSaleAmount - 0 || this.switchingBuy.tradeAmount  > this.priceLimit.maxUsdtSaleAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtSaleAmount + ',最大交易数量是' + this.priceLimit.maxUsdtSaleAmount + '，请输入正确的数量');
          return
        }
        this.$refs.verTransaPwd.show()
      }

      

      
    },
    //获取用户详细信息
    getUserInfoDetails() {
      userInfoApi
        .getUserInfoDetails({})
        .then(res => {
          this.userInfoList = res.data.data;
          if (res.data.data.userDoBigSale - 0 == 1) {
            this.noPermissions = false;
          } else {
            this.noPermissions = true;
          }
        })
    },
    // kyc认证填写
    toKyc() {
      console.log("去填写");
      // console.log(this.kycInformation);
      if (
        this.kycInformation.kycStatus == 1 ||
        this.kycInformation.kycMiddleStatus == 1 ||
        this.kycInformation.kycUpgradeStatus == 1
      ) {
        this.$router.push({
          path: "/waitCheck"
        });
      } else {
        this.$router.push({
          path: "/through"
        });
      }
    },
    // 获取kyc信息
    getKycList() {
      orderInfoApi.getadderSell().then(res => {
        // console.log(res);
        var data = res.data.data;

        // if (data.kycStatus != 2) {
        //   this.orderDateils.isName = false
        // } else {
        //   if (res.data.data.role == 2) {
        //     this.orderDateils.isName = true
        //   } else {
        //     this.orderDateils.isName = false
        //     this.orderDateils.payerName = data.realName
        //   }
        // }
        // if (data.address == '') {
        //   this.orderDateils.isAddress = true
        // } else {
        //   this.orderDateils.isAddress = false
        //   this.orderDateils.address = data.address
        // }
        this.kycInformation = data;
        // window.localStorage.setItem('userId', data.userId)
      });
    },
    // 去绑定收款方式
    bindPay(item) {
      // console.log(item);
      // this.$router.push({
      //   path: "/web/cardInfo"
      // });
      if (this.kycInformation.kycStatus == 2) {
        if (this.switchingBuy.payment == 1) {
          if (item) {
            window.localStorage.setItem("bank", JSON.stringify(item));
          } else {
            window.localStorage.setItem("bank", "");
          }
          this.$router.push({
            path: "/cardInfo"
          });
        } else if (this.switchingBuy.payment == 2) {
          if (item) {
            window.localStorage.setItem("wx", JSON.stringify(item));
          } else {
            window.localStorage.setItem("wx", "");
          }
          this.$router.push({
            path: "/bindpayment/2"
          });
        } else {
          if (item) {
            window.localStorage.setItem("zfb", JSON.stringify(item));
          } else {
            window.localStorage.setItem("zfb", "");
          }
          this.$router.push({
            path: "/bindpayment/3"
          });
        }
      } else {
        this.$refs.kycCertification.show();
      }
    },
    // 获取收款方式详细信息
    getPayment() {
      userInfoApi
        .getPayment()
        .then(res => {
          // console.log('***********',res.data.data);
          // res = res.data.data;
          res = res.data.data[0];
          // console.log('*********',res)
          if(res){
            res.map(item => {
              // console.log('--------------',item);
              if (item.bindType == 1) {
                this.payment.banklist.push(item);
              } else if (item.bindType == 2) {
                this.payment.wxlist.push(item);
              } else {
                this.payment.zfblist.push(item);
              }
            });
          }
        })
        
    },
    // 数量与金额的双向确认
    calculation(type) {
      this.switchingBuy.totalMoney = this.switchingBuy.totalMoney.replace(
        /[^\d.]/g,
        ""
      );
      this.switchingBuy.tradeAmount = this.switchingBuy.tradeAmount.replace(
        /[^\d.]/g,
        ""
      );
      if (type == "totalMoney") {
        // 输入的是总金额

        this.switchingBuy.tradeAmount = (
          this.switchingBuy.totalMoney / this.coinInfo.coinToCny
        ).toFixed(2);
      } else {
        // 输入的是数量

        this.switchingBuy.totalMoney = (
          this.switchingBuy.tradeAmount * this.coinInfo.coinToCny
        ).toFixed(2);
      }
    },
    // 选择银行卡 支付宝 微信
    bankChoice(index) {
      this.bankActive = index;
    },
    //选择支付或收款方式
    changePayment(value) {
      this.switchingBuy.payment = value;
      this.bankActive = 0;
    },
    //查询余额
    getWallet() {
      orderInfoApi
        .getWallet({
          coinName: "USDT",
          walletType: 1
        })
        .then(res => {
          this.wallet = res.data.data;
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    // 获取币种配置信息
    getCoinInfo() {
      orderInfoApi
        .getCoinInfo({
          coinName: "USDT"
        })
        .then(res => {
          this.coinInfo = res.data.data[0];
          this.coinInfo.coinToCny = (this.coinInfo.coinToCny - 0).toFixed(2);
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    // 切换买卖
    switchBuy(value) {
      this.switchingBuy.actived = value;
      window.localStorage.setItem("bulktype", value);
      this.switchingBuy.tradeAmount = "";
      this.switchingBuy.totalMoney = "";
      this.switchingBuy.payment = 1;
    },
    //联系客服
    customerService() {
      customerService();
    }
  }
};
</script>

<style lang='less' scoped>
.bulk_trading {
  input::-webkit-input-placeholder {
    color: #DDDDE6;
  }
  .noPermissions {
    margin: 40px auto;
    width: 790px;
    height: 560px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    color: #40405e;
    text-align: center;
    img {
      width: 72px;
      height: 72px;
    }
    p {
      font-size: 18px;
      line-height: 25px;
      color: #40405e;
      padding: 24px 0 6px;
    }
    button {
      width: 343px;
      height: 48px;
      font-size: 16px;
      line-height: 48px;
      text-align: center;
      color: #ffffff;
      background: @cl-m;
      border-radius: 41px;
      margin-top: 24px;
    }
  }

  .flex {
    display: flex;
    align-items: center;
  }
  .flex_center_between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pointer {
    cursor: pointer;
  }
  .text {
    font-size: 16px;
    line-height: 24px;
    color: #4f5669;
  }

  .oneBuy {
    margin: 40px auto;
    width: 790px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 40px 145px;
    .switchingBuy {
      font-size: 20px;
      line-height: 30px;
      color: #4f5669;
      padding-bottom: 26px;
      .active {
        color: @cl-m;
      }
      div {
        margin-right: 26px;
        cursor: pointer;
      }
    }
    .input_box {
      padding: 14px;
      border: 1px solid #c8c8c8;
      box-sizing: border-box;
      border-radius: 6px;
      input {
        flex: 1;
        padding: 0 14px;
      }
    }
    .coinInfo {
      font-size: 14px;
      line-height: 20px;
      color: #9ea8b7;
      padding: 12px 0 24px;
    }
    .payType {
      .pay {
        font-size: 18px;
        line-height: 30px;
        color: #40405e;
        padding: 30px 0 15px;
      }
      .payactive {
        border: 1px solid @cl-m;
      }
      .payimg {
        width: 110px;
        height: 90px;
        box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 34px;
        .pay_img {
          width: 28px;
          height: 28px;
        }
      }
    }

    .switchPayType {
      font-size: 18px;
      line-height: 30px;
      color: #40405e;
      padding: 30px 0 15px;
    }
    .paycard {
      .addCard {
        margin-top: 17px;
        height: 52px;
        font-size: 16px;
        color: #40405e;
        border: 1px solid #f2f2f5;
        border-radius: 6px;
        display: flex;
        justify-content: flex-start;
        padding: 12px 16px;
        cursor: pointer;
        img {
          width: 28px;
          height: 28px;
          cursor: pointer;
        }

        div {
          padding-left: 12px;
        }
      }

      .getCard {
        width: 100%;
        padding: 4px;
        margin-top: 17px;
        box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
        border-radius: 6px;

        .up {
          width: 100%;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .up_left {
            display: flex;
            align-items: center;
            img {
              width: 28px;
              height: 28px;
            }

            div {
              padding-left: 12px;
              font-size: 14px;
              line-height: 28px;
              color: #40405e;
            }
          }
          .bankChoice {
            display: flex;
            align-items: center;
            cursor: pointer;
            .choiceText {
              font-size: 12px;
              padding-right: 5px;
              color: #a0a0b3;
            }
            .choiceActive {
              color: @cl-m;
            }
            .choiceImg {
              width: 16px;
              height: 16px;
            }
          }
        }

        .down {
          width: 100%;
          background: #f7f7fa;
          padding: 16px;

          .name {
            font-size: 14px;
            color: #a0a0b3;
            display: flex;
            justify-content: space-between;
          }

          .card {
            padding-top: 6px;
            font-size: 16px;
            color: #40405e;
          }
        }

        .downwx {
          width: 100%;
          background: #f7f7fa;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            .name {
              font-size: 14px;
              line-height: 20px;
              color: #a0a0b3;
            }
            .account {
              font-size: 16px;
              color: #40405e;
            }
          }
          .right {
            width: 16px;
          }
        }
      }
    }

    .buybtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 48px;
      background: #dddde6;
      border-radius: 41px;
      font-size: 18px;
      line-height: 30px;
      color: #ffffff;
      margin-top: 50px;
      img {
        width: 16px;
        margin-right: 8px;
      }
    }

    .btnState {
      background: @gd-m5;
    }
  }
}
.diopro {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  .prompt {
    width: 440px;
    background: white;
    border-radius: 4px;

    .up {
      width: 100%;
      height: 210px;
      border-bottom: 1px solid #f5f5fa;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #40405e;
      padding: 0 16px;
      img {
        width: 72px;
        height: 72px;
      }

      div {
        padding-top: 20px;
      }
    }

    .down {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        width: 50%;
        height: 72px;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #a0a0b3;
        border-right: 1px solid #f5f5fa;
        cursor: pointer;
      }

      .right {
        width: 50%;
        height: 72px;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 1200px) {
	.bulk_trading {
  .noPermissions {
    margin: 40px * 0.8 auto;
    width: 790px * 0.8;
    height: 560px * 0.8;
    box-shadow: 0px 0px 10px * 0.8 rgba(0, 0, 0, 0.1);
    border-radius: 4px * 0.8;
    font-size: 14px * 0.8;
    line-height: 20px * 0.8;
    img {
      width: 72px * 0.8;
      height: 72px * 0.8;
    }
    p {
      font-size: 18px * 0.8;
      line-height: 25px * 0.8;
      padding: 24px * 0.8 0 6px * 0.8;  
    }
    button {
      width: 343px  * 0.8;
      height: 48px  * 0.8;
      font-size: 16px * 0.8;
      line-height: 48px * 0.8;
      border-radius: 41px  * 0.8;
      margin-top: 24px * 0.8;
    }
  }

 
  .text {
    font-size: 16px * 0.8;
    line-height: 24px * 0.8;
  }

  .oneBuy {
    margin: 40px * 0.8 auto;
    width: 790px * 0.8;
    box-shadow: 0px 0px 10px * 0.8 rgba(0, 0, 0, 0.1);
    border-radius: 4px * 0.8;
    padding: 40px * 0.8 145px * 0.8;
    .switchingBuy {
      font-size: 20px * 0.8;
      line-height: 30px * 0.8;
      padding-bottom: 26px * 0.8;
      div {
        margin-right: 26px * 0.8;
      }
    }
    .input_box {
      padding: 14px * 0.8;
      border-radius: 6px * 0.8;
      input {
        padding: 0 14px * 0.8;
      }
    }
    .coinInfo {
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
      padding: 12px * 0.8 0 24px * 0.8;
    }
    .payType {
      .pay {
        font-size: 18px * 0.8;
        line-height: 30px * 0.8;
        padding: 30px * 0.8 0 15px * 0.8;
      }
      .payimg {
        width: 110px * 0.8;
        height: 90px * 0.8;
        box-shadow: 0px 4px 24px * 0.8 rgba(64, 64, 94, 0.08);
        border-radius: 6px * 0.8;
        margin-right: 34px * 0.8;
        .pay_img {
          width: 28px * 0.8;
          height: 28px * 0.8;
        }
      }
    }

    .switchPayType {
      font-size: 18px * 0.8;
      line-height: 30px * 0.8;
      padding: 30px * 0.8 0 15px * 0.8;
    }
    .paycard {
      .addCard {
        margin-top: 17px * 0.8;
        height: 52px * 0.8;
        font-size: 16px * 0.8;
        padding: 12px * 0.8 16px * 0.8;
        img {
          width: 28px * 0.8;
          height: 28px * 0.8;
        }

        div {
          padding-left: 12px * 0.8;
        }
      }

      .getCard {
        margin-top: 17px * 0.8;
        box-shadow: 0px 4px 24px * 0.8 rgba(64, 64, 94, 0.08);
        border-radius: 6px * 0.8;

        .up {
          padding: 16px * 0.8;
          .up_left {
            img {
              width: 28px * 0.8;
              height: 28px * 0.8;
            }

            div {
              padding-left: 12px * 0.8;
              font-size: 14px * 0.8;
              line-height: 28px * 0.8;
            }
          }
          .bankChoice {
            .choiceText {
              font-size: 12px * 0.8;
              padding-right: 5px * 0.8;
            }
            .choiceImg {
              width: 16px * 0.8;
              height: 16px * 0.8;
            }
          }
        }

        .down {
          padding: 16px * 0.8;

          .name {
            font-size: 14px * 0.8;
          }

          .card {
            padding-top: 6px * 0.8;
            font-size: 16px * 0.8;
          }
        }

        .downwx {
          padding: 16px * 0.8;
          .left {
            .name {
              font-size: 14px * 0.8;
              line-height: 20px * 0.8;
            }
            .account {
              font-size: 16px * 0.8;
            }
          }
          .right {
            width: 16px * 0.8;
          }
        }
      }
    }

    .buybtn {
      height: 48px * 0.8;
      border-radius: 41px * 0.8;
      font-size: 18px * 0.8;
      line-height: 30px * 0.8;
      margin-top: 50px * 0.8;
      img {
        width: 16px * 0.8;
        margin-right: 8px * 0.8;
      }
    }
  }
}
.diopro {

  .prompt {
    width: 440px * 0.8;

    .up {
      height: 210px * 0.8;
      font-size: 14px * 0.8;
      padding: 0 16px * 0.8;
      img {
        width: 72px * 0.8;
        height: 72px * 0.8;
      }

      div {
        padding-top: 20px * 0.8;
      }
    }

    .down {

      .left {
        height: 72px * 0.8;
        font-size: 16px * 0.8;
        line-height: 19px  * 0.8;
      }

      .right {
        height: 72px * 0.8;
        font-size: 16px  * 0.8;
        line-height: 19px * 0.8;
      }
    }
  }
}
}
</style>