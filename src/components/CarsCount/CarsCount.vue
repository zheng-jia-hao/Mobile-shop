<template>
    <div class="cartcontrol">
      <transition name="CarsCount">
        <div class="iconfont icon-jianhao1" v-show="food.count" @click="foodCount(false)"></div>
      </transition>
        <div class="cart-count" v-show="food.count">{{food.count}}</div>
        <div class="iconfont icon-21" @click="foodCount(true)"></div>
    </div>
</template>

<script>
    /**
     *   切换路由再进页面时，点击添加或减少按钮会添加/减少两位是为什么？
     *    
     *   因为当页面一开始加载时mock.js调用之后，会有数据的缓存，
     *   当只是页面刷新时,wach不会执行，因为缓存的原因goods一直没有变化，
     *   而mounted会创建一个better-scroll实例对象,不会导致点击双数的情况
     * 
     *   而在goods组件中mounted 添加的限制将不存在了，
     *   所以在mounted和wath中都会创建better-scroll 的实例，
     *   而在better-scroll的配置对象中的click:true将派发两个点击函数，
     *   所以会导致点击时添加/减少双数
     * 
     *   解决方法：
     *      better-scroll 实例身上有个方法叫 refresh
     *      它能够刷新当前实例对象
     *
     *   
      */                

    export default {
      //当前组件无法添加click事件是因为外部的better-scroll没有添加click属性
        props:{
          food:{
            required:true,
            type:Object
          },
        },

        mounted() {
        },
        methods: {
          foodCount(isAdd) {
            //因为food是来自于goos， 而 goods 来源于vuex，所以改变数据的方法应该定义在vuex
            this.$store.dispatch("foodCountChangeAction",{isAdd,food:this.food})
          }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-jianhao1
      display: inline-block
      padding 4px
      line-height 22px
      font-size 22px
      color $green
      &.CarsCount-enter-active,&.CarsCount-leave-active
        transition all .4s
      &.CarsCount-enter,&.CarsCount-leave-to
        transform translateX(20px) rotate(180deg)
        opacity 0
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 4px
      line-height: 22px
      text-align: center
      font-size: 14px
      color: rgb(147, 153, 159)
    .icon-21
      display: inline-block
      padding: 4px
      line-height: 22px
      font-size: 22px
      color $green
</style>
