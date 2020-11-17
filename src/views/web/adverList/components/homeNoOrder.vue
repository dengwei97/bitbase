<template>
  <div class="homeNoOrder">
    <div>
      <img src="@/assets/transactions/ico_web_norea.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeNoOrder",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.homeNoOrder {
  width: 100%;
  height: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 64px;
    height: 94px;
  }
}
@media (max-width: 1200px) {
  .homeNoOrder {
    height: 290px * 0.8;
    img {
      width: 64px * 0.8;
      height: 94px * 0.8;
    }
  }
}
@media (max-width: 960px) {
  .homeNoOrder {
    height: 290px * 0.6;
    img {
      width: 64px * 0.6;
      height: 94px * 0.6;
    }
  }
}
</style>

