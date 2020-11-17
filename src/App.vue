<template>
  <div id="app" class="app">
    <div class="content">
      <Gheader v-show="noheader"></Gheader>
      <!-- <keep-alive exclude='home,type,announcement,noticeDetails'> -->
     
      <router-view></router-view>
      <!-- </keep-alive> -->
      <!-- 功能模块routerTransactions start -->
      <div class="kefu" @click="service" v-if="$appConfig.moduleControl.routerTransactions === 1">
        <img src="@/assets/kefu.png" alt />
        联系客服
      </div>
      <!--  功能模块routerTransactions end -->
    </div>
    <Gfooter v-show="nofooter"></Gfooter>
  </div>
</template>

<script>
import Gfooter from "@/components/footer";
import Gheader from "@/components/header";
import userInfoApi from "@/api/userInfo";
import { customerService } from "@/utils/index";

export default {
  name: "App",
  components: {
    Gfooter,
    Gheader,
   
  },
  data() {
    return {};
  },
  computed: {
    noheader() {
      return this.$store.state.user.noheader;
    },
    nofooter() {
      return this.$store.state.user.nofooter;
    },
  
  },
  mounted() {
    
    // 获取区号
    userInfoApi.ipApi({}).then(res => {
      if (!res.data.data.callCode) {
        window.localStorage.setItem("areaNo", "+86");
      } else {
        window.localStorage.setItem("areaNo", "+" + res.data.data.callCode);
      }
    });
  },
  methods: {
    // 客服跳转
    service() {
      customerService();
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1 0 auto;
    .kefu {
      position: fixed;
      top: 80%;
      right: 50px;
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 22px;
      background: @cl-m;
      padding: 14px 18px;
      border-radius: 25px;
      color: #ffffff;
      cursor: pointer;
      img {
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }
    }
  }
}
@media (max-width: 1200px) {
  .app {
    .content {
      .kefu {
        right: 50px * 0.8;
        font-size: 14px * 0.8;
        line-height: 22px * 0.8;
        padding: 14px * 0.8 18px * 0.8;
        img {
          margin-right: 5px * 0.8;
          width: 24px * 0.8;
          height: 24px * 0.8;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .kefu {
    display: none !important;
  }
}
</style>
