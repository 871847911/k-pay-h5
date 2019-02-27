<template>
	<div class='index outermost'>
		<div class="search_box" @click="toSearchPage">
			<span class="icon-fangdajing"></span>
			搜索课程、讲师
		</div>
		<swiper :list="swiperList" auto loop :interval="3000" :aspect-ratio="286/750"></swiper>
		<div class="nav">
			<div class="nav_list" v-for="(item, index) in nav" :key="index" @click="getRouter(item)">
				<img :src="item.icon" alt="" />
				<p>{{ item.title }}</p>
			</div>
		</div>
		<!--公开课-->
		<div class="free_course border_top" v-if="freeList.length != 0">
			<div class="more_corse">
				<p>公开课</p><div class="more" @click="ToCourseList(1)"><p>更多</p><span class="icon-jiantou"></span></div>
			</div>
			<div class="free_list">
				<freeCourse v-for="(item,index) in freeList" :key="index" @click.native="toCourseDetails(item)" :id="item.id" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></freeCourse>
			</div>
			<!--<div class="reset" @click="listIndexFreeCourse" ref="reset"><span :class="change1?'change':''" class="icon-update"></span><p>换一批</p></div>-->
		</div>
		<!--精品课程-->
		<div class="select_course border_top" v-if="selectList.length != 0">
			<div class="more_corse">
				<p>精品课程</p><div class="more" @click="ToCourseList(2)"><p>更多</p><span class="icon-jiantou"></span></div>
			</div>
			<div class="select_list">
				<selectCourse  v-for="(item,index) in selectList" :key="index" @click.native="toCourseDetails(item)" :id="item.id" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></selectCourse>
			</div>
			<!--<div class="reset" @click="listIndexChoiceCourse"><span  :class="change2?'change':''" class="icon-update"></span><p>换一批</p></div>-->
		</div>
		<!--热门课程-->
		<div class="hot_course border_top" v-if="hotList.length != 0">
			<div class="more_corse">
				<p>热门课程</p><div class="more" @click="ToCourseList(3)"><p>更多</p><span class="icon-jiantou"></span></div>
			</div>
			<div class="hot_list">
				<hotCourse  v-for="(item,index) in hotList" :key="index" @click.native="toCourseDetails(item)" :id="item.id" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></hotCourse>
			</div>
			<!--<div class="reset" @click="hotCourse"><span  :class="change3?'change':''" class="icon-update"></span><p>换一批</p></div>-->
		</div>
		<!--最新发布-->
		<div class="new_course border_top"  v-if="newList.length != 0">
			<div class="more_corse">
				<p>最新发布</p><div class="more" @click="ToCourseList(4)"><p>更多</p><span class="icon-jiantou"></span></div>
			</div>
			<div class="new_list">
				<newCourse v-for="(item,index) in newList" :key="index" @click.native="toCourseDetails(item)" :id="item.id" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></newCourse>
			</div>
			<!--<div class="reset" @click="newCourse"><span  :class="change4?'change':''" class="icon-update"></span><p>换一批</p></div>-->
		</div>
	</div>
</template>

<script>
	import api from "fetch/api";
	import freeCourse from './module/freeCourse'
	import selectCourse from './module/selectCourse'
	import hotCourse from './module/hotCourse'
	import newCourse from './module/newCourse'
	import { Swiper } from 'vux'
	export default {
		name: 'index',
		data () {
			return {
				nav: [
					{
						title: '全部课程',
						path: '/courseList',
						icon: require('../../assets/images/home/course_list.png')
					},
					{
						title: '限时拼课',
						path: '/groupCourseList',
						icon: require('../../assets/images/home/group.png')
					},
					{
						title: '名人课堂',
						path: '/storeDetail',
						icon: require('../../assets/images/home/star_course.png')
					},
					{
						title: '咨询问答',
						path: '/quesanswerIndex',
						icon: require('../../assets/images/home/question.png')
					},
					{
						title: '分享免费',
						path: '/shareFreeList',
						icon: require('../../assets/images/home/share.png')
					}
				],
				freeList: [],
				selectList: [],
				hotList: [],
				newList: [],
				swiperList: [],
				storeInfo: {},
				demo01_index: 1,
				change1: false,
				change2: false,
				change3: false,
				change4: false,
			}
		},
		created(){
			this.getBannerList()
			this.listIndexFreeCourse()
			this.listIndexChoiceCourse()
			this.hotCourse()
			this.newCourse()
		},
		mounted() {
			this.getWithCount()
		},
		computed: {
			token() {
				if(this.$store.state.token) {
					return this.$store.state.token
				}
			}
		},
		watch: {
			token(curval, oldval) {
				this.getWithCount()
				this.getBannerList()
				this.listIndexFreeCourse()
				this.listIndexChoiceCourse()
				this.hotCourse()
				this.newCourse()
			}
		},
		components : {
			freeCourse,
			selectCourse,
			hotCourse,
			newCourse,
			Swiper
		},
		methods: {
			//店铺信息
			getWithCount() {
				api.getWithCount({}).then(res => {
					console.log('店铺信息', res)
					if(res.success) {
						// this.storeInfo = res.data.store
						console.log(res.data.store.name)
						document.title = res.data.store.name
					}
				})
			},
			//轮播图列表
			getBannerList() {
				let	params = { type: 1 }
				api.listBanner(params).then(res => {
					console.log('轮播图列表', res)
					if(res.success == true) {
						this.swiperList = res.data.map((item, index) => ({
							url: {path: item.linkType == 1 ? '/courseDetails' : item.linkType == 2 ? '/lecturerDetail' : item.linkType==3&&item.linkValue==1 ? '/myGroup' : '/sendRecord', query: { id: item.linkValue }},
							img: item.sourceUrl,
						}))
					}
				})
			},
			//公开课
			listIndexFreeCourse() {
				let params = {}
				this.change1 = true
				api.listIndexFreeCourse(params).then(res => {
					console.log('公开课', res)
					if(res.success) {
						this.freeList = res.data
						this.change1 = false
					}
				})
			},
			//精品课程
			listIndexChoiceCourse() {
				let params = {}
				this.change2 = true
				api.listIndexChoiceCourse(params).then(res => {
					console.log('精品课程', res)
					if(res.success) {
						this.selectList = res.data
						this.change2 = false
					}
				})
			},
			//热门课程
			hotCourse() {
				let params = {page: 1, size: 3, status: 40, orderType: 2}
				this.change3 = true
				api.pageCourse(params).then(res => {
					console.log('热门课程', res)
					if(res.success) {
						this.hotList = res.data.list
						this.change3 = false
					}
				})
			},
			//最新发布
			newCourse() {
				let params = {page: 1, size: 3, status: 40, orderType: 1}
				this.change4 = true
				api.pageCourse(params).then(res => {
					console.log('最新发布', res)
					if(res.success) {
						this.newList = res.data.list
						this.change4 = false
					}
				})
			},
			getRouter(item) {
				this.$router.push({path: item.path})
			},
			gofreePage(){
				window.location.href = "http://" + window.location.host +"/h5-view/shareFreeList"
			},
			ToCourseList(e) {
				this.$router.push({path: '/courseList', query: {type: e}})
			},
			toCourseDetails(item) {
				console.log(item.collageStatus)
				if(item.collageStatus == 1) {
					this.$router.push({path: '/courseDetailsGroup', query: {id: item.id}})
				}else {
					this.$router.push({ path: '/courseDetails', query: { id: item.id }})
				}
			},
			toSearchPage() {
				this.$router.push({ path: '/searchPage'})
			}
		}
	}
</script>

<style scoped lang="less">
	.index{
		overflow: auto;
		.search_box{
			height: .6rem;
			border-radius: .3rem;
			background: rgba(248,248,248,1);
			margin: .32rem;
			color: rgba(155,155,155,1);
			line-height: .56rem;
			span{
				font-family: iconfont;
				height: .26rem;
				width: .26rem;
				margin: .16rem .12rem 0 .32rem;
			}
		}

		.nav{
			margin: .32rem .32rem .2rem;
			display: flex;
			.nav_list{
				width: .96rem;
				margin: 0 .21rem;
				img{
					width: .6rem;
					height: .6rem;
					margin-left: .18rem;
				}
				p{
					text-align: center;
					color: rgba(106,106,106,1);
					line-height: .34rem;
					font-size: .24rem;
					width: 1rem;
				}
			}
		}
		.border_top{
			border-top: .1rem solid rgba(244,244,244,1);
		}
		.free_course{
			padding: .32rem 0 0 0;
			border-bottom: .01rem solid rgba(248,248,248,1);
			.free_list{
				width: 7.5rem;
				overflow: auto;
				display: flex;
				padding-bottom: .21rem;
			}
			.reset{
				margin-top: .32rem;
			}
		}
		.select_course{
			padding: .32rem 0 .32rem;
			.select_list{
				display: flex;
				flex-wrap: wrap;
			}
		}
		.hot_course{
			padding: .32rem 0 .32rem;
			.hot_list{
				padding-top: 0.07rem;
			}
		}
		.new_course{
			padding: .32rem 0 .84rem;
		}
		.more_corse{
			height: .32rem;
			line-height: .32rem;
			display: flex;
			margin: 0 .32rem;
			p{
				flex: 1;
				color: @main_title_color;
				font-size: .32rem;
				font-weight: 900;
			}
			.more{
				display: flex;
				p{
					font-size: .24rem;
					font-weight: 100;
					line-height: .32rem;
					color: @main_time_color;
				}
				span{
					font-family: iconfont;
					font-size: .24rem;
					margin-left: .16rem;
					color: @main_time_color;
				}
			}
		}
		.reset{
			width: 1.8rem;
			height: .6rem;
			background: rgba(108,221,199,.15);
			border-radius: .3rem;
			color: rgba(108,221,199,1);
			display: flex;
			justify-content: center;
			line-height: .6rem;
			font-size: .26rem;
			margin: 0 2.84rem;
			.change{
				animation: circling 1s linear 0s infinite;
			}
			span{
				font-family: iconfont;
				width: .6rem;
				height: .6rem;
				text-align: center;
				@keyframes circling{
					from{
						transform: rotate(0deg);
					}
					to{
						transform: rotate(360deg);
					}
				}
			}
		}
	}
</style>
