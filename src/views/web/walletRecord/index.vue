<template>
  <div class="data">
    <div class="content">
      <div class="data_header text_header">
        <div>日期</div>
        <div class="type">
          <span style="cursor: pointer" @click="switching">
            {{ recordType == 1 && table.type == 3 ? "买入" : recordType == 1 && table.type == 4 ? '卖出' : recordType == 2 && type == 1 ? "充币" : '提币' }}
          </span>
          <img
            class="sanjiao"
            src="@/assets/transactions/ic_order_tyupe.png"
            alt=""
          />
          <ul class="type_list" v-if="chooseShow">
            <!-- <li>全部</li> -->
            <li @click="choose(1)">{{recordType == 1 ? '买入' : '充币'}}</li>
            <li @click="choose(2)">{{recordType == 1 ? '卖出' : '提币'}}</li>
          </ul>
        </div>
        <div>币种</div>
        <div>数量</div>
        <div>状态</div>
      </div>
      <div class="data_content">
        <nolist v-if="total == 0" class="nolist"></nolist>
        <div
          class="content_item text"
          v-for="(item, index) of data"
          :key="index"
        >
          <div>
            {{ (item.createTime - 0) | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}
          </div>
          <div >
            {{ recordType == 2 && type == 1 ? "充币" : recordType == 2 && type == 2 ? "提币" : recordType == 1 && table.type == 3 ? '买入' : recordType == 1 && table.type == 4 ? '卖出' : '' }}
          </div>
         
          <div>
            {{ recordType == 2 ? item.currency : item.coinName}}
          </div>
          <div>
            {{ recordType == 2 ? item.amount : item.coinNum }}
          </div>
					<div v-if="recordType == 1">
						成功
					</div>
          <div v-if="recordType == 2 && type == 1">
            {{ item.status == 1 ? "进行中" : "成功" }}
          </div>
          <div v-if="recordType == 2 && type == 2">
            {{
              item.orderState == 0
                ? "进行中"
                : item.orderState == 1
                ? "完成"
                : item.orderState == 2
                ? "失败"
                : "审核中"
            }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.length > 0 && recordType == 2" class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="tableDate.size"
        :current-page="tableDate.current"
        @current-change="currentChange"
      />
    </div>
    <div v-if="data.length > 0 && recordType == 1" class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="table.size"
        :current-page="table.current"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import nolist from "@/components/nolist";
import buyApi from "@/api/buy";
import userInfoApi from "@/api/userInfo";
export default {
  data() {
    return {
			recordType:1, //1 财务记录 2 充提记录
      type: 1,
      tableDate: {
        current: 1,
        size: 10,
        coinName: "USDT"
			},//充提记录
			table:{
        coinName:'USDT',
        current:1,
				size:10,
				type:3 , // 3买入 4 卖出
      },//财务记录
      total: 0,
      data: [],
      chooseShow: false
    };
  },
  components: {
    nolist
  },
  created() {
		this.recordType = this.$route.params.type
		if( this.recordType == 1){

			this.getWalletFlows()
		}else{

			this.walletRecord();
		}
  },
  methods: {
    choose(value) {
			if(this.recordType == 2){

				this.type = value;
				this.tableDate.current = 1;
				this.walletRecord();
				this.switching();
			}else{

				if(value == 1){
					this.table.type = 3
				}else{
					this.table.type = 4
				}
				this.table.current = 1
				this.getWalletFlows()
				this.switching();
			}
    },
    switching() {
      this.chooseShow = !this.chooseShow;
    },
    currentChange(value) {
			if(this.recordType == 2){

				this.tableDate.current = value;
				this.walletRecord();
			}else{
				this.table.current = value
				this.getWalletFlows()
			}
		},
		//获取财务列表
		getWalletFlows(){
			userInfoApi.getWalletFlows(this.table).then(res => {
				console.log('------',res)
				this.total = JSON.parse(JSON.stringify(res.data.data.total - 0));
          this.data = JSON.parse(JSON.stringify(res.data.data.records));
			})
		},
		//获取充提列表
    walletRecord() {
      if (this.type == 1) {
        buyApi.walletRecord(this.tableDate).then(res => {
          console.log(res);
          this.total = JSON.parse(JSON.stringify(res.data.data.total - 0));
          this.data = JSON.parse(JSON.stringify(res.data.data.records));
        });
      } else {
        buyApi.walletWithdraw(this.tableDate).then(res => {
          console.log("111", res.data.data);
          this.total = JSON.parse(JSON.stringify(res.data.data.total - 0));
          this.data = JSON.parse(JSON.stringify(res.data.data.records));
          // console.log(this.total)
        });
      }
    }
  }
};
</script>

<style lang='less' scoped>
.data {
  margin: 40px auto;
  width: 790px;
  .content {
    min-height: 540px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    .text {
      font-size: 14px;
      line-height: 20px;
    }
    .text_header {
      font-size: 12px;
      line-height: 18px;
    }
    .data_header {
      display: flex;
      background: rgba(240, 242, 245, 0.5);
      height: 48px;
      align-items: center;
      padding: 0 20px;
      .type {
        display: flex;
        align-items: center;
        position: relative;

        .type_list {
          position: absolute;
          top: 36px;
          left: -50px;
          background: #ffffff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          width: 114px;
          li {
            text-align: center;
            height: 34px;
            line-height: 34px;
            cursor: pointer;
          }
          li:nth-child(2) {
            border-top: 1px solid #c8c8c8;
            border-bottom: 1px solid #c8c8c8;
          }
        }
      }
      & > div {
        flex: 1;
      }
      & > div:first-child {
        flex: 1.3;
      }
      & > div:last-child {
        text-align: right;
      }
      .sanjiao {
        margin-left: 5px;
        width: 8px;
        height: 5px;
        cursor: pointer;
      }
    }
    .data_content {
      .content_item {
        display: flex;
        align-items: center;
        padding: 25px 20px;
        border-bottom: 1px solid #f0f2f5;
        & > div {
          flex: 1;
        }
        & > div:first-child {
          flex: 1.3;
        }
        & > div:last-child {
          text-align: right;
        }
      }
      .nolist {
        margin-top: 160px;
      }
    }
  }
  .pages {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>