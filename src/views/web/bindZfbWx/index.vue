<template>
  <div>
    <div class="content">
      <p>{{ payment.bindType == 2 ? "绑定微信" : "绑定支付宝" }}</p>
      <div class="item" v-if="!nameDisabled">
        请绑定用户名为“<span>{{ payment.name }}</span>”的{{
          payment.bindType == 2 ? "微信" : "支付宝"
        }}
      </div>
      <input
        v-if="nameDisabled"
        class="item"
        type="text"
        v-model="payment.name"
        :placeholder="payment.bindType == 2 ? '微信' : '支付宝' + '姓名'"
      />
      <input
        class="item"
        type="text"
        v-model="payment.account"
        :placeholder="payment.bindType == 2 ? '微信' : '支付宝' + '账号'"
      />
      <div class="item">
        <div class="updataEwm" v-if="payment.paymentCode">
          <img class="img" :src="payment.paymentCode" alt="" />
          <img
            class="deleteimg"
            @click="deleteImg"
            src="@/assets/transactions/ico_delete_circle_red.png"
            alt=""
          />
        </div>
        <div class="updataEwm" v-else>
          <img
            class="img"
            src="@/assets/transactions/ico_add_camera.png"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            class="photofile"
            @change="frontPhotochange"
          />
        </div>
        <div class="tips">
          上传{{ payment.bindType == 2 ? "微信" : "支付宝" }}二维码(选填)
        </div>
      </div>
      <button
        :class="{ btnState: getState }"
        :disabled="!getState"
        @click="bind"
      >
        提交
      </button>
      <div class="delete" v-if="payment.id">
        不想要了，<span @click="unbind">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import buyApi from "@/api/buy";
import userInfoApi from "@/api/userInfo";
import orderInfoApi from "@/api/orderInfo";
export default {
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
    };
  },
  created() {
    this.getKycList();
    this.payment.bindType = this.$route.params.id;
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
  methods: {
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
    // 绑定
    bind() {
	//   console.log(this.payment);
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
    },
    deleteImg() {
      this.payment.paymentCode = "";
    },
    //上传图片
    frontPhotochange(e) {
      buyApi
        .uploadphoto({
          file: e.target.files[0]
        })
        .then(res => {
          console.log(res);
          if (res.data.data) {
            this.payment.paymentCode = res.data.data;
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
.content {
  width: 790px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0 84px;
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c9c9d1;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c9c9d1;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c9c9d1;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c9c9d1;
  }
  p {
    font-size: 20px;
    line-height: 24px;
    color: #40405e;
    padding-bottom: 26px;
  }
  .item {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 21px;
    color: #40405e;
    padding: 16px;
    width: 481px;
    background: #f7f7fa;
    border-radius: 6px;
    margin-bottom: 16px;
    span {
      color: @cl-m;
    }
    .tips {
      font-size: 13px;
      line-height: 18px;
      padding-left: 12px;
      color: #a0a0b3;
    }
    .updataEwm {
      position: relative;
      display: flex;
      width: 64px;
      height: 64px;
      .img {
        width: 100%;
      }
      .deleteimg {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 16px;
        height: 16px;
      }
      .photofile {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 99;
      }
    }
  }
  button {
    width: 481px;
    height: 48px;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(0deg, #dddde6, #dddde6);
    border-radius: 24px;
    margin-top: 24px;
  }
  .btnState {
    background: @gd-m5;
  }
  .delete {
    display: flex;
    align-items: center;
    padding-top: 19px;
    font-size: 13px;
    line-height: 18px;
    color: #a0a0b3;
    span {
      color: red;
      cursor: pointer;
    }
  }
}
@media (max-width: 1200px) {
  .content {
    width: 790px * 0.8;
    margin: 40px * 0.8 auto;
    padding: 40px * 0.8 0 84px * 0.8;
    p {
      font-size: 20px * 0.8;
      line-height: 24px * 0.8;
      padding-bottom: 26px * 0.8;
    }
    .item {
      font-size: 15px * 0.8;
      line-height: 21px * 0.8;
      padding: 16px * 0.8;
      width: 481px * 0.8;
      border-radius: 6px * 0.8;
      margin-bottom: 16px * 0.8;
      .tips {
        font-size: 13px * 0.8;
        line-height: 18px * 0.8;
        padding-left: 12px * 0.8;
      }
      .updataEwm {
        width: 64px * 0.8;
        height: 64px * 0.8;
        .deleteimg {
          top: -8px * 0.8;
          right: -8px * 0.8;
          width: 16px * 0.8;
          height: 16px * 0.8;
        }
      }
    }
    button {
      width: 481px * 0.8;
      height: 48px * 0.8;
      font-size: 16px * 0.8;
      line-height: 48px * 0.8;
      border-radius: 24px * 0.8;
      margin-top: 24px * 0.8;
    }
    .delete {
      padding-top: 19px * 0.8;
      font-size: 13px * 0.8;
      line-height: 18px * 0.8;
    }
  }
}
</style>