<template>
  <div class="buyDateils">
    <div class="content">
      <div class="dateils">
        <!--        订单进行中 _请付款 _等待卖家转币 -->
        <div
          v-if="orderDateils.orderState == 1 || orderDateils.orderState == 2 || orderDateils.orderState == 6"
        >
          <!--                   顶部_请付款-->
          <div v-if="orderDateils.orderState == 1" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ic_buy_state_header.png" />
              <span class="title">请付款</span>
            </div>
            <div v-if="orderDateils.restTime > 0" class="sub_title">
              请在
              <span class="active">{{ timeStr }}</span> 内付款给卖家
            </div>
          </div>
          <!--       顶部_等待卖家转币-->
          <div v-if="orderDateils.orderState == 2 || orderDateils.orderState == 6" class="header">
            <div class="flex flex_middle img-box">
              <img class="header_img" src="@/assets/transactions/ic_buy_state_header_2.png" />
              <span class="title wait_txt">等待卖家转币</span>
            </div>
            <div v-if="orderDateils.restTime > 0" class="sub_title">
              预计在
              <span class="active">{{ timeStr }}</span>内收到资产
            </div>
            <div v-else class="sub_title">等待卖家转币到我的账户中</div>
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
              <div class="desc">*转账金额须一致，包含小数</div>
            </div>
            <div class="transfer_desc">
              请使用本(
              <span class="active">*{{ orderDateils.payBindInfoDetail.name.slice(1) }}</span>
              ）{{ orderDateils.receiveBindInfoDetail.bindType
                == 1?'银行卡':orderDateils.receiveBindInfoDetail.bindType == 2?'微信':'支付宝' }}向以下账户自行转账
            </div>
            <!--                        银行卡-->
            <div v-if="orderDateils.receiveBindInfoDetail.bindType == 1" class="msg_list">
              <div class="item flex flex_middle">
                <div class="label flex_1">支付方式</div>
                <div class="desc_text">银行卡</div>
                <img class="zffs_img" src="@/assets/transactions/ic_bankpay_yhq.png" />
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">持卡人</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">银行卡账号</div>
                <div class="desc_text">{{ orderDateils.receiveBindInfoDetail.account }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.receiveBindInfoDetail.account" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">开户银行</div>
                <div class="desc_text">{{ orderDateils.receiveBindInfoDetail.paymentCode }}</div>
              </div>
              <div class="item flex">
                <div class="label flex_1">所属分行</div>
                <div
                  class="desc_text warning_box"
                >{{ orderDateils.receiveBindInfoDetail.addition }}[切勿备注BTC、USDT等敏感字样，防冻结]、[本账户受公安系统检测，黑钱请自重]</div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家昵称</div>
                <div class="desc_text">{{ orderDateils.businessNickName }}</div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家实名</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
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
              <div class="item flex flex_middle" >
                <div class="label flex_1">USDT接收地址</div>
                <div class="desc_text">{{orderDateils.formAddress}}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.formAddress"></copy>
                </div>
              </div>
            </div>
            <!--                        微信-->
            <div v-if="orderDateils.receiveBindInfoDetail.bindType == 2" class="msg_list">
              <div class="item flex flex_middle">
                <div class="label flex_1">支付方式</div>
                <div class="desc_text">微信支付</div>
                <img class="zffs_img" src="@/assets/transactions/ic_bankpay_weixin.png" />
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">收款人</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">收款二维码</div>
                <img src="../../../assets/transactions/ico_qr_code_111.png" class="code_img" @click="showCode" />
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">微信支付</div>
                <div class="desc_text">{{ orderDateils.receiveBindInfoDetail.account }}转账不要备注</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.receiveBindInfoDetail.account" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家昵称</div>
                <div class="desc_text">{{ orderDateils.businessNickName }}</div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家实名</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
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
              <div class="item flex flex_middle" >
                <div class="label flex_1">USDT接收地址</div>
                <div class="desc_text">{{orderDateils.formAddress}}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.formAddress"></copy>
                </div>
              </div>
            </div>
            <!--                        支付宝-->
            <div v-if="orderDateils.receiveBindInfoDetail.bindType == 3" class="msg_list">
              <div class="item flex flex_middle">
                <div class="label flex_1">支付方式</div>
                <div class="desc_text">支付宝</div>
                <img class="zffs_img" src="@/assets/transactions/ic_bankpay_zfb.png" />
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">收款人</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">收款二维码</div>
                <img src="../../../assets/transactions/ico_qr_code_111.png" class="code_img" @click="showCode" />
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">支付宝支付</div>
                <div class="desc_text">{{ orderDateils.receiveBindInfoDetail.account }}转账不要备注</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.receiveBindInfoDetail.account" />
                </div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家昵称</div>
                <div class="desc_text">{{ orderDateils.businessNickName }}</div>
              </div>
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家实名</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
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
              <div class="item flex flex_middle" >
                <div class="label flex_1">USDT接收地址</div>
                <div class="desc_text">{{orderDateils.formAddress}}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.formAddress"></copy>
                </div>
              </div>
            </div>

            <div class="remarks_box flex flex_middle">
              <img class="remarks_img" src="@/assets/transactions/ic_addlak_buy.png" />
              <div>在转账过程中请勿备注BTC、USDT等信息，防止回款被拦截，银行卡被冻结等问题</div>
            </div>
          </div>
          <!--                   按钮_请付款-->
          <div v-if="orderDateils.orderState == 1" class="btn_box flex flex_middle">
            <div class="bnt_1 btn pointer" @click="showPop('confirmPay')">我已付款成功</div>
            <div class="bnt_2 btn pointer" @click="showPop('cancelOrder')">取消订单</div>
            <div class="bnt_2 btn pointer" @click="allOrder">查看所有订单</div>
          </div>
          <!--                   按钮_等待卖家转币-->
          <div
            v-if="orderDateils.orderState == 2 || orderDateils.orderState == 6"
            class="btn_box flex flex_middle"
          >
            <div class="bnt_1 btn pointer" @click="toReturn">返回</div>
            <button
              :class="{cancel_active:orderDateils.restTime <= 0}"
              :disabled="orderDateils.restTime >= 0"
              class="bnt_3 btn pointer"
              @click="showPop('cancelOrder')"
            >取消订单</button>
            <div class="bnt_2 btn pointer" @click="allOrder">查看所有订单</div>
          </div>
        </div>
        <!--        已完成\ 已取消 -->
        <div v-if="orderDateils.orderState == 3 || orderDateils.orderState == 4">
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
            </div>
            <div class="msg_list">
              <div class="item flex flex_middle">
                <div class="label flex_1">卖家昵称</div>
                <div class="desc_text">{{ orderDateils.businessNickName }}</div>
              </div>
              <div v-if="orderDateils.orderState == 3" class="item flex flex_middle">
                <div class="label flex_1">卖家实名</div>
                <div class="desc_text">{{ orderDateils.businessRealName }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.businessRealName" />
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
                <div class="label flex_1">下单时间</div>
                <div
                  class="desc_text"
                >{{ orderDateils.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</div>
              </div>
              <div v-if="orderDateils.orderState == 3" class="item flex flex_middle">
                <div class="label flex_1">USDT接收地址</div>
                <div class="desc_text">{{ orderDateils.formAddress }}</div>
                <div class="item_copy_box">
                  <copy :text="orderDateils.formAddress" />
                </div>
              </div>
              <div v-if="orderDateils.orderState == 3 && orderDateils.tradeFee" class="item flex flex_middle">
                <div class="label flex_1">转账手续费</div>
                <div class="desc_text">{{ orderDateils.tradeFee }}USDT</div>
              </div>
              <div class="item flex flex_middle" v-if="orderDateils.orderState == 3">
                <div class="label flex_1">电子凭证</div>
                <div class="flex flex_middle" style="cursor: pointer;" @click="generateCredentials">
                  <div class="desc_text" style="">生成电子凭证</div>
                  <img class="item_pz" src="@/assets/transactions/ico_arrow_right.png" alt="">
                </div>
              </div>
            </div>
            <div v-if="orderDateils.orderState == 3" class="remarks_box flex flex_middle">
              <img class="remarks_img" src="@/assets/transactions/ic_addlak_buy.png" />
              <div>付款成功后,USDT将存入您的充值地址，请前往网站钱包进行查看</div>
            </div>
          </div>
          <div class="btn_box flex flex_middle">
            <div class="bnt_1 bnt_len btn pointer" @click="toReturn">返回</div>
            <div class="bnt_2 bnt_len btn pointer" @click="allOrder">查看所有订单</div>
          </div>
        </div>
      </div>
    </div>
    <!--        转账完成的二次确认-->
    <div v-show="popShow" class="pop">
      <div class="pop_content">
        <div class="img-box">
          <img class="qr_img" src="@/assets/transactions/ic_paid_yellow.png" />
        </div>
        <div class="txt_1">确认已向展示的账户完成转账</div>
        <div class="txt_2">恶意点击将直接冻结您的账户</div>
        <div class="btn_box flex">
          <div class="btn flex_1" @click="statePop(false)">取消</div>
          <div class="btn flex_1">我已付款成功</div>
        </div>
      </div>
    </div>
    <QRcode ref="QRcode" />
    <cancelOrder ref="cancelOrder" @cancelOrder="cancelOrder" />
    <confirmPay ref="confirmPay" @confirmPay="payOrder" />
      <electronicVoucher ref="electronicVoucher"></electronicVoucher>
  </div>
</template>

<script>
import cancelOrder from "@/components/cancelOrder";
import confirmPay from "@/components/confirmPay";
import copy from "@/components/copy";
import QRcode from "@/components/QRcode";
import userInfoApi from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
import { customerService } from "@/utils";
// 电子凭证弹框
import electronicVoucher from '@/views/web/electronicVoucher'
export default {
  name: "BuyDateils",
  components: {
    copy,
    QRcode,
    confirmPay,
    cancelOrder,
     electronicVoucher
  },
  data() {
    return {
      popShow: false,
      orderDateils: {
        orderState: 0, //    "orderState":   订单状态 0, 订单待提交  1-新建，待支付 2-待放行 3-已完成 4-已取消 5-申述中
        id: "",
        totalMoney: "", // 总价
        tradeAmount: "", // 币种数量
        coinToCny: "", // 单价
        restTime: 0 // 倒计时
      },
      setTime: undefined,
      timeStr: "",
      userInfo: "",
      orderTime: ""
    };
  },
  created() {
    this.getDateils();
    // this.getUserInfo()
  },
  mounted() {},
  destroyed() {
    clearInterval(this.orderTime);
  },
  methods: {
    generateCredentials(){
      this.$refs.electronicVoucher.show(this.orderDateils)
    },
    customer() {
      customerService();
    },
    // 获取订单详情
    getDateils() {
      this.orderDateils.id = this.$route.query.id;
      orderInfoApi
        .getOrderDetail({
          id: this.orderDateils.id
        })
        .then(res => {
          res = res.data.data;
          console.log("11", this.orderDateils.orderState);
          this.orderDateils = Object.assign(this.orderDateils, res);
          this.orderDateils.orderState = res.orderState - 0;
          this.orderDateils.restTime = res.restTime - 0;
          this.orderDateils.totalMoney = (res.totalMoney - 0).toFixed(2);
          this.orderDateils.tradeAmount = res.tradeAmount;
          this.orderDateils.coinToCny = res.tradePrice;
          this.orderDateils.createTime = res.createTime - 0;
          this.orderDateils.businessNickName = res.businessNickName;
          //   this.time()
          if (
            this.orderDateils.orderState == 2 ||
            this.orderDateils.orderState == 6 ||
            this.orderDateils.orderState == 1
          ) {
            this.time();
            this.getOrderTime();
          }
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
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
            console.log("22", res.orderState);
            if (res.orderState != this.orderDateils.orderState) {
              this.getDateils();
            }
          });
      }, 5000);
    },
    // 用户基本信息
    getUserInfo() {
      userInfoApi
        .getUserInfo()
        .then(res => {
          this.userInfo = res.data.data;
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    statePop(state) {
      this.popShow = state || false;
    },
    showCode() {
      if (this.orderDateils.receiveBindInfoDetail.paymentCode) {
        this.$refs.QRcode.show(
          this.orderDateils.receiveBindInfoDetail.paymentCode
        );
      } else {
        this.$toast('该用户未上传收款二维码请根据转账信息完成转账')
      }
    },
    // 返回上一页 取消订单
    toReturn() {
      this.$router.go(-1);
    },
    // 查看全部订单
    allOrder() {
      this.$router.push({
        path: "/orderList"
      });
    },
    // 倒计时
    time() {
      clearInterval(this.setItem);
      this.setItem = setInterval(() => {
        if (this.orderDateils.restTime <= 0) {
          clearInterval(this.setItem);
          // this.getDateils()
        } else {
          this.timeStr = this.formatTime(this.orderDateils.restTime);
          this.orderDateils.restTime = this.orderDateils.restTime - 1000;
        }
      }, 1000);
    },
    formatTime(num) {
      num = (num - 0) / 1000;
      let temp = 0;
      let str = "";
      if (num > 60 * 60) {
        str = str + Math.floor(num / (60 * 60)) + ":";
        num = num % (60 * 60);
      }
      if (num > 60) {
        temp = Math.floor(num / 60);
        temp = temp >= 10 ? temp : "0" + "" + temp;
        str = str + temp + ":";
        num = num % 60;
      }
      temp = Math.floor(num);
      temp = temp >= 10 ? temp : "0" + "" + temp;
      str = str + temp;
      return str;
    },
    // 确认已付款
    payOrder() {
      orderInfoApi
        .payOrder({
          id: this.orderDateils.id
        })
        .then(res => {
          this.getDateils();
          this.$toast("操作成功");
          this.$refs.confirmPay.hide();
          this.$refs.cancelOrder.hide();
        })
        .catch(err => {
          this.$toast(err.data.message);
          this.$refs.confirmPay.hide();
          this.$refs.cancelOrder.hide();
        });
    },
    // 确认已取消
    cancelOrder() {
      orderInfoApi
        .cancelOrder({
          id: this.orderDateils.id
        })
        .then(res => {
          this.getDateils();
          this.$toast("操作成功");
          this.$refs.confirmPay.hide();
          this.$refs.cancelOrder.hide();
        })
        .catch(err => {
          this.$toast(err.data.message);
          this.$refs.confirmPay.hide();
          this.$refs.cancelOrder.hide();
        });
    },
    showPop(val) {
      this.$refs[val].show(1);
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
              width: 6px;
              margin-left: 20px;
            }
            .warning_box {
              width: 305px;
              text-align: right;
            }
          }

          .code_img {
            width: 16px;
            height: 16px;
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
        .cancel_active {
          background: @gd-m2;
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

.pop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .pop_content {
    width: 440px;
    /*height: 322px;*/
    padding-top: 48px;
    background: #ffffff;
    border-radius: 4px;
    text-align: center;

    .qr_img {
      width: 72px;
      height: auto;
    }

    .txt_1 {
      padding-top: 20px;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #40405e;
    }

    .txt_2 {
      padding: 6px 0 65px;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #f46666;
    }

    .btn_box {
      border-top: 1px solid #f5f5fa;

      .btn {
        line-height: 70px;
        text-align: center;
        font-size: 16px;
        color: #a0a0b3;

        &:first-child {
          border-right: 1px solid #f5f5fa;
        }

        &:last-child {
          color: @cl-m;
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
              margin-left: 20px * 0.9;
            }
              .warning_box {
                width: 305px * 0.9;
              }
            }

            .code_img {
              width: 16px * 0.9;
              height: 16px * 0.9;
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

  .pop {
    .pop_content {
      width: 440px * 0.9;
      padding-top: 48px * 0.9;

      .qr_img {
        width: 72px * 0.9;
        height: auto;
      }

      .txt_1 {
        padding-top: 20px * 0.9;
        font-size: 16px * 0.9;
        line-height: 19px * 0.9;
      }

      .txt_2 {
        padding: 6px 0 65px * 0.9;
        font-size: 14px * 0.9;
        line-height: 16px * 0.9;
      }

      .btn_box {
        .btn {
          line-height: 70px * 0.9;
          font-size: 16px * 0.9;
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
