<template>
  <div class="bindAlipay">
    <div class="user" v-if="!nameDisabled">
      请绑定用户名为“
      <span>{{ payment.name }}</span>
      ”的{{ payment.bindType == 2 ? "微信" : "支付宝"}}
    </div> 
    <div class="account" v-if="nameDisabled">
      <input type="text" :placeholder="payment.bindType == 2 ? '微信用户名' : '支付宝用户名'" v-model="payment.name" />
    </div>
    <div class="account">
      <input type="text" :placeholder="payment.bindType == 2 ? '微信账号' : '支付宝账号'" v-model="payment.account" />
    </div>
    <div class="photo">
      
			<div class="pic" v-if="payment.paymentCode">
				<img class="codeimg" :src="payment.paymentCode" alt>
				<img class="deleteimg" src="@/assets/transactions/ico_delete_circle_red.png" @click="closePic" alt />
			</div>
      <img  v-else src="@/assets/transactions/ico_add_camera.png" @click="upload()" alt />
      <span>上传{{ payment.bindType == 2 ? "微信" : "支付宝" }}二维码(选填)</span>
    </div>
    <button
      class="btn"
      :class="{ btnState: getState }"
      :disabled="!getState"
			@click="submit()"
    >提交</button>
    <div class="delete" v-if="payment.id">
        不想要了，<span @click="unbind">删除</span>
      </div>
    <input ref="file" type="file" multiple style="display:none;" @change="uploadFile" />
  </div>
</template>

<script>
import buyApi from "@/api/buy";
import userInfoApi from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
export default {
	name:'bindAlipay',
	data() {
		return {
      nameDisabled: false, // 是否可以输入名字
      payment: {
        id: null,
        bindType: 2,
        paymentCode: "",
        name: "",
        account: ""
      } //信息
		 
		}
  },
  created(){
    this.getKycList();
    this.payment.bindType = this.$route.params.type;
    if (this.payment.bindType == 2) {
      if (localStorage.getItem("wx")) {
        this.payment = JSON.parse(localStorage.getItem("wx"));
        console.log(JSON.parse(localStorage.getItem("wx")));
      }
    } else {
      if (localStorage.getItem("zfb")) {
        this.payment = JSON.parse(localStorage.getItem("zfb"));
        console.log(JSON.parse(localStorage.getItem("zfb")));
      }
    }
  },
  computed: {
    getState: function() {
      let state = true;
      if (!this.payment.name) {
        state = false;
      }
      if (!this.payment.account) {
        state = false;
      }
      return state;
    }
  },
	methods:{
    // 删除绑定
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
    },
    // 获取kyc信息
    getKycList() {
      orderInfoApi.getadderSell().then(res => {
        console.log(res);
        var data = res.data.data;
        if (data.special == 2) {
          this.nameDisabled = true;
        } else {
          this.nameDisabled = false;
          this.payment.name = data.realName;
        }
      });
    },
		upload(){
			this.$refs.file.click();
		},
		uploadFile(e){
			const fileList = e.target.files[0];
			if (fileList != undefined) {
				buyApi.uploadphoto({file: fileList})
				.then(res=>{
					if (res.data.data) {
            this.payment.paymentCode = res.data.data;
          }
				})
				.catch(err=>{})
			}
		},
		closePic(){
			this.payment.paymentCode = "";
		},
		submit(){
			 userInfoApi
        .bindPayment({
          id:this.payment.id,
          bindType:this.payment.bindType,
          paymentCode:this.payment.paymentCode,
          name:this.payment.name,
          account:this.payment.account
        })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(err => {
          this.$toast(err.data.message);
        });
		}
	}

}
</script>

<style lang="less" scoped>
.bindAlipay {
  width: 100vw;
  padding: 0.64rem 0.24rem 0;

  .user {
    width: 100%;
    height: 0.96rem;
    background: #f7f7fa;
    border-radius: 0.12rem;
    font-size: 0.3rem;
    color: #40405e;
    line-height: 0.96rem;
    padding-left: 0.32rem;
    margin-bottom: 0.32rem;
    span {
      color: @cl-m;
    }
  }

  .account {
    width: 100%;
    height: 0.96rem;
    background: #f7f7fa;
    border-radius: 0.12rem;
    padding: 0.26rem 0.32rem;
    margin-bottom: 0.32rem;

    input {
      width: 100%;
      height: 100%;
      font-size: 0.3rem;
      background: #f7f7fa;
    }

    ::-webkit-input-placeholder {
      color: #c9c9d1;
    }
  }

  .photo {
    width: 100%;
    height: 1.92rem;
    background: #f7f7fa;
    border-radius: 0.12rem;
    padding-left: 0.32rem;
    
    display: flex;
    align-items: center;

    img {
      width: 1.28rem;
      height: 1.28rem;
		}
		
		.pic{
			width: 1.28rem;
			height: 1.28rem;
			position: relative;

			.codeimg{
				width: 100%;
				height: 100%;
			}

			.deleteimg{
				position: absolute;
				width: .32rem;
				height: .32rem;
				top: 0;
        right: 0;
				transform: translateX(50%) translateY(-50%);
			}
		}

    span {
      font-size: 13px;
      color: #a0a0b3;
      margin-left: 0.24rem;
    }
  }

  .btn {
    width: 100%;
    height: 0.96rem;
    border-radius: 0.48rem;
    font-weight: bold;
    font-size: 0.32rem;
    color: #ffffff;
    margin-top: 0.56rem;
    background: linear-gradient(0deg, #DDDDE6, #DDDDE6);
  }
  .btnState {
    background: @gd-m5;
  }
  .delete {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.32rem;
    font-size: 0.26rem;
    line-height: 0.36rem;
    color: #a0a0b3;
    span {
      color: red;
      cursor: pointer;
    }
  }
}
</style>