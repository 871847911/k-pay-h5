export default [
    {
		path: '/systemMessage',
        name : 'systemMessage',
        component: resolve => require(['@/components/message/systemMessage'] , resolve),
		meta: {
			keepAlive: false,
			title: '消息',
			index: 3.001,
		},
    },
	{
		path: '/consult',
		name : 'consult',
		component: resolve => require(['@/components/message/consult'] , resolve),
		meta: {
			keepAlive: false,
			title: '消息',
			index: 3.001,
		},
	},
	{
		path: '/myConsult',
		name : 'myConsult',
		component: resolve => require(['@/components/message/myConsult'] , resolve),
		meta: {
			keepAlive: true,
			title: '我的咨询',
			index: 3.001,
		},
	}
]
