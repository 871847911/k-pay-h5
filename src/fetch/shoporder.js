import {fetch} from './http'
import qs from 'qs'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	local = "http://" + window.location.host
}
let shoporder =  {
	siteUrl() {
		return api
	},
	pageStoreOrder(params) {//生产者 个人中心 店铺订单
		return fetch(`${local}/frontapi/app/user/pageStoreOrder`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	pageStoreDetail(params){
		return fetch(`${local}/frontapi/app/order/get`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	myOrderDeleted(params){
		return fetch(`${local}/frontapi/app/order/delete`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	}
}

export default shoporder
