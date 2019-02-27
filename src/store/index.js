import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'

Vue.use(Vuex)

// 需要全局维护的状态
const state = {
	// appId : 'wx4f9521f88802fb91' ,
	token : null,
	// roleId:2,//账号角色 1：店铺管理员；2：讲师；3：读者
	isLogin : false,
	userInfo : null,
	uploadImageHead:null,
	appId : null,
	applyForm:null,
	storeInfo: null,
	// WxShareUrl : null
}
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules : {
		// 模块
	}
})
