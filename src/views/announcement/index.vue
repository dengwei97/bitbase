<template>
  <div class="announcement">
    <div class="content">
      <div class="title">{{ $t('公告中心') }}</div>
      <div class="lists">
        <div class="list_title">{{ $t("最新公告") }}</div>
        <div class="list_content">
          <div v-for="(item,index) of list" :key="index" class="tit" @click="details(item)">{{ item.title }}</div>

        </div>
        <div v-if="lock" class="more" @click="more">{{ $t("查看更多") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from '@/api/userInfo'
export default {
  name: "Announcement",
  data() {
    return {
      current: 1, // 页码
      size: 10, // 数量
      lock: true, // 判断是否可以上拉加载
      total: 0,
      list: []
      // loading:null,

    };
  },
  created() {
    this.getAnnouncement()
     // 添加loading
    // this.loading = this.$loading({
    //     lock: true,
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
  },
  methods: {
    // 获取公告
    getAnnouncement() {
      userInfoApi.getAnnouncement({
        current: this.current,
        size: this.size
      }).then(res => {
        // console.log(res)
        // 清除loading
          // this.loading.close()
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
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看更多
    more() {
      if (this.lock) {
        this.current++;
        this.getAnnouncement()
      }
    },
    // 查看详情
    details(item) {
      console.log(item)
      this.$router.push({
        path: '/noticeDetails',
        name: 'noticeDetails',
        params: {
          id: item.id
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.announcement {
  .content {
    margin: 0 auto;
    width: 1200px;
    padding: 0 100px;
    .title {
      padding: 54px 0 40px 0;
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0.25px;
      color: #40405e;
    }
    .lists {
      .list_title {
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        color: #40405e;
      }
      .list_content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .tit {
          width: 48%;
          font-size: 14px;
          line-height: 24px;
          color: #4f5669;
          padding-top: 20px;
          word-break: break-all;
          white-space: pre-wrap;
          cursor: default ;
        }
      }
      .more {
        padding-top: 30px;
        font-size: 14px;
        line-height: 24px;
        color: @cl-m;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 1200px) {
  .announcement {
    .content {
      width: 1200px * 0.8;
      padding: 0 100px * 0.8;
      .title {
        padding: 54px * 0.8 0 40px * 0.8 0;
        font-size: 30px * 0.8;
        line-height: 40px * 0.8;
      }
      .lists {
        .list_content {
          .tit {
            padding-top: 20px * 0.8;
          }
        }
        .more {
          padding-top: 30px * 0.8;
        }
      }
    }
  }
}
@media (max-width: 980px) {
  .announcement {
    .content {
      width: 1200px * 0.6;
      padding: 0 100px * 0.6;
      .title {
        padding: 54px * 0.6 0 40px * 0.6 0;
        font-size: 30px * 0.6;
        line-height: 40px * 0.8;
      }
      .lists {
        .more {
          padding-top: 30px * 0.6;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .announcement {
    width: 100%;
    .content {
      width: 100%;
      padding: 0 0.3rem;
      .title {
        padding: 1rem 0 0.64rem 0;
        font-size: 0.48rem;
        line-height: 0.8rem;
        color: #4f5669;
      }
      .lists {
        display: flex;
        flex-direction: column;
        .list_title {
          font-weight: 600;
          font-size: 0.28rem;
          line-height: 0.48rem;
          color: #40405e;
        }
        .list_content {
          width: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          .tit {
            width: 100%;
            font-size: 0.28rem;
            line-height: 0.48rem;
            color: #4f5669;
            padding-top: 0.32rem;
            word-break: break-all;
            white-space: pre-wrap;
          }
        }
        .more {
        padding-top: 0.6rem;
        font-size: 0.28rem;
        line-height: 0.48rem;
        color: @cl-m;
      }
      }
    }
  }
}
</style>
