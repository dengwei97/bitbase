<template>
  <div class="data">
    <p>{{ type == 1 ? "银行卡" : type == 2 ? "微信" : "支付宝" }}</p>

    <div v-for="(item, index) of payList" :key="index">
      <collectionTemplate
        @click.native="bindPay(item)"
        class="pay_item"
        :data="item"
      ></collectionTemplate>
    </div>
    <div class="more">
      <img src="@/assets/transactions/ico_add_gray.png" />
      <span @click="bindPay()"
        >新增{{
          type == 1 ? "银行卡" : type == 2 ? "微信" : "支付宝"
        }}收款方式</span
      >
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import collectionTemplate from "@/components/collectionTemplate";
export default {
  data() {
    return {
      type: 1, //1银行卡，2微信，3支付宝
      payList: []
    };
  },
  components: {
    collectionTemplate
  },
  created() {
    this.type = this.$route.params.type;
    this.getPayment();
  },
  methods: {
    // 获取收款方式详细信息
    getPayment() {
      userInfoApi
        .getPayment({
          bindType: this.type
        })
        .then(res => {
          console.log("***********", res.data.data);
          let data = res.data.data;
          if (data.length > 0) {
            this.payList = data[0];
          }
        });
    },
    // 修改或新增
    bindPay(value) {
      if (value) {
        if (value.bindType == 1) {
          window.localStorage.setItem("bank", JSON.stringify(value));
          this.$router.push("/cardInfo");
        } else if (value.bindType == 2) {
          window.localStorage.setItem("wx", JSON.stringify(value));
          this.$router.push("/bindpayment/" + value.bindType);
        } else {
          window.localStorage.setItem("zfb", JSON.stringify(value));
          this.$router.push("/bindpayment/" + value.bindType);
        }
      } else {
        if (this.type == 1) {
          this.$router.push("/cardInfo");
          window.localStorage.setItem("bank", "");
        } else if (this.type == 2) {
          this.$router.push("/bindpayment/2");
          window.localStorage.setItem("wx", "");
        } else {
          this.$router.push("/bindpayment/3");
          window.localStorage.setItem("zfb", "");
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
.data {
  width: 790px;
  margin: 40px auto;
  padding: 40px 154px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  p {
    font-size: 18px;
    line-height: 24px;
    color: #40405e;
    padding-bottom: 24px;
    text-align: center;
  }
  .pay_item {
    margin-bottom: 20px;
  }
  .more {
    background: #ffffff;
    box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
    border-radius: 6px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
    }
    span {
      padding-left: 12px;
      font-size: 16px;
      color: #40405e;
    }
  }
}

@media (max-width: 1200px) {
  .data {
    width: 790px * 0.8;
    margin: 40px * 0.8 auto;
    padding: 40px * 0.8 154px * 0.8;
    box-shadow: 0px 0px 10px * 0.8 rgba(0, 0, 0, 0.1);
    p {
      font-size: 18px * 0.8;
      line-height: 24px * 0.8;
      padding-bottom: 24px * 0.8;
    }
    .pay_item {
      margin-bottom: 20px * 0.8;
    }
    .more {
      box-shadow: 0px 4px 24px * 0.8 rgba(64, 64, 94, 0.08);
      padding: 14px * 0.8 20px * 0.8;
      img {
        width: 28px * 0.8;
        height: 28px * 0.8;
      }
      span {
        padding-left: 12px * 0.8;
        font-size: 16px * 0.8;
      }
    }
  }
}
</style>