<template>
  <div class="electronicCertificate">
    <div class="content" v-if="details">
      <div class="co" ref="save" >
        <img class="bg" :src='$appConfig.source.img_sy.src' alt />
        <div class="title">
          <h3>交易成功</h3>
          <p>
            此电子凭证仅作为{{$appConfig.upperName}}平台中
            <br />数字货币交易完成证明
          </p>
          <img :src='$appConfig.source.img_seal_bitbase.src' alt />
        </div>
        <ul class="con">
          <li class="list">
            <span v-if="details.tradeType==1">卖家昵称</span>
            <span v-if="details.tradeType==2">买家昵称</span>
            <span>{{details.businessNickName}}</span>
          </li>
          <li class="list">
            <span v-if="details.tradeType==1">卖家实名</span>
            <span v-if="details.tradeType==2">买家实名</span>
            <span>{{details.businessRealName}}</span>
          </li>
          <li class="list">
            <span>交易金额</span>
            <span>{{details.totalMoney}} CNY</span>
          </li>
          <li class="list">
            <span>单价</span>
            <span>{{details.tradePrice }} CNY</span>
          </li>
          <li class="list">
            <span>交易数量</span>
            <span>{{details.tradeAmount}} {{details.coinName}}</span>
          </li>
          <li class="list" v-if="details.tradeType==1">
            <span>手续费</span>
            <span>{{details.tradeFee}} {{details.coinName}}</span>
          </li>
          <li class="list" v-if="details.tradeType==1">
            <span>USDT接收地址</span>
            <p style="width: 4rem;white-space:pre-wrap;">{{details.formAddress}}</p>
          </li>
          <li class="list">
            <span>交易类型</span>
            <span >{{details.tradeType==1?"购买":'出售'}} {{details.coinName}}</span>
          </li>
          <li class="list">
            <span style="white-space : nowrap">平台订单号</span>
            <p style="width: 4rem;white-space:pre-wrap;">{{details.id}}</p>
          </li>
          <li class="list" v-show="details.billNo">
            <span style="white-space : nowrap;">商家订单号</span>
            <p style="width: 4rem;white-space:pre-wrap;">{{details.billNo}}</p>
          </li>
          <li class="list">
            <span v-if="details.tradeType==1">付款方式</span>
            <span v-if="details.tradeType==2">收款方式</span>
            <span>
              <span
                v-if="details.tradeType==2"
              >({{details.receiveBindInfoDetail.account | lastFour}})</span>
              <span v-if="details.receiveBindInfoDetail.bindType == 1 ">银行卡</span>
              <span v-if="details.receiveBindInfoDetail.bindType == 2 ">微信</span>
              <span v-if="details.receiveBindInfoDetail.bindType == 3 ">支付宝</span>
              <img
                v-if="details.receiveBindInfoDetail.bindType == 1 "
                class="payimg"
                src="@/assets/transactions/ico_bankpay.png"
                alt
              />
              <img
                v-if="details.receiveBindInfoDetail.bindType == 2 "
                class="payimg"
                src="@/assets/transactions/ico_weixinpay.png"
                alt
              />
              <img
                v-if="details.receiveBindInfoDetail.bindType == 3 "
                class="payimg"
                src="@/assets/transactions/ico_alipay.png"
                alt
              />
            </span>
          </li>
          <li class="list">
            <span>订单创建时间</span>
            <span>{{details.createTime - 0 | getTimeData}}</span>
          </li>
          <li class="list">
            <span>交易结束时间</span>
            <span>{{details.updateTime - 0 | getTimeData}}</span>
          </li>
        </ul>
      </div>
      <div class="btn">
        <button class="bt" @click="save()">保存到手机相册</button>
      </div>
    </div>
  </div>
</template>

<script>
import buyApi from "@/api/buy.js";
import html2canvas from "html2canvas";
export default {
  name: "electronicCertificate",
  data() {
    return {
      details: "",
      imgUrl: ""
    };
  },
  created() {
    const id = this.$route.params.id
    buyApi
        .orderdetail({
          id: id
        })
        .then(res => {
          this.details = res.data.data;
        })
        .catch(err => {
          // console.log(err);
        });
    console.log(this.details);
  },
  methods: {
    //生成并存储图片
    save() {
      html2canvas(this.$refs.save).then(canvas => {
        //获取图片base64地址,如果想要展示图片即可直接展示
        // let dataURL = canvas.toDataURL("image/png");
        // this.imgUrl = dataURL;
        //创建一个a标签，直接下载生成的图片
        let link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.setAttribute("download", "电子凭证.png");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.electronicCertificate {
  padding: 0.4rem 0.3rem;
  background: #f7f7fa;

  .content {
    width: 100%;
    background: white;
    position: relative;

    .bg {
      position: absolute;
      top: 0;
      height: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .co {
      z-index: 100;
      .title {
        z-index: 100;
        position: relative;
        h3 {
          margin: 0;
          padding: 0.6rem 0 0.2rem;
          font-weight: bold;
          font-size: 0.4rem;
          line-height: 0.56rem;
          color: #40405e;
          text-align: center;
        }

        p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          text-align: center;
        }

        img {
          position: absolute;
          width: 3.28rem;
          height: 2.56rem;
          right: 0;
          top: 0.6rem;
          z-index: 10;
        }
      }

      .con {
        position: relative;
        z-index: 10;
        margin-top: 0.82rem;
        padding: 0 0.32rem;

        .list {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #40405e;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.3rem 0;
          border-bottom: 0.02rem solid #f5f5fa;
          span {
            display: flex;
            align-items: center;

            img {
              margin-left: 0.16rem;
              width: 0.56rem;
              height: 0.56rem;
            }
          }
          p {
            text-align: right;
          }
        }

        .list:last-child {
          border: none;
        }
      }
    }

    .btn {
      z-index: 10;
      padding: 0.06rem;
      height: 1.16rem;
      display: flex;
      position: relative;

      .bt {
        margin: 0;
        width: 100%;
        height: 100%;
        background: #f7f7fa;
        border-radius: 0 0 0.04rem 0.04rem;
        font-weight: 500;
        font-size: 0.28rem;
        color: @cl-m;
      }
    }
  }
}
</style>