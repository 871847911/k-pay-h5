// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index.js'
import router from './router'
import '../src/assets/js/qiniu'

//全局引入x-button
import { XButton , LoadingPlugin , ToastPlugin ,DatetimePlugin} from 'vux'
Vue.component('x-button', XButton);
Vue.use(LoadingPlugin)//loading菊花图全局引用
Vue.use(ToastPlugin)//toast全局引用
Vue.use(DatetimePlugin)

// 全局引入 vconsole 手机调试
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()

import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
	error:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544001258784&di=5c5bbdc32280757c48aabc1cbe3dee59&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170720%2Fcd59c28a4c6d49bc8b4ecfcdffbc04f1_th.png',
	loading:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544001258784&di=5c5bbdc32280757c48aabc1cbe3dee59&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170720%2Fcd59c28a4c6d49bc8b4ecfcdffbc04f1_th.png'
})

// Vue.prototype.appId = window.location.host.split(".")[0];
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	// vConsole,
	components: { App },
	template: '<App/>'
})
