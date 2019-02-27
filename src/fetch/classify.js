//分类
import {fetch} from './http'
import qs from 'qs'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	local = "http://" + window.location.host
}
let classify =  {
	siteUrl() {
		return api
	},
	imgUrl() {
		return 'hhhh'
	},
	//分类
	listCatalog(params) {
		return fetch(`${local}/frontapi/app/course/listCatalog`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//分类课程列表
	pageCourse(params) {
		return fetch(`${local}/frontapi/app/course/pageCourse`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//咨询反馈
	pageConsult(params) {
		return fetch(`${local}/frontapi/app/user/pageConsult`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//咨询我的
	pageReply(params) {
		return fetch(`${local}/frontapi/app/user/pageReply`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//关注通知
	pageNotice(params) {
		return fetch(`${local}/frontapi/app/subscribe/pageNotice`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//系统消息
	systemMessage(params) {
		return fetch(`${local}/frontapi/app/message/page`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	debug(params) {
		return fetch(`${local}/frontapi/app/user/debug`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//系统消息详情
	getAndRead(params) {
		return fetch(`${local}/frontapi/app/message/getAndRead`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//咨询
	listChat(params) {
		return fetch(`${local}/frontapi/app/consult/listChat`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//创建咨询信息
	createChat(params) {
		return fetch(`${local}/frontapi/app/consult/createChat?consultId=${params.consultId}&content=${params.content}`, {}, 'POST', {
			'Content-Type': 'application/json'
		})
	},
	//增加咨询信息
	createConsult(params) {
		return fetch(`${local}/frontapi/app/consult/createConsult?courseId=${params.courseId}&content=${params.content}`, {}, 'POST', {
			'Content-Type': 'application/json'
		})
	},
	//加入免费课程
	joinFreeCourse(params) {
		return fetch(`${local}/frontapi/app/course/joinFreeCourse`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//图文课程章节
	getSubContext(params) {
		return fetch(`${local}/frontapi/app/course/getSubContext`, params, 'GET', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询课程是否能赠送
	checkGiftShare(params){
		return fetch(`${local}/frontapi/app/giftManage/checkGiftShare`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询课程能否被领取
	checkGetGift(params){
		return fetch(`${local}/frontapi/app/giftManage/checkGetGift`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询领取记录
	queryById(params){
		return fetch(`${local}/frontapi/app/giftManage/queryById`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询课程是拼课
	getGroupBuyById(params){
		return fetch(`${local}/frontapi/app/groupBuy/getGroupBuyById`,qs.stringify(params) , 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询当前课程正在拼的列表
	getAppGroupBuyList(params){
		return fetch(`${local}/frontapi/app/groupBuy/getAppGroupBuyList`,params, 'GET', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//根据团ID查团详情
	queryByCollage(params){
		return fetch(`${local}/frontapi/app/collage/queryByCollage`,qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//拼课分享页状态判断
	queryCollagByShare(params){
		return fetch(`${local}/frontapi/app/collage/queryCollagByShare`,qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//我的拼课
	getMyGroupBuyList(params) {
		return fetch(`${local}/frontapi/app/groupBuy/getMyGroupBuyList`, params, 'GET', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//查询分享课程列表
	getShareCourses(params){
		return fetch(`${local}/frontapi/app/shareCourse/getShareCourses`,qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//分享规则详情
	getRuleDetailPage(params){
		return fetch(`${local}/frontapi/app/shareCourse/getShareCourseRuleDTO`,qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//分享进度/shareCourse/getShareCourseRuleDTO
	getRuleStep(params){
		return fetch(`${local}/frontapi/app/shareCourse/getShareCourseRuleDTO`,qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//我的拼课列表详情
	getGroupListDetails(params){
		return fetch(`${local}/frontapi/app/groupBuy/getAppGroupOrderDTO`,params, 'GET', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//删除拼课订单
	deleteGroupOrder(params){
		return fetch(`${local}/frontapi/app/groupBuy/deleteGroupOrder`,qs.stringify(params), 'post', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//拼课二维码
	createGroupQrcode(params){
		return fetch(`${local}/frontapi/app/collage/createGroupQrcode`,qs.stringify(params), 'post', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	//创建拼课预订单
	createGroupOrder(params){
		return fetch(`${local}/frontapi/app/groupBuy/createOrder`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
}
export default classify
