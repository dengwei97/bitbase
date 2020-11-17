<template>
  <div class="data">
    <div class="header">
      <img class="ic_wallet" src="@/assets/transactions/ic_wallet.png" alt="" />
      <div class="header_content">
        <p class="title">总资产折合</p>
        <div class=" numbers">
          <h1>{{walletsTotal.totalAmountToCoin}}USDT</h1>
          <p class="cny">≈{{walletsTotal.totalAmountToCny}} CNY</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="flex_center_between content_title">
        <h2>资产详情</h2>
        <div>
        <router-link to="/walletRecord/1" class="text color_m">财务记录</router-link>
        <router-link to="/walletRecord/2" class="text color_m">充提记录</router-link>
        </div>
      </div>
      <div class="table">
        <ul class="table_header flex text">
          <li>币种</li>
          <li>可用余额</li>
          <li>冻结</li>
          <li>操作</li>
        </ul>
        <div>
          <ul class="flex text table_content">
            <li class="text_content">
              <img
                class="ic_type"
                src="@/assets/transactions/ico_usdt.png"
                alt=""
              />
              USDT
            </li>
            <li class="text_content">{{wallets.availableCoinNum}}</li>
            <li class="text_content">{{wallets.frozenCoinNum}}</li>
            <li class="text text_cl">
              <div @click="onCharges">充币</div>
              <div @click="onCurrency">提币</div>
              <div><router-link to="/transactions">交易</router-link></div>
            </li>
          </ul> 
          <div class="operation" v-if="chargesisShow" >
            <div class="top"></div>
            <div class="operation_cont text">
              <div class="title">充币地址</div>
              <div class="adress flex_center_between">
                <h3>{{address}}</h3>
                <div class="address_right">
                  <div class="text_copy  flex">
                    <span
                      v-clipboard:copy="address"
                      v-clipboard:success="clipboardSuccess"
                    >
                      复制
                    </span>
                    <span @click="ewmisShow">二维码</span>
                  </div>
                  <div class="ewm" v-show='ewmShow'>
                    <div class="top ewm_top"></div>
                    <div id="qrcode1" ref="qrcode1" class="ewm_img"></div>
                  </div>
                  
                </div>
              </div>
              <div class="tips">
                <div class="tips_header flex">
                  <img
                    class="ico_tip"
                    src="@/assets/transactions/ico_tip_small.png"
                    alt=""
                  />
                  <span class="text">温馨提示</span>
                </div>
                <ul>
                  <li>
                    <i></i>
                    请勿向上述地址充值任何非USDT资产，否者资产将不可找回。
                  </li>
                  <li>
                    <i></i>
                    最小充值金额为1USDT，小于最小金额充值将不会上账且无法退回。
                  </li>
                  <li>
                    <i></i>
                    您的充值地址不会经常改变，可以重复充值；如有改变，我们会尽量通过公告或邮件通知您。
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="operation" v-if="currencyIsShow">
             <div class="top currency_top"></div>
             <div class="currency_content text">
                <div class="title">提币地址</div>
                <input type="text" class="currency_address" v-model="currency.targetAddress" placeholder="请输入提币地址" @blur="getGas">
                <div class="flex_center_between numbers" >
                  <div>数量</div>
                  <div>账户余额：<span class="text_h">{{wallets.availableCoinNum}}</span></div>
                </div>
                <div class="currency_num flex">
                  <input type="text" v-model="currency.coinNum" placeholder="请输入提币数量" @input="getArrival">
                  <span style="cursor: pointer" @click="tardNum">全部</span>
                </div>
                <div class="flex_center_between feesOrNum">
                  <div>
                    <p>手续费</p>
                    <div class="nums flex_center_between">
                      <span>{{gasNum}}</span>
                      <span>USDT</span>
                    </div>
                  </div>
                  <div>
                    <p>到账数量</p>
                    <div class="nums flex_center_between">
                      <span>{{arrivalNum}}</span>
                      <span>USDT</span>
                    </div>
                  </div>
                </div>
                <button @click="currencyClick">提币</button>
                <div class="tips">
                <div class="tips_header flex">
                  <img
                    class="ico_tip"
                    src="@/assets/transactions/ico_tip_small.png"
                    alt=""
                  />
                  <span class="text">温馨提示</span>
                </div>
                <ul>
                  <li>
                    <i></i>
                    最小可提币数量为：2 USDT(ERC20)。
                  </li>
                  <li>
                    <i></i>
                    为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，<br> 请耐心等待工作人员电话或邮件联系。
                  </li>
                  <li>
                    <i></i>
                    请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
                  </li>
                </ul>
              </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <testTradePwdPop ref="testTradePwdPop" @wallatCash='wallatCash'></testTradePwdPop>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import buyApi from '@/api/buy'
import testTradePwdPop from './components/testTradePwd'
import { inputTwoNumber } from '@/utils/index.js'
// 地址转二维码
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      userInfoDetails:{}, //用户信息
      chargesisShow:false,//充币弹框
      currencyIsShow:false,//提币框
      wallets:{
        availableCoinNum:'0.00',
        frozenCoinNum:'0.00'
      },
      address:'',//充币地址
      walletsTotal:{},
      ewmShow: false,//二维码
      gasNum:0,//手续费
      arrivalNum:0,//到账数量
      currency:{
        targetAddress:'',//提币地址
        coinNum:'',//提币数量
        coinName:'USDT',
      }
    };
  },
  created(){
    this.getUserInfoDetails()
    this.getWalletTotal()
    this.getWallet()
    this.getaddress()
  },
  components:{
    testTradePwdPop
  },
  methods:{
    //提币提交
    wallatCash(value){
      // console.log(this.currency)
				userInfoApi.wallatCash({
          targetAddress:this.currency.targetAddress,
          coinName:this.currency.coinName,
          coinNum:this.currency.coinNum,
          tradePwd:value.tradePwd,
					smsCode:value.smsCode
        }).then(res => {
					// console.log(res)
          this.$toast('操作成功')
          this.$refs.testTradePwdPop.hide()
          this.getWallet()
          this.getWalletTotal()
				}).catch(err => {
					this.$toast(err.data.message)
				})
    },
    //提币
    currencyClick(){
      if(!this.currency.targetAddress){
        this.$toast('请输入提币地址')
        return
      }
      if(!this.currency.coinNum){
        this.$toast('请输入提币数量')
        return
      }
      let value = {
        areaNo: this.userInfoDetails.areaNo,
        mobile: this.userInfoDetails.mobile
      }
      this.$refs.testTradePwdPop.show(value)
    },
    getArrival(){
      
      // this.currency.coinNum = this.currency.coinNum.replace(
      //  /[^0-9]+(\.?)+([0-9]{3})$|[^0-9]+(\..?)$/,
      //   ""
      // );
      this.currency.coinNum =  inputTwoNumber(this.currency.coinNum)
      if(this.currency.coinNum - 0 > this.wallets.availableCoinNum - 0){
        this.currency.coinNum = this.wallets.availableCoinNum - 0
      }
      this.arrivalNum = (Number(this.currency.coinNum) - Number(this.gasNum)).toFixed(2)
      if(this.arrivalNum < 0){
          this.arrivalNum = 0
        }
    },
    //查看手续费
    getGas(){
      userInfoApi.isBbf({
        toAddress:this.currency.targetAddress,
        coinName:this.currency.coinName
      }).then(res => {
        console.log(res)
        this.gasNum = res.data.data.gasNum
        this.arrivalNum = (Number(this.currency.coinNum) - Number(this.gasNum)).toFixed(2)
        if(this.arrivalNum < 0){
          this.arrivalNum = 0
        }
      })
    },
    tardNum(){
      this.currency.coinNum = this.wallets.availableCoinNum
      this.arrivalNum = (Number(this.currency.coinNum) - Number(this.gasNum)).toFixed(2)
      if(this.arrivalNum < 0){
          this.arrivalNum = 0
        }
    },
    //获取充币地址
    getaddress(){
      buyApi.getaddress({
        coinName:'USDT',
        type:'1'
      }).then(res => {
        this.address = res.data.data.address;
          
      })
    },
    //获取钱包列表 及详情
    getWallet(){
      userInfoApi.getWallet({}).then(res => {
        let id  = res.data.data[0].id
        if(id){
          userInfoApi.getWallDetails({
            id:id
          }).then(res => {
            console.log(res)
            this.wallets = res.data.data
          })
        }
      })
    },
  
    //获取用户详细信息
    getUserInfoDetails() {
      userInfoApi
        .getUserInfoDetails({})
        .then(res => {
          console.log(res);
          this.userInfoDetails = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取钱包总额
    getWalletTotal(){
      userInfoApi.getWalletTotal({}).then(res => {
        // console.log(res)
        this.walletsTotal = res.data.data
      })
    },
    // 复制
    clipboardSuccess() {
        this.$toast.success("复制成功");
      },
      onCharges(){
        this.chargesisShow = !this.chargesisShow
        this.currencyIsShow = false
      },
      onCurrency(){
        this.currencyIsShow = !this.currencyIsShow
        this.chargesisShow = false
      },
      ewmisShow(){
        this.ewmShow = !this.ewmShow
        this.ewmAdress()
      },
      //地址转二维码
      ewmAdress(){
        this.$nextTick(() => {
          var o = document.getElementById("qrcode1");
          // console.log(o);
          o.innerHTML = "";
          var w = o.offsetWidth;
          var h = o.offsetHeight;
          console.log(w);
          console.log(h);
          new QRCode(this.$refs.qrcode1, {
            width: w, // 设置宽度，单位像素
            height: h, // 设置高度，单位像素
            text: this.address // 设置二维码内容或跳转地址
          });
        });
      }
  }
};
</script>

<style lang='less' scoped>
.data {
  width: 790px;
  margin: 0 auto 40px;
  input::-webkit-input-placeholder{
    color: #a1abba;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex_center_between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text {
    font-size: 14px;
    color: #9ea8b7;
  }
  .text_content {
    font-size: 16px;
    color: #40405e;
  }
  .header {
    display: flex;
    padding: 45px 0 58px;
    .ic_wallet {
      width: 60px;
      height: 60px;
    }
    .header_content {
      padding-left: 10px;
      .title {
        font-size: 14px;
        line-height: 20px;
        color: #40405e;
      }
      .numbers {
        padding-top: 5px;
        display: flex;
        align-items: flex-end;
        h1 {
          font-size: 26px;
          line-height: 30px;
          color: #40405e;
        }
        .cny {
          padding-left: 5px;
          font-size: 14px;
          line-height: 20px;
          color: #40405e;
        }
      }
    }
  }
  
  .content {
    box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
    border-radius: 6px;

    .content_title {
      padding: 20px 25px;

      h2 {
        font-size: 20px;
        line-height: 32px;
        color: #40405e;
      }
      .color_m{
    color:@cl-m;
    padding-left: 0.4rem;
  }
    }
    .table {
      ul {
        li {
          display: flex;
          align-items: center;

          .ic_type {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }

          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 25%;
          }
          &:nth-child(3) {
            width: 25%;
          }
          &:nth-child(4) {
            width: 25%;
            justify-content: flex-end;
          }
        }
      }
      .text_cl {
        color: @cl-m;
        div {
          margin-left: 26px;
          cursor: pointer;
        }
      }
      .table_header {
        background: rgba(1, 14, 26, 0.02);
        padding: 14px 25px;
      }
      .table_content {
        padding: 25px;
        border-bottom: 1px solid #eeeeee;
      }
      .operation {
        padding: 25px;
        position: relative;
        .top {
          position: absolute;
          top: 0;
          right: 20%;
        }
        .top:before,
        .top:after {
          position: absolute;

          content: "";
          border-top: 10px transparent dashed;
          border-left: 10px transparent dashed;
          border-right: 10px transparent dashed;
          border-bottom: 15px #fff solid;
        }
        .top:before {
          border-bottom: 15px #e4e7ed solid;
        }
        .top:after {
          top: 1px; /*覆盖并错开1px*/
          border-bottom: 15px #fff solid;
        }
        .operation_cont {
          box-shadow: 0px 0px 4px rgba(22, 20, 20, 0.1);
          padding: 22px 20px;
          .title {
            padding-bottom: 17px;
          }
          .adress {
            h3 {
              font-size: 18px;
              line-height: 30px;
              font-weight: bold;
              color: #40405e;
            }
            .address_right{
              position: relative;

              .text_copy {
                color: @cl-m;
                span {
                  margin-left: 26px;
                  cursor: pointer;
                }

              }
              .ewm{
                position: absolute;
                width: 90px;
                height: 90px;
                padding: 5px;
                box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
                top: 40px;
                right: -20px;
                .ewm_top{
                  top: -25px;
                  right: 50px;

                }
                .ewm_img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        .tips {
          padding-top: 30px;
          .tips_header {
            padding-bottom: 20px;
            .ico_tip {
              width: 16px;
              height: 16px;
            }
            span {
              padding-left: 8px;
              color: #fcc478;
            }
          }
          ul li {
            width: 100%;
            line-height: 20px;
            padding-bottom: 5px;
            display: flex;
            align-items: flex-start;
            i {
              display: inline-block;
              margin-top: 8px;
              width: 5px;
              height: 5px;
              margin-right: 5px;
              border-radius: 50%;
              background: #9ea8b7;
              flex-shrink: 1;
            }
          }
        }

        .currency_top{
          position: absolute;
          top:0;
          right: 13%;
        }
        .currency_content{
          background: #FFFFFF;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
          padding: 0 20px;
          
          .title{
            padding: 34px 0 15px;
          }
          .currency_address{
            padding: 15px 25px;
            border: 1px solid #DBDDE1;
            width: 100%;
            border-radius: 4px;
            font-size: 16px;
            line-height: 22px;
            color: #40405E;
          }
          .numbers{
            padding: 32px 0  16px;
            .text_h{
              color: #40405E;
            }
          }
          .currency_num{
            padding: 15px 25px;
            border: 1px solid #DBDDE1;
            width: 100%;
            border-radius: 4px;
            font-size: 16px;
            line-height: 22px;
            color: #40405E;
            input{
              flex: 1;
            }
            span{
              font-size: 18px;
              color: @cl-m;
            }
          }
          .feesOrNum{
            padding: 30px 0 36px;
            .nums{
              width: 300px;
              padding: 14px 10px;
              background: #F6F7F7;
              border-radius: 4px;
              margin-top: 16px;
            }
          }
          button{
            width: 161px;
            height: 48px;
            line-height: 48px;
            color: #fff;
            font-size: 18px;
            background: @cl-m;
            border-radius: 24px;
            cursor: pointer;
          }
          
        }
      }
    }
  }
}
@media(max-width: 1200px){
  .data {
  width: 790px * 0.8;
  margin: 0 auto 40px * 0.8;
 
  .text {
    font-size: 14px * 0.8;
  }
  .text_content {
    font-size: 16px * 0.8;
  }
  .header {
    padding: 45px * 0.8 0 58px * 0.8;
    .ic_wallet {
      width: 60px * 0.8;
      height: 60px * 0.8;
    }
    .header_content {
      padding-left: 10px * 0.8;
      .title {
        font-size: 14px * 0.8;
        line-height: 20px * 0.8;
      }
      .numbers {
        padding-top: 5px * 0.8;
        h1 {
          font-size: 26px * 0.8;
          line-height: 30px * 0.8;
        }
        .cny {
          padding-left: 5px * 0.8;
          font-size: 14px * 0.8;
          line-height: 20px * 0.8;
        }
      }
    }
  }
  .content {
    box-shadow: 0px 4px * 0.8 24px * 0.8 rgba(64, 64, 94, 0.08);
    border-radius: 6px * 0.8;
    .content_title {
      padding: 20px * 0.8 25px * 0.8;

      h2 {
        font-size: 20px * 0.8;
        line-height: 32px * 0.8;
      }
    }
    .table {
      ul {
        li {

          .ic_type {
            width: 28px  * 0.8;
            height: 28px * 0.8;
            margin-right: 10px * 0.8;
          }

          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 25%;
          }
          &:nth-child(3) {
            width: 25%;
          }
          &:nth-child(4) {
            width: 25%;
            justify-content: flex-end;
          }
        }
      }
      .text_cl {
        div {
          margin-left: 26px * 0.8;
        }
      }
      .table_header {
        padding: 14px * 0.8 25px * 0.8;
      }
      .table_content {
        padding: 25px * 0.8;
      }
      .operation {
        padding: 25px * 0.8;
        .top:before,
        .top:after {
          position: absolute;

          content: "";
          border-top: 10px * 0.8 transparent dashed;
          border-left: 10px  * 0.8 transparent dashed;
          border-right: 10px * 0.8 transparent dashed;
          border-bottom: 15px * 0.8 #fff solid;
        }
        .top:before {
          border-bottom: 15px * 0.8 #e4e7ed solid;
        }
        .top:after {
          top: 1px; /*覆盖并错开1px*/
          border-bottom: 15px * 0.8 #fff solid;
        }
        .operation_cont {
          padding: 22px * 0.8 20px * 0.8;
          .title {
            padding-bottom: 17px * 0.8;
          }
          .adress {
            h3 {
              font-size: 18px * 0.8;
              line-height: 30px * 0.8;
            }
            .address_right{

              .text_copy {
                span {
                  margin-left: 26px * 0.8;
                }

              }
              .ewm{
                width: 90px * 0.8;
                height: 90px * 0.8;
                padding: 5px * 0.8;
                top: 40px * 0.8;
                right: -20px * 0.8;
                .ewm_top{
                  top: -25px * 0.8;
                  right: 50px * 0.8;

                }
              }
            }
          }
        }
        .tips {
          padding-top: 30px * 0.8;
          .tips_header {
            padding-bottom: 20px * 0.8;
            .ico_tip {
              width: 16px * 0.8;
              height: 16px * 0.8;
            }
            span {
              padding-left: 8px * 0.8;
            }
          }
          ul li {
            line-height: 20px * 0.8;
            padding-bottom: 5px * 0.8;
            i {
              margin-top: 8px * 0.8;
              width: 5px * 0.8;
              height: 5px * 0.8;
              margin-right: 5px * 0.8;
            }
          }
        }

        .currency_content{
          padding: 0 20px * 0.8;
          
          .title{
            padding: 34px * 0.8 0 15px * 0.8;
          }
          .currency_address{
            padding: 15px * 0.8 25px * 0.8;
            font-size: 16px * 0.8;
            line-height: 22px * 0.8;
          }
          .numbers{
            padding: 32px * 0.8 0  16px * 0.8;
          }
          .currency_num{
            padding: 15px * 0.8 25px * 0.8;
            font-size: 16px * 0.8;
            line-height: 22px * 0.8;
            span{
              font-size: 18px * 0.8;
            }
          }
          .feesOrNum{
            padding: 30px * 0.8 0 36px * 0.8;
            .nums{
              width: 300px * 0.8;
              padding: 14px * 0.8 10px * 0.8;
              margin-top: 16px * 0.8;
            }
          }
          button{
            width: 161px * 0.8;
            height: 48px * 0.8;
            line-height: 48px * 0.8;
            font-size: 18px * 0.8;
            border-radius: 24px * 0.8;
          }
          
        }
      }
    }
  }
}
}
</style>