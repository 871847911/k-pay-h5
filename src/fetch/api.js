import {fetch} from './http'
import qs from 'qs'
import home from './home'
import classify from './classify'
import vip from './menber'
import question from './question'
import shoporder from './shoporder'
import lecture from './lecture'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	console.log("http://" + window.location.host);
	// local = "http://zlftest.vdongzc.com"
	local = "http://" + window.location.host
	// local = "http://meiye-hz.vdongchina.com"
}
export default {
	siteUrl() {
		return api
	},
	...home,
	...classify,
	...vip,
	...question,
	...shoporder,
	...lecture,
	//==============================================================================================================
	//
	//											杨贵捷
	//
	//==============================================================================================================
	getToken(params){
		return fetch(`${local}/frontapi/app/user/loginH5`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//获取storeid
	getStoreId(params){
		return fetch(`${local}/frontapi/app/user/getStoreId`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//分享接口
	getWechatJsConfig(params){
		return fetch(`${local}/frontapi/app/shareCourse/getWechatJsConfig`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	// 获取上传图片的Token
	getUploadToken(params) {
		return fetch(`${local}/frontapi/app/store/getUploadToken`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//获取用户信息
	getUserInfo(params){
		return fetch(`${local}/frontapi/app/user/getInfo`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	// 获取生产者个人中心信息
	getLecturerIndex(params){
		return fetch(`${local}/frontapi/app/user/lecturerIndex`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/json'
		})
	},
	// 获取消费者个人中心信息
	getConsumersIndex(params){
		return fetch(`${local}/frontapi/app/user/studentIndex`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/json'
		})
	},
	//修改用户信息
	setUserInfo(params){
		return fetch(`${local}/frontapi/app/user/updateInfo`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//绑定手机号
	bindUserPhone(params){
		return fetch(`${local}/frontapi/app/user/bindPhone`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//发送验证码
	fileUserCode(params){
		return fetch(`${local}/frontapi/app/user/sendCaptcha`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	// 我发布的课程
	pagePublish(params){
		return fetch(`${local}/frontapi/app/user/pagePublish`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	// 我的审核课程
	myAuditCourse(params){
		return fetch(`${local}/frontapi/app/user/pageCourseManage`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	// 我的粉丝
	myFansList(params){
		return fetch(`${local}/frontapi/app/user/pageLecturerFans`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//我的学习
	buyPageCourse(params){
		return fetch(`${local}/frontapi/app/user/pageCourse`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//我的关注
	myFocus(params){
		return fetch(`${local}/frontapi/app/user/pageLecturer`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//我的订单
	muOrder(params){
		return fetch(`${local}/frontapi/app/user/pageOrder`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//赠送购买成功 赠送购买数量+1 /app/giftManage/buyGift
	buyGiftSuccess(params){
		return fetch(`${local}/frontapi/app/giftManage/buyGift`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//赠送记录  /app/giftManage/pageGiftOrder
	pageGiftOrder(params){
		return fetch(`${local}/frontapi/app/giftManage/pageGiftOrder`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//分享进度
	getCourseByOpenId(params){
		return fetch(`${local}/frontapi/app/shareCourse/getCourseByOpenId`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询领取记录 /app/giftManage/queryById
	queryBylingqu(params){
		return fetch(`${local}/frontapi/app/giftManage/queryById`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//领取课程 /app/giftManage/receiveGift
	receiveGift(params){
		return fetch(`${local}/frontapi/app/giftManage/receiveGift`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//分享成功 /app/shareCourse/insertRule
	insertRule(params){
		return fetch(`${local}/frontapi/app/shareCourse/insertRule`,params , 'POST', {
			'Content-Type': 'application/json'
		})
	}
	//==============================================================================================================
	//
	//											end
	//
	//==============================================================================================================
}
