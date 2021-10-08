import {
	SAVE_GOODS,
	SAVE_RATINGS,
	SAVE_INFO,
	ADD_FOOD_COUNT,
	DEL_FOOD_COUNT,
	CLEAR_CARTSHOPS,
	SAVE_CARTSHOPS,
} from "./mutations-type"

import Vue from "vue"

const state = {
	ratings: [],
	goods: [],
	info: {},
	cartShops: [],
}

const mutations = {
	[SAVE_GOODS](state, goods) {
		state.goods = goods
	},
	[SAVE_RATINGS](state, ratings) {
		state.ratings = ratings
	},
	[SAVE_INFO](state, info) {
		state.info = info
	},

	[ADD_FOOD_COUNT](state, food) {
		// console.log(food)
		if (food.count > 0) {
			food.count++
		} else {
			Vue.set(food, "count", 1)
			state.cartShops.push(food)
		}
	},

	[DEL_FOOD_COUNT](state, food) {
		if (food.count > 0) {
			food.count--
			if (food.count === 0) {
				state.cartShops.splice(state.cartShops.indexOf(food), 1)
			}
		}
		// else {  //因为有上面的限制， 所以food.count 永远不能小于0 所以走不进else
		// 	console.log("xxx")
		// 	state.cartShops.slice(food, 1)
		// }
	},
	[CLEAR_CARTSHOPS](state) {
		state.cartShops.forEach((food) => (food.count = 0))
		state.cartShops = []
	},
	[SAVE_CARTSHOPS](state, cartShops) {
		state.cartShops = cartShops
	},
}

const actions = {
	async getShopDatasAction({ commit }) {
		// console.log("result")
		// console.log(Vue.prototype)
		let result = await Vue.prototype.$API.ShopDatas()
		if (result.code == 0) {
			const { goods, info, ratings } = result.data
			commit(SAVE_GOODS, goods)
			commit(SAVE_INFO, info)
			commit(SAVE_RATINGS, ratings)
		}
	},
	foodCountChangeAction({ commit }, { isAdd, food }) {
		// Vuex 中的 Aaction 不接受第三个参数，
		//所以如果需要多个参数 需要以对象的方式进行传递
		isAdd ? commit(ADD_FOOD_COUNT, food) : commit(DEL_FOOD_COUNT, food)
	},
}

const getters = {
	totalCount(state) {
		// 计算 商品总数和商品总价格
		/*
			思路： 
				如果要计算总个数和总价钱，不应该从goods这个大数组里面取值，
				如果从这个goods大数组里面取值的话，要便利goods数组内的每一个对象内的foods
				这样的数据量过大，性能较差。

				应该将有conut的food 添加到一个数组中，这样只需要便利这个数组就行
		*/
		// let result = state.goods.reduce((pre, good) => {
		//性能较差，一旦goods内部有一点的改变就将重新调用整个方法
		// 	pre.push(...good.foods.filter((food) => food.count > 0))
		// 	return pre
		// }, [])
		// return result

		return state.cartShops.reduce((pre, food) => {
			return (pre += food.count)
		}, 0)
	},
	totalPrice(state) {
		//计算商品总价格
		return state.cartShops.reduce((pre, food) => {
			return (pre += food.count * food.price)
		}, 0)
	},
}

export default { state, mutations, actions, getters }
