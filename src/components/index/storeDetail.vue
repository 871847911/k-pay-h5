<template>
    <div class="store_detail outermost">
		<scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
			<swiper :list="swiperList" auto loop :show-dots="false" :interval="3000" :aspect-ratio="216/750"></swiper>
			<p class="title">{{ storeInfo.name }}</p>
			<p class="store_introduce" :class=" hide == true ? 'hide_introduce' : ''">{{ storeInfo.information }}</p>
			<p class="hide" @click="showIntrduce">{{ hideText }}</p>
			<p class="title top76">讲师</p>
			<div class="lectuer">
				<userList v-for="(item, index) in lecturerList" :key="index" @click.native="toLecturerDetail(item)" :img="item.photoUrl" :name="item.realName" :courseNum="item.courseNum" :courseSaleNum="item.courseSaleNum" :subscribedNum="item.subscribedNum"></userList>
			</div>
		</scroll>
	</div>
</template>

<script>
	import api from "fetch/api";
	import { Swiper } from 'vux'
	import scroll from 'module/scroll'
	import userList from 'module/userList'
    export default {
        name: "storeDetail",
		data() {
        	return {
				pageNum: 1,
				pageSize: 10,
				pageTotal: 1,
				swiperList: [],
				storeInfo: {},
				hide: true,
				hideText: '阅读更多',
				lecturerList: []
			}
		},
		created() {
        	this.getWithCount()
			this.getLecturerList()
			this.getBannerList()
		},
		components: {
			Swiper,
			scroll,
			userList
		},
		methods: {
			getWithCount() {
				api.getWithCount({}).then(res => {
					console.log('店铺信息', res)
					if(res.success) {
						this.storeInfo = res.data.store
					}
				})
			},
			getBannerList() {
				let	params = { type: 2 }
				api.listBanner(params).then(res => {
					console.log('店铺详情展示图', res)
					if(res.success) {
						this.swiperList = res.data.map((item, index) => ({
							url: {path: item.linkType == 1 ? '/courseDetails' : item.linkType == 2 ? '/lecturerDetail' : item.linkType==3&&item.linkValue==1 ? '/myGroup' : '/sendRecord', query: { id: item.linkValue }},
							img: item.sourceUrl,
						}))
					}
				})
			},
			getLecturerList() {
				let	params = {
					page: this.pageNum,
					size: this.pageSize
				}
				api.lecturerList(params).then(res => {
					console.log('讲师列表', res)
					if(res.success) {
						this.lecturerList = [...this.lecturerList, ...res.data.list]
						this.pageTotal = res.data.total
					}
				})
			},
			pageChange(page) {
				this.pageNum = page;
				this.getLecturerList()
			},
			showIntrduce() {
				if(this.hide) {
					this.hide = false
					this.hideText = '收起'
				}else{
					this.hide = true
					this.hideText = '阅读更多'
				}
			},
			toLecturerDetail(item) {
				this.$router.push({path: '/lecturerDetail', query: {id: item.id}})
				console.log(item.id)
			}
		}
    }
</script>

<style scoped lang="less">
	.store_detail{
		.title{
			font-size: .34rem;
			line-height: .48rem;
			height: .48rem;
			color: @main_title_color;
			font-weight: 900;
			margin-left: .32rem;
			margin-top: .26rem;
		}
		.top76{
			margin-top: .76rem;
		}
		.store_introduce{
			margin: .16rem .32rem 0;
			color: @main_content_color;
			line-height: .36rem;
			font-size: .26rem;
		}
		.hide_introduce{
			height: .72rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.hide{
			margin-left: .32rem;
			color: @active-color;
		}
	}
</style>
