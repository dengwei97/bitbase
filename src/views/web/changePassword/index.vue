<template>
  <div class="changePassword">
    <div class="content">
      <div class="title">
        <div class="typeText">修改密码</div>
      </div>
      <div class="form_item formInterval">
        <div class="input content_text">
          <input :type="pwdType1" placeholder="请输入原密码" v-model="pwd1" @input="inputFunction()" />
        </div>
        <div @click="changType1" class="eyeimg">
          <img :src="seen1?openeye:nopeneye" alt />
        </div>
      </div>
      <div class="form_item formInterval">
        <div class="input content_text">
          <input :type="pwdType2" placeholder="请设置新密码" v-model="pwd2" @input="inputFunction()" />
        </div>
        <div @click="changType2" class="eyeimg">
          <img :src="seen2?openeye:nopeneye" alt />
        </div>
      </div>
      <div class="form_item formInterval">
        <div class="input content_text">
          <input :type="pwdType3" placeholder="再次确认密码" v-model="pwd3" @input="inputFunction()" />
        </div>
        <div @click="changType3" class="eyeimg">
          <img :src="seen3?openeye:nopeneye" alt />
        </div>
      </div>
      <div class="btns">
        <button class="btn1" 
        :disabled="disabled"
        :class="{active:!disabled}"
        @click="Submitted">确认修改</button>
        <router-link to="/forget" class="btn2">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
export default {
  name: "changePassword",
  data() {
    return {
      //密码显示  不显示 相关
      seen1: true,
      seen2: true,
      seen3: true,
      pwdType1: "password",
      pwdType2: "password",
      pwdType3: "password",
      openeye: require("@/assets/transactions/ico_unvisible.png"),
      nopeneye: require("@/assets/transactions/ico_visible.png"),
      pwd1: "", //原密码
      pwd2: "", //新密码
      pwd3: "", //确认密码
      disabled: true
    };
  },
  mounted() {},
  methods: {
    changType1() {
      this.pwdType1 = this.pwdType1 == "password" ? "text" : "password";
      this.seen1 = !this.seen1;
    },
    changType2() {
      this.pwdType2 = this.pwdType2 == "password" ? "text" : "password";
      this.seen2 = !this.seen2;
    },
    changType3() {
      this.pwdType3 = this.pwdType3 == "password" ? "text" : "password";
      this.seen3 = !this.seen3;
    },
    //判断注册按钮是否启用
    inputFunction() {
      if (
        this.pwd3 != "" &&
        this.pwd1 != "" &&
        this.pwd2 != ""
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    //确认修改
    Submitted() {
      // console.log("---------------");
      if (this.pwd2.length < 6 || this.pwd3.length < 6) {
        this.$toast("密码长度不能少于6位");
        return;
      }
      if (this.pwd2 !== this.pwd3) {
        this.$toast("两次密码不一样，请确认");
        return;
      }
      userInfoApi
        .changePwd({
          oldPwd:this.pwd1,
          pwd:this.pwd3,
        })
        .then(res => {
          this.$toast.success("修改成功！")
          setTimeout(() => {
            this.$toast.clear();
            this.$router.push('/home');
          }, 1200)
        })
        .catch(err => {
          // console.log(err);
          this.$toast(err.data.message);
        });
    }
  },
};
</script>

<style  lang="less" scoped>
.changePassword {
  background: #ffffff;
  padding-top: 40px;
  .content {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 790px;
    height: 494px;
    margin: 0 auto;
    padding-top: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      display: flex;
      justify-content: center;
      padding-bottom: 40px;
      .typeText {
        font-size: 18px;
        line-height: 24px;
        color: #40405e;
        cursor: pointer;
      }
    }
    .form_item {
      width: 481px;
      height: 52px;
      display: flex;
      border: 1px solid #dcdfe4;
      border-radius: 6px;
      .content_text {
        font-size: 14px;
        color: #14171a;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #a1abba;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #a1abba;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #a1abba;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #a1abba;
      }
      .input {
        flex: 1;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          padding: 0 14px;
          height: 24px;
          border: 0;
          box-sizing: border-box;
          border-radius: 0;
        }
        .nameInput {
          border-left: 1px solid #dcdfe4;
        }

        .codeInput {
          border-right: 1px solid #dcdfe4;
        }
      }
      .send {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 68px;
        height: 52px;
        color: #0cb397;
        cursor: pointer;
      }
      .eyeimg {
        width: 68px;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0cb397;
        cursor: pointer;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .formInterval {
      margin-top: 16px;
    }
    .loginTips {
      display: flex;
      width: 481px;
      padding: 15px 0 0 15px;
      font-size: 14px;
      line-height: 20px;
      color: #0cb397;
      cursor: pointer;
    }
    .btns {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      width: 481px;
      .btn1 {
        width: 280px;
        height: 48px;
        font-size: 16px;
        color: #ffffff;
        background: #dddde6;
        border-radius: 41px;
        cursor: pointer;
        &.active {
          background: linear-gradient(135deg, #43cd85 0%, #0cb397 100%);
        }
      }
      .btn2 {
        display: inline-block;
        width: 170px;
        height: 48px;
        border: 1px solid #15b894;
        border-radius: 41px;
        font-weight: 500;
        font-size: 16px;
        line-height: 48px;
        text-align: center;
        color: #0cb397;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 1200px) {
  .changePassword {
    padding-top: 40px * 0.8;
    .content {
      width: 790px * 0.8;
      height: 494px * 0.8;
      padding-top: 110px * 0.8;
      .title {
        padding-bottom: 40px * 0.8;
        .typeText {
          font-size: 18px * 0.8;
          line-height: 24px * 0.8;
        }
        .type2 {
          padding-left: 40px * 0.8;
        }
      }
      .form_item {
        width: 481px * 0.8;
        height: 52px * 0.8;
        .content_text {
          font-size: 14px * 0.8;
        }
        .input {
          input {
            padding: 0 14px * 0.8;
            height: 24px * 0.8;
          }
        }
        .send {
          width: 68px * 0.8;
          height: 52px * 0.8;
        }
        .eyeimg {
          width: 68px * 0.8;
          height: 52px * 0.8;
          img {
            width: 16px * 0.8;
            height: 16px * 0.8;
          }
        }
      }
      .formInterval {
        margin-top: 16px * 0.8;
      }
      .loginTips {
        width: 481px * 0.8;
        padding: 15px * 0.8 0 0 15px * 0.8;
        font-size: 14px * 0.8;
        line-height: 20px * 0.8;
      }
      .btns {
        margin-top: 30px * 0.8;
        width: 481px * 0.8;
        .btn1 {
          width: 280px * 0.8;
          height: 48px * 0.8;
          font-size: 16px * 0.8;
          border-radius: 41px * 0.8;
        }
        .btn2 {
          width: 170px * 0.8;
          height: 48px * 0.8;
          border-radius: 41px * 0.8;
          font-size: 16px * 0.8;
          line-height: 48px * 0.8;
        }
      }
    }
  }
}
</style>