<template>
  <div v-if="pop" class="pop_absolute_box">
    <div class="pop_absolute_box_bg" @click="Clickpop"></div>
    <div v-if="pop" class="popup">
      <div class="pop_center">
        <div class="center_top">
          <div class="top_item">
            <div class="top_tit">输入付款账户信息</div>
            <img v-if="poptype==3" src="@/assets/transactions/ico_alipay.png" alt="" />
            <img v-if="poptype==2" src="@/assets/transactions/ico_weixinpay.png" alt="" />
            <img v-if="poptype==1" src="@/assets/transactions/ico_bankpay.png" alt="" />
          </div>
          <p class="tim">请输入您的付款账户信息方便承兑商核对订单</p>
        </div>
        <div class="information">
          <div class="tits">请确认您的USDT接收地址为下方所示</div>
          <div class="dz">{{ address }}</div>
          <div class="tits">付款账户真实姓名</div>
          <input v-model="name" class="input" type="text" placeholder="输入您付款账户的真实姓名" @input="inputFunction()" />
          <div class="tisi">
            <img src="@/assets/transactions/ico_tip_small.png" alt="" />
            <div class="tisi_tit">请确认您的USDT接收地址，确认无误后在下单</div>
          </div>
        </div>
        <div class="btns">
          <div class="btn_item  btn1">{{ time }}s自动取消</div>
          <button class="btn_item  btn2" :disabled="!isinput" :class="{ss:isinput}" @click="order">立即下单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pop: {
      type: Boolean
    },
    poptype: {
      type: Number
    },
    time: {
      type: Number
    },
    address: {
      type: String
    }

  },

  data() {
    return {
      name: '',
      isinput: false
    }
  },
  mounted() {

  },
  methods: {
    Clickpop() {
      this.name = ''
      this.$emit('Clickpop')
    },
    inputFunction() {
      if (this.name !== '') {
        this.isinput = true
      } else {
        this.isinput = false
      }
    },
    order() {
      this.$emit('order', this.name)
    }
  }

}
</script>

<style lang="less" scoped>

// .overlay{
//     position: fixed;
//     top: 0;
//     left: 0;
//     z-index:1001;
//     width: 100%;
//     height: 100%;
//     background: #000000;
//     opacity: 0.4;
// }
.popup{
    position: absolute;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    z-index: 1002;
    left: 0;
    bottom:0.88rem;
    padding: 0 0.32rem;

    .pop_center{
      width: 100%;
      background-color: #fff;
      border-radius: 0.15rem;
      padding: 0.5rem 0.32rem 0.6rem 0.32rem;
      .center_top{
        border-bottom:1px solid #F5F5FA;
        padding-bottom:0.32rem ;
        .top_item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .top_tit{
            font-family: PingFangSC;
            font-size: 0.32rem;
            line-height: 0.38rem;
            color: #40405E;
          }
          img{
            width: 0.56rem;
            height: 0.56rem;
          }
        }
        .tim{
          padding-top: 0.16rem;
          font-family: PingFangSC;
          font-size: 0.22rem;
          line-height: 0.26rem;
          color: #A0A0B3;

        }
      }
      .information{
        .tits{
          padding:0.3rem 0 0.24rem 0.34rem;
          font-family: PingFangSC;
          font-size: 0.28rem;
          line-height: 0.32rem;
          color: #40405E;
        }
        .dz{
          padding-left:0.34rem ;
          font-family: PingFangSC;
          font-size: 0.3rem;
          line-height: 0.36rem;
          color: #0CB397;
          word-break:break-all;
          word-wrap:break-word;
        }
        .input{
          width: 100%;
          height: 0.84rem;
          padding: 0.22rem 0.32rem;
          background: #F7F7FA;
          border-radius: 6px;
          font-family: PingFangSC;
          font-size: 0.28rem;
          line-height: 0.32rem;
          // color: #C9C9D1;
        }
        .tisi{
          display: flex;
          padding-top: 0.32rem;
          align-items: center;
          img{
            width: 0.32rem;
            height: 0.32rem;
          }
          .tisi_tit{
            padding-left: 0.16rem;
            font-family: PingFangSC;
            font-size: 0.24rem;
            color: #F2A145;

          }
        }
      }
      .btns{
        padding-top: 0.6rem;
        display: flex;
        justify-content: space-between;
        .btn_item{
          background: linear-gradient(0deg, #DDDDE6, #DDDDE6);
          border-radius: 24px;
          font-family: PingFangSC;
          font-size: 0.28rem;
          line-height: 0.32rem;
          text-align: center;
        }
        .btn1{
          width: 2.5rem;
          height: 0.94rem;
          color: #40405E;
          line-height: 0.94rem;
        }
        .btn2{
          width: 3.5rem;
          height: 0.96rem;
          line-height: 0.94rem;
          color: #FFFFFF;
        }
        .ss{
          background: #0CB397;
        }
      }
    }

}
</style>
