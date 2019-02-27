<template>
	<div class="course_classify outermost">
			<div class="filtrate">
				<div class="filtrate_item" v-for="(item, index) in list" :key="index" :class="activeIndex == index ? 'active' : ''" @click="chooseSortord(index)">
					<p v-if="index == 0">{{ kindsName || item.name }}</p>
					<p v-if="index == 1">{{ sortName || item.name }}</p>
					<p v-if="index == 2">{{ priceName || item.name}}</p>
					<span :class="item.icon"></span>
				</div>
			</div>
		<scroll v-if="courseList.length != 0" :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
		<div class="course_list">
				<p class="courseNum" v-if="showCourseNum">“{{kindsName}}” 分类下，为您找到{{pageTotal}}篇课程。</p>
				<classList :id="item.catalogId"  v-for="(item,index) in courseList" @click.native="toCourseDetail(item)" :key="index"  :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></classList>
			</div>
		</scroll>
		<empty v-else :title="emptyJSON.title" :img="emptyJSON.img"></empty>
		<popup v-model="showMask1" max-height="60%" position="top" style="overflow: inherit">
			<div class="filtrate"  style="position: absolute; width: 100%; top: -.96rem;">
				<div class="filtrate_item" v-for="(item, index) in list" :key="index" :class="activeIndex == index ? 'active' : ''" @click="chooseSortord(index)">
					<p v-if="index == 0">{{ kindsName || item.name }}</p>
					<p v-if="index == 1">{{ sortName || item.name }}</p>
					<p v-if="index == 2">{{ priceName || item.name}}</p>
					<span :class="item.icon"></span>
				</div>
			</div>
			<ul class="menu_first">
				<li :class="firstActiveIndex == index ? 'active_menu_first' : ''" v-for="(item, index) in menuFirst" :key="index" @click="getSecondMenu(item, index)">{{ item.name }}</li>
			</ul>
			<ul class="menu_second">
				<li :class="secondActiveIndex == index ? 'active_menu_second' : ''" @click="changeList(item, index)" v-for="(item, index) in menuSceond" :key="index" >{{ item.name }}</li>
			</ul>
		</popup>
		<popup v-model="showMask2" position="top" style="overflow: inherit;">
			<div class="filtrate"  style="position: absolute; width: 100%; top: -.96rem;">
				<div class="filtrate_item" v-for="(item, index) in list" :key="index" :class="activeIndex == index ? 'active' : ''" @click="chooseSortord(index)">
					<p v-if="index == 0">{{ kindsName || item.name }}</p>
					<p v-if="index == 1">{{ sortName || item.name }}</p>
					<p v-if="index == 2">{{ priceName || item.name}}</p>
					<span :class="item.icon"></span>
				</div>
			</div>
			<ul class="sort_list">
				<li :class="sortIndex == index ? 'active_sort' : ''" v-for="(item, index) in sortList" :key="index" @click="changeList(item, index)">{{ item.name }}</li>
			</ul>
		</popup>
		<popup v-model="showMask3" width="5.14rem" position="right" style="overflow: inherit;">
			<div class="filtrate"  style="position: absolute; width: 7.5rem; left: -2.37rem; top: -.96rem">
				<div class="filtrate_item" v-for="(item, index) in list" :key="index" :class="activeIndex == index ? 'active' : ''" @click="chooseSortord(index)">
					<p v-if="index == 0">{{ kindsName || item.name }}</p>
					<p v-if="index == 1">{{ sortName || item.name }}</p>
					<p v-if="index == 2">{{ priceName || item.name}}</p>
					<span :class="item.icon"></span>
				</div>
			</div>
			<div class="price_box">
				<p>课程类型</p>
				<ul class="price_list">
					<li :class="priceIndex == index ? 'active_price' : ''" v-for="(item, index) in priceList" :key="index" @click="changeList(item, index)">{{ item.name }}</li>
				</ul>
			</div>
		</popup>
	</div>
</template>

<script>
	import api from "fetch/api";
	import scroll from 'module/scroll'
	import empty from 'module/empty'
	import classList from 'module/classList'
	import { Popup } from 'vux'

    export default {
        name: "courseList",
		data() {
			return {
				emptyJSON: {
					title: '暂无相关课程',
					img: require('@/assets/images/noContent/no_course.png')
				},
				list: [
					{
						name: '全部',
						icon: 'icon-sanjiao'
					},
					{
						name: '综合排序',
						icon: 'icon-sanjiao'
					},
					{
						name: '筛选',
						icon: 'icon-shaixuan'
					}
				],
				sortList: [
					{
						name: '人气最高',
						type: 1
					},
					{
						name: '最新发布',
						type: 2
					},
					{
						name: '价格由高到低',
						type: 3
					},
					{
						name: '价格由低到高',
						type: 4
					}
				],
				priceList: [
					{
						name: '全部',
						type: ''
					},
					{
						name: '免费',
						type: true
					},
					{
						name: '付费',
						type: false
					}
				],
				pageSize: 10,
				pageNum: 1,
				pageTotal : null,
				courseList: [],
				kindsName: this.$route.query.name,
				sortName: '',
				priceName: '',
				activeIndex: 0,
				sortIndex: -1,
				priceIndex: 0,
				showMask1: false,
				showMask2: false,
				showMask3: false,
				menuFirst: [],
				menuSceond: [],
				first: this.$route.query.first,
				second: this.$route.query.second,
				firstActiveIndex: this.$route.query.firstIndex || -1,
				secondActiveIndex: this.$route.query.secondIndex || -1,
				showCourseNum: false,
				params: {}
			}
		},
		created() {
			// switch (this.$route.query.type) {
			// 	case 1:
			// 		// this.showMask3 = true
			// 		this.changeList({name: '免费', type: true}, 1)
			// 		break;
			// 	case 2:
			// 		// this.showMask3 = true
			// 		this.changeList({name: '付费', type: false}, 2)
			// 		break;
			// 	case 3:
			// 		// this.showMask2 = true
			// 		this.changeList({name: '人气最高', type: 1}, 0)
			// 		break;
			// 	case 4:
			// 		// this.showMask2 = true
			// 		this.changeList({name: '最新发布', type: 2}, 1)
			// 		break;
			// }
			if(!this.$route.query.type) {
				this.params = {
					page: this.pageNum,
					size: this.pageSize,
					status: 40,
					catalogId: this.$route.query.first,
					catalogSecondId: this.$route.query.second
				}
				this.pageCourse()
			}else if(this.$route.query.type == 1) {
				this.changeList({name: '免费', type: true}, 1)
				this.params = {
					page: this.pageNum,
					size: this.pageSize,
					status: 40,
					catalogId: this.first,
					catalogSecondId: this.second,
					isFree: true
				}
				this.pageCourse()
			}else if(this.$route.query.type == 2) {
				this.changeList({name: '付费', type: false}, 2)
				this.params = {
					page: this.pageNum,
					size: this.pageSize,
					status: 40,
					catalogId: this.first,
					catalogSecondId: this.second,
					isFree: false
				}
				this.pageCourse()
			}else if(this.$route.query.type == 3) {
				this.changeList({name: '人气最高', type: 1}, 0)
				this.params = {
					page: this.pageNum,
					size: this.pageSize,
					status: 40,
					orderType: 1
				}
				this.pageCourse()
			}else if(this.$route.query.type == 4) {
				this.changeList({name: '最新发布', type: 2}, 1)
				this.params = {
					page: this.pageNum,
					size: this.pageSize,
					status: 40,
					orderType: 2
				}
				this.pageCourse()
			}
		},
		beforeRouteEnter(to, from, next){
			if(from.name == 'classfiy'){
        		this.showCourseNum = true
			}
			next();
		},
		beforeRouteLeave(to, from, next) {
			if(to.name != 'courseDetails' || to.name != 'courseDetailsGroup') {
				this.$destroy()
			}
			next()
		},
		components: {
			scroll,
			classList,
			Popup,
			empty
		},
		methods: {
			pageCourse() {
				api.pageCourse(this.params).then(res => {
					console.log(res)
					if(res.success) {
						this.pageTotal = res.data.total;
						this.courseList = [...this.courseList,...res.data.list];
						if(this.showMask1 == true) {
							this.showMask1 = !this.showMask1
						}
						if(this.showMask2 == true) {
							this.showMask2 = !this.showMask2
						}
						if(this.showMask3 == true) {
							this.showMask3 = !this.showMask3
						}
					}
				});
			},
			getFirstMenu() {
				let params = {
					type: 1
				}
				api.listCatalog(params).then(res => {
					console.log(res)
					if(res.success == true) {
						this.menuFirst = res.data
						this.getSecondMenu(res.data[0], 0)
					}
				});
			},
			getSecondMenu(menu, index) {
				this.firstActiveIndex = index
				let params = { parentId: menu.id, type: 3 }
				api.listCatalog(params).then(res => {
					console.log(res)
					if(res.success == true) {
						this.menuSceond = res.data
						this.menuSceond.unshift({name: '全部', id: null})
					}
				});
			},
			pageChange(page){
				console.log(page);
				this.pageNum = page
				this.params.page = this.pageNum
				this.pageCourse();
			},
			chooseSortord(index) {
				this.activeIndex = index;
				this.showCourseNum = false
				if(this.showMask1 == false && index == 0) {
					this.showMask1 = true
					this.getFirstMenu()
				}else{
					this.showMask1 = false
				}
				if(this.showMask2 == false && index == 1) {
					this.showMask2 = true
				}else{
					this.showMask2 = false
				}
				if(this.showMask3 == false && index == 2) {
					this.showMask3 = true
				}else{
					this.showMask3 = false
				}
			},
			changeList(item, index) {
				this.pageNum = 1
				this.courseList = []
				if(this.showMask1 == true){
					this.showCourseNum = true
					this.first = this.menuFirst[this.firstActiveIndex].id
					this.second = item.id
					this.kindsName = this.menuSceond[index].name
					this.secondActiveIndex = index
					this.params = {
						page: this.pageNum,
						size: this.pageSize,
						status: 40,
						catalogId: this.menuFirst[this.firstActiveIndex].id,
						catalogSecondId: item.id
					}
					this.pageCourse()
				}else if(this.showMask2 == true){
					this.sortName = this.sortList[index].name
					this.sortIndex = index
					this.params = {
						page: this.pageNum,
						size: this.pageSize,
						status: 40,
						catalogId: this.first,
						catalogSecondId: this.second,
						orderType: item.type
					}
					this.pageCourse()
				}else if(this.showMask3 == true){
					this.priceIndex = index
					this.priceName = this.priceList[index].name
					this.params = {
						page: this.pageNum,
						size: this.pageSize,
						status: 40,
						catalogId: this.first,
						catalogSecondId: this.second,
						isFree: item.type
					}
					this.pageCourse()
				}else if(this.$route.query.type == 1 || this.$route.query.type == 2) {
					this.priceIndex = index
					this.priceName = this.priceList[index].name
				}else if(this.$route.query.type == 3 || this.$route.query.type == 4) {
					this.sortName = this.sortList[index].name
					this.sortIndex = index
				}
			},
			toCourseDetail(item) {
				if(item.collageStatus == 1) {
					this.$router.push({path: '/courseDetailsGroup', query: {id: item.id}})
				}else {
					this.$router.push({ path: '/courseDetails', query: { id: item.id }})
				}
			}
		}
    }
</script>

<style scoped lang="less">
	.course_classify{
		display: flex;
		flex-direction: column;
		empty{
			flex: 1;
		}
		.courseNum{
			color: @active-color;
			text-align: center;
			height: .6rem;
			line-height: .6rem;
			width: 6.9rem;
			margin-left: .32rem;
			background: rgba(188,190,193,.15);
			border-radius: .08rem;
			margin-top: .18rem;
		}
		.filtrate{
			z-index: 9999;
			display: flex;
			height: .96rem;
			border-bottom: .01rem solid rgba(238,238,238,1);
			background: #fff;
			.filtrate_item{
				flex: 1;
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				p{
					margin-right: .1rem;
				}
				span{
					font-family: iconfont;
					color: @main_time_color;
				}
			}
			.active{
				color: @active-color;
				span:before{
					color: @active-color;
				}
			}
		}
		.menu_first{
			width: 2.04rem;
			display: flex;
			flex-direction: column;
			background: rgba(248,248,248,1);
			overflow: auto;
			li{
				height: .96rem;
				text-indent: .32rem;
				line-height: .96rem;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.active_menu_first{
				color: @active-color;
				border-left: .04rem solid  @active-color;
				background: #fff;
			}
		}
		.menu_second{
			width: 5.44rem;
			display: flex;
			line-height: .96rem;
			flex-wrap: wrap;
			overflow: auto;
			align-content: flex-start;
			li{
				height: .96rem;
				width: 50%;
				text-align: center;
				box-sizing: border-box;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&:nth-of-type(n){
					padding: 0 .16rem 0 .32rem;
				}
				&:nth-of-type(2n){
					padding: 0 .32rem 0 .16rem;
				}
			}
			.active_menu_second{
				color: @active-color;
			}
		}
		.sort_list{
			width: 100%;
			li{
				background: #F8F8F8;
				height: .96rem;
				margin-bottom: .02rem;
				line-height: .96rem;
				text-indent: .32rem;
			}
			.active_sort{
				background: #fff;
				color: @active-color;
			}
		}
		.price_box{
			width: 100%;
			p{
				height: .96rem;
				line-height: .96rem;
				text-indent: .3rem;
				color: @main_content_color;
			}
			.price_list{
				width: 100%;
				height: .7rem;
				display: flex;
				margin: 0 .3rem;
				li{
					width: 1.4rem;
					line-height: .7rem;
					background: #F6F6F6;
					box-sizing: border-box;
					margin-right: .18rem;
					text-align: center;
					border-radius: .08rem;
					color: @main_time_color;
					&:nth-of-type(3){
						margin: 0;
					}
				}
				.active_price{
					background: rgba(108,221,199,0.15);
					color: @active-color;
				}
			}
		}
	}
</style>
