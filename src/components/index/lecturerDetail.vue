<template>
    <div class="lecturer_detail outermost">
		<div class="bg_img">
			<img src="../../assets/images/lecturer_bg.jpg" alt="">
		</div>
		<div class="lecturer_info">
			<div class="lecturer_img">
				<img v-lazy="lecturerInfo.photoUrl" alt="">
			</div>
			<p>{{ lecturerInfo.realName }}</p>
			<p :class="noticeStatus ? 'notice' : 'disnotice'" @click="noticeLecturer">{{ notice }}</p>
		</div>
		<div class="introduce">
			<div class="buy_num">
				<p>课程：{{ lecturerInfo.courseNum }}</p>
				<p>{{ lecturerInfo.subscribedNum }}人关注</p>
			</div>
			<p class="p_introduce" :class=" hide == true ? 'hide_introduce' : ''">{{ lecturerInfo.introduce || '这个讲师有点儿懒～没介绍自己呢～' }}</p>
			<p class="hide" @click="showIntrduce">{{ hideText }}</p>
		</div>
		<div class="lecturer_course">
			<p>课程</p>
			<classList v-for="(item,index) in lecturerCourse" :key="index" @click.native="toCourseDetails(item)" :id="item.id" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></classList>
		</div>
		<popup v-model="showMask" position="bottom">
			<p>确定取消关注{{ lecturerInfo.realName }}吗？</p>
			<p @click="cancel">取消关注</p>
			<p @click="showMask = false">取消</p>
		</popup>
	</div>
</template>

<script>
	import api from "fetch/api";
	import classList from 'module/classList'
	import { Popup } from 'vux'
	export default {
        name: "lecturerDetail",
		data() {
			return {
				lecturerId: this.$route.query.id,
				lecturerInfo: {},
				lecturerCourse: [],
				notice: '+ 关注',
				noticeStatus: false,
				showMask: false,
				hide: true,
				hideText: '阅读更多',
			}
		},
		created() {
			this.lecturerDetail()
			console.log(this.noticeStatus)
		},
		methods: {
			lecturerDetail() {
				let params = {lecturerId: this.lecturerId}
				api.lecturerDetail(params).then(res => {
					console.log('讲师详情', res)
					if(res.success) {
						this.lecturerInfo = res.data.lecturer
						this.lecturerCourse = res.data.courseList
						this.noticeStatus = res.data.subscribed
						if(res.data.subscribed) {
							this.notice = '已关注'
						}
					}
				})
			},
			noticeLecturer() {
				if(this.noticeStatus) {
					this.showMask = true
				}else{
					this.subscribe()
				}
			},
			subscribe() {
				let params = {lecturerId: this.lecturerId}
				api.subscribe(params).then(res => {
					console.log('关注讲师', res)
					if(res.success) {
						this.noticeStatus = true
						this.notice = '已关注'
					}
				})
			},
			cancel() {
				let params = {lecturerId: this.lecturerId}
				api.cancel(params).then(res => {
					console.log('取消关注', res)
					if(res.success) {
						this.noticeStatus = false
						this.notice = '+ 关注'
						this.showMask = false
					}
				})
			},
			toCourseDetails(item) {
				this.$router.push({ path: '/courseDetails', query: { id: item.id }})
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
		},
		components: {
			classList,
			Popup
		}
    }
</script>

<style scoped lang="less">
	.lecturer_detail {
		.bg_img {
			width: 7.5rem;
			height: 2.16rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.lecturer_info {
			margin: 0 .32rem;
			height: 1.02rem;
			position: relative;
			padding-bottom: .22rem;
			border-bottom: .01rem solid rgba(238,238,238,1);
			.lecturer_img {
				width: 1.32rem;
				height: 1.32rem;
				border-radius: 50%;
				border: .08rem solid #fff;
				overflow: hidden;
				position: absolute;
				top: -.38rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			p {
				display: inline-block;
				&:nth-of-type(1) {
					line-height: 1.02rem;
					margin-left: 1.64rem;
					font-size: .3rem;
					font-weight: 900;
					color: @main_title_color;
				}
				&:nth-of-type(2) {
					float: right;
					font-weight: 900;
					height: .56rem;
					line-height: .56rem;;
					width: 1.52rem;
					margin-top: .24rem;
					text-align: center;
					border-radius: .28rem;
					font-size: .24rem;
				}
			}
			.disnotice{
				border: .02rem solid @active-color;
				color: #fff;
				background: @active-color;
			}
			.notice{
				background: #D4D4D4;
				color: #fff;
				border: .02rem solid #D4D4D4;
			}
		}
		.introduce{
			padding: .34rem .32rem .22rem;
			border-bottom: .1rem solid rgba(248,248,248,1);
			.buy_num{
				height: .32rem;
				line-height: .34rem;
				display: flex;
				p{
					color: @main_time_color;
					&:nth-of-type(2) {
						margin-left: 1.6rem;
					}
				}
			}
			.p_introduce {
				line-height: .4rem;
				color: @main_content_color;
				font-size: .26rem;
				margin-top: .32rem;
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
				color: @active-color;
			}
		}
		.lecturer_course{
			margin-top: .36rem;
			p{
				height: .36rem;
				line-height: .36rem;
				border-left: .04rem solid @active-color;
				text-indent: .3rem;
				font-size: .34rem;
				font-weight: 900;
				padding: .06rem 0;
			}
		}
		.vux-popup-dialog{
			p{
				height: 1rem;
				line-height: 1rem;
				text-align: center;
				background: #fff;
				color: @main_title_color;
				font-size: .36rem;
				&:nth-of-type(1) {
					padding: .01rem 0 0;
					font-size: .3rem;
				}
				&:nth-of-type(2) {
					color: rgba(254,59,47,1);
					border-top: .02rem solid #D6D6D2;
					border-bottom: .11rem solid #E5E5E5;
				}
			}
		}
	}
</style>
