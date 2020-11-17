<template>
  <div class="mUploadVideo">
    <h3>拍摄手持证件视频</h3>
    <p>
      请上传一段手持证件的拍摄视频
      <br />视频中请用普通话说
      <br />“XX(您的真实姓名)自愿注册{{ $appConfig.upperName }}”
      <br />或“XX(您的真实姓名)自愿注册{{ $appConfig.chineseName }}”
    </p>
    <div class="video">
      <img v-if="uploadStatus==1" src="@/assets/transactions/ico_videoimg.png" alt="video" />
      <video
        v-if="uploadStatus==2"
        :src="videoSrc"
        autoplay
        loop
      >your browser does not support the video tag</video>
    </div> 
    <button class="upload" @click="upload()">
      <img src="@/assets/transactions/ico_camera_white.png" alt="camera" />
      <span>上传视频</span>
    </button>
    <button class="submit" :class="{'submit_ho':uploadStatus==2}" @click="check()">提交</button>
    <input
      ref="file"
      type="file"
      accept="video/*"
      multiple
      style="display:none;"
      @change="UploadFile"
    />
  </div>           
</template>

<script>
import upLoadApi from "@/api/buy";
import kycApi from "@/api/kyc";
export default {
  name: "MUploadVideo",
  data() {
    return {
      uploadStatus: 1,
      videoSrc: ""
    };
  },
  methods: {
    upload() {
      this.$refs.file.click();
    },
    UploadFile(e) {
			const fileList = e.target.files[0];
			if (fileList != undefined) {
				upLoadApi
					.uploadphoto({ file: fileList })
					.then(res => {
						this.videoSrc = res.data.data;
						this.uploadStatus = 2;
					})
					.catch(err => {});
			}
    },
    check() {
      if (this.uploadStatus == 2) {
        kycApi
          .kycSubmit({ videoPath: this.videoSrc })
          .then(res => {
            this.$router.push("/mWaitCheck");
          }) 
          .catch(err => {});
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mUploadVideo {
  padding: 0.32rem;
  width: 100vw;
  height: 100vh;
  h3 {
    font-weight: bold;
    font-size: 0.36rem;
    line-height: 0.5rem;
    color: #40405e;
    text-align: center;
    margin-top: 0.8rem;
  }
  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #a0a0b3;
    text-align: center;
    margin-top: 0.12rem;
    padding-bottom: 0.8rem;
  }
  .video {
    width: 6rem;
    height: 3.76rem;
    margin: 0 auto;
    background: url("../../../assets/transactions/ico_videobg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 5.6rem;
      height: 3.36rem;
    }
    video {
      width: 5.6rem;
      height: 3.36rem;
      object-fit:fill;
    }
  }
  .upload {
    margin-top: 1.28rem;
    width: 100%;
    height: 0.96rem;
    background: @cl-m;
    border-radius: 0.48rem;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.36rem;
      height: 0.32rem;
    }
    span {
      margin-left: 0.16rem;
    }
  }
  .submit {
    margin-top: 0.48rem;
    width: 100%;
    height: 0.96rem;
    background: linear-gradient(0deg, #dddde6, #dddde6);
    border-radius: 24px;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
  }
  .submit_ho {
    background: @cl-m;
    color: #ffffff;
  }
}
</style>
