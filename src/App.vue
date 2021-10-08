<template>
  <div>
    <!-- <keep-alive v-if="this.$store.state.userDetail._id"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
     <!-- <router-view v-else></router-view> -->
    <!-- 控制底部footer不显示在login路由组件中 -->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import { SAVE_USERDETAIL } from "./store/mutations-types"
import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    
    components:{
      FooterGuide
    },
    async mounted() {
      if(localStorage.getItem("token_key")) {
        let result = await this.$API.autoLogin();
        this.$store.commit(SAVE_USERDETAIL,result.data);
      }
    }
  }
</script>

<style lang="stylus">

</style>