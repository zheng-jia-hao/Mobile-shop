import {
	SAVE_USERADDRESS,
	SAVE_CATEGORYS,
	SAVE_SHOPLIST,
	SAVE_USERDETAIL,
	SAVE_USERTOKEN,
	LOG_OUT,
} from "./mutations-types.js"

export default {
	[SAVE_USERADDRESS](state, userAddress) {
		state.userAddress = userAddress
		// console.log(userAddress)
	},
	[SAVE_CATEGORYS](state, categorys) {
		state.categorys = categorys
	},
	[SAVE_SHOPLIST](state, shoplist) {
		state.shoplist = shoplist
	},
	[SAVE_USERDETAIL](state, user) {
		state.userDetail = user
	},
	[SAVE_USERTOKEN](state, token) {
		state.token = token
	},
	[LOG_OUT](state) {
		localStorage.removeItem("token_key")
		state.userDetail = {}
		state.token = ""
	},
}
