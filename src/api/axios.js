import axios from "axios"
import qs from "qs"
import router from "../router"
import { Indicator } from "mint-ui"
import { Message } from "view-design"

//二次封装axios -->  实现请求和相应的拦截

// 1.生成Axios的伪实例，这个伪实例同样拥有axios的方法
const instance = axios.create({
	baseURL: "/api",
})

// 2. 在这个伪实例上添加请求拦截 写法固定,将即将发送请求的请求拦截下来，对其实现修改参数或添加token等
instance.interceptors.request.use((config) => {
	//请求时显示loading
	Indicator.open()
	// config是一个包含当前请求的所有请求信息 例如 method url data
	// 修改post请求参数 ，因为服务器设定的是以url-encoding--> a=xx&b=xx 默认参数是json对象形式
	config.data = qs.stringify(config.data) //json 转 url-encoding

	if (config.headers.NeedToken) {
		const token = localStorage.getItem("token_key")
		if (token) {
			config.headers.Authorization = token
		} else {
			// 当没有token时，就不再需要向下执行代码了，直接让pormise走cath
			throw Error("请先登录")
		}
	}

	return config
})

// 3. 响应拦截器,将发送回来的数据进行处理
instance.interceptors.response.use(
	//响应拦截有两个参数，都是函数，一个是请求成功的回调函数，一个是请求失败的回调函数
	(response) => {
		//隐藏loading
		Indicator.close()
		return response.data
	},
	(error) => {
		if (!error.response) {
			//当我throw Error时，请求并不会发送出去，所以error.response(错误的响应对象)不存在
			// alert(error.message)
			Message.warning(error.message)
			//currentRoute当前的路由地址
			router.currentRoute.path !== "/login" && router.replace("/login")
		} else {
			//请求发出去了，但是错误了
			Indicator.close()
			if (error.response.status === 401) {
				alert("token过期")
				router.currentRoute.path !== "/login" && router.replace("/login")
			} else if (error.response.status === 404) {
				alert("请求资源错误")
			} else {
				alert("请求错误")
			}
		}

		console.log(error)
		//  为什么要return一个空Promise对象？
		//  promise当初设计是为了保证能够链式调用会默认返回一个成功的Promise实例回调防止代码终止，
		//  但是请求失败时它也会返回一个成功的Promise并且寻找下一个.then的方法
		//  当前已经报错了，所以不需要继续向下执行了，所以需要手动添加一个初始化的Promise停止Promise继续寻找下一个.then
		return new Promise(() => {})
	}
)

export default instance
