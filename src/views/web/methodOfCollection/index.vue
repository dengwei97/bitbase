<template>
  <div class="data">
    <div class="header">
      <p>收款方式</p>
      <div class="text tips">绑定收款方式后才交易</div>
    </div>
    <ul>
      <li class="flex_center_between" @click="goPayList(1)">
        <div class="flex Ttext">
          <img
            class="pay_img"
            src="@/assets/transactions/ic_bankpay_yhq.png"
            alt=""
          />

          银行卡
        </div>
        <div
          class="flex text text_red"
          :class="{ text_lv: pay.bankList.length > 0 }"
        >
          {{
            pay.bankList.length > 0
              ? "已绑定" + pay.bankList.length + "张"
              : "未绑定"
          }}
          <img
            class="right_img"
            src="@/assets/transactions/ico_arrow_right.png"
            alt=""
          />
        </div>
      </li>
      <li class="flex_center_between" @click="goPayList(3)">
        <div class="flex Ttext">
          <img
            class="pay_img"
            src="@/assets/transactions/ic_bankpay_zfb.png"
            alt=""
          />

          支付宝
        </div>
        <div
          class="flex text text_red"
          :class="{ text_lv: pay.zfbList.length > 0 }"
        >
          {{
            pay.zfbList.length > 0
              ? "已绑定" + pay.zfbList.length + "个"
              : "未绑定"
          }}
          <img
            class="right_img"
            src="@/assets/transactions/ico_arrow_right.png"
            alt=""
          />
        </div>
      </li>
      <li class="flex_center_between" @click="goPayList(2)">
        <div class="flex Ttext">
          <img
            class="pay_img"
            src="@/assets/transactions/ic_bankpay_weixin.png"
            alt=""
          />

          微信
        </div>
        <div
          class="flex text text_red"
          :class="{ text_lv: pay.wxList.length > 0 }"
        >
          {{
            pay.wxList.length > 0
              ? "已绑定" + pay.wxList.length + "个"
              : "未绑定"
          }}
          <img
            class="right_img"
            src="@/assets/transactions/ico_arrow_right.png"
            alt=""
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
export default {
  data() {
    return {
      pay: {
        bankList: [],
        wxList: [],
        zfbList: []
      }
    };
  },
  created() {
    this.getPayment();
  },
  methods: {
    // 获取收款方式详细信息
    getPayment() {
      userInfoApi.getPayment().then(res => {
        // console.log('***********',res.data.data[0]);
        let data = res.data.data[0];
        if (data) {
          data.map(item => {
            if (item.bindType == 1) {
              this.pay.bankList.push(item);
            } else if (item.bindType == 2) {
              this.pay.wxList.push(item);
            } else {
              this.pay.zfbList.push(item);
            }
          });
        }
      });
    },

    goPayList(value) {
      console.log(value);
      this.$router.push("/payList/" + value);
    }
  }
};
</script>

<style lang='less' scoped>
.data {
  width: 790px;
  height: 540px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 40px auto;
  padding: 40px 30px;

  .text {
    font-size: 14px;
    line-height: 20px;
    color: rgba(21, 46, 83, 0.4);
  }
  .Ttext {
    font-size: 16px;
    line-height: 22px;

    color: #40405e;
  }
  .text_red {
    color: #f0446b;
  }
  .text_lv {
    color: #00cf00;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;
    p {
      font-size: 18px;
      line-height: 24px;
      color: #40405e;
    }
    .tips {
      padding-top: 4px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex_center_between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  li {
    width: 481px;
    border: 1px solid #dddde6;
    border-radius: 6px;
    padding: 12px 18px;
    margin-bottom: 15px;
    cursor: pointer;
    .pay_img {
      width: 28px;
      height: 28px;
      margin-right: 6px;
    }
    .right_img {
      margin-left: 12px;
      width: 6px;
      height: 10px;
    }
  }
}

@media (max-width: 1200px) {
  .data {
    width: 790px * 0.8;
    height: 540px * 0.8;
    box-shadow: 0px 0px 10px * 0.8 rgba(0, 0, 0, 0.1);
    margin: 40px * 0.8 auto;
    padding: 40px * 0.8 30px * 0.8;
    .text {
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
    }
    .Ttext {
      font-size: 16px * 0.8;
      line-height: 22px * 0.8;
    }
    .header {
      padding-bottom: 24px * 0.8;
      p {
        font-size: 18px * 0.8;
        line-height: 24px * 0.8;
      }
      .tips {
        padding-top: 4px * 0.8;
      }
    }
    ul li {
      width: 481px * 0.8;
      padding: 12px * 0.8 18px * 0.8;
      margin-bottom: 15px * 0.8;
      .pay_img {
        width: 28px * 0.8;
        height: 28px * 0.8;
        margin-right: 6px * 0.8;
      }
      .right_img {
        margin-left: 12px * 0.8;
        width: 6px * 0.8;
        height: 10px * 0.8;
      }
    }
  }
}
</style>