<template>
  <div>
    <div v-if="pop" class="pop_absolute_box">
      <div class="pop_absolute_box_bg" @click="hide"></div>
      <div v-if="pop" class="popup">
        <div class="pop_center">
          <div class="center_top">
            <div class="top_item">
              <div class="top_tit">输入付款账户信息</div>
              <img v-if="poptype==3" src="@/assets/transactions/ico_alipay.png" alt />
              <img v-if="poptype==2" src="@/assets/transactions/ico_weixinpay.png" alt />
              <img v-if="poptype==1" src="@/assets/transactions/ico_bankpay.png" alt />
            </div>
            <p class="tim">请输入您的付款账户信息方便承兑商核对订单</p>
          </div>
          <div class="information">
            <div class="tits">请确认您的USDT接收地址为下方所示</div>
            <div v-if="!isAddress" class="dz">{{ kycInformation.address }}</div>
            <input
              v-if="isAddress"
              v-model="from.address"
              class="input"
              type="text"
              placeholder="输入您的USDT的接收地址"
            />
            <div class="tits">付款账户真实姓名</div>
            <div v-if="!isName" class="disabledName">{{ kycInformation.realName }}</div>
            <input
              v-if="isName"
              v-model="from.name"
              class="input"
              type="text"
              placeholder="输入您付款账户的真实姓名"
            />
            <div class="tisi">
              <img src="@/assets/transactions/ico_tip_small.png" alt />
              <div class="tisi_tit">请确认您的USDT接收地址，确认无误后在下单</div>
            </div>
          </div>
          <div class="btns">
            <div class="btn_item btn1" @click="hide">取消</div>
            <button
              class="btn_item btn2"
              :disabled="!isinput"
              :class="{ss:isinput}"
              @click="order"
            >立即提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kycInformation: [], // kyc详细详细
      poptype: '', // 购买类型
      from: {
        name: "",
        address: ""
      },
      isAddress: false, // 是否可以输入地址
      isName: false, // 是否可以输入名字
      pop: false// 弹框展示
    };
  },
  computed: {
    isinput: function() {
      let state = true
      if (this.isName) {
        if (!this.from.name) {
          state = false
        }
      }
      if (this.isAddress) {
        if (!this.from.address) {
          state = false
        }
      }
      return state
    }
  },

  created() {

  },
  methods: {
    show(value) {
      this.from.name = ''
      this.from.address = ''
      console.log(value)
      this.poptype = value.poptype
      this.kycInformation = value.kycInformation;
      if (this.kycInformation.kycStatus != 2) {
        this.isName = false
      } else {
        if (this.kycInformation.role == 2) {
          this.isName = true
        } else {
          this.isName = false
          this.from.name = this.kycInformation.realName
        }
      }
      if (this.kycInformation.address == '') {
        this.isAddress = true
      } else {
        this.isAddress = false
        this.from.address = this.kycInformation.address
      }

      this.pop = true;
    },
    hide() {
      this.name = "";
      this.pop = false;
    },
    // inputFunction() {
    //   if(this.details.roleName){
    //     if (this.name !== "") {
    //       this.isinput = true;
    //     } else {
    //       this.isinput = false;
    //     }
    //   }
    // },
    order() {
      // console.log('立即下单')
      var value = {
        type: this.poptype,
        from: this.from
      };
      this.$emit("immediateOrder", value);
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: absolute;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  z-index: 1002;
  left: 0;
  bottom: 0.88rem;
  padding: 0 0.32rem;

  .pop_center {
    width: 100%;
    background-color: #fff;
    border-radius: 0.15rem;
    padding: 0.5rem 0.32rem 0.6rem 0.32rem;
    .center_top {
      border-bottom: 1px solid #f5f5fa;
      padding-bottom: 0.32rem;
      .top_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top_tit {
          font-family: PingFangSC;
          font-size: 0.32rem;
          line-height: 0.38rem;
          color: #40405e;
        }
        img {
          width: 0.56rem;
          height: 0.56rem;
        }
      }
      .tim {
        padding-top: 0.16rem;
        font-family: PingFangSC;
        font-size: 0.22rem;
        line-height: 0.26rem;
        color: #a0a0b3;
      }
    }
    .information {
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color:  #C9C9D1;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color:  #C9C9D1;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color:  #C9C9D1;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color:  #C9C9D1;
      }
      .tits {
        padding: 0.3rem 0 0.24rem 0.34rem;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
        color: #40405e;
      }
      .dz {
        padding-left: 0.34rem;
        font-family: PingFangSC;
        font-size: 0.3rem;
        line-height: 0.36rem;
        color: @cl-m;
        word-break: break-all;
        word-wrap: break-word;
      }
      .disabledName{
        width: 100%;
        border: 1px solid #979797;
        box-sizing: border-box;
        border-radius: 0.12rem;
        font-size: 0.3rem;
        line-height: 0.42rem;
        padding: 0.2rem 0.32rem;
      }
      .input {
        width: 100%;
        height: 0.84rem;
        padding: 0.22rem 0.32rem;
        background: #f7f7fa;
        border-radius: 6px;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
        // color: #C9C9D1;
      }
      .tisi {
        display: flex;
        padding-top: 0.32rem;
        align-items: center;
        img {
          width: 0.32rem;
          height: 0.32rem;
        }
        .tisi_tit {
          padding-left: 0.16rem;
          font-family: PingFangSC;
          font-size: 0.24rem;
          color: #f2a145;
        }
      }
    }
    .btns {
      padding-top: 0.6rem;
      display: flex;
      justify-content: space-between;
      .btn_item {
        background: linear-gradient(0deg, #dddde6, #dddde6);
        border-radius: 24px;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.32rem;
        text-align: center;
      }
      .btn1 {
        width: 2.5rem;
        height: 0.94rem;
        color: #40405e;
        line-height: 0.94rem;
      }
      .btn2 {
        width: 3.5rem;
        height: 0.96rem;
        line-height: 0.94rem;
        color: #ffffff;
      }
      .ss {
        background: @cl-m;
      }
    }
  }
}
</style>
