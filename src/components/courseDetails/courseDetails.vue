<template>
	<div class='courseDetails outermost'>
		<div v-if="course.courseMain" :line-width="1" class="courseBanner">
			<div v-if="showItem==0">
				<img class="courseUrlFirst" v-lazy="course.courseMain.courseUrlFirst" alt="">
			</div>
			<div v-else>
				<div v-if="course.courseMain.subType==1">
					<img class="courseUrlFirst" v-lazy="course.courseMain.courseUrlFirst" alt="">
				</div>
				<div v-if="course.courseMain.subType==2">
					<img class="courseUrlFirst" v-lazy="course.courseMain.courseUrlFirst" alt="">
				</div>
				<div class="videoBox" v-if="course.courseMain.subType==3">
					<!-- <video width="750" height="416" src="" webkit-playsinline="true"></video> -->
					<video @play="onPlayerPlay" ref="refVideo" class="video-js jd-video" webkit-playsinline="true" playsinline="true" :src="courseVideo"
					 x5-playsinline controls="" :poster="course.courseMain.courseUrlFirst">  
					</video>
				</div>
			</div>

		</div>
		<tab custom-bar-width="20px">
			<tab-item selected @on-item-click="onItemClick">课程浏览</tab-item>
			<tab-item @on-item-click="onItemClick">课程详情</tab-item>
		</tab>
		<div class="itemMain" v-if="showItem==0">
			<div class="courseNameBox" v-if="course.courseMain">
				<div class="courseName">{{course.courseMain.courseName}}</div>
				<!--<div class="zengsong_box" v-if="course.courseMain.price!=0" @click="checkGiftShare"><i class="iconfont icon-liwu-"></i> 赠送</div>-->
				<div class="zengsong_box" v-if="course.courseMain.price!=0" @click="getIsZengsong"><i class="iconfont icon-liwu-"></i>
					赠送</div>
				<div class="course_info_box">
					<div class="courseInfo">
						<p v-if="marketId && pushId" class="price">￥{{ marketInfo.price }}</p>
						<p v-else :class="course.courseMain.price==0?'free':'price'">{{course.courseMain.price==0?"免费":"￥"+course.courseMain.price}}</p>
						<div class="see">
							<i class="iconfont icon-liulan"></i>
							<span class="fonteee">{{course.courseMain.hits}}人</span>
						</div>
						<p class="fonteee">{{course.courseMain.createDate}}</p>
					</div>
				</div>

			</div>
			<div class="courseHtmlBox">
				<div class="title">讲师简介</div>
				<div class="lecturer" v-if="course.lecturer">
					<img class="lecturerPhoto" v-lazy="course.lecturer.photoUrl" alt="">
					<dl class="lecturerName">
						<dt>{{course.lecturer.realName}}</dt>
						<dd>{{course.lecturer.introduce.length > 45? course.lecturer.introduce.slice(0,45) + '...' : course.lecturer.introduce}}</dd>
					</dl>
				</div>
				<div class="title">课程简介</div>
				<div class="courseHtml" v-if="course.courseMain" v-html="course.courseMain.introduction">{{course.courseMain.introduction}}</div>
			</div>
		</div>
		<div class="itemMain" v-else>
			<div class="title">课程目录</div>
			<div v-if="course.courseMain.subType==1">
				<div class="courseSubList" v-if="course.courseSubList">
					<ul>
						<li class="tuwen" v-for="(item, index) in course.courseSubList" :key="index" @click="goCourseListDetails(index)">第{{index+1}}节
							{{item.subName.length > 15? item.subName.slice(0,15) + '...' : item.subName}}<i v-if="!course.isBuy" class="iconfont icon-lock color-2"></i></li>
					</ul>
				</div>
			</div>
			<div v-if="course.courseMain.subType==2">
				<div class="courseSubList" v-if="course.courseSubList">
					<ul>
						<li :class='index==selected&&course.isBuy?"selected":""' v-for="(item, index) in course.courseSubList" :key="index" @click="goCourseAudio(index)"><i
							 v-if="index==selected&&course.isBuy" class="iconfont icon-tianchongxing- color-1"></i> 第{{index+1}}节
							{{item.subName.length > 15? item.subName.slice(0,15) + '...' : item.subName}}<i v-if="!course.isBuy" class="iconfont icon-lock color-2"></i></li>
					</ul>
				</div>
			</div>
			<div v-if="course.courseMain.subType==3">
				<div class="courseSubList" v-if="course.courseSubList">
					<ul>
						<li :class='index==selected&&course.isBuy?"selected":""' v-for="(item, index) in course.courseSubList" :key="index" @click="changeVideo(item,index)"><i
							 v-if="index==selected&&course.isBuy" class="iconfont icon-ziyuanldpi"></i> 第{{index+1}}节 {{item.subName.length > 15? item.subName.slice(0,15) + '...' : item.subName}}<i
							 v-if="!course.isBuy" class="iconfont icon-lock color-2"></i></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="courseBottom" v-if="course.courseMain">
			<div class="buyBox">
				<div class="zixun" @click="clickZixun">
					<i class="iconfont icon-zixunzhuanyefuwu"></i>
					<p>咨询</p>
				</div>
				<div v-if="course.courseMain.price!=0 || marketId">
					<div class="buy isbuy" v-if="course.courseMain.status==50">已下架</div>
					<div class="buy isbuy" v-if="course.isBuy&&course.courseMain.status==40">已购买</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40" @click="toPayPage(0)">立即购买</div>
				</div>
				<div v-else>
					<div class="buy isbuy" v-if="course.courseMain.status==50">已下架</div>
					<div class="buy isbuy" v-if="course.isBuy&&course.courseMain.status==40">已加入</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40" @click="joinFreeCourse">加入课程</div>
				</div>
			</div>
		</div>
		<div class="zixunPopup">
			<popup v-model="showZixun">
				<div class="zixunBox" v-if="course.isBuy">
					<div class="zixunBtn" @click="zixunLecturer">咨询讲师</div>
					<div v-if="course.lecturer!=null" class="zixunBtn bordB" @click="questions">我要提问</div>
				</div>
				<div class="zixunBox" v-if="!course.isBuy">
					<div class="zixunBtn" @click="zixunLecturer">咨询讲师</div>
					<!-- <div class="zixunBtn" @click="questions">我要提问</div> -->
				</div>
				<div class="zixunCancer" @click="zixunCancel">取消</div>
			</popup>
		</div>
		<popup v-model="showZengsong" class="zengsong_popup">
			<div class="top">
				<div class="box">
					<div class="return_btn" @click="showZengsong = false">
						<i class="iconfont icon-cuowu"></i>
					</div>
					<div class="return_btn_lin"></div>
				</div>

			</div>
			<div class="bottom">
				<img class="btm_img" src="../../assets/images/courseDeails/send_gift@3x.png" alt="">
				<p class="zengsong_title">赠人玫瑰,手有余香</p>
				<p class="zengsong_title_small">（还可赠送购买{{zengsongNum}}次）</p>
				<div class="zengsong_details">
					<p>1、购买课程后，可以通过连接分享给好友 </p>
					<p>2、好友领取后就能免费参与赠送课程 </p>
					<p>3、随时在赠送记录中，查看领取详情</p>
				</div>
				<button class="btn" type="button" @click="toPayPage(3)">下一步</button>
				<div class="line"></div>
			</div>
		</popup>
	</div>
</template>

<script>
	import api from "fetch/api";
	import {
		Tab,
		TabItem,
		Popup
	} from "vux";

	export default {
		name: "courseDetails",
		data() {
			return {
				course: {},
				showItem: 0,
				selected: 0,
				courseVideo: "",
				showZixun: false,
				showZengsong: false,
				isZengsong: true,
				zengsongNum: null,
				marketId: this.$route.query.marketId,
				pushId: this.$route.query.pushId,
				marketInfo: {}
			};
		},
		components: {
			Tab,
			TabItem,
			Popup
		},
		created() {
			this.getCoursseDetails();
			if(this.marketId && this.pushId) {
				this.getAppPeddleGoodsDetail()
			}
		},
		methods: {
			getAppPeddleGoodsDetail() {
				let params = {peddleGoodsId: this.marketId}
				api.getAppPeddleGoodsDetail(params).then(res => {
					console.log('商品详情', res)
					if(res.serviceCode === 'E000000000') {
						this.marketInfo = res.data
					}
				})
			},
			getIsZengsong() {
				let params = {
					courseId: this.$route.query.id,
					userId: this.$store.state.userInfo.id
				};
				api.checkGiftShare(params).then(res => {
					if (res.data.status == 0) {
						this.showZengsong = true;
						this.zengsongNum = res.data.number;
					} else {
						this.$vux.toast.text(res.data.message);
					}
				});
			},
			//播放
			onPlayerPlay() {
				if (this.course.isBuy) {

				} else {
					let onVideo = this.$refs.refVideo
					onVideo.currentTime = 0;
					onVideo.pause();
					this.$vux.toast.text("购买后才能查看");
				}
			},
			questions() {
				//我要提问
				this.$router.push({
					path: "/questionTitle",
					query: {
						courseId: this.$route.query.id,
						lecturerId: this.course.lecturer.id
					}
				});
			},
			zixunLecturer() {
				//讲师咨询
				this.$router.push({
					path: "/consult",
					query: {
						courseId: this.$route.query.id
					}
				});
			},
			zixunCancel() {
				//关闭咨询弹窗
				this.showZixun = false;
			},
			clickZixun() {
				//打开咨询弹窗
				this.showZixun = true;
			},
			getCoursseDetails() {
				let params = {
					courseId: this.$route.query.id
				};
				api.getDetail(params).then(res => {
					// console.log("课程详情", res);
					if (res.success == true) {
						this.course = res.data;
						if (res.data.courseMain.subType == 3) {
							if(res.data.isBuy){
								this.courseVideo = res.data.courseSubList[0].subUrl;
							}else{
								this.courseVideo = ""
							}
						}
					} else {
						this.$vux.toast.text(res.message);
					}
				});
			},
			onItemClick(index) {
				if (
					!this.course.isBuy &&
					this.course.courseMain.price != 0 &&
					index == 1 &&
					this.course.courseMain.courseType == 1
				) {
					this.$vux.toast.text("购买后才能查看");
				} else {
					this.showItem = index;
				}
				// console.log("on item click:", index);
			},
			goCourseListDetails(e) {
				console.log(this.course.courseSubList[e].id);
				if (this.course.isBuy) {
					this.$router.push({
						path: "/courseListDetails",
						query: {
							id: this.course.courseSubList[e].id
						}
					});
				} else {
					this.$vux.toast.text("购买后才能查看");
				}
			},
			goCourseAudio(e) {
				// console.log(e);
				if (this.course.isBuy) {
					this.$router.push({
						path: "/courseAudio",
						query: {
							id: this.$route.query.id,
							index: e
						}
					});
				} else {
					this.$vux.toast.text("购买后才能查看");
				}
			},

			changeVideo(item, key) {
				if (this.course.isBuy) {
					let onVideo = this.$refs.refVideo
					onVideo.currentTime = 0;
					onVideo.pause();
					this.selected = key;
					this.courseVideo = this.course.courseSubList[key].subUrl;
				} else {
					this.$vux.toast.text("购买后才能查看");
				}
			},
			//加入免费课程
			joinFreeCourse() {
				let params = {
					courseId: this.$route.query.id
				};
				api.joinFreeCourse(params).then(res => {
					console.log("加入课程", res);
					if (res.success) {
						this.course.isBuy = true;
						this.$vux.toast.text("操作成功");
						window.location.replace(window.location.href)
					} else {
						this.$vux.toast.text(res.message);
					}
				});
			},
			//查询能否赠送
			checkGiftShare() {
				let params = {
					userId: this.$store.state.userInfo.id,
					courseId: this.course.courseMain.id
				};
				api.checkGiftShare(params).then(res => {
					if (res.success) {
						switch (res.data.status) {
							case 0:
								this.showZengsong = true;
								break;
							case 1:
								this.$vux.toast.text("规则规定不能赠送", "top");
								break;
							case 2:
								this.$vux.toast.text("次数超限制不能赠送", "top");
								break;
							case 3:
								this.$vux.toast.text("免费课程不能赠送", "top");
								break;
						}
					} else {
						this.$vux.toast.text(res.success);
					}
				});
			},
			toPayPage(type) {
				this.$router.push({
					name: "orderPay",
					query: {
						courseId: this.course.courseMain.id,
						marketId: this.marketId,
						pushId: this.pushId,
						type: type,
					}
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.color-1 {
		color: #6cddc7;
	}

	.color-2 {
		color: #9b9b9b;
		float: right;
	}

	video {
		width: 100%;
		height: auto;
	}

	.itemMain {
		width: 100%;
		padding-bottom: 0.8rem;
		overflow: hidden;

		.courseNameBox {
			padding: 0.28rem 0 0.38rem 0.3rem;
			border-bottom: 0.1rem solid #f8f8f8;
			overflow: hidden;
			background: #fff;
			.courseName {
				float: left;
				font-size: 0.3rem;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				width: 70%;
				line-height: 0.42rem;
				word-break: break-all;
				overflow:hidden;
				text-overflow:ellipsis;
				display:-webkit-box;
				/* autoprefixer: off */
				-webkit-box-orient:vertical;
				/* autoprefixer: on */
				-webkit-line-clamp:2;
			}

			.zengsong_box {
				float: right;
				border-radius: 2rem 0 0 2rem;
				padding: 0.12rem;
				background: #6cddc7;
				font-size: 0.24rem;
				color: #fff;
			}

			.course_info_box {
				padding-right: 0.3rem;

				.courseInfo {
					float: left;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 0.2rem;

					.free {
						font-size: 0.32rem;
						font-weight: 400;
						color: rgba(108, 221, 199, 1);
						line-height: 0.44rem;
					}

					.price {
						font-size: 0.32rem;
						font-weight: 400;
						color: #fe8060;
						line-height: 0.44rem;
					}

					.fonteee {
						font-size: 0.24rem;
						font-weight: 400;
						color: rgba(155, 155, 155, 1);
						line-height: 0.34rem;
					}
				}
			}
		}

		.courseHtmlBox {
			overflow: hidden;
			background: #fff;
			.lecturer {
				padding: 0 0.3rem 0.38rem 0.3rem;
				display: flex;
				border-bottom: 0.01rem solid #f8f8f8;

				.lecturerPhoto {
					width: 0.96rem;
					height: 0.96rem;
					border-radius: 0.8rem;
				}

				.lecturerName {
					flex: 1;
					padding-left: 0.32rem;

					dt {
						font-size: 0.3rem;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						word-break: break-all;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						/* autoprefixer: off */
						-webkit-box-orient:vertical;
						/* autoprefixer: on */
						-webkit-line-clamp:2;
					}

					dd {
						font-size: 0.24rem;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						line-height: 0.34rem;
						word-break: break-all;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						/* autoprefixer: off */
						-webkit-box-orient:vertical;
						/* autoprefixer: on */
						-webkit-line-clamp:2;
					}
				}
			}

			.courseHtml {
				padding: 0 0.3rem 1.5rem 0.3rem;
				font-size: 0.28rem;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 0.4rem;

				p {
					img {
						margin: 0.28rem 0;
					}
				}
			}
		}

		.courseSubList {
			padding: 0 0.3rem;
			padding-bottom: 0.6rem;
			background: #fff;
			ul {
				li {
					font-size: 0.28rem;
					font-weight: 400;
					color: #666666;
					line-height: 0.2rem;
					padding-bottom: 0.31rem;
					border-bottom: 0.01rem solid #f1f1f1;
					margin-bottom: 0.3rem;
				}

				li.tuwen {
					// color: rgba(108, 221, 199, 1);
				}

				li.selected {
					color: rgba(108, 221, 199, 1);
				}
			}
		}
	}

	.courseBottom {
		position: fixed;
		width: 100%;
		height: 1.06rem;
		bottom: 0;
		left: 0;
		background: #fff;
		border-top: 0.01rem solid #f8f8f8;

		.buyBox {
			display: flex;
			align-items: center;
			padding: 0 0.3rem 0 0;
			height: 100%;

			.zixun {
				flex: 1;
				// height: 100%;
				font-size: 0.2rem;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				text-align: center;

				p {}
			}

			.buy {
				width: 5.8rem;
				height: 0.8rem;
				background: #fe8060;
				line-height: 0.8rem;
				color: #fff;
				text-align: center;
				border-radius: 0.08rem;
				font-size: 0.28rem;
				font-weight: 400;
			}

			.isbuy {
				background: #d4d4d4;
			}
		}
	}

	.title {
		font-size: 0.34rem;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 0.34rem;
		border-left: 0.04rem solid #6cddc7;
		border-radius: 0.02rem;
		margin: 0.3rem 0;
		padding: 0 0.3rem;
	}

	.zixunPopup {
		.vux-popup-dialog {
			background: none;

			.zixunBox {
				margin: 0 0.2rem;
				background: #fff;
				border-radius: 0.3rem;

				.zixunBtn {
					height: 1.12rem;
					font-size: 0.36rem;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 1.12rem;
					text-align: center;
				}

				.bordB {
					border-top: 0.02rem solid #f1f1f1;
				}
			}

			.zixunCancer {
				height: 1.12rem;
				font-size: 0.36rem;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 1.12rem;
				text-align: center;
				background: rgba(255, 255, 255, 1);
				border-radius: 0.24rem;
				margin: 0.18rem 0.2rem;
			}
		}
	}
</style>
<style lang="less">
	.courseDetails {
		.zengsong_popup.vux-popup-dialog {
			background: transparent;

			.top {
				width: 100%;
				height: 0.8rem;
				background: transparent;

				.box {
					float: right;
					margin-right: 0.48rem;
					display: flex;
					flex-direction: column;
					align-items: center;

					.return_btn {
						width: 0.56rem;
						height: 0.56rem;
						line-height: 0.56rem;
						text-align: center;
						color: #fff;
						border-radius: 50%;
						border: 1px solid #fff;
					}

					.return_btn_lin {
						width: 1px;
						height: 0.22rem;
						border-left: 1px solid #fff;
					}
				}
			}

			.bottom {
				width: 100%;
				background: #fff;
				border-radius: 8px 8px 0 0;
				display: flex;
				flex-direction: column;
				align-items: center;

				.btm_img {
					width: 2rem;
					height: 2rem;
				}

				.zengsong_title {
					margin-top: 0.12rem;
					font-size: 0.28rem;
					color: #6cddc7;
				}

				.zengsong_title_small {
					color: #999;
					font-size: 0.24rem;
					margin-top: 0.08rem;
				}

				.zengsong_details {
					padding-top: 0.38rem;
					padding-bottom: 0.32rem;
					color: #333;
					line-height: 0.5rem;
				}

				.btn {
					border: 0;
					background: #6cddc7;
					color: #fff;
					display: block;
					font-size: 0.36rem;
					padding: 0.32rem 3rem;
				}

				.line {
					height: 0.48rem;
				}
			}
		}
	}
	img.courseUrlFirst{
		height: 4.16rem;
	}
</style>
