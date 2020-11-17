<template>
  <div class="googleVerification">
    <div class="content">
      <div class="prompt">
        <img src="@/assets/transactions/ico_web_promt.png" />
        <p>谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。</p>
      </div>
      <section class="sec">
        <h3>
          <span>01</span>
          下载谷歌验证器APP
        </h3>
        <p>ios用户登录App Store 搜索“Authenticatore”下载。安卓用户登录应用商店或使用手机浏览器搜索“谷歌验证器”下载。安卓用户搜索不到“谷歌验证器”时，请从“腾讯应用宝”中搜索“身份验证器”。</p>
      </section>
      <section class="sec">
        <h3>
          <span>02</span>
          在谷歌验证器中添加密钥并备份
        </h3>
        <p>打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。</p>
        <div class="googleCode">
					<div id="qrcode1" ref="qrcode1"></div>
          <div class="code">
            <p>{{key}}</p>
            <div class="co">
              <copy :text="key"></copy>
              <span>复制</span>
            </div>
          </div>
        </div>
        <div class="pro">
          <div class="up">
            <img src="@/assets/transactions/ic_addlak_buy.png" alt />
            <span>温馨提示</span>
          </div>
          <p class="down">密钥用于手机更换或遗失找回谷歌验证器，绑定前请务必奖下述密钥备份保存。</p>
        </div>
      </section>
      <section class="sec">
        <h3>
          <span>03</span>
          输入登录密码
        </h3> 
        <h3 class="four">已绑定账号</h3>
        <div class="inp">
          <span class="inp_text">{{account}}</span>
          <copy :text="account"></copy>
        </div>
        <h3 class="four">谷歌验证码</h3>
        <div class="inp">
          <input placeholder="请输入谷歌验证码" type="text" v-model="google"/>
        </div>
      </section>
      <button class="btn" @click="sumbit()">提交</button>
    </div>
  </div>
</template>

<script>
import copy from "./components/copy";
import getUserInfo from "../../../api/userInfo";
import QRCode from "qrcodejs2";
export default {
  name: "googleVerification",
  data() {
    return {
      key: "",
			account: '',
			password:'',
			google: ''
    };
	},
	created() {
		this.getAccount(),
		this.getGoogle()
	},
  components: {
    copy
	},
	methods: {
		getAccount(){
			getUserInfo.getUserInfo().then(res=>{
				this.account = res.data.data.mobile;
			}).catch(err=>{})
		},
		getGoogle(){
			getUserInfo.getGenerate().then(res=>{
				this.key = res.data.data.secretKey;
				let qrCode = res.data.data.qrBarCode;
				 this.$nextTick(() => {
            var o = document.getElementById("qrcode1");
            // console.log(o);
            var w = o.offsetWidth;
            var h = o.offsetHeight;
            new QRCode(this.$refs.qrcode1, {
              width: w, // 设置宽度，单位像素
              height: h, // 设置高度，单位像素
              text: qrCode // 设置二维码内容或跳转地址
            });
          });
			}).catch(err=>{})
		},
		sumbit(){
			getUserInfo.getVerify({pwd:this.password,pwdType:1}).then(res=>{
				getUserInfo.getVerGoogle({code:this.google}).then(res=>{
					
				}).catch(err=>{
				this.$toast(err.data.message);
			})
			}).catch(err=>{
				this.$toast(err.data.message);
			})
		}
	},
};
</script>

<style lang="less" scoped>
.googleVerification {
  .content {
    width: 790px;
    margin: 37px auto 117px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 40px;

    .prompt {
      display: flex;
      font-size: 14px;
      color: #9ea8b7;
      line-height: 20px;

      img {
        width: 17px;
        height: 17px;
        margin-right: 15px;
      }
		}
		
    .sec {
      margin-top: 50px;

      h3 {
        font-size: 18px;
        color: #40405e;
        font-weight: bold;
        display: flex;

        span {
          width: 24px;
          height: 24px;
          background: rgba(12, 179, 151, 0.2);
          color: #0cb397;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          border-radius: 100%;
          margin-right: 8px;
        }
      }

      p {
        font-size: 14px;
        line-height: 18px;
        color: #9ea8b7;
        padding-left: 32px;
        padding-top: 11px;
      }

      .googleCode {
        width: 473px;
        height: 180px;
        margin-left: 31px;
        margin-top: 36px;
        border: 1px solid #0cb397;
        display: flex;
        justify-content: center;
				align-items: center;
				
					#qrcode1{
						width: 138px;
						height: 138px;
					}      

        .code {
          width: 284px;
          margin-left: 11px;

          p {
            width: 100%;
            color: #000000;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }

          .co {
            margin: 10px auto 0;
            width: 79px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #0cb397;
            border-radius: 1px;

            span {
              font-size: 12px;
              color: #0cb397;
              margin-left: 8px;
            }
          }
        }
      }

      .pro {
        width: 473px;
        height: 103px;
        padding: 0 18px;
        margin: 36px 0 0 31px;
        background: #f7f7fa;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .up {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #f2a145;
          margin-top: 22px;
          display: flex;
          align-items: center;

          img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
          }
        }

        .down {
          font-size: 12px;
          padding-left: 24px;
        }
      }

      .four {
        margin: 28px 0 0 31px;
        font-weight: normal;
        font-size: 16px;
        color: #000000;
      }

      .inp {
        width: 473px;
        height: 56px;
        margin: 18px 0 0 31px;
        border: 1px solid #dddde6;
        padding: 17px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          width: 100%;
          height: 100%;
          font-size: 16px;
        }

        input::-webkit-input-placeholder {
          color: #9ea8b7;
        }

        .inp_text {
          font-size: 16px;
          color: #000000;
        }
      }
    }

    .btn {
      width: 473px;
			height: 48px;
			margin-left: 31px;
			margin-top: 36px;
			margin-bottom: 11px;
      background: #dddde6;
      border-radius: 41px;
      font-weight: 500;
      font-size: 16px;
			color: #ffffff;
			cursor: pointer;
    }
  }
}
</style>