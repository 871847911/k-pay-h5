//分类
import {fetch} from './http'
import qs from 'qs'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	local = "http://" + window.location.host
}
let homeJs  = {
	siteUrl() {
		return api
	},
	//首页轮播
	listBanner(params) {
		return fetch(`${local}/frontapi/app/advertisement/list`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//公开课，精品课程
	listCollageIndex(params) {
		return fetch(`${local}/frontapi/app/course/listCollageIndex`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//公开课
	listIndexFreeCourse(params) {
		return fetch(`${local}/frontapi/app/course/listIndexFreeCourse`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//精品课程
	listIndexChoiceCourse(params) {
		return fetch(`${local}/frontapi/app/course/listIndexChoiceCourse`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//搜索
	searchCollageAll(params) {
		return fetch(`${local}/frontapi/app/search/searchCollageAll`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//拼课列表
	groupList(params) {
		return fetch(`${local}/frontapi/app/groupBuy/getGroupBuyRuleList`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	// 获取店铺信息
	getWithCount(params) {
		return fetch(`${local}/frontapi/app/store/getWithCount`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//讲师列表
	lecturerList(params) {
		return fetch(`${local}/frontapi/app/lecturer/page`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//讲师详情
	lecturerDetail(params) {
		return fetch(`${local}/frontapi/app/lecturer/detail`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//关注讲师
	subscribe(params) {
		return fetch(`${local}/frontapi/app/subscribe/subscribe`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//取消关注讲师
	cancel(params) {
		return fetch(`${local}/frontapi/app/subscribe/cancel`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//课程详情
	getDetail(params) {
		return fetch(`${local}/frontapi/app/course/getDetail`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//积分
	getPayInfo(params) {
		return fetch(`${local}/frontapi/app/score/getPayInfo`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//创建普通课程订单
	createOrder(params) {
		return fetch(`${local}/frontapi/app/course/order/createOrder`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//创建赠送课程订单
	createGiftOrder(params) {
		return fetch(`${local}/frontapi/app/giftManage/createOrder`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//创建拼课订单
	createCollagOrder(params) {
		return fetch(`${local}/frontapi/app/collage/createOrder`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//创建团
	createPaidCollagOrder(params) {
		return fetch(`${local}/frontapi/app/collage/createPaidCollagOrder`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//创建微信订单
	createUnifyOrder(params) {
		return fetch(`${local}/frontapi/web/createUnifyOrder`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//分销订单
	createMarketOrder(params) {
		return fetch(`${local}/order/execute`, params, 'POST', {
			'Content-Type': 'application/json'
		})
	},
	// 分销课程详情
	getAppPeddleGoodsDetail(params) {
		return fetch(`${local}/goods/peddleGoods/getAppPeddleGoodsDetail`, params, 'POST', {
			'Content-Type': 'application/json'
		})
	},
}
export default  homeJs;
