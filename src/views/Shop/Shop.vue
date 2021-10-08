<template>
    <div id="shopContainer">
        <ShopHeader :info="info"/>
        <div class="tabs" ref="boxb">

            <div class="tab-item">
                <router-link to="/shop/goods">点餐</router-link>
            </div>
            
            <div class="tab-item">
                <router-link to="/shop/rating">评价</router-link>
            </div>
            
            <div class="tab-item">
                <router-link to="/shop/info">商家</router-link>
            </div>
        </div>
         <router-view></router-view>
    </div>
</template>


<script>
    import ShopHeader from "./ShopHeader"
    import {SAVE_RATINGS,SAVE_INFO,SAVE_GOODS,SAVE_CARTSHOPS} from "../../store/modules/Shop/mutations-type"
    import {mapState} from "vuex"
    export default {
        components:{
            ShopHeader
        },
        computed:{
            ...mapState({
               goods:state=>state.Shop.goods,
               info:state=>state.Shop.info,
               ratings:state=>state.Shop.ratings
            })
        },
        async mounted() {
            //页面刚上来的时候判断一下是否是第一次进入
            let ShopDetali = JSON.parse(sessionStorage.getItem("keep_shop_list"));
            if(ShopDetali) { 
                //如果不是第一次进入,把之前存下的值重新赋值
                this.$store.commit(SAVE_GOODS,ShopDetali.goods);
                this.$store.commit(SAVE_INFO,ShopDetali.info);
                this.$store.commit(SAVE_RATINGS,ShopDetali.ratings);

                //因为vuex中的cartShops 不是计算属性,所以要手动修改它原来的值
                let cartShops = ShopDetali.goods.reduce((pre,good)=>{
                    pre.push(...good.foods.filter(food => food.count > 0))
                    return pre
                },[]);
                this.$store.commit(SAVE_CARTSHOPS,cartShops)
            } else {
                //第一次进入发送请求
                this.$store.dispatch("getShopDatasAction");
            }
            
           window.addEventListener("unload",()=>{
               //在页面刷新时将最新的值保存在sessionStorage中
               //因为vue是单页面应用,所以这个方法不一定会调用,所以需要beforeDestroy的双重保险
               sessionStorage.setItem("keep_shop_list",JSON.stringify({goods:this.goods,info:this.info,ratings:this.ratings}))
           })
        },
        beforeDestroy() {
            //在路由页面摧毁时也重新刷新页面
            sessionStorage.setItem("keep_shop_list",JSON.stringify({goods:this.goods,info:this.info,ratings:this.ratings}))
        },
    }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
    #shopContainer
        .tabs
            display flex
            top-border-1px(rgba(7,17,27,0.1))
            bottom-border-1px(rgba(7,17,27,0.2))
            .tab-item
                flex 1
                height 40px
                text-align center
                line-height 40px
                font-size 14px
                a
                    display block
                    position relative
                    color gray
                    &.router-link-active
                        color $green
                        &:after
                            content " "
                            position absolute
                            transform  scaleY(0.5)
                            height 4px
                            width 40px
                            background-color $green
                            bottom 0
                            left 50%
                            margin-left -20px

</style>