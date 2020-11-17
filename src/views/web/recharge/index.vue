<template>
  <div class="recharge">
    <div class="wapper_box">
      <div class="header_box">充币USDT</div>
      <div class="content">
        <!-- <div class="name_box flex flex_middle">
          <div class="label">链名称</div>
          <div class="name">ERC20</div>
        </div>-->
        <div class="qr">
          <div id="qrcode" ref="qrcode" class="code_box qrcode"></div>
          <span>扫描左侧二维码</span>
        </div>
        <div class="adderr flex flex_middle">
          <div class="label">充币地址</div>
          <div class="txt">{{ address }}</div>
          <copy :text="address" />
        </div>
        <div class="tip_box">
          <div class="tip_title">
            <img class="tip_img" src="../../../assets/transactions/ic_addlak_buy.png" />
            <span>温馨提示</span>
          </div>
          <div class="tip_txt">
            充入上述地址成功后，充入的数字货币不可以转出，只可进行交易，充入预计交易的数量即可
            <br />请勿向上述地址充值任何非 ERC20_USDT资产，否者资产将不可找回。
            <br />您充值至上述地址后，需要整个网络节点的确认，12次网络确认后到账，12次网络确认后可提币。
            <br />最小充值金额为：1 USDT，小于最小金额充值将不会上账且无法退回。
            <br />您的充值地址不会经常改变，可以重复充值；如有改变，我们会尽量通过公告或邮件通知您。
            <br />请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copy from "@/components/copy";
import QRCode from "qrcodejs2";
import orderInfoApi from "@/api/orderInfo";

export default {
  name: "Recharge",
  components: {
    copy
  },
  data() {
    return {
      address: ""
    };
  },
  created() {
    this.getWalletAddress();
  },
  mounted() {},
  methods: {
    // 获取充币地址
    getWalletAddress() {
      orderInfoApi
        .getWalletAddress({
          coinName: "USDT",
          type: 1
        })
        .then(res => {
          this.address = res.data.data.address;
          this.addCode();
        });
    },
    // 生成二维码
    addCode() {
      this.$nextTick(() => {
        var o = document.getElementById("qrcode");
        var w = o.offsetWidth;
        var h = o.offsetHeight;
        new QRCode(this.$refs.qrcode, {
          width: w, // 设置宽度，单位像素
          height: h, // 设置高度，单位像素
          text: this.address // 设置二维码内容或跳转地址
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.recharge {
  padding-top: 40px;

  .wapper_box {
    margin: 0 auto;
    width: 790px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    .header_box {
      padding: 34px 0 18px 30px;
      border-bottom: 1px solid #c8c8c8;
      font-weight: bold;
      font-size: 24px;
      line-height: 34px;
      color: #f2a145;
    }

    .content {
      padding: 0px 280px 40px 30px;

      .name_box {
        .label {
          padding-right: 15px;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          color: #40405e;
        }

        .name {
          width: 104px;
          line-height: 28px;
          background: rgba(12, 179, 151, 0.1);
          border: 1px solid #0cb397;
          box-sizing: border-box;
          border-radius: 16px;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          color: #0cb397;
        }
      }

      .qr {
        display: flex;
        align-items: flex-end;

        .code_box {
          margin-top: 32px;
          width: 143px;
          height: 143px;
        }

        span {
          font-size: 13px;
          color: #0cb397;
          margin-left: 14px;
        }
      }

      .adderr {
        padding-top: 18px;

        .label {
          font-size: 13px;
          line-height: 18px;
          color: #40405e;
          padding-right: 10px;
        }

        .txt {
          padding-right: 10px;
          font-size: 12px;
          line-height: 18px;
          color: #a0a0b3;
        }
      }

      .tip_box {
        margin-top: 26px;
        padding: 20px 15px;
        background: #f7f7fa;

        .tip_title {
          display: flex;
          align-items: center;

          .tip_img {
            margin-right: 8px;
            width: 16px;
            height: 16px;
          }

          span {
            font-size: 14px;
            color: #f2a145;
          }
        }

        .tip_txt {
          margin-top: 8px;
          padding-left: 24px;
          font-size: 12px;
          line-height: 18px;
          color: #a0a0b3;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .recharge {
    padding-top: 40px * 0.9;

    .wapper_box {
      width: 790px * 0.9;

      .header_box {
        padding: 34px * 0.9 0 18px * 0.9 30px * 0.9;
        font-size: 24px * 0.9;
        line-height: 34px * 0.9;
      }

      .content {
        padding: 32px * 0.9 280px * 0.9 40px * 0.9 30px * 0.9;

        .name_box {
          .label {
            padding-right: 15px * 0.9;
            font-size: 16px * 0.9;
            line-height: 22px * 0.9;
          }

          .name {
            width: 104px * 0.9;
            line-height: 28px * 0.9;
            border-radius: 16px * 0.9;
            font-size: 14px * 0.9;
          }
        }

        .qr {

          .code_box {
            margin-top: 32px * 0.9;
            width: 143px * 0.9;
            height: 143px * 0.9;
          }
          
          span {
            margin-left: 14px * 0.9;
          }
        }

        .adderr {
          padding-top: 18px * 0.9;

          .label {
            font-size: 13px * 0.9;
            line-height: 18px * 0.9;
          }

          .txt {
            padding-right: 20px * 0.9;
            font-size: 12px * 0.9;
            line-height: 18px * 0.9;
          }
        }

        .tip_box {
          padding-top: 32px * 0.9;

          .tip_img {
            width: 16px * 0.9;
            height: 16px * 0.9;
          }

          .tip_txt {
            padding-left: 8px * 0.9;
            line-height: 20px * 0.9;
          }
        }
      }
    }
  }
}
</style>
