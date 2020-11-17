<template>
  <div class="Charges">
    <div class="address">
      <div class="address_header">
        <div class="header_left">
          <img src="@/assets/transactions/ico_usdt.png" alt />
          <div class="headerText">USDT</div>
        </div>
        <div class="header_r">充币</div>
      </div>
      <div class="addressRow2">
        <div class="chainName">
          <div class="chainName1">链名称</div>
          <div class="chainName2">ERC20</div>
        </div>
        <div class="qrcode">
          <div id="qrcode1" ref="qrcode1" class="qrcodeImg"></div>
          <div class="qrcodeText" @click="saveQrcode">保存二维码</div>
        </div>
      </div>
    </div>
    <div class="addressbottom">
      <div class="addressTitle">充币地址</div>
      <div class="addressCopy">
        <div class="addressNum">{{ address.address }}</div>
        <copy class="copy" :text="address.address" />
      </div>
    </div>
    <div class="tips">
      <div class="tipsTitle">
        <img class="tipImg" src="@/assets/transactions/ico_tip_small.png" alt />
        <div class="tipheadText">温馨提示</div>
      </div>
      <ul class="tipsList">
        <li>
          <div class="label"></div>
          <span class="tipText">充入上述地址成功后，充入的数字货币不可以转出，只可以进行交易，充入预计交易的数量即可。</span>
        </li>
        <li>
          <div class="label"></div>
          <span class="tipText">请勿向上述地址充值任何非 ERC20_USDT资产，否则资产将不可找回。</span>
        </li>
        <li>
          <div class="label"></div>
          <span class="tipText">您充值至上述地址后，需要整个网络节点的确认，12次网络确认后到账，12次网络确认后可提币。</span>
        </li>
        <li>
          <div class="label"></div>
          <span class="tipText">最小充值金额为：1USDT，小于最小金额充值将不会到账且无法退回。</span>
        </li>
        <li>
          <div class="label"></div>
          <span class="tipText">您的充值地址不会经常改变，可以重复充值；如有改变，我们会尽量通过公告或邮件通知您。</span>
        </li>
        <li>
          <div class="label"></div>
          <span class="tipText">请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import copy from "@/components/copy/index";
import buyApi from "@/api/buy.js";
// 地址转二维码
import QRCode from "qrcodejs2";
export default {
  name: "Charges",
  components: {
    copy
  },
  data() {
    return {
      address: [] // 充币地址
    };
  },
  created() {},
  mounted() {
    this.getaddress();
  },
  methods: {
    // 获取充币地址
    getaddress() {
      buyApi
        .getaddress({
          coinName: "USDT",
          type: 1
        })
        .then(res => {
          this.address = res.data.data;
          // console.log(res.data.data);
          this.$nextTick(() => {
            var o = document.getElementById("qrcode1");
            // console.log(o);
            var w = o.offsetWidth;
            var h = o.offsetHeight;
            new QRCode(this.$refs.qrcode1, {
              width: w, // 设置宽度，单位像素
              height: h, // 设置高度，单位像素
              text: res.data.data.address // 设置二维码内容或跳转地址
            });
          });
        })
        .catch(err => {
          // console.log(err);
           this.$toast(err.data.message);
        });
    },
    saveQrcode() {
      // 找到canvas标签
      const myCanvas = document.getElementById('qrcode1').getElementsByTagName('canvas')
      // 创建一个a标签节点
      const a = document.createElement('a')
      // 设置a标签的href属性（将canvas变成png图片）
      a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream')
      // 设置下载文件的名字
      a.download = '充币二维码.png'
      // 点击
      a.click()
    }
  }
};
</script>

<style lang="less" scoped>
.Charges {
  width: 100%;
  min-height: 100vh;
  background: @gd-m4;
  padding: 0.64rem;
  .address {
    padding: 0.32rem 0.32rem 0 0.32rem;
    background: #ffffff;
    border-radius: 0.12rem 0.12rem 0 0;
    .address_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #f5f5fa;
      .header_left {
        display: flex;
        align-items: center;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
        .headerText {
          padding-left: 0.24rem;
          font-weight: 500;
          font-size: 0.36rem;
          line-height: 0.42rem;
          color: #40405e;
        }
      }
      .header_r {
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #40405e;
      }
    }
    .addressRow2 {
      padding-top: 0.32rem;
      .chainName {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .chainName1 {
          font-size: 0.28rem;
          color: #40405e;
        }
        .chainName2 {
          font-size: 0.3rem;
          color: #000000;
        }
      }
      .qrcode {
        padding-top: 0.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .qrcodeImg {
          width: 3.52rem;
          height: 3.52rem;
        }
        .qrcodeText {
          margin: 0.48rem 0 0.54rem;
          width: 2.1rem;
          height: 0.64rem;
          line-height: 0.64rem;
          background: #f7f7fa;
          border-radius: 0.48rem;
          font-size: 0.26rem;
          text-align: center;

          color: @cl-m;
        }
      }
    }
  }
  .addressbottom {
    background: #f7f7fa;
    padding: 0.28rem 0.32rem;
    border-radius: 0 0 0.12rem 0.12rem;
    .addressTitle {
      font-size: 0.26rem;
      line-height: 0.36rem;
      color: #40405e;
    }
    .addressCopy {
      padding-top: 0.08rem;
      display: flex;
      align-items: center;
      .copy {
        margin-left: 0.12rem;
      }

      .addressNum {
        font-size: 0.24rem;
        line-height: 0.36rem;
        color: #a0a0b3;
        flex: 1;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }
  }
  .tips {
    margin-top: 0.24rem;
    padding: 0.32rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.12rem;
    .tipsTitle {
      display: flex;
      align-items: center;
      .tipImg {
        width: 0.32rem;
        height: 0.32rem;
      }
      .tipheadText {
        padding-left: 0.16rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #fcc478;
      }
    }
    .tipsList li{
      display: flex;
      padding-top:0.24rem ;
      .label {
        margin-top: 0.12rem;
        width: 0.12rem;
        height: 0.12rem;
        background: #ffffff;
        transform: rotate(45deg);
        flex-shrink: 0;
      }
      .tipText {
        padding-left: 0.26rem;
        font-size: 0.24rem;
        color: #ffffff;
      }
    }
  }
}
</style>
