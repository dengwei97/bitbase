<template>
  <div class="through">
    <section class="primaryVerification">
      <div class="part_one" @click="changeTableOne">
        <span>初级验证</span>
        <span v-show="primaryStatus==2" class="verification">已验证</span>
        <span v-show="primaryStatus!=2" class="nover" @click="checkPrimary()">
          未验证
          <img src="@/assets/transactions/ico_arrow_right.png" alt="arrow" />
        </span>
      </div>
      <div v-if="tableOne" class="part_two">
        <div class="content">
          <div class="con">
            <span>姓名</span>
            <span class="cons">{{ userInfo.name }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>账号</span>
            <span class="cons">{{ userInfo.account | mobile }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>UID</span>
            <span class="cons">
              {{ userInfo.UID }}
              <copy class="copy" :text="userInfo.UID" />
            </span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>国家地区</span>
            <span class="cons">
              {{ userInfo.area }}
            </span>
          </div>
        </div>
        <div class="content">
          <div class="con">
            <span>证件类型</span>
            <span class="cons">{{ userInfo.ver == 1 ? '身份证' : userInfo.ver == 2 ? '驾驶证' : '护照' }}</span>
          </div>
        </div>
        <div class="content">
          <div class="con conlast">
            <span>证件号</span>
            <span class="cons">{{ userInfo.num | certificateNum }}</span>
          </div>
        </div>
      </div>
      <div v-show="primaryStatus!=2" class="part_three">
        <div class="content">
          <img src="@/assets/transactions/ic_addlak_buy.png" alt="buy" />
          <div class="con">
            <p>
              初级认证成功后方可进行中级认证
            </p>
            <p>
              初级认证成功后，可进行单笔小于2000 CNY的交易
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="primaryVerification">
      <div class="part_one">
        <span>中级验证</span>
        <span v-show="intermediateStatus==2" class="verification">已验证</span>
        <span v-show="intermediateStatus!=2" class="nover" @click="checkIntermediate()">
          未验证
          <img src="@/assets/transactions/ico_arrow_right.png" alt="arrow" />
        </span>
      </div>
      <div v-show="intermediateStatus!=2" class="part_three">
        <div class="content">
          <img src="@/assets/transactions/ic_addlak_buy.png" alt="buy" />
          <div class="con">
            <p>
              初级认证成功后方可进行中级认证
            </p>
            <p>
              中级认证成功后，可进行单笔高于2000 CNY或累计金额大于5000 CNY的交易
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="primaryVerification">
      <div class="part_one">
        <span>高级验证</span>
        <span v-show="advancedStatus==2" class="verification">已验证</span>
        <span v-show="advancedStatus!=2" class="nover" @click="checkAdvanced()">
          未验证
          <img src="@/assets/transactions/ico_arrow_right.png" alt="arrow" />
        </span>
      </div>
      <div v-show="advancedStatus!=2" class="part_three">
        <div class="content">
          <img src="@/assets/transactions/ic_addlak_buy.png" alt="buy" />
          <div class="con">
            <p>
              中级认证成功后方可进行中级认证
            </p>
            <p>
              高级认证成功后，可进行单笔高于5000 CNY或累计金额大于10000 CNY的交易
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import kycstatusApi from '@/api/buy'
import { Toast } from 'vant'
import copy from "@/components/copy/index";
export default {
	components: {
		copy
	},
  data() {
    return {
      userInfo: {
        name: "", // 姓名
        account: "", // 账号
        UID: "", // UID
        area: "", // 国家
        ver: "", // 证件类型
        num: ""// 证件号
      },
      tableOne: false, // 显示通过初级验证以后的用户信息
      primaryStatus: 0, // 初级 1-待审核 2-审核通过 3-审核不通过 4-未提交
      intermediateStatus: 0, // 中级 1-待审核 2-审核通过 3-审核不通过 4-未提交
      advancedStatus: 0// 高级 1-待审核 2-审核通过 3-审核不通过 4-未提交
    };
	},
	created() {
		this.getUserInfo();
	},
  methods: {
		// 初级验证通过后，展示用户信息
    changeTableOne() {
			if (this.primaryStatus == 2) {
				this.tableOne = !this.tableOne;
			}
		},
		// 获取用户信息
		getUserInfo() {
			kycstatusApi.kycstatus().then(res => {
				this.primaryStatus = res.data.data.kycStatus;
				this.intermediateStatus = res.data.data.kycMiddleStatus;
				this.advancedStatus = res.data.data.kycUpgradeStatus;
				if (this.primaryStatus == 2) {
					this.tableOne = true;
					this.userInfo.name = res.data.data.realName;
					this.userInfo.account = res.data.data.mobile;
					this.userInfo.UID = res.data.data.userId;
					this.userInfo.area = res.data.data.country;
					this.userInfo.ver = res.data.data.certificateType;
          this.userInfo.num = res.data.data.certificateNumber;
          window.localStorage.setItem('kycType', this.userInfo.ver)
				}
			}).catch(err => {});
		},
		// 初级验证跳转
		checkPrimary() {
			if (this.primaryStatus == 1) {
				this.$router.push('/mWaitCheck');
			} else if (this.primaryStatus == 3 || this.primaryStatus == 4) {
        console.log('跳转初级验证页面');
        this.$router.push('/mCountry')
			}
		},
		// 中级验证
		checkIntermediate() {
			if (this.primaryStatus == 2) {
				if (this.intermediateStatus == 1) {
					this.$router.push('/mWaitCheck');
				} else if (this.intermediateStatus == 3 || this.intermediateStatus == 4) {
          console.log('跳转中级验证页面');
          this.$router.push('/mIntermediate')
				}
			} else {
				Toast('需要完成初级验证');
			}
		},
		// 高级验证
		checkAdvanced() {
				if (this.primaryStatus == 2) {
					if (this.intermediateStatus == 2) {
						if (this.advancedStatus == 1) {
							this.$router.push('/mWaitCheck');
						} else if (this.advancedStatus == 3 || this.advancedStatus == 4) {
							this.$router.push('/mUploadVideo');
						}
					} else {
						Toast('需要完成中级验证');
					}
				} else {
					Toast('需要完成初级验证');
				}
		}
  }
};
</script>

<style lang="less" scoped>
.through {
  width: 100vw;
  padding: 0.32rem 0.24rem;
  .primaryVerification {
    margin-top: 0.3rem;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0.08rem 0.48rem rgba(64, 64, 94, 0.08);
    border-radius: 0.12rem;
    .part_one {
      width: 100%;
      padding: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 0.32rem;
      color: #40405e;
      .verification {
        font-size: 0.28rem;
        color: #00cf00;
        font-weight: normal;
      }
      .nover {
				display: flex;
				align-items: center;
				color: #F0446B;
				font-weight: normal;
				img{
					width: .12rem;
					height: .2rem;
					margin-left:.24rem
				}
      }
    }
    .part_two {
      padding: 0.06rem;
      .content {
        padding: 0 0.32rem;
        background: #f7f7fa;
        .con {
          display: flex;
          padding: 0.32rem 0;
          justify-content: space-between;
          border-bottom: 1px solid #ededf2;
          font-size: 14px;
          color: #c9c9d1;
          .cons {
            color: #40405e;
            display: flex;
            align-items: center;
            .copy {
              margin-left: 0.1rem;
            }
          }
        }
        .conlast{
          border: none;
        }
      }
		}
		.part_three{
			padding: 0.06rem;
			.content{
				padding: .4rem .3rem;
				background: #F7F7FA;
				display: flex;
				justify-content: space-between;
				img{
					width:.32rem;
					height:.32rem;
				}
				.con{
					width: 5.8rem;
					font-size: .24rem;
					line-height: .4rem;
          color: #F2A145;
         
				}
			}
		}
  }
}
</style>
