import { getAddress, getCategorys, getShopList } from "../api"
import {
	SAVE_USERADDRESS,
	SAVE_CATEGORYS,
	SAVE_SHOPLIST,
	SAVE_USERDETAIL,
	SAVE_USERTOKEN,
} from "./mutations-types.js"

export default {
	async getAddressAction({ commit }) {
		//根据经纬度获取位置详情
		let result = await getAddress(40.10038, 116.36867)
		console.log(result.data)
		!!(result.code === 0) && commit(SAVE_USERADDRESS, result.data)
	},

	async getCategorysAction({ commit }) {
		//获取食品分类列表
		let result = await getCategorys()
		!!(result.code === 0) && commit(SAVE_CATEGORYS, result.data)
	},
	async getShoplistAction({ commit }) {
		//根据经纬度获取商铺列表
		let result = await getShopList(40.10038, 116.36867)
		console.log(result.data)
		!!(result.code === 0) && commit(SAVE_SHOPLIST, result.data)
	},

	async getuserDetailAction({ commit }, user) {
		//保存token以后续使用
		commit(SAVE_USERTOKEN, user.token)
		localStorage.setItem("token_key", user.token)
		//删除用户信息里面的token
		delete user.token
		//保存用户信息
		commit(SAVE_USERDETAIL, user)
	},
}
