<template>
  <div class="homeFrom">
    <div class="order_up">
      <div class="order_up_left">
        <img src="@/assets/transactions/ico_usdt.png" />
        <span>购买USDT</span>
      </div>
      <div class="order_up_right">
        待付款
        <div class="order_up_right_name">张**</div>
      </div>
    </div>
    <div class="order_down">
      <div class="order_down_content">
        <div>2020-12-12 12:12:12</div>
        <span>创建订单时间</span>
      </div>
      <div class="order_down_content">
        <div>10,100</div>
        <span>数量(USDT)</span>
      </div>
      <div class="order_down_content">
        <div>17,878.63</div>
        <span>成交金额(CNY)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeOrder",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.homeFrom {
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
