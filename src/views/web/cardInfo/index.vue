<template>
  <div class="card">
    <div class="cardInfo">
      <div class="content">
        <div class="addCardInfo">
          <div class="cInfo">填写银行卡信息</div>
          <div class="card">请使用本人的银行卡</div>
          <div class="name">
            <div class="name_1">
              <div class="label">持卡人</div>
              <input v-model="payment.name" type="text" :disabled="nameDisabled" placeholder="您的真实姓名" />
            </div>
            <img src="@/assets/transactions/ico_web_promt.png" @click="changeDescription()" />
          </div>
          <div class="num">
            <div class="label">卡号</div>
            <input v-model="payment.account" type="text" placeholder="您本人的银行卡号" @input="banknum" />
          </div>
          <div class="bank">
            <div class="label">所属银行</div>
            <input v-model="payment.paymentCode" type="text" placeholder="请选择银行名称" />
            <div class="choice" @click=" bandshow = !bandshow">选择</div>
            <i v-if="bandshow" class="top"></i>
            <div v-if="bandshow" class="select">
              <ul>
                <li v-for="(item ,index) of list" :key="index" @click="choice(item)">{{ item }}</li>

              </ul>
            </div>
          </div>
          <div class="branch">
            <div class="label">所属分行</div>
            <input v-model="payment.addition" type="text" placeholder="请输入银行开户行" />
          </div>
          <button v-if="!isBind" class="btn" :class="{'btnState': getState}" @click="bind">确定</button>
          <div v-if="isBind" class="bindBtn">
            <button class="sucess" :class="{'btnState': getState}" @click="bind">确定</button>
            <button class="fail" @click="unbind">解除绑定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 银行卡绑定说明 -->
    <div v-if="descriptionType==2" class="description">
      <div class="content">
        <div class="title">
          <div>持卡人说明</div>
          <img src="@/assets/transactions/ico_web_close.png" @click="changeDescription()" />
        </div>
        <ul>
          <li>为了资金安全，您只能使用本人的银行卡。</li>
          <li>如果更改姓名，请联系客服并提供身份信息，审核通过后方可使用新的持卡人身份。</li>
        </ul>
        <div class="bt">
          <button class="btn" @click="changeDescription()">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
export default {
  name: "CardInfo",
  data() {
    return {
      nameDisabled: true, // 是否可以输入名字
      descriptionType: 1,
      payment: {
        id: "",
        bindType: 1,
        paymentCode: "",
        name: "",
        account: "",
        addition: ""
      }, // 银行卡信息
      isBind: false,
      bandshow: false,
      list: [
        "中国银行",
        "工商银行",
        "建设银行",
        "农业银行",
        "交通银行",
        "中信银行",
        "光大银行",
        "华夏银行",
        "招商银行",
        "兴业银行",
        "广发银行",
        "农业发展银行",
        "进出口银行",
        "国家开发银行",
        "邮政储蓄银行"
      ]
    };
  },
  computed: {
    getState: function() {
      let state = true;
      if (!this.payment.paymentCode) {
        state = false;
      }
      if (!this.payment.name) {
        state = false;
      }
      if (!this.payment.account) {
        state = false;
      }
      return state;
    }
  },
  created() {
    this.getKycList()
    //   this.getPayment()
    if (localStorage.getItem("bank")) {
      this.payment = JSON.parse(localStorage.getItem("bank"));
      console.log(JSON.parse(localStorage.getItem("bank")));
      if (this.payment.id) {
        this.isBind = true;
      }
    }
  },
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
          this.payment.name = data.realName
        }
      });
    },
      choice(item) {
          this.payment.paymentCode = item
          this.bandshow = false
      },
    banknum() {
      this.payment.account = this.payment.account.replace(/[^\d]/g, "");
    },
    changeDescription() {
      if (this.descriptionType == 1) {
        this.descriptionType = 2;
      } else {
        this.descriptionType = 1;
      }
    },
    // // 获取银行卡信息
    // getPayment() {
    //   userInfoApi
    //     .getPayment({
    //       bindType: 1
    //     })
    //     .then(res => {
    //       if (res.data.data[0].account) {
    //         this.isBind = true;
    //       } else {
    //         this.isBind = false;
    //       }
    //       this.payment = res.data.data;
    //       console.log(this.payment);
    //     })
    //     .catch(err => {
    //       this.$toast(err.data.message);
    //     });
    // },
    // 绑定银行卡
    bind() {
      //   if (!this.getState) {
      //     return;
      //   }
      console.log(this.payment);
      userInfoApi
        .bindPayment({
          id:this.payment.id,
          name:this.payment.name,
          account:this.payment.account,
          bindType:this.payment.bindType,
          paymentCode:this.payment.paymentCode,
          addition:this.payment.addition
        })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    },
    // 删除银行卡
    unbind() {
      userInfoApi
        .unbindPayment({
          id: this.payment.id
        })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  .cardInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;

    .content {
      width: 790px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 75px 0px 52px 32px;
      display: flex;
      flex-direction: column;

      .cInfo {
        font-size: 18px;
        color: #40405e;
        padding-bottom: 4px;
      }

      .card {
        font-size: 14px;
        color: rgba(21, 46, 83, 0.4);
        padding-bottom: 26px;
      }

      .name {
        display: flex;
        justify-content: start;
        align-items: center;

        .name_1 {
          width: 481px;
          padding: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #4f5669;
          border: 1px solid #c8c8c8;
          border-radius: 5px;
          .label {
            width: 80px;
          }
          input {
            // width: 80%;
            flex: 1;
            background: transparent;
          }
        }

        img {
          width: 27px;
          height: 17px;
          padding-left: 10px;
          cursor: pointer;
        }
      }

      .num {
        width: 481px;
        padding: 14px;
        margin-top: 26px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #4f5669;
        border: 1px solid #c8c8c8;
        border-radius: 5px;
        .label {
          width: 80px;
        }
        input {
          //   width: 80%;
          flex: 1;
        }
      }

      .bank {
        width: 481px;
        padding: 14px;
        margin-top: 26px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #4f5669;
        border: 1px solid #c8c8c8;
        border-radius: 5px;
        position: relative;
        .label {
          width: 80px;
        }
        input {
          //   width: 80%;
          flex: 1;
          padding-right: 12px;
        }
        .choice {
          color: @cl-m;
          cursor: pointer;
        }
        .select {
          position: absolute;
          z-index: 2002;
          right: 0;
          background: #ffffff;
          top: 55px;
          min-width: 180px;
          height: 170px;
          border: 1px solid #e4e7ed;
          border-radius: 4px;
          box-sizing: border-box;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          padding: 4px 0;
          overflow: scroll;

          li {
            padding: 10px 0 10px 20px;
            cursor: pointer;
            font-size: 14px;
          }
          li:hover {
            background: #eeeeee;
          }
        }
        .top {
          position: absolute;
          top: 36px;
          right: 40px;
          z-index: 2003;
        }
        .top:before,
        .top:after {
          position: absolute;

          content: "";
          border-top: 10px transparent dashed;
          border-left: 10px transparent dashed;
          border-right: 10px transparent dashed;
          border-bottom: 10px #fff solid;
        }
        .top:before {
          border-bottom: 10px #e4e7ed solid;
        }
        .top:after {
          top: 1px; /*覆盖并错开1px*/
          border-bottom: 10px #fff solid;
        }
        .select::-webkit-scrollbar {
          width: 2px;
          //   height: 2px;
          color: transparent;
        }
        .select::-webkit-scrollbar-thumb {
          background-color: #ddd;
        }
      }

      .branch {
        width: 481px;
        padding: 14px;
        margin-top: 26px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #4f5669;
        border: 1px solid #c8c8c8;
        border-radius: 5px;
        .label {
          width: 80px;
        }
        input {
          //   width: 80%;
          flex: 1;
        }
      }

      .btn {
        width: 344px;
        height: 48px;
        background: #dddde6;
        border-radius: 41px;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
      }

      .bindBtn {
        width: 481px;
        display: flex;
        justify-content: space-between;
        padding-top: 40px;

        .sucess {
          width: 226px;
          height: 48px;
          background: #dddde6;
          border-radius: 41px;
          font-size: 16px;
          color: #ffffff;
        }

        .fail {
          width: 226px;
          height: 48px;
          font-size: 16px;
          border: 1px solid @cl-m;
          border-radius: 41px;
          color: @cl-m;
        }
      }

      .btnState {
        background: @gd-m5;
      }

      input::placeholder {
        color: rgba(21, 46, 83, 0.4);
      }
    }
  }

  .description {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 560px;
      height: 224px;
      background: white;
      border-radius: 10px;
      padding: 24px;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 24px;
        color: #40405e;
        display: flex;
        justify-content: space-between;

        img {
          width: 14px;
          height: 14px;
          cursor: pointer;
        }
      }

      ul {
        font-size: 16px;
        color: #4f5669;
        padding-left: 17px;

        li {
          padding-top: 10px;
          list-style-type: disc;
        }
      }

      .bt {
        font-size: 0;
        padding-top: 10px;
        width: 100%;
        display: flex;
        justify-content: center;

        .btn {
          width: 180px;
          height: 44px;
          border-radius: 41px;
          background: @gd-m3;
          font-size: 16px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .card {
    .cardInfo {
      padding-top: 40px * 0.8;

      .content {
        width: 790px * 0.8;
        border-radius: 4px * 0.8;
        padding: 75px * 0.8 0px 52px * 0.8 32px * 0.8;

        .cInfo {
          font-size: 18px * 0.8;
          padding-bottom: 4px * 0.8;
        }

        .card {
          font-size: 14px * 0.8;
          padding-bottom: 26px * 0.8;
        }

        .name {
          .name_1 {
            width: 481px * 0.8;
            padding: 14px * 0.8;
            font-size: 16px * 0.8;
            border-radius: 5px * 0.8;
            .label {
              width: 80px * 0.8;
            }
          }

          img {
            width: 27px * 0.8;
            height: 17px * 0.8;
            padding-left: 10px * 0.8;
          }
        }

        .num {
          width: 481px * 0.8;
          padding: 14px * 0.8;
          margin-top: 26px * 0.8;
          font-size: 16px * 0.8;
          border-radius: 5px * 0.8;
          .label {
            width: 80px * 0.8;
          }
        }

        .bank {
          width: 481px * 0.8;
          padding: 14px * 0.8;
          margin-top: 26px * 0.8;
          font-size: 16px * 0.8;
          border-radius: 5px * 0.8;
          .label {
            width: 80px * 0.8;
          }
          input {
            padding-right: 12px * 0.8;
          }
          .select {
          top: 55px * 0.8;
          min-width: 180px  * 0.8;
          height: 170px * 0.8;
          li {
            padding: 10px * 0.8 0 10px * 0.8 20px * 0.8;
            font-size: 14px * 0.8;
          }
        }
        .top {
          top: 36px * 0.8;
          right: 40px * 0.8;
        }
        .top:before,
        .top:after {

          border-top: 10px * 0.8 transparent dashed;
          border-left: 10px * 0.8 transparent dashed;
          border-right: 10px * 0.8 transparent dashed;
          border-bottom: 10px * 0.8 #fff solid;
        }
        .top:before {
          border-bottom: 10px * 0.8 #e4e7ed solid;
        }
        .top:after {
          top: 1px; /*覆盖并错开1px*/
          border-bottom: 10px * 0.8 #fff solid;
        }
        }

        .branch {
          width: 481px * 0.8;
          padding: 14px * 0.8;
          margin-top: 26px * 0.8;
          font-size: 16px * 0.8;
          border-radius: 5px * 0.8;
          .label {
            width: 80px * 0.8;
          }
        }

        .btn {
          width: 344px * 0.8;
          height: 48px * 0.8;
          border-radius: 41px * 0.8;
          font-size: 16px * 0.8;
        }

        .bindBtn {
          width: 481px * 0.8;
          padding-top: 40px * 0.8;

          .sucess {
            width: 226px * 0.8;
            height: 48px * 0.8;
            border-radius: 41px * 0.8;
            font-size: 16px * 0.8;
          }

          .fail {
            width: 226px * 0.8;
            height: 48px * 0.8;
            font-size: 16px * 0.8;
            border-radius: 41px * 0.8;
          }
        }
      }
    }

    .description {
      .content {
        width: 560px * 0.8;
        height: 224px * 0.8;
        border-radius: 10px * 0.8;
        padding: 24px * 0.8;

        .title {
          font-size: 24px * 0.8;

          img {
            width: 14px * 0.8;
            height: 14px * 0.8;
          }
        }

        ul {
          font-size: 16px * 0.8;
          padding-left: 17px * 0.8;

          li {
            padding-top: 10px * 0.8;
          }
        }

        .bt {
          padding-top: 10px * 0.8;

          .btn {
            width: 180px * 0.8;
            height: 44px * 0.8;
            border-radius: 41px * 0.8;
            font-size: 16px * 0.8;
          }
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .card {
    .cardInfo {
      padding-top: 40px * 0.6;

      .content {
        width: 790px * 0.6;
        border-radius: 4px * 0.6;
        padding: 75px * 0.6 0px 52px * 0.6 32px * 0.6;

        .cInfo {
          font-size: 18px * 0.6;
          padding-bottom: 4px * 0.6;
        }

        .card {
          font-size: 14px * 0.6;
          padding-bottom: 26px * 0.6;
        }

        .name {
          .name_1 {
            width: 481px * 0.6;
            padding: 14px * 0.6;
            font-size: 16px * 0.6;
            border-radius: 5px * 0.6;
          }

          img {
            width: 27px * 0.6;
            height: 17px * 0.6;
            padding-left: 10px * 0.6;
          }
        }

        .num {
          width: 481px * 0.6;
          padding: 14px * 0.6;
          margin-top: 26px * 0.6;
          font-size: 16px * 0.6;
          border-radius: 5px * 0.6;
        }

        .bank {
          width: 481px * 0.6;
          padding: 14px * 0.6;
          margin-top: 26px * 0.6;
          font-size: 16px * 0.6;
          border-radius: 5px * 0.6;
        }

        .branch {
          width: 481px * 0.6;
          padding: 14px * 0.6;
          margin-top: 26px * 0.6;
          font-size: 16px * 0.6;
          border-radius: 5px * 0.6;
        }

        .btn {
          width: 344px * 0.6;
          height: 48px * 0.6;
          border-radius: 41px * 0.6;
          font-size: 16px * 0.6;
        }

        .bindBtn {
          width: 481px * 0.6;
          padding-top: 40px * 0.6;

          .sucess {
            width: 226px * 0.6;
            height: 48px * 0.6;
            border-radius: 41px * 0.6;
            font-size: 16px * 0.6;
          }

          .fail {
            width: 226px * 0.6;
            height: 48px * 0.6;
            font-size: 16px * 0.6;
            border-radius: 41px * 0.6;
          }
        }
      }
    }

    .description {
      .content {
        width: 560px * 0.6;
        height: 224px * 0.6;
        border-radius: 10px * 0.6;
        padding: 24px * 0.6;

        .title {
          font-size: 24px * 0.6;

          img {
            width: 14px * 0.6;
            height: 14px * 0.6;
          }
        }

        ul {
          font-size: 16px * 0.6;
          padding-left: 17px * 0.6;

          li {
            padding-top: 10px * 0.6;
          }
        }

        .bt {
          padding-top: 10px * 0.6;

          .btn {
            width: 180px * 0.6;
            height: 44px * 0.6;
            border-radius: 41px * 0.6;
            font-size: 16px * 0.6;
          }
        }
      }
    }
  }
}
</style>
