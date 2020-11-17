<template>
  <div class="cooperation">
    <div class="connect">
      <div class="main_title">{{ $t('商户合作') }}</div>
      <div class="sub_title">{{ $t('请留下您的信息，我们将在5个工作日之内联系你') }}</div>
      <div class="fo">
        <div>
          <label class="nam">{{ $t('您的姓名*') }}</label>
          <input v-model="fromData.name" name="username" type="text" class="text" />
        </div>
        <div>
          <label class="mail">{{ $t('您的邮箱*') }}</label>
          <input v-model="fromData.email" name="uemail" type="text" class="text" />
        </div>
        <div>
          <label class="nam">{{ $t('您的合作方向') }}</label>
          <textarea v-model="fromData.desc" class="texta"></textarea>
        </div>
      </div>
      <div class="flex flex_center">
        <button class="sub" @click="submit()">{{ $t('提交') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";

export default {
  name: "Cooperation",
  data() {
    return {
      fromData: {
        name: "",
        email: "",
        desc: ""
      }
    };
  },
  methods: {
    submit() {
      if (this.fromData.name != "") {
        if (this.fromData.email != "") {
          if (this.fromData.desc != "") {
            const data = this.fromData;
            userInfoApi
              .getcooperation(this.fromData)
              .then(res => {
                this.$toast(this.$t('提交成功'));
                // Toast("提交成功");
              })
              .catch(err => {
                this.$toast(err.data.message);
              });
          } else {
            this.$toast(this.$t('请输入您的合作方向'));
            // Toast("请输入您的合作方向");
            return;
          }
        } else {
          this.$toast(this.$t("请输入您的邮箱"));
          return;
        }
      } else {
        this.$toast(this.$t("请输入您的姓名"));
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cooperation {
  width: 100%;
  background: #e5e5e5;
  padding: 100px 0;
  .connect {
    width: 993px;
    margin: 0 auto;
    .main_title {
      font-size: 30px;
      line-height: 40px;
      text-align: center;
      color: #40405e;
    }
    .sub_title {
      font-size: 18px;
      line-height: 42px;
      text-align: center;
      color: #4f5669;
    }
    .fo {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .nam {
        font-size: 14px;
        color: #40405e;
      }
      .mail {
        font-size: 14px;
        color: #40405e;
      }
      .text {
        width: 479px;
        height: 52px;
        background: #ffffff;
        border: 1px solid #c8c8c8;
        font-size: 14px;
        color: #40405e;
        border-radius: 5px;
        padding: 14px;
      }
      .texta {
        width: 993px;
        height: 152px;
        background: #ffffff;
        border: 1px solid #c8c8c8;
        font-size: 14px;
        color: #40405e;
        border-radius: 5px;
        resize: none;
        padding: 14px;
      }
      .texta::-webkit-scrollbar {
        display: none;
      }
    }
    .sub {
      width: 344px;
      height: 48px;
      margin-top: 40px;
      background: @cl-m;
      border-radius: 41px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}

@media (max-width: 1200px) {
  .cooperation {
    padding: 100px * 0.8 0;
    .connect {
      width: 993px * 0.8;
      .main_title {
        font-size: 30px * 0.8;
        line-height: 40px * 0.8;
      }
      .sub_title {
        font-size: 18px * 0.8;
        line-height: 42px * 0.8;
      }
      .fo {
        .nam {
          font-size: 14px * 0.8;
        }
        .mail {
          font-size: 14px * 0.8;
        }
        .text {
          width: 479px * 0.8;
          height: 52px * 0.8;
          font-size: 14px * 0.8;
          border-radius: 5px * 0.8;
          padding: 14px * 0.8;
        }
        .texta {
          width: 993px * 0.8;
          height: 152px * 0.8;
          background: #ffffff;
          font-size: 14px * 0.8;
          border-radius: 5px * 0.8;
          padding: 14px * 0.8;
        }
      }
      .sub {
        width: 344px * 0.8;
        height: 48px * 0.8;
        margin-top: 40px * 0.8;
        border-radius: 41px * 0.8;
        font-size: 16px * 0.8;
        line-height: 24px * 0.8;
      }
    }
  }
}

@media (max-width: 980px) {
  .cooperation {
    padding: 100px * 0.6 0;
    .connect {
      width: 993px * 0.6;
      .main_title {
        font-size: 30px * 0.6;
        line-height: 40px * 0.6;
      }
      .sub_title {
        font-size: 18px * 0.6;
        line-height: 42px * 0.6;
      }
      .fo {
        .nam {
          font-size: 14px * 0.6;
        }
        .mail {
          font-size: 14px * 0.6;
        }
        .text {
          width: 479px * 0.6;
          height: 52px * 0.6;
          font-size: 14px * 0.6;
          border-radius: 5px * 0.6;
          padding: 14px * 0.6;
        }
        .texta {
          width: 993px * 0.6;
          height: 152px * 0.6;
          background: #ffffff;
          font-size: 14px * 0.6;
          border-radius: 5px * 0.6;
          padding: 14px * 0.6;
        }
      }
      .sub {
        width: 344px * 0.6;
        height: 48px * 0.6;
        margin-top: 40px * 0.6;
        border-radius: 41px * 0.6;
        font-size: 16px * 0.6;
        line-height: 24px * 0.6;
      }
    }
  }
}

@media (max-width: 767px) {
  .cooperation {
    width: 100%;
    height: 12.648rem;
    background: #e5e5e5;
    padding-top: 1rem;
    .connect {
      width: 100%;
      .main_title {
        width: 100%;
        height: 0.84rem;
        padding-left: 0.42rem;
        font-size: 0.48rem;
        line-height: 0.8rem;
        text-align: left;
      }
      .sub_title {
        height: 0.48rem;
        padding-left: 0.42rem;
        margin-top: 0.32rem;
        font-size: 0.28rem;
        line-height: 0.48rem;
        color: #4f5669;
        text-align: left;
      }
      .fo {
        padding-left: 0.3rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .nam {
          font-size: 0.28rem;
          line-height: 0.36rem;
          color: #40405e;
        }
        .mail {
          font-size: 0.28rem;
          line-height: 0.36rem;
          color: #40405e;
        }
        .text {
          width: 6.88rem;
          height: 1.04rem;
          border-radius: 0.15rem;
          padding: 0.28rem;
        }
        .texta {
          width: 6.88rem;
          height: 1.04rem;
          border-radius: 0.15rem;
          padding: 0.28rem;
        }
      }
      .sub {
        width: 6.88rem;
        height: 0.96rem;
        margin-top: 0.8rem;
        font-weight: 500;
        font-size: 0.32rem;
        line-height: 0.48rem;
      }
    }
  }
}
</style>
