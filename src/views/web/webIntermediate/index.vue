<template>
  <div class="webIntermediate">
    <div class="content">
      <div class="title">中级验证</div>
      <div v-if="kycType == 1" class="steps">
        <div class="row1 flex_row">
          <div class="step">
            <div class="number">01</div>
            <div>
              <h4>拍摄身份证正面照片</h4>
              <p>拍一张身份证个人信息页的照片</p>
              <div class="photos">
                <img v-if="!steps.step1" src="@/assets/transactions/img_id_card1.png" alt />
                <img v-else :src="from.frontPhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="frontPhotochange" />
              </div>
            </div>
          </div>
          <div class="step">
            <div class="number">02</div>
            <div>
              <h4>拍摄身份证背面照片</h4>
              <p>拍一张身份证背面照片</p>
              <div class="photos">
                <img v-if="!steps.step2" src="@/assets/transactions/img_id_card2.png" alt />
                <img v-else :src="from.negativePhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="negativePhotochange" />
              </div>
            </div>
          </div>
        </div>
        <div class="row2">
          <div class="step">
            <div class="number">03</div>
            <div>
              <h4>拍摄手持身份证照片</h4>
              <p>拍一张手持身份证个人信息页的照片</p>
              <div class="photos">
                <img v-if="!steps.step3" src="@/assets/transactions/img_card.png" alt />
                <img v-else :src="from.handheldPhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="handheldPhotochange" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="kycType == 2" class="steps">
        <div class="row1 flex_row">
          <div class="step">
            <div class="number">01</div>
            <div>
              <h4>拍摄驾照正页照片</h4>
              <p>拍一张驾照个人信息页的照片</p>
              <div class="photos">
                <img v-if="!steps.step1" src="@/assets/transactions/img_dl_card1.png" alt />
                <img v-else :src="from.frontPhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="frontPhotochange" />
              </div>
            </div>
          </div>
          <div class="step">
            <div class="number">02</div>
            <div>
              <h4>拍摄驾照副页照片</h4>
              <p>拍一张驾照副页照片</p>
              <div class="photos">
                <img v-if="!steps.step2" src="@/assets/transactions/img_dl_card2.png" alt />
                <img v-else :src="from.negativePhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="negativePhotochange" />
              </div>
            </div>
          </div>
        </div>
        <div class="row2">
          <div class="step">
            <div class="number">03</div>
            <div>
              <h4>拍摄手持驾照照片</h4>
              <p>拍一张手持驾照个人信息页的照片</p>
              <div class="photos">
                <img v-if="!steps.step3" src="@/assets/transactions/img_card.png" alt />
                <img v-else :src="from.handheldPhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="handheldPhotochange" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="steps">
        <div class="row1 flex_row">
          <div class="step">
            <div class="number">01</div>
            <div>
              <h4>拍摄护照正面照片</h4>
              <p>拍一张护照个人信息页的照片</p>
              <div class="photos">
                <img v-if="!steps.step1" src="@/assets/transactions/img_passport_card1.png" alt />
                <img v-else :src="from.frontPhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="frontPhotochange" />
              </div>
            </div>
          </div>
          <div class="step">
            <div class="number">02</div>
            <div>
              <h4>拍摄手持护照照片</h4>
              <p>拍一张手持护照个人信息页的照片</p>
              <div class="photos">
                <img v-if="!steps.step3" src="@/assets/transactions/img_card.png" alt />
                <img v-else :src="from.handheldPhoto" alt="" />
                <input type="file" accept="image/*" class="photofile" @change="handheldPhotochange" />
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="btns">
        <button class="btn1" :disabled="!disabled" @click="continued">提交认证</button>
        <button class="btn2" @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import buyApi from '@/api/buy'
import kycApi from '@/api/kyc'
export default {
  name: "WebIntermediate",
  data() {
    return {
      kycType: 3,

      from: {
				frontPhoto: "",
				negativePhoto: "",
				handheldPhoto: ""
      },
      steps: {
        step1: false,
        step2: false,
        step3: false
      }

    };
  },
  computed: {
    disabled: function() {
      if (this.kycType == 3) {
        let state = true
        if (!this.steps.step1) {
          state = false
        }

        if (!this.steps.step3) {
          state = false
        }
        return state
      } else {
        let state = true
        if (!this.steps.step1) {
          state = false
        }
        if (!this.steps.step2) {
          state = false
        }
        if (!this.steps.step3) {
          state = false
        }
        return state
      }
    }
  },
  created() {
    this.kycType = window.localStorage.getItem('kycType')
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    frontPhotochange(e) {
      buyApi.uploadphoto({
        file: e.target.files[0]
      }).then(res => {
        console.log(res)
        if (res.data.data) {
          this.steps.step1 = true
          this.from.frontPhoto = res.data.data
        }
      })
    },
    negativePhotochange(e) {
      buyApi.uploadphoto({
        file: e.target.files[0]
      }).then(res => {
        if (res.data.data) {
          this.steps.step2 = true
          this.from.negativePhoto = res.data.data
        }
      })
    },
    handheldPhotochange(e) {
      buyApi.uploadphoto({
        file: e.target.files[0]
      }).then(res => {
        if (res.data.data) {
          this.steps.step3 = true
          this.from.handheldPhoto = res.data.data
        }
      })
    },
    continued() {
      // console.log(11)
      kycApi.kycSubmit(
        this.from
      ).then(res => {
        // console.log(res.data)
        this.$toast.setDefaultOptions({ duration: 1000 });
        this.$toast.success('提交成功!')
        setTimeout(() => {
          this.$toast.clear();
          this.$router.push({
            path: "/waitCheck"
          });
        }, 1200);
      }).catch(err => {
        console.log(err)
        this.$toast(err.data.message)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.webIntermediate {
  background: #fff;
  padding: 40px 0;
  .content {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 790px;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      padding-bottom: 24px;
      font-size: 20px;
      line-height: 24px;
      color: #40405e;
    }
    .flex_row {
      display: flex;
      justify-content: space-between;
    }
    .steps{
      width: 100%;
    }
    .row1{
      width: 100%;
      padding: 0 109px;
    }
    .row2{
      width: 100%;
      padding: 60px 109px 0;
    }
    .step {
      display: flex;
      .number {
        width: 24px;
        height: 24px;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
        color: @cl-m;
        background: rgba(12, 179, 151, 0.2);
        border-radius: 50%;
        margin-right: 12px;
      }
      h4 {
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #40405e;
      }
      p {
        padding-top: 6px;
        font-size: 14px;
        line-height: 20px;
        color: #a0a0b3;
      }
      .photos{
        width: 200px;
        height: 125px;
        margin-top: 20px;
        padding: 6px;
        overflow: hidden;
        background: url(../../../assets/transactions/img_photo.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        display: flex;
        img{
          width: 100%;
          height: 100%;
        }
        .photofile{
      position: absolute;
			width: 188px;
			height: 113px;
			opacity: 0;
			z-index: 99;
		}
      }
    }
    .btns{
      width: 481px;
      display: flex;
      justify-content: space-between;
      padding-top: 40px;
      .btn1{
        width: 226px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        background: @gd-m1;
        border-radius: 41px;
        cursor: pointer;
      }
      .btn2{
        width: 226px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 16px;
        color: #15B894;
        border: 1px solid #15B894;
        border-radius: 41px;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 1200px){
  .webIntermediate {
  padding: 40px * 0.8 0;
  .content {
    padding: 40px * 0.8 0;
    width: 790px * 0.8;
    .title {
      padding-bottom: 24px * 0.8;
      font-size: 20px * 0.8;
      line-height: 24px * 0.8;
    }
    .row1{
      width: 100%;
      padding: 0 109px * 0.8 ;
    }
    .row2{
      padding: 60px * 0.8 109px * 0.8  0;
    }
    .step {
      .number {
        width: 24px * 0.8;
        height: 24px * 0.8;
        font-size: 12px * 0.8;
        line-height: 24px * 0.8;
        margin-right: 12px * 0.8;
      }
      h4 {
        font-size: 16px * 0.8;
        line-height: 22px * 0.8;
      }
      p {
        padding-top: 6px * 0.8;
        font-size: 14px * 0.8;
        line-height: 20px * 0.8;
      }
      .photos{
        width: 200px * 0.8;
        height: 125px *  0.8;
        margin-top: 20px * 0.8;
        padding: 6px * 0.8;
        .photofile{
			width: 188px * 0.8;
			height: 113px * 0.8;
		}
      }
    }
    .btns{
      width: 481px * 0.8;
      padding-top: 40px * 0.8;
      .btn1{
        width: 226px * 0.8;
        height: 48px * 0.8;
        line-height: 48px * 0.8;
        font-size: 16px * 0.8;
        border-radius: 41px * 0.8;
      }
      .btn2{
        width: 226px * 0.8;
        height: 48px * 0.8;
        line-height: 48px * 0.8;
        font-size: 16px * 0.8;
        border-radius: 41px * 0.8;
      }
    }
  }
}
}
</style>
