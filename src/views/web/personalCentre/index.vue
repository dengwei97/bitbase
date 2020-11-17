<template>
  <div class="personalCentre">
    <div class="my_account" v-if="Object.keys(details).length > 0">
      <h2>我的账号</h2>
      <div class="account_content flex_center_between">
        <div class="flex">
          <img
            class="head_img"
            v-if="details.avatarUrl"
            :src="details.avatarUrl"
            alt
          />
          <img
            class="head_img"
            v-else
            src="@/assets/transactions/ico_avatar_basic.png"
            alt
          />
          <div class="name_info">
            <div class="text flex">
              {{ details.nickname }}
              <div class="edit flex" @click="update">
                <img src="@/assets/transactions/ic_edit.png" alt />
              </div>
            </div>
            <div class="uid">UID: {{ details.userId }}</div>
          </div>
        </div>
        <div class="update_head_name flex" v-if="updateHead">
          <div class="image_upade">
            <img
              class="head_img"
              v-if="!form.avatarUrl"
              src="@/assets/transactions/ico_avatar_basic.png"
              alt
            />
            <img class="head_img" v-else :src="form.avatarUrl" alt="" />
            <div class="xj">
              <img
                src="@/assets/transactions/ico_camera_small_circle.png"
                alt=""
              />
              <input
                type="file"
                accept="image/*"
                class="photofile"
                @change="frontPhotochange"
              />
            </div>
          </div>
          <input type="text" class="name" v-model="form.nickname" />
          <button @click="simple">保存</button>
        </div>
      </div>
      <ul class="text">
        <li class="flex_center_between flex_center_between">
          <div class="flex">
            <img src="@/assets/transactions/ic_phone.png" alt="" />
            <span>{{ details.mobile | mobile}}</span>
          </div>
          <div class="text_h">
            已绑定
          </div>
        </li>
        <li class="flex_center_between flex_center_between">
          <div class="flex">
            <img src="@/assets/transactions/ic_paymoment.png" alt="" />
            <span>收款方式</span>
          </div>
          <div @click="methodOfCollection" class="text_zt pointer">
            绑定
          </div>
        </li>
      </ul>
      <h3>安全中心</h3>
      <ul class="text">
        <li class="flex_center_between flex_center_between">
          <div class="flex">
            <img src="@/assets/transactions/ic_password.png" alt="" />
            <span>支付密码</span>
          </div>
          <div class="pointer">
            <span
              class="text_zt"
              @click="setTradePwd(1)"
              v-if="details.tradePwdSet == 0"
            >
              设置
            </span>
            <span class="text_h" @click="setTradePwd(2)" v-if="details.tradePwdSet == 1">修改</span>
          </div>
        </li>
        <li class="flex_center_between flex_center_between">
          <div class="flex">
            <img src="@/assets/transactions/ic_pwd.png" alt="" />
            <span>登录密码</span>
          </div>
          <router-link to="/changePwd" class="text_h pointer">
            修改
          </router-link>
        </li>
        <li class="flex_center_between flex_center_between">
          <div class="flex">
            <img src="@/assets/transactions/ic_paymoment.png" alt="" />
            <span>身份认证</span>
          </div>
          <router-link v-if="details.kycUpgradeStatus == 2" to="/through" class="text_zt pointer">
            已验证
          </router-link>
          <router-link v-else to="/through" class="c_error pointer">
            去验证
          </router-link>
        </li>
        <!-- <li class="flex_center_between flex_center_between">
          <div class="flex">
            <img src="@/assets/transactions/ic_guge.png" alt="" />
            <span>谷歌验证</span>
          </div>
          <div class="text_zt pointer">
            未认证
          </div>
        </li> -->
      </ul>
    </div>

    <setTradePwdPop ref="setTradePwdPop" @submit = 'getUserInfoDetails' @recoveryPwd = 'recoveryPwd'></setTradePwdPop>
    <noKyc ref="noKyc" @goSet='goSet'> </noKyc>
	
  </div>
</template>

<script>
import buyApi from "@/api/buy";
import userInfoApi from "@/api/userInfo";
import setTradePwdPop from "./components/setTradePwd";//交易密码弹框
import noKyc from '@/components/noKyc'
export default {
  data() {
    return {
      updateHead: false,
      form: {
        nickname: "",
        avatarUrl: ""
      },
      details: {}
    };
  },
  components: {
		setTradePwdPop,
		noKyc
  },
  created() {
    this.getUserInfoDetails();
    
  },
  methods: {
    methodOfCollection(){
      if(this.details.kycStatus ==  2){
        this.$router.push('/methodOfCollection')
      }else{
         this.$refs.noKyc.show(1)
      }
    },
		//找回交易密码
		recoveryPwd(){
			this.setTradePwd(3)
		},
		goSet(){
      this.$router.push('/through')
    },
    //交易密码
    setTradePwd(value) {
      if(this.details.kycStatus != 2){
         this.$refs.noKyc.show(2)
         return
      }
			let user = {
				account: this.details.mobile,
				areaNo: this.details.areaNo,
        type: value,
        certificateType:this.details.certificateType
			}
			if(value == 1){
				buyApi
					.mobileCode({
						account:user.account,
						areaNo:user.areaNo
					})
					.then(res => {
						// console.log(res);
						this.$refs.setTradePwdPop.show(user);
						
					}).catch(err => {
          this.$toast(err.data.message)
        })
			}else if(value == 2){
        
				this.$refs.setTradePwdPop.show(user);
			}else{
				buyApi
					.mobileCode({
						account:user.account,
						areaNo:user.areaNo
					})
					.then(res => {
						// console.log(res);
						this.$refs.setTradePwdPop.show(user);
						
					}).catch(err => {
          this.$toast(err.data.message)
        })
			}
        
    },
    //修改个人信息
    simple() {
      userInfoApi.simple(this.form).then(res => {
        console.log(res);
        this.updateHead = false;
        this.getUserInfoDetails();
      });
    },
    update() {
      this.updateHead = !this.updateHead;
    },
    frontPhotochange(e) {
      buyApi
        .uploadphoto({
          file: e.target.files[0]
        })
        .then(res => {
          console.log(res);
          if (res.data.data) {
            this.form.avatarUrl = res.data.data;
          }
        });
    },
    //获取用户详细信息
    getUserInfoDetails() {
      userInfoApi
        .getUserInfoDetails({})
        .then(res => {
          console.log(res);
          this.details = res.data.data;
          this.form.nickname = res.data.data.nickname;
          this.form.avatarUrl = res.data.data.avatarUrl;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.personalCentre {
  margin: 40px auto;
  width: 790px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
    font-size: 18px;
    line-height: 25px;
    color: #40405e;
  }
  .text_h {
    color: #a1b1c1;
  }
  .c_error {
  color: #f0446b;
}
  .text_zt {
    color: @cl-m;
  }
  .pointer {
    cursor: pointer;
  }
  .my_account {
    h2 {
      padding: 35px 30px 40px;
      font-size: 24px;
      line-height: 32px;
      color: #40405e;
    }
    .account_content {
      padding: 0 30px 30px;
      .head_img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
      }
      .name_info {
        padding-left: 15px;
        .uid {
          padding-top: 6px;
          font-size: 14px;
          line-height: 20px;
          color: #9ea8b7;
        }
        .edit {
          width: 18px;
          margin-left: 8px;
          cursor: pointer;
          img {
            width: 100%;
            border-radius: 0;
          }
        }
      }
      .update_head_name {
        .image_upade {
          position: relative;
          display: flex;
          width: 72px;
          height: 72px;
          .xj {
            position: absolute;
            width: 30px;
            height: 30px;
            right: 0;
            bottom: 0;
            display: flex;
            img {
              width: 100%;
            }
            .photofile {
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0;
              z-index: 99;
            }
          }
        }
        .name {
          width: 170px;
          height: 40px;
          border: 1px solid #dddde6;
          margin: 0 12px;
          font-size: 14px;
          line-height: 20px;
          padding: 0 10px;
        }
        button {
          background: @cl-m;
          border-radius: 41px;
          color: #ffffff;
          font-size: 14px;
          padding: 10px 30px;
          cursor: pointer;
        }
      }
    }
    ul li {
      padding: 30px 32px;
      border-top: 1px solid #dddde6;
      img {
        width: 36px;
        margin-right: 20px;
      }
    }
    h3 {
      padding: 50px 30px 30px;
      font-size: 24px;
      line-height: 32px;
      color: #40405e;
      border-top: 1px solid #dddde6;
    }
  }
}
@media (max-width: 1200px){
	.personalCentre {
  margin: 40px * 0.8 auto;
  width: 790px * 0.8;
  .text {
    font-size: 18px * 0.8;
    line-height: 25px * 0.8;
  }
  .my_account {
    h2 {
      padding: 35px * 0.8 30px * 0.8 40px * 0.8;
      font-size: 24px * 0.8;
      line-height: 32px * 0.8;
    }
    .account_content {
      padding: 0 30px * 0.8 30px * 0.8;
      .head_img {
        width: 72px * 0.8;
        height: 72px * 0.8;
      }
      .name_info {
        padding-left: 15px * 0.8;
        .uid {
          padding-top: 6px * 0.8;
          font-size: 14px * 0.8;
          line-height: 20px * 0.8;
        }
        .edit {
          width: 18px * 0.8;
          margin-left: 8px * 0.8;
        }
      }
      .update_head_name {
        .image_upade {
          width: 72px * 0.8;
          height: 72px * 0.8;
          .xj {
            width: 30px * 0.8;
            height: 30px * 0.8;
          }
        }
        .name {
          width: 170px * 0.8;
          height: 40px * 0.8;
          margin: 0 12px * 0.8;
          font-size: 14px * 0.8;
          line-height: 20px * 0.8;
          padding: 0 10px * 0.8;
        }
        button {
          font-size: 14px * 0.8;
          padding: 10px * 0.8 30px * 0.8;
        }
      }
    }
    ul li {
      padding: 30px * 0.8 32px * 0.8;
      img {
        width: 36px * 0.8;
        margin-right: 20px * 0.8;
      }
    }
    h3 {
      padding: 50px * 0.8 30px * 0.8 30px * 0.8;
      font-size: 24px  * 0.8;
      line-height: 32px * 0.8;
    }
  }
}
}
@media (max-width: 980px){
	.personalCentre {
  margin: 40px * 0.6 auto;
  width: 790px * 0.6;
  .text {
    font-size: 18px * 0.6;
    line-height: 25px * 0.6;
  }
  .my_account {
    h2 {
      padding: 35px * 0.6 30px * 0.6 40px * 0.6;
      font-size: 24px * 0.6;
      line-height: 32px * 0.6;
    }
    .account_content {
      padding: 0 30px * 0.6 30px * 0.6;
      .head_img {
        width: 72px * 0.6;
        height: 72px * 0.6;
      }
      .name_info {
        padding-left: 15px * 0.6;
        .uid {
          padding-top: 6px * 0.6;
          font-size: 14px * 0.6;
          line-height: 20px * 0.6;
        }
        .edit {
          width: 18px * 0.6;
          margin-left: 8px * 0.6;
        }
      }
      .update_head_name {
        .image_upade {
          
          width: 72px * 0.6;
          height: 72px * 0.6;
          .xj {
            width: 30px * 0.6;
            height: 30px * 0.6;
          }
        }
        .name {
          width: 170px * 0.6;
          height: 40px * 0.6;
          margin: 0 12px * 0.6;
          font-size: 14px * 0.6;
          line-height: 20px * 0.6;
          padding: 0 10px * 0.6;
        }
        button {
          font-size: 14px * 0.6;
          padding: 10px * 0.6 30px * 0.6;
        }
      }
    }
    ul li {
      padding: 30px * 0.6 32px * 0.6;
      img {
        width: 36px * 0.6;
        margin-right: 20px * 0.6;
      }
    }
    h3 {
      padding: 50px * 0.6 30px * 0.6 30px * 0.6;
      font-size: 24px  * 0.6;
      line-height: 32px * 0.6;
    }
  }
}
}
</style>