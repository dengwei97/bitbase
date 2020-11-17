<template>
  <div>
    <div class="pop_absolute_box" v-if="pop">
      <div class="pop_absolute_box_bg"  @click="hide"></div>
      <div class="popup1" v-if="pop" >
        <div class="content" ref="bill" :style="{ backgroundImage: 'url(' + $appConfig.source.img_web_sy.src + ')'  }">
          <div class="content_title">
            <h1>已完成</h1>
            <p class="text">此电子凭证仅作为{{$appConfig.upperName}}平台中 <br>
              数字货币交易完成证明</p>
            <img class="seal"  :src='$appConfig.source.img_seal_bitbase.src' alt="">
          </div>
          <ul class="text">
            <li>
              <div>{{details.tradeType == 1 ? '卖家昵称' : '买家昵称'}}</div>
              <div>{{details.businessNickName}}</div>
            </li>
            <li>
              <div>{{details.tradeType == 1 ? '卖家实名' : '买家实名'}}</div>
              <div>{{details.businessRealName}}</div>
            </li>
            <li>
              <div>交易金额</div>
              <div>{{details.totalMoney}} CNY</div>
            </li>
            <li>
              <div>单价</div>
              <div>{{details.tradePrice }} CNY</div>
            </li>
            <li>
              <div>交易数量</div>
              <div>{{details.tradeAmount}} {{details.coinName}}</div>
            </li>
            <li>
              <div>交易类型</div>
              <div>{{details.tradeType==1?"购买":'出售'}} {{details.coinName}}</div>
            </li>
            <li v-if="details.tradeType == 1">
              <div>USDT接收地址</div>
              <div class="usdt_address">{{details.formAddress}}</div>
            </li>
            <li>
              <div>平台订单号</div>
              <div>{{details.id}}</div>
            </li>
            <li v-if='details.billNo'>
              <div>商家订单号</div>
              <div>{{details.billNo}}</div>
            </li>
            <li>
              <div>{{details.tradeType == 1 ? '付款方式' : '收款方式'}}</div>
              <div class="bindType">
                <div>{{details.receiveBindInfoDetail.bindType == 1 ? '银行卡' : details.receiveBindInfoDetail.bindType == 2 ? '微信' : '支付宝'}}</div>
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
              </div>
            </li>
            <li v-if="details.tradeType == 1 && details.tradeFee">
              <div>转账手续费</div>
              <div>{{details.tradeFee}}USDT</div>
            </li>
            <li>
              <div>订单创建时间</div>
              <div>{{details.createTime - 0 | getTimeData}}</div>
            </li>
            <li>
              <div>交易结束时间</div>
              <div>{{details.updateTime - 0 | getTimeData}}</div>
            </li>
            
          </ul>
        </div>
          <button @click="download">保存图片</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      pop: false,
      details:[],
      
    };
  },

  created() {},
  mounted(){
  },
  methods: {
    download(){
      html2canvas(this.$refs.bill, {}).then((canvas) => {
        let imageUrl = canvas.toDataURL("image/png");
        // console.log(imageUrl)
        this.imageUrl = imageUrl;
        const a = document.createElement("a");
        a.href = imageUrl.replace("image/png", "image/octet-stream");
        //设置下载文件的名字
        a.download = "订单电子凭证.png";
        //点击
        a.click();
      });
    },
    show(value) {
      this.details = value
      this.pop = true;
    },
    hide() {
      this.pop = false;
    },
  }
};
</script>

<style lang="less" scoped>
.popup1 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 550px;
  height: 660px;
  margin-top: -330px;
  margin-left: -275px;
  // transform: translate3d(calc(-50% + 0.5px), calc(-50% + 0.5px), 0);
  z-index: 2002;
  border-radius: 6px;
  .content{
    width: 100%;
    height: 100%;
    // background: url("../../../assets/img_web_sy.png") no-repeat;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 40px 84px;
    .text{
      font-size: 14px;
      line-height: 20px;
      color: #40405E;
    }
    .content_title{
      text-align: center;
      position: relative;
      h1{
        font-size: 24px;
        line-height: 34px;
        font-weight: 600;
        padding-bottom: 14px;
      }
      p{
        text-align: center;
        color: rgba(64, 64, 94, 0.8);
      }
      .seal{
        position: absolute;
        top: 0;
        right: 0;
        width: 162px;
      }
    }
    ul {
      padding-top: 28px;
      li{
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        .bindType{
          display: flex;
          align-items: center;
          .payimg{
            width: 28px;
            height: 28px;
            margin-left: 8px;
          }
        }
            .usdt_address{
            padding-left: 30px;
            flex: 1;
            word-break:break-all;
            text-align: right; 
          }
      }
    }
  }
    button{
    position: absolute;
    bottom: 0px;
    left: 104px;
      background: @cl-m;
      border-radius: 41px;
      font-size: 16px;
      width: 343px;
      height: 48px;
      color: #FFFFFF;
      margin-bottom: 46px;
    }
}

@media(max-width: 980px){
  .popup1 {
  width: 550px * 0.8;
  height: 660px * 0.8;
  margin-top: -330px * 0.8;
  margin-left: -275px * 0.8;
  .content{
    padding: 40px * 0.8 84px * 0.8;
    .text{
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
    }
    .content_title{
      h1{
        font-size: 24px * 0.8;
        line-height: 34px * 0.8;
        padding-bottom: 14px * 0.8;
      }
      .seal{
        width: 162px * 0.8;
      }
    }
    ul {
      padding-top: 28px * 0.8;
      li{
        padding-top: 12px * 0.8;
        .bindType{
          .payimg{
            width: 28px * 0.8;
            height: 28px * 0.8;
            margin-left: 8px * 0.8;
          }
        }
      }
    }
  }
    button{
    left: 104px * 0.8;
      width: 343px * 0.8;
      height: 48px * 0.8;
      margin-bottom: 46px * 0.8;
      font-size: 16px * 0.8;
    }
}
}
</style>
