<template>
  <div ref="header" class="header">
    <div v-if="$appConfig.moduleControl.routerTransactions === 0" class="container flex flex_middle">
      <div class="logo_box img-box flex_1">
        <img class="logo" :src="$appConfig.source.ic_logn_blank_1.src" />
      </div>
      <div class="navigation_box flex flex_middle">
        <router-link to="/" class="item">{{ $t('首页') }}</router-link>
        <!-- <a class="item">{{$t('公告')}}</a> -->
        <router-link to="/announcement" class="item">{{ $t('公告') }}</router-link>
        <a class="item" @click="toguide('Product')">{{ $t('产品介绍') }}</a>
        <!-- <a href="#Product" class="item">{{$t('产品介绍')}}</a> -->
        <!--                <a class="item">{{$t('客户合作')}}</a>-->
        <router-link to="/cooperation" class="item">{{ $t('商户合作') }}</router-link>
        <router-link to="/help" class="item">{{ $t('帮助') }}</router-link>
      </div>
      <div class="lang">
        <div class="img-box flex flex_middle" style="cursor: pointer;" @click="choosePop()">
          <img v-show=" lang=='zh'" class="lang_img" src="../../assets/ic_cn.png" />
          <img v-show=" lang!='zh'" class="lang_img" src="../../assets/ic_usa.png" />
          <div class="lang_txt">{{ lang=='zh'?'简体中文':'English' }}</div>
          <img class="more_img" src="../../assets/ic_lang_vector.png" />
        </div>
        <div v-show="chooseShow" class="lang_choose">
          <div class="choose_item flex flex_middle" @click="chooseLang('en')">
            <img class="item_img" src="../../assets/ic_usa.png" />
            <div class="item_txt">English</div>
          </div>
          <div class="choose_item flex flex_middle" @click="chooseLang('zh')">
            <img class="item_img" src="../../assets/ic_cn.png" />
            <div class="item_txt">简体中文</div>
          </div>
        </div>
        <div v-show="chooseShow" class="lang_choose_bg"></div>
      </div>
      <div class="toMobile img-box" @click="gotype">
        <img class="img" src="../../assets/ic_hard_to.png" />
      </div>
    </div>

    <!-- 功能模块routerTransactions start -->

    <div v-if="$appConfig.moduleControl.routerTransactions === 1" class="container_pro flex_center_between">
      <div class="header_left flex_align_center">
        <router-link to="/home" class="logo">
          <img :src="$appConfig.source.ic_logn_blank_1.src" />
        </router-link>
        <ul class="flex_align_center header_text">
          <li @click="transactions">
            我要交易
          </li>
          <li>
            <router-link to="/announcement">平台公告</router-link>
          </li>
          <li>
            <router-link to="/cooperation">商户合作</router-link>
          </li>
          <li>
            <router-link to="/help">帮助中心</router-link>
          </li>
        </ul>
      </div>
      <div class="header_right flex_center_end">
        <div v-if="!istoken" class="flex_align_center login_register header_text">
          <router-link to="/login">登录</router-link>
          <router-link to="/register" class="register">注册</router-link>
        </div>
        <div v-if="istoken" class="flex_align_center login_success">
          <div class="header_text">
            <router-link to='/orderList' style="font-weight: bold;">订单</router-link>
          </div>
          <div class="head" @click="clickPersonal" >
            <img src="@/assets/header/head.png" alt />
            <div class="personal_info" v-show="isPersonalInfo">
              <div class="info" v-if="personalInfo">
                <div>UID:{{personalInfo.userId}}</div>
                <div>账号:{{personalInfo.mobile}}</div>
              </div>
              <ul>
                <!-- <li><router-link to="/changePwd">修改密码</router-link></li>
                <li><router-link to="/through">身份验证</router-link></li> -->
                <li>
                  <router-link 
                  to='/wallet'>资产</router-link>
                </li>
                <li><router-link to="/personalCentre">个人中心</router-link></li>
                <li @click="removeToken">退出</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="lang">
          <div class="img_box flex_align_center" @click="choosePop">
            <img v-show=" lang == 'zh'" class="lang_img" src="@/assets/ic_cn.png" alt />
            <img v-show=" lang != 'zh'" class="lang_img" src="@/assets/ic_usa.png" alt />
            <div class="lang_txt">{{ lang=='zh'?'简体中文':'English' }}</div>
            <img class="more_img" src="../../assets/ic_lang_vector.png" />
          </div>
          <div v-show="chooseShow" class="lang_choose">
            <div class="choose_item flex_align_center" @click="chooseLang('en')">
              <img class="item_img" src="../../assets/ic_usa.png" />
              <div class="item_txt">English</div>
            </div>
            <div class="choose_item flex_align_center" @click="chooseLang('zh')">
              <img class="item_img" src="../../assets/ic_cn.png" />
              <div class="item_txt">简体中文</div>
            </div>
          </div>
        </div>
        <div class="mobile_right ">
          <div class="m_login_regist"  v-if="!istoken"><router-link to='/mlogin'>登录/注册</router-link></div>
          <div class="head" v-if="istoken" @click="mpersonalInfo">
            <img src="@/assets/header/head.png" />
          </div>
          <div class="mobile_type" @click="gotype">
            <img class="img" src="@/assets/ic_hard_to.png" />
          </div>
        </div>
      </div>
    </div>

       <!-- 功能模块routerTransactions end -->
     <personalInfoPop ref="personalInfoPop" @removeToken='removeToken'></personalInfoPop>
  </div>
</template>

<script>
import { ismobile } from "@/utils";
import personalInfoPop from '@/components/personalInfo'
import buyApi from "@/api/buy.js";
export default {
  data() {
    return {
      lang: "zh",
      chooseShow: false,
      istoken: false,
      isPersonalInfo:false,
      personalInfo:"" //个人信息
    };
  },
  
  created() {
    this.lang = localStorage.getItem("lang") || "zh";
    var token = localStorage.getItem('token')
    this.$store.state.user.isToken = token
    if(token){
      this.istoken = true
    }
    this.personalInfo = JSON.parse(localStorage.getItem('personalInfo'))
    
  },

  components:{
    personalInfoPop
  },
  
  methods: {
    transactions(){
      if(localStorage.getItem('token')){
        this.$router.push('/transactions')
      }else{
        this.$router.push('/login')
      }
    },
    mpersonalInfo(){
      buyApi
        .kycstatus({})
        .then(res => {
          // console.log(res)
          res = res.data.data
          this.personalInfo = res
          window.localStorage.setItem('personalInfo',JSON.stringify(res))
          this.$refs.personalInfoPop.show(this.personalInfo)
        })
        .catch(err => {
          console.log(err);
          this.$toast(err.data.message);
        });
    },
    removeToken(){
      localStorage.removeItem('token')
      this.$store.state.user.isToken = ''
      this.$router.push('/home')
    },
    clickPersonal(){
      this.isPersonalInfo =!this.isPersonalInfo
      this.chooseShow = false
    },
    choosePop() {
      this.chooseShow = !this.chooseShow;
      this.isPersonalInfo = false
    },
    chooseLang(lang) {
      this.lang = lang;
      localStorage.setItem("lang", lang);
      this.$i18n.locale = lang;
      this.chooseShow = !this.chooseShow;
    },
    gotype() {
      this.$router.push("/type");
    },
    toguide(id) {
      const select = id;
      console.log(this.$route.path);
      if (this.$route.path == "/home") {
        var anchor = document.getElementById(id);
        document.body.scrollTop = anchor.offsetTop;
      } else {
        sessionStorage.setItem("selectid", select);
        this.$router.push("/home");
      }
    }
  },
  watch: {
    '$store.state.user.isToken'(newval){
      if(newval){
        this.istoken = true
      }else{
        this.istoken = false
      }
    },

    $route(to, from) {
      this.lang = localStorage.getItem("lang") || "zh";
      this.personalInfo = JSON.parse(localStorage.getItem('personalInfo'))
      
    }
  },
  mounted() {
    this.$refs.header.style.setProperty(
      "--ic_logn_blank_1_width",
      this.$appConfig.source.ic_logn_blank_1.width
    );
    this.$refs.header.style.setProperty(
      "--ic_logn_blank_2_width",
      this.$appConfig.source.ic_logn_blank_1.width2
    );
    this.$refs.header.style.setProperty(
      "--ic_logn_blank_2_height",
      this.$appConfig.source.ic_logn_blank_1.height2
    );
  }
};
</script>
<style lang="less" scoped>
.header {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  --ic_logn_blank_1_width: 130;
  --ic_logn_blank_2_width: 130;
  --ic_logn_blank_2_height: 28;

  .container {
    margin: 0 auto;
    width: 1200px;
    height: 80px;

    .logo_box {
      .logo {
        width: calc(var(--ic_logn_blank_1_width) * 1px);
        height: auto;
      }
    }

    .navigation_box {
      padding-right: 120px;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #40405e;

      .item {
        display: inline-block;
        padding-left: 40px;
        color: var(--color);
      }
    }

    .lang {
      position: relative;
      height: 100%;
      display: flex;

      .lang_img {
        width: 24px;
        height: auto;
      }

      .lang_txt {
        padding: 0 6px 0 11px;
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #40405e;
      }

      .more_img {
        width: 12px;
        height: auto;
      }

      .lang_choose {
        position: absolute;
        left: -10px;
        top: 82px;
        padding: 24px 20px 0 12px;
        width: 140px;
        z-index: 10;
        box-sizing: border-box;
        background: #ffffff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

        .choose_item {
          padding-bottom: 24px;
          cursor: pointer;
          .item_img {
            width: 24px;
            height: auto;
          }

          .item_txt {
            padding-left: 11px;
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #40405e;
          }
        }
      }

      .lang_choose_bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        z-index: 10;
      }
    }

    .toMobile {
      display: none;
    }
  }

  .flex_align_center {
    display: flex;
    align-items: center;
  }
  .flex_center_between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex_center_end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .header_text {
    font-size: 16px;
    line-height: 24px;
    color: #40405e;
  }
  .container_pro {
    margin: 0 auto;
    width: 1200px;
    height: 80px;
    .header_left {
      .logo {
        display: flex;
        img{
          width: calc(var(--ic_logn_blank_1_width) * 1px);
        }
      }
      ul {
        li {
          margin-left: 40px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .header_right {
      flex: 1;
      height: 100%;
      .login_register {
        a {
          margin-left: 40px;
        }
        .register {
          padding: 3px 15px;
          border: 1px solid @cl-m;
          box-sizing: border-box;
          border-radius: 2px;
          color: @cl-m;
          &:hover {
            background: @cl-m;
            color: #ffffff;
          }
        }
      }
      .login_success {
        height: 100%;
        
        &>div {
          margin-left: 40px;
        }
        .head {
          display: flex;
          align-items: center;
          height:100%;
          position: relative;
          cursor: pointer;
          img {
            width: 24px;
            height: 24px;
          }
          .personal_info{
            position: absolute;
            width:150px;
            left: -60px;
            top: 82px;
            z-index:10;
            background: #FFFFFF;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
            .info{
              padding: 20px 10px 6px;
              font-size: 14px;
              line-height: 20px;
              color: rgba(21, 46, 83, 0.4);
              border-bottom: 1px solid #DDDDE6;
              div{
                padding-bottom: 10px;
              }
            }
            ul {
              padding: 0 10px 18px;
              li{
                padding-top: 24px;
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;
                color: #40405E;
                cursor: pointer;
                a{
                  width: 100%;
                  display: inline-block;
                }
              }
            }
            
          }
          
        }
        
      }
      .lang {
        position: relative;
        margin-left: 40px;
        height: 100%;
        display: flex;
        cursor: pointer;
        .lang_img {
          width: 24px;
        }
        .lang_txt {
          padding: 0 6px 0 11px;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #40405e;
        }
        .more_img {
          width: 12px;
          height: auto;
        }
        .lang_choose {
          position: absolute;
          left: -10px;
          top: 82px;
          padding: 24px 20px 0 12px;
          width: 140px;
          z-index: 10;
          box-sizing: border-box;
          background: #ffffff;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

          .choose_item {
            padding-bottom: 24px;
            cursor: pointer;
            .item_img {
              width: 24px;
              height: auto;
            }

            .item_txt {
              padding-left: 11px;
              font-weight: bold;
              font-size: 16px;
              line-height: 22px;
              color: #40405e;
            }
          }
        }
      }
      .mobile_right{
        display: none;
      }
    }
  }
}

@media (max-width: 1200px) {
  .header {
    .container {
      width: 1200px * 0.8;
      height: 80px * 0.8;

      .logo_box {
        .logo {
          width: calc(var(--ic_logn_blank_1_width) * 0.8 * 1px);
          height: auto;
        }
      }

      .navigation_box {
        padding-right: 120px * 0.8;
        font-size: 16px;
        line-height: 22px;

        .item {
          padding-left: 40px * 0.8;
        }
      }

      .lang {
        .lang_img {
          width: 24px * 0.8;
          height: auto;
        }

        .lang_txt {
          padding: 0px 6px * 0.8 0px 11px * 0.8;
          font-size: 16px * 0.8;
          line-height: 22px * 0.8;
        }

        .more_img {
          width: 12px * 0.8;
          height: auto;
        }

        .lang_choose {
          left: -10px * 0.8;
          top: 82px * 0.8;
          padding: 24px * 0.8 20px * 0.8 0px 12px * 0.8;
          width: 140px * 0.8;

          .choose_item {
            padding-bottom: 24px * 0.8;

            .item_img {
              width: 24px * 0.8;
              height: auto;
            }

            .item_txt {
              padding-left: 11px * 0.8;
              font-size: 16px * 0.8;
              line-height: 22px * 0.8;
            }
          }
        }
      }
    }
    .header_text {
    font-size: 16px * 0.8;
    line-height: 24px * 0.8;
  }
    .container_pro {
    width: 1200px * 0.8;
    height: 80px * 0.8;
    .header_left {
      .logo {
        img{
          width: calc(var(--ic_logn_blank_1_width) * 0.8 * 1px);
        }
      }
      ul {
        li {
          margin-left: 40px * 0.8;
        }
      }
    }
    .header_right {
      .login_register {
        a {
          margin-left: 40px * 0.8;
        }
        .register {
          padding: 3px 15px * 0.8;
        }
      }
      .login_success {
        
        &>div {
          margin-left: 40px * 0.8;
        }
        .head {
          img {
            width: 24px * 0.8;
            height: 24px * 0.8;
          }
          .personal_info{
            width:150px * 0.8;
            left: -60px * 0.8;
            top: 82px * 0.8;
            .info{
              padding: 20px * 0.8 10px * 0.8 6px * 0.8;
              font-size: 14px * 0.8;
              line-height: 20px * 0.8;
              div{
                padding-bottom: 10px * 0.8;
              }
            }
            ul {
              padding: 0 10px * 0.8 18px * 0.8;
              li{
                padding-top: 24px * 0.8;
                font-size: 16px * 0.8;
                line-height: 22px * 0.8;
              }
            }
            
          }
          
        }
        
      }
      .lang {
        margin-left: 40px * 0.8;
        .lang_img {
          width: 24px * 0.8;
        }
        .lang_txt {
          padding: 0 6px * 0.8 0 11px * 0.8;
           font-size: 16px * 0.8;
          line-height: 22px * 0.8;
        }
        .more_img {
          width: 12px * 0.8;
        }
        .lang_choose {
          left: -10px * 0.8;
          top: 82px * 0.8;
          padding: 24px * 0.8 20px * 0.8 0 12px * 0.8;
          width: 140px * 0.8;

          .choose_item {
            padding-bottom: 24px * 0.8;
            .item_img {
              width: 24px * 0.8;
            }

            .item_txt {
              padding-left: 11px * 0.8;
              font-size: 16px * 0.8;
              line-height: 22px * 0.8;
            }
          }
        }
      }
    }
  }
  }
}

@media (max-width: 980px) {
  .header {
    .container {
      width: 1200px * 0.6;
    }
    .container_pro {
      width: 1200px * 0.6;
    }
  }
}

@media (max-width: 767px) {
  .header {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);

    .container {
      margin: 0 auto;
      width: 100%;
      height: 1.16rem;
      padding: 0 0.3rem;
      box-sizing: border-box;

      .logo_box {
        .logo {
          width: calc(var(--ic_logn_blank_2_width) * 2 / 100 * 1rem);
          height: calc(var(--ic_logn_blank_2_height) * 2 / 100 * 1rem);
        }
      }

      .navigation_box {
        display: none;
      }

      .lang {
        display: none;
      }

      .toMobile {
        display: block;

        .img {
          width: 0.4rem;
          height: auto;
        }
      }
    }

    .container_pro{
      margin: 0 auto;
      width: 100%;
      height: 1.16rem;
      padding: 0 0.3rem;
      box-sizing: border-box;
      .header_left{

        .logo{
          img{
            width: calc(var(--ic_logn_blank_2_width) * 2 / 100 * 1rem);
            height: calc(var(--ic_logn_blank_2_height) * 2 / 100 * 1rem);
          }
        }
        ul{
          display: none;
        }
      }
      .header_right{

        .login_register{
          display: none;
        }
        .login_success{
          display: none;
        }
        .lang{
          display: none;
        }
        .mobile_right{
          display: flex;
          align-items: center;
          .m_login_regist{
            padding: 0.06rem 0.16rem;
            border: 1px solid #0CB397;
            box-sizing: border-box;
            border-radius: 0.04rem;
            font-size: 0.28rem;
            line-height: 0.48rem;
            color: #0CB397;
          }
          .head{
            display: flex;
            margin-left: 0.3rem;
            img{
              width: 0.36rem;
              height: 0.36rem;
            }
          }
          .mobile_type{
            display: flex;
            margin-left: 0.3rem;
            img{
              width: 0.4rem;
              height: 0.36rem;
            }
          }
        }
      }
    }
  }
}
</style>
