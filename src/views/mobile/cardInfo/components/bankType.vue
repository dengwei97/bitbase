<template>
  <div class="bankType">
    <ul class="list">
      <li v-for="(item,index) of list" :key="index" class="list_item" @click="seletType(item,index)">
        <div class="text">{{ item }}</div>
        <img v-if="isactive == index" class="selectImg" src="@/assets/transactions/ico_check_select.png" alt />
      </li>
    </ul>
  </div>
</template>

<script>
import userInfo from "@/api/userInfo";
export default {
  name: "BankType",
  components: {},

  components: {},
  data() {
    return {
      list: [
        "中国银行",
        "工商银行",
        "建设银行",
        "农业银行",
        "交通银行",
        "中信银行",
        "光大银行",
        "华夏银行",
        "招商银行",
        "兴业银行",
        "广发银行",
        "农业发展银行",
        "进出口银行",
        "国家开发银行",
        "邮政储蓄银行"
      ],
      isactive: null
    };
  },
  computed: {},
  created() {
    this.$store.state.user.noheader = false
  },
  mounted() {},
  methods: {
    seletType(item, index) {
      console.log(item)
      this.isactive = index
      // this.$store.dispatch('user/setBankType', item)
      const bank = JSON.parse(localStorage.getItem('bank'))
      bank.paymentCode = item
      window.localStorage.setItem('bank', JSON.stringify(bank))
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    }
  }
};
</script>

<style lang="less" scoped>
.bankType {
  background: #ffffff;
  padding: 0.32rem;
  .list {
    .list_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.88rem;
      // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .text {
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #40405e;
      }
      .selectImg{
        width: 0.24rem;
        height: auto;
      }
    }
  }
}
</style>
