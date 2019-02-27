import Vue from 'vue'
import axios from 'axios'
import store from '../store/index.js'

axios.defaults.timeout = 10000
axios.defaults.headers['X-Requested-Page'] = 'json'
axios.defaults.withCredentials = true


// 请求拦截

axios.interceptors.request.use(config => {
	// 设置token

	const token = store.state.token
	token && (config.headers['userToken'] = token)
	token && (config.headers['X-Auth-Token'] = token)

	// if(token){
	// 	config.headers['userToken'] = token;
	// }else{
	// 	store.dispatch("getSession");
	// }
	return config
  }, error => {
	return Promise.reject(error)
  })



function toast(msg){
	Vue.$vux.toast.text(msg, 'top')
}

// 响应拦截
axios.interceptors.response.use(response => {
	if (response.status === 200) {
		return Promise.resolve(response)
	} else {
		return Promise.reject(response)
	}
}, error => {
	if (error.response.status) {
		switch (error.response.status) {
		// 401: 未登录
		case 401:
			router.replace({
				path: '/',
				query: {
					redirect: router.currentRoute.fullPath
				}
			})
		break
		// 403 token过期
		case 403:
			toast({
				message: '登录过期，请重新登录'
			})
			// 清除token
			Cookies.remove('token')
			setTimeout(() => {
				router.replace({
					path: '/',
						query: {
						redirect: router.currentRoute.fullPath
					}
				})
			}, 1000)
		break

		case 404:
			toast({
				message: '网络请求不存在'
			})
		break

		default:
			/*toast({
				message: '请求数据失败'
			})*/
		}
		return Promise.reject(error.response)
	}
})


export function fetch(url, data, method = 'GET', headers = {}) {
	return new Promise((resolve, reject) => {
		Vue.$vux.loading.show({text : 'loading...'})
		let options = {
			'method': method,
			'url': url,
			'headers': headers && typeof headers === 'object' ? headers : {}
		}
		options[method === 'GET' ? 'params' : 'data'] = data
			axios(options).then((response) => {
				if(response.status == 200 && response.data.success == false) {
					Vue.$vux.toast.text(response.data.message, 'top')
				}
			Vue.$vux.loading.hide()
			resolve(response.data)
		}).catch((error) => {
			Vue.$vux.loading.hide()
			reject(error)
		})
	})
}

