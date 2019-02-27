
export const mutations = {
    getToken(state , token){
        state.token = token
    },
    getRoleId(state , roleId){
        state.roleId = roleId
    },
    getUserInfo(state , userinfo){
        state.userInfo = userinfo
    },
	getStoreInfo(state , storeInfo){
		state.storeInfo = storeInfo
	},
    getUploadImageHead(state,uploadImageHead){
        state.uploadImageHead = uploadImageHead
    },
	getAppId(state , appId){
		state.appId = appId
    },
    setApplyForm(state,info){
        state.applyForm = info
    },
	// setWxShareUrl(state,url){
	// 	state.WxShareUrl = url
    // },
    updateUserInfo(state,info){
        state.userInfo.roleId = info.roleId
        state.userInfo.applyStatus = info.applyStatus
    },
}
