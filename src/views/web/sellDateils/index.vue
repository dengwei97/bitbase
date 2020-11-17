<template>
  <div class="buyDateils">
    <div class="content">
      <div class="dateils">
        <!--        转币给买家  、 待付款-->
        <div v-if="orderDateils.orderState == 1 || orderDateils.orderState == 7">
          <!--                   顶部_转币给买家-->
          <div v-if="orderDateils.orderState == 7" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ic_buy_state_header_2.png" />
              <span class="title wait_txt">转币给买家</span>
            </div>
            <div class="sub_title">99.7%的订单会在5分钟内完成</div>
          </div>
          <!--       顶部_待付款-->
          <div v-if="orderDateils.orderState == 1" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ic_stopwatch_yellow.png" />
              <span class="title">待收款</span>
            </div>
            <div class="sub_title head_time">
              等待买家付款
            </div>
            <!-- <div class="sub_title head_time" v-if="countdown > 0">
							预计在
        <div class="times">
          <van-count-down class="cuntdown" :time="countdown" format="mm:ss" />
        </div>内收到买家付款
						</div> -->
          </div>

          <div class="msg">
            <div class="num_box">
              <div class="total">
                ¥ {{ orderDateils.totalMoney.split('.')[0] }}.
                <span class="active">{{ orderDateils.totalMoney.split('.')[1] }}</span>
              </div>
              <div class="priec flex flex_middle">
                <span class="active">单价</span>
                ¥ {{ orderDateils.coinToCny }}
              </div>
              <div class="num flex flex_middle">
                <span class="active">数量</span>
                {{ orderDateils.tradeAmount }} USDT
              </div>
              <div class="numform_tips">*转账金额须一致，包含小数</div>
            </div>

            <!-- <div class="adder_box" v-show="orderDateils.orderState == 7">
                            <div class="adder_tab flex flex_middle">
                                <div class="tab_label">请转账至买家地址</div>
                                <div class="tab_item active">
                                    ERC20
                                </div>
                            </div>
                            <div class="adder_er img-box">
                                <div class="adder_er_img" id="qrcode" ref="qrcode"></div>
                            </div>
            </div>-->

            <div class="msg_list">
              <!-- <div
                class="item flex flex_middle"
                v-if="orderDateils.orderState != 3 && orderDateils.orderState != 4 && orderDateils.orderState != 2"
              >
                <div class="label flex_1">买家收币地址</div>
                <div class="desc_text">{{address}}</div>
                <div class="item_copy_box">
                  <copy :text="address"></copy>
                </div>
              </div> -->
              <!-- <div class="item flex flex_middle">
                <div class="label flex_1">订单号</div>
                <div class="desc_text">{{orderDateils.id}}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.id"></copy>
                </div>
              </div> -->
              <!-- <div class="item flex flex_middle">
                <div class="label flex_1">订单创建时间</div>
                <div
                  class="desc_text"
                >{{orderDateils.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")}}</div>
              </div> -->
              <div class="item flex flex_middle">
                <div class="label flex_1">买家昵称</div>
                <div class="desc_text">{{ orderDateils.businessNickName }}</div>
              </div>
              <div v-if="orderDateils.orderState != 4" class="item flex flex_middle">
                <div class="label flex_1">买家实名</div>
                <div class="desc_text">{{ orderDateils.payBindInfoDetail.name }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.payBindInfoDetail.name" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">平台订单号</div>
                <div class="desc_text">{{ orderDateils.id }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.id" />
                </div>
              </div>
              <div v-if="orderDateils.billNo != ''" class="item flex flex_middle">
                <div class="label flex_1">商家订单号</div>
                <div class="desc_text">{{ orderDateils.billNo }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.billNo" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">收款方式</div>
                <div
                  class="desc_text"
                >{{ orderDateils.receiveBindInfoDetail.paymentCode }}({{ orderDateils.receiveBindInfoDetail.account.slice(orderDateils.receiveBindInfoDetail.account.length - 4) }})</div>
                <img v-if="orderDateils.receiveBindInfoDetail.bindType == 1" class="zffs_img" src="@/assets/transactions/ic_bankpay_yhq.png" />
                <img v-if="orderDateils.receiveBindInfoDetail.bindType == 2" class="zffs_img" src="@/assets/transactions/ico_weixinpay.png" />
                <img v-if="orderDateils.receiveBindInfoDetail.bindType == 3" class="zffs_img" src="@/assets/transactions/ico_alipay.png" />
              </div>
            </div>
          </div>
          <!--                   按钮_转币给买家-->
          <div v-if="orderDateils.orderState == 7" class="btn_box flex flex_middle">
            <div class="bnt_1 btn pointer" @click="showPop('confirmPay')">我已转账USDT</div>
            <div class="bnt_2 btn pointer" @click="allOrder">查看所有订单</div>
          </div>
          <!--                   按钮_待付款-->
          <div v-if="orderDateils.orderState == 1" class="btn_box flex flex_middle">
            <div class="bnt_1 btn pointer" @click="toReturn">返回</div>
            <div class="bnt_2 btn pointer" @click="allOrder">查看所有订单</div>
            <div class="bnt_2 btn pointer" @click="customer">
              有疑问？联系客服
            </div>
          </div>
        </div>
        <!--     待放行   已完成\ 已取消 -->
        <div
          v-if="orderDateils.orderState == 3 || orderDateils.orderState == 2 || orderDateils.orderState == 4"
        >
          <!--                   顶部_待放行-->
          <div v-if="orderDateils.orderState == 2" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ico_stopwatch_yellow.png" />
              <span class="title wait_txt">待放行</span>
            </div>
            <div class="sub_title">等待资产到账</div>
          </div>
          <!--                   顶部_已完成-->
          <div v-if="orderDateils.orderState == 3" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ic_finish_green.png" />
              <span class="title succ_txt">已完成</span>
            </div>
            <div class="sub_title">订单已完成</div>
          </div>
          <!--       顶部_已取消-->
          <div v-if="orderDateils.orderState == 4" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ic_cancelled_gray.png" />
              <span class="title close_txt">已取消</span>
            </div>
            <div class="sub_title">订单已取消，无法查看支付信息</div>
          </div>

          <div class="msg">
            <div class="num_box">
              <div class="total">
                ¥ {{ orderDateils.totalMoney.split('.')[0] }}.
                <span class="active">{{ orderDateils.totalMoney.split('.')[1] }}</span>
              </div>
              <div class="priec flex flex_middle">
                <span class="active">单价</span>
                ¥ {{ orderDateils.coinToCny }}
              </div>
              <div class="num flex flex_middle">
                <span class="active">数量</span>
                {{ orderDateils.tradeAmount }} USDT
              </div>
              <div class="numform_tips">*转账金额须一致，包含小数</div>
            </div>
            <div class="msg_list">
              <!-- <div
                class="item flex flex_middle"
                v-if="orderDateils.orderState != 3 && orderDateils.orderState != 4 && orderDateils.orderState != 2"
              >
                <div class="label flex_1">买家收币地址</div>
                <div class="desc_text">{{address}}</div>
                <div class="item_copy_box">
                  <copy :text="address"></copy>
                </div>
              </div> -->
              <!-- <div class="item flex flex_middle">
                <div class="label flex_1">订单号</div>
                <div class="desc_text">{{orderDateils.id}}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.id"></copy>
                </div>
              </div> -->
              <!-- <div class="item flex flex_middle">
                <div class="label flex_1">下单时间</div>
                <div
                  class="desc_text"
                >{{orderDateils.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")}}</div>
              </div> -->
              <div class="item flex flex_middle">
                <div class="label flex_1">买家昵称</div>
                <div class="desc_text">{{ orderDateils.businessNickName }}</div>
              </div>
              <div v-if="orderDateils.orderState != 4" class="item flex flex_middle">
                <div class="label flex_1">买家实名</div>
                <div class="desc_text">{{ orderDateils.payBindInfoDetail.name }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.payBindInfoDetail.name" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">平台订单号</div>
                <div class="desc_text">{{ orderDateils.id }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.id" />
                </div>
              </div>
              <div v-if="orderDateils.billNo != ''" class="item flex flex_middle">
                <div class="label flex_1">商家订单号</div>
                <div class="desc_text">{{ orderDateils.billNo }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.billNo" />
                </div>
              </div>
              <div
                v-if="orderDateils.orderState == 3 || orderDateils.orderState == 2"
                class="item flex flex_middle"
              >
                <div class="label flex_1">收款方式</div>
                <div
                  class="desc_text"
                >{{ orderDateils.receiveBindInfoDetail.paymentCode }}({{ orderDateils.receiveBindInfoDetail.account.slice(orderDateils.receiveBindInfoDetail.account.length - 4) }})</div>
                <img v-if="orderDateils.receiveBindInfoDetail.bindType == 1" class="zffs_img" src="@/assets/transactions/ic_bankpay_yhq.png" />
                <img v-if="orderDateils.receiveBindInfoDetail.bindType == 2" class="zffs_img" src="@/assets/transactions/ico_weixinpay.png" />
                <img v-if="orderDateils.receiveBindInfoDetail.bindType == 3" class="zffs_img" src="@/assets/transactions/ico_alipay.png" />
              </div>
              <div v-if="orderDateils.orderState == 3 || orderDateils.orderState ==	4 " class="item flex flex_middle">
                <div class="label flex_1">订单创建时间</div>
                <div
                  class="desc_text"
                >{{ orderDateils.createTime - 0 | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</div>
              </div>
              <div v-if="orderDateils.orderState == 3 || orderDateils.orderState == 4" class="item flex flex_middle">
                <div class="label flex_1">交易结束时间</div>
                <div
                  class="desc_text"
                >{{ orderDateils.updateTime - 0 | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</div>
              </div>
              <div class="item flex flex_middle" v-if="orderDateils.orderState == 3">
                <div class="label flex_1">电子凭证</div>
                <div class="flex flex_middle" style="cursor: pointer;" @click="generateCredentials">
                  <div class="desc_text" style="">生成电子凭证</div>
                  <img class="item_pz" src="@/assets/transactions/ico_arrow_right.png" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="btn_box flex flex_middle">
            <div v-if="orderDateils.orderState == 2" class="bnt_1 bnt_len btn pointer" @click="bankCurrency">放行USDT</div>
            <div v-if="orderDateils.orderState == 3 || orderDateils.orderState == 4 " class="bnt_1 btn pointer" @click="toReturn">返回</div>
            <div class="bnt_2 bnt_len btn pointer" @click="allOrder">查看所有订单</div>
            <div class="bnt_2 btn pointer" @click="customer">
              有疑问？联系客服
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmPay ref="confirmPay" @confirmPay="payOrder" />
    <!-- <bankCurrencyPop ref="bankCurrencyPop" @toBankCurrency="toBankCurrency" /> -->
    <verTransaPwd ref='verTransaPwd' @varTransaSu='toBankCurrency'></verTransaPwd>
    <electronicVoucher ref="electronicVoucher"></electronicVoucher>
  </div>
</template>

<script>
import verTransaPwd from '@/components/verTransaPwd' //验证交易密码
import cancelOrder from "@/components/cancelOrder";
import confirmPay from "@/components/confirmPay";
import QRCode from "qrcodejs2";
import copy from "@/components/copy";
import userInfoApi from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
import { customerService } from "@/utils";
// import bankCurrencyPop from './components/bankCurrencyPop.vue'
// 电子凭证弹框
import electronicVoucher from '@/views/web/electronicVoucher'
export default {
  name: "BuyDateils",
  components: {
    copy,
    confirmPay,
		cancelOrder,
    // bankCurrencyPop,
    electronicVoucher,
     verTransaPwd
  },
  data() {
    return {
      orderDateils: {
        orderState: 0, //    "orderState":   订单状态 0, 订单待提交  1-新建，待支付 2-待放行 3-已完成 4-已取消 5-申述中
        id: "",
        totalMoney: "", // 总价
        tradeAmount: "", // 币种数量
        coinToCny: "", // 单价
        receiveBindInfoDetail: {}
      },
      payment: {
        account: "",
        name: ""
      },
      address: "",
			orderTime: "",
			countdown: 0 // 倒计时
    };
  },
  created() {
    const id = this.$route.query.id;
    this.orderDateils.id = id;
    this.getDateils();
  },
  mounted() {},
  destroyed() {
    clearInterval(this.orderTime);
  },
  methods: {
     generateCredentials(){
      this.$refs.electronicVoucher.show(this.orderDateils)
    },
		// 放行币二次确认弹框
    bankCurrency() {
      // this.$refs.bankCurrencyPop.show()
       this.$refs.verTransaPwd.show()
    },
		toBankCurrency(value) {
      orderInfoApi.receiveOrder({
        id: this.orderDateils.id,
        tradePwd : value
      }).then(res => {
        console.log(res)
        // this.$refs.bankCurrencyPop.hide()
        this.$refs.verTransaPwd.hide()
				this.getDateils()
      }).catch(err => {
        console.log(err)
        // this.$refs.bankCurrencyPop.hide()
        this.$refs.verTransaPwd.hide()
        this.$toast(err.data.message)
      })
    },
    getDateils() {
      this.orderDateils.id = this.$route.query.id;
      orderInfoApi
        .getOrderDetail({
          id: this.orderDateils.id
        })
        .then(res => {
					res = res.data.data;
					this.countdown = res.restTime - 0
          this.orderDateils = Object.assign(this.orderDateils, res);
          this.orderDateils.orderState = res.orderState - 0;
          this.orderDateils.totalMoney = (res.totalMoney - 0).toFixed(2);
          this.orderDateils.tradeAmount = res.tradeAmount;
          this.orderDateils.coinToCny = res.tradePrice;
          this.orderDateils.createTime = res.createTime - 0;
          if (this.orderDateils.orderState == 1) {
            this.getWalletAddress();
            console.log(11);
          }
          if (
            this.orderDateils.orderState == 7 ||
            this.orderDateils.orderState == 1
          ) {
            this.getOrderTime();
          }
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    // // 获取银行卡信息
    // getPayment() {
    //   userInfoApi
    //     .getPayment({
    //       bindType: 1
    //     })
    //     .then(res => {
    //       this.payment = res.data.data;
    //     })
    //     .catch(err => {
    //       this.$toast(err.data.message);
    //     });
    // },
    // 获取充币地址
    getWalletAddress() {
      orderInfoApi
        .getWalletAddress({
          coinName: "USDT",
          type: 1
        })
        .then(res => {
          this.address = res.data.data.address;
          //   this.addCode()
        });
    },
    // 生成二维码
    addCode() {
      this.$nextTick(() => {
        var o = document.getElementById("qrcode");
        console.log(o);
        var w = o.offsetWidth;
        var h = o.offsetHeight;
        new QRCode(this.$refs.qrcode, {
          width: w, // 设置宽度，单位像素
          height: h, // 设置高度，单位像素
          text: this.address // 设置二维码内容或跳转地址
        });
      });
    },
    // 提交订单
    addOrder() {
      orderInfoApi
        .orderFast({
          totalMoney: this.orderDateils.totalMoney,
          payment: 1,
          payerName: this.payment.payment,
          tradeType: 2
        })
        .then(res => {
          this.$router.push({
            path: "/sellDateils",
            query: {
              id: res.data.data
            }
          });
          this.getDateils();
        });
    },
    // 返回上一页 取消订单
    toReturn() {
      this.$router.go(-1);
    },
    // 联系客服
    customer() {
      customerService();
    },
    // 查看全部订单
    allOrder() {
      this.$router.push({
        path: "/orderList"
      });
    },
    // 改变订单状态
    changeState() {
      console.log("改变订单状态");
    },
    // 循环请求订单数据
    getOrderTime() {
      clearInterval(this.orderTime);
      this.orderTime = setInterval(() => {
        orderInfoApi
          .getOrderDetail({
            id: this.orderDateils.id
          })
          .then(res => {
						res = res.data.data;
						this.countdown = res.restTime - 0
            res.orderState = res.orderState - 0;
            if (res.orderState != this.orderDateils.orderState) {
              this.getDateils();
            }
          })
          .catch(err => {});
      }, 5000);
    },
    showPop(val) {
      this.$refs[val].show(2);
    },
    payOrder() {
      orderInfoApi
        .activateOrder({
          id: this.orderDateils.id
        })
        .then(res => {
          this.$toast("操作成功");
          this.$refs.confirmPay.hide();
          this.getDateils();
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.buyDateils {
  .content {
    margin: 0 auto;
    padding: 40px 0;
    width: 790px;
    .pointer{
      cursor: pointer;
    }
    .dateils {
      width: 100%;
      padding-bottom: 73px;
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 4px;

      .header {
        padding: 23px 0 14px 37px;
        border-bottom: 1px solid #c8c8c8;

        .header_img {
          width: 24px;
          height: auto;
        }

        .title {
          padding-left: 6px;
          font-weight: bold;
          font-size: 24px;
          line-height: 34px;
          color: #f46666;

          &.wait_txt {
            color: #f2a145;
          }

          &.succ_txt {
            color: #00cf00;
          }

          &.close_txt {
            color: #a0a0b3;
          }
          &.sell {
            color: #f2a145;
          }
        }

        .sub_title {
          padding-top: 5px;
          font-size: 13px;
          line-height: 15px;
          color: #a0a0b3;

          .active {
            color: #40405e;
          }
				}
				.head_time{

      display: flex;
      align-items: center;
      .times {
        color: #40405e;
      }

    }
      }

      .msg {
        padding: 24px 0 0 37px;
        width: 482px;
        box-sizing: content-box;

        .num_box {
          padding: 19px;
          background: #f7f7fa;
          border-radius: 4px;

          .total {
            font-weight: bold;
            font-size: 24px;
            line-height: 28px;
            color: #40405e;

            .active {
              color: #f46666;
            }
          }

          .priec {
            padding-top: 14px;
            font-size: 14px;
            line-height: 16px;
            color: #40405e;

            .active {
              padding-right: 12px;
            }
          }

          .num {
            padding-top: 6px;
            font-size: 14px;
            line-height: 16px;
            color: #40405e;

            .active {
              padding-right: 12px;
            }
          }

          .desc {
            padding-top: 6px;
            font-size: 12px;
            line-height: 14px;
            color: #f46666;
          }
          .skfs_txt {
            padding: 4px 0 0 0;
            font-size: 14px;
            line-height: 16px;
            color: #4f5669;
          }
        }

        .transfer_desc {
          padding-top: 24px;
          font-size: 14px;
          line-height: 18px;
          color: #a0a0b3;

          .active {
            color: #f2a145;
          }
        }
				.numform_tips {
    font-size: 12px;
    line-height: 17px;
		color: #f46666;
		padding-top: 6px;
  }
        .msg_list {
          .item {
            padding-top: 16px;
            font-size: 14px;
            line-height: 16px;
            color: #40405e;

            .zffs_img {
              margin-left: 5px;
              width: 28px;
              height: 28px;
            }

            .item_copy_box {
              padding-left: 20px;
            }
              .item_pz{
              width: 6px ;
              margin-left: 20px ;
            }
            .warning_box {
              width: 305px;
              text-align: right;
            }
          }
        }

        .remarks_box {
          padding-top: 24px;
          font-size: 12px;
          line-height: 20px;
          color: #f2a145;

          .remarks_img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
          }
        }
        .adder_box {
          .adder_tab {
            padding-top: 24px;
            .tab_label {
              font-size: 16px;
              line-height: 19px;
              color: #40405e;
            }
            .tab_item {
              position: relative;
              margin-left: 15px;
              line-height: 28px;
              width: 104px;
              border: 1px solid #a0a0b3;
              border-radius: 16px;
              background: #ffffff;
              text-align: center;
              font-size: 14px;
              color: #40405e;
              &.active {
                border: 1px solid @cl-m;
                background: rgba(12, 179, 151, 0.1);
                color: @cl-m;
              }
              .label_img_box {
                position: absolute;
                left: 0;
                top: 32px;
                width: 100%;
                text-align: center;
                .label_img {
                  width: 52px;
                  height: auto;
                }
              }
            }
          }
          .adder_er {
            padding-top: 27px;
            .adder_er_img {
              width: 143px;
              height: 143px;
            }
          }
        }
      }
      .adder_msg {
        padding: 18px 0 0 37px;
        .txt1 {
          font-size: 13px;
          line-height: 18px;
          color: #40405e;
        }
        .txt2 {
          padding: 0 10px;
          font-size: 12px;
          line-height: 18px;
          color: #a0a0b3;
        }
      }
      .btn_box {
        padding: 40px 0 0 37px;

        .bnt_1 {
          width: 170px;
          line-height: 48px;
          background: @gd-m2;
          border: 1px solid @cl-m;
          border-radius: 41px;
          font-size: 16px;
          color: #ffffff;
          text-align: center;
        }

        .bnt_2 {
          width: 170px;
          line-height: 48px;
          border: 1px solid @cl-m;
          border-radius: 41px;
          font-size: 16px;
          color: @cl-m;
          text-align: center;
        }

        .bnt_3 {
          width: 170px;
          line-height: 48px;
          background: #dddde6;
          border: 1px solid #dddde5;
          border-radius: 41px;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
        }

        .btn {
          margin-right: 30px;
          box-sizing: content-box;
        }

        .bnt_len {
          width: 226px;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .buyDateils {
    .content {
      padding: 40px * 0.9 0;
      width: 790px * 0.9;

      .dateils {
        padding-bottom: 73px * 0.9;

        .header {
          padding: 23px * 0.9 0 14px * 0.9 37px * 0.9;

          .header_img {
            width: 24px * 0.9;
            height: auto;
          }

          .title {
            font-size: 24px * 0.9;
            line-height: 34px * 0.9;
          }

          .sub_title {
            font-size: 13px * 0.9;
            line-height: 15px * 0.9;
          }
        }

        .msg {
          padding: 24px * 0.9 0 0 37px * 0.9;
          width: 482px * 0.9;

          .num_box {
            padding: 19px * 0.9;

            .total {
              font-size: 24px * 0.9;
              line-height: 28px * 0.9;
            }

            .priec {
              padding-top: 14px * 0.9;
              font-size: 14px * 0.9;
              line-height: 16px * 0.9;

              .active {
                padding-right: 12px * 0.9;
              }
            }

            .num {
              font-size: 14px * 0.9;
              line-height: 16px * 0.9;

              .active {
                padding-right: 12px * 0.9;
              }
            }

            .desc {
              font-size: 12px * 0.9;
              line-height: 14px * 0.9;
            }
          }

          .transfer_desc {
            padding-top: 24px * 0.9;
            font-size: 14px * 0.9;
            line-height: 18px * 0.9;
          }

          .msg_list {
            .item {
              padding-top: 16px * 0.9;
              font-size: 14px * 0.9;
              line-height: 16px * 0.9;

              .zffs_img {
                width: 28px * 0.9;
                height: 28px * 0.9;
              }

              .item_copy_box {
                padding-left: 20px * 0.9;
              }
                .item_pz{
              width: 6px * 0.9;
              margin-left: 20px * 0.9;
            }
              .warning_box {
                width: 305px * 0.9;
              }
            }
          }

          .remarks_box {
            padding-top: 24px * 0.9;

            .remarks_img {
              width: 16px * 0.9;
              height: 16px * 0.9;
            }
          }
        }

        .btn_box {
          padding: 40px * 0.9 0 0 37px * 0.9;

          .bnt_1 {
            width: 170px * 0.9;
            line-height: 48px * 0.9;
            border-radius: 41px * 0.9;
            font-size: 16px * 0.9;
          }

          .bnt_2 {
            width: 170px * 0.9;
            line-height: 48px * 0.9;
            border-radius: 41px * 0.9;
            font-size: 16px * 0.9;
          }

          .bnt_3 {
            width: 170px * 0.9;
            line-height: 48px * 0.9;
            border-radius: 41px * 0.9;
            font-size: 16px * 0.9;
          }

          .btn {
            margin-right: 30px * 0.9;
          }

          .bnt_len {
            width: 226px * 0.9;
          }
        }
      }
    }
  }
}

@media (max-width: 860px) {
  .buyDateils {
    .content {
      width: 790px * 0.8;
    }
  }
}
</style>
