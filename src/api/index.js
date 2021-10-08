import ajax from "./axios.js"

//根据经纬度获取位置详情
export const getAddress = (latitude, longitude) =>
	ajax({
		url: `/position/${latitude},${longitude}`,
	})

//获取食品分类列表
export const getCategorys = () => ajax({ url: "/index_category" })

export const getShopList = (latitude, longitude) =>
	ajax({
		url: "/shops",
		query: {
			latitude,
			longitude,
		},
	})
// 发送手机短信
export const SendCode = (phone) =>
	ajax({
		url: "/sendcode",
		params: {
			phone,
		},
	})

//用户名登录
export const loginWithUserName = ({ name, pwd, captcha }) =>
	ajax({
		url: "/login_pwd",
		method: "POST",
		data: {
			name,
			pwd,
			captcha,
		},
	})

//手机短信登录
export const loginWithMessage = ({ phone, code }) =>
	ajax({
		url: "/login_sms",
		method: "POST",
		data: {
			phone,
			code,
		},
	})

// 读取token 实现自动登录
// 后端读取token就是在headers里
/**
 * 刷新后vuex数据丢失是什么原因： vuex的数据是保存在运行内存中的，当页面刷新将重新分配内存空间重新渲染
 *
 * 如何解决vuex刷新后数据丢失： 当页面刷新时重新发送请求获取数据更新vuex中的数据
 */
export const autoLogin = () =>
	ajax({
		url: "/auto_login",
		headers: {
			NeedToken: true,
		},
	})

export const ShopDatas = () => ajax("/shopdatas")
