import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
//mock
import "./mock"

import GshopHeader from "./components/GshopHeader/GshopHeader.vue"
//将发送请求的代码注册成全局
//如果想将分别暴露的方法全部引入可以用  * as xxx
import * as API from "./api"
Vue.prototype.$API = API

import "./veeValidate"
import "lib-flexible/flexible" //flexible实现适配 ， postcss-px2rem实现 px自动计算成rem

// import ViewUI from "view-design"
// Vue.use(ViewUI)
Vue.config.productionTip = false

// view-ui
import { Message } from "view-design"
import "view-design/dist/styles/iview.css"

//mint-ui
import { Button } from "mint-ui"
Vue.component(Button.name, Button)

/**
 * 当按需导入后只是声明使用该组件是没用的，
 * 它只是将组件注册成了全局组件，
 * 还是需要手动将他添加到原型上，如果是Vue.use的话会自动挂载，但是单组件的话要手动挂载
 */

// 挂载到原型是用Vue ,不是用this
Vue.prototype.$Message = Message

Vue.component("GshopHeader", GshopHeader)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
