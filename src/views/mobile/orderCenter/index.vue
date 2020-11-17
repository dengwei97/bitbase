<template>
  <div class="data">
    <ul>
      <li>
        <router-link to='/mAdverList'>
        <span>挂单管理</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1.05442L1.04494 0L6 5L1.04494 10L0 8.94558L3.90952 4.99973L0 1.05442Z" fill="#D5D5ED"/>
</svg>

        </router-link>
      </li>
      <li>
        <router-link to='/mallOrderList'>
        <span>订单管理</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1.05442L1.04494 0L6 5L1.04494 10L0 8.94558L3.90952 4.99973L0 1.05442Z" fill="#D5D5ED"/>
</svg>

        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created(){
    this.$store.state.user.noheader = false;
  },
}
</script>

<style lang='less' scoped>
.data{
  background: #F7F7FA;
  min-height: 100vh;
  padding: 0.32rem;
  ul{
    background: #FFFFFF;
    border-radius: 0.12rem;
    padding: 0 0.32rem;
    li {

      border-bottom: 1px solid #EDEDF2;
      a{
       display: flex;
       justify-content: space-between;
       align-items: center;
       font-size: 0.28rem;
       color: #40405E;
       padding: 0.32rem 0;
     }
       &:last-child{
          border-bottom: none;
        }
    }
  }
}
</style>