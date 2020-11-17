<template>
  <div class="home">
    <!-- 购买 -->
    <div class="purchase" v-if="BuyorSell == 1">
      <div class="flex_row">
        <div class="flex_end">
          <div class="buySellusdt">购买USDT</div>
          <div
            class="buySellTitle"
            style="padding-left:0.4rem"
            @click="buySellClick('sell')"
          >
            出售USDT
          </div>
        </div>
      </div>
      <!-- <div class="flex_row userrow">
        <div class="user user_text">用户信息</div>
        <div class="user_num user_text">{{purchase.user}}</div>
      </div> -->

      <!-- 购买数量金额 -->
      <div class="buyrow">
        <div class="flex_row buyrow1">
          <div class="flex">
            <div class="rateTit buyrow1_text">汇率约</div>
            <div class="rateNum buyrow1_text">
              1 USDT = {{ coinlist.coinToCny | toThousandFilter }} CNY
            </div>
          </div>
          <div class="flex" @click="clickType">
            <img class="buyimg" src="@/assets/transactions/ic_switch.png" alt />
            <div class="buyrow1_text rateL">
              {{ purchase.type == 1 ? "按数量购买" : "按金额购买" }}
            </div>
          </div>
        </div>
        <div class="flex_row buyrow2">
          <div class="flex">
            <img
              v-if="purchase.type == 1"
              class="ico_img"
              src="@/assets/transactions/ico_cny.png"
              alt
            />
            <img
              v-if="purchase.type == 2"
              class="ico_img"
              src="@/assets/transactions/ico_usdt.png"
              alt
            />
            <div class="mybuy">
              <div class="mym">我要买</div>
              <div class="flex inputs">
                <span class="buyrow2_type" v-if="purchase.type == 1">￥</span>
                <input
                  class="input"
                  v-if="purchase.type == 1"
                  placeholder="0.00"
                  v-model="purchase.cny"
                  type="text"
                  @input="inputNum"
                />
                <input
                  class="input"
                  v-if="purchase.type == 2"
                  placeholder="0.0000"
                  v-model="purchase.usdt"
                  type="text"
                  @input="inputNum"
                />
              </div>
            </div>
          </div>
          <div class="buyrow2_type">
            {{ purchase.type == 1 ? "CNY" : "USDT" }}
          </div>
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
        <p>立即买入</p>
      </button>
      <div class="tips">充值完成后，虚拟币额度将汇入您的网站钱包中</div>
    </div>
    <!-- 出售 -->
    <div class="sale" v-if="BuyorSell == 2">
      <div class="flex_row">
        <div class="flex_end">
          <div
            class="buySellTitle"
            @click="buySellClick('buy')"
            style="padding-right:0.4rem"
          >
            购买USDT
          </div>
          <div class="buySellusdt">出售USDT</div>
        </div>
      </div>

      <div class="buyrow">
        <div class="flex_row buyrow1">
          <div class="flex">
            <div class="rateTit buyrow1_text">汇率约</div>
            <div class="rateNum buyrow1_text">
              1 USDT = {{ coinlist.coinToCny | toThousandFilter }} CNY
            </div>
          </div>
          <div class="flex" @click="saleclickType">
            <img class="buyimg" src="@/assets/transactions/ic_switch.png" alt />
            <div class="buyrow1_text rateL">
              {{ sale.type == 1 ? "按数量出售" : "按金额出售" }}
            </div>
          </div>
        </div>
        <div class="flex_row buyrow2">
          <div class="flex">
            <img
              v-if="sale.type == 1"
              class="ico_img"
              src="@/assets/transactions/ico_cny.png"
              alt
            />
            <img
              v-if="sale.type == 2"
              class="ico_img"
              src="@/assets/transactions/ico_usdt.png"
              alt
            />
            <div class="mybuy">
              <div class="mym">我要卖</div>
              <div class="flex inputs">
                <span class="buyrow2_type" v-if="sale.type == 1">￥</span>
                <input
                  class="input"
                  v-if="sale.type == 1"
                  placeholder="0.00"
                  v-model="sale.cny"
                  type="text"
                  @input="inputNum"
                />
                <input
                  class="input"
                  v-if="sale.type == 2"
                  placeholder="0.0000"
                  v-model="sale.usdt"
                  type="text"
                  @input="inputNum"
                />
              </div>
            </div>
          </div>
          <div class="buyrow2_type">{{ sale.type == 1 ? "CNY" : "USDT" }}</div>
        </div>
        <div class="tipssell">
          单笔可出售数量为
          <div>{{ priceLimit.minUsdtSaleAmount }}</div>
          ~
          <div>{{ priceLimit.maxUsdtSaleAmount }}</div>
          USDT
        </div>
        <!-- <div class="tipssell">
          单笔可出售数量为
          <div>{{ coinlist.fastTradeLowLimit }}</div>
          ~
          <div>{{ coinlist.fastTradeHighLimit }}</div>
          USDT
        </div> -->

        <div class="balance">
          <div class="balance_left">账户余额：{{ balance }} USDT</div>
          <div class="Charges" @click="toCharges">去充币</div>
        </div>
        <div></div>
      </div>
      <div class="saletype">收款方式</div>

      <!-- 多张银行卡 -->
      <div
        class="bank"
        v-for="(item, index) of sale.bank"
        :key="index"
        @click="addBanks(item)"
      >
        <div class="bank_title">
          <div class="bank_header_name">
            <img
              class="bankpay"
              src="@/assets/transactions/ico_bankpay.png"
              alt
            />
            <div class="bank_text text_block">
              银行卡({{ item.paymentCode }})
            </div>
          </div>
          <div class="bankChoice" @click.stop="bankChoice(item, index)">
            <div
              class="choiceText"
              :class="{ choiceActive: sale.bankActive == index }"
            >
              选择
            </div>
            <img
              class="choiceImg"
              v-if="sale.bankActive == index"
              src="@/assets/transactions/bankChoice_active.png"
              alt=""
            />
            <img
              class="choiceImg"
              v-else
              src="@/assets/transactions/bankChoice.png"
              alt=""
            />
          </div>
        </div>
        <div class="bank_content">
          <div class="flex_row">
            <div class="bank_text">{{ item.name }}</div>
            <div class="bank_text">{{ item.addition }}</div>
          </div>
          <div class="bankcard">{{ item.account | yhqFormat }}</div>
        </div>
      </div>

      <!-- 添加银行卡 -->
      <div class="add_gray" @click="addBanks()">
        <img
          class="addgray_img"
          src="@/assets/transactions/ico_add_gray.png"
          alt
        />
        <div class="addtext">添加银行卡</div>
      </div>
      <button
        class="button"
        :disabled="sale.bank.length == 0"
        :class="{ button_h: sale.bank.length == 0 }"
        @click="saleTransactions"
      >
        <img src="@/assets/transactions/ico_zap.png" alt />
        <p>立即交易</p>
      </button>
    </div>
    <!-- 订单列表 -->
    <!-- <div class="orderList">
      <div class="flex_row orderrow1">
        <div class="order_title">我的订单</div>
        <div class="flex" @click="morelist">
          <div class="alltext">全部</div>
          <img
            class="allimg"
            src="@/assets/transactions/ico_arrow_right.png"
            alt
          />
        </div>
      </div>
      <nolist class="nolist" v-if="orderList.length == 0"></nolist>
      <div v-else class="orderrow2">
        <orderItem
          v-for="(item, index) of orderList"
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
      <div style="color:#0CB397;">{{ $appConfig.lowerName }}</div>
      提供支持
    </div> -->

    <paymentType ref="paymentType" @payment="payment"></paymentType>
    <paymentDetails
      ref="paymentDetails"
      @immediateOrder="immediateOrder"
    ></paymentDetails>
    <ordersNotComp ref="ordersNotComp" @Tohandle="Tohandle"></ordersNotComp>
    <confirmOrder
      ref="confirmOrder"
      @confirmOrder="confirmOrder"
    ></confirmOrder>
    <addBank ref="addBank"></addBank>
    <balancepop ref="balancepop" @toCharges="toCharges"></balancepop>
    <kycCertification ref="kycCertification" @toKyc="toKyc"></kycCertification>
    <noSetTradePwd ref="noSetTradePwd" @goSet="goSet"></noSetTradePwd>
    <verTransaPwd ref="verTransaPwd" @varTransaSu="varTransaSu"></verTransaPwd>
  </div>
</template>

<script>
import buyApi from "@/api/buy.js";
import orderInfoApi from "@/api/orderInfo";
import userInfoApi from "@/api/userInfo.js";
import { customerService } from "@/utils/index";
import orderItem from "@/components/orderTemplate/index";
import nolist from "@/components/nolist/index";
//支付方式
import paymentType from "./components/paymentType";
//账户信息
import paymentDetails from "./components/paymentDetails";
//未处理订单
import ordersNotComp from "@/components/ordersNotComp";
//确认订单
import confirmOrder from "./components/confirmOrder";
//添加银行卡
import addBank from "./components/addBank";
//去充币弹框
import balancepop from "./components/insufficientBalance";
//kyc认证弹框
import kycCertification from "./components/kycCertification.vue";
import verTransaPwd from "@/components/verTransaPwd"; //验证交易密码
import noSetTradePwd from "@/components/noSetTradePwd"; //没有设置交易密码
export default {
  name: "mobilehome",
  data() {
    return {
       item:{},//选择方式后保存的数据
      userInfo: {}, //用户信息
      BuyorSell: 1, //1买  2 卖
      coinlist: [], //币种详情
      Tohandleid: "", //未处理的订单id
      orderList: [], //订单列表
      balance: 0, //可用余额
      //购买
      purchase: {
        user: "", //用户信息
        address: "",
        type: 1, //购买类型 1 金额 2 数量
        cny: "",
        usdt: ""
      },
      //出售
      sale: {
        type: 1, //购买类型 1 金额 2 数量
        cny: "",
        usdt: "",
        bankActive: 0,
        bank: []
        // bank: {}
      },
      kycInformation: [], //kyc信息
      priceLimit:{} //买卖区间
      // roleName:false , //买单是否可以输入实名  true 可以输入
    };
  },
  components: {
    orderItem,
    nolist,
    paymentType,
    paymentDetails,
    ordersNotComp,
    confirmOrder,
    addBank,
    balancepop,
    kycCertification,
    noSetTradePwd,
    verTransaPwd
  },
  created() {
    // console.log(this.$store.state.user.type);
    // if (this.$store.state.user.type == "sell") {
    if (window.localStorage.getItem("type") == "sell") {
      this.BuyorSell = 2;
    } else {
      this.BuyorSell = 1;
    }
    this.getUserInfo();
    this.getPriceLimit()
    this.getBalance();
    this.kycstatus();
    this.getcoinlist();
    // this.getorderList();
    this.getPayment();
  },
  mounted() {},
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
    // 用户基本信息
    getUserInfo() {
      userInfoApi
        .getUserInfo()
        .then(res => {
          console.log("----------------", res);
          this.userInfo = res.data.data;
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    //去设置交易密码
    goSet() {
      console.log('去设置交易密码')
      this.$router.push('/mpersonalCentre')
    },
    varTransaSu(value) {
      if(value.length < 6){
        this.$toast('请输入6位支付密码！')
        return
      }
      userInfoApi
        .verifyPwd({
          pwd: value,
          pwdType: 2
        })
        .then(res => {
          this.$refs.verTransaPwd.hide();
          if (this.BuyorSell == 1) {
            var value = {
              poptype: this.item.value, //选择的支付方式
              kycInformation: this.kycInformation
              // address: this.purchase.address, //地址
              // roleName: this.roleName
            };
            this.$refs.paymentDetails.show(value);
          } else {
            if (this.sale.type == 1) {
              

              buyApi
                .onebuy({
                  totalMoney: this.sale.cny,
                  payment: 1,
                  tradeType: this.BuyorSell,
                  bindId: this.sale.bank[this.sale.bankActive].id
                })
                .then(res => {
                  // console.log(res);
                  if (res.data.code == 0) {
                    this.$router.push({
                      path: "/msellUsdt/" + res.data.data
                      // params: {
                      //   id: res.data.data
                      // }
                    });
                  }
                })
                .catch(err => {
                  // console.log(err);

                  if (err.data.code == 10094) {
                    this.Tohandleid = err.data.data;
                    this.$refs.ordersNotComp.show();
                    return;
                  }
                  if (err.data.code == 10005) {
                    this.$refs.balancepop.show();
                    return;
                  }

                  if (err.data.code == 10183 || err.data.code == 10184) {
                    this.$refs.paymentDetails.hide();
                    this.$refs.kycCertification.show();
                    return;
                  }
                  this.$toast(err.data.message);
                });
            } else {
              

              buyApi
                .onebuy({
                  tradeAmount: this.sale.usdt,
                  payment: 1,
                  tradeType: this.BuyorSell,
                  bindId: this.sale.bank[this.sale.bankActive].id
                })
                .then(res => {
                  // console.log(res);
                  if (res.data.code == 0) {
                    this.$router.push({
                      path: "/msellUsdt/" + res.data.data
                      // params: {
                      //   id: res.data.data
                      // }
                    });
                  }
                })
                .catch(err => {
                  // console.log(err);

                  if (err.data.code == 10094) {
                    this.Tohandleid = err.data.data;
                    this.$refs.ordersNotComp.show();
                    return;
                  }
                  if (err.data.code == 10005) {
                    this.$refs.balancepop.show();
                    return;
                  }
                  if (err.data.code == 10183 || err.data.code == 10184) {
                    this.$refs.paymentDetails.hide();
                    this.$refs.kycCertification.show();
                    return;
                  }
                  this.$toast(err.data.message);
                });
            }
          }
        }).catch(err => {
        this.$toast(err.data.message)
      })
    },
    //买卖切换
    buySellClick(value) {
      window.localStorage.setItem("type", value);
      if (value == "sell") {
        this.BuyorSell = 2;
      } else {
        this.BuyorSell = 1;
      }
      // this.getorderList();
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
      this.sale.cny = this.sale.cny.replace(/[^\d.]/g, "");
      this.sale.usdt = this.sale.usdt.replace(/[^\d.]/g, "");
      this.purchase.cny = this.purchase.cny.replace(/[^\d.]/g, "");
      this.purchase.usdt = this.purchase.usdt.replace(/[^\d.]/g, "");
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
    //去充币
    toCharges() {
      this.$router.push("/mCharges");
    },
    //获取收款方式详情
    getPayment() {
      userInfoApi
        .getPayment({
          bindType: 1
        })
        .then(res => {
          // console.log("****************", res);
          // this.sale.bank = res.data.data;
          let data = res.data.data;
          if (data.length > 0) {
            this.sale.bank = data[0];
          }
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    //添加银行卡
    addBanks(item) {
      if (this.kycInformation.kycStatus == 2) {
        if (item) {
          window.localStorage.setItem("bank", JSON.stringify(item));
        } else {
          window.localStorage.setItem("bank", "");
        }
        this.$router.push("/mcardInfo");
      } else {
        this.$refs.kycCertification.show();
      }
    },
    //选择银行卡
    bankChoice(item, index) {
      console.log("选择的银行卡", item);

      this.sale.bankActive = index;
    },
    //获取kyc状态
    kycstatus() {
      buyApi
        .kycstatus({})
        .then(res => {
          console.log("*************", res);
          var data = res.data.data;
          // if(data.kycStatus != 2){
          //   this.roleName = false
          // }else{
          //   if(res.data.data.role == 2){
          //     this.roleName = true
          //   }else{
          //     this.roleName = false
          //   }
          // }
          this.kycInformation = data;
          this.purchase.user = data.openId;
          this.purchase.address = data.address;
          window.localStorage.setItem("userId", data.userId);
        })
        .catch(err => {
          console.log(err);
          this.$toast(err.data.message);
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
          orderType: 3,
          current: 1,
          size: 3,
          active: 3,
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
    //购买类型
    clickType() {
      if (this.purchase.type == 1) {
        this.purchase.type = 2;
        this.purchase.cny = "";
      } else {
        this.purchase.type = 1;
        this.purchase.usdt = "";
      }
    },
    //出售类型
    saleclickType() {
      if (this.sale.type == 1) {
        this.sale.type = 2;
        this.sale.cny = "";
      } else {
        this.sale.type = 1;
        this.sale.usdt = "";
      }
    },
    //立即买入选择方式弹框
    Buyimmediately() {
      if (this.userInfo.tradePwdSet == 0) {
        this.$refs.noSetTradePwd.show();
        return;
      }
      if (this.purchase.type == 1) {
        if (!this.purchase.cny) {
          this.$toast("请输入购买金额");
          return;
        }
        if (this.kycInformation.kycStatus != 2) {
          // console.log(this.kycInformation)
          this.$refs.kycCertification.show();
          return;
        }
        if(this.purchase.cny < this.priceLimit.minCnyBuyAmount - 0 || this.purchase.cny  > this.priceLimit.maxCnyBuyAmount - 0){
          this.$toast('当前最小交易金额是' + this.priceLimit.minCnyBuyAmount + ',最大交易金额是' + this.priceLimit.maxCnyBuyAmount + '，请输入正确的金额');
          return
        }
        this.$refs.paymentType.show();
      } else {
        if (!this.purchase.usdt) {
          this.$toast("请输入购买数量");
          return;
        }
        if (this.kycInformation.kycStatus != 2) {
          // console.log(this.kycInformation)
          this.$refs.kycCertification.show();
          return;
        }
        if(this.purchase.usdt < this.priceLimit.minUsdtBuyAmount - 0 || this.purchase.usdt  > this.priceLimit.maxUsdtBuyAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtBuyAmount + ',最大交易数量是' + this.priceLimit.maxUsdtBuyAmount + '，请输入正确的数量');
          return
        }
        this.$refs.paymentType.show();
        // var value = {
        //   poptype: 1, //默认银行卡
        //   address: this.purchase.address ,//地址
        //   roleName: this.roleName
        // };
        // this.$refs.paymentDetails.show(value);
      }
    },
    // 选择的支付方式
    payment(item) {
      // console.log(item);
      this.item = item
      this.$refs.verTransaPwd.show();
      // var value = {
      //   poptype: item.value, //选择的支付方式
      //   kycInformation: this.kycInformation
      //   // address: this.purchase.address, //地址
      //   // roleName: this.roleName
      // };
      // this.$refs.paymentDetails.show(value);
    },
    //确认购买弹框
    immediateOrder(value) {
      // console.log(value);
      this.$refs.paymentDetails.hide();
      var obj = {
        purchaseType: this.purchase.type, // 购买类型
        type: value.type, // 选择的支付方式
        from: value.from, // 购买的地址、名字
        price: this.coinlist.coinToCny, //币种单价
        cny: this.purchase.cny, //输入的金额
        usdt: this.purchase.usdt //输入的数量
      };
      this.$refs.confirmOrder.show(obj);
    },
    //确定订单下单
    confirmOrder(value) {
      console.log("****", value);
      if (value.purchaseType == 1) {
        buyApi
          .onebuy({
            totalMoney: value.cny,
            payment: value.type,
            payerName: value.from.name,
            tradeType: this.BuyorSell,
            address: value.from.address
          })
          .then(res => {
            // console.log("金额", res);

            if (res.data.code == 0) {
              this.$router.push({
                path: "/morderDetails/" + res.data.data
                // params: {
                //   id: res.data.data
                // }
              });
            }
          })
          .catch(err => {
            // console.log(err);
            this.$refs.confirmOrder.hide();

            if (err.data.code == 10094) {
              this.$refs.paymentDetails.hide();
              this.Tohandleid = err.data.data;
              this.$refs.ordersNotComp.show();
              return;
            }
            if (err.data.code == 10183 || err.data.code == 10184) {
              this.$refs.paymentDetails.hide();
              this.$refs.kycCertification.show();
              return;
            }

            this.$toast(err.data.message);
          });
      } else {
        buyApi
          .onebuy({
            tradeAmount: value.usdt,
            payment: value.type,
            payerName: value.from.name,
            tradeType: this.BuyorSell,
            address: value.from.address
          })
          .then(res => {
            // console.log("数量", res);
            if (res.data.code == 0) {
              this.$router.push({
                path: "/morderDetails/" + res.data.data
                // params: {
                //   id: res.data.data
                // }
              });
            }
          })
          .catch(err => {
            // console.log(err);
            this.$refs.confirmOrder.hide();

            if (err.data.code == 10094) {
              this.$refs.paymentDetails.hide();
              this.Tohandleid = err.data.data;
              this.$refs.ordersNotComp.show();
              return;
            }
            if (err.data.code == 10183 || err.data.code == 10184) {
              this.$refs.paymentDetails.hide();
              this.$refs.kycCertification.show();
              return;
            }
            this.$toast(err.data.message);
          });
      }
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
    //出售交易
    saleTransactions() {
      if (this.userInfo.tradePwdSet == 0) {
        this.$refs.noSetTradePwd.show();
        return;
      }
      if (this.kycInformation.kycStatus != 2) {
        // console.log(this.kycInformation)
        this.$refs.kycCertification.show();
        return;
      }

      if (this.sale.type == 1) {
        if (!this.sale.cny) {
          this.$toast("请输入出售金额");
          return;
        }
        if(this.sale.cny < this.priceLimit.minCnySaleAmount - 0 || this.sale.cny  > this.priceLimit.maxCnySaleAmount - 0){
          this.$toast('当前最小交易金额是' + this.priceLimit.minCnySaleAmount + ',最大交易金额是' + this.priceLimit.maxCnySaleAmount + '，请输入正确的金额');
          return
        }
        this.$refs.verTransaPwd.show();
      }else{
        if (!this.sale.usdt) {
          this.$toast("请输入出售的数量");
          return;
        }
        if(this.sale.usdt < this.priceLimit.minUsdtSaleAmount - 0 || this.sale.usdt  > this.priceLimit.maxUsdtSaleAmount - 0){
          this.$toast('当前最小交易数量是' + this.priceLimit.minUsdtSaleAmount + ',最大交易数量是' + this.priceLimit.maxUsdtSaleAmount + '，请输入正确的数量');
          return
        }
        this.$refs.verTransaPwd.show();
      }
      
      // if (this.sale.type == 1) {
      //   if (!this.sale.cny) {
      //     this.$toast("请输入出售金额");
      //     return;
      //   }

      //   buyApi
      //     .onebuy({
      //       totalMoney: this.sale.cny,
      //       payment: 1,
      //       tradeType: this.BuyorSell,
      //       bindId:this.sale.bank[this.sale.bankActive].id
      //     })
      //     .then(res => {
      //       // console.log(res);
      //       if (res.data.code == 0) {
      //         this.$router.push({
      //           path: "/msellUsdt/"+res.data.data,
      //           // params: {
      //           //   id: res.data.data
      //           // }
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       // console.log(err);

      //       if (err.data.code == 10094) {
      //         this.Tohandleid = err.data.data;
      //         this.$refs.ordersNotComp.show();
      //         return
      //       }
      //       if (err.data.code == 10005) {
      //         this.$refs.balancepop.show();
      //         return
      //       }

      //       if (err.data.code == 10183 || err.data.code == 10184) {
      //         this.$refs.paymentDetails.hide();
      //         this.$refs.kycCertification.show();
      //         return;
      //       }
      //       this.$toast(err.data.message);
      //     });
      // } else {
      //   if (!this.sale.usdt) {
      //     this.$toast("请输入出售的数量");
      //     return;
      //   }

      //   buyApi
      //     .onebuy({
      //       tradeAmount: this.sale.usdt,
      //       payment: 1,
      //       tradeType: this.BuyorSell,
      //       bindId:this.sale.bank[this.sale.bankActive].id
      //     })
      //     .then(res => {
      //       // console.log(res);
      //       if (res.data.code == 0) {
      //         this.$router.push({
      //           path: "/msellUsdt/" + res.data.data,
      //           // params: {
      //           //   id: res.data.data
      //           // }
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       // console.log(err);

      //       if (err.data.code == 10094) {
      //         this.Tohandleid = err.data.data;
      //         this.$refs.ordersNotComp.show();
      //         return
      //       }
      //        if (err.data.code == 10005) {
      //         this.$refs.balancepop.show();
      //         return
      //       }
      //       if (err.data.code == 10183 || err.data.code == 10184) {
      //         this.$refs.paymentDetails.hide();
      //         this.$refs.kycCertification.show();
      //         return;
      //       }
      //         this.$toast(err.data.message);
      //     });
      // }
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
  .buySellusdt {
    font-family: PingFangSC;
    font-size: 0.36rem;
    line-height: 0.42rem;
    color: #40405e;
  }
  .buySellTitle {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #a0a0b3;
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
    padding: 0.2rem 0.32rem 0.8rem 0.32rem;
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
    padding: 0.2rem 0.32rem 0.8rem 0.32rem;

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
