<template>
  <div class="cardInfo">
    <div v-if="nameDisabled" class="card nameRow">
      请绑定持卡人姓名为“<div class="name">{{ data.name }}</div> ”的银行卡
    </div>
    <div v-if="!nameDisabled" class="card">
      <input v-model="data.name" type="text" placeholder="请输入持卡人姓名" />
    </div>
    <div class="card">
      <input v-model="data.account" type="text" placeholder="银行卡账号" @input="inputNum" />
    </div>
    <div class="card bankChoice">
      <input v-model="data.paymentCode" class="bankInput" type="text" placeholder="所属银行" />
      <div class="choice" @click="choice">选择</div>
    </div>
    <div class="card">
      <input v-model="data.addition" type="text" placeholder="所属分行(选填)" />
    </div>
    <button class="sumbit" :disabled="btnType != 2" :class="{'sub':btnType==2}" @click="bindCard()">提交</button>
    <button v-if="closeType == 1" class="closeSumbit" @click="unBindCard()">解除绑定</button>
  </div>
</template>

<script>
import userInfo from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
export default {
  name: "McardInfo",
  components: {},
  components: {},
  data() {
    return {
      btnType: 2,
      closeType: 2, // 解除绑定
      data: {
        id: '',
        bindType: 1,
        name: "", // 姓名
        account: "", // 账号
        paymentCode: "", // 银行名称
        addition: "" // 分行
      },
      nameDisabled: false// 是否可以输入实名
    };
  },
  computed: {

  },
  watch: {
    data: {
      handler(newName, oldName) {
        if (newName.account && newName.paymentCode && newName.name) {
          this.btnType = 2;
        } else {
          this.btnType = 1;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getKycList()
    // this.payment();
    if (localStorage.getItem('bank')) {
      this.data = JSON.parse(localStorage.getItem('bank'))
      console.log(JSON.parse(localStorage.getItem('bank')))
      if (this.data.id) {
        this.closeType = 1;
      }
    }
      // this.data.paymentCode = this.$store.state.user.bankType;
  },
  mounted() {},
  methods: {
    // 获取kyc信息
    getKycList() {
      orderInfoApi.getadderSell().then(res => {
        console.log(res)
        var data = res.data.data
        if (data.special == 2) {
          this.nameDisabled = false
        } else {
          this.nameDisabled = true
          this.data.name = data.realName
        }
      });
    },
    choice() {
      window.localStorage.setItem('bank', JSON.stringify(this.data))
      this.$router.push('/mbankType')
    },
    inputNum() {
      this.data.account = this.data.account.replace(/[^\d.]/g, "");
    },
    // 绑定银行卡
    bindCard() {
      userInfo
        .bindPayment({
          id:this.data.id,
          name:this.data.name,
          account:this.data.account,
          bindType:this.data.bindType,
          paymentCode:this.data.paymentCode,
          addition:this.data.addition
        })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(() => {});
    },
    // 解绑银行卡
    unBindCard() {
      // let bindType = { bindType: 1 };
      userInfo
        .unbindPayment({
          id: this.data.id
        })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(() => {});
    }
    // 判定是否绑定银行卡
    // payment() {
    //   let bindType = { bindType: 1 };
    //   userInfo
    //     .getPayment(bindType)
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.data[0].name) {
    //         this.data.name = res.data.data[0].name;
    //         this.data.account = res.data.data[0].account;
    //         this.data.paymentCode = res.data.data[0].paymentCode;
    //         this.data.addition = res.data.data[0].addition;
    //         this.closeType = 1;
    //       }
    //     })
    //     .catch(() => {});
    // }
  }
};
</script>

<style lang="less" scoped>
.cardInfo {
  display: flex;
  flex-direction: column;
  padding: 0.64rem 0.24rem 0px 0.24rem;
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #C9C9D1;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #C9C9D1;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #C9C9D1;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #C9C9D1;
  }
  .card {
    width: 100%;
    height: 0.96rem;
    font-size: 15px;
    color: #40405e;
    padding: 0.26rem 0.32rem;
    background: #f7f7fa;
    border-radius: 0.12rem;
    margin-top: 0.32rem;
    input {
      width: 100%;
      background: #f7f7fa;
    }
  }
  .nameRow {
    display: flex;
    align-items: center;
    font-size: 0.3rem;
    color: #40405e;
    .name {
      color: @cl-m;
    }
  }
  .bankChoice {
    display: flex;
    align-items: center;
    .bankInput {
      flex: 1;
    }
    .choice {
      padding-left: 0.24rem;
      font-size: 0.26rem;
      color: @cl-m;
    }
  }
  .sumbit {
    width: 100%;
    height: 0.96rem;
    background: linear-gradient(0deg, #dddde6, #dddde6);
    border-radius: 0.48rem;
    margin-top: 28px;
    font-size: 16px;
    color: white;
  }
  .sub {
    background: @cl-m;
  }
  .closeSumbit {
    width: 100%;
    height: 0.96rem;
    border: 1px solid @cl-m;
    border-radius: 0.48rem;
    margin-top: 28px;
    font-size: 16px;
    color: @cl-m;
  }
}
</style>
