<template>
      <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" @click="messageLogin = true" :class="{on:messageLogin}">短信登录</a>
            <a href="javascript:;" @click="messageLogin = false " :class="{on:!messageLogin}">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <!-- 短信登录 -->
            <div :class="{on:messageLogin}">
              <section class="login_message">
                <input 
                name="phoneVerify" 
                @blur="errorMsg(errors.has('phoneVerify'),
                errors.first('phoneVerify'))"  
                v-validate="'required|phoneVerify'" 
                v-model="phone" type="tel" maxlength="11" placeholder="手机号">
                <!-- disabled="disabled" 禁止操作表单项 -->
                <!-- from表单内的button默认有一个提交表单的默认事件 -->
                <!-- disabled为false时才能操作 -->
                <button 
               
                @click.prevent="sendMessage" 
                :disabled="handleDisabled" 
                :class="{confirmPhone:confirmPhone}"
                class="get_verification">{{countDownTime?`${countDownTime}s后可重新获取`:'获取验证码'}}</button>

              </section>
              <section class="login_verification">
                <input 
                v-model="message"
                @blur="errorMsg(errors.has('messageVerify'),errors.first('messageVerify'))"
                 name="messageVerify"
                v-validate="'required|messageVerify'"
                type="tel" maxlength="8" placeholder="验证码">

              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <!-- 密码登录 -->
            <div :class="{on:!messageLogin}">
              <section>
                <section class="login_message">
                  <input v-model="userName" @blur="errorMsg(errors.has('usernameVerify'),errors.first('usernameVerify'))"  name="usernameVerify"  v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                </section>
                <section class="login_verification">
                  <input v-model="pwd" @blur="errorMsg(errors.has('userPwdVerify'),errors.first('userPwdVerify'))" name="userPwdVerify" v-validate="'required'" :type="showPwd ? 'tel' :'password'" maxlength="8" placeholder="密码">
                  <div  @click="showPwd = !showPwd" :class="showPwd ? 'on' : 'off'" class="switch_button">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd ? "abc" : "..."}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input v-model="code" @blur="errorMsg(errors.has('codeVerify'),errors.first('codeVerify'))" name="codeVerify" v-validate="'required'" type="text" maxlength="11" placeholder="验证码">
                  
                  <!-- href src 都是可以直接发送请求的 -->
                   <!-- 
                     当点击时修改验证码
                     1.先要获取当前的标签元素 ==> ref
                     2.在函数中将src进行改变
                    -->
                  <img ref="captcha" @click="captchaChange" class="get_verification" src="http://localhost:4000/captcha" alt="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
 

    </section>
</template>

<script>
    export default {
        data() {
          return {
            messageLogin: true,  //默认短信登陆
            showPwd:false, //是否显示密码
            phone:'' ,//手机号码
            message:"",
            userName:"",
            pwd:"",
            code:"",
            countDownTime:0
            //confirmPhone
          }
        },
        computed:{
            confirmPhone() {
                return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
            },
            handleDisabled() {
              // this.confirmPhone时说明手机验证码通过
              // 当手机验证码通过之后再判断倒数是否为零,如果为零才能发送短信
              return this.confirmPhone && this.countDownTime == 0 ? false : true
            },
        },
 
        methods: {
          errorMsg(token,tokenMsg) {
            if(token) {
              // console.log(this);
              this.$Message.warning({content:tokenMsg,duration:1.5,closable: true})
            }
          },
          captchaChange() {
            /**
             * this.$refs.captcha.src = "http://localhost:4000/captcha";
             * 
             * 这个方法为什么行不通？
             *   src属性当请求的地址没有发生改变时是不会进行改变的
             * 
             * 为什么携带了query参数却不会报错？
             *   携带了参数但是后台没有写接收的话其实就是一个无用的值
             */
            this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
          },
          async sendMessage() {
            // 在我点击之后disabled应该为true,不能再操作这个button
            // 但是只是这样做没办法让button的disabled为false
            this.countDownTime = 5;
            // 发送短信
            const result = await this.$API.SendCode(this.phone)
            result.code == 1 ? this.$Message.error("发送失败") :this.$Message.success("短信已发送")
            
            const intervalId = setInterval(()=>{
              this.countDownTime--;
              this.countDownTime === 0 && clearInterval(intervalId)  
            },1000)
            console.log(result);
          },
          async login() {
            // this.$validator.validateAll() 这个方法会对所有使用过validate的规则进行验证
            //  但是，是所有的表单，但是这里需要的是对某些规则进行验证，可以传递一个以name属性的数组
            let {messageLogin,phone,message,userName,pwd,code}  = this
            // 判断是短信登录还是账号登录
            let names = messageLogin ? ['phoneVerify','messageVerify'] : ['usernameVerify','userPwdVerify','codeVerify']
            // 返回的是一个布尔值
            const Verify = await this.$validator.validateAll(names) // 对所有表单项进行验证
            // let result
            if(Verify) {  //前端验证通过后
              //后端验证
              let result
              if(messageLogin) {  //手机短信登录
               result = await this.$API.loginWithMessage({phone,code:message})

              }else {  //用户名登录
               result = await this.$API.loginWithUserName({name:userName,pwd,captcha:code})
              }

              
                if(result.code === 0){  //如果请求成功
                    //将数据保存到vuex
                    this.$store.dispatch("getuserDetailAction",result.data)
                    this.$Message.success({
                      background: true,
                      content:  "登录成功"
                    })
                    this.$router.replace("/profile")
                } else {
                    this.code = ''
                    this.captchaChange()
                    this.$Message.error({
                    background: true,
                    content:  result.msg
                  })

                }
             
              // console.log(this.$Message);
              // console.log('a');
            }else {
              this.$Message.error({
                background: true,
                content: '验证失败'
              })
              // console.log('b');
            }
          }
        },
    }
</script>

<style lang="stylus" scoped>
.loginContainer
      width 100%
      height 100%
      background #fff
    
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.confirmPhone
                    color #333
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 40px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)


              .login_hint
                margin-top 20px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>