<template>
  <div v-if="pop" class="pop_absolute_box">
    <div class="pop_absolute_box_bg" @click="hide"></div>

    <div v-if="pop" class="popup">
      <div class="pop_center">
        <div class="closed" @click="hide">
          <img src="@/assets/transactions/ico_close_small.png" alt />
        </div>
        <div class="ewmimg">
          <div class="ewm_tit">保存二维码识别付款</div>
          <div id="qrcode" ref="qrcode" class="ewm">
            <img v-if="isHttp" :src="url" alt />
            <!-- <div id="qrcode" ref="qrcode"></div> -->
          </div>
          <div class="screen">
            <div class="screen_text">请截屏保存二维码</div>
          </div>
        </div>
        <div class="tutorials">
          <div class="tut_head">二维码付款教程</div>
          <ul>
            <li class="steps">1.请截图保存上方展示的二维码</li>
            <li class="steps">2.打开手机APP，点击右上角"+"</li>
            <li class="steps">3.点击"扫一扫"，进入二维码识别页面</li>
            <li class="steps">4.识别相册中的付款二维码，完成付款操作</li>
          </ul>
          <div class="question" @click="service">如有任何疑问，请联系客服</div>
        </div>
      </div>
    </div>

    <div v-if="pop" class="popup1">
      <div class="pop_content">
        <div class="pop1_t">
          <div class="pop1_t_text">二维码识别付款</div>
          <img class="closed_1" src="@/assets/transactions/ico_web_close.png" alt @click="hide" />
        </div>
        <div class="pop1_cont">
          <div class="cont_l">
            <div id="qrcode1" ref="qrcode1" class="ewm">
              <img v-if="isHttp" :src="url" alt />
              <!-- <div id="qrcode" ref="qrcode"></div> -->
            </div>
            <div class="cont_l_text">识别上方二维码</div>
          </div>
          <div class="cont_r">
            <div class="cont_r_tit">二维码付款教程</div>
            <ul>
              <li class="cont_r_text">1.打开手机App，点击右上角“+”</li>
              <li class="cont_r_text">2.点击“扫一扫”，进入二维码识别页面</li>
              <li class="cont_r_text">1.打开手机App，点击右上角“+”</li>
            </ul>
            <div class="tips" @click="service">如有任何疑问，请咨询客服</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 地址转二维码
import QRCode from "qrcodejs2";
import { ismobile } from "@/utils/index";
import { customerService } from "@/utils/index";
export default {
  data() {
    return {
      pop: false,
      isHttp: false,
      url: ''
      // QRcode: ''
    };
  },
  created() {},
  methods: {
     // 客服跳转
    service() {
      customerService();
    },

    show(value, isHttp) {
      // this.QRcode = value;

      // new QRCode(this.$refs.qrcode, {
      //   width: w, // 设置宽度，单位像素
      //   height: h, // 设置高度，单位像素
      //   text: value, // 设置二维码内容或跳转地址
      //   // correctLevel: QRCode.CorrectLevel.L
      // });
      this.pop = true;
      this.isHttp = isHttp
      if (!value) {
        this.$toast('该用户未上传收款二维码请根据转账信息完成转账')
      }
      if (this.isHttp) {
        this.url = value
      } else {
        if (ismobile()) {
          setTimeout(() => {
            var o = document.getElementById("qrcode");
            var w = o.offsetWidth;
            var h = o.offsetHeight;

            new QRCode(this.$refs.qrcode, {
              width: w, // 设置宽度，单位像素
              height: h, // 设置高度，单位像素
              text: value // 设置二维码内容或跳转地址
              // correctLevel: QRCode.CorrectLevel.L
            });
          }, 200);
        } else {
          setTimeout(() => {
            var o = document.getElementById("qrcode1");
            var w = o.offsetWidth;
            var h = o.offsetHeight;

            new QRCode(this.$refs.qrcode1, {
              width: w, // 设置宽度，单位像素
              height: h, // 设置高度，单位像素
              text: value // 设置二维码内容或跳转地址
              // correctLevel: QRCode.CorrectLevel.L
            });
          }, 200);
        }
      }
    },
    hide() {
      this.pop = false;
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  display: none;
}
.popup1 {
  display: block;
  position: absolute;
  width: 484px;
  height: 306px;
  z-index: 2002;
  left: 50%;
  top: 50%;
  margin-left: -242px;
  margin-top: -153px;
  background: #ffffff;
  border-radius: 4px;
  .pop_content {
    padding: 20px 40px;
    .pop1_t {
      display: flex;
      justify-content: space-between;
      .pop1_t_text {
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
        color: #40405e;
      }
      .closed_1 {
        width: 18px;
        height: 18px;
      }
    }
    .pop1_cont {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 32px;
      .cont_l {
        .ewm {
          width: 110px;
          height: 110px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cont_l_text {
          padding-top: 24px;
          font-size: 14px;
          line-height: 16px;
          text-align: center;

          color: @cl-m;
        }
      }
      .cont_r {
        padding: 16px;
        width: 272px;
        background: #f7f7fa;
        border-radius: 6px;
        .cont_r_tit {
          font-size: 14px;
          line-height: 16px;

          color: #40405e;
        }
        .cont_r_text {
          font-size: 13px;
          line-height: 20px;
          color: #40405e;
        }
        ul li {
          padding-top: 10px;
        }
        .tips {
          padding-top: 24px;
          font-size: 13px;
          line-height: 15px;

          color: #f2a145;
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .popup1 {
    width: 484px * 0.8;
    height: 306px * 0.8;
    margin-left: -242px * 0.8;
    margin-top: -153px * 0.8;
    .pop_content {
      padding: 20px * 0.8 40px * 0.8;
      .pop1_t {
        .pop1_t_text {
          font-size: 16px * 0.8;
          line-height: 19px * 0.8;
        }
        .closed_1 {
          width: 18px * 0.8;
          height: 18px * 0.8;
        }
      }
      .pop1_cont {
        margin-top: 32px * 0.8;
        .cont_l {
          .ewm {
            width: 110px * 0.8;
            height: 110px * 0.8;
          }
          .cont_l_text {
            padding-top: 24px * 0.8;
            font-size: 14px * 0.8;
            line-height: 16px * 0.8;
          }
        }
        .cont_r {
          padding: 16px * 0.8;
          width: 272px * 0.8;
          .cont_r_tit {
            font-size: 14px * 0.8;
            line-height: 16px * 0.8;
          }
          .cont_r_text {
            font-size: 13px * 0.8;
            line-height: 20px * 0.8;
          }
          ul li {
            padding-top: 10px * 0.8;
          }
          .tips {
            padding-top: 24px * 0.8;
            font-size: 13px * 0.8;
            line-height: 15px * 0.8;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .popup {
    display: block;
    position: absolute;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    z-index: 2002;
    left: 0;
    bottom: 0.68rem;
    padding: 0 0.32rem;

    .pop_center {
      width: 100%;
      background-color: #fff;
      border-radius: 0.12rem;
      padding: 0.24rem;
      .closed {
        display: flex;
        justify-content: flex-end;
        img {
          width: 0.32rem;
          height: 0.32rem;
        }
      }
      .ewmimg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .ewm_tit {
          padding-bottom: 0.64rem;
          font-family: PingFangSC;
          font-size: 0.32rem;
          line-height: 0.38rem;
          color: #40405e;
        }
        .ewm {
          width: 4rem;
          height: 4rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .screen {
          padding: 0.72rem 0 0.8rem 0;
          display: flex;
          img {
            width: 0.32rem;
            height: 0.32rem;
          }
          .screen_text {
            padding-left: 0.08rem;
            font-family: PingFangSC;
            font-size: 0.28rem;
            line-height: 0.32rem;
            color: @cl-m;
          }
        }
      }
      .tutorials {
        background: #f7f7fa;
        border-radius: 0.12rem;
        padding: 0.32rem;
        .tut_head {
          font-family: PingFangSC;
          font-size: 0.28rem;
          line-height: 0.32rem;

          color: #40405e;
          padding-bottom: 0.24rem;
        }
        ul .steps {
          font-family: PingFangSC;
          font-size: 0.26rem;
          line-height: 0.45rem;
          color: #40405e;
        }
        .question {
          padding-top: 0.24rem;
          font-family: PingFangSC;
          font-size: 0.26rem;
          line-height: 0.3rem;
          color: #f2a145;
          cursor: pointer;
        }
      }
    }
  }
  .popup1 {
    display: none;
  }
}
</style>
