<template>
  <div class="webThrough">
    <h3>身份验证</h3>
    <p>完成身份认证可进行高额交易</p>
    <section class="primary">
      <div class="part-one" @click="changeTableOne">
        <span>初级认证</span>
        <span v-show="primaryStatus!=2" class="unverified" @click="checkPrimary()">
          未认证
          <img src="@/assets/transactions/ico_arrow_right.png" alt="arrow" />
        </span>
        <span v-show="primaryStatus==2" class="verified">已验证</span>
      </div>
      <div v-if="tableOne" class="part-two">
        <div class="content">
          <div class="con">
            <span>姓名</span>
            <span class="name">{{ userInfo.name }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>账号</span>
            <span class="name">{{ userInfo.account | mobile }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>UID</span>
            <span class="name">
              {{ userInfo.UID }}
              <copy class="copy" :text="userInfo.UID" />
            </span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>国家地区</span>
            <span class="name">{{ userInfo.area }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>证件类型</span>
            <span class="name">{{ userInfo.ver == 1 ? '身份证' : userInfo.ver == 2 ? '驾驶证' : '护照' }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con cons">
            <span>证件号</span>
            <span class="name">{{ userInfo.num | certificateNum }}</span>
          </div>
        </div>
      </div>
      <div v-show="primaryStatus!=2" class="part-three">
        <div class="content">
          <img src="@/assets/transactions/ic_addlak_buy.png" alt="buy" />
          <div class="con">
            <p>初级认证成功后方可进行中级认证</p>
            <p>初级认证成功后，可进行单笔小于2000 CNY的交易</p>
          </div>
        </div>
      </div>
    </section>
    <section class="primary">
      <div class="part-one">
        <span>中级认证</span>
        <span v-show="intermediateStatus!=2" class="unverified" @click="checkIntermediate()">
          未认证
          <img src="@/assets/transactions/ico_arrow_right.png" alt="arrow" />
        </span>
        <span v-show="intermediateStatus==2" class="verified">已验证</span>
      </div>
      <div v-show="intermediateStatus!=2" class="part-three">
        <div class="content">
          <img src="@/assets/transactions/ic_addlak_buy.png" alt="buy" />
          <div class="con">
            <p>初级认证成功后方可进行中级认证</p>
            <p>中级认证成功后，可进行单笔高于2000 CNY或累计金额大于5000 CNY的交易</p>
          </div>
        </div>
      </div>
    </section>
    <section class="primary">
      <div class="part-one">
        <span>高级认证</span>
        <span v-show="advancedStatus!=2" class="unverified" @click="checkAdvanced()">
          未认证
          <img src="@/assets/transactions/ico_arrow_right.png" />
        </span>
        <span v-show="advancedStatus==2" class="verified">已验证</span>
      </div>
      <div v-show="advancedStatus!=2" class="part-three">
        <div class="content">
          <img src="@/assets/transactions/ic_addlak_buy.png" alt="buy" />
          <div class="con">
            <p>中级认证成功后方可进行高级认证</p>
            <p>高级认证成功后，可进行单笔高于5000 CNY或累计金额大于10000 CNY的交易</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import kycstatusApi from "@/api/buy";
import { Toast } from "vant";
import copy from "@/components/copy/index";
export default {
  name: "WebThrough",
  components: {
    copy
  },
  data() {
    return {
      userInfo: {
        name: "", // 姓名
        account: "", // 账号
        UID: "", // UID
        area: "", // 国家
        ver: "", // 证件类型
        num: "" // 证件号
      },
      tableOne: false, // 显示通过初级验证以后的用户信息
      primaryStatus: 1, // 初级 1-待审核 2-审核通过 3-审核不通过 4-未提交
      intermediateStatus: 0, // 中级 1-待审核 2-审核通过 3-审核不通过 4-未提交
      advancedStatus: 0 // 高级 1-待审核 2-审核通过 3-审核不通过 4-未提交
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 初级验证通过后，展示用户信息
    changeTableOne() {
      if (this.primaryStatus == 2) {
        this.tableOne = !this.tableOne;
      }
    },
    // 获取用户信息
    getUserInfo() {
      kycstatusApi
        .kycstatus()
        .then(res => {
          this.primaryStatus = res.data.data.kycStatus;
          this.intermediateStatus = res.data.data.kycMiddleStatus;
          this.advancedStatus = res.data.data.kycUpgradeStatus;
          if (this.primaryStatus == 2) {
            this.tableOne = true;
            this.userInfo.name = res.data.data.realName;
            this.userInfo.account = res.data.data.mobile;
            this.userInfo.UID = res.data.data.userId;
            this.userInfo.area = res.data.data.country;
            this.userInfo.ver = res.data.data.certificateType;
            this.userInfo.num = res.data.data.certificateNumber;
            window.localStorage.setItem("kycType", this.userInfo.ver);
          }
        })
        .catch(err => {});
    },
    // 初级验证跳转
    checkPrimary() {
      if (this.primaryStatus == 1) {
        this.$router.push("/waitCheck");
      } else if (this.primaryStatus == 3 || this.primaryStatus == 4) {
        console.log("跳转初级验证页面");
        this.$router.push({
          path: "/primary"
        });
      }
    },
    // 中级验证
    checkIntermediate() {
      if (this.primaryStatus == 2) {
        if (this.intermediateStatus == 1) {
          this.$router.push("/waitCheck");
        } else if (
          this.intermediateStatus == 3 ||
          this.intermediateStatus == 4
        ) {
          console.log("跳转中级验证页面");
          this.$router.push({
            path: "/intermediate"
          });
        }
      } else {
        Toast("需要完成初级验证");
      }
    },
    // 高级验证
    checkAdvanced() {
      if (this.primaryStatus == 2) {
        if (this.intermediateStatus == 2) {
          if (this.advancedStatus == 1) {
            this.$router.push("/waitCheck");
          } else if (this.advancedStatus == 3 || this.advancedStatus == 4) {
            this.$router.push("/uploadVideo");
          }
        } else {
          Toast("需要完成中级验证");
        }
      } else {
        Toast("需要完成初级验证");
      }
    }
  }
};
</script>

<style scoped lang="less">
.webThrough {
  width: 790px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 40px auto 70px;
  padding: 40px 32px;
  h3 {
    font-weight: normal;
    font-size: 18px;
    color: #40405e;
  }
  p {
    font-size: 14px;
    color: rgba(21, 46, 83, 0.4);
    margin-top: 4px;
  }
  .primary {
    margin-top: 24px;
    padding: 4px;
    width: 481px;
    border: 0.5px solid #dddde6;
    border-radius: 6px;
    .part-one {
      padding: 20px 16px 17px;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: #40405e;
      cursor: pointer;
      .unverified {
        color: #f0446b;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 6px;
          height: 10px;
          margin-left: 12px;
        }
      }
      .verified {
        color: #00cf00;
      }
    }
    .part-two {
      width: 100%;
      .content {
        width: 100%;
        padding: 0 16px;
        background: #f7f7fa;
        .con {
          padding: 16px 0;
          border-bottom: 1px solid #ededf2;
          font-size: 14px;
          color: #c9c9d1;
          display: flex;
          justify-content: space-between;
          .name {
            color: #40405e;
            display: flex;
            align-items: center;
            .copy {
              width: 12px;
              height: 12px;
              margin-left: 6px;
            }
          }
        }
        .cons {
          border: none;
        }
      }
    }
    .part-three {
      width: 100%;
      .content {
        background: #f7f7fa;
        padding: 20px 15px;
        display: flex;
        justify-content: space-between;
        img {
          width: 16px;
          height: 16px;
          margin-top: 2px;
        }
        .con {
          width: 419px;
          p {
            font-size: 14px;
            line-height: 20px;
            color: #f2a145;
            margin: 0;
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .webThrough {
    width: 790px * 0.8;
    box-shadow: 0px 0px 10px * 0.8 rgba(0, 0, 0, 0.1);
    margin: 40px * 0.8 auto 70px * 0.8;
    padding: 40px * 0.8 32px * 0.8;
    h3 {
      font-size: 18px * 0.8;
    }
    p {
      font-size: 14px * 0.8;
    }
    .primary {
      margin-top: 24px * 0.8;
      padding: 4px * 0.8;
      width: 481px * 0.8;
      border-radius: 6px * 0.8;
      .part-one {
        padding: 20px * 0.8 16px * 0.8 17px * 0.8;
        font-size: 16px * 0.8;
        .unverified {
          img {
            width: 6px * 0.8;
            height: 10px * 0.8;
            margin-left: 12px * 0.8;
          }
        }
      }
      .part-two {
        .content {
          padding: 0 16px * 0.8;
          .con {
            padding: 16px * 0.8 0;
            font-size: 14px * 0.8;
            .name {
              .copy {
                width: 12px * 0.8;
                height: 12px * 0.8;
                margin-left: 6px * 0.8;
              }
            }
          }
        }
      }
      .part-three {
        width: 100%;
        .content {
          padding: 20px 15px * 0.8;
          img {
            width: 16px * 0.8;
            height: 16px * 0.8;
          }
          .con {
            width: 419px * 0.8;
            p {
              font-size: 14px * 0.8;
              line-height: 20px * 0.8;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .webThrough {
    width: 790px * 0.6;
    box-shadow: 0px 0px 10px * 0.6 rgba(0, 0, 0, 0.1);
    margin: 40px * 0.6 auto 70px * 0.6;
    padding: 40px * 0.6 32px * 0.6;
    .primary {
      margin-top: 24px * 0.6;
      padding: 4px * 0.6;
      width: 481px * 0.6;
      border-radius: 6px * 0.6;
      .part-one {
        padding: 20px * 0.6 16px * 0.6 17px * 0.6;
        .unverified {
          img {
            width: 6px * 0.6;
            height: 10px * 0.6;
            margin-left: 12px * 0.6;
          }
        }
      }
      .part-two {
        .content {
          padding: 0 16px * 0.6;
          .con {
            padding: 16px * 0.6 0;
            font-size: 14px * 0.6;
          }
        }
      }
      .part-three {
        width: 100%;
        .content {
          padding: 20px 15px * 0.6;
          .con {
            width: 419px * 0.6;
          }
        }
      }
    }
  }
}
</style>
