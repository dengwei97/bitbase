<template>
  <div>
    <div v-if="popup" class="pop_absolute_box">
      <div class="pop_absolute_box_bg"></div>
      <div v-if="popup" class="popup">
        <ul class="pop_center">
          <div class="pop_tits">
          <div class="tit">选择挂单类型</div>
            <div class="closed" @click="popup = false">
              <img src="@/assets/transactions/ico_close_small.png" alt />
            </div>
          </div>
          <li
            v-for="(item,index) of payType"
            :key="index"
            class="center_item"
            @click="payment(item)"
          >
            <div class="item_imgs">
              <div class="tit">{{ item.type }}</div>
            </div>
            <div v-if="active == item.value" class="yes">
              <img src="@/assets/transactions/ico_check_select.png" alt />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: false, // 选择支付方式
      active: 1, // 支付的方式
      payType: [
        {
          type: "C2C挂单",
          value: 2
        },
        {
          type: "大宗挂单",
          value: 1
        },
       
      ]
    };
  },

  created() {},

  methods: {
    show(val) {
      this.active = val
      this.popup = true
    },
    // 支付类型
    payment(item) {
      this.active = item.value;
      setTimeout(() => {
        this.popup = false;
        this.$emit('payment', item.value)
      }, 500);
    }
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
    .tit {
      font-family: PingFangSC;
      font-size: 0.32rem;
      color: #40405e;
    }
    .pop_tits {
      height: 1.04rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .closed {
        width: 0.32rem;
        height: 0.32rem;
        display: flex;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .center_item {
      height: 1.12rem;
      display: flex;
      border-top: 1px solid #f2f2f2;
      align-items: center;
      justify-content: space-between;
      .item_imgs {
        display: flex;
        align-items: center;
        .center_type {
          width: 0.56rem;
          height: 0.56rem;
          margin-right: 0.24rem;
        }
      }
      .yes {
        display: flex;
        img {
          width: 0.24rem;
          height: 0.18rem;
        }
      }
    }
  }
}

</style>
