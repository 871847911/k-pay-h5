import {fetch} from './http'
import qs from 'qs'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	local = "http://" + window.location.host
}
let lecture =  {
	siteUrl() {
		return api
	},
	apply(params) {//生产者 个人中心 店铺订单
		return fetch(`${local}/frontapi/app/lecturer/apply`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
}

export default lecture
