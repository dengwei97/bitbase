<template>
  <div class="myorder">
    <div>
      <div class="order_status" :class="{clickType:pop.selectType}">
        <div class="order_l">
          <img src="@/assets/transactions/ico_filter.png" alt />
          <div class="tit">订单状态</div>
        </div>
        <div class="order_r" @click="pop.selectType=true">
          <div class="tit">{{ pop.defaultType }}</div>
          <img :class="{jiantou:pop.selectType}" src="@/assets/transactions/ico_arrow_right.png" alt />
        </div>
      </div>
      <div style="position: relative;">
        <div v-if="pop.selectType" class="overlay"></div>
        <div v-if="pop.selectType" class="order_types">
					<div class="type_title">交易类型</div>
					<div class="item_type">
						<div v-for="(item,index) of transactionType" :key="index" class="i_type" :class="{active:transactionActive == item.value}" @click="clicktransaction(item)">{{ item.text }}</div>
					</div>
					<div class="type_title">订单状态</div>
          <div class="item_type">
            <div
              v-for="(item,index) of orderType"
              :key="index"
              class="i_type"
              :class="{active:pop.value==item.value}"
              @click="clicktype(item)"
            >{{ item.text }}</div>
          </div>
          <div class="btns">
            <div class="cancel" @click="cancel">取消</div>
            <div class="confirm" @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </div>

    <div class="allorder">
      <!-- <van-list v-if="nolist" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <orderTemplate v-for="(item,index) in data" :key="index" :item="item" class="order_item" @click.native="getorderDetails(item)"></orderTemplate>
      </van-list>-->
      <van-list
        v-if="!nolist"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <orderTemplate
          v-for="(item,index) in data"
          :key="index"
          :item="item"
          class="order_item"
          @click.native="getorderDetails(item)"
        />
      </van-list>
      <nolist v-if="nolist" class="nolist" />
    </div>
  </div>
</template>

<script>
import orderTemplate from "@/components/orderTemplate/index";
import { List } from "vant";
import orderInfo from "@/api/orderInfo";
import nolist from "@/components/nolist/index";
export default {
  name: "OrderList",
  components: {
    orderTemplate,
    nolist
  },
  data() {
    return {
      pop: {
        selectType: false, // 状态弹框
        value: 0, // 当前点击状态
        defaultType: "全部" // 默认状态
      },
      
      orderType: [
        { text: "全部", value: 0 },
      { text: "待收款", value: 1 },
      { text: "待放行", value: 2 },
      { text: "已完成", value: 3 },
      { text: "已取消", value: 4 }
			],
			transactionType:[
				{ text: "全部", value: 0 },
        { text: "购买", value: 1 },
        { text: "出售", value: 2 },
			], //类型
			transactionActive:0, //默认类型
			transactionname:'全部',//默认类型文字
			// pages: "", //页数
			loading: true, // 上拉加载
      finished: false, // 上拉加载完毕
      table: {
        orderType: '', // 3是收银台
        size: 10, // 多少条
        current: 1, // 第几页
        orderState: "", // 订单状态
        active: 3,
        tradeType: '' // 1买  2 卖
      },
      total: 0, // 总数
      data: [],
      nolist: false // 没有数据展示
    };
  },
  computed: {},
  created() {
    this.$store.state.user.noheader = false
  },
  mounted() {
    // if (this.$store.state.user.type == "sell") {
    // if (window.localStorage.getItem("type") == "sell") {
    // //   this.table.tradeType = 2;
    // this.orderType = [
    //   { text: "全部", value: 0 },
    //   { text: "待收款", value: 1 },
    //   { text: "待放行", value: 2 },
    //   { text: "已完成", value: 3 },
    //   { text: "已取消", value: 4 }
    // ];
    // } else {
    // //   this.table.tradeType = 1;
    //   this.orderType = [
    //     { text: "全部", value: 0 },
    //     { text: "待付款", value: 1 },
    //     { text: "待转币", value: 2 },
    //     { text: "已完成", value: 3 },
    //     { text: "已取消", value: 4 }
    //   ];
    // }

    this.getOrderList();
  },
  methods: {
    // 跳转详情
    getorderDetails(item) {
      console.log(item);
      if (item.isSeller == 0) {
        this.$router.push({
          path: "/morderDetails/" + item.id,
          // params: {
          //   id: item.id
          // }
        });
      } else {
        this.$router.push({
          path: "/msellUsdt/" + item.id,
          // params: {
          //   id: item.id
          // }
        });
      }
		},
		// 类型选择
		clicktransaction(item){
			this.transactionActive = item.value;
			this.table.tradeType = item.value
		},
    // 状态选择
    clicktype(item) {
      this.pop.value = item.value;
      // console.log(item)
    },
    // 取消
    cancel() {
      this.pop.selectType = false;
      this.orderType.forEach(item => {
        if (item.text == this.pop.defaultType) {
          this.pop.value = item.value
        }
      })
      this.transactionType.forEach(item => {
        if (item.text == this.transactionname) {
          this.transactionActive = item.value
        }
      })
      
      console.log(this.pop.defaultType);
      console.log(this.pop.value);
    },
    // // 确定
    // confirm() {
    //   this.pop.defaultType = this.orderType[this.pop.value].text;
    //   this.pop.selectType = false;
    //   this.table.current = 1;
    //   if (this.pop.value == 0) {
    //     this.table.orderState = "";
    //     this.data = [];
    //   } else {
    //     this.table.orderState = this.pop.value;
    //     this.data = [];
    //   }
    //   this.finished = false;
    //   this.loading = true;
    //   this.onLoad();
    //   console.log(this.pop.defaultType);
    //   console.log(this.pop.value);
    // },
    // 确定
    confirm() {
      // this.pop.defaultType = this.orderType[this.pop.value].text;
      this.orderType.forEach(item => {
        if (item.value == this.pop.value) {
          this.pop.defaultType = item.text
        }
			})
			if(this.transactionActive == 0){
				this.table.tradeType = ''
			}
      this.pop.selectType = false;
      this.table.current = 1;
      this.total = 0;
      this.loading = true;
      this.finished = false;
      this.data = [];
      if (this.pop.value == 0) {
        this.table.orderState = "";
        this.getOrderList();
      } else {
        this.table.orderState = this.pop.value;
        this.getOrderList();
      }

      // console.log(this.pop.defaultType);
      // console.log(this.pop.value);
    },
    // 获取订单列表
    getOrderList() {
      this.nolist = false;
      orderInfo
        .orderList(this.table)
        .then(res => {
          console.log(res);
          const rows = res.data.data.records;
          this.loading = false;
          this.total = res.data.data.total - 0;
          if (rows == null || rows.length == 0) {
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
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      this.table.current++;
      this.getOrderList();
    }
    
  }
};
</script>

<style lang="less" scoped>
.myorder {
  width: 100vw;
  min-height: 100vh;
  background: #f7f7fa;
  .navbar {
    background: transparent;
    .back {
      width: 0.48rem;
      height: 0.48rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .order_status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.28rem;
    height: 1rem;
    background: #ffffff;
    .tit {
      font-family: PingFangSC;
      font-size: 0.28rem;
      line-height: 0.32rem;
			color: #a0a0b3;
			padding-right: 0.1rem;
    }
    .order_l {
      display: flex;
      align-items: center;
      img {
        margin-right: 0.2rem;
        width: 0.48rem;
        height: 0.48rem;
      }
    }
    .order_r {
      display: flex;
      align-items: center;
      img {
        margin-left: 0.1rem;
        width: 0.12rem;
        height: 0.2rem;
      }
    }
  }
  .clickType {
    background: #f7f7fa;
  }
  .jiantou {
    transform: rotate(90deg);
  }
  .overlay {
    position: fixed;
    top: 1.92rem;
    left: 0;
    z-index: 2001;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .order_types {
    position: fixed;
    max-height: 100%;
    z-index: 2003;
    left: 0rem;
    background: #f7f7fa;
		.type_title{
			font-size: 0.28rem;
			line-height: 0.4rem;
			color: #A0A0B3;
			padding: 0.48rem 0.4rem 0;
		}
    .item_type {
      padding: 0 0 0 0.4rem;
      display: flex;
      flex-wrap: wrap;
      .i_type {
        width: 2.08rem;
        height: 0.56rem;
        background: #ffffff;
        border-radius: 0.32rem;
        font-family: PingFangSC;
        font-size: 0.28rem;
        line-height: 0.56rem;
        text-align: center;
        color: #40405e;
        margin-top: 0.32rem;
        margin-right: 0.24rem;
      }
      .active {
        background: rgba(12, 179, 151, 0.1);
        border: 1px solid @cl-m;
        box-sizing: border-box;
        color: @cl-m;
      }
    }
    .btns {
			margin-top: 0.4rem;
      display: flex;
      align-items: center;
      background: #ffffff;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      .cancel {
        height: 1.04rem;
        line-height: 1.04rem;
        flex: 1;
        font-family: PingFangSC;
        font-size: 0.32rem;
        text-align: center;
        color: #a0a0b3;
        border-right: 1px solid #f5f5fa;
      }
      .confirm {
        height: 1.04rem;
        line-height: 1.04rem;
        flex: 1;
        font-family: PingFangSC;
        font-size: 0.32rem;
        text-align: center;
        color: @cl-m;
      }
    }
  }
  .allorder {
    padding: 0 0.24rem 0.4rem 0.24rem;
    .nolist {
      padding-top: 2.2rem;
    }
    .order_item {
      margin-top: 0.36rem;
    }
  }
}
</style>
