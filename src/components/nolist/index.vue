<template>
  <div class="nolist">
    <div class="nolist_item">
      <img src="@/assets/transactions/img_data_none.png" alt />
      <p>暂无记录</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  created() {},

  methods: {}
};
</script>

<style lang="less" scoped>
.nolist {
  width: 100%;
  display: flex;
  justify-content: center;
  .nolist_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 64px;
      height: 64px;
    }
    p {
      padding-top:12px ;
      font-family: PingFangSC;
      font-size: 13px;
      line-height: 15px;
      color: #a0a0b3;
    }
  }
}
@media (max-width: 767px){
.nolist {
  .nolist_item {
    img {
      width: 1.28rem;
      height: 1.28rem;
    }
    p {
      padding-top:0.24rem ;
      font-size: 0.26rem;
      line-height: 0.3rem;
    }
  }
}
}
</style>
