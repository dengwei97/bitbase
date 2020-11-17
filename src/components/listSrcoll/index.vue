<template>
  <div>
    <van-list
      v-model="vanList.loading"
      :finished="vanList.finished"
      @load="getList"
    >
      <div v-for="(item, index) in listData.list" :key="index">
        <!-- 这里是关键 slot 插槽 绑定 item 数据，父级可以访问 -->
        <slot :item="item" :index="index"></slot>
      </div>
      <div slot="loading">
        <div class="data_ing img-box">
          <img class="ing_img" src="../../assets/ajax-loading3.gif" />
        </div>
      </div>
    </van-list>
    <div class="scroll-bottom">
      <div v-if="listData.state == 0">
        <div class="no_data">
          <img class="no_data_img" src="../../assets/ic_no.png" />
          <div class="no_data_txt">{{ stateTxt0 }}</div>
        </div>
      </div>
      <div v-if="listData.state == 1">
      </div>
      <div v-if="listData.state == 2">
      </div>
      <div v-if="listData.state == 3">
        <div class="data_out">
          No more data
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/utils/request"
export default {
  props: {
    callback: {
      // 加载回调
      type: Function,
      require: true
    },
    // 请求数据
    ajaxData: {
      type: Object,
      default: () => {}
    },
    // 请求地址
    url: {
      type: String,
      default: ""
    },
    stateTxt0: {
      type: String,
      default: "暂无内容"
    },
    stateTxt1: {
      type: String,
      default: "加载中"
    },
    stateTxt2: {
      type: String,
      default: "加载完成"
    },
    stateTxt3: {
      type: String,
      default: "没有数据了"
    }
  },
  data() {
    return {
      // 请求数据
      listData: {
        list: [],
        pageIndex: 1,
        pageTotal: 0,
        state: 2, // 0、无数据 1、加载中 2、无状态 3、没有更多的数据
        ajaxData: {
          current: 1,
          size: 10
        },
        url: ""
      },
      keyObject: '',
      lock: true,
      vanList: {
        loading: false,
        finished: false
      }
    }
  },
  created() {
    Object.assign(this.listData.ajaxData, this.ajaxData)
    this.listData.url = this.url
    if (!this.listData.url) {
      this.vanList.finished = true
      console.error("没有传入请求的url")
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 获取列表数据
     */
    getList() {
      if (this.listData.state !== 2) {
        return
      }
      this.listData.state = 1
      this.vanList.loading = true
      request({
        url: this.listData.url,
        method: "POST",
        data: {
          ...this.listData.ajaxData,
          processData: true // 序列化数据
        }
      })
        .then(res => {
          res = res.data.data
          if (!res.records) {
            res.records = []
          }
          // 判断无数据
          if (this.listData.list.length <= 0 && res.records.length <= 0) {
            this.listData.state = 0
            this.vanList.finished = true
          } else if (res.records.length >= 0 && res.records.length < this.listData.ajaxData.size) {
            // 已经没有更多数据
            this.listData.state = 3
            this.vanList.finished = true
          } else {
            this.listData.state = 2
            this.vanList.loading = false
          }
          // 请求页面加一
          this.listData.ajaxData.current++
          if (this.callback && res.records.length > 0) {
            res.records = this.callback(res.records)
          }
          res.records.forEach(item => {
            this.listData.list.push(item)
          })
        })
        .catch(err => {
          this.listData.state = 2
          this.vanList.loading = false
        })
    },
    /**
     * 重置列表,列表状态
     */
    refreshList(delData) {
      this.listData.state = 2
      this.listData.list = []
      this.listData.ajaxData.current = 1
      this.vanList.loading = false
      this.vanList.finished = false
      if (delData === "delData") {
        return
      } else {
        this.getList()
      }
    },
    /**
     * Objie
     * 传入参数，  重置列表,列表状态
     */
    refreshListKey(keyObject) {
      clearTimeout(this.lock)
      this.lock = setTimeout(() => {
        this.listData.state = 2
        this.listData.list = []
        this.listData.ajaxData.current = 1
        this.vanList.loading = false
        this.vanList.finished = false
        this.listData.ajaxData = {
          current: this.listData.ajaxData.current,
          size: this.listData.ajaxData.size
        }
        if (keyObject) {
          for (const key in keyObject) {
            this.listData.ajaxData[key] = keyObject[key]
          }
        }
        this.getList()
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>

  .scroll-bottom {
    font-size: 20px;
    color: #11062a;
  }
  .no_data {
    padding-top: .4rem;
    padding-bottom: .2rem;
    text-align: center;
    font-size: 0;
    .no_data_img {
      width: 2.2rem;
      height: 2rem;
    }
    .no_data_txt {
      padding-top: .4rem;
      font-size: .32rem;
      line-height: .36rem;
      color: #8C8C8C;
      text-align: center;
    }
  }
  .data_ing {
    text-align: center;
    padding: .2rem 0;
    .ing_img {
      width: 2rem;
      height: .4rem;
    }
  }
  .data_out{
    padding: .2rem 0;
    text-align: center;
    font-size: .24rem;
    color: rgba(0,0,0,0.3);
  }
</style>
