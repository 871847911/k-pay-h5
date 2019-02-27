//会员积分
import {fetch} from './http'
import qs from 'qs'
let local = ''
if (process.env.NODE_ENV === 'development') {
	local = '/local';
}else{
	local = "http://" + window.location.host
}
let vip = {
	//会员信息
	getVipInfo(params) {
		return fetch(`${local}/frontapi/app/vip/getVipInfo`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//会员等级
	listLevel(params) {
		return fetch(`${local}/frontapi/app/vip/listLevel`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//成长值明细
	pageRecord(params) {
		return fetch(`${local}/frontapi/app/vip/pageRecord`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//任务
	listTask(params) {
		return fetch(`${local}/frontapi/app/vip/listTask`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//会员特权
	getVipPrivilege(params) {
		return fetch(`${local}/frontapi/app/vip/getVipPrivilege`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//当前积分
	getUserScoreInfo(params) {
		return fetch(`${local}/frontapi/app/score/getUserScoreInfo`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//积分查询
	pageRecordSerch(params) {
		return fetch(`${local}/frontapi/app/score/pageRecord`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//积分查询
	listTaskS(params) {
		return fetch(`${local}/frontapi/app/score/listTask`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//等级打折
	getStoreVipPrivilege(params) {
		return fetch(`${local}/frontapi/app/vip/getStoreVipPrivilege`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//生产者收入统计
	getUserIncomeSummary(params) {
		return fetch(`${local}/frontapi/app/userSettlement/getUserIncomeSummary`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//生产者收入列表 本日 本月 累计
	getUserIncomeList(params) {
		return fetch(`${local}/frontapi/app/userSettlement/getUserIncomeList`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//生产者已结算列表
	getSettlementDetailList(params) {
		return fetch(`${local}/frontapi/app/userSettlement/getSettlementDetailList`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//生产者待结算列表
	getNeedSettlementList(params) {
		return fetch(`${local}/frontapi/app/userSettlement/getNeedSettlementList`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	// 银行卡列表
	getUserBankList(params) {
		return fetch(`${local}/frontapi/app/userSettlement/getUserBankList`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//添加新行卡
	addUserBank(params) {
		return fetch(`${local}/frontapi/app/userSettlement/addUserBank`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//删除银行卡
	deleteUserBank(params) {
		return fetch(`${local}/frontapi/app/userSettlement/deleteUserBank`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//编辑银行卡
	updateUserBank(params) {
		return fetch(`${local}/frontapi/app/userSettlement/updateUserBank`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//银行卡详情
	userBankDetail(params) {
		return fetch(`${local}/frontapi/app/userSettlement/userBankDetail`, params, 'GET', {
			'Content-Type': 'application/json'
		})
	},
	// 获取余额
	getPayUserBalance(params){
		return fetch(`${local}/frontapi/app/userSettlement/getPayUserBalance`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//申请提现
	applyWithdraw(params){
		return fetch(`${local}/frontapi/app/userSettlement/applyWithdraw`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//提现列表
	getUserWithdrawList(params){
		return fetch(`${local}/frontapi/app/userSettlement/getUserWithdrawList`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
	//提现详情
	getUserWithdraw(params){
		return fetch(`${local}/frontapi/app/userSettlement/getUserWithdraw`,params , 'GET', {
			'Content-Type': 'application/json'
		})
	},
}
export default vip;
