<template>
  <div>
    <div v-if="popup" class="pop_absolute_box">
      <div class="pop_absolute_box_bg"></div>
      <div v-if="popup" class="popup">
       <div class="pop_center">
				 <div class="item" :class="{active:active == 1}" @click="priceFlag(1)">固定价格</div>
				 <div class="item" :class="{active:active == 2}" @click="priceFlag(2)">动态价格</div>
				 <div class="item" @click="popup = false">取消</div>
			 </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
			popup: false,
			active: 1 ,//1固定价格  2 动态价格
     
    };
  },

  created() {},

  methods: {
		priceFlag(val){
			this.active = val
			setTimeout(() => {
        this.popup = false;
        this.$emit('paymentPrice', val)
      }, 500);
		},
    show(val) {
			if(val){
				this.active = val 
			}
      this.popup = true
    },
    
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: absolute;
  width: 100%;
  max-height: 100%;
  z-index: 1002;
  left: 0;
  bottom: 0.56rem;
  padding: 0 0.32rem;

  .pop_center {
    width: 100%;
    background-color: #fff;
    border-radius: 0.15rem;
    padding: 0 0.32rem;
    .item{
			height: 1.04rem;
			line-height: 1.04rem;
			text-align: center;
			font-size: 0.32rem;
			border-bottom: 1px solid #F5F5FA;
			&:last-child{
				border-bottom: none;
				color: #A0A0B3;
			}
			&.active{
				color: @cl-m;
				font-weight: bold;
			}
		}
  }
}

</style>
