<template>
  <section class="msite">
    <!--首页头部-->
    <!-- <header class="header">
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          <span class="header_title">
              <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
            </span>
          <span class="header_login">
              <span class="header_login_text">登录|注册</span>
            </span>
        </header> -->

    <!-- 注意这里的插槽是v-slot 是以冒号的方式标识 -->
    <GshopHeader :title="title || '地址查找中...'">
      <template v-slot:left>
        <span class="header_search">
          <i class="iconfont icon-sousuo" @click="GoSearch"></i>
        </span>
      </template>

      <!-- <span class="header_login" slot="fight">
              <span class="header_login_text">登录|注册</span>
            </span> -->

      <template v-slot:right>
        <span class="header_login">
          <span class="header_login_text" @click="meOrlogin" >{{$store.state.userDetail ? "我的" :"登录|注册"}}</span>
        </span>
      </template>
    </GshopHeader>
    <!--首页导航-->
    <nav class="msite_nav"  v-if="showMaks">
      <!-- 头部的导航和轮播都是通过swiper插件实现的
           只要用到了这个插件就必须在外包裹一个类：swiper-container
           轮播图的类：swiper-wrapper
           swiper-slide控制轮播页数
           swiper-pagination轮播跳转的小圆点

           当前的问题是： 
                1.请求回来的数据是一个整体为16的数组，但是要将这个数组塞到swiper-slide
                  因为是两页，所以需要将这个数组切割，并且v-for便利
       -->
      <div class="swiper-container">
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(category,index) in newCategorys" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(categoryItem) in category" :key="categoryItem.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+categoryItem.image_url" />
              </div>
              <span>{{categoryItem.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="msite_nav" v-else>
      <img src="./images/msite_back.svg" alt="loading">
    </div>
    
    <!--首页附近商家-->
    <ShopList />
   </section>
</template>

<script>
import ShopList from "../../components/ShopList/ShopList"
import { mapState } from "vuex";
// import _ from "lodash";  //lodash 向外暴露的就是一个下划线
//按需导入lodash
// import chunk form "lodash/chunk"
import Swiper from "swiper";
//swiper的样式 必须在script标签中引入
import "swiper/css/swiper.min.css"
/**
 * 注意:swiper版本不同引入样式的路径不同,可能会导致轮播的小圆点样式消失
 * 最好使用swiper5的版本
 */
export default {
  name: "App",
  components:{
    ShopList
  },
  mounted() {
     

    //需要网络才能发起
    this.$store.dispatch("getAddressAction")
      
    // this.$store.state.userAddress &&   

    this.$store.dispatch("getCategorysAction")
   
  },
   computed: {
    ...mapState({
      title: (state) => state.userAddress.address,
      categorys: (state) => state.categorys
    
    }),

    newCategorys(){
      // return _chunk(this.categorys,8)  lodash
      // console.log(a);
      return this._chunk(this.categorys,8)
    },

    showMaks() {
      return this.newCategorys.length>0 ? true : false
    }
  },
  watch :{
    newCategorys() {  
    // //   /**
    // //    * 解决swiper滑动的问题:
    // //    *   1.为什么不能滑动了？
    // //    *      swiper的滑动是基于new Swiper的这个方法执行时，
    // //    *        指定标签swiper-wrapper内的数据,但是当前数据是异步获取的所以会晚一步
    // //    *   
    // //    *    2.如何解决：
    // //    *       解决方法很简单，只要等actions进行commit之后数据传递到了mutions时在new Swiper即可
    // //    *       当下执行的 this.$nextTick就是等数据遍历之后的下一个函数调用时进行new Swiper的操作即可解决
    // //    */
      this.$nextTick(()=>{   //当前区域所在函数的下一次调用时执行该函数
          new Swiper ('.swiper-container', {
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // observer: true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents: true,//修改swiper的父元素时，自动初始化swiper
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
      })
    }
  },
  methods:{
    GoSearch() {
      this.$router.push("/search")
    },
    meOrlogin() {
      if(this.$store.state.userDetail) {
        this.$router.push("/profile")
      }
    },
    _chunk(target,length) {

          let result = [];
            if( typeof length !== 'number' || length < 1  || length > target.length || !(target instanceof Array)) return target;
            if(Math.floor(length) === target.length || Math.floor(length) === 1) {
                while(target.length) {
                    result.push(target.splice(0,1))
                }
                return result;
            }
            while(target.length){
                result.push(target.splice(0,length));
            }
            return result;
    }
  }

};
</script>

<style lang="stylus" scoped>
// 样式中如果添加scoped , 会使自己给swiper的样式被swiper内部的样式抵消
// 深度选择器： /deep/ 能使它后面写的类名中的样式不受scoped的控制
@import '../../common/stylus/mixins.styl';
.msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
        // 深度选择器： /deep/ 能使它后面写的类名中的样式不受scoped的控制
        // css的深度选择器 : >>>
          /deep/>span.swiper-pagination-bullet-active
            // background #02a774 !important  像这样并不能实现小圆点的背景色
            background:#02a774
</style>
