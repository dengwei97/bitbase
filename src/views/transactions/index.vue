<template>
  <div class="transactions">
		<div>
			<div class="flex">
				<span>自选交易</span>
				<span>快捷交易</span>
				<span>大宗交易</span>
			</div>
			<div>

			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
.transactions{
	width: 1200px;
	height: 120px;
	margin: 0 auto;
	.flex{
		display: flex;
		align-items: center;
	}
}
</style>