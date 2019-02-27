<template>
	<div class="search_page outermost">
		<div class="search_box">
			<form class="search" action='' onsubmit="return false">
				<span class="icon-fangdajing"></span>
				<input v-model="inputValue" autofocus @click="showHistory = true" maxlength="15" @keyup.enter="setItem" type="search" />
				<span class="icon-ego-guanbi" @click="removeInput"></span>
			</form>
			<p @click="toHome">取消</p>
		</div>
		<!--搜索历史-->
		<div class="search_history" v-if="showHistory == true">
			<div class="title">
				<p>搜索历史</p>
				<p @click="removeItem">清除历史</p>
			</div>
			<div class="history">
				<div class="history_list" v-if="index<8" v-for="(item, index) in history" :key="index">
					<span class="icon-fangdajing iconfont"></span>
					<p @click="searchAgain(item, index)">{{ item }}</p>
					<span class="icon-ego-guanbi iconfont" @click="deleteOneHistory(item, index)"></span>
				</div>
			</div>
		</div>
		<!--tab选项-->
		<div class="search_result" v-if="!showHistory">
			<tab :line-width="2" custom-bar-width=".56rem" v-model="activeIndex">
				<tab-item @on-item-click="chooseType(index)" v-for="(item, index) in nav" :key="index">{{ item.name }}</tab-item>
			</tab>
			<div class="no_content" v-if="showEmpty">
				<img src="../../assets/images/noContent/search_result.png" alt="">
				<p>抱歉，未找到相关内容~换个词试试</p>
			</div>
			<div class="has_content">
				<div class="course" v-if="courseList.length != 0 && activeIndex == 0">
					<classList v-for="(item, index) in courseList" @click.native="toCourseDetails(item)" :key="index" :id="item.id" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></classList>
				</div>
				<div class="lectuer" v-if="lecturerList.length != 0 && activeIndex == 1">
					<userList v-for="(item, index) in lecturerList" @click.native="toLecturerDetail(item)" :key="index" :img="item.photoUrl" :name="item.realName" :courseNum="item.courseNum" :courseSaleNum="item.courseSaleNum" :subscribedNum="item.subscribedNum"></userList>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from "fetch/api";
	import { Tab, TabItem } from 'vux'
	import classList from 'module/classList'
	import userList from 'module/userList'
	export default {
		name: "searchPage",
		data() {
			return {
				inputValue: '',
				history: [],
				activeIndex: 0,
				courseList: [],
				lecturerList: [],
				showEmpty: false,
				showHistory: true,
				nav: [
					{
						name: '课程'
					},
					{
						name: '讲师'
					}
				]
			}
		},
		created() {
			if(localStorage.getItem("history") != null) {
				this.history = JSON.parse(localStorage.getItem("history"))
			}
			console.log(this.history)
		},
		components: {
			classList,
			userList,
			Tab,
			TabItem

		},
		directives: {
			focus: {
				inserted: function (el) {
					el.focus()
				}
			}
		},
		methods: {
			setItem() {
				if(this.inputValue.trim() == '') {
					this.$vux.toast.text('请输入搜索内容')
				}else{
					this.searchCollageAll()
					console.log(this.history)
					this.history.unshift(this.inputValue.trim())
					let set = new Set(this.history)
					this.history = [...set]
					localStorage.setItem("history", JSON.stringify(this.history));
				}
			},
			removeItem() {
				localStorage.removeItem('history')
				this.history = []
			},
			removeInput() {
				this.inputValue = ''
			},
			chooseType(index) {
				this.activeIndex = index
				if(index == 0 && this.courseList.length == 0){
					this.showEmpty = true
				}else if(index == 1 && this.lecturerList.length == 0) {
					this.showEmpty = true
				}else{
					this.showEmpty = false
				}
			},
			searchCollageAll() {
				let params = { keywords: this.inputValue.trim()}
				api.searchCollageAll(params).then(res => {
					if(res.success) {
						this.showHistory = false
						this.courseList = res.data.courseList
						this.lecturerList = res.data.lecturerList
						if(this.courseList.length == 0 && this.lecturerList.length == 0) {
							this.showEmpty = true
						}
					}
				})
			},
			deleteOneHistory(e, i) {
				this.history.splice(i, 1)
				localStorage.setItem("history", JSON.stringify(this.history));
			},
			searchAgain(item, index) {
				this.history.splice(index, 1)
				this.history.unshift(item)
				localStorage.setItem("history", JSON.stringify(this.history));
				this.inputValue = item
				this.searchCollageAll()
			},
			toCourseDetails(item) {
				this.$router.push({ path: '/courseDetails', query: { id: item.id }})
			},
			toLecturerDetail(item) {
				console.log(item)
				this.$router.push({path: '/lecturerDetail', query: {id: item.id}})
			},
			toHome() {
				this.$router.push({path: '/home' })
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.name == 'home') {
				this.$destroy()
			}
			next()
		}
	}
</script>

<style scoped lang="less">
	.search_page{
		display: flex;
		flex-direction: column;
		background: rgba(244,244,244,1);
		.search_box{
			padding: .32rem 0 .15rem;
			display: flex;
			background: #fff;
			.search{
				background: rgba(248,248,248,1);
				width: 5.96rem;
				height: .56rem;
				border-radius: .28rem;
				margin-left: .3rem;
				line-height: .56rem;
				display: flex;
				input{
					flex: 1;
					border: 0;
					height: .56rem;
					background: rgba(248,248,248,1);
				}
				span{
					font-family: iconfont;
					&:nth-of-type(1) {
						margin: 0 .2rem 0 .3rem;
						color: @main_content_color;
					}
					&:nth-of-type(2) {
						margin: .12rem .3rem 0 0;
						color: #fff;
						width: .32rem;
						height: .32rem;
						line-height: .32rem;
						border-radius: 50%;
						font-size: .16rem;
						text-align: center;
						background: #C8C8C8;
					}
				}
			}
			p{
				line-height: .56rem;
				margin-left: .4rem;
				color: @active-color;
			}
		}
		.vux-tab-item{
			background: 0;
			font-size: .28rem;
		}
		.search_result{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.search_history{
			flex: 1;
			background: #fff;
			.title{
				line-height: .5rem;
				height: .5rem;
				margin: .4rem .32rem 0;
				display: flex;
				justify-content: space-between;
				p{
					&:nth-of-type(1) {
						color: #000;
						font-size: .36rem;
						font-weight: 900;
					}
					&:nth-of-type(2) {
						color: @main_time_color;
						font-size: .24rem;
					}
				}
			}
			.history{
				margin: .38rem .32rem 0;
				color: @main_content_color;
				font-size: .24rem;
				.history_list{
					display: flex;
					border-bottom: .01rem solid rgba(204,204,204,1);
					height: .84rem;
					line-height: .84rem;
					p{
						flex: 1;
						text-align: left;
						text-indent: .24rem;
						font-size: .28rem;
					}
					span:nth-of-type(1) {
						color: #f66;
						font-size: .28rem;
					}
					span:nth-of-type(2) {
						color: #000;
						font-size: .2rem;
					}
				}
			}
		}
		.type_tab{
			display: flex;
			margin: .38rem 0 0 .3rem;
			padding-bottom: .5rem;
			.type-item{
				p{
					margin-right: .46rem;
					font-size: .28rem;
					color: @main_title_color;
					height: .5rem;
					line-height: .5rem;
					padding-bottom: .02rem;
				}
				.line{
					height: .04rem;
					width: .36rem;
					margin-left: .18rem;
					background: #fff;
				}
			}
			.type-active{
				p{
					color: @active-color;
					font-size: .36rem;
					font-weight: 900;
				}
				.line{
					background: @active-color;
				}
			}
		}
		.no_content{
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			img{
				width: 3rem;
				height: 1.86rem;
				margin-top: -1rem;
			}
			p{
				margin-top: .48rem;
				font-size: .3rem;
				color: @main_time_color;
			}
		}
		.has_content{
			.course{
				.class_list{
					border-top: .2rem solid rgba(244,244,244,1);
				}
			}
		}
	}
</style>
