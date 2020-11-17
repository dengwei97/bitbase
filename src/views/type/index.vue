<template>
  <div class="type">
    <ul>
      <li @click="gohome">
        <div class="txt">{{ $t("首页") }}</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>

      <li
        @click="toguide('Product')"
        v-if="$appConfig.moduleControl.routerTransactions === 0"
      >
        <div class="txt">{{ $t("产品介绍") }}</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <!-- 功能模块routerTransactions start -->
      <li
        @click="mtransactions"
        v-if="$appConfig.moduleControl.routerTransactions === 1"
      >
        <div class="txt">快捷交易</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <li
        @click="mbulkTrading"
        v-if="$appConfig.moduleControl.routerTransactions === 1"
      >
        <div class="txt">大宗交易</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      
      <li
        @click="morderlist"
        v-if="$appConfig.moduleControl.routerTransactions === 1"
      >
        <div class="txt">订单管理</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <!-- 功能模块routerTransactions end -->

      <li @click="goannouncement">
        <div class="txt">{{ $t("公告") }}</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <li @click="gocooperation">
        <div class="txt">{{ $t("客户合作") }}</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <li @click="gohelp">
        <div class="txt">{{ $t("帮助") }}</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <li @click="service">
        <div class="txt">联系客服</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
      <li @click="endTimePop = true">
        <div class="txt">{{ $t("语言") }}</div>
        <div class="icimgs">
          <img
            class="langimg"
            v-if="defaultindex == 0"
            src="../../assets/ic_cn.png"
            alt
          />
          <img
            class="langimg"
            v-if="defaultindex == 1"
            src="../../assets/ic_usa.png"
            alt
          />
          <img class="right" src="../../assets/next.png" alt />
        </div>
      </li>

      <li @click="download">
        <div class="txt">{{ $t("下载APP") }}</div>
        <div class="imgs">
          <img src="../../assets/next.png" alt />
        </div>
      </li>
    </ul>
    <!-- 弹出层 -->
    <van-popup
      v-model="endTimePop"
      get-container="#app"
      position="bottom"
      :overlay="true"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="defaultindex"
        :confirm-button-text="confirm"
        :cancel-button-text="cancel"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

 
  </div>
</template>

<script>
import { customerService } from "@/utils/index";
import { getDownUrl } from "@/utils/index";
import userInfoApi from "@/api/userInfo";

export default {
  name: "Type",
  data() {
    return {
      endTimePop: false,
      columns: ["简体中文", "English"],
      defaultindex: 0, // 语言类型默认index
      lang: "zh",
      cancel: "取消",
      confirm: "确认",
      userInfoList: {},
      tips: {
        title: "",
        text1: "",
        text2: "",
        btn: ""
      }, //弹框内容
      tipsType: '' //弹框类型  1 绑定收款方式 2 设置交易密码 3 身份验证
    };
  },
 
  created() {
    console.log(111);
    this.$store.state.user.noheader = false;
    this.lang = localStorage.getItem("lang") || "zh";
    if (this.lang == "zh") {
      this.defaultindex = 0;
      this.confirm = "确认";
      this.cancel = "取消";
    } else {
      this.defaultindex = 1;
      this.confirm = "Confirmation";
      this.cancel = "Cancellation";
    }
    if (localStorage.getItem("token")) {
      this.getDetails();
    }
  },
  methods: {
    
   
    //订单管理
    morderlist() {
      
      if (localStorage.getItem("token")) {
        this.$router.push("/mallOrderList");
       
      } else {
        this.$router.push("/mlogin");
      }
    },
    // 客服跳转
    service() {
      customerService();
    },
    //快捷交易
    mtransactions() {
      if (localStorage.getItem("token")) {
        this.$router.push("/mtransactions");
      } else {
        this.$router.push("/mlogin");
      }
    },
   
    //获取个人详情
    getDetails() {
      return new Promise((resolve, reject) => {
        userInfoApi.getUserInfoDetails({}).then(res => {
          this.userInfoList = res.data.data;
          localStorage.setItem(
            "userInfoDetails",
            JSON.stringify(res.data.data)
          );
          resolve(res.data.data);
        });             
      });
    },
    //大宗交易
    mbulkTrading() {
      if (localStorage.getItem("token")) {
        this.getDetails().then(() => {
          if (this.userInfoList.userDoBigSale - 0 == 1) {
            this.$router.push("/mbulkTrading");
          } else {
            this.$refs.noBulkTrading.show();
          }
        });
      } else {
        this.$router.push("/mlogin");
      }
    },
    gohelp() {
      this.$router.push("/help");
    },
    goannouncement() {
      this.$router.push("/announcement");
    },
    gocooperation() {
      this.$router.push("/cooperation");
    },
    gohome() {
      this.$router.push("/home");
    },
    download() {
      getDownUrl();
    },
    // 产品介绍
    toguide(id) {
      const select = id;
      console.log(this.$route.path);
      if (this.$route.path == "/home") {
        var anchor = document.getElementById(id);
        document.body.scrollTop = anchor.offsetTop;
      } else {
        sessionStorage.setItem("selectid", select);
        this.$router.push("/home");
      }
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.defaultindex = index;
      if (index == 0) {
        localStorage.setItem("lang", "zh");
        this.$i18n.locale = "zh";
        this.confirm = "确认";
        this.cancel = "取消";
        this.endTimePop = false;
      } else if (index == 1) {
        localStorage.setItem("lang", "en");
        this.$i18n.locale = "en";
        this.confirm = "Confirmation";
        this.cancel = "Cancellation";
        this.endTimePop = false;
      }
    },
    onCancel() {
      // Toast('取消');
      this.endTimePop = false;
    }
  }
};
</script>

<style lang="less" scoped>
.type {
  padding: 0 0.3rem 1rem 0.3rem;
  ul li {
    width: 100%;
    height: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.02rem solid #d2d2d2;
    .txt {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 500;
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #40405e;
    }
    .imgs {
      width: 0.18rem;
      height: 0.34rem;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .icimgs {
      display: flex;
      align-items: center;
      .langimg {
        width: 0.48rem;
        height: 0.32rem;
      }
      .right {
        margin-left: 0.2rem;
        width: 0.18rem;
        height: 0.34rem;
      }
    }
    .name_imgs {
      display: flex;
      align-items: center;
      .adver_status {
        color: #00cf00;
      }
      span {
        font-size: 0.28rem;
        color: #f0446b;
      }
      .right {
        margin-left: 0.2rem;
        width: 0.18rem;
        height: 0.34rem;
      }
    }
  }
}
</style>
