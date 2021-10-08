<template>
      <section class="profile">
        <!-- <header class="header">
          <a class="header_title">
            <span class="header_title_text">我的</span>
          </a>
        </header> -->
        <GshopHeader :title="'我的'"></GshopHeader>
        <section class="profile-number">
          <a href="javascript:" class="profile-link">
            <div class="profile_image">
              <i class="iconfont icon-wode"></i>
            </div>
            <div class="user-info" @click="goLoginPage">
               <!-- 
                    这里的if用的秒！
                    需求：
                       1.当手机短信登录时，不显示用户名
                       2.当用户名登录时，不显示手机号
                       3.当未登录时，两者都要显示
                -->
              <p v-if="!userDetail.phone" class="user-info-top" >{{ userDetail.name?userDetail.name:"登录/注册"}}</p>
              <p v-if="!userDetail.name">
                <span class="user-icon">
                  <i class="iconfont icon-shouji icon-mobile"></i>
                </span>
                <span class="icon-mobile-number">{{userDetail.phone?userDetail.phone:"暂无绑定手机号"}}</span>
              </p>
            </div>
            <span class="arrow">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </a>
        </section>
        <section class="profile_info_data border-1px">
          <ul class="info_data_list">
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0.00</span>元</span>
              <span class="info_data_bottom">我的余额</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>个</span>
              <span class="info_data_bottom">我的优惠</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>分</span>
              <span class="info_data_bottom">我的积分</span>
            </a>
          </ul>
        </section>
        <section class="profile_my_order border-1px">
          <!-- 我的订单 -->
          <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-order-s"></i>
            </span>
            <div class="my_order_div">
              <span>我的订单</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
          <!-- 积分商城 -->
          <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-jifen"></i>
            </span>
            <div class="my_order_div">
              <span>积分商城</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
          <!-- 硅谷外卖会员卡 -->
          <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-vip"></i>
            </span>
            <div class="my_order_div">
              <span>硅谷外卖会员卡</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
        </section>
        <section class="profile_my_order border-1px" >
          <!-- 服务中心 -->
          <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-fuwu"></i>
            </span>
            <div class="my_order_div">
              <span>服务中心</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
        </section>

          <!-- 退出登录 -->
         <section class="profile_my_order border-1px">
           <!-- mint-ui内的元素组件标签都以mt 开头 -->
           <mt-button type="danger" style="width:100%; margin-top:30px" @click="confirmLogOutBox">退出登录</mt-button>
        </section>
      </section>
</template>

<script>
    import {LOG_OUT} from "../../store/mutations-types"
    import {SAVE_CARTSHOPS} from "../../store/modules/Shop/mutations-type"
    import { MessageBox } from "mint-ui"
    import {mapState} from 'vuex'
    export default {
        methods:{
          goLoginPage() {
            !this.$store.state.userDetail._id && this.$router.replace("/login")
          },
          confirmLogOutBox() {
            // mint-ui 内的js组件都是基于promise开发的所以都可以使用.then获取结果
            if(this.$store.state.userDetail._id) {
                MessageBox.confirm("确认退出？").then(
                Agree => {
                  this.$store.commit(LOG_OUT);
                  this.$router.replace("/login")
                  this.$store.commit(SAVE_CARTSHOPS,[])
                  sessionStorage.clear()
                }, 
                Reject => ""
              )
            }else {
              this.$router.replace("/login")
            }
          } 
        },
        computed:{
          ...mapState({
            userDetail:(state) => state.userDetail
          })
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixins.styl';
    .profile //我的
          width 100%
          .profile-number
            margin-top 45.5px
            .profile-link
              clearFix()
              position relative
              display block
              background #02a774
              padding 20px 10px
              .profile_image
                float left
                width 60px
                height 60px
                border-radius 50%
                overflow hidden
                vertical-align top
                line-height 60px
                .icon-wode
                  background #e4e4e4
                  // font-size 60px
                  display block
                  width 100%
                  height 100%
                  font-size 60px
                  margin 0px
                  padding 0px
              .user-info
                float left
                margin-top 8px
                margin-left 15px
                p
                  font-weight: 700
                  font-size 18px
                  color #fff
                  &.user-info-top
                    padding-bottom 8px
                  .user-icon
                    display inline-block
                    margin-left -15px
                    margin-right 5px
                    width 20px
                    height 20px
                    .icon-mobile
                      font-size 30px
                      vertical-align text-top
                  .icon-mobile-number
                    font-size 14px
                    color #fff
              .arrow
                width 12px
                height 12px
                position absolute
                right 15px
                top 40%
                .icon-jiantou1
                  color #fff
                  font-size 5px
          .profile_info_data
            bottom-border-1px(#e4e4e4)
            width 100%
            background #fff
            overflow hidden
            .info_data_list
              clearFix()
              .info_data_link
                float left
                width 33%
                text-align center
                border-right 1px solid #f1f1f1
                .info_data_top
                  display block
                  width 100%
                  font-size 14px
                  color #333
                  padding 15px 5px 10px
                  span
                    display inline-block
                    font-size 30px
                    color #f90
                    font-weight 700
                    line-height 30px
                .info_data_bottom
                  display inline-block
                  font-size 14px
                  color #666
                  font-weight 400
                  padding-bottom 10px
              .info_data_link:nth-of-type(2)
                .info_data_top
                  span
                    color #ff5f3e
              .info_data_link:nth-of-type(3)
                border 0
                .info_data_top
                  span
                    color #6ac20b
          .profile_my_order
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .vertical-center-modal
              display flex
              align-items center
              justify-content center
              .ivu-modal
                top 0
            .my_order
              display flex
              align-items center
              padding-left 15px
              >span
                display flex
                align-items center
                width 20px
                height 20px
                >.iconfont
                  margin-left -10px
                  font-size 30px
                .icon-order-s
                  color #02a774
                .icon-jifen
                  color #ff5f3e
                .icon-vip
                  color #f90
                .icon-fuwu
                  color #02a774
              .my_order_div
                width 100%
                border-bottom 1px solid #f1f1f1
                padding 18px 10px 18px 0
                font-size 16px
                color #333
                display flex
                justify-content space-between
                span
                  display block
                .my_order_icon
                  width 10px
                  height 10px
                  .icon-jiantou1
                    color #bbb
                    font-size 10px
  
</style>