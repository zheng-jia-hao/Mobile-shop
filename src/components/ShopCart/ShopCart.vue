<template>
    <div>
    <div class="shopcart">
        <div class="content">
        <div class="content-left">
            <div class="logo-wrapper" @click="handleShopList">
            <div class="logo" :class="{highlight:totalCount}">
                <i class="iconfont icon-gouwuche" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
            </div>
            <div class="price highlight">￥{{totalPrice}}</div>
            <!-- 这里为什么加个v-if ?
                  因为数据是映射过来的一定会晚点到,而vue是先渲染模板界面的,
                  一旦读到这个属性就会报错,所以添加一个v-if来限制一下
             -->
            <div class="desc" v-if="info">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
            <div class="pay" v-if="info" :class="totalPrice >= info.minPrice ? 'enough' : 'not-enough'">
            {{payContent}}
            </div>
        </div>
        </div>

        <transition name="fade">
            <div class="shopcart-list" v-show="isShowCarts">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="clearCartShops">清空</span>
            </div>
            <div class="list-content">
                <ul>
                <li class="food" v-for="(food,index) in cartShops" :key="index">
                    <span class="name">{{food.name}}</span>
                    <div class="price"><span>￥{{food.price}}</span></div>
                    <div class="cartcontrol-wrapper">
                      <CarsCount :food="food" />
                    </div>
                </li>
                </ul>
            </div>
            </div>
        </transition>
    </div>
  <div class="list-mask" v-show="isShowCarts" @click="isShowCarts =  !isShowCarts"></div>
</div>
</template>

<script>
    import {mapGetters,mapState} from "vuex"
    import CarsCount from "../CarsCount/CarsCount.vue"
    import {CLEAR_CARTSHOPS} from "../../store/modules/Shop/mutations-type"
    import { MessageBox } from "mint-ui"

    // import BScroll from "better-scroll"

    export default {
        data() {
          return {
            isShowCarts:false
          }
        },
        components:{
          CarsCount
        },
        
        computed:{
            // ...mapGetters({})  mapGetters 不允许使用对象作为参数只能用数组的形式
            ...mapGetters(["totalCount","totalPrice"]),
            //获取起送价格和配送费
            ...mapState({
                info:state=>state.Shop.info,
                cartShops:state=>state.Shop.cartShops
                
            }),

            payContent() {
               if(this.info) {
                  let {totalPrice} = this;
                  let pirce = this.info.minPrice
                  let reslut = "";
                  if(totalPrice === 0) {
                      reslut = `${pirce}元起送`
                  }else if(totalPrice > 0  && totalPrice < pirce) {
                      reslut = `还差${pirce - totalPrice}元即可配送`
                  }else {
                      reslut = "结算"
                  }
                  return reslut;
               }else {
                 return ""
               }
            },
        },
        methods: {
          handleShopList() {
            
                if(this.totalCount >0){
                  this.isShowCarts = !this.isShowCarts;
                  // this.caeateBS()
                }
              
                // this.xxxxa.refresh()
          },

          clearCartShops() {
            MessageBox.confirm("确认清空？").then(
              Agree => this.$store.commit(CLEAR_CARTSHOPS),
              Reject => ""
            )
          }
          // caeateBS() {
          //     this.xxxxa = new BScroll(".list-content",{
          //               scrollY:true,
          //               disableTouch: false,
          //               click:true,
          //     })

          // }
        },
        watch:{
          cartShops() {
            if(this.cartShops.length === 0) {
              this.isShowCarts = false
            }
          }
        }
       
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-gouwuche
              line-height: 44px
              font-size: 30px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left 0
      top 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.fade-enter-active, &.fade-leave-active
        transition all .5s
      &.fade-enter, &.fade-leave-to
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        width 100%
        max-height 245px 
        overflow: hidden
        background: #fff
        .food
          position: relative
          height 50px
          width 100%
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>