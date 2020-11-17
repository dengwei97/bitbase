<template>
  <ul class="mPrimary">
    <li>
      <div class="text">国家地区</div>
      <span class="text country">{{ from.country }}</span>
    </li>
    <li>
      <input v-model="from.certificateName" placeholder="姓名" class="text input" type="text" />
    </li>
    <li>
      <input v-model="from.certificateNumber" :placeholder="from.certificateType == 1 ? '身份证号' : from.certificateType == 2 ? '驾照号' : '护照号'" class="text input" type="text" />
    </li>
    <button :class="{active : disabled}" :disabled="!disabled" @click="submissions">提交</button>
  </ul>
</template>

<script>
import kycApi from '@/api/kyc'

export default {
	name: 'MPrimary',
	data() {
		return {
			from: {

				country: '',
				certificateName: '',
				certificateNumber: '',
				certificateType: ''
			}
		}
	},
	computed: {
		disabled: function() {
      let state = true;
      if (!this.from.certificateName) {
        state = false;
      }
      if (!this.from.certificateNumber) {
        state = false;
      }
      return state;
    }
	},
	created() {
		this.from.country = window.localStorage.getItem('country')
		this.from.certificateType = window.localStorage.getItem('kycType')
	},
	methods: {
		submissions() {
			console.log('提交')
			kycApi.kycSubmit(
				this.from
			).then(res => {
				// console.log(res.data)
				this.$toast.setDefaultOptions({ duration: 1000 });
				this.$toast.success('提交成功!')
				setTimeout(() => {
					// this.$toast.clear();
					this.$router.push('/mWaitCheck');
				}, 1200);
			}).catch(err => {
				console.log(err)
				this.$toast(err.data.message)
			})
		}
	}
}
</script>

<style lang="less"  scope>
.mPrimary{
	padding: 0.64rem 0.24rem;
	li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #F7F7FA;
		border-radius: 0.12rem;
		padding: 0.28rem 0.32rem;
		margin-bottom: 0.32rem;
		.text{
			font-size: 0.3rem;
			line-height: 0.36rem;
			color: #40405e;
		}
		.country{
			color: #0CB397;
		}
		.input{
			flex: 1;
			border: 0;
			outline: 0;
			background: transparent;
			color: rgba(64, 64, 94, 0.8);
		}
		input::-webkit-input-placeholder {
			/* WebKit browsers */
			color: #C9C9D1;
		}
		input:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #C9C9D1;
		}
		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #C9C9D1;
		}
		input:-ms-input-placeholder {
			/* Internet Explorer 10+ */
			color: #C9C9D1;
		}
	}
	button{
		width: 100%;
		height: 0.96rem;
		text-align: center;
		line-height: 0.96rem;
		margin-top: 0.24rem;
		font-size: 0.32rem;
		color: #FFFFFF;
		background: linear-gradient(0deg, #DDDDE6, #DDDDE6);
		border-radius: 0.48rem;
		&.active{
			background: #0CB397;
		}
	}
}
</style>
