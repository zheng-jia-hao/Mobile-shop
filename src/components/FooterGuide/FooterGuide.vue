<template>
    <div id="footerContainer">
        <div :class="{active:$route.path==='/msite'}" @click="goPath('/msite')" class="guideItem">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </div>

        <div :class="{active:$route.path==='/search'}" @click="goPath('/search')" class="guideItem">
            <i class="iconfont icon-sousuo"></i>
            <span>搜索</span>
        </div>
        
        <div :class="{active:$route.path==='/order'}" @click="goPath('/order')" class="guideItem">
            <i class="iconfont icon-dingdan"></i>
            <span>订单</span>
        </div>
        
        <div :class="{active:$route.path==='/profile'}" @click="goPath('/profile')" class="guideItem">
            <i class="iconfont icon-tubiaolunkuo-"></i>
            <span>我的</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            goPath(path) {
                // console.log(this.$router);
                // 如果当前路由路径不等于传递的路径，才让它进行路由跳转,主要是解决同路径的自跳转
                this.$route.path !== path && this.$router.push(path);
            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixins.styl';
    #footerContainer
        display flex
        top-border-1px(#eee)
        position fixed 
        background-color #fff
        left 0
        bottom 0
        width 100%
        height 50px
        box-sizing border-box
        .guideItem
            width 25%
            height 50px
            text-align center
            display flex
            flex-direction column
            &.active
                color $green
            .iconfont
                font-size 24px
                line-height 30px
</style>