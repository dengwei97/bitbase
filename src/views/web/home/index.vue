<template>
  <div class="home">
     <Trheader :Onactive='Onactive'></Trheader>
    <div v-if="Object.keys(coinInfo).length != 0" class="content">
      <div class="content_1">
        <div class="sellbuy">
          <div class="sellbuycoin">
            <div class="sellorbuy">
              <div
                class="sellcoin"
                :class="{'sellbuychange':type=='sell'}"
                @click="sellbuy('sell')"
              >OTC卖币</div>
              <div
                class="buycoin"
                :class="{'sellbuychange':type=='buy'}"
                @click="sellbuy('buy')"
              >OTC买币</div>
            </div>
            
          </div>
          <div class="priceUid">
              <div >参考价格：{{coinInfo.coinToCny}}CNY/USDT</div>
              <!-- <div class="uid">
                <span>用户UID：</span>
                <span class="proposedPrice">{{kycInformation.userId}}</span>
              </div> -->
            </div>
          <!-- 买币 -->
          <div v-show="type=='buy' " class="buyotc">

            <div>
              <div class="userInfoInput">
                <span>购买</span>
                <input
                  v-model="orderDateils.totalMoney"
                  type="text"
                  class="text"
                  :placeholder=" '单笔购买数量' + priceLimit.minUsdtBuyAmount +'~'+ priceLimit.maxUsdtBuyAmount +'USDT'"
                  @input="calculation('totalMoney')"
                />
                <!-- <input
                  v-model="orderDateils.totalMoney"
                  type="text"
                  class="text"
                  :placeholder=" '单笔购买数量' + coinInfo.fastTradeLowLimit +'~'+ coinInfo.fastTradeHighLimit +'USDT'"
                  @input="calculation('totalMoney')"
                /> -->
                <span>CNY</span>
              </div>
              <!-- <div class="userInfoInput" v-if="this.orderDateils.isMoney == 2">
                <span>购买</span>
                <input
                  type="text"
                  class="text"
                  v-model="orderDateils.tradeAmount"
                  @input="calculation('tradeAmount')"
                />
                <span>USDT</span>
              </div> -->

              <div class="changeus">
                <span>获得≈</span>
                <input
                  v-model="orderDateils.tradeAmount"
                  type="text"
                  class="text flex_1"
                  @input="calculation('tradeAmount')"
                />
                <span>USDT</span>
              </div>
              <!-- <div class="changeus" v-if="this.orderDateils.isMoney == 2">
                <span>支付≈</span>
                <input
                  type="text "
                  class="text flex_1"
                  :placeholder=" '单笔购买数量' + coinInfo.fastTradeLowLimit +'~'+ coinInfo.fastTradeHighLimit +'USDT'"
                  v-model="orderDateils.totalMoney"
                  @input="calculation('totalMoney')"
                />
                <span>CNY</span>
              </div> -->
            </div>
            <!-- <div class="priceName">付款卡户名</div>
            <input
              class="inputName"
              type="text"
              placeholder="请输入付款卡户名"
              v-model="orderDateils.payerName"
            /> -->
            <div class="pay">付款方式</div>
            <div class="payimg">
              <div
                class="payimg_1"
                :class="{'pay_img_border':orderDateils.payment == 1}"
                @click="changePayment(1)"
              >
                <img class="pay_img" src="@/assets/transactions/ico_cardpay.png" />
                <div class="payimg_1_text">银行卡</div>
              </div>
              <div
                class="payimg_1 mar"
                :class="{'pay_img_border':orderDateils.payment == 3}"
                @click="changePayment(3)"
              >
                <img class="pay_img" src="@/assets/transactions/ico_alipay.png" />
                <div class="payimg_1_text">支付宝</div>
              </div>
              <div
                class="payimg_1 mar"
                :class="{'pay_img_border':orderDateils.payment == 2}"
                @click="changePayment(2)"
              >
                <img class="pay_img" src="@/assets/transactions/ico_weixinpay.png" />
                <div class="payimg_1_text">微信支付</div>
              </div>
            </div>

            <h3 class="userInfo">输入付款账户信息</h3>
            <h3 class="usdtAddress">请确认您的USDT接收地址为下方所示：</h3>
            <p v-if="!orderDateils.isAddress" class="usdtDetails">{{ kycInformation.address }}</p>
            <div v-if="orderDateils.isAddress" class="inputUsdt">
              <input v-model="orderDateils.address" type="text" placeholder="输入您的USDT的接收地址" />
            </div>

            <h3 class="userName">付款账户真实姓名</h3>
            <p v-if="!orderDateils.isName" class="userNameReal">{{ kycInformation.realName }}</p>
            <div v-if="orderDateils.isName" class="inputUsdt">
              <input v-model="orderDateils.payerName" type="text" placeholder="输入您付款账户的真实姓名 " />
            </div>
            <div class="parmy">
              <img src="@/assets/transactions/ic_addlak_buy.png" />
              <span>请确认您的USDT接收地址，确认无误后再下单</span>
            </div>
            <button class="btn" :class="{'btnState':getStateSell}" @click="opendio()">提交</button>
            <div class="adver">购买完成后，数字货币将汇入您网站的钱包中</div>
          </div>
          <!-- 卖币 -->
          <div v-show="type=='sell' " class="sellotc">
            <div class="userInfoInput">
              <span>出售</span>
              <input
                v-model="orderDateils.tradeAmount"
                type="text"
                class="text"
                :placeholder=" '单笔出售数量' + priceLimit.minUsdtSaleAmount +'~'+ priceLimit.maxUsdtSaleAmount +'USDT'"
                @input="calculation('tradeAmount')"
              />
              <!-- <input
                v-model="orderDateils.tradeAmount"
                type="text"
                class="text"
                :placeholder=" '单笔出售数量' + coinInfo.fastTradeLowLimit +'~'+ coinInfo.fastTradeHighLimit +'USDT'"
                @input="calculation('tradeAmount')"
              /> -->
              <span>USDT</span>
            </div>
            <div class="changeus">
              <span>获得≈</span>
              <input
                v-model="orderDateils.totalMoney"
                type="text"
                class="text flex_1"
                @input="calculation('totalMoney')"
              />
              <span>CNY</span>
            </div>
            <div class="balance_box flex flex_middle flex_justify">
              <div class="num">账户余额: {{ wallet }} USDT</div>
              <div class="cz_txt pointer" style=" cursor: pointer;" @click="recharge">去充币</div>
            </div>
            <div class="paymentMethod">收款方式</div>

            <!-- 已有银行卡 -->
            <div
              v-for="(item,index) of payment"
              :key="index"
              class="getCard"
              @click="bindPay(item)"
            >
              <div class="up">
                <div class="up_left">
                  <img src="@/assets/transactions/ico_bankpay.png" />
                  <div>{{ item.paymentCode }}</div>
                </div>
                <div class="bankChoice" @click.stop="bankChoice(item,index)">
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
            <div class="btn">
              <button
                class="registered"
                :class="{'btnState': getState}"
                :disabled="!getState"
                @click="order"
              >立即交易</button>
              <button class="service" @click="customer">有疑问？联系客服</button>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="order_header">
            <div class="header_l">我的近期订单</div>
            <router-link :to="{path: '/orderList'}" class="checkOrder">
              <span>查看所有订单></span>
            </router-link>
          </div>
          <homeOrder v-for="item in orderList" :key="item.id" :item="item" />
          <div v-if="orderList.length > 0" class="dx_box">我是有底线的～</div>
          <homeNoOrder v-if="orderList.length <= 0" />
        </div>
      </div>
    </div>
    <!-- 购买确认 -->
    <div v-if="dioType" class="dio">
      <div class="text">
        <div class="buyUsdt">
          <div>购买USDT</div>
          <img src="@/assets/transactions/ico_web_close.png" @click="close()" />
        </div>
        <div class="content">
          <div class="price">
            <div>单价</div>
            <div>{{ coinInfo.coinToCny }} CNY</div>
          </div>
          <div class="number">
            <div>交易数量</div>
            <div>{{ orderDateils.tradeAmount }} USDT</div>
          </div>
          <div class="payment">
            <div class="pay">实付款</div>
            <div class="price_1">
              <div class="cny">¥{{ orderDateils.totalMoney }}</div>
              <div class="prompt">转账金额必须保持一致，包含小数位</div>
            </div>
          </div>
          <div class="address">您购买的{{ orderDateils.tradeAmount }} USDT将直接转入网站存款地址：{{ orderDateils.address }}</div>
          <div class="btn">
            <button class="left" @click="close()">取消</button>
            <button class="right" @click="order">确认购买</button>
          </div>
        </div>
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
    <rechargePop ref="rechargePop" @recharge="recharge" />
    <kycCertification ref="kycCertification" @toKyc="toKyc" />
    <noSetTradePwd ref='noSetTradePwd' @goSet='goSet'></noSetTradePwd>
    <verTransaPwd ref='verTransaPwd' @varTransaSu='varTransaSu'></verTransaPwd>
  </div>
</template>

<script>

import verTransaPwd from '@/components/verTransaPwd' //验证交易密码
import noSetTradePwd from '@/components/noSetTradePwd'//没有设置交易密码
import Trheader from '@/components/transactionHeader'
import userInfoApi from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
import { customerService } from "@/utils";
import homeOrder from "./components/homeOrder"; // 订单展示
import homeNoOrder from "./components/homeNoOrder"; // 没有订单展示
import rechargePop from "./components/rechargePop"; // 充币
// kyc验证弹框
import kycCertification from './components/kycCertification'
export default {
  name: "Home",
  components: {
    homeOrder,
    homeNoOrder,
    rechargePop,
    kycCertification,
     Trheader,
     noSetTradePwd,
     verTransaPwd
  },
  data() {
    return {
      priceLimit:{}, //买卖区间
      kycInformation: [], // kyc信息
      Onactive:2, //交易头部当前交易类型
      type: "buy", // 买币卖币切换
      userInfo: {},
      payment: [], // 银行卡信息
      bankActive: 0, // 默认选择的银行卡
      coinInfo: {}, // 币种信息
      orderDateils: {
        isAddress: false, // 是否可以输入地址
        isName: false, // 是否可以输入名字
        // 订单信息
        totalMoney: "", // 总金额
        tradeAmount: "", // 交易数量，与totalMoney最少传一个；如果两个值都传参，已totalMoney为准
        coinName: "USDT",
        tradeType: 1, // 1-买 2-卖
        payment: 1,
        payerName: "", // 支付用户户
        address: "", // USDT接受地址
        isMoney: 1 // 1、数量购买， 2、金额购买
      },
      dioType: false, // 交易弹框
      // adderSell: "", // 买入地址
      proType: false, // 订单未处理弹框
      proTypeId: "",
      cardType: 1, // 银行卡绑定状态
      orderList: [], // 订单列表
      tableDate: {
        orderType: 3,
        size: 3,
        current: 1,
        tradeType: ""
      },
      wallet: 0 ,// 余额
    };
  },
  computed: {
    getState: function() {
      let state = true;
      if (!this.orderDateils.tradeAmount) {
        state = false;
      }
      if (!this.orderDateils.totalMoney) {
        state = false;
      }
      if (this.payment.length == 0) {
        state = false;
      }
      return state;
    },
    getStateSell: function() {
      let state = true;
      if (!this.orderDateils.tradeAmount) {
        state = false;
      }
      if (!this.orderDateils.totalMoney) {
        state = false;
      }
      if (this.orderDateils.isName) {
        if (!this.orderDateils.payerName) {
          state = false;
        }
      }
      if (this.orderDateils.isAddress) {
        if (!this.orderDateils.address) {
          state = false;
        }
      }
      return state;
    }
  },
  created() {
    // this.type = this.$store.state.user.type || "sell";
    this.type = window.localStorage.getItem("type");
    // console.log(this.type);
    this.getKycList();
    this.getPriceLimit()
    this.changeOrderDateils();
    this.getUserInfo();
    this.getPayment();
    this.getCoinInfo();
    // this.getTable();
    this.getWallet();
  },
  methods: {

    //获取订单区间
    getPriceLimit(){
      orderInfoApi.getPriceLimit({
          bigSale:2
        }).then(res => {
          this.priceLimit = res.data.data
          console.log('---------====================-----',res.data.data)
        })
    },
    // 获取kyc信息
    getKycList() {
      orderInfoApi.getadderSell().then(res => {
        // console.log(res)
        var data = res.data.data

        if (data.kycStatus != 2) {
          this.orderDateils.isName = false
        } else {
          if (res.data.data.role == 2) {
            this.orderDateils.isName = true
          } else {
            this.orderDateils.isName = false
            this.orderDateils.payerName = data.realName
          }
        }
        if (data.address == '') {
          this.orderDateils.isAddress = true
        } else {
          this.orderDateils.isAddress = false
          this.orderDateils.address = data.address
        }
        this.kycInformation = data
        window.localStorage.setItem('userId', data.userId)
      });
    },
    // kyc认证填写
    toKyc() {
      // console.log('去填写')
      // console.log(this.kycInformation)
      if (this.kycInformation.kycStatus == 1 || this.kycInformation.kycMiddleStatus == 1 || this.kycInformation.kycUpgradeStatus == 1) {
        this.$router.push({
          path: '/waitCheck',
        })
      } else {
        this.$router.push({
          path: '/through',
        })
      }
    },
    // 选择银行卡
    bankChoice(item, index) {
      // console.log("选择的银行卡", item);

      this.bankActive = index;
    },
    // 请求列表数据
    getTable() {
      this.tableDate.tradeType = this.type == "buy" ? 1 : 2;
      orderInfoApi.orderList(this.tableDate).then(res => {
        this.orderList = res.data.data.records;
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
    // 获取银行卡信息
    getPayment() {
      userInfoApi
        .getPayment({
          bindType: 1
        })
        .then(res => {
          // console.log(res.data.data)
          // this.payment = res.data.data;
          let data = res.data.data
          // console.log('*********',res)
          if(data.length > 0){
            this.payment = data[0]
          }
          
          
        })
        
    },
    // 去绑定银行卡
    bindPay(item) {
      // console.log(item);
      // this.$router.push({
      //   path: "/web/cardInfo"
      // });
      if (this.kycInformation.kycStatus == 2) {
        if (item) {
          window.localStorage.setItem("bank", JSON.stringify(item));
        } else {
          window.localStorage.setItem("bank", "");
        }
        this.$router.push({
          path: "/cardInfo"
        });
      } else {
        this.$refs.kycCertification.show();
      }
    },
    // 买币卖币切换
    sellbuy(state) {
      if (state == this.type) {
        return;
      }
      this.type = state;
      this.orderDateils.totalMoney = ''
      this.orderDateils.tradeAmount = ''
      // this.$store.state.user.type = state;
      window.localStorage.setItem('type', state);
      this.changeOrderDateils();
    },
    // 联系客服
    customer() {
      customerService();
    },
    // 根据买卖切换请求的数据
    changeOrderDateils() {
      if (this.type == "sell") {
        this.orderDateils.tradeType = 2;
      } else {
        this.orderDateils.tradeType = 1;
        
      }
      this.orderDateils.payment = 1;
      this.getTable();
    },
    // 数量与金额的双向确认
    calculation(type) {
      this.orderDateils.totalMoney = this.orderDateils.totalMoney.replace(
        /[^\d.]/g,
        ""
      );
      this.orderDateils.tradeAmount = this.orderDateils.tradeAmount.replace(
        /[^\d.]/g,
        ""
      );
      if (type == "totalMoney") {
        // 输入的是总金额

        this.orderDateils.tradeAmount = (
          this.orderDateils.totalMoney / this.coinInfo.coinToCny
        ).toFixed(2);
      } else {
        // 输入的是数量

        this.orderDateils.totalMoney = (
          this.orderDateils.tradeAmount * this.coinInfo.coinToCny
        ).toFixed(2);
      }
    },
    //去设置交易密码
    goSet(){
      this.$router.push('/personalCentre')
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
        console.log(res)
        this.$refs.verTransaPwd.hide()
        if(this.type == 'sell'){
          orderInfoApi
            .orderFast({
              tradeAmount: this.orderDateils.tradeAmount,
              payment: 1,
              // payerName: this.orderDateils.payerName,
              tradeType: this.orderDateils.tradeType,
              bindId: this.payment[this.bankActive].id
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
                this.dioType = false;
                this.proType = true;
                this.proTypeId = err.data.data;
              } else if (err.data.code == 10005) {
                this.$refs.rechargePop.show();
              } else if (err.data.code == 10183 || err.data.code == 10184) {
                // this.dioType = false
                this.$refs.kycCertification.show();
              } else {
                this.$toast(err.data.message);
              }
            });
        }else{
          this.dioType = true;
        }
      }).catch(err => {
        this.$toast(err.data.message)
      })
    },
    // 下单
    order() {
      
      if (this.type == "sell") {
        if(this.userInfo.tradePwdSet == 0){
          this.$refs.noSetTradePwd.show()
          return
        }
        if (this.kycInformation.kycStatus != 2) {
          // console.log(this.kycInformation)
          this.$refs.kycCertification.show()
          return
        }
        if(this.orderDateils.tradeAmount < this.priceLimit.minUsdtSaleAmount - 0 || this.orderDateils.tradeAmount  > this.priceLimit.maxUsdtSaleAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtSaleAmount + ',最大交易数量是' + this.priceLimit.maxUsdtSaleAmount + '，请输入正确的数量');
          return
        }
        this.$refs.verTransaPwd.show()
          // orderInfoApi
          //   .orderFast({
          //     tradeAmount: this.orderDateils.tradeAmount,
          //     payment: 1,
          //     // payerName: this.orderDateils.payerName,
          //     tradeType: this.orderDateils.tradeType,
          //     bindId: this.payment[this.bankActive].id
          //   })
          //   .then(res => {
          //     this.$router.push({
          //       path: "/sellDateils",
          //       query: {
          //         id: res.data.data
          //       }
          //     });
          //   })
          //   .catch(err => {
          //     if (err.data.code == "10094") {
          //       this.dioType = false;
          //       this.proType = true;
          //       this.proTypeId = err.data.data;
          //     } else if (err.data.code == 10005) {
          //       this.$refs.rechargePop.show();
          //     } else if (err.data.code == 10183 || err.data.code == 10184) {
          //       // this.dioType = false
          //       this.$refs.kycCertification.show();
          //     } else {
          //       this.$toast(err.data.message);
          //     }
          //   });
      } else {
        // if (this.kycInformation.kycStatus != 2) {
        //   // console.log(this.kycInformation)
        //   this.$refs.kycCertification.show()
        //   return
        // }
        
        orderInfoApi
          .orderFast({
            // totalMoney:
            //   this.orderDateils.isMoney == 1
            //     ? this.orderDateils.totalMoney
            //     : "",
            // tradeAmount:
            //   this.orderDateils.isMoney == 1
            //     ? ""
            //     : this.orderDateils.tradeAmount,
            tradeAmount:this.orderDateils.tradeAmount,
            payment: this.orderDateils.payment,
            payerName: this.orderDateils.payerName,
            tradeType: this.orderDateils.tradeType,
            address: this.orderDateils.address
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
              this.dioType = false;
              this.proType = true;
              this.proTypeId = err.data.data;
            } else if (err.data.code == 10183 || err.data.code == 10184) {
              // this.dioType = false
              this.$refs.kycCertification.show();
            } else {
              this.$toast(err.data.message);
            }
          });
      }
    },
    // 选择支付方式
    changePayment(payment) {
      this.orderDateils.payment = payment;
    },
    // // 选择是金额购买还是数量购买
    // changeIsMoney() {
    //   this.orderDateils.isMoney = this.orderDateils.isMoney == 1 ? 2 : 1;
    // },
    // 打开弹窗
    opendio() {
      if(this.userInfo.tradePwdSet == 0){
        this.$refs.noSetTradePwd.show()
        return
      }
      if (!this.getStateSell) {
        return;
      }
      if (this.kycInformation.kycStatus != 2) {
        // console.log(this.kycInformation)
        this.$refs.kycCertification.show()
        return
      }
      if(this.orderDateils.tradeAmount < this.priceLimit.minUsdtBuyAmount - 0 || this.orderDateils.tradeAmount  > this.priceLimit.maxUsdtBuyAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtBuyAmount + ',最大交易数量是' + this.priceLimit.maxUsdtBuyAmount + '，请输入正确的数量');
          return
        }
      this.$refs.verTransaPwd.show()

        //   this.dioType = true;
      // if (this.adderSell) {
      // } else {
      //   orderInfoApi.getadderSell().then(res => {
      //     this.adderSell = res.data.data.address;
      //     this.dioType = true;
      //   });
      // }
    },
    // 关闭弹窗
    close() {
      this.dioType = false;
    },
    closeDiopro() {
      this.proType = false;
    },
    clOrdenIng() {
      if (this.type == "buy") {
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
    // 去充值
    recharge() {
      // console.log(11111);
      this.$router.push({
        path: "/recharge"
      });
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .content {
    display: flex;
    justify-content: center;
    padding: 40px 0px 80px 0px;

    .content_1 {
      width: 790px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      flex-direction: row;

      .sellbuy {
        width: 790px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        flex-wrap: warp;
        padding: 0px 0px 66px 32px;

        .sellbuycoin {
          width: 480px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 33px 0 23px;
          .sellorbuy {
            display: flex;

            .sellcoin {
              padding-right: 32px;
              font-size: 16px;
              cursor: pointer;
            }

            .buycoin {
              font-size: 16px;
              cursor: pointer;
            }
          }
          .helps {
            display: flex;
            align-items: center;
            .help_img {
              width: 18px;
              height: 18px;
            }
            .helptext {
              padding-left: 4px;
              font-size: 14px;
              line-height: 20px;

              color: #40405e;
            }
          }
        }
        .priceUid{
          width:480px;
          display:flex;
          justify-content: space-between;
          color: rgba(21, 46, 83, 0.4);
          font-size:14px;
          .uid{
            display:flex;
            align-items: center;
          }
          .proposedPrice{
            color: #F2A145;
          }

        }
        .buyotc {
          .userInfo {
            width: 480px;
            display: flex;
            justify-content: space-between;

            .userInfo_left {
              font-size: 14px;
              color: rgba(21, 46, 83, 0.4);

              .username {
                color: #f2a145;
              }
            }

            .userInfo_right {
              font-size: 14px;
              color: @cl-m;
              cursor: pointer;

              img {
                width: 12px;
              }
            }
          }

          .userInfoInput {
            width: 481px;
            height: 52px;
            margin-top: 16px;
            border: 1px solid #c8c8c8;
            color: #4f5669;
            font-size: 16px;
            border-radius: 4px;
            display: flex;
            padding: 0px 12px;
            line-height: 52px;

            .text {
              padding-left: 5px;
              flex: 1;
            }
          }


          .changeus {
            width: 481px;
            height: 52px;
            border: 1px solid #c8c8c8;
            color: #4f5669;
            font-size: 16px;
            border-radius: 4px;
            display: flex;
            line-height: 52px;
            padding: 0px 12px;
            margin-top:16px;
            .changeus_text {
              padding-left: 5px;
              flex: 1;
            }
          }

          .priceName {
            font-size: 18px;
            color: #40405e;
            padding: 23px 0px 14px 0px;
          }

          .inputName {
            width: 481px;
            height: 52px;
            border: 1px solid #c8c8c8;
            font-size: 14px;
            border-radius: 4px;
            padding: 12px;
          }

          .pay {
            font-size: 18px;
            color: #40405e;
            padding: 23px 0px 14px 0px;
          }

          .payimg {
            display: flex;
            justify-content: start;

            .payimg_1 {
              width: 110px;
              height: 90px;
              box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
              border-radius: 6px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              .payimg_1_text {
                font-size: 16px;
                color: #40405e;
                padding-top: 5px;
              }

              .pay_img {
                width: 28px;
              }
            }

            .mar {
              margin-left: 34px;
            }

            .pay_img_border {
              border: 1px solid @cl-m;
            }
          }

          .userInfo{
            margin: 24px 0 14px;
            font-size: 18px;
            color: #000000;
          }

          .usdtDetails{
            font-size: 15px;
            line-height: 21px;
            color: #0CB397;
            width: 481px;
          }

          .usdtAddress{
            font-size: 16px;
            color: #40405E;
            margin-bottom: 8px;
          }

          .userName{
            font-size: 16px;
            color: #40405E;
            margin: 14px 0 8px;
          }

          .userNameReal{
            width: 481px;
            height: 52px;
            border: 1px solid #F4F4F4;
            border-radius: 6px;
            font-size: 14px;
            line-height:52px;
            padding-left:14px;
          }

          .inputUsdt{
            width: 481px;
            height: 52px;
            background: #F7F7FA;
            border-radius: 6px;
            padding:16px 14px;
            input{
              width:100%;
              height:100%;
              font-size: 14px;
              background: #F7F7FA;
            }
          }

          .inputUsdt{
            width: 481px;
            height: 52px;
            background: #F7F7FA;
            border-radius: 6px;
            padding:16px 14px;
            input{
              width:100%;
              height:100%;
              font-size: 14px;
              background: #F7F7FA;
            }
          }

          .parmy{
            margin-top:10px;
            font-size: 12px;
            color: #F2A145;
            display: flex;
            align-items: center;
            img{
              width:16px;
              height:16px;
            }
            span{
              padding-left:8px;
            }
          }

          .btn {
            width: 481px;
            height: 48px;
            margin-top: 30px;
            background: #dddde6;
            border-radius: 41px;
            font-size: 16px;
            color: #ffffff;
            cursor: pointer;
          }

          .adver {
            width: 481px;
            text-align: center;
            color: rgba(21, 46, 83, 0.4);
            font-size: 14px;
            padding-top: 12px;
          }
        }

        .sellotc {
          .userInfoInput {
            width: 481px;
            height: 52px;
            margin-top: 16px;
            border: 1px solid #c8c8c8;
            color: #4f5669;
            font-size: 16px;
            border-radius: 4px;
            display: flex;
            line-height: 52px;
            padding: 0px 12px;
            .text {
              padding-left: 5px;
              flex: 1;
            }
          }


          .paymentMethod {
            font-size: 18px;
            color: #000000;
            padding: 31px 0px 14px 0px;
          }

          .changeus {
            width: 481px;
            height: 52px;
            border: 1px solid #c8c8c8;
            color: #4f5669;
            font-size: 16px;
            border-radius: 4px;
            display: flex;
            line-height: 52px;
            padding: 0px 12px;
            margin-top:16px;
            .changeus_text {
              padding-left: 5px;
              flex: 1;
            }
          }

          .addCard {
            margin-top: 17px;
            width: 481px;
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
            width: 481px;
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
          }

          .btn {
            padding-top: 40px;
            width: 481px;
            display: flex;
            justify-content: space-between;

            .registered {
              width: 226px;
              height: 48px;
              background: #dddde6;
              border-radius: 41px;
              font-size: 16px;
              color: #ffffff;
              text-align: center;
              line-height: 48px;
              cursor: pointer;
            }

            .service {
              border: 1px solid @cl-m;
              border-radius: 41px;
              width: 226px;
              height: 48px;
              font-size: 16px;
              color: @cl-m;
              text-align: center;
              line-height: 48px;
              cursor: pointer;
            }
          }
        }

        .sellbuychange {
          font-size: 18px;
          font-weight: bold;
          color: @cl-m;
        }
      }

      .order {
        margin-top: 12px;
        width: 788px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        .order_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 45px 30px 37px 30px;
          .header_l {
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;

            color: #40405e;
          }
          .checkOrder {
            display: block;
            font-size: 14px;
            color: #a0a0b3;

            text-align: right;

            span {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .dio {
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

    .text {
      width: 440px;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .buyUsdt {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #14171a;
        padding: 24px 24px 11px;
        border-bottom: 1px solid #f5f5fa;

        img {
          width: 14px;
          height: 14px;
          cursor: pointer;
        }
      }

      .content {
        padding: 24px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .price {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 14px;
          color: #40405e;
          padding-bottom: 18px;
          border-bottom: 1px solid #f5f5fa;
        }

        .number {
          padding-top: 18px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 14px;
          color: #40405e;
          padding-bottom: 18px;
          border-bottom: 1px solid #f5f5fa;
        }

        .payment {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0px 16px 0px;
          border-bottom: 1px solid #f5f5fa;

          .pay {
            font-size: 14px;
            color: #40405e;
          }

          .price_1 {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .cny {
              font-size: 24px;
              font-weight: bold;
              color: @cl-m;
            }

            .prompt {
              font-size: 12px;
              color: #f2a145;
            }
          }
        }

        .address {
          width: 100%;
          padding: 20px 13px;
          background: #f7f7fa;
          border-radius: 4px;
          font-size: 12px;
          line-height: 20px;
          color: #f2a145;
          word-break: break-all; //英文换行依据字母
        }

        .btn {
          width: 100%;
          padding-top: 34px;
          display: flex;
          justify-content: space-between;

          .left {
            width: 180px;
            height: 48px;
            background: #f5f5fa;
            font-size: 14px;
            color: #40405e;
            border-radius: 24px;
            cursor: pointer;
          }

          .right {
            width: 180px;
            height: 48px;
            background: @cl-m;
            font-size: 14px;
            color: #ffffff;
            border-radius: 24px;
            cursor: pointer;
          }
        }
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
        padding:0 16px;
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
  .balance_box {
    width: 480px;
    padding: 20px 10px 0;
    .num {
      font-size: 14px;
      line-height: 20px;
      color: #a0a0b3;
    }
    .cz_txt {
      font-size: 14px;
      line-height: 20px;
      color: @cl-m;
    }
  }
}

input::placeholder {
  color: rgba(21, 46, 83, 0.4);
}

.btnState {
  background: @gd-m5;
}

.dx_box {
  text-align: center;
  padding: 40px 0 80px;
  font-size: 14px;
  line-height: 16px;
  color: #c8c8c8;
}

@media (max-width: 1200px) {
  .home {
    .content {
      padding: 40px * 0.8 0px 80px * 0.8 0px;

      .content_1 {
        width: 790px * 0.8;

        .sellbuy {
          width: 790px * 0.8;
          border-radius: 4px * 0.8;
          padding: 0px 0px 66px * 0.8 32px * 0.8;

          .sellbuycoin {
            width: 480px * 0.8;
            padding: 33px * 0.8 0 23px * 0.8;
            .sellorbuy {
              .sellcoin {
                padding-right: 32px * 0.8;
                font-size: 16px * 0.8;
              }

              .buycoin {
                font-size: 16px * 0.8;
              }
            }
            .helps {
              .help_img {
                width: 18px * 0.8;
                height: 18px * 0.8;
              }
              .helptext {
                font-size: 14px * 0.8;
                line-height: 20px * 0.8;
              }
            }
          }
          .priceUid{
          width:480px * 0.8;
          font-size:14px * 0.8;

        }
          .buyotc {
            .userInfo {
              width: 480px * 0.8;

              .userInfo_left {
                font-size: 14px * 0.8;
              }

              .userInfo_right {
                font-size: 14px * 0.8;

                img {
                  width: 12px * 0.8;
                }
              }
            }

            .userInfoInput {
              width: 481px * 0.8;
              height: 52px * 0.8;
              margin-top: 16px * 0.8;
              font-size: 16px * 0.8;
              border-radius: 4px * 0.8;
              line-height: 52px * 0.8;
              padding: 0px 12px * 0.8;
            }


            .changeus {
              width: 481px * 0.8;
              height: 52px * 0.8;
              border: 1px solid #c8c8c8;
              color: #4f5669;
              font-size: 16px * 0.8;
              border-radius: 4px * 0.8;
              line-height: 52px * 0.8;
              padding: 0px 12px * 0.8;
            }

            .priceName {
              font-size: 18px * 0.8;
              padding: 23px * 0.8 0px 14px * 0.8 0px;
            }

            .inputName {
              width: 481px * 0.8;
              height: 52px * 0.8;
              font-size: 14px * 0.8;
              border-radius: 4px * 0.8;
              padding: 12px * 0.8;
            }

            .pay {
              font-size: 18px;
              padding: 23px * 0.8 0px 14px * 0.8 0px;
            }

            .payimg {
              .payimg_1 {
                width: 110px * 0.8;
                height: 90px * 0.8;
                border-radius: 6px;

                .payimg_1_text {
                  font-size: 16px * 0.8;
                  padding-top: 5px * 0.8;
                }

                .pay_img {
                  width: 28px * 0.8;
                }
              }
            }
             .userInfo{
            margin: 24px * 0.8 0 14px * 0.8;
            font-size: 18px * 0.8;
          }

          .usdtDetails{
            font-size: 15px * 0.8;
            line-height: 21px * 0.8;
            width: 481px * 0.8;
          }

          .usdtAddress{
            font-size: 16px * 0.8;
            margin-bottom: 8px * 0.8;
          }

          .userName{
            font-size: 16px * 0.8;
            margin: 14px * 0.8 0 8px * 0.8;
          }

          .userNameReal{
            width: 481px * 0.8;
            height: 52px * 0.8;
            border-radius: 6px * 0.8;
            font-size: 14px * 0.8;
            line-height:52px * 0.8;
            padding-left:14px * 0.8;
          }

          .inputUsdt{
            width: 481px  * 0.8;
            height: 52px * 0.8;
            border-radius: 6px * 0.8;
            padding:16px * 0.8 14px * 0.8;
            input{
              font-size: 14px * 0.8;
            }
          }

          .inputUsdt{
            width: 481px * 0.8;
            height: 52px * 0.8;
            border-radius: 6px * 0.8;
            padding:16px * 0.8 14px * 0.8;
            input{
              font-size: 14px * 0.8;
            }
          }

          .parmy{
            margin-top:10px * 0.8;
            font-size: 12px * 0.8;
            img{
              width:16px * 0.8;
              height:16px * 0.8;
            }
            span{
              padding-left:8px * 0.8;
            }
          }

            .btn {
              width: 481px * 0.8;
              height: 48px * 0.8;
              margin-top: 30px * 0.8;
              border-radius: 41px * 0.8;
              font-size: 16px * 0.8;
            }

            .adver {
              width: 481px * 0.8;
              text-align: center;
              font-size: 14px * 0.8;
              padding-top: 12px * 0.8;
            }
          }

          .sellotc {
            .userInfoInput {
              width: 481px * 0.8;
              height: 52px * 0.8;
              margin-top: 16px * 0.8;
              font-size: 16px * 0.8;
              border-radius: 4px * 0.8;
              line-height: 52px * 0.8;
              padding: 0px 12px * 0.8;
            }

            .paymentMethod {
              font-size: 18px * 0.8;
              padding: 31px * 0.8 0px 14px * 0.8 0px;
            }

            .changeus {
              width: 481px * 0.8;
              height: 52px * 0.8;
              font-size: 16px * 0.8;
              border-radius: 4px * 0.8;
              line-height: 52px * 0.8;
              padding: 0px 12px * 0.8;
            }

            .addCard {
              margin-top: 17px * 0.8;
              width: 481px * 0.8;
              height: 52px * 0.8;
              font-size: 16px * 0.8;
              border-radius: 6px * 0.8;
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
              width: 481px * 0.8;
              padding: 4px * 0.8;
              margin-top: 17px * 0.8;
              box-shadow: 0px 4px * 0.8 24px * 0.8 rgba(64, 64, 94, 0.08);
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
            }

            .btn {
              padding-top: 40px * 0.8;
              width: 481px * 0.8;

              .registered {
                width: 226px * 0.8;
                height: 48px * 0.8;
                border-radius: 41px * 0.8;
                font-size: 16px * 0.8;
                line-height: 48px * 0.8;
              }

              .service {
                border: 1px solid @cl-m;
                border-radius: 41px * 0.8;
                width: 226px * 0.8;
                height: 48px * 0.8;
                font-size: 16px * 0.8;
                line-height: 48px * 0.8;
              }
            }
          }

          .sellbuychange {
            font-size: 18px * 0.8;
          }
        }

        .order {
          margin-top: 12px * 0.8;
          width: 788px * 0.8;
          border-radius: 4px * 0.8;

          .order_header {
            padding: 45px * 0.8 30px * 0.8 37px * 0.8 30px * 0.8;
          }
        }
      }
    }

    .dio {
      .text {
        width: 440px * 0.8;
        border-radius: 4px * 0.8;

        .buyUsdt {
          font-size: 24px * 0.8;
          padding: 24px * 0.8 24px * 0.8 11px * 0.8;

          img {
            width: 14px * 0.8;
            height: 14px * 0.8;
          }
        }

        .content {
          padding: 24px * 0.8;

          .price {
            font-size: 14px * 0.8;
            padding-bottom: 18px * 0.8;
          }

          .number {
            padding-top: 18px * 0.8;
            font-size: 14px * 0.8;
            padding-bottom: 18px * 0.8;
          }

          .payment {
            padding: 18px * 0.8 0px 16px * 0.8 0px;

            .pay {
              font-size: 14px * 0.8;
            }

            .price_1 {
              .cny {
                font-size: 24px * 0.8;
              }

              .prompt {
                font-size: 12px * 0.8;
              }
            }
          }

          .address {
            padding: 20px * 0.8 13px * 0.8;
            border-radius: 4px * 0.8;
            font-size: 12px * 0.8;
            line-height: 20px * 0.8;
          }

          .btn {
            padding-top: 34px * 0.8;

            .left {
              width: 180px * 0.8;
              height: 48px * 0.8;
              font-size: 14px * 0.8;
              border-radius: 24px * 0.8;
            }

            .right {
              width: 180px * 0.8;
              height: 48px * 0.8;
              font-size: 14px * 0.8;
              border-radius: 24px * 0.8;
            }
          }
        }
      }
    }

    .diopro {
      .prompt {
        width: 440px * 0.8;
        border-radius: 4px * 0.8;

        .up {
          height: 210px * 0.8;
          font-size: 14px * 0.8;
          padding:0 16px * 0.8;
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
            line-height: 19px * 0.8;
          }

          .right {
            height: 72px * 0.8;
            font-size: 16px * 0.8;
            line-height: 19px * 0.8;
          }
        }
      }
    }
    .balance_box {
      width: 480px * 0.8;
      padding: 20px * 0.8 10px * 0.8 0;
      .num {
        font-size: 14px * 0.8;
        line-height: 20px * 0.8;
      }
      .cz_txt {
        font-size: 14px * 0.8;
        line-height: 20px * 0.8;
      }
    }
  }

  .dx_box {
    padding: 40px * 0.8 0 80px * 0.8;
    font-size: 14px * 0.8;
    line-height: 16px * 0.8;
  }
}

@media (max-width: 960px) {
  .home {
    .content {
      padding: 40px * 0.6 0px 80px * 0.6 0px;

      .content_1 {
        width: 790px * 0.6;

        .sellbuy {
          width: 790px * 0.6;
          border-radius: 4px * 0.6;
          padding: 0px 0px 66px * 0.6 32px * 0.6;

          .sellbuycoin {
            width: 480px * 0.6;
            padding: 33px * 0.6 0  23px * 0.6;
            .sellorbuy {
              .sellcoin {
                padding-right: 32px * 0.6;
                font-size: 16px * 0.6;
              }

              .buycoin {
                font-size: 16px * 0.6;
              }
            }
            .helps {
              .help_img {
                width: 18px * 0.6;
                height: 18px * 0.6;
              }
              .helptext {
                font-size: 14px * 0.6;
                line-height: 20px * 0.6;
              }
            }
          }
          .priceUid{
          width:480px * 0.6;
          font-size:14px * 0.6;

        }
          .buyotc {
            .userInfo {
              width: 480px * 0.6;

              .userInfo_left {
                font-size: 14px * 0.6;
              }

              .userInfo_right {
                font-size: 14px * 0.6;

                img {
                  width: 12px * 0.6;
                }
              }
            }

            .userInfoInput {
              width: 481px * 0.6;
              height: 52px * 0.6;
              margin-top: 16px * 0.6;
              font-size: 16px * 0.6;
              border-radius: 4px * 0.6;
              line-height: 52px * 0.6;
              padding: 0px 12px * 0.6;
            }


            .changeus {
              width: 481px * 0.6;
              height: 52px * 0.6;
              border: 1px solid #c8c8c8;
              color: #4f5669;
              font-size: 16px * 0.6;
              border-radius: 4px * 0.6;
              line-height: 52px * 0.6;
              padding: 0px 12px * 0.6;
            }

            .priceName {
              font-size: 18px * 0.6;
              padding: 23px * 0.6 0px 14px * 0.6 0px;
            }

            .inputName {
              width: 481px * 0.6;
              height: 52px * 0.6;
              // font-size: 14px * 0.6;
              border-radius: 4px * 0.6;
            }

            .pay {
              font-size: 18px;
              padding: 23px * 0.6 0px 14px * 0.6 0px;
            }

            .payimg {
              .payimg_1 {
                width: 110px * 0.6;
                height: 90px * 0.6;
                border-radius: 6px;

                .payimg_1_text {
                  font-size: 16px * 0.6;
                  padding-top: 5px * 0.6;
                }

                .pay_img {
                  width: 28px * 0.6;
                }
              }
            }
             .userInfo{
            margin: 24px * 0.6 0 14px * 0.6;
            font-size: 18px * 0.6;
          }

          .usdtDetails{
            font-size: 15px * 0.6;
            line-height: 21px * 0.6;
            width: 481px * 0.6;
          }

          .usdtAddress{
            font-size: 16px * 0.6;
            margin-bottom: 8px * 0.6;
          }

          .userName{
            font-size: 16px * 0.6;
            margin: 14px * 0.6 0 8px * 0.6;
          }

          .userNameReal{
            width: 481px * 0.6;
            height: 52px * 0.6;
            font-size: 14px * 0.6;
            line-height:52px * 0.6;
            padding-left:14px * 0.6;
          }

          .inputUsdt{
            width: 481px * 0.6;
            height: 52px * 0.6;
            padding:16px * 0.6 14px * 0.6;
            input{
              font-size: 14px * 0.6;
            }
          }

          .inputUsdt{
            width: 481px * 0.6;
            height: 52px * 0.6;
            padding:16px * 0.6 14px * 0.6;
            input{
              font-size: 14px * 0.6;
            }
          }

          .parmy{
            margin-top:10px * 0.6;
            font-size: 12px * 0.6;
            img{
              width:16px * 0.6;
              height:16px * 0.6;
            }
            span{
              padding-left:8px * 0.6;
            }
          }

            .btn {
              width: 481px * 0.6;
              height: 48px * 0.6;
              margin-top: 30px * 0.6;
              border-radius: 41px * 0.6;
              font-size: 16px * 0.6;
            }

            .adver {
              width: 481px * 0.6;
              text-align: center;
              font-size: 14px * 0.6;
              padding-top: 12px * 0.6;
            }
          }

          .sellotc {
            .userInfoInput {
              width: 481px * 0.6;
              height: 52px * 0.6;
              margin-top: 16px * 0.6;
              font-size: 16px * 0.6;
              border-radius: 4px * 0.6;
              line-height: 52px * 0.6;
              padding: 0px 12px * 0.6;
            }


            .paymentMethod {
              font-size: 18px * 0.6;
              padding: 31px * 0.6 0px 14px * 0.6 0px;
            }

            .changeus {
              width: 481px * 0.6;
              height: 52px * 0.6;
              font-size: 16px * 0.6;
              border-radius: 4px * 0.6;
              line-height: 52px * 0.6;
              padding: 0px 12px * 0.6;
            }

            .addCard {
              margin-top: 17px * 0.6;
              width: 481px * 0.6;
              height: 52px * 0.6;
              font-size: 16px * 0.6;
              border-radius: 6px * 0.6;
              padding: 12px * 0.6 16px * 0.6;

              img {
                width: 28px * 0.6;
                height: 28px * 0.6;
              }

              div {
                padding-left: 12px * 0.6;
              }
            }

            .getCard {
              width: 481px * 0.6;
              padding: 4px * 0.6;
              margin-top: 17px * 0.6;
              box-shadow: 0px 4px * 0.6 24px * 0.6 rgba(64, 64, 94, 0.08);
              border-radius: 6px * 0.6;

              .up {
                padding: 16px * 0.6;
                .up_left {
                  img {
                    width: 28px * 0.6;
                    height: 28px * 0.6;
                  }

                  div {
                    padding-left: 12px * 0.6;
                    font-size: 14px * 0.6;
                    line-height: 28px * 0.6;
                  }
                }
                .bankChoice {
                  .choiceText {
                    font-size: 12px * 0.6;
                    padding-right: 5px * 0.6;
                  }
                  .choiceImg {
                    width: 16px * 0.6;
                    height: 16px * 0.6;
                  }
                }
              }
              .down {
                padding: 16px * 0.6;

                .name {
                  font-size: 14px * 0.6;
                }

                .card {
                  padding-top: 6px * 0.6;
                  font-size: 16px * 0.6;
                }
              }
            }

            .btn {
              padding-top: 40px * 0.6;
              width: 481px * 0.6;

              .registered {
                width: 226px * 0.6;
                height: 48px * 0.6;
                border-radius: 41px * 0.6;
                font-size: 16px * 0.6;
                line-height: 48px * 0.6;
              }

              .service {
                border: 1px solid @cl-m;
                border-radius: 41px * 0.6;
                width: 226px * 0.6;
                height: 48px * 0.6;
                font-size: 16px * 0.6;
                line-height: 48px * 0.6;
              }
            }
          }

          .sellbuychange {
            font-size: 18px * 0.6;
          }
        }

        .order {
          margin-top: 12px * 0.6;
          width: 788px * 0.6;
          border-radius: 4px * 0.6;

          .order_header {
            padding: 45px * 0.6 30px * 0.6 37px * 0.6 30px * 0.6;
          }
        }
      }
    }

    .dio {
      .text {
        width: 440px * 0.6;
        border-radius: 4px * 0.6;

        .buyUsdt {
          font-size: 24px * 0.6;
          padding: 24px * 0.6 24px * 0.6 11px * 0.6;
        }

        .content {
          padding: 24px * 0.6;

          .price {
            font-size: 14px * 0.6;
            padding-bottom: 18px * 0.6;
          }

          .number {
            padding-top: 18px * 0.6;
            font-size: 14px * 0.6;
            padding-bottom: 18px * 0.6;
          }

          .payment {
            padding: 18px * 0.6 0px 16px * 0.6 0px;

            .pay {
              font-size: 14px * 0.6;
            }

            .price_1 {
              .cny {
                font-size: 24px * 0.6;
              }

              .prompt {
                font-size: 12px * 0.6;
              }
            }
          }

          .address {
            padding: 20px * 0.6 13px * 0.6;
            border-radius: 4px * 0.6;
            font-size: 12px * 0.6;
            line-height: 20px * 0.6;
          }

          .btn {
            padding-top: 34px * 0.6;

            .left {
              width: 180px * 0.6;
              height: 48px * 0.6;
              font-size: 14px * 0.6;
              border-radius: 24px * 0.6;
            }

            .right {
              width: 180px * 0.6;
              height: 48px * 0.6;
              font-size: 14px * 0.6;
              border-radius: 24px * 0.6;
            }
          }
        }
      }
    }

    .diopro {
      .prompt {
        width: 440px * 0.6;
        border-radius: 4px * 0.6;

        .up {
          height: 210px * 0.6;
          font-size: 14px * 0.6;

          img {
            width: 72px * 0.6;
            height: 72px * 0.6;
          }

          div {
            padding-top: 20px * 0.6;
          }
        }

        .down {
          .left {
            height: 72px * 0.6;
            font-size: 16px * 0.6;
            line-height: 19px * 0.6;
          }

          .right {
            height: 72px * 0.6;
            font-size: 16px * 0.6;
            line-height: 19px * 0.6;
          }
        }
      }
    }
    .balance_box {
      width: 480px * 0.6;
      padding: 20px * 0.6 10px * 0.6;
    }
  }
}
</style>
