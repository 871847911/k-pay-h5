import {fetch} from './http'
import qs from 'qs'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	local = "http://" + window.location.host
}
let question =  {
	siteUrl() {
		return api
	},
	listExceptMe(params) {
		// 查询讲师列表
		return fetch(`${local}/frontapi/app/questionAndAnswer/listExceptMe`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	saveQuestionAndPics(params) {
		// 添加问题及图片
		return fetch(`${local}/frontapi/app/questionAndAnswer/saveQuestionAndPics`,  qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},

	myQuestionWX(params) {
		// 我的提问 列表
		return fetch(`${local}/frontapi/app/questionAndAnswer/myQuestionWX`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},

	askMeQuestionWX(params){
		// 提问我的 列表
		return fetch(`${local}/frontapi/app/questionAndAnswer/askMeQuestionWX`,params,'GET',{
			'Content-Type': 'application/json'
		})
	},

	queryStarQuestions(params) {
		// 精选问答 列表
		return fetch(`${local}/frontapi/app/questionAndAnswer/queryStarQuestions`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},

	queryQuestionsWX(params) {
		// 问题市场 列表
		return fetch(`${local}/frontapi/app/questionAndAnswer/queryQuestionsWX`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},

	questionQueryById(params) {
		// 查询问题详情
		return fetch(`${local}/frontapi/app/questionAndAnswer/queryById`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},

	addStar(params) {
		// 答案点赞
		return fetch(`${local}/frontapi/app/questionAndAnswer/addStar`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
	addAnswerAndPics(params){
		// 生产者回答问题
		return fetch(`${local}/frontapi/app/questionAndAnswer/addAnswerAndPics`, qs.stringify(params), 'POST', {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	},
}

export default question
