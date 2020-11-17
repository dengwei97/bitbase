<template>
  <div class="data">
    <div class="title_filter">
      <div class="title text">
        <div class="title_l">
          <img
            class="ic_filter"
            src="@/assets/transactions/ico_filter.png"
            alt
          />
          <div class="tit_text">筛选订单</div>
        </div>
        <div class="title_r" @click="screenClick">
          <div class="tit_text">{{this.screenList.text}}</div>
          <img
            :class="{down:screen}"
            class="ic_right"
            src="@/assets/transactions/ico_arrow_right.png"
            alt
          />
        </div>
      </div>
      <div class="mask" v-if="screen"></div>
      <div class="filter_cont text" v-if="screen">
        <div class="filter_head">
          <p>交易类型</p>
          <ul class="types">
            <li
              v-for="(item, index) of orderType.content"
              :key="index"
              :class="{ active: orderType.active == item.value }"
              @click="orderClick(item)"
            >
              {{ item.text }}
            </li>
          </ul>
          <p>价格类型</p>
          <ul class="types">
            <li
              v-for="(item, index) of priceType.content"
              :key="index"
              :class="{ active: priceType.active == item.value }"
              @click="priceClick(item)"
            >
              {{ item.text }}
            </li>
          </ul>
          <p v-if="userInfoDetails.advertiserDoBigSale == '1'">挂单类型</p>
          <ul class="types" v-if="userInfoDetails.advertiserDoBigSale == '1'">
            <li
              v-for="(item, index) of listType.content"
              :key="index"
              :class="{ active: listType.active == item.value }"
              @click="listClick(item)"
            >
              {{ item.text }}
            </li>
          </ul>
          <p>订单状态</p>
          <ul class="types">
            <li
              v-for="(item, index) of stateType.content"
              :key="index"
              :class="{ active: stateType.active == item.value }"
              @click="stateClick(item)"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div class="btns">
          <button @click="screen = false">取消</button>
          <button class="confirm" @click="confirm">确定</button>
        </div>
      </div>
    </div>
    <div class="content">
      <van-list v-model="table.loading" :finished='table.finished' @load='onLoad'>

        <adverCard class="adverCard" @clickSale='clickSale' v-for="(item,index) in table.data" :key="index" :data='item' ></adverCard>
      </van-list>
    </div>
    <tipsBox
      ref="tipsBox"
      :title="tips.title"
      :text1="tips.text1"
      :text2="tips.text2"
      :btn="tips.btn"
      :btn1='tips.btn1'
      :btnType='tips.btnType'
      :imgType='tips.imgType'
      @goSet="tipsSet"
    ></tipsBox>
  </div>
</template>

<script>
import adverCard from './components/adverCard'
import tipsBox from "@/components/tipsBox";
import userInfoApi from '@/api/userInfo'
export default {
  components:{
    adverCard,
    tipsBox
  },
  data() {
    return {
      screen:false,
      orderType: {
        content: [
          { text: "全部", value: "" },
          { text: "买入", value: 1 },
          { text: "卖出", value: 2 }
        ],
        active: ""
      },
      priceType: {
        content: [
          { text: "全部", value: "" },
          { text: "固定价格", value: 1 },
          { text: "动态价格", value: 2 }
        ],
        active: ""
      },
      listType: {
        content: [
          { text: "全部", value: "" },
          { text: "C2C挂单", value: 2 },
          { text: "大宗挂单", value: 1 }
        ],
        active: ""
      },
      stateType: {
        content: [
          { text: "全部", value: "" },
          { text: "上架中", value: 1 },
          { text: "已下架", value: 2 },
          { text: "已完成", value: 3 }
        ],
        active: ""
      },
      userInfoDetails:JSON.parse(localStorage.getItem('userInfoDetails')),
      screenList:{
        text:'全部',
        orderTypeActive:'',
        priceTypeActive:'',
        listTypeActive:'',
        stateTypeActive:''
      },//用来保存当前状态
      tips: {
        title: "",
        text1: "",
        text2: "",
        btn:'',
        btn1:'取消',
        btnType:false,
        imgType:1,
      }, //弹框内容
      tipsType:'', //弹框类型
      table:{
        total:0,//总数
        data:[],
        size:10,
        current:1,
        loading: true, // 上拉加载
        finished: false, // 上拉加载完毕
      }

    };
  },
  created() {
    this.$store.state.user.noheader = false;
    this.adverOrderList()
  },
  methods: {
    orderClick(val) {
      this.orderType.active = val.value;
    },
    priceClick(val) {
      this.priceType.active = val.value;
    },
    listClick(val) {
      this.listType.active = val.value;
    },
    stateClick(val) {
      this.stateType.active = val.value;
    },
    screenClick(){
      this.screen = true
      this.orderType.active = this.screenList.orderTypeActive
      this.priceType.active = this.screenList.priceTypeActive
      this.listType.active = this.screenList.listTypeActive
      this.stateType.active = this.screenList.stateTypeActive
    },
    
    confirm(){
       this.screenList.orderTypeActive = this.orderType.active 
       this.screenList.priceTypeActive = this.priceType.active 
      this.screenList.listTypeActive = this.listType.active 
       this.screenList.stateTypeActive = this.stateType.active
        // this.stateType.content 
       this.screen = false
    },
    clickSale(){
      // this.tips.title = '下架挂单'
      // this.tips.text1 = '是否下架该挂单?'
      // this.tips.text2 = '下架的挂单将不再列表中显示'
      // this.tips.btnType = true
      // this.tips.btn='取消'
      // this.tips.btn1='下架'
      this.tips.text1 = '您已存在正在进行交易的订单，请处理完成后方可下架该挂单?'
      this.tips.imgType = 2
      this.tips.btn ='去处理'
      this.$refs.tipsBox.show()

    },
    tipsSet(){},
    //获取挂单列表
    adverOrderList(){

      userInfoApi.adverOrderList({
        orderType:this.orderType.active,
        current:this.table.current,
        size:this.table.size,
        priceFlag:this.priceType.active,
        bigsale:this.listType.active,
        orderState:this.stateType.active,
        own:true,

      }).then(res => {
        console.log(res)
        const rows = res.data.data.records;
        this.table.loading = false
        this.table.total = res.data.data.total - 0;
        if(rows == null || rows.length == 0){
          this.table.finished = true
          return
        }
        this.table.data = this.table.data.concat(rows)

        if(this.table.data.length >= this.table.total){
          this.table.finished = true
        }
      })
    },
    onLoad(){
      this.table.current ++ ;
      this.adverOrderList()
    }
  }
};
</script>

<style lang='less' scoped>
.data {
  background: #f7f7fa;
  min-height: 100vh;

  .text {
    font-size: 0.28rem;
    line-height: 0.4rem;
  }
  .title_filter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #f7f7fa;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      padding: 0.26rem 0.28rem;
      .title_l {
        display: flex;
        align-items: center;
        .ic_filter {
          width: 0.48rem;
          height: 0.48rem;
          margin-right: 0.24rem;
        }
      }
      .tit_text {
        color: #a0a0b3;
      }
      .title_r {
        display: flex;
        align-items: center;
        .ic_right {
          margin-left: 0.1rem;
          width: 0.12rem;
          height: 0.2rem;
          transition: 0.28s linear;
        }
      }
      .down {
        transform: rotate(90deg);
        transition: 0.28s linear;
      }
    }
    .mask {
      position: absolute;
      top: 1rem;
      left: 0;
      width: 100%;
      height: calc(100vh - 1rem);
      z-index: 1;
      background: rgba(0, 0, 0, 0.4);
    }
    .filter_cont {
      position: absolute;
      top: 1rem;
      left: 0;
      z-index: 2;
      width: 100%;
      background: #f7f7fa;
     
      .filter_head {
        padding: 0.16rem 0.4rem;
        p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #a0a0b3;
          padding: 0.16rem 0 0.24rem;
        }
        .types {
          display: flex;
          flex-wrap: wrap;

          li {
            background: #ffffff;
            border-radius: 0.32rem;
            width: 2.06rem;
            text-align: center;
            height: 0.56rem;
            line-height: 0.56rem;
            margin: 0 0.24rem 0.32rem 0;
            &:nth-child(3) {
              margin-right: 0;
            }
          }
          .active {
            background: rgba(12, 179, 151, 0.1);
            border: 1px solid @cl-m;
            box-sizing: border-box;
            color: @cl-m;
          }
        }
      }
      .btns {
        background: #ffffff;
        border-radius: 0 0 0.12rem 0.12rem;
        display: flex;
        button {
          flex: 1;
          height: 1.04rem;
          line-height: 1.04rem;
          text-align: center;
          font-size: 0.32rem;
          color: #a0a0b3;
        }
        .confirm {
          color: @cl-m;
          border-left: 1px solid #f5f5fa;
        }
      }
    }
    
  }
  .content{
    padding: 1rem 0.24rem ;
    .adverCard{
      margin-top: 0.24rem;
    }
  }
}
</style>