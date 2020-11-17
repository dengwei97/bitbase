<template>
  <div
    v-clipboard:copy="text"
    v-clipboard:success="clipboardSuccess"
    class="copy_box_zj img-box"
  >
    <img class="copyimg" src="@/assets/transactions/ico_copys.png" alt="" />
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      text: {
        type: String | Number
      }
    },

    data() {
      return {};
    },
    computed: {},
    mounted() {
    },
    methods: {
      clipboardSuccess() {
        this.$toast.success("复制成功");
      }
    }
  };
</script>

<style lang="less" scoped>
    .copy_box_zj {
        width: 12px;
        height: 12px;
        cursor: pointer;
        .copyimg {
            width: 100%;
            height: 100%;
        }
    }

    @media (max-width: 767px) {
        .copy_box_zj {
            width: 0.24rem;
            height: 0.24rem;
        }
    }
</style>
