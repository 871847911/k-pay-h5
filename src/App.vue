<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<!--<router-view></router-view>-->
	</div>
</template>

<script>
import api from "fetch/api";
export default {
	name: 'App',
	data() {
		return{

		}
	},
	created(){
		// this.getWithCount()
		document.title = this.$store.state.storeInfo.name
	},
	methods : {
		getWithCount() {
			api.getWithCount({}).then(res => {
				console.log('店铺信息', res)
				if(res.success) {
					document.title = 'ghjsdagfj'
					console.log('faf', this.$store.state)
					// document.title = res.data.store.name
				}
			})
		},
		// getCookie(){
		// 	let token = sessionStorage.getItem("token");
		// 	let userInfo = sessionStorage.getItem("userInfo");
		// 	let uploadImageHead = sessionStorage.getItem("uploadImageHead")
		// 	let roleId = sessionStorage.getItem("roleId")
		// 	if(token && userInfo){
		// 		this.$store.dispatch("getToken" , token);
		// 		this.$store.dispatch("getUserInfo" , JSON.parse(userInfo));
		// 		this.$store.dispatch("getUploadImageHead" , uploadImageHead);
		// 		this.$store.dispatch("getRoleId",roleId)
		// 	}else{
		// 		// this.getToken();
		// 		this.getToken()
		// 	}
		// },
		// wxLogin(){
		// 	let access_code = this.getUrlParam("code");
		// 	if(access_code){
		// 		this.getToken(access_code);
		// 	}else{
		// 		let url=window.location.href;
		// 		console.log(url)
		// 		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4f9521f88802fb91&redirect_uri=" +encodeURIComponent(url) +"&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxa3d4d957560f77b0#wechat_redirect"
		// 	}
		// },
		// getToken(access_code){
		// 	// let params = {
		// 	// 	storeId : '80',
		// 	// 	code : access_code
		// 	// }
		// 	let params = {
		//
		// 	}
		// 	api.getToken(params).then(res => {
		// 		if(res.success){
		// 			this.$store.dispatch("getToken" , res.data.token);
		// 			this.$store.dispatch('getRoleId',res.data.user.roleId)
		// 			sessionStorage.setItem("token" , res.data.token)
		// 			sessionStorage.setItem("roleId",res.data.user.roleId)
		// 			this.getUserInfo();
		// 			this.getUploadImageHead();
		// 		}else{
		// 			this.$vux.toast.text(res.message)
		// 		}
		//
		// 	})
		// },
		// getUserInfo(){
		// 	this.$store.dispatch('getUserInfo');
		// },
		// getUploadImageHead(){
		// 	this.$store.dispatch('getUploadImageHead')
		// },
		// //获取code参数
		// getUrlParam(name) {
		// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		// 	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		// 	if (r != null) return unescape(r[2]); return null; //返回参数值
		// },
	},
	watch: {
		'$route'(to,from){
			// this.getCookie();
		}
	}

}
</script>

<style lang="less">
	@import "assets/css/public.css";
	@import 'assets/iconfont/iconfont.css';
	/*html, body{*/
		/*height: 100%;*/
	/*}*/
	*{
		margin: 0;
		padding: 0;
		-webkit-overflow-scrolling: touch;
		-webkit-tap-highlight-color: transparent;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		width : 100%;
		/*height: 100vh;*/
		/*min-height: 100vh;*/
		font-size: 0.28rem;
		background: #fff;
	}
</style>
