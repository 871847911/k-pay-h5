export default [
	{
		path: '/quesSearchPage',
        name : 'quesSearchPage',
        component: resolve => require(['@/components/quesAnswer/quesSearchPage'] , resolve),
		meta: {
			title: '问答',
			index: 1.002,
		},
	},
	{
		path: '/searchResult',
        name : 'searchResult',
        component: resolve => require(['@/components/quesAnswer/searchResult'] , resolve),
		meta: {
			title: '问答',
			index: 1.003,
		},
	},
	{
		path: '/quesAnswerDetail',
        name : 'quesAnswerDetail',
        component: resolve => require(['@/components/quesAnswer/quesAnswerDetail'] , resolve),
		meta: {
			title: '问答',
			index: 1.002,
		},
	},
	{
		path: '/myQuestion',
        name : 'myQuestion',
        component: resolve => require(['@/components/quesAnswer/myQuestion'] , resolve),
		meta: {
			title: '问答',
			index: 1.002,
		},
	},
	{
		path: '/lectureList',
        name : 'lectureList',
        component: resolve => require(['@/components/quesAnswer/lectureList'] , resolve),
		meta: {
			title: '选择讲师',
			index: 1.002,
		},
	},
	{
		path: '/questionTitle',
        name : 'questionTitle',
        component: resolve => require(['@/components/quesAnswer/questionTitle'] , resolve),
		meta: {
			title: '提问',
			index: 1.003,
		},
	},
	{
		path: '/questionCont',
        name : 'questionCont',
        component: resolve => require(['@/components/quesAnswer/questionCont'] , resolve),
		meta: {
			title: '提问',
			index: 1.004,
		},
	},
	{
		path: '/quesanswerIndex',
		name : 'quesanswerIndex',
		component: resolve => require(['@/components/quesAnswer/quesanswerIndex'] , resolve),
		meta: {
			keepAlive: false,
			title: '问答专区',
			index: 1,
			activeIndex : 0
		}
	},


]
