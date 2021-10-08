<template>
   <div class="star star-24">
        <span class="star-item" :class="star" v-for="(star) in StarsFilter" :key="star.index"></span>
       
    </div>
</template>

<script>
    export default {
        props:{
            rating:{
                type:Number
            }
        },
        computed:{
            StarsFilter() {
              /**
                思路： 
                  先把全星的输出出来，再用总数减去全星，如果大于零，就输出半星，
                  剩下的看数组长度，如果数组长度没有到五，那么其他的就输出没星
               */
                let result = []
                let rating = this.rating;
                //1. 输出全星
                let stars = Math.floor(rating);
                for(let i = 0; i<stars ; i++) {
                        result.push("on") 
                };
                //2.输出半星   2.5 - 2 > 0
                (rating - stars  > 0) &&  result.push("half") 

                //3.输出没星
                while(result.length < 5) {
                    result.push("off");
                }
                return result
            },
        }
    }
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins";

 .star //2x图 3x图
                            float left
                            font-size 0
                            .star-item
                              display inline-block
                              background-repeat no-repeat
                            &.star-48
                              .star-item
                                width 20px
                                height 20px
                                margin-right 22px
                                background-size 20px 20px
                                &:last-child
                                  margin-right: 0
                                &.on
                                  bg-image('../../assets/images/stars/star48_on')
                                &.half
                                  bg-image('../../assets/images/stars/star48_half')
                                &.off
                                  bg-image('../../assets/images/stars/star48_off')
                            &.star-36
                              .star-item
                                width 15px
                                height 15px
                                margin-right 6px
                                background-size 15px 15px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../assets/images/stars/star36_on')
                                &.half
                                  bg-image('../../assets/images/stars/star36_half')
                                &.off
                                  bg-image('../../assets/images/stars/star36_off')
                            &.star-24
                              .star-item
                                width 10px
                                height 10px
                                margin-right 3px
                                background-size 10px 10px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../assets/images/stars/star24_on')
                                &.half
                                  bg-image('../../assets/images/stars/star24_half')
                                &.off
                                  bg-image('../../assets/images/stars/star24_off')
</style>