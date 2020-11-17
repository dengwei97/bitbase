<template>
  <div class="ChoiceAreaNo_box">
    <div class="sreach_placeholder"></div>
    <div class="sreach_box flex flex_middle" :class="{standalone: standalone}">
      <div class="sreach flex flex_middle">
        <img class="sreach_img" src="@/assets/transactions/Search.png" />
        <input v-model="sreachTxt" class="sreach_input flex_1" :placeholder="&quot;选择国家或地区&quot;" @input="sreach" />
      </div>
    </div>
    <div class="list">
      <div v-for="(item, index) in list" :key="index">
        <div v-if="item.isShow" class="item flex flex_middle flex_justify" @click="choose(item.code)">
          <span class="txt1">{{ item.country }}</span>
          <span class="txt2">{{ item.code }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { phoneCode } from '@/utils/constants'

export default {
  name: "ChoiceAreaNo",
  data() {
    return {
      list: [],
      sreachTxt: ''
    }
  },
  created: function() {
    this.$store.state.user.noheader = false
    this.init()
    this.standalone = window.navigator.standalone || false
  },
  methods: {
    // 选择完成
    choose(val) {
      // this.$store.dispatch('user/setAreaNo', val)
       window.localStorage.setItem("areaNo", val);
      this.$router.go(-1)
    },
    // 搜索事件
    sreach() {
      this.list.forEach((item, index) => {
        if (item.country.indexOf(this.sreachTxt) >= 0 || item.code.indexOf(this.sreachTxt) >= 0) {
          item.isShow = true
        } else {
          item.isShow = false
        }
      })
    },
    // 初始化
    init() {
      const codes = phoneCode.codes
      const countrys = phoneCode.countrys_cn
      codes.forEach((item, index) => {
        this.list.push({
          country: countrys[index],
          code: '+' + codes[index],
          isShow: true
        })
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .ChoiceAreaNo_box{
      .sreach_placeholder{
          height: 1.12rem;
      }
      .sreach_box{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: .2rem .3rem;
          background: #DCDCDC;
          &.standalone{
              top: .88rem;
          }
          .sreach{
              background: #fff;
              border-radius: .2rem;
              width: 100%;
              padding-right: .2rem;
              .sreach_img{
                  margin: 0 .16rem;
                  width: .28rem;
                  height: .28rem;
              }
              .sreach_input{
                  height: .72rem;
                  font-size: .34rem;
              }
          }
      }
      .list{
          padding: 0 .3rem;
          .item{
              height: .88rem;
              border-bottom: 1px solid rgba(0,0,0,0.1);
              .txt1{
                  font-size: .26rem;
                  color:rgba(0,0,0,0.8);
              }
              .txt2{
                  font-size: .26rem;
                  color:rgba(128,128,128,1);
              }
          }
      }
  }
</style>
