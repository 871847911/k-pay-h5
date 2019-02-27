import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'
import home from './home'
import center from './center'
import classify from './classify'
import message from './message'
import question from './question'
import order from './order'
import lecture from './lecture'
Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
	if(savedPosition) {
		return savedPosition;
	} else {
		return {
			x: 0,
			y: 0
		};
	}
};
const u = navigator.userAgent;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const router =  new Router({
	base : '/h5-view/',
	// mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes: [
		...home,
		...center,
		...classify,
		...message,
		...question,
		...order,
		...lecture,
		{
			path: '/',
			name : 'index',
			redirect: '/home',
			component: resolve => require(['@/components/index'] , resolve),
			children : [
				{
					path: '/home',
					name: 'home',
					component: resolve => require(['@/components/index/index'] , resolve),
					meta: {
						keepAlive: true,
						title: '首页',
						index: 1,
						activeIndex : 0
					}
				},
				{
					path: '/classify',
					name: 'classify',
					component: resolve => require(['@/components/classify/classify'] , resolve),
					meta: {
						keepAlive: false,
						title: '分类',
						index: 2,
						activeIndex : 1
					}
				},
				{
					path: '/message',
					name: 'message',
					component: resolve => require(['@/components/message/message'] , resolve),
					meta: {
						keepAlive: false,
						title: '消息',
						index: 3,
						activeIndex : 2
					}
				},
				{
					path: '/producersCenterCenter',
					name: 'producersCenter',
					//生产者个人中心
					component: resolve => require(['@/components/myCenter/producersCenter'] , resolve),
					meta: {
						keepAlive: false,
						title: '个人中心',
						index: 4,
						activeIndex : 3
					}
				},
				{
					path: '/consumersCenter',
					name: 'consumersCenter',
					//消费者个人中心
					component: resolve => require(['@/components/myCenter/consumersCenter'] , resolve),
					meta: {
						keepAlive: false,
						title: '个人中心',
						index: 4,
						activeIndex : 3
					}
				}
			]
		},
	]
})
//获取code参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
// let uuuuu = navigator.userAgent;
// let isIos =!!uuuuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
router.beforeEach((to , from , next) => {
	// if(isIos && !store.state.WxShareUrl){
	// 	store.commit("setWxShareUrl" , window.location.href)
	// }
	// let url = window.location.href.split("?")
	// alert(url.length)
	// if(url.length <= 2){
		if(to.name === 'home' && store.state.storeInfo) {
				document.title = store.state.storeInfo.name
			}else{
				document.title = to.meta.title
		}
		if(sessionStorage.getItem("userInfo")){
			if(store.state.userInfo){
				next();
			}else{
				store.dispatch("getSession").then(res => {
					console.log(res)
					next();
				})
			}
		}else{
			let code = getUrlParam("code")
			if(code){
				store.dispatch("getLogin" , code).then(res => {
					console.log(res)
					next();
				}).catch(err => {
					vue.$vux.toast.text(err, 'top')
				})
			}else{
				store.dispatch("getSession").then(res => {
					console.log(res)
					next();
				})
			}

		}
	// }else{
	// 	window.location.href = url[0] + "#?" + url[2]
	// }

})

// router.afterEach((to,from) => {
// 	if(isIos && !store.state.WxShareUrl){
// 		store.commit("setWxShareUrl" , window.location.href)
// 	}
// })
export default router;
