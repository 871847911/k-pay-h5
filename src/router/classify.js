export default [
    {
		path: '/courseList',
        name : 'courseList',
        component: resolve => require(['@/components/classify/courseList'] , resolve),
		meta: {
			keepAlive: true,
			title: '课程列表',
			index: 3.001,
		},
	},
	//课程详情
	{
		path: '/courseDetails',
		name : 'courseDetails',
		component: resolve => require(['@/components/courseDetails/courseDetails'] , resolve),
		meta: {
			keepAlive: false,
			title: '课程详情',
			index: 3.001,
		},
	},
	//课程详情图文详情
	{
		path: '/courseListDetails',
		name : 'courseListDetails',
		component: resolve => require(['@/components/courseDetails/courseListDetails'] , resolve),
		meta: {
			keepAlive: false,
			title: '课程详情',
			index: 3.001,
		},
	},
	//课程音频播放
	{
		path: '/courseAudio',
		name : 'courseAudio',
		component: resolve => require(['@/components/courseDetails/courseAudio'] , resolve),
		meta: {
			keepAlive: false,
			title: '课程详情',
			index: 3.001,
		},
	},
	//拼课课程详情
	{
		path: '/courseDetailsGroup',
		name : 'courseDetailsGroup',
		component: resolve => require(['@/components/courseDetails/group/courseDetailsGroup'] , resolve),
		meta: {
			keepAlive: false,
			title: '课程详情',
			index: 3.001,
		},
	},
	//拼课列表
	{
		path: '/groupList',
		name : 'groupList',
		component: resolve => require(['@/components/courseDetails/group/groupList'] , resolve),
		meta: {
			keepAlive: false,
			title: '拼课列表',
			index: 3.001,
		},
	},
	//拼课分享
	{
		path: '/groupShare',
		name : 'groupShare',
		component: resolve => require(['@/components/courseDetails/group/groupShare'] , resolve),
		meta: {
			keepAlive: false,
			title: '拼课分享',
			index: 3.001,
		},
	},
	//拼课分享进入
	{
		path: '/groupShareIn',
		name : 'groupShareIn',
		component: resolve => require(['@/components/courseDetails/group/groupShareIn'] , resolve),
		meta: {
			keepAlive: false,
			title: '拼课分享',
			index: 3.001,
		},
	},
	//赠送分享进入
	{
		path: '/sendReturn',
		name : 'sendReturn',
		component: resolve => require(['@/components/courseDetails/sendGift/sendReturn'] , resolve),
		meta: {
			keepAlive: false,
			title: '赠送分享',
			index: 3.001,
		},
	}
]
