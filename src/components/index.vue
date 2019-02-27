<template>
	<div class="index">
		<view-box ref="viewBox" body-padding-bottom="53px">
			<transition :name="transitionName">
				<router-view/>
			</transition>
			<tabbar class="tab_bar_btm" slot="bottom" v-model="tabIndex">
				<tabbar-item :link="{name : 'home'}">
					<img slot="icon" src="../assets/images/iconImg/tabIcons/Gray/Home@3x.png">
					<img slot="icon-active" src="../assets/images/iconImg/tabIcons/Green/Home@3x.png">
					<span slot="label">首页</span>
				</tabbar-item>
				<tabbar-item :link="{name : 'classify'}">
					<img slot="icon" src="../assets/images/iconImg/tabIcons/Gray/Circle@3x.png">
					<img slot="icon-active" src="../assets/images/iconImg/tabIcons/Green/Circle@3x.png">
					<span slot="label">分类</span>
				</tabbar-item>
				<tabbar-item :link="{name : 'message'}">
					<img slot="icon" src="../assets/images/iconImg/tabIcons/Gray/News@3x.png">
					<img slot="icon-active" src="../assets/images/iconImg/tabIcons/Green/News@3x.png">
					<span slot="label">消息</span>
				</tabbar-item>
				<tabbar-item :link="{name : 'consumersCenter'}">
					<img slot="icon" src="../assets/images/iconImg/tabIcons/Gray/User@3x.png">
					<img slot="icon-active" src="../assets/images/iconImg/tabIcons/Green/User@3x.png">
					<span slot="label">个人中心</span>
				</tabbar-item>
			</tabbar>
		</view-box>

	</div>
</template>

<script>
	import { Tabbar, TabbarItem ,ViewBox  } from 'vux'
	export default {
		name: 'HelloWorld',
		data () {
			return {
				keepAliveComponents: [],
				transitionName: '',
				tabIndex : 0
			}
		},
		components: {
			Tabbar,
			TabbarItem,
			ViewBox
		},
		created(){
			this.tabIndex = this.$route.meta.activeIndex;
		},
		methods: {

		},
		watch : {
			'$route' (to, from) {
				this.tabIndex = to.meta.activeIndex;
			}
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.index{
		height: 100%;
		width : 100%;
	}
	button:after{
		border: @button-default-border;
	}
	.test{
		display: flex;
		width : 100%;
		.bg{
			flex: 1;
			border : 1px solid #ddd;
			// height: 1.65rem;
		}
	}
	.tab_bar_btm{
		position: fixed;
	}
</style>
