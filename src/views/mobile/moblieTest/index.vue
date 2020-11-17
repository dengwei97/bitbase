<template>
  <div>
    <div @click="ss">

      213
    </div>
    <div class="ss">

      <cancelOrder ref="moblieTest" />
      <kycCertification ref="kycCertification" />
    </div>
  </div>
</template>

<script>

import kycCertification from '@/views/moblie/home/components/kycCertification.vue'
import cancelOrder from '@/components/confirmPay/index'
import { customerService} from '@/utils/index'
  export default {
    name: "MoblieTest",
    components: {
      cancelOrder,
      kycCertification
    },
    data() {
      return {
        text: '513254242shjabgjkab45123',
        item: {
          type: 1,
          coinName: 'usdt',
          orderState: 1,
          businessRealName: 'shajbj',
          createTime: 15663261532652,
          tradeAmount: 56455432.23,
          totalMoney: 5615523132.25,
          coinImgUrl: require('../../../assets/ico_usdt.png')
        }
      };
    },
    mounted() {
      // this.$refs.moblieTest.show()
      this.$refs.kycCertification.show()
    },
    methods: {
      ss() {
        customerService()
      }
    }
  };
</script>

<style lang="less" scoped>
.ss{
  width: 100vw;
  height:100vh;
}
</style>
