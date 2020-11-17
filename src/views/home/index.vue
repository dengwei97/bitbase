<template>
  <div ref="home" class="home">
    <div class="box_1">
      <div class="box_1_content">
        <div class="left">
          <div class="title">
            {{ $t($appConfig.upperName + "-世界领先的数字货币交易平台") }}
          </div>
          <div class="desc">{{ $t("创始团队成员") }}</div>
          <div class="download_box">
            <div class="download_btn" @click="download">
              {{ $t("下载APP") }}
            </div>
          </div>
        </div>
        <div class="right">
          <img class="info_img" :src="$appConfig.source.ic_iphonex.src" />
        </div>
      </div>
    </div>
    <div v-show="coinList.length > 0" class="box_2">
      <div class="box_2_content">
        <div class="title">{{ $t("热门币种行情") }}</div>
        <div class="table">
          <div class="table_header">
            <div class="table_item">
              <div class="item_txt item_txt_1">{{ $t("币种") }}</div>
              <div class="item_txt item_txt_2">{{ $t("价格") }}</div>
              <div class="item_txt item_txt_3">{{ $t("涨跌幅") }}</div>
              <div class="item_txt item_txt_4">{{ $t("24H交易量") }}</div>
            </div>
          </div>
          <div class="table_body">
            <div
              v-for="item in coinList"
              :key="item.currency"
              class="table_item"
            >
              <div class="item_txt item_txt_1">
                <div class="item_content">
                  <img class="coin_logo" :src="item.imgUrl" />
                  <div class="coin_name">{{ item.currency }}</div>
                </div>
              </div>
              <div class="item_txt item_txt_2">${{ item.price }}</div>
              <div class="item_txt item_txt_3">
                <span v-if="item.change > 0" class="positive"
                  >+{{ item.change }}%</span
                >
                <span v-if="item.change <= 0" class="negative"
                  >{{ item.change }}%</span
                >
              </div>
              <div class="item_txt item_txt_4">${{ item.tradeVolume }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box_3">
      <div class="title">
        {{ $t("安全") }} {{ $t("稳定") }} {{ $t("可信") }} {{ $t("开放") }}
        {{ $t("易用") }}
      </div>
      <div class="box_3_content">
        <div ref="boxList" class="box_3_list">
          <div class="box_3_item">
            <img class="item_img" src="../../assets/ic_box_3_item_1.png" />
            <div class="titel">{{ $t("基金全方位保障") }}</div>
            <div class="desc">
              {{
                $t(
                  "基于以太技术，多层防护，至今已为用户保管千亿级资产，从未发生过一起技术安全事故。"
                )
              }}
            </div>
          </div>
          <div class="box_3_item">
            <img class="item_img" src="../../assets/ic_box_3_item_2.png" />
            <div class="titel">{{ $t("一如既往 经久稳定") }}</div>
            <div class="desc">
              {{
                $t(
                  "采用GSLB、分布式服务器集群、分布式存储、多机互备的高速内存交易引擎、冷钱包、私钥离线化的热钱包等先进的技术保证交易稳定。"
                )
              }}
            </div>
          </div>
          <div class="box_3_item">
            <img class="item_img" src="../../assets/ic_box_3_item_3.png" />
            <div class="titel">{{ $t("您可信赖的平台") }}</div>
            <div class="desc">
              {{
                $t(
                  "不受任何国家，政府，组织，个人的控制，没有中央服务器，基于互联网点对点的支付手段，采用区块链技术作为支撑。"
                )
              }}
            </div>
          </div>
          <div class="box_3_item">
            <img class="item_img" src="../../assets/ic_box_3_item_4.png" />
            <div class="titel">{{ $t("应用场景开放") }}</div>
            <div class="desc">
              {{
                $t(
                  "理想现实的美妙结合，对接多方服务，丰富应用场景。 区块链世界，离你一步之遥。"
                )
              }}
            </div>
          </div>
          <div class="box_3_item">
            <img class="item_img" src="../../assets/ic_box_3_item_5.png" />
            <div class="titel">{{ $t("简单易用") }}</div>
            <div class="desc">
              {{ $t("逻辑简单易懂，极致丝滑体验，处处尽显慧心巧思。") }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="slideData.show"
        class="slide_box img-box flex flex_center flex_middle"
      >
        <img
          v-show="slideData.isLeft"
          class="silde_left"
          src="../../assets/ic_home_silde_rigt.png"
        />
        <img
          v-show="slideData.isLeft"
          class="silde_right"
          src="../../assets/ic_home_silde_left.png"
          @click="slide('right')"
        />
        <img
          v-show="!slideData.isLeft"
          class="silde_left"
          src="../../assets/ic_home_silde_click.png"
          @click="slide('left')"
        />
        <img
          v-show="!slideData.isLeft"
          class="silde_right"
          src="../../assets/ic_home_silde_left_click.png"
        />
      </div>
    </div>
    <div id="Product" class="box_4">
      <div class="box_4_content">
        <div class="left">
          <div class="title">{{ $t("一站式数字货币平台") }}</div>
          <div class="left_content">
            <div class="tab_box">
              <div class="tab_item" @click="changeIdx(1)">
                {{ $t("钱包") }}
                <div v-show="box3Index == 1" class="line"></div>
              </div>
              <div class="tab_item" @click="changeIdx(2)">
                {{ $t("法币") }}
                <div v-show="box3Index == 2" class="line"></div>
              </div>
              <div class="tab_item" @click="changeIdx(3)">
                {{ $t("币币") }}
                <div v-show="box3Index == 3" class="line"></div>
              </div>
              <div class="tab_item" @click="changeIdx(4)">
                {{ $t("合约") }}
                <div v-show="box3Index == 4" class="line"></div>
              </div>
            </div>
            <div v-show="box3Index == 1" class="tab_desc">
              {{
                $t(
                  "安全存储您的电子美元，稳定币如USDT、USDC和BTC、ETH等数字资产，快速转账收款，带来轻松便捷的交易体验。银行级安全防护技术，全方位保障您的隐私和钱包安全。"
                )
              }}
            </div>
            <div v-show="box3Index == 2" class="tab_desc">
              {{
                $t(
                  "我们为需要购买数字资产的机构和个人提供OTC服务，也为有大宗订单需求的客户提供更私有、个性化的服务。无论您交易的是美元、人民币还是比特币，bitbase将为您提供谨慎、安全和极具竞争力的执行和结算服务。"
                )
              }}
            </div>
            <div v-show="box3Index == 3" class="tab_desc">
              {{
                $t(
                  "我们为用户提供多币对之间的交易，你可以直接用一种区块链资产换取另一种区块链资产，中间不涉及法定货币的中转或者结算。现在全球比特币的交易量，将近一半来自币币交易，法定货币与比特币交易的比例逐渐缩小。"
                )
              }}
            </div>
            <div v-show="box3Index == 4" class="tab_desc">
              {{
                $t(
                  "买卖用户双方约定未来某个时间，按指定价格将某种资产的协议进行交易。在数字资产的合约交易中，投资者可以通过判断价格的波动方向，选择“做多”或者“做空”进行买入或者卖出合约，赚取差价，获得盈利。"
                )
              }}
            </div>
          </div>
        </div>
        <div class="right img-box">
          <img class="right_img" :src="$appConfig.source.ic_sdfasf.src" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoApi from "@/api/userInfo";
import { getDownUrl } from "@/utils/index";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      box3Index: 1,
      slideData: {
        show: false,
        isLeft: true
      },
      coinList: [],
      setTimeData: undefined
    };
  },
  computed: {},
  created() {
    this.$store.state.user.nofooter = true;
    this.$nextTick(() => {
      this.getlocal();
    });
    this.getPrice();
  },
  mounted() {
    this.$refs.home.style.setProperty(
      "--ic_iphonex_width",
      this.$appConfig.source.ic_iphonex.width
    );
    this.$refs.home.style.setProperty(
      "--ic_iphonex_width2",
      this.$appConfig.source.ic_iphonex.width2
    );
    this.$refs.home.style.setProperty(
      "--ic_sdfasf_width",
      this.$appConfig.source.ic_sdfasf.width
    );
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
    this.$nextTick(() => {
      const boxListLnegth = this.$refs.boxList.offsetWidth;
      let itemListLength = 0;
      const itemList = document.getElementsByClassName("box_3_item");
      for (let i = 0; i < itemList.length; i++) {
        itemListLength += itemList[i].offsetWidth;
      }
      if (itemListLength <= boxListLnegth) {
        this.slideData.show = false;
      } else {
        this.slideData.show = true;
      }
    });
  },
  // 离开页面销毁存储锚点
  destroyed() {
    sessionStorage.setItem("selectid", "");
    clearTimeout(this.setTimeData);
  },
  methods: {
    getPrice() {
      const that = this;
      userInfoApi
        .getPrice()
        .then(res => {
          const list = res.data.data;
          that.coinList = [];
          list.forEach(item => {
            item.tradeVolume = that.numberConvert(item.tradeVolume - 0);
            item.price = that.priceConvert(item.price - 0);
            item.change = ((item.change - 0) * 100).toFixed(4) - 0;
            that.coinList.push(item);
          });
          this.setTime();
        })
        .catch(err => {
          // this.setTime()
          console.log(err);
        });
    },
    setTime() {
      clearTimeout(this.setTimeData);
      this.setTimeData = setTimeout(() => {
        this.getPrice();
      }, 2000);
    },
    changeIdx(idx) {
      this.box3Index = idx;
    },
    slide(type) {
      if (type == "right") {
        this.slideData.isLeft = false;
        this.$refs.boxList.scrollLeft = 10000;
      } else {
        this.slideData.isLeft = true;
        this.$refs.boxList.scrollLeft = 0;
      }
      // console.log(this.isLeft)
    },
    download() {
      getDownUrl();
    },
    /**
     * 价格处理,依据情况保留小数,不能有负值
     * @param {number} num 输入数字
     * @param {number} len 保留数字长度的位数
     */
    priceConvert(num, len = 4) {
      let value = num - 0;
      if (isNaN(value)) {
        return num;
      }
      let isPositive;
      if (value >= 0) {
        isPositive = true;
      } else {
        value = 0 - value;
        isPositive = false;
      }
      let returnData;
      if (value >= 1) {
        returnData = value.toFixed(len) - 0;
      } else if (value < 1 && value > 0.000001) {
        // 最多保留两位有效数字
        const valueString = value.toString().split("");
        let index = 0;
        let state = false;
        const isSub = false;
        let j = 0;
        for (var i = 0; i < valueString.length; i++) {
          if (valueString[i] === ".") {
            state = true;
          }
          if (state && valueString[i] !== ".") {
            j++;
          }
          if (state && valueString[i] !== "." && valueString[i] !== "0") {
            index++;
          }
          if (index >= len || (j >= len && index >= 1)) {
            break;
          }
        }
        returnData = value.toFixed(j) - 0;
      } else {
        returnData = value.toFixed(8) - 0;
      }
      if (isPositive) {
        return returnData;
      } else {
        return 0 - returnData;
      }
    },
    /**
     * 数据单位转换，会转化为亿、万的单位,分隔数字
     * @param {number} num 输入数字
     */
    numberConvert(num) {
      const that = this;
      const value = num - 0;
      if (isNaN(value)) {
        return num;
      }
      const lang = localStorage.getItem("lang") || "zh";
      if (lang == "zh") {
        if (value > 100000000) {
          const res = ((value / 100000000).toFixed(2) - 0)
            .toString()
            .split(".");
          return (
            that.numberSection(res[0]) + (res[1] ? "." + res[1] : "") + "亿"
          );
        } else if (value > 10000) {
          const res = ((value / 10000).toFixed(2) - 0).toString().split(".");
          return (
            that.numberSection(res[0]) + (res[1] ? "." + res[1] : "") + "万"
          );
        } else {
          const res = (value.toFixed(2) - 0).toString().split(".");
          return that.numberSection(res[0]) + (res[1] ? "." + res[1] : "");
        }
      } else if (lang == "en") {
        if (value > 1000000000) {
          const res = ((value / 1000000000).toFixed(2) - 0)
            .toString()
            .split(".");
          return (
            this.numberSection(res[0]) + (res[1] ? "." + res[1] : "") + "B"
          );
        } else if (value > 1000000) {
          const res = ((value / 1000000).toFixed(2) - 0).toString().split(".");
          return (
            this.numberSection(res[0]) + (res[1] ? "." + res[1] : "") + "M"
          );
        } else {
          const res = (value.toFixed(2) - 0).toString().split(".");
          return this.numberSection(res[0]) + (res[1] ? "." + res[1] : "");
        }
      }
    },
    /**
     * 数字分段显示
     * @param {string} num 输入数字
     */
    numberSection(num) {
      if (!num) {
        return num;
      }
      const numList = (num + "").split(".");
      num = (numList[0] + "").split("");
      const result = [];
      let total = 0;
      while (num.length > 0) {
        if ((result.length - total) % 3 == 0 && result.length > 0) {
          result.unshift(",");
          total++;
        }
        result.unshift(num.pop());
      }
      return result.join("") + (numList[1] ? "." + numList[1] : "");
    },
    // 从本地找锚点
    getlocal() {
      const selectid = sessionStorage.getItem("selectid");
      const elm = document.getElementById(selectid);
      if (selectid) {
        elm.scrollIntoView(true);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  --ic_iphonex_width: 421;
  --ic_iphonex_width2: 282;
  --ic_sdfasf_width: 298;
  .box_1 {
    background: @gd-m6;

    .box_1_content {
      margin: 0 auto;
      width: 1200px;
      height: 534px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        .title {
          width: 460px;
          font-size: 36px;
          line-height: 48px;
          color: #ffffff;
        }

        .desc {
          padding-top: 30px;
          width: 480px;
          font-size: 14px;
          line-height: 20px;
          color: #ffffff;
        }

        .download_box {
          padding-top: 30px;

          .download_btn {
            display: block;
            width: 175px;
            height: 44px;
            background: #ffffff;
            border-radius: 22px;
            text-align: center;
            line-height: 44px;
            font-size: 16px;
            color: #40405e;
            cursor: pointer;
          }
        }
      }
    }

    .right {
      .info_img {
        width: calc(var(--ic_iphonex_width) * 1px);
        height: auto;
      }
    }
  }

  .box_2 {
    .box_2_content {
      margin: 0 auto;
      width: 1200px;
      padding-bottom: 70px;

      .title {
        padding: 70px 0 40px;
        text-align: center;
        font-size: 30px;
        line-height: 40px;
        color: #40405e;
      }

      .table {
        .table_header {
          padding-left: 12px;
          background: rgba(1, 14, 26, 0.02);

          .table_item {
            height: 48px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: rgba(21, 46, 83, 0.602983);

            .item_txt_1 {
              flex: 1;
            }

            .item_txt_2 {
              flex: 1;
            }

            .item_txt_3 {
              flex: 1;
            }

            .item_txt_4 {
              width: 170px;
            }
          }
        }

        .table_body {
          .table_item {
            display: flex;
            align-items: center;
            height: 80px;
            border-bottom: 1px solid #eeeeee;
            font-size: 18px;
            color: #40405e;

            .item_txt_1 {
              flex: 1;

              .item_content {
                display: flex;
                align-items: center;

                .coin_logo {
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                }

                .coin_name {
                  padding-left: 12px;
                }
              }
            }

            .item_txt_2 {
              flex: 1;
            }

            .item_txt_3 {
              flex: 1;
            }

            .item_txt_4 {
              width: 170px;
            }
          }
        }
      }
    }
  }

  .box_3 {
    padding-bottom: 50px;
    background: #f0f9f5;

    .title {
      padding: 70px 0 40px;
      text-align: center;
      font-size: 30px;
      line-height: 40px;
      color: #40405e;
    }

    .box_3_content {
      padding-left: 8%;

      .box_3_list {
        width: 100%;
        overflow-x: scroll;
        white-space: nowrap;
        display: flex;
        align-items: flex-start;

        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        .box_3_item {
          display: inline-block;
          text-align: center;
          width: 277px;
          white-space: normal;
          padding-left: 30px;
          flex: 1 0 auto;

          &:first-child {
            padding-left: 0;
          }

          .item_img {
            width: 64px;
            height: 64px;
          }

          .titel {
            padding-top: 30px;
            font-size: 19px;
            line-height: 24px;
            color: #40405e;
          }

          .desc {
            padding-top: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #4f5669;
          }
        }
      }
    }

    .slide_box {
      padding-top: 50px;

      .silde_left {
        width: 48px;
        height: 48px;
        margin-right: 40px;
      }

      .silde_right {
        width: 48px;
        height: 48px;
      }
    }
  }

  .box_4 {
    padding: 70px 0;

    .box_4_content {
      margin: 0 auto;
      width: 1000px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        .title {
          font-size: 29px;
          line-height: 40px;
          color: #40405e;
        }

        .tab_box {
          padding-top: 40px;
          display: flex;
          align-items: center;

          .tab_item {
            position: relative;
            padding-bottom: 13px;
            width: 80px;
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            color: #40405e;
            border-bottom: 1px solid #c8c8c8;

            .line {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              border-bottom: 2px solid #40405e;
            }
          }
        }

        .tab_desc {
          padding-top: 18px;
          width: 584px;
          min-height: 80px;
          font-size: 14px;
          line-height: 20px;
          color: #4f5669;
        }
      }

      .right {
        .right_img {
          width: calc(var(--ic_sdfasf_width) * 1px);
          height: auto;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .home {
    .box_1 {
      .box_1_content {
        width: 1200px * 0.8;
        height: 534px * 0.8;
        display: flex;

        .left {
          .title {
            width: 460px * 0.8;
            font-size: 36px * 0.8;
            line-height: 48px * 0.8;
          }

          .desc {
            padding-top: 30px * 0.8;
            width: 480px * 0.8;
            font-size: 14px * 0.8;
            line-height: 20px * 0.8;
          }

          .download_box {
            padding-top: 30px * 0.8;

            .download_btn {
              width: 175px * 0.8;
              height: 44px * 0.8;
              border-radius: 22px * 0.8;
              line-height: 44px * 0.8;
              font-size: 16px * 0.8;
            }
          }
        }
      }

      .right {
        .info_img {
          width: calc(var(--ic_iphonex_width) * 0.8 * 1px);
          height: auto;
        }
      }
    }

    .box_2 {
      .box_2_content {
        width: 1200px * 0.8;
        padding-bottom: 70px * 0.8;

        .title {
          padding: 70px * 0.8 0px 40px * 0.8;
          font-size: 30px * 0.8;
          line-height: 40px * 0.8;
        }

        .table {
          .table_header {
            padding-left: 12px * 0.8;

            .table_item {
              height: 48px * 0.8;
              font-size: 14px * 0.8;

              .item_txt_4 {
                width: 170px * 0.8;
              }
            }
          }

          .table_body {
            .table_item {
              height: 80px * 0.8;
              font-size: 18px * 0.8;

              .item_txt_1 {
                .item_content {
                  .coin_logo {
                    width: 36px * 0.8;
                    height: 36px * 0.8;
                    border-radius: 50%;
                  }

                  .coin_name {
                    padding-left: 12px * 0.8;
                  }
                }
              }

              .item_txt_4 {
                width: 170px * 0.8;
              }
            }
          }
        }
      }
    }

    .box_3 {
      padding-bottom: 50px * 0.8;

      .title {
        padding: 70px * 0.8 0px 40px * 0.8;
        font-size: 30px * 0.8;
        line-height: 40px * 0.8;
      }

      .box_3_content {
        padding-left: 8% * 0.8;

        .box_3_list {
          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }

          .box_3_item {
            width: 277px * 0.8;
            padding-left: 30px * 0.8;

            .item_img {
              width: 64px * 0.8;
              height: 64px * 0.8;
            }

            .titel {
              padding-top: 30px * 0.8;
              font-size: 19px * 0.8;
              line-height: 24px * 0.8;
            }

            .desc {
              padding-top: 20px * 0.8;
              font-size: 14px * 0.8;
              line-height: 20px * 0.8;
            }
          }
        }
      }

      .slide_box {
        padding-top: 50px * 0.8;

        .silde_left {
          width: 48px * 0.8;
          height: 48px * 0.8;
          margin-right: 40px * 0.8;
        }

        .silde_right {
          width: 48px * 0.8;
          height: 48px * 0.8;
        }
      }
    }

    .box_4 {
      padding: 70px * 0.8 0px;

      .box_4_content {
        width: 1000px * 0.8;

        .left {
          .title {
            font-size: 29px * 0.8;
            line-height: 40px * 0.8;
          }

          .tab_box {
            padding-top: 40px * 0.8;

            .tab_item {
              padding-bottom: 13px * 0.8;
              width: 80px * 0.8;
              font-size: 15px * 0.8;
              line-height: 20px * 0.8;
            }
          }

          .tab_desc {
            padding-top: 18px * 0.8;
            width: 584px * 0.8;
            min-height: 80px * 0.8;
            font-size: 14px * 0.8;
            line-height: 20px * 0.8;
          }
        }

        .right {
          .right_img {
            width: calc(var(--ic_sdfasf_width) * 0.8 * 1px);
            height: auto;
          }
        }
      }
    }
  }
}

@media (max-width: 980px) {
  .home {
    .box_1 {
      .box_1_content {
        width: 1200px * 0.6;
      }
    }

    .box_2 {
      .box_2_content {
        width: 1200px * 0.6;
      }
    }
  }
}

@media (max-width: 767px) {
  .home {
    .box_1 {
      background: @gd-m6;

      .box_1_content {
        margin: 0 auto;
        width: 100%;
        height: auto;
        display: block;

        .left {
          padding: 0.8rem 0.3rem 0;

          .title {
            width: 100%;
            font-size: 0.6rem;
            line-height: 0.76rem;
            color: #ffffff;
          }

          .desc {
            padding-top: 0.32rem;
            width: 100%;
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: #ffffff;
          }

          .download_box {
            display: none;
          }
        }
      }

      .right {
        padding: 0.86rem 0 0.64rem;
        text-align: center;

        .info_img {
          width: calc(var(--ic_iphonex_width2) * 2 / 100 * 1rem);
          height: auto;
        }
      }
    }

    .box_2 {
      .box_2_content {
        margin: 0 auto;
        width: 100%;
        padding-bottom: 1rem;

        .title {
          padding: 0.1rem 0 0.4rem;
          text-align: center;
          font-size: 0.48rem;
          line-height: 0.8rem;
          color: #40405e;
        }

        .table {
          .table_header {
            padding: 0 0.3rem;
            background: rgba(1, 14, 26, 0.02);

            .table_item {
              height: 0.96rem;
              display: flex;
              align-items: center;
              font-size: 0.28rem;
              color: rgba(21, 46, 83, 0.602983);

              .item_txt_1 {
                flex: 0 0 auto;
                width: 3.1rem;
              }

              .item_txt_2 {
                flex: 1;
              }

              .item_txt_3 {
                flex: 0 0 auto;
              }

              .item_txt_4 {
                display: none;
              }
            }
          }

          .table_body {
            .table_item {
              padding: 0 0.3rem;
              height: 1.28rem;
              display: flex;
              align-items: center;
              border-bottom: 0.02rem solid #eeeeee;
              font-size: 0.28rem;
              color: #40405e;

              .item_txt_1 {
                flex: 0 0 auto;
                width: 3.1rem;

                .item_content {
                  display: flex;
                  align-items: center;

                  .coin_logo {
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 50%;
                  }

                  .coin_name {
                    padding-left: 0.2rem;
                  }
                }
              }

              .item_txt_2 {
                flex: 1;
              }

              .item_txt_3 {
                flex: 0 0 auto;
              }

              .item_txt_4 {
                display: none;
              }
            }
          }
        }
      }
    }

    .box_3 {
      padding-bottom: 1.4rem;
      background: #f0f9f5;

      .title {
        padding: 1rem 0 0;
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.8rem;
        color: #40405e;
      }

      .box_3_content {
        padding-left: 0;

        .box_3_list {
          width: 100%;
          overflow-x: hidden;
          white-space: normal;
          display: block;

          .box_3_item {
            display: block;
            text-align: center;
            width: 100%;
            white-space: normal;
            padding: 0.6rem 1rem 0;
            font-size: 0;

            &:first-child {
              padding: 0.6rem 1rem 0;
            }

            .item_img {
              width: 1.28rem;
              height: 1.28rem;
            }

            .titel {
              padding-top: 0.6rem;
              font-size: 0.38rem;
              line-height: 0.48rem;
              color: #40405e;
            }

            .desc {
              padding-top: 0.32rem;
              font-size: 0.28rem;
              line-height: 0.4rem;
              color: #4f5669;
            }
          }
        }
      }

      .slide_box {
        display: none;
      }
    }

    .box_4 {
      padding: 1rem 0;

      .box_4_content {
        margin: 0 auto;
        width: 100%;
        display: block;

        .left {
          .title {
            text-align: center;
            font-size: 0.28rem;
            line-height: 0.8rem;
            color: #40405e;
          }

          .tab_box {
            padding-top: 0.8rem;
            display: flex;
            align-items: center;
            padding: 0 0.5rem;

            .tab_item {
              position: relative;
              padding-bottom: 0.28rem;
              width: auto;
              flex: 1;
              font-size: 0.3rem;
              line-height: 0.4rem;
              text-align: center;
              color: #40405e;
              border-bottom: 0.02rem solid #c8c8c8;

              .line {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                border-bottom: 0.04rem solid #40405e;
              }
            }
          }

          .tab_desc {
            width: 100%;
            padding: 0.34rem 0.3rem 0;
            min-height: 2rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #4f5669;
          }
        }

        .right {
          padding-top: 0.4rem;
          text-align: center;

          .right_img {
            width: 5.96rem;
            height: auto;
          }
        }
      }
    }
  }
}

.positive {
  color: #03ad90 !important; //正
}

.negative {
  color: #da6363 !important; //负
}
</style>
