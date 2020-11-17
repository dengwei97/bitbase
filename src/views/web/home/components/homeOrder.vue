<template>
  <div class="homeFrom pointer" @click="toDateils">
    <div class="order_up">
      <div class="order_up_left">
        <img src="@/assets/transactions/ico_usdt.png" />
        <span>{{ item.isSeller == 0 ? '购买' : '出售' }}{{ item.coinName }}</span>
      </div>
      <div v-if="item.isSeller == 0" class="order_up_right">
        <!-- {{orderState[item.orderState-1]}} -->
        {{ item.orderState == 1?'待付款':item.orderState == 2 ? '待转币' : item.orderState == 6 ? '待转币' : item.orderState == 3 ? '已完成' : '已取消' }}
        <div class="order_up_right_name">{{ item.businessRealName.slice(0,1) + '**' }}</div>
      </div>
      <div v-if="item.isSeller == 1" class="order_up_right">
        <!-- {{orderState[item.orderState-1]}} -->
        {{ item.orderState == 1?'待收款':item.orderState == 7 ? '待转币' : item.orderState == 2 ? '已完成' : item.orderState == 3 ? '已完成' : '已取消' }}
        <div class="order_up_right_name">{{ item.businessRealName.slice(0,1) + '**' }}</div>
      </div>
    </div>
    <div class="order_down">
      <div class="order_down_content">
        <div>{{ (item.createTime - 0) | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        <span>创建订单时间</span>
      </div>
      <div class="order_down_content">
        <div>{{ item.tradeAmount }}</div>
        <span>数量(USDT)</span>
      </div>
      <div class="order_down_content">
        <div>{{ item.totalMoney }}</div>
        <span>成交金额(CNY)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeOrder",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      orderState: ["待支付", "待放行", "已完成", "已取消", "申诉中"]
    };
  },
  mounted() {},
  methods: {
    toDateils() {
      const item = this.item
      if (item.isSeller == 0) {
        this.$router.push({
          path: '/buyDateils',
          query: {
            id: item.id
          }
        })
      } else {
        this.$router.push({
          path: '/sellDateils',
          query: {
            id: item.id
          }
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.homeFrom {
  margin-top: 2px;
  width: 789px;
  height: 150px;
  background: #f7f7fa;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .order_up {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .order_up_left {
      display: flex;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        font-size: 16px;
        color: #40405e;
        line-height: 28px;
        padding-left: 12px;
      }
    }
    .order_up_right {
      font-size: 14px;
      color: #f2a145;
      .order_up_right_name {
        color: #40405e;
      }
    }
  }
  .order_down {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .order_down_content {
      display: flex;
      flex-direction: column;
      div {
        font-size: 16px;
        color: #40405e;
      }
      span {
        font-size: 12px;
        color: #a0a0b3;
      }
    }
  }
}
@media (max-width: 1200px) {
  .homeFrom {
    width: 789px * 0.8;
    height: 150px * 0.8;
    padding: 20px * 0.8 30px * 0.8;
    .order_up {
      .order_up_left {
        img {
          width: 28px * 0.8;
          height: 28px * 0.8;
        }
        span {
          font-size: 16px * 0.8;
          line-height: 28px * 0.8;
          padding-left: 12px * 0.8;
        }
      }
      .order_up_right {
        font-size: 14px * 0.8;
      }
    }
    .order_down {
      .order_down_content {
        div {
          font-size: 16px * 0.8;
        }
        span {
          font-size: 12px * 0.8;
        }
      }
    }
  }
}
@media (max-width: 960px) {
  .homeFrom {
    width: 789px * 0.6;
    height: 150px * 0.6;
    padding: 20px * 0.6 30px * 0.6;
    .order_up {
      .order_up_left {
        img {
          width: 28px * 0.6;
          height: 28px * 0.6;
        }
        span {
          font-size: 16px * 0.6;
          line-height: 28px * 0.6;
          padding-left: 12px * 0.6;
        }
      }
      .order_up_right {
        font-size: 14px * 0.6;
      }
    }
    .order_down {
      .order_down_content {
        div {
          font-size: 16px * 0.6;
        }
        span {
          font-size: 12px * 0.6;
        }
      }
    }
  }
}
</style>
