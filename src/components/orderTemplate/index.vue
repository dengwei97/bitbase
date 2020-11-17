<template>
  <div class="order_item">
    <div class="item_t">
      <div class="t_title">
        <div class="t_imgs">
          <img :src="item.coinImgUrl" alt />
          <div class="tit">{{ item.isSeller == 0 ? '购买' : '出售' }}{{ item.coinName }}</div>
        </div>
        <div class="t_r">
          <div
            v-if="item.isSeller == 0"
            class="r_type text"
            :class="[item.orderState == 1 ?'type1':item.orderState == 2 ? 'type2' : item.orderState == 6 ? 'type2' :item.orderState == 3 ? 'type3': 'type3']"
          >{{ item.orderState == 1?'待付款':item.orderState == 2 ? '待转币' : item.orderState == 6 ? '待转币' : item.orderState == 3 ? '已完成' : '已取消' }}</div>
          <div
            v-if="item.isSeller == 1"
            class="r_type text"
            :class="[item.orderState == 1 ?'type1':item.orderState == 7 ? 'type2' : item.orderState == 2 ? 'type3' :item.orderState == 3 ? 'type3': 'type3']"
          >{{ item.orderState == 1?'待收款':item.orderState == 7 ? '待转币' : item.orderState == 2 ? '待放行' : item.orderState == 3 ? '已完成' : '已取消' }}</div>
        </div>
      </div>
      <div class="nameTime">
        <div class="r_name text">{{ item.businessRealName.slice(0,1) + '**' }}</div>
      </div>
      <div class="nameTime">
        <div class="r_time tit_mini">订单创建时间 {{ item.createTime - 0 | getTimeData }}</div>
      </div>
    </div>
    <div class="item_b">
      <div>
        <div class="tit">{{ item.tradeAmount | toThousandFilter }}</div>
        <div class="tit_mini">数量(USDT)</div>
      </div>
      <div>
        <div class="tit" style="text-align: right;">{{ item.totalMoney | toThousandFilter }}</div>
        <div class="tit_mini totalMoney">成交金额(CNY)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array | Object
    }
  },
  data() {
    return {};
  },
  created() {},

  methods: {}
};
</script>

<style lang="less" scoped>
.order_item {
  // margin-top: 0.36rem;
  box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
  // border: 0.03rem solid #fff;
  padding: 0.06rem;
  border-radius: 0.12rem;
  background: #ffffff;
  .tit {
    font-family: PingFangSC;
    font-size: 0.32rem;
    line-height: 0.38rem;
    color: #40405e;
  }
  .tit_mini {
    font-family: Roboto;
    font-size: 0.24rem;
    line-height: 0.28rem;
    padding-top: 0.04rem;
    color: #a0a0b3;
  }
  .text {
    font-family: PingFangSC;
    font-size: 0.28rem;
    line-height: 0.32rem;
  }
  .item_t {
    padding: 0.32rem 0.4rem;
    background: #ffffff;
    .t_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .t_imgs {
        height: 0.56rem;
        display: flex;
        align-items: center;
        // align-self: center;
        img {
          width: 0.56rem;
          height: 0.56rem;
          margin-right: 0.24rem;
        }
      }
      .t_r {
        display: flex;
        flex-direction: column;
        .r_type {
          text-align: right;
        }
        .type1 {
          color: #f2a145;
        }
        .type2 {
          color: #00cf00;
        }
        .type3 {
          color: #a0a0b3;
        }
      }
    }
    .nameTime {
      display: flex;
      justify-content: flex-end;
      .r_name {
        text-align: right;
        padding-top: 0.16rem;
        color: #40405e;
      }
      .r_time {
        padding-top: 0.08rem;
        color: #a0a0b3;
      }
    }
  }

  .item_b {
    display: flex;
    justify-content: space-between;
    padding: 0.32rem;
    background: #f7f7fa;
    .totalMoney {
      text-align: right;
    }
  }
}
</style>
