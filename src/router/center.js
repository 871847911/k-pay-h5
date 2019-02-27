export default [
    {
		path: '/setuserinfo',
        name : 'setUserInfo',
        meta: {
            index: 4.001,
            title : "个人中心"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/setUserInfo'] , resolve)
    },
    {
		path: '/myclass',
        name : 'myClass',
        meta: {
            index: 4.002,
            title : "我的课程"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/myCourse/myCourse'] , resolve)
    },
    {
		path: '/myCourseAudit',
        name : 'myCourseAudit',
        meta: {
            index: 4.003,
            title : "我的审核"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/myCourse/myCourseAudit'] , resolve)
    },
    {
		path: '/myfans',
        name : 'myFans',
        meta: {
            index: 4.004,
            title : "我的粉丝"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/myFans'] , resolve)
    },
    {
		path: '/mymoney',
        name : 'myMoney',
        meta: {
            index: 4.005,
            title : "资金管理"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/myMoney/myMoney'] , resolve)
    },
	{
		path: '/incomeList',
		name : 'incomeList',
		meta: {
			index: 4.006,
			title : "今日收入"
		},
		component: resolve => require(['@/components/myCenter/producersGroup/myMoney/incomeList'] , resolve)
	},
    {
		path: '/withdrawal',
        name : 'withdrawal',
        meta: {
			keepAlive: false,
            index: 4.007,
            title : "提现管理"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/withdrawal/withdrawal'] , resolve)
    },
    {
		path: '/applywithdrawal',
        name : 'applyWithdrawal',
        meta: {
			keepAlive: true,
            index: 4.008,
            title : "申请提现"
        },
        component: resolve => require(['@/components/myCenter/producersGroup/withdrawal/applyWithdrawal'] , resolve)
    },
	{
		path: '/withdrawalList',
		name : 'withdrawalList',
		meta: {
			keepAlive: false,
			index: 4.008,
			title : "提现记录"
		},
		component: resolve => require(['@/components/myCenter/producersGroup/withdrawal/withdrawalList'] , resolve)
	},
	{
		path: '/withdrawalDetail',
		name : 'withdrawalDetail',
		meta: {
			keepAlive: false,
			index: 4.008,
			title : "提现详情"
		},
		component: resolve => require(['@/components/myCenter/producersGroup/withdrawal/withdrawalDetail'] , resolve)
	},
	{
		path: '/feedback',
		name : 'feedback',
		meta: {
			keepAlive: false,
			index: 4.4,
			title : "提交反馈"
		},
		component: resolve => require(['@/components/myCenter/producersGroup/withdrawal/feedback'] , resolve)
	},

	//银行卡管理
	{
		path: '/bankManage',
		name : 'bankManage',
		meta: {
			index: 4.006,
			title : "银行卡管理"
		},
		component: resolve => require(['@/components/myCenter/producersGroup/bankManage/bankManage'] , resolve)
	},
	{
		path: '/addBankCard',
		name : 'addBankCard',
		meta: {
			index: 4.006,
			title : "添加银行卡"
		},
		component: resolve => require(['@/components/myCenter/producersGroup/bankManage/addBankCard'] , resolve)
	},




//	消费者个人中心
	// 	我的学习
	{
		path: '/mylearning',
		name : 'myLearning',
		meta: {
			index: 4.009,
			title : "我的学习"
		},
		component: resolve => require(['@/components/myCenter/consumersGroup/myLearning'] , resolve)
	},
	//我的关注
	{
		path: '/myfocus',
		name : 'myFocus',
		meta: {
			index: 4.010,
			title : "我的关注"
		},
		component: resolve => require(['@/components/myCenter/consumersGroup/myFocus'] , resolve)
	},
	//我的订单
	{
		path: '/myOrder',
		name : 'myOrder',
		meta: {
			index: 4.011,
			title : "我的订单"
		},
		component: resolve => require(['@/components/myCenter/consumersGroup/myOrder'] , resolve)
    },
    //会员中心
	{
		path: '/menberCenter',
		name : 'menberCenter',
		meta: {
			index: 4.011,
			title : "会员中心"
		},
		component: resolve => require(['@/components/myCenter/menber/menberCenter'] , resolve)
    },
    //成长明细
	{
		path: '/growthDetail',
		name : 'growthDetail',
		meta: {
			index: 4.011,
			title : "成长值明细"
		},
		component: resolve => require(['@/components/myCenter/menber/growthDetail'] , resolve)
    },
    //任务中心
	{
		path: '/taskDetail',
		name : 'taskDetail',
		meta: {
			index: 4.011,
			title : "任务中心"
		},
		component: resolve => require(['@/components/myCenter/menber/taskDetail'] , resolve)
    },
    //积分
	{
		path: '/integral',
		name : 'integral',
		meta: {
			index: 4.011,
			title : "积分"
		},
		component: resolve => require(['@/components/myCenter/menber/integral'] , resolve)
    },
    //积分中心
    {
		path: '/integralDetails',
		name : 'integralDetails',
		meta: {
			index: 4.011,
			title : "积分中心"
		},
		component: resolve => require(['@/components/myCenter/menber/integralDetails'] , resolve)
	},
	//我的拼课
	{
		path: '/myGroup',
		name : 'myGroup',
		meta: {
			index: 4.011,
			title : "我的拼课"
		},
		component: resolve => require(['@/components/courseDetails/group/myGroup'] , resolve)
	},
	//赠送记录
	{
		path: '/sendRecord',
		name : 'sendRecord',
		meta: {
			index: 4.011,
			title : "赠送记录"
		},
		component: resolve => require(['@/components/myCenter/consumersGroup/sendRecord'] , resolve)
	},
	//赠送成功
	{
		path: '/sendSuccess',
		name : 'sendSuccess',
		meta: {
			index: 4.011,
			title : "赠送记录"
		},
		component: resolve => require(['@/components/courseDetails/sendGift/sendSuccess'] , resolve)
	},
	//我的分享
	{
		path: '/myShare',
		name : 'myShare',
		meta: {
			index: 4.011,
			title : "我的分享"
		},
		component: resolve => require(['@/components/myCenter/consumersGroup/myShare'] , resolve)
	},
	//我的拼课列表详情
	{
		path: '/myGroupDetails',
		name: 'myGroupDetails',
		meta: {
			index: 4.011,
			title: "订单详情"
		},
		component: resolve => require(['@/components/courseDetails/group/myGroupDetails'], resolve)
	},
	//分享进度
	{
		path: '/shareStep',
		name: 'shareStep',
		meta: {
			index: 4.011,
			title: "分享进度"
		},
		component: resolve => require(['@/components/myCenter/consumersGroup/shareStep'], resolve)
	},

]
