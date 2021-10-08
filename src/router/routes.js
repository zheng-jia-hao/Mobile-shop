import Msite from "../views/Msite/Msite.vue"
import Profile from "../views/Profile/Profile.vue"
import Order from "../views/Order/Order.vue"
import Search from "../views/Search/Search.vue"
import Login from "../views/Login/login.vue"
import Shop from "../views/Shop/Shop.vue"
import Goods from "../views/Shop/Goods.vue"
import Rating from "../views/Shop/Rating.vue"
import Info from "../views/Shop/Info.vue"

export default [
	//meta 是以对象的方式添加到路由组件中,每个路由组件中的meta只有自身可访问
	{
		path: "/",
		redirect: "/profile",
	},

	{
		path: "/msite",
		component: Msite,
		meta: {
			isShowFooter: true,
		},
	},

	{
		path: "/profile",
		component: Profile,
		meta: {
			isShowFooter: true,
		},
	},

	{
		path: "/order",
		component: Order,
		meta: {
			isShowFooter: true,
		},
	},

	{
		path: "/search",
		component: Search,
		meta: {
			isShowFooter: true,
		},
	},
	{
		path: "/shop",
		component: Shop,
		children: [
			{
				path: "/shop/goods",
				component: Goods,
			},
			{
				path: "/shop/rating",
				component: Rating,
			},
			{
				path: "/shop/info",
				component: Info,
			},
			{
				path: "/shop",
				redirect: "/shop/goods",
			},
		],
	},
	{
		path: "/login",
		component: Login,
	},
]
