<template>
  <div class="container">
    <div class="tabs">
      <p
        :class="{ active: type === 1, default: type !== 1 }"
        @click="choose(1)"
      >
        充币记录
      </p>
      <p
        :class="{ active: type === 2, default: type !== 2 }"
        @click="choose(2)"
      >
        提币记录
      </p>
    </div>
    <div class="records">
      <van-list v-if="!nolist"
        v-model="loading"
        :finished="finished"
        @load="onLoad">

        <ul class="records-list" >
          <li v-for="(item, index) in data" :key="index" @click="goDetails(item.id)">
            <div class="left">
              <p class="m">{{type===1?'充币':'提币'}}{{item.currency}}</p>
              <p class="des">{{item.createTime-0 | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p>
            </div>
            <div class="right">
              <p class="m">{{type == 1 ? '+' :'-'}}{{item.amount}}</p>
              <p class="des" v-if='type == 1' :class="{ongOing : item.status == 1}">{{item.status == 1 ? '进行中' : '完成'}}</p>
              <p class="des" v-if="type == 2" :class="{ongOing : item.orderState == 0}">{{item.orderState == 0 ? '进行中' : item.orderState == 1 ? '完成' : item.orderState == 2 ? '失败' : '审核中'}}</p>
            </div>
          </li>
        </ul>
      </van-list>
      <nolist v-if="nolist" class="nolist" />
    </div>
  </div>
</template>

<script>
import nolist from "@/components/nolist/index";
import buyApi from '@/api/buy'
export default {
  data() {
    return {
      type: 1,
      loading: true, // 上拉加载
      finished: false, // 上拉加载完毕
      table: {
        size: 20, // 多少条
        current: 1, // 第几页
        coinName:'USDT'
      },
      total: 0, // 总数
      data: [],
      nolist: false // 没有数据展示
    };
  },
  props: {},
  components: {
    nolist
  },
  mounted() {
    this.walletRecord()
  },
  methods: {
    goDetails(value){
      this.$router.push({
        path:'mwalletRecordDetail',
        query:{
          type:this.type,
          id:value
        }
      })
        
    },
    choose(value){
      this.type = value
      this.loading = true
      this.finished = false
      this.table.current = 1
      this.total = 0
      this.data = []
      this.nolist = false
      this.walletRecord()
    },
    walletRecord(){
      if(this.type == 1 ){
        buyApi.walletRecord(this.table).then(res => {
          console.log(res);
          const rows = res.data.data.records;
          this.loading = false;
          this.total = res.data.data.total - 0;
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.finished = true;
            this.nolist = true;
            return;
          }
          // 将新数据与老数据进行合并
          this.data = this.data.concat(rows);
          // console.log(this.list)
          // 如果列表数据条数>=总条数，不再触发滚动加载
          if (this.data.length >= this.total) {
            this.finished = true;
          }
          // console.log(this.orderList)
        })
      }else{
        buyApi.walletWithdraw(this.table).then(res => {
          console.log(res);
          const rows = res.data.data.records;
          this.loading = false;
          this.total = res.data.data.total - 0;
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.finished = true;
            this.nolist = true;
            return;
          }
          // 将新数据与老数据进行合并
          this.data = this.data.concat(rows);
          // console.log(this.list)
          // 如果列表数据条数>=总条数，不再触发滚动加载
          if (this.data.length >= this.total) {
            this.finished = true;
          }
          // console.log(this.orderList)
        })
      }
    },
    onLoad() {
      this.table.current ++;
      this.walletRecord();
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  .des {
    color: #a0a0b3;
  }
  .ongOing{
    color: #00BC7A;
  }
  .nolist{
    margin-top: 1.5rem;
  }
  .tabs {
    margin-top: 0.16rem;
    width: 100%;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;

    p:first-child{margin-right: 0.8rem;}

    .active {
      font-size: 0.36rem;
    }
    .default {
      font-size: 0.32rem;
      color: #aaaabc;
    }
  }
  .records {
    padding: 0 0.32rem;
    h3 {
      font-weight: 500;
      font-size: 0.32rem;
      line-height: 1.4rem;
      height: 1.24rem;
      color: #a0a0b3;
    }
    .records-list {
      .m {
        font-size: 0.28rem;
      }
      .des {
        font-size: 0.24rem;
      }
      & > li {
        height: 1.28rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        p {
          margin-top: 0.08rem;
        }
      }
      li {
        border-bottom: solid 1px #f5f5fa;
      }
    }
  }
}
</style>
