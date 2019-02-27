export default [
	{
		path: '/shopOrder',
        name : 'shopOrder',
        component: resolve => require(['@/components/myCenter/producersGroup/order/shopOrder'] , resolve),
		meta: {
			title: '店铺订单',
			index: 1.002,
		},
	},
	{
		// 生产者个人中心 店铺订单 订单详情
		path: '/shopOrderDetail',
        name : 'shopOrderDetail',
        component: resolve => require(['@/components/myCenter/producersGroup/order/shopOrderDetail'] , resolve),
		meta: {
			title: '订单详情',
			index: 1.003,
		},
	},
	{
		// 消费者个人中心 我的订单 订单详情
		path: '/myOrderDetail',
        name : 'myOrderDetail',
        component: resolve => require(['@/components/myCenter/consumersGroup/myOrderDetail'] , resolve),
		meta: {
			title: '订单详情',
			index: 1.003,
		},
	},
]
