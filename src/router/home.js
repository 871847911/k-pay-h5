export default [
    {
		path: '/searchPage',
        name : 'searchPage',
        meta: {
			keepAlive: true,
			title: '搜索',
            index: 1.001,
        },
        component: resolve => require(['@/components/index/searchPage'] , resolve)
    },
	{
		path: '/groupCourseList',
		name : 'groupCourseList',
		meta: {
			keepAlive: false,
			title: '拼课列表',
			index: 1.001,
		},
		component: resolve => require(['@/components/index/groupCourseList'] , resolve)
	},
	{
		path: '/storeDetail',
		name : 'storeDetail',
		meta: {
			keepAlive: false,
			title: '店铺详情',
			index: 1.001,
		},
		component: resolve => require(['@/components/index/storeDetail'] , resolve)
	},
	{
		path: '/lecturerDetail',
		name : 'lecturerDetail',
		meta: {
			keepAlive: false,
			title: '讲师',
			index: 1.001,
		},
		component: resolve => require(['@/components/index/lecturerDetail'] , resolve)
	},
	{
		path: '/orderPay',
		name : 'orderPay',
		meta: {
			keepAlive: false,
			title: '支付',
			index: 1.2,
		},
		component: resolve => require(['@/components/index/orderPay'] , resolve)
	},
	{
		path: '/sendPaySuccess',
		name : 'sendPaySuccess',
		meta: {
			keepAlive: false,
			title: '赠送好友',
			index: 1.2,
		},
		component: resolve => require(['@/components/courseDetails/sendGift/sendPaySuccess'] , resolve)
	},
	{
		path: '/shareFreeList',
		name : 'shareFreeList',
		meta: {
			keepAlive: false,
			title: '分享免费',
			index: 1.2,
		},
		component: resolve => require(['@/components/courseDetails/share/shareCourseList'] , resolve)
	},
	{
		//分享免费读课程详情
		path: '/shareFreeCourseDetails',
		name : 'shareFreeCourseDetails',
		meta: {
			keepAlive: false,
			title: '分享免费',
			index: 1.2,
		},
		component: resolve => require(['@/components/courseDetails/share/shareCourseDetails'] , resolve)
	},
	{
		//分享免费读规则详情
		path: '/shareRuleDetali',
		name : 'shareRuleDetali',
		meta: {
			keepAlive: false,
			title: '分享规则',
			index: 1.2,
		},
		component: resolve => require(['@/components/courseDetails/share/shareRuleDetail'] , resolve)
	},
]
