<template>
  <div class="pop" v-if="pop">
    <div class="popcontent">
      <div class="header">
        <img :src="imgType == 1 ? require('@/assets/transactions/ico_alert_red.png') : require('@/assets/transactions/ico_paid_yellow.png')" alt="" />
                

        <div class="title">{{title}}</div>
        <div class="text" :class="{text_h: title ? true : false }">{{text1}}</div>
        <div class="text" :class="{text_h: title ? true : false }">{{text2}}</div>
        
      </div>
      <div class="btns">
        <button class="btn1" :class="{active:btnType}" @click="leftBtnclick">{{btn1}}</button>
        <button class="btn2" :class="{active:!btnType}" @click="goSet">{{btn}}</button>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pop: false,  
     

    };
  },
	props:{

		imgType:{
			default:1
		},//图片类型
		title:{},//标题
		text1:{},//第一行介绍
		text2:{},//第二行介绍
		btn:{
			default:'去设置',
    },//右侧按钮默认值
		btn1:{
			default:'取消',
    },//左侧按钮默认值
    btnType:{
      default: false ,
    } //按钮提交位置对换
    

	},
  methods: {
    goSet() {
      if(!this.btnType){
        this.$emit("goSet");
      }else{
        this.pop = false;
      }
    },
    leftBtnclick(){
      if(!this.btnType){
        this.pop = false;
      }else{
        this.$emit("goSet");
      }
    },
    show() {
      this.pop = true;
    },
    hide() {
      this.pop = false;
    },
    
  }
};
</script>

<style lang="less" scoped>
.pop {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

  .popcontent {
    width: 440px;
    background: #ffffff;
    border-radius: 4px;
    .header {
      text-align: center;
      padding: 30px 0;
      img {
        width: 72px;
        height: 72px;
      }
      
      .title{
          font-weight: bold;
          font-size: 18px;
          line-height: 25px;
					color: #40405E;
					padding-bottom: 4px;
        }
      .text {
        padding-top: 6px;

        font-size: 16px;
        line-height: 20px;
        color: #40405E;
      }
      
    }
    .btns {
      display: flex;
      height: 52px;
      align-items: center;
      border-top: 1px solid #f5f5fa;
      button {
        flex: 1;
        cursor: pointer;
        height: 100%;
        font-size: 16px;
        color: #a0a0b3;
      }
      .btn2 {
        color: #a0a0b3;
        border-left: 1px solid #f5f5fa;
      }
      .active{
        color: @cl-m;
      }
    }
  }
}
@media (max-width: 1200px) {
  .pop {
    .popcontent {
      width: 440px * 0.8;
      .header {
        padding: 30px * 0.8 0;
        img {
          width: 72px * 0.8;
          height: 72px * 0.8;
				}
				.title{
          font-size: 18px * 0.8;
          line-height: 25px * 0.8;
					padding-bottom: 4px * 0.8;
        }
        .text {
          padding-top: 6px * 0.8;
          font-size: 16px * 0.8;
          line-height: 20px * 0.8;
        }
      }
      .btns {
        height: 52px * 0.8;
        button {
          font-size: 16px * 0.8;
          line-height: 22px * 0.8;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .pop {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;

    .popcontent {
      width: 6rem;
      background: #ffffff;
      border-radius: 0.12rem;
      .header {
        text-align: center;
        padding: 0.64rem 0 0.8rem;
        img {
          width: 1.44rem;
          height: 1.44rem;
        }
        .title{
          font-weight: bold;
          font-size: 0.36rem;
          line-height: 0.5rem;
          color: #40405E;
          padding-bottom: 0.12rem;
        }
        .text {
          padding: 0 0.8rem;
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #40405E;
        }
        .text_h{
        color: #A0A0B3;
      }
      }
      .btns {
        display: flex;
        height: 1.04rem;
        align-items: center;
        border-top: 1px solid #f5f5fa;
        button {
          flex: 1;
          cursor: pointer;
          height: 100%;
          font-size: 0.32rem;
          color: #a0a0b3;
        }
        .btn2 {
          border-left: 1px solid #f5f5fa;
        }
      }
    }
  }
}
</style>
