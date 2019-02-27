export default [
	{
		path: '/agreementPage',
        name : 'agreementPage',
        component: resolve => require(['@/components/myCenter/consumersGroup/lecture/agreementPage'] , resolve),
		meta: {
			title: '合作协议',
			index: 1.002,
		},
	},
	{
		path: '/lectureBaseInfo',
        name : 'lectureBaseInfo',
        component: resolve => require(['@/components/myCenter/consumersGroup/lecture/lectureBaseInfo'] , resolve),
		meta: {
			title: '基本信息',
			index: 1.004,
		},
	},
	{
		path: '/lectureContent',
        name : 'lectureContent',
        component: resolve => require(['@/components/myCenter/consumersGroup/lecture/lectureContent'] , resolve),
		meta: {
			title: '基本信息',
			index: 1.005,
		},
	},
	{
		path: '/lectureIdAuth',
        name : 'lectureIdAuth',
        component: resolve => require(['@/components/myCenter/consumersGroup/lecture/lectureIdAuth'] , resolve),
		meta: {
			title: '基本信息',
			index: 1.002,
		},
	},
	{
		path: '/lecturePersonalIntr',
        name : 'lecturePersonalIntr',
        component: resolve => require(['@/components/myCenter/consumersGroup/lecture/lecturePersonalIntr'] , resolve),
		meta: {
			title: '基本信息',
			index: 1.002,
		},
	},
]
