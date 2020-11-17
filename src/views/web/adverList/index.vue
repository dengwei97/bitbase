<template>
  <div class="orderList">
    <OrderManageHeader Onactive="2"/>
    <div class="gorderManage">
      <div class="content_l">
        <div class="header_title">
          <span :class="{active:priceType == 1}" @click="togglePiceType(1)">固定价格</span>
          <span :class="{active:priceType == 2}" @click="togglePiceType(2)">动态价格</span>
        </div>
        <div class="table">
          <div class="table-head">
            <span class="item_td flex_2">日期</span>
            <span class="item_td flex_1" @click="guadanData.priceTtypeBoxShow = !guadanData.priceTtypeBoxShow">
              类型
              <img v-if="guadanData.priceTtypeBoxShow" class="type_img pointer"
                src="~@/assets/transactions/ic_order_tyupe.png" />
              <img v-else class="type_img pointer" src="~@/assets/transactions/ico_order_down.png" />

              <div class="choose_type_box" v-show="guadanData.priceTtypeBoxShow">
                <div class="choose_item pointer" :class="{active:guadanData.priceType == 0}"
                  @click="guadanChoosePriceType(0)">全部
                </div>
                <div class="choose_item pointer" :class="{active:guadanData.priceType == 1}"
                  @click="guadanChoosePriceType(1)">买入
                </div>
                <div class="choose_item pointer" :class="{active:guadanData.priceType == 2}"
                  @click="guadanChoosePriceType(2)">买出
                </div>
                <div class="choose_bg" @click="guadanChooseType(-1)"></div>
              </div>
            </span>
            <span class="item_td flex_1b">委托价(CNY)</span>
            <span class="item_td flex_2b">限额(USDT)</span>
            <span class="item_td flex_1" @click="guadanData.priceStatusBoxShow = !guadanData.priceStatusBoxShow">状态
              <img v-if="guadanData.priceStatusBoxShow" class="type_img pointer"
                src="~@/assets/transactions/ic_order_tyupe.png" />
              <img v-else class="type_img pointer" src="~@/assets/transactions/ico_order_down.png" />
              <div class="choose_type_box" v-show="guadanData.priceStatusBoxShow">
                <div class="choose_item pointer" :class="{active:guadanData.statusType == 0}"
                  @click="guadanChooseStatusType(0)">全部
                </div>
                <div class="choose_item pointer" :class="{active:guadanData.statusType == 1}"
                  @click="guadanChooseStatusType(1)">上架中
                </div>
                <div class="choose_item pointer" :class="{active:guadanData.statusType == 2}"
                  @click="guadanChooseStatusType(2)">已下架
                </div>
                <div class="choose_item pointer" :class="{active:guadanData.statusType == 3}"
                  @click="guadanChooseStatusType(3)">已完成
                </div>
                <div class="choose_bg" @click="guadanChooseType(-1)"></div>
              </div>
            </span>
            <span class="flex_1 item_td"></span>
          </div>
          <div class="table-body">
            <ul class="table-list">
              <li>
                <span class="flex_2">2020-12-21 12:12:11</span>
                <span class="flex_1">买入</span>
                <span class="flex_1b">1.22</span>
                <span class="flex_2b">100.123456–1000.123456</span>
                <span class="flex_1" :class="{active:true}">上架中</span>
                <span class="flex_1" :class="{downShelf:true}"><button>下架</button></span>
              </li>
              <li>
                <span class="flex_2">2020-12-21 12:12:11</span>
                <span class="flex_1">买入</span>
                <span class="flex_1b">1.22</span>
                <span class="flex_2b">100.123456–1000.123456</span>
                <span class="flex_1" :class="{active:true}">上架中</span>
                <span class="flex_1" :class="{downShelf:true}"><button>下架</button></span>
              </li>
              <li>
                <span class="flex_2">2020-12-21 12:12:11</span>
                <span class="flex_1">买入</span>
                <span class="flex_1b">1.22</span>
                <span class="flex_2b">100.123456–1000.123456</span>
                <span class="flex_1" :class="{active:true}">上架中</span>
                <span class="flex_1" :class="{downShelf:true}"><button>下架</button></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import orderInfo from "@/api/orderInfo";
  import homeNoOrder from "./components/homeNoOrder"; // 没有订单展示
  import OrderManageHeader from '@/components/orderManageHeader'
  export default {
    name: "OrderList",
    components: {
      homeNoOrder,
      OrderManageHeader
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
    },
    mounted() {},
    // 离开页面销毁
    destroyed() {},
    methods: {
      // 头部价格类型切换
      togglePiceType(type) {
        this.priceType = type
      },
      //挂单-价格类型下拉框选中
      guadanChoosePriceType(idx) {
        idx !== -1 ? this.guadanData.priceType = idx : ''
        this.priceTtypeBoxShow = false
      },
      //挂单--价格状态下拉框选中
      guadanChooseStatusType(idx) {
         idx !== -1 ? this.guadanData.statusType = idx : ''
        this.priceStatusBoxShow = false
      }



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

    .gorderManage {
      padding-top: 40px;
      margin: 0 auto;
      width: 790px;

      .content_l {
        border-radius: 4px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

        .header_title {
          height: 100px;
          display: flex;
          align-items: center;
          background: #fff;
          box-sizing: border-box;
          padding-left: 60px;
          font-size: 20px;
          color: #4F5669;
          font-weight: 700;

          span {
            margin-right: 40px;
            cursor: pointer;

            &.active {
              color: @cl-m;
            }
          }
        }

        .table {
          .table-head {
            background: rgba(240, 242, 245, 0.5);
            font-size: 12px;
            color: #657786;
            border-bottom: 0px solid transparent;
            display: flex;
            padding: 0 20px;
            font-size: 12px;
            height: 48px;
            align-items: center;

            span {
              text-align-last: left;
              position: relative;
              cursor: pointer;

              .type_img {
                width: 10px;
                height: auto;
                margin-left: 6px;
              }

              .choose_type_box {
                position: absolute;
                top: 38px;
                left: -40px;
                background: #ffffff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                z-index: 2;

                .choose_item {
                  position: relative;
                  width: 114px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 12px;
                  line-height: 34px;
                  color: #000000;
                  border-bottom: 1px solid #c8c8c8;

                  &.active {
                    color: @cl-m;
                  }

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
                  cursor: default;
                }



              }
            }
          }

          .table-body {
            padding-bottom: 40px;

            .table-list {
              font-size: 14px;

              li {
                height: 70px;
                display: flex;
                box-sizing: border-box;
                border-bottom: 1px solid #F0F2F5;
                padding-left: 20px;
                padding-right: 20px;

                span {
                  height: 100%;
                  display: flex;
                  align-items: center;
                  &.active {
                    color: #F2A145;
                  }
                  &.downShelf {
                   button {
                    font-size: 12px;
                    width: 64px;
                    height: 28px;
                    border: 1px solid #EDEDF2;
                    box-sizing: border-box;
                    border-radius: 14px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                   }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>