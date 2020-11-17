<template>
  <div ref="footer" class="footer">
    <div class="container">
      <div class="link dateils_contetn">
        <div class="logo_box img-box">
          <img class="logo" :src="$appConfig.source.ic_logn_whirt_1.src" />
        </div>
        <div class="dateils_desc">{{ $t('创始团队成员') }}</div>
        <div class="dateils_sm">Copyright © 2020 {{ $appConfig.lowerName }}</div>
      </div>
      <div class="link">
        <div class="title flex flex_middle flex_justify" @click="showItem('item1')">
          <span class="title_txt">{{ $t('导航') }}</span>
          <img class="tittel_ing" src="../../assets/ic_footer_item_xia.png" />
        </div>
        <div v-show="showData.item1 || !isMobile">
          <router-link to="/" class="link_item first">{{ $t('首页') }}</router-link>
          <!-- <a class="link_item first">{{$t('首页')}}</a> -->
          <router-link to="/announcement" class="link_item">{{ $t('公告') }}</router-link>
          <!-- <a class="link_item">{{$t('公告')}}</a> -->
          <a class="link_item" @click="toguide('Product')">{{ $t('产品介绍') }}</a>
          <!-- <a href="#Product" class="link_item">{{$t('产品介绍')}}</a> -->
          <!--                    <a class="link_item">{{$t('商户合作')}}</a>-->
          <router-link to="/cooperation" class="link_item">{{ $t('商户合作') }}</router-link>
          <router-link to="/help" class="link_item">{{ $t('帮助') }}</router-link>
        </div>
      </div>
      <div class="link">
        <div class="title flex flex_middle flex_justify" @click="showItem('item2')">
          <span class="title_txt">{{ $t('APP下载') }}</span>
          <img class="tittel_ing" src="../../assets/ic_footer_item_xia.png" />
        </div>
        <div v-show="showData.item2 || !isMobile">
          <a class="link_item first" @click="download">IOS App</a>
          <a class="link_item" @click="download">Android App</a>
        </div>
      </div>
      <div class="link">
        <div class="title flex flex_middle flex_justify" @click="showItem('item3')">
          <span class="title_txt">{{ $t('联系我们') }}</span>
          <img class="tittel_ing" src="../../assets/ic_footer_item_xia.png" />
        </div>
        <div v-show="showData.item3 || !isMobile">
          <a class="link_item first">business@{{ $appConfig.lowerName }}.vip</a>
          <a class="link_item">services@{{ $appConfig.lowerName }}.vip</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ismobile } from "@/utils";
import { getDownUrl } from "@/utils/index";
export default {
  data() {
    return {
      showData: {
        item1: false,
        item2: false,
        item3: false
      },
      isMobile: false,
      noheader: ""
    };
  },
  mounted() {
    this.$refs.footer.style.setProperty(
      "--ic_logn_whirt_1_width",
      this.$appConfig.source.ic_logn_whirt_1.width
    );
    this.isMobile = ismobile();
  },
  methods: {
    showItem(key) {
      if (!this.isMobile) {
        return;
      }
      const temp = this.showData[key];
      this.showData.item1 = false;
      this.showData.item2 = false;
      this.showData.item3 = false;
      if (!temp) {
        this.showData[key] = true;
      }
    },
    download() {
      getDownUrl();
    },
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
    }
  }
};
</script>
<style lang="less" scoped>
.footer {
  padding-top: 80px;
  padding-bottom: 40px;
  background-color: #0e1014;
  --ic_logn_whirt_1_width: 135;

  .container {
    margin: 0 auto;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .link {
      .title {
        .title_txt {
          font-size: 18px;
          line-height: 32px;
          color: #ffffff;
          font-weight: bold;
        }

        .tittel_ing {
          display: none;
        }
      }

      .link_item {
        padding-top: 7px;
        display: block;
        font-size: 14px;
        line-height: 24px;
        color: #cbcbcb;
        &.first {
          padding-top: 20px;
        }
      }
    }

    .dateils_contetn {
      .logo_box {
        .logo {
          width: calc(var(--ic_logn_whirt_1_width) * 1px);
          height: auto;
        }
      }

      .dateils_desc {
        width: 482px;
        padding-top: 30px;
        font-size: 14px;
        line-height: 20px;
        color: #cbcbcb;
      }

      .dateils_sm {
        padding-top: 20px;
        font-size: 14px;
        line-height: 20px;
        color: #cbcbcb;
      }
    }
  }
}
@media (max-width: 1200px) {
  .footer {
    padding-top: 80px * 0.8;
    padding-bottom: 40px * 0.8;
    .container {
      width: 1200px * 0.8;
      .link {
        .title {
          .title_txt {
            font-size: 18px * 0.8;
            line-height: 32px * 0.8;
          }
          .tittel_ing {
            display: none;
          }
        }
        .link_item {
          padding-top: 7px * 0.8;
          display: block;
          font-size: 14px * 0.8;
          line-height: 24px * 0.8;
          color: #cbcbcb;
          &.first {
            padding-top: 20px * 0.8;
          }
        }
      }

      .dateils_contetn {
        .logo_box {
          .logo {
            width: calc(var(--ic_logn_whirt_1_width) * 0.8 * 1px);
          }
        }

        .dateils_desc {
          width: 482px * 0.8;
          padding-top: 30px * 0.8;
          font-size: 14px * 0.8;
          line-height: 20px * 0.8;
        }

        .dateils_sm {
          padding-top: 20px * 0.8;
          font-size: 14px * 0.8;
          line-height: 20px * 0.8;
        }
      }
    }
  }
}
@media (max-width: 980px) {
  .footer {
    .container {
      width: 1200px * 0.6;
    }
  }
}
@media (max-width: 767px) {
  .footer {
    padding: 0 0.3rem 0.6rem;
    background-color: #0e1014;
    .container {
      margin: 0;
      width: 100%;
      display: block;
      .link {
        .title {
          padding-top: 0.48rem;
          .title_txt {
            font-size: 0.36rem;
            line-height: 0.84rem;
            color: #ffffff;
            font-weight: bold;
          }
          .tittel_ing {
            display: block;
            width: 0.24rem;
            height: 0.16rem;
          }
        }

        .link_item {
          padding-top: 0;
          display: block;
          font-size: 0.28rem;
          line-height: 0.84rem;
          color: rgba(255, 255, 255, 0.59711);
          &.first {
            padding-top: 0px;
          }
        }
      }

      .dateils_contetn {
        display: none;
      }
    }
  }
}
</style>
