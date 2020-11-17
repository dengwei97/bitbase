<template>
  <div class="pwd">
    <!-- <input type="password" ref="pwd" maxlength="6" v-model="msg" @input="pwd" /> -->
    <ul class="pwd_wrap">
      <li><i v-if="msgLength > 0"></i></li>
      <li><i v-if="msgLength > 1"></i></li>
      <li><i v-if="msgLength > 2"></i></li>
      <li><i v-if="msgLength > 3"></i></li>
      <li><i v-if="msgLength > 4"></i></li>
      <li><i v-if="msgLength > 5"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // msg: "",
      msgLength: 0
    };
  },
  watch: {
    msg(curVal) {
      // if (/[^\d]/g.test(curVal)) {
      //   this.msg = this.msg.replace(/[^\d]/g, "");
      // } else {
      //   }
        this.msgLength = curVal.length;
    }
  },
  props:{
    msg:{
      type:Number | String,
      default:0
    }
  },
  methods: {
    
    // focus() {
    //   this.$refs.pwd.focus();
    // },
    // pwd() {
    //   this.$emit("pwd", this.msg);
    // }
  }
};
</script>

<style lang='less' scoped>
.pwd {
  // input {
  //   position: absolute;
  //   z-index: -1;
  //   left: -100%;
  //   opacity: 0;
  // }
  ul {
    display: flex;
    border: 1px solid #dddde6;
    border-radius: 4px;
    width: 100%;
    height: 52px;
    cursor: pointer;
    li {
      flex: 1;
      border-right: 1px solid #dddde6;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #000;
        display: inline-block;
      }
    }
    li:last-child {
      border-right: 0;
    }
  }
}
@media (max-width: 1200px) {
  .pwd {
    ul {
      height: 52px * 0.8;
      li {
        i {
          height: 10px * 0.8;
          width: 10px * 0.8;
        }
      }
    }
  }
}
@media (max-width:767px){
  .pwd {
  ul {
    display: flex;
    width: 100%;
    border: 0;
    height: 1rem;
    cursor: pointer;
    li {
      flex: 1;
      background: #F7F7FA;
      border: 0;
      border-radius: 0.12rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.04rem;
      i {
        height: 0.16rem;
        width: 0.16rem;
        border-radius: 50%;
        background: #000;
        display: inline-block;
      }
    }
    li:last-child {
      margin-right: 0;

    }
  }
}
}
</style>