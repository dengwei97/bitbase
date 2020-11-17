<template>
  <div class="webKyc">
    <div class="content">
      <div class="title">初级验证</div>
      <ul>
        <li class="form_item">
          <div class="label">国家/地区</div>
          <div class="displayInput" @mouseenter="countryMouseover()" @mouseleave="countryMouseLeave()">
            <input v-model="from.country" type="text" disabled placeholder="请选择国家或地区" />
            <img class="ico_select" src="@/assets/transactions/ico_select_solid_small.png" alt />
            <div v-if="countryShow" class="select_box">
              <i class="top"></i>
              <div class="select">
                <div v-for="(item ,index) of countryList" :key="index" @click="selectCountry(item)">
                  <div class="select_item">{{ item }}</div>
                </div>
              </div>
            </div>

          </div>
        </li>
        <li class="form_item">
          <div class="label">证件类型</div>
          <div class="displayInput" @mouseenter="kycTypeMouseover()" @mouseleave="kycTypeMouseLeave()">

            <input v-model="kycType" type="text" disabled placeholder="请选择上传的证件类型" />
            <img class="ico_select" src="@/assets/transactions/ico_select_solid_small.png" alt />
            <div v-if="kycTypeShow" class="select_box">
              <i class="top"></i>
              <div class="select">
                <div v-for="(item ,index) of kycTypeList" :key="index" class="select_item" @click="kycTypeCountry(item)">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </li>
        <li class="form_item">
          <div class="label">姓名</div>
          <div class="displayInput">
            <input v-model="from.certificateName" type="text" placeholder="请输入您的姓名" />
          </div>
        </li>
        <li class="form_item">
          <div class="label">证件号</div>
          <div class="displayInput">

            <input v-model="from.certificateNumber" type="text" placeholder="请输入证件号" />
          </div>
        </li>
      </ul>
      <div class="btns">
        <button class="btn1" :disabled="!disabled" @click="submissions">提交认证</button>
        <button class="btn2" @click="cancel">取消</button>
      </div>

    </div>
  </div>
</template>

<script>
import { phoneCode } from "@/utils/constants";
import kycApi from '@/api/kyc'

export default {
  name: "WebPrimary",
  data() {
    return {
      countryList: [],
      countryShow: false,
      kycTypeList: [
        { id: 1, name: "身份证" },
        { id: 2, name: "驾驶证" },
        { id: 3, name: "护照" }
      ],
      kycTypeShow: false,
      kycType: '', // 证件类型展示
      from: {
        country: "",
        certificateType: "",
        certificateName: "",
        certificateNumber: ""
      }

    };
  },
  computed: {
		disabled: function() {
      let state = true;
      if (!this.from.country) {
        state = false;
      }
      if (!this.from.certificateType) {
        state = false;
      }
      if (!this.from.certificateName) {
        state = false;
      }
      if (!this.from.certificateNumber) {
        state = false;
      }
      return state;
    }
	},
  mounted() {
    this.countryList = phoneCode.countrys_cn;
    // const codes = phoneCode.countrys_cn;
    // codes.forEach((item,index) => {
    //   this.countryList.push({
    //     country:codes[index],
    //     isShow:true
    //   })
    // })
  },
  methods: {
    // 国家输入搜索
    // search(){
    //   this.countryList.forEach((item, index) => {
    //     if (item.country.indexOf(this.from.country) >= 0 ) {
    //       item.isShow = true
    //     } else {
    //       item.isShow = false
    //     }
    //   })
    // },
    cancel() {
      this.$router.go(-1)
    },
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
					this.$router.push({
						path: "/waitCheck"
					});
				}, 1200);
			}).catch(err => {
				console.log(err)
				this.$toast(err.data.message)
			})
		},
    // 国家选择
    countryMouseover() {
      this.countryShow = true
    },
    countryMouseLeave() {
      this.countryShow = false
    },
    selectCountry(value) {
      this.from.country = value
      this.countryShow = false
    },
    // 证件选择
    kycTypeMouseover() {
      this.kycTypeShow = true
    },
    kycTypeMouseLeave() {
      this.kycTypeShow = false
    },
    kycTypeCountry(item) {
      this.kycType = item.name
      this.from.certificateType = item.id
      this.kycTypeShow = false
    }
  }
};
</script>

<style  lang="less" scoped>
.webKyc {
  background: #ffffff;
  padding-top: 40px;
  .content {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 790px;
    height: 494px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      padding: 40px 0 24px;
      font-size: 20px;
      line-height: 24px;
      color: #40405e;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #a1abba;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #a1abba;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #a1abba;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #a1abba;
    }
    .form_item {
      width: 481px;
      height: 52px;
      padding:0 14px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #c8c8c8;
      border-radius: 6px;
      margin-bottom: 16px;
      .label {
        width: 72px;
        font-size: 16px;
        color: #4f5669;
      }
      .displayInput{
        display: flex;
        align-items: center;
        height: 100%;
        flex: 1;
        position: relative;
        input {
          padding-left: 20px;
          flex: 1;
          font-size: 14px;
          background: transparent;
        }
        .ico_select {
          width: 12px;
          height: 12px;
        }

        .select_box {
          position: absolute;
          top: 0;
          right: 0;
          // min-width: 180px;
          // height: 100%;
          padding-top: 48px;
          z-index: 2002;
          .select {
            background: #ffffff;
            min-width: 180px;
            max-height: 260px;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            box-sizing: border-box;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            padding: 4px 0;
            overflow: scroll;
            .select_item {
              padding: 10px 0 10px 20px;
              cursor: pointer;
              font-size: 14px;
              color: #4F5669;
            }
            .select_item:hover {
              background: #eeeeee;
            }
          }
          .top {
            position: absolute;
            top: 28px;
            right: 30px;
            z-index: 2003;
          }
          .top:before,
          .top:after {
            position: absolute;

            content: "";
            border-top: 10px transparent dashed;
            border-left: 10px transparent dashed;
            border-right: 10px transparent dashed;
            border-bottom: 10px #fff solid;
          }
          .top:before {
            border-bottom: 10px #e4e7ed solid;
          }
          .top:after {
            top: 1px; /*覆盖并错开1px*/
            border-bottom: 10px #fff solid;
          }
          .select::-webkit-scrollbar {
            width: 2px;
            //   height: 2px;
            color: transparent;
          }
          .select::-webkit-scrollbar-thumb {
            background-color: #ddd;
          }
        }
      }
    }
    .btns{
      width: 481px;
      display: flex;
      justify-content: space-between;
      padding-top: 24px;
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
  .webKyc {
  padding-top: 40px * 0.8;
  .content {
    width: 790px * 0.8;
    height: 494px * 0.8;
    .title {
      padding: 40px * 0.8 0 24px * 0.8;
      font-size: 20px * 0.8;
      line-height: 24px * 0.8;
    }
    .form_item {
      width: 481px * 0.8;
      height: 52px * 0.8;
      padding:0 14px * 0.8;
      border-radius: 6px * 0.8;
      margin-bottom: 16px * 0.8;
      .label {
        width: 72px * 0.8;
        font-size: 16px * 0.8;
      }
      .displayInput{
        input {
          padding-left: 20px * 0.8;
          font-size: 14px * 0.8;
        }
        .ico_select {
          width: 12px * 0.8;
          height: 12px * 0.8;
        }

        .select_box {
          padding-top: 48px * 0.8;
          .select {
            min-width: 180px * 0.8;
            max-height: 260px * 0.8;
            .select_item {
              padding: 10px * 0.8 0 10px * 0.8 20px * 0.8;
              font-size: 14px * 0.8;
            }

          }
          .top {
            top: 28px * 0.8;
            right: 30px * 0.8;
          }
          .top:before,
          .top:after {
            border-top: 10px * 0.8 transparent dashed;
            border-left: 10px * 0.8 transparent dashed;
            border-right: 10px * 0.8 transparent dashed;
            border-bottom: 10px * 0.8 #fff solid;
          }
          .top:before {
            border-bottom: 10px * 0.8 #e4e7ed solid;
          }
          .top:after {
            border-bottom: 10px * 0.8 #fff solid;
          }
        }
      }
    }
    .btns{
      width: 481px * 0.8;
      padding-top: 24px * 0.8;
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
