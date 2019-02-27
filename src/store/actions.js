import api from "fetch/api";
import vue from 'vue'
import route from '../router/index'
import store from '../store/index'
//获取code参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
export const actions = {
	//***************************************************************************************
	//
	//								登录方法
	//
	//***************************************************************************************
    //获取session
	getSession(context){
		return new Promise(resolve => {
			let token = sessionStorage.getItem("token");
			let userInfo = sessionStorage.getItem("userInfo");
			let storeInfo = sessionStorage.getItem("storeInfo");
			let uploadImageHead = sessionStorage.getItem("uploadImageHead");
			let appId = window.location.host.split(".")[0];
			if(token && userInfo){
				context.commit("getToken" , token);
				context.commit("getUserInfo" , JSON.parse(userInfo));
				context.commit("getUploadImageHead" , uploadImageHead);
				context.commit("getStoreInfo" , JSON.parse(storeInfo));
				// context.commit("getAppId" , appId);
				resolve(true)
			}else{
				context.dispatch("wxLogin" , appId)
			}
		})

		// return new Promise(resolve => {
		// 	let token = sessionStorage.getItem("token");
		// 	let userInfo = sessionStorage.getItem("userInfo");
		// 	let uploadImageHead = sessionStorage.getItem("uploadImageHead");
		// 	if(token && userInfo){
		// 		context.commit("getToken" , token);
		// 		context.commit("getUserInfo" , JSON.parse(userInfo));
		// 		context.commit("getUploadImageHead" , uploadImageHead);
		// 		context.commit("getAppId" , appId);
		// 		resolve(true)
		// 	}else{
		// 		context.dispatch("wxLogin" , vue.appId)
		// 	}
		//
		// })
	},
	// 微信登录 线上
	wxLogin(context , appId){
		let access_code = getUrlParam("code");
		if(access_code){
			console.log("存入code" + access_code)
			sessionStorage.setItem("code" , access_code)
		}else{
			let url=encodeURIComponent(window.location.href);
			// window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxf9423c052e4af66f#wechat_redirect"
			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxa3d4d957560f77b0#wechat_redirect"
		}
	},

	// 微信登录 本地
	/*wxLogin(context , appId){
		let access_code = getUrlParam("code");
		console.log(access_code)
		if(access_code){
			console.log("存入code" + access_code)
			sessionStorage.setItem("code" , access_code)
		}else{
			let url=window.location.href;
			// window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4f9521f88802fb91&redirect_uri=" + url +"&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxa3d4d957560f77b0#wechat_redirect"
			window.location.replace("http://"+appId+".zlftest.vdongzc.com/backend/wechat/auth/loginTestH5?myUrl=" + url );
		}
	},*/
    // 获取token
    getLogin(context , access_code){
		return new Promise((resolve, reject) => {
			let params = {
				appId : window.location.host.split(".")[0]
			}
			api.getStoreId(params).then(res => {
				console.log(res)
				let params = {
					storeId : res.data,
					code : access_code
				}
				// let params = {
				//
				// }
				api.getToken(params).then(res => {
					if(res.success){
						context.commit("getToken" , res.data.token);
						context.commit("getUserInfo",res.data.user);
						context.dispatch("getUploadImageHead");
						context.dispatch("getStoreInfo");
						sessionStorage.setItem("userInfo" , JSON.stringify(res.data.user));
						sessionStorage.setItem("token" , res.data.token)
						resolve("true")
					}else{
						reject(res.message)
					}
				}).catch(error => {
					console.log('error', error)
					if(error.data.message === 'token is null'){
						let appId = window.location.host.split(".")[0]
						let path = route.history.pending.fullPath
						let url = encodeURIComponent('http://'+ window.location.host + '/h5-view#' + path);
						console.log(appId, url)

						console.log(route.history.pending.fullPath)
						//正式环境
						// window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxf9423c052e4af66f#wechat_redirect"
						// 测试环境
						window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+url+"&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxa3d4d957560f77b0#wechat_redirect"
					}
				})
			})
		})
    },
    // 获取userinfo
    getUserInfo(context){
		api.getUserInfo({}).then(res => {
			context.commit("getUserInfo" , res.data)
			sessionStorage.setItem("userInfo" , JSON.stringify(res.data));
		})
    },
	getStoreInfo(context) {
		api.getWithCount({}).then(res => {
			context.commit("getStoreInfo" , res.data.store)
			sessionStorage.setItem("storeInfo" , JSON.stringify(res.data.store));
		})
	},
    // 获取图片展示的前缀
    getUploadImageHead(context){
        api.getUploadToken({}).then(res => {
			if(res.success){
				context.commit("getUploadImageHead" , `http://${res.data.tempDomain}`)
            	sessionStorage.setItem("uploadImageHead" , `http://${res.data.tempDomain}`);
			}
        })
    },
	//***************************************************************************************
	//
	//								分享方法
	//
	//***************************************************************************************
	shareConfig(context , pageInfo){
			let params = {
				url : window.location.href.split("#")[0]
			};
			api.getWechatJsConfig(params).then(res => {
				if(res){
					let param = {
						debug: false,
						appId: res.appId,
						timestamp: res.timestamp,
						nonceStr: res.nonceStr,
						signature: res.signature,
						jsApiList: [
							'onMenuShareTimeline',		//	分享到朋友圈
							'onMenuShareAppMessage',		//	分享给朋友
						]
					};
					wx.config(param);
					wx.ready(()=>{
						wx.onMenuShareTimeline({
							title: pageInfo.title ,
							desc: pageInfo.desc,
							link: pageInfo.url,
							imgUrl: pageInfo.img,
							success: function (res) {
								let message = {
									type : share,
									status : true,
									message : '分享成功'
								}

							},
							cancel: function (res) {
								let message = {
									type : share,
									status : false,
									message : '取消分享'
								}
							}
						});
						wx.onMenuShareAppMessage({
							title: pageInfo.title ,
							desc: pageInfo.desc,
							link: pageInfo.url,
							imgUrl: pageInfo.img,
							success: function () {
								let message = {
									type : share,
									status : false,
									message : '分享成功'
								}

							},
							cancel: function () {
								let message = {
									type : share,
									status : false,
									message : '取消分享'
								}

							}
						});
					});
					wx.error(res =>{
						//可以更新签名

					});
				}else{
					vue.$vux.toast.text(res.message)
				}
			})

	},
	// 存储申请入驻
	setApplyForm(context,info){
		context.commit("setApplyForm",info)
	}
}
