<template>
  <div class="data">
    <div v-if='step == 1'>

      <section class="flex_center_between section_title">
        <div class="flex">
          <img class="ico_usdt" src="@/assets/transactions/ico_usdt.png" alt="" />
          <h5>USDT</h5>
        </div>
        <span class="text">提币</span>
      </section>
      <section class="flex_center_between section_name text">
        <span>链名称</span>
        <span>ERC20</span>
      </section>
      <section class="section_block">
        <p class="text">提币数量</p>
        <div class="flex_center_between num_block">
          <input type="text" placeholder="最小提币数量2" v-model="form.number" @input="getArrival" />
          <div>USDT</div>
        </div>
        <div class="flex_center_between text_f13 balance">
          <div class="text_h">账户余额：{{wallets.availableCoinNum}} USDT</div>
          <div class="text_cl" @click="tardNum">全部提出</div>
        </div>
      </section>
      <section class="section_block">
        <p class="text">提币地址</p>
        <textarea 
          
          class="input text"
          v-model="form.address"
          placeholder="请输入提币地址"
          @blur="getGas"
        />
      </section>
      <section class="section_border text">
        <p>手续费</p>
        <div class="flex_center_between number_item">
          <span>{{gasNum}}</span>
          <span>USDT</span>
        </div>
      </section>
      <section class="section_border text">
        <p>到账数量</p>
        <div class="flex_center_between number_item">
          <span>{{arrivalNum}}</span>
          <span>USDT</span>
        </div>
      </section>
      <section class="section_tips">
        <div class="flex text tips_title">
          <img
            class="ico_tip"
            src="@/assets/transactions/ico_tip_small.png"
            alt=""
          />
          <span>温馨提示</span>
        </div>
        <ul class="text_f13">
          <li class="flex">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 0L6 3L3 6L0 3L3 0Z"
                fill="#40405E"
                fill-opacity="0.8"
              />
            </svg>
            <span>最小可提币数量为：2 USDT(ERC20)。</span>
          </li>
          <li class="flex">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 0L6 3L3 6L0 3L3 0Z"
                fill="#40405E"
                fill-opacity="0.8"
              />
            </svg>
            <span
              >为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</span
            >
          </li>
          <li class="flex">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 0L6 3L3 6L0 3L3 0Z"
                fill="#40405E"
                fill-opacity="0.8"
              />
            </svg>
            <span>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</span>
          </li>
        </ul>
      </section>
      <button class="btn" @click="currencyClick">提币</button>
    </div>
    <div v-if="step == 2">
      <div class="flex form_item">
        <span style="padding-right:0.32rem">+{{userInfoDetails.areaNo}}</span>
        <span>{{userInfoDetails.mobile}}</span>
      </div>
      <div class="flex send_code form_item">
          <input
            type="number"
            v-model="form.code"
            placeholder="请输入手机验证码"
          />
          <div class="send" v-show="!countdown.show">
            {{ countdown.count }}s
          </div>
          <div class="send" v-show="countdown.show" @click="send">发送</div>
        </div>
        <div class="stepbtn">
          <button class="btn " @click="currencyClick">提币</button>
        </div>
    </div>
    <verTransaPwd ref='verTransaPwd' @varTransaSu='varTransaSu'></verTransaPwd>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import buyApi from '@/api/buy'
import { inputTwoNumber } from '@/utils/index.js'
import verTransaPwd from "@/components/verTransaPwd"; //验证交易密码
export default {
  data() {
    return {
      step:1,//1提币输入密码数量  2 验证码输入
      form: {
        number: "",
        address:"",
        code:'',
        pwd:''
      },
      gasNum:0,//手续费
      arrivalNum:0,//到账数量
      wallets:{},
      isSubmit:false ,//手续费请求过来可以提交
      // 倒计时相关
      countdown: {
        show: true,
        count: "",
        timer: null
      },
      userInfoDetails: {} //用户信息
    };
  },
  components:{
    verTransaPwd
  },
  created(){
    this.getUserInfoDetails()
    this.getWallet()
  },
  methods:{
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
    // 倒计时
    CountdownNumber() {
      const timecount = 60;
      if (!this.countdown.timer) {
        this.countdown.count = timecount;
        this.countdown.show = false;
        this.countdown.timer = setInterval(() => {
          if (this.countdown.count > 0 && this.countdown.count <= timecount) {
            this.countdown.count--;
          } else {
            this.countdown.show = true;
            clearInterval(this.countdown.timer);
            this.countdown.timer = null;
          }
        }, 1000);
      }
    },
    // 获取验证码
    send() {
      buyApi
        .mobileCode({
          account: this.userInfoDetails.mobile,
          areaNo: this.userInfoDetails.areaNo
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.CountdownNumber();
          }
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    },
    varTransaSu(value){
      if(value.length < 6){
        this.$toast('请输入6位支付密码！')
        return
      }
      this.form.pwd = value
      this.$refs.verTransaPwd.hide()
      this.step = 2
      this.send()
    },
    // 提币
    currencyClick(){

      if(!this.form.number){
        this.$toast('提币数量不能为空！')
        return
      }
      if(!this.form.address){
        this.$toast('提币地址不能为空！')
        return
      }
      if(this.step == 1){

        if(this.isSubmit){
          this.$refs.verTransaPwd.show()
        }
      }else{
        userInfoApi.wallatCash({
          targetAddress:this.form.address,
          coinName:'USDT',
          coinNum:this.form.number,
          tradePwd:this.form.pwd,
          smsCode:this.form.code
        }).then(res => {
          this.$toast('操作成功')
          this.step = 1
          this.form.address = ''
          this.form.number = ''
          this.form.code = ''
          this.form.pwd = ''
          this.gasNum = 0
          this.arrivalNum = 0
          this.getWallet()
        }).catch(err => {
          this.$toast(err.data.message)
        })
      }
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
    tardNum(){
      this.form.number = inputTwoNumber(this.wallets.availableCoinNum)
      this.arrivalNum = (Number(this.form.number) - Number(this.gasNum)).toFixed(2)
      if(this.arrivalNum < 0){
          this.arrivalNum = 0
        }
    },
    getArrival(){
      this.form.number =  inputTwoNumber(this.form.number)
      if( this.form.number - 0 > this.wallets.availableCoinNum - 0){
        this.form.number = this.wallets.availableCoinNum - 0
      }
      this.arrivalNum = (Number(this.form.number) - Number(this.gasNum)).toFixed(2)
      if(this.arrivalNum < 0){
          this.arrivalNum = 0
        }
    },
    //查看手续费
    getGas(){
      userInfoApi.isBbf({
        toAddress:this.form.address,
        coinName:'USDT'
      }).then(res => {
        console.log(res)
        this.isSubmit = true
        this.gasNum = res.data.data.gasNum
        this.arrivalNum = (Number(this.form.number) - Number(this.gasNum)).toFixed(2)
        if(this.arrivalNum < 0){
          this.arrivalNum = 0
        }
      })
    },
  },
};
</script>

<style lang='less' scoped>
.data {
  background: #f7f7fa;
  min-height: calc(100vh - 1.16rem);
  padding: 0.4rem 0.32rem;
  input::-webkit-input-placeholder {
    color: #dddde6;
  }
  textarea::-webkit-input-placeholder {
    color: #dddde6;
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
  .text {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #40405e;
  }
  .text_h {
    color: #a0a0b3;
  }
  .text_cl {
    color: @cl-m;
  }
  .text_f13 {
    font-size: 0.26rem;
    line-height: 0.36rem;
    color: #40405e;
  }
  .text_f12 {
    font-size: 0.24rem;
    line-height: 0.36rem;
    color: #40405e;
  }
  .section_title {
    padding: 0.32rem;
    background: #fff;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
    .ico_usdt {
      width: 0.8rem;
      height: 0.8rem;
    }
    h5 {
      font-size: 0.36rem;
      padding-left: 0.24rem;
    }
  }
  .section_name {
    padding: 0.28rem 0.36rem;
    background: #fff;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
  }
  .section_block {
    padding: 0.24rem 0.36rem;
    background: #fff;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
  }
  .section_border {
    padding: 0.24rem 0.36rem;
    border: 1px solid #ededf2;
    border-radius: 0.12rem;
    margin-bottom: 0.24rem;
    .number_item {
      padding-top: 0.24rem;
    }
  }
  .num_block {
    margin: 0.16rem 0 0.22rem;
    input {
      // flex: 1;
      border: none;
      outline: none;
      font-size: 0.4rem;
    }
    div { 
      font-size: 0.32rem;
    }
  }
  .balance {
    padding-top: 0.24rem;
    border-top: 1px solid#F5F5FA;
  }
  .input {
    width: 100%;
    border: none;
    outline: none;
    margin-top: 0.3rem;
  }
  .section_tips {
    padding: 0.3rem 0.32rem;
    .tips_title {
      padding-bottom: 0.24rem;
      color: #fcc478;
    }
    .ico_tip {
      width: 0.32rem;
      height: 0.32rem;
      margin-right: 0.16rem;
    }
    ul {
      li {
        align-items: flex-start;
        padding: 0 0.1rem 0.16rem;
        color: rgba(64, 64, 94, 0.8);
        svg {
          margin-top: 0.12rem;
          flex-shrink: 0;
          margin-right: 0.26rem;
        }
      }
    }
  }
  .form_item{
    padding: 0.28rem 0.32rem;
    background: #FFFFFF;
    border-radius: 0.12rem;
    font-size: 0.3rem;
    margin-bottom: 0.32rem;
    input{
      flex: 1;
      border: none;
      outline: none;
    }
  }
  .send_code {
    .send {
      padding-left: 0.3rem;
      font-size: 0.26rem;
      color: @cl-m;
      border-left: 1px solid #ededf2;
    }
  }
  
  .btn {
    background: @cl-m;
    border-radius: 0.48rem;
    color: #ffffff;
    font-size: 0.32rem;
    line-height: 0.96rem;
    height: 0.96rem;
    width: 100%;
    margin-top: 0.5rem;
  }
  .stepbtn{
    position: fixed;
    bottom: 0.8rem;
    left: 0;
    width: 100%;
    padding:0 0.32rem;
  }
}
</style>