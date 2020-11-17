<template>
  <div class="orderList">
    <div class="orderManage content" v-if="true">
      <div class="table_box">
        <div class="table">
          <div class="table_body">
            <div class="tale_tr">
              <div class="item_td flex_1">日期</div>
              <div class="item_td flex_2 order_type">
                <span class="pointer" @click="chooseType">类型</span>
                <img v-if="!chooseShow" class="type_img pointer" src="~@/assets/transactions/ic_order_tyupe.png"
                  @click="chooseType" />
                <img v-if="chooseShow" class="type_img pointer" src="~@/assets/transactions/ico_order_down.png"
                  @click="chooseType" />
                <div v-show="chooseShow" class="choose_type_box">
                  <div class="choose_item pointer" :class="{active: tableDate.tradeType == ''}" @click="choose(0)">全部
                  </div>
                  <div class="choose_item pointer" :class="{active: tableDate.tradeType == 1}" @click="choose(1)">购买
                  </div>
                  <div class="choose_item pointer" :class="{active: tableDate.tradeType == 2}" @click="choose(2)">出售
                  </div>
                  <div class="choose_bg" @click="chooseType"></div>
                </div>
              </div>
              <div class="item_td flex_2">单价(CNY)</div>
              <div class="item_td flex_2">总价(CNY)</div>
              <div class="item_td flex_2">成交量(USDT)</div>
              <div class="item_td">状态</div>
            </div>
            <div v-for="(item,index) in data" :key="index" class="tale_tr" @click="toDateils(item)">
              <div class="item_td flex_1">{{ (item.createTime - 0) | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
              <div class="item_td flex_2">{{ item.isSeller == 0 ?'购买':'出售' }}</div>
              <div class="item_td flex_2">{{ item.tradePrice }}</div>
              <div class="item_td flex_2">{{ item.totalMoney }}</div>
              <div class="item_td flex_2">{{ item.tradeAmount }}</div>
              <!-- <div class="item_td">{{orderState[item.orderState-1]}}</div> -->
              <div v-if="item.isSeller == 0" class="item_td">
                {{ item.orderState == 1?'待付款':item.orderState == 2 ? '待转币' : item.orderState == 6 ? '待转币' : item.orderState == 3 ? '已完成' : '已取消' }}
              </div>
              <div v-if="item.isSeller == 1" class="item_td">
                {{ item.orderState == 1?'待收款':item.orderState == 7 ? '待转币' : item.orderState == 2 ? '已完成' : item.orderState == 3 ? '已完成' : '已取消' }}
              </div>
            </div>
            <div v-if="data.length <=0">
              <homeNoOrder />
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.length >0" class="pages">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="10"
          :current-page="tableDate.current" @current-change="currentChange" />
      </div>
    </div>
  </div>
</template>

<script>
  import orderInfo from "@/api/orderInfo";
  import homeNoOrder from "./components/homeNoOrder"; // 没有订单展示
  export default {
    name: "OrderList",
    components: {
      homeNoOrder,
    },
    data() {
      return {
        tableDate: {
          orderType: '',
          size: 10,
          current: 1,
          tradeType: ""
        },
        total: 0,
        data: [],
        chooseShow: false,
        orderState: ["待支付", "待放行", "已完成", "已取消", "申诉中"],
        priceType: 1, //固定价格 1 动态价格 2
        guadanData: {
          priceTtypeBoxShow: false, //价格类型下拉展示
          priceStatusBoxShow: false, //状态下拉展示
          priceType: 0, // 全部 买入 买出
          shelfStatus:0, //状态类型  上架中 已下架 已完成
        }
      };
    },
    computed: {},

    created() {
      this.getTable();
    },
    mounted() {},
    // 离开页面销毁
    destroyed() {},
    methods: {
      currentChange(value) {
        this.tableDate.current = value;
        this.getTable();
      },
      chooseType() {
        this.chooseShow = !this.chooseShow;
      },
      choose(val) {
        if (val == 0) {
          this.tableDate.tradeType = "";
        } else {
          this.tableDate.tradeType = val;
        }
        this.tableDate.current = 1;
        this.getTable();
        this.chooseType();
      },
      // 分页查询
      getTable() {
        orderInfo.orderList(this.tableDate).then(res => {
          this.total = res.data.data.total - 0;
          this.data = res.data.data.records
        });
      },
      // 查看详情
      toDateils(item) {
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
      },
    }
  };
</script>

<style lang="less" scoped>
  .orderList {
    .pointer {
      cursor: pointer;
    }

    .flex_1b {
      flex: 1.3;
    }

    .flex_2b {
      flex: 2.5;
    }

    .content {
      padding-top: 40px;
      margin: 0 auto;
      width: 790px;

      .table_box {
        padding-bottom: 67px;
        background: #ffffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;

        .table {
          .table_body {
            background: #ffffff;
            font-size: 14px;
            line-height: 70px;
            color: rgba(0, 0, 0, 0.87);

            .tale_tr {
              padding: 0 20px;
              display: flex;
              border-bottom: 1px solid #f0f2f5;

              &:first-child {
                background: rgba(240, 242, 245, 0.5);
                font-size: 12px;
                line-height: 48px;
                color: #657786;
                border-bottom: 0px solid transparent;
              }

              .item_td {
                &.flex_1 {
                  flex: 1.2;
                }

                &.flex_2 {
                  flex: 1;
                }

                &:last-child {
                  width: 45px;
                  text-align: right;
                }
              }
            }

            .order_type {
              position: relative;
              display: flex;
              align-items: center;

              .type_img {
                width: 10px;
                height: auto;
                margin-left: 6px;
              }

              .choose_type_box {
                position: absolute;
                top: 48px;
                left: -40px;
                background: #ffffff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                border-radius: 4px;

                .choose_item {
                  position: relative;
                  width: 114px;
                  text-align: center;
                  font-size: 12px;
                  line-height: 34px;
                  color: #000000;
                  border-bottom: 1px solid #c8c8c8;


                  &:first-child {
                    border-top: 1px solid transparent;
                  }

                  z-index: 10;
                }

                .choose_bg {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  background: rgba(0, 0, 0, 0);
                }

                .active {
                  color: @cl-m;
                }
              }
            }
          }
        }
      }

      .pages {
        padding-top: 35px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>