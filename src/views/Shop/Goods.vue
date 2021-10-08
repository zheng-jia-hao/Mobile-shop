<template>
    <div id="goodsContainer">
        <div class="leftContainer">
            <ul class="navList" ref="leftUl">
                <li @click="changeScrollY(index)" :class="{active: navIndex === index}" v-for="(food,index) in goods" :key="index">{{food.name}}</li>
            </ul>
        </div>
        <div class="rightContainer">
           <div class="foods-wrapper">
                <ul ref="rightUl">
                     <!-- <CarsCount /> -->
                    <li class="food-list-hook" v-for="(food) in goods" :key="food.index">
                    <h1 class="title">{{food.name}}</h1>
                    <ul>
                        <li class="food-item bottom-border-1px" v-for="(foodItem,index) in food.foods" :key="index">
                        <div class="icon">
                            <img width="57" height="57"
                                :src="foodItem.image">
                        </div>
                        <div class="content" >
                            <h2 class="name">{{foodItem.name}}</h2>
                            <p class="desc">{{foodItem.description}}</p>
                            <div class="extra">
                            <span class="count">{{foodItem.sellCount}}</span>
                            <span>好评率{{foodItem.rating}}%</span></div>
                            <div class="price">
                            <span class="now">￥{{foodItem.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                            <CarsCount :food="foodItem"/>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </li>
                </ul>
            </div>
        </div>
        <ShopCart />
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import ShopCart from "../../components/ShopCart/ShopCart"
    import CarsCount from "../../components/CarsCount/CarsCount"
    import BScroll from "better-scroll"
    export default {
        data() {
            return {
              tops:[],
              scrollY:0
            }
        },
        components:{
            CarsCount,
            ShopCart
        },
        computed :{
            ...mapState({
                goods: (state)=> state.Shop.goods
            }),

            navIndex() {
                let {tops,scrollY} = this;
                let index = tops.findIndex((top,index)=>scrollY >= tops[index] && scrollY <tops[index + 1]);
                if(this.leftScroll) {
                    const li = this.$refs.leftUl.children[index];
                    this.leftScroll.scrollToElement(li,300)
                }
                return index
            }
            
        },

        mounted() {
            
            if(this.goods.length >0){
                this.CreateScroll();
                this.initTops();
            };
            if(this.rightScroll) {
                let a = sessionStorage.getItem("scroll")
                // console.log(a);
                // console.log(this.rightScroll);
                this.rightScroll.scrollTo(0,-a,700)
            }
            
        },
        methods:{
            CreateScroll() {
                //better-scroll 页面首次加载无法实现滑动？ 
                /**
                 *   解决方法： 
                 *          当页面刚开始加载better-scroll时，它会自动检测当前使用的是pc还是移动
                 *          如果是pc段 它会给better-scroll 添加一个 disableTouch: true 的值 
                 *          让pc端无法使用touch实现，
                 *          
                 *          而我是使用pc先打开页面才进入调试工具里改成移动端开发界面，所以它会先添加
                 *          disableTouch ： true 才导致页面首次渲染无法滑动的问题，
                 *          只需要将 disableTouch改为false 即可
                 */
               
                
                if(this.leftScroll || this.rightScroll) {  //处理better-scroll创建两次
                    this.leftScroll.refresh();
                    this.rightScroll.refresh();
                }else {
                    this.leftScroll = new BScroll(".leftContainer",{
                    scrollY:true,
                    
                    click:true
                    })
                    this.rightScroll = new BScroll(".rightContainer",{
                        scrollY:true,
                        probeType:2, 
                        disableTouch: false,
                        click:true,
                        // passive: false
                    })

                    this.rightScroll.on("scrollEnd",({x,y})=>{
                        this.scrollY = Math.abs(y);
                    })
                }
                

            },

            initTops() {
                        let lis = Array.from(this.$refs.rightUl.children)
                        let top = 0
                        let tops = []
                        tops.push(top)
                        lis.reduce((pre,item)=>{
                            pre+=item.clientHeight
                            tops.push(pre)
                            return pre
                        },top)
                    
                        this.tops = tops
            },
            changeScrollY(index) {
                    this.rightScroll.scrollTo(0,-this.tops[index],700)

            }
            
        },
        watch:{
            goods() {
                //因为goods是vuex映射的数据，第一次是undefind ,第二次才是真的数据,
                //所以使用$nextTick 在下一次发生改变时调用，
                //但是当切换了路由时，mounted将重新调用，但是goods的数据并没有变化，他不会调用，
                //所以需要在mounted时再次调用 new BScroll
                // console.log(this.goods);
                
                this.$nextTick(()=>{   //当前区域所在函数的下一次调用时执行该函数
                   this.CreateScroll();
                   this.initTops();
                })
            }
        },
        beforeDestroy() {
            sessionStorage.setItem("scroll",this.scrollY);
        },
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    #goodsContainer
        display flex
        overflow hidden
        height calc(100vh - 290px)

        .leftContainer
            width 80px
            background #f3f5f7
            // height 443px  
            //当整个页面的高度减去头部的高度就是443，但是这个443在 iphoneX上面将不行,它的高度要大于iphone6所以会留白
            /**
                解决方案：  
                      1.使用定位    top 224px   bottom 0  定位能使元素标签拉大
                      2. 使用css3 的计算函数 可以用来计算高度/宽度等 calc(100vh - 页头高度)
                            vh,vw 视口单位 1vh = 1%
                            100vh是当前机型的页面高度
             */
            .navList
                li
                    width 100%
                    height 50px
                    line-height 50px
                    font-size 16px
                    text-align center
                    position relative
                    &.active
                        background #ffffff
                        color $green
                    &:after
                        content " "
                        width 70%
                        height 1px
                        background rgba(7,17,27,0.1)
                        position absolute
                        left 15%
                        bottom 0
        .rightContainer
            width 295px
            .foods-wrapper
                flex: 1
                .title
                    padding-left: 14px
                    height: 26px
                    line-height: 26px
                    border-left: 2px solid #d9dde1
                    font-size: 12px
                    color: rgb(147, 153, 159)
                    background: #f3f5f7
                .food-item
                    display: flex
                    margin: 18px
                    padding-bottom: 18px
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child
                        border-none()
                        margin-bottom: 0
                    .icon
                        flex: 0 0 57px
                        margin-right: 10px
                    .content
                        flex: 1
                        .name
                            margin: 2px 0 8px 0
                            height: 14px
                            line-height: 14px
                            font-size: 14px
                            color: rgb(7, 17, 27)
                        .desc, .extra
                            line-height: 10px
                            font-size: 10px
                            color: rgb(147, 153, 159)
                        .desc
                            line-height: 12px
                            margin-bottom: 8px
                        .extra
                            .count
                                margin-right: 12px

                        .price
                            font-weight: 700
                            line-height: 24px
                            .now
                                margin-right: 8px
                                font-size: 14px
                                color: rgb(240, 20, 20)
                            .old
                                text-decoration: line-through
                                font-size: 10px
                                color: rgb(147, 153, 159)
                        .cartcontrol-wrapper
                            position: absolute
                            right: 0
                            bottom: 12px
</style>