<template>
  <div class="webUploadVideo">
    <h3>高级认证</h3>
    <p>拍摄手持证件视频</p>
    <p class="introduction">
      请上传一段手持证件的拍摄视频，视频中请用普通话说
      <br />
      “XX(您的真实姓名)自愿注册{{ $appConfig.upperName }}”
      <br />或“XX(您的真实姓名)自愿注册{{ $appConfig.chineseName }}”
    </p>
    <div class="upload">
      <div v-if="uploadStatus==1" class="ver" @click="upload()">
        <img src="@/assets/transactions/ic_upload.png" alt="video" />
        <span>本地上传视频</span>
      </div>
      <video
        v-if="uploadStatus==2"
        :src="videoSrc"
        autoplay
        loop
      >your browser does not support the video tag</video>
    </div>
    <div class="btn">
      <button @click="check()">提交认证</button>
      <button class="btn_one" @click="cancelCheck()">取消</button>
    </div>
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
  name: "WebUploadVideo",
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
          .catch(res => {});
      }
    },
    check() {
      if (this.uploadStatus == 2) {
        kycApi
          .kycSubmit({ videoPath: this.videoSrc })
          .then(res => {
            this.$router.push("/waitCheck");
          })
          .catch(err => {});
      }
    },
    // 取消验证
    cancelCheck() {
      this.uploadStatus = 1;
      this.$refs.file.value = "";
    }
  }
};
</script>

<style lang="less" scoped>
.webUploadVideo {
  width: 790px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 40px auto 0;
  padding-top: 40px;
  padding-bottom: 61px;
  h3 {
    font-size: 20px;
    color: #40405e;
    text-align: center;
  }
  p {
    margin-top: 50px;
    font-weight: 500;
    font-size: 16px;
    color: #40405e;
    text-align: center;
    font-weight: 500;
  }
  .introduction {
    font-size: 14px;
    line-height: 20px;
    color: #a0a0b3;
    margin-top: 10px;
  }
  .upload {
    margin: 40px auto 0;
    width: 200px;
    height: 125px;
    background: url("../../../assets/transactions/ico_videobg.png") no-repeat;
    background-size: 100%;
    padding: 7px;
    .ver {
      width: 100%;
      height: 100%;
      background: url("../../../assets/transactions/img_id_card.png") no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 34px;
        height: 34px;
      }
      span {
        padding-top: 2px;
        font-size: 10px;
        color: @cl-m;
        line-height: 14px;
      }
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .btn {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      cursor: pointer;
      width: 226px;
      height: 48px;
      background: linear-gradient(135deg, #43cd85 0%, @cl-m 100%);
      border-radius: 41px;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
    }
    .btn_one {
      border: 1px solid #15b894;
      background: white;
      color: @cl-m;
      margin-left: 30px;
    }
  }
}
@media (max-width: 1200px) {
  .webUploadVideo {
    width: 790px * 0.8;
    margin: 40px * 0.8 auto 0;
    padding-top: 40px * 0.8;
    padding-bottom: 61px * 0.8;
    h3 {
      font-size: 20px * 0.8;
    }
    p {
      margin-top: 50px * 0.8;
      font-size: 16px * 0.8;
    }
    .introduction {
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
      margin-top: 10px * 0.8;
    }
    .upload {
      margin: 40px * 0.8 auto 0;
      width: 200px * 0.8;
      height: 125px * 0.8;
      padding: 7px * 0.8;
      .ver {
        img {
          width: 34px * 0.8;
          height: 34px * 0.8;
        }
        span {
          padding-top: 2px * 0.8;
          font-size: 10px * 0.8;
          line-height: 14px * 0.8;
        }
      }
    }
    .btn {
      margin-top: 40px * 0.8;

      button {
        width: 226px * 0.8;
        height: 48px * 0.8;
        border-radius: 41px * 0.8;
        font-size: 16px * 0.8;
      }
      .btn_one {
        margin-left: 30px * 0.8;
      }
    }
  }
}
@media (max-width: 1200px) {
  .webUploadVideo {
    width: 790px * 0.8;
    margin: 40px * 0.8 auto 0;
    padding-top: 40px * 0.8;
    padding-bottom: 61px * 0.8;
    h3 {
      font-size: 20px * 0.8;
    }
    p {
      margin-top: 50px * 0.8;
      font-size: 16px * 0.8;
    }
    .introduction {
      font-size: 14px * 0.8;
      line-height: 20px * 0.8;
      margin-top: 10px * 0.8;
    }
    .upload {
      margin: 40px * 0.8 auto 0;
      width: 200px * 0.8;
      height: 125px * 0.8;
      padding: 7px * 0.8;
      .ver {
        img {
          width: 34px * 0.8;
          height: 34px * 0.8;
        }
        span {
          padding-top: 2px * 0.8;
          font-size: 10px * 0.8;
          line-height: 14px * 0.8;
        }
      }
    }
    .btn {
      margin-top: 40px * 0.8;

      button {
        width: 226px * 0.8;
        height: 48px * 0.8;
        border-radius: 41px * 0.8;
        font-size: 16px * 0.8;
      }
      .btn_one {
        margin-left: 30px * 0.8;
      }
    }
  }
}
@media (max-width: 960px) {
  .webUploadVideo {
    width: 790px * 0.6;
    margin: 40px * 0.6 auto 0;
    padding-top: 40px * 0.6;
    padding-bottom: 61px * 0.6;
    h3 {
      font-size: 20px * 0.6;
    }
    p {
      margin-top: 50px * 0.6;
      font-size: 16px * 0.6;
    }
    .introduction {
      font-size: 14px * 0.6;
      margin-top: 10px * 0.6;
    }
    .upload {
      margin: 40px * 0.6 auto 0;
      width: 200px * 0.6;
      height: 125px * 0.6;
      padding: 7px * 0.6;
      .ver {
        img {
          width: 34px * 0.6;
          height: 34px * 0.6;
        }
        span {
          font-size: 10px * 0.6;
          line-height: 14px * 0.6;
        }
      }
    }
    .btn {
      margin-top: 40px * 0.6;

      button {
        width: 226px * 0.6;
        height: 48px * 0.6;
        border-radius: 41px * 0.6;
        font-size: 16px * 0.6;
      }
      .btn_one {
        margin-left: 30px * 0.6;
      }
    }
  }
}
</style>
