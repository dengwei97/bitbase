<template>
  <div ref="noticeDetails" class="noticeDetails">
    <div class="content">
      <div class="notice_title">
        <div class="title_l">{{ $t("公告") }}</div>
        <div class="title_r">/ {{ details.title }}</div>
      </div>
      <div class="notice_content">
        <div class="content_lists">
          <div class="text text_bold">{{ $t("最新公告") }}</div>
          <ul>
            <li
              v-for="(item,index) of list"
              :key="index"
              class="text"
              :class="{active:item.id == activeid}"
              @click="onClick(item)"
            >{{ item.title }}</li>
          </ul>
          <div v-if="lock" class="text more" @click="more">{{ $t("查看更多") }}</div>
        </div>
        <div class="details">
          <div class="details_title">{{ details.title }}</div>
          <div class="logoIssuer">
            <img :src="$appConfig.source.logo.src" alt />
            <div class="Issuer">
              <div class="Publisher">{{ $appConfig.lowerName }}</div>
              <div v-if="details.createTime" class="time">{{ details.createTime - 0 | getTimes }}</div>
            </div>
          </div>
          <div class="Articles">
            <div v-for="(item,index) of contentlist" :key="index" class="Paragraph text">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import { getTimes } from "@/filters/index";
export default {
  name: "NoticeDetails",
  data() {
    return {
      activeid: null, // 当前点击公告id
      list: [], // 公告列表
      current: 1, // 页码
      size: 10, // 数量
      lock: true, // 判断是否可以上拉加载
      total: 0, // 公告总数
      details: [], // 公告详情
      contentlist: [] // 公告内容
      // loading: null //loading
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.activeid = this.$route.params.id;
    this.getAnnouncement();
    this.getnoticeDetails();
    // 添加loading
    // this.loading = this.$loading({
    //   lock: true,
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)"
    // });
  },
  mounted() {
    this.$refs.noticeDetails.style.setProperty(
      "--logo_width",
      this.$appConfig.source.logo.width
    );
  },
  methods: {
    onClick(item) {
      this.activeid = item.id;
      // 改变路由的参数
      this.$router.push({
        path: "/noticeDetails",
        name: "noticeDetails",
        params: {
          id: item.id
        }
      });
      this.getnoticeDetails();
    },
    // 获取公告
    getAnnouncement() {
      userInfoApi
        .getAnnouncement({
          current: this.current,
          size: this.size
        })
        .then(res => {
          // console.log(res)
          // 清除loading
          // this.loading.close();

          const rows = res.data.data.records;
          this.total = res.data.data.total;
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.lock = false;
            return;
          }
          // 将数据合并
          this.list = this.list.concat(rows);
          // 如果列表数据条数>=总条数，不再触发滚动加载
          if (this.list.length >= this.total) {
            this.lock = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看更多
    more() {
      if (this.lock) {
        this.current++;
        this.getAnnouncement();
      }
    },
    // 获取id详情getnoticeDetails
    getnoticeDetails() {
      userInfoApi
        .getnoticeDetails({
          id: this.activeid
        })
        .then(res => {
          console.log(res);
          this.details = res.data.data;
          this.contentlist = res.data.data.content.split("\n");
          // console.log(this.contentlist)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='less' scoped >
.noticeDetails {
  --logo_width: 38;
  .content {
    padding-top: 40px;
    width: 1200px;
    margin: 0 auto;
    .notice_title {
      display: flex;
      line-height: 20px;
      font-size: 13px;
      .title_l {
        color: #4f5669;
      }
      .title_r {
        color: #a1b1c1;
      }
    }
    .notice_content {
      width: 100%;
      padding-top: 56px;
      display: flex;
      justify-content: space-between;
      .text {
        font-size: 14px;
        line-height: 24px;
        color: #4f5669;
        word-break: break-all;
        white-space: pre-wrap;
        cursor: default;
      }

      .content_lists {
        width: 24%;
        .text_bold {
          font-weight: bold;
          padding-bottom: 14px;
        }
        ul li {
          padding: 11px;
          margin-bottom: 10px;
        }
        .active {
          background: @cl-m;
          border-radius: 4px;
          color: #ffffff;
        }
        .more {
          color: @cl-m;
          cursor: pointer;
        }
      }
      .details {
        width: 74%;
        .details_title {
          font-size: 30px;
          line-height: 40px;
          color: #40405e;
        }
        .logoIssuer {
          display: flex;
          padding: 20px 0 40px 0;
          img {
            width:  calc(var(--logo_width) * 1px);
            height: 38px;
          }
          .Issuer {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 15px;
            .Publisher {
              font-size: 14px;
              // line-height: 22px;
              color: #40405e;
            }
            .time {
              font-size: 13px;
              // line-height: 19px;
              color: #4f5669;
            }
          }
        }
        .Articles {
          .Paragraph {
            padding-bottom: 16px;
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .noticeDetails {
    .content {
      padding-top: 40px * 0.8;
      width: 1200px * 0.8;

      .notice_content {
        padding-top: 56px * 0.8;

        .details {
          .details_title {
            font-size: 30px * 0.8;
            line-height: 40px * 0.8;
          }
          .logoIssuer {
            padding: 20px * 0.8 0 40px * 0.8 0;
            // img {
            //   width: 38px * 0.8;
            //   height: 38px * 0.8;
            // }
          }
          .Articles {
            .Paragraph {
              padding-bottom: 16px * 0.8;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 980px) {
  .noticeDetails {
    .content {
      padding-top: 40px * 0.6;
      width: 1200px * 0.6;

      .notice_content {
        padding-top: 56px * 0.6;

        .details {
          .details_title {
            font-size: 30px * 0.6;
            line-height: 40px * 0.6;
          }
          .logoIssuer {
            padding: 20px * 0.6 0 40px * 0.6 0;
            // img {
            //   width: 38px * 0.6;
            //   height: 38px * 0.6;
            // }
          }
          .Articles {
            .Paragraph {
              padding-bottom: 16px * 0.6;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .noticeDetails {
    .content {
      padding: 0 0.3rem;
      width: 100%;
      .notice_title {
        display: none;
      }
      .notice_content {
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        .text {
          font-size: 0.28rem;
          line-height: 0.48rem;
          color: #4f5669;
          word-break: break-all;
          white-space: pre-wrap;
        }

        .content_lists {
          order: 1;
          width: 100%;
          .text_bold {
            font-weight: bold;
            padding: 0.6rem 0 0.32rem 0;
          }
          ul li {
            padding: 0;
            margin: 0;
            padding-bottom: 0.16rem;
            color: @cl-m;
          }
          .active {
            background: transparent;
            color: @cl-m;
            border: 0;
          }
          .more {
            display: none;
          }
        }
        .details {
          width: 100%;
          .details_title {
            padding: 0.6rem 0 0.32rem 0;
            font-size: 0.4rem;
            line-height: 0.56rem;
            color: #40405e;
            word-break: break-all;
            white-space: pre-wrap;
          }
          .logoIssuer {
            display: none;
          }
          .Articles {
            padding-bottom: 0.6rem;
            border-bottom: 1px solid #eeeeee;
            .Paragraph {
              padding-bottom: 0.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
