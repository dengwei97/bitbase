<template>
  <div class="container">
    <h3>{{type == 1 ?'+' : '-'}}{{ data.amount}} <span>{{data.currency}}</span></h3>
    <ul >
      <li>
        <p>
          地址
        </p>
        <p>
          {{type == 1?data.fromAddress:data.address}}
        </p>
      </li>
      <li v-if="type == 1">
        <p>交易ID</p>
        <p>{{data.txHash}}</p>
      </li>
      <li>
        <p>类型</p>
        <p>{{type == 1 ? '充币' : '提币'}} {{data.currency}}</p>
      </li>
      <li v-if="type == 1">
        <p>状态</p>
        <p>{{data.status == 1 ? '进行中' : '成功'}}</p>
      </li>
      <li v-if="type == 2">
        <p>状态</p>
        <p>{{data.orderState == 0 ? '进行中' : data.orderState == 1 ? '完成' : data.orderState == 2 ? '失败' : '审核中'}}</p>
      </li>
      <li v-if="type == 2">
        <p>手续费</p>
        <p>{{data.gasNum}} {{data.currency}}</p>
      </li>
      <li>
        <p>日期</p>
        <p>{{data.createTime-0 | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import buyApi from '@/api/buy'
export default {
  name: "",
  data() {
    return {
      data:{},
      type:1,
      id:'',

    };
  },
  props: {},
  components: {},
  created(){
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    if(this.type == 1){

      buyApi.walletRecordDetails({id:this.id}).then(res => {
            this.data = res.data.data
          })
    }else{
      buyApi.walletWithdrawDetails({id:this.id}).then(res => {
          this.data = res.data.data
        })
    }
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 0.32rem;
  .des {
    color: #a0a0b3;
  }

  h3 {
    height: 1.36rem;
    font-weight: 500;
    font-size: 0.48rem;
    line-height: 1.6rem;
    color: #03ad90;
    span{
      color: #000000;
    }
  }
  ul > li {
    padding: 0.32rem 0;
    font-size: 0.28rem;
    display: flex;
    justify-content: space-between;
    p:first-child {
      min-width: 1.86rem;
      color: #a0a0b3;
    }
    p:nth-child(2){
      text-align: right;
      word-wrap: break-word;
    }
  }
}
</style>
