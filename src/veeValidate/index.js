/**
 *  vee-valitate 是一个vue的扩展库
 *  专门用于验证表单信息
 */
import Vue from "vue"
import VeeValidate from "vee-validate"

Vue.use(VeeValidate)
//将他引入main.js  让它能够执行

/**
 * 使用：
 *  1.在需要验证的input表单中定义name属性
 *  2.在vue.use()后，会自动添加一个全局指定 v-validate
 *    在 v-validate中写入规则 v-validate="'required(必须)|input中的name'"
 *  3. <span style="color: red;" v-show="errors.has('myemail')">{{ errors.first('myemail') }}</span>
 *   errors.has('myemail')"括号中指定需要验证的name ， errors.first('myemail')报错指定验证的name
 *
 */

import zh_CN from "vee-validate/dist/locale/zh_CN"
VeeValidate.Validator.localize("zh_CN", {
	//信息本地化，将VeeValidate中names属性修改为中文
	messages: zh_CN.messages,
	attributes: {
		phoneVerify: "手机号码",
		messageVerify: "验证码",

		usernameVerify: "用户名",
		userPwdVerify: "密码",
		codeVerify: "验证码",
	},
})

// 短信登录
VeeValidate.Validator.extend("phoneVerify", {
	validate: (value) => {
		return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
	},
	getMessage: (field) => field + "存在且准确",
})

VeeValidate.Validator.extend("messageVerify", {
	validate: (value) => {
		return /^\d{4,6}$/.test(value)
	},
	getMessage: (field) => field + "应该是4-6位的数字",
})

//账号密码登录
// VeeValidate.Validator.extend("usernameVerify", {
// 	validate: (value) => {
// 		return /^\d{4,6}$/.test(value)
// 	},
// 	getMessage: (field) => field,
// })
// VeeValidate.Validator.extend("userPwdVerify", {
// 	validate: (value) => {
// 		return /^\d{4,6}$/.test(value)
// 	},
// 	getMessage: (field) => field,
// })

// VeeValidate.Validator.extend("codeVerify", {
// 	validate: (value) => {
// 		return /^\d{4,6}$/.test(value)
// 	},
// 	getMessage: (field) => field,
// })
