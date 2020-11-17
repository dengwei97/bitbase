<template>
  <div class="intermediate">
    <div class="steps">
      <h4>{{ title }}</h4>
      <p>{{ subtitle }}</p>
      <div class="photos">
        <img :src="photoImg" alt="" />
      </div>
    </div>
    <button class="upload">
      <img src="@/assets/transactions/ico_camera.png" alt="" />
      <span>上传图片</span>
      <input type="file" accept="image/*" class="photofile" @change="change" />
    </button>
    <button class="continued" :class="{active : submit}" :disabled="!submit" @click="continued">{{ submissions }}</button>
  </div>
</template>

<script>
import buyApi from '@/api/buy'
import kycApi from '@/api/kyc'
export default {
	name: 'MIntermediate',
	data() {
		return {
			kycType: 3,
			step: 1,
			submit: false,
			photoImg: '',
			from: {
				frontPhoto: "",
				negativePhoto: "",
				handheldPhoto: ""
			}
		}
	},
	computed: {
		title: function() {
			if (this.kycType == 1) {
				if (this.step == 1) {
					return	'拍摄身份证正面照片'
				}
				if (this.step == 2) {
					return '拍摄身份证背面照片'
				}
				if (this.step == 3) {
					return '拍摄手持身份证照片'
				}
			}
			if (this.kycType == 2) {
				if (this.step == 1) {
					return	'拍摄驾照正页照片'
				}
				if (this.step == 2) {
					return '拍摄驾照副页照片'
				}
				if (this.step == 3) {
					return '拍摄手持驾照照片'
				}
			}
			if (this.kycType == 3) {
				if (this.step == 1) {
					return	'拍摄护照正面照片'
				}
				if (this.step == 2) {
					return '拍摄手持护照照片'
				}
			}
		},
		subtitle: function() {
			if (this.kycType == 1) {
				if (this.step == 1) {
					return	'拍一张身份证个人信息页的照片'
				}
				if (this.step == 2) {
					return '拍一张身份证背面照片'
				}
				if (this.step == 3) {
					return '拍一张手持身份证个人信息页的照片'
				}
			}
			if (this.kycType == 2) {
				if (this.step == 1) {
					return	'拍一张驾照个人信息页的照片'
				}
				if (this.step == 2) {
					return '拍一张驾照副页照片'
				}
				if (this.step == 3) {
					return '拍一张手持驾照个人信息页的照片'
				}
			}
			if (this.kycType == 3) {
				if (this.step == 1) {
					return	'拍一张护照个人信息页的照片'
				}
				if (this.step == 2) {
					return '拍一张手持护照个人信息页的照片'
				}
			}
		},
		submissions: function() {
			if (this.kycType == 1) {
				if (this.step == 3) {
					return	'提交'
				} else {
					return '继续'
				}
			}
			if (this.kycType == 2) {
				if (this.step == 3) {
					return	'提交'
				} else {
					return '继续'
				}
			}
			if (this.kycType == 3) {
				if (this.step == 2) {
					return	'提交'
				} else {
					return '继续'
				}
			}
		}
	},
	created() {
		this.kycType = window.localStorage.getItem('kycType')
	},
	mounted() {
		if (this.kycType == 1 && this.step == 1) {
			return	this.photoImg = require('@/assets/transactions/img_id_card.png')
		}
		if (this.kycType == 2 && this.step == 1) {
			return	this.photoImg = require('@/assets/transactions/img_dl_card.png')
		}
		if (this.kycType == 3 && this.step == 1) {
			return	this.photoImg = require('@/assets/transactions/img_passport_card.png')
		}
	},
	methods: {
		// 上传图片
    change(e) {
			// console.log(e.target.files[0])
			buyApi.uploadphoto({
				file: e.target.files[0]
			}).then(res => {
				console.log(res)
				// 判断有没有上传成功
				if (res.data.data) {
					this.photoImg = res.data.data
					this.submit = true

					if (this.kycType == 3) {
						if (this.step == 1) {
							this.from.frontPhoto = res.data.data
						} else {
							this.from.handheldPhoto = res.data.data
						}
					} else {
						if (this.step == 1) {
							this.from.frontPhoto = res.data.data
						} else if (this.step == 2) {
							this.from.negativePhoto = res.data.data
						} else {
							this.from.handheldPhoto = res.data.data
						}
					}
				}
			})
		},
		// 继续 / 提交
		continued() {
			// console.log('继续')
			if (this.kycType == 1) {
				if (this.step == 1) {
					console.log('第一步')
					this.step = 2
					this.photoImg = require('@/assets/transactions/img_id_card_back.png')
					this.submit = false
				} else if (this.step == 2) {
					console.log('第二步')
					this.step = 3
					this.photoImg = require('@/assets/transactions/img_id_card_hold.png')
					this.submit = false
				} else if (this.step == 3) {
					console.log('证件类型', this.kycType)
					console.log('证件图片', this.from)
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
			if (this.kycType == 2) {
				if (this.step == 1) {
					console.log('第一步')
					this.step = 2
					this.photoImg = require('@/assets/transactions/img_dl_card_back.png')
					this.submit = false
				} else if (this.step == 2) {
					console.log('第二步')
					this.step = 3
					this.photoImg = require('@/assets/transactions/img_id_card_hold.png')
					this.submit = false
				} else if (this.step == 3) {
					console.log('证件类型', this.kycType)
					console.log('证件图片', this.from)
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
			if (this.kycType == 3) {
				if (this.step == 1) {
					console.log('第一步')
					this.step = 2
					this.photoImg = require('@/assets/transactions/img_id_card_hold.png')
					this.submit = false
				} else if (this.step == 2) {
					console.log('证件类型', this.kycType)
					console.log('证件图片', this.from)
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
	}
}
</script>

<style lang="less"  scope>
.intermediate{
	padding: 0 0.32rem;
	.steps{
		padding: 0.8rem 0 1.28rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		h4{
			font-size: 0.36rem;
			line-height: 0.42rem;
			color: #40405E;
		}
		p{
			padding: 0.12rem 0 0.8rem;
			font-size: 0.28rem;
			line-height: 0.32rem;
			color: #A0A0B3;
		}
		.photos{
			width: 6rem;
			height: 3.76rem;
			padding: 0.2rem;
			overflow: hidden;
			background: url(../../../assets/transactions/img_photo.png) no-repeat;
			background-size: 100% 100%;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.upload{
		position: relative;
		width: 100%;
		height: 0.96rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #0CB397;
		border-radius: 0.48rem;
		img{
			width: 0.4rem;
			height: 0.4rem;
		}
		span{
			padding-left: 0.18rem;
			font-size: 0.32rem;
			line-height: 0.38rem;
			color: #FFFFFF;
		}
		.photofile{
			position: absolute;
			width: 100%;
			height: 0.96rem;
			opacity: 0;
			z-index: 99;
		}
	}
	.continued{
		margin-top: 0.48rem;
		width: 100%;
		height: 0.96rem;
		text-align: center;
		line-height: 0.96rem;
		font-size: 0.32rem;
		line-height: 0.38rem;
		color: #FFFFFF;
		background: linear-gradient(0deg, #DDDDE6, #DDDDE6);
		border-radius: 0.48rem;
		&.active{
			background: #0CB397;
		}
	}

}
</style>
