<template>
  <ul class="mCountry">
    <li v-for="(item,index) of countryList" :key="index" @click="check(item,index)">
      <span>{{ item }}</span>
      <img v-if="active == index" src="@/assets/transactions/ico_check_select.png" alt="" />
    </li>
  </ul>
</template>

<script>
import { phoneCode } from '@/utils/constants'
export default {
	name: 'MCountry',
	data() {
		return {
			active: null,
			countryList: []
		}
	},
	created() {
		this.$store.state.user.noheader = false
		this.countryList = phoneCode.countrys_cn
	},
	methods: {
		check(item, index) {
			this.active = index
			console.log(item)
			window.localStorage.setItem('country', item)
			setTimeout(() => {
				this.$router.push('/mKycType')
			}, 500)
		}
	}

}
</script>

<style lang="less"  scope>
.mCountry{
	padding: 0 0.32rem;
	li{
		height: 0.88rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		span{
			font-size: 14px;
			line-height: 16px;
			color: #40405E;
		}
		img{
			width: 0.24rem;
		}
	}
}
</style>
