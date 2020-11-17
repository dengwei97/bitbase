<template>
  <div class="mKycType">
    <h5>选择KYC证件类型</h5>
    <ul>
      <li v-for="(item,index) of types" :key="index" :class="{active: active == item.id}" @click="check(item.id)">
        <div class="type_item">
          <img :src="item.img" alt="" />
          <p>{{ item.name }}</p>
        </div>
        <img v-if="active == item.id" class="ico_check" src="@/assets/transactions/ico_check_select.png" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MKycType',
  data() {
    return {
      active: 0,
      types: [
        {id: 1, img: require('@/assets/transactions/ico_id_card.png'), name: '身份证'},
        {id: 2, img: require('@/assets/transactions/ico_driving_licence.png'), name: '驾照'},
        {id: 3, img: require('@/assets/transactions/ico_passport.png'), name: '护照'}
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    check(id) {
      this.active = id
      window.localStorage.setItem('kycType', id)
      setTimeout(() => {
				this.$router.push('/mPrimary')
			}, 500)
    }
  }
}
</script>

<style lang="less"  scope>
.mKycType{
  padding: 0 0.32rem;
  h5{
    font-size: 0.36rem;
    line-height: 0.42rem;
    text-align: center;
    color: #40405E;
    padding: 0.8rem 0;
  }
  ul li{
    padding: 0.4rem;
    margin-bottom: 0.32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F7F7FA;
    border-radius: 0.12rem;
    &.active{
      background: #FFFFFF;
      box-shadow: 0px 0.08rem 0.48rem rgba(64, 64, 94, 0.08);
    }
    .type_item{
      display: flex;
      align-items: center;
      img{
        width: 0.8rem;
        height: 0.8rem;
      }
      p{
        font-size: 0.3rem;
        line-height: 0.36rem;
        color: #40405E;
        padding-left: 0.32rem;
      }
    }
    .ico_check{
      width: 0.24rem;
    }
  }
}
</style>
