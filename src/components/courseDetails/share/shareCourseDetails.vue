<template>
	<div class="share_course_details outermost">
		<div v-if="course.courseMain" :line-width="1" class="courseBanner">
			<div class="index_btn">
				<router-link :to="{name : 'home'}" class="to_index">
					<i class="iconfont icon-xiazai44"></i>
				</router-link>
			</div>
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
				<div class="zengsong_box" v-if="course.courseMain.price!=0" @click="getIsZengsong"><i class="iconfont icon-liwu-"></i>
					赠送</div>
				<div class="course_info_box">
					<div class="courseInfo">
						<!-- <p :class="course.courseMain.price==0?'free':'price'">{{course.courseMain.price==0?"免费":"￥"+course.courseMain.price}}</p> -->
						<p :class="sharePrice==0?'free':'price'">{{sharePrice==0?"免费":"￥"+Number(sharePrice).toFixed(2)}}</p>
						<div class="see">
							<i class="iconfont icon-liulan"></i>
							<span class="fonteee">{{course.courseMain.hits}}人</span>
						</div>
						<p class="fonteee">{{course.courseMain.createDate}}</p>
					</div>
					<div class="share_box">
						<div class="left">
							分享免费读
						</div>
						<div class="right">
							<router-link :to="{name : 'shareRuleDetali' , query : {courseId : $route.query.courseId}}">查看分享规则</router-link>
						</div>
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
				<div class="fenxiang" @click="showToast = true">
					分享{{shareNum.nowNum + '/' + shareNum.maxNum}}
				</div>
				<div v-if="course.courseMain.price==0">
					<div class="buy isbuy" v-if="course.courseMain.status==50">已下架</div>
					<div class="buy isbuy" v-if="course.isBuy&&course.courseMain.status==40">已加入</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40" @click="joinFreeCourse">加入课程</div>
				</div>
				<div v-else>
					<div class="buy isbuy" v-if="course.courseMain.status==50">已下架</div>
					<div class="buy isbuy" v-if="course.isBuy&&course.courseMain.status==40">已购买</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40&&sharePrice!=0" @click="toPayPage(1)">立即购买</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40&&sharePrice==0" @click="toPayPage(1)">领取课程</div>
				</div>
			</div>
		</div>
		<div class="zixunPopup">
			<popup v-model="showZixun">
				<div class="zixunBox" v-if="course.isBuy">
					<div class="zixunBtn" @click="zixunLecturer">咨询讲师</div>
					<div class="zixunBtn bordB" @click="questions">我要提问</div>
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
				<img class="btm_img" src="../../../assets/images/courseDeails/send_gift@3x.png" alt="">
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

		<!--分享弹出框-->
		<x-dialog v-model="showToast" hide-on-blur class="share_box_msg">
			<div class="share_box_msg_main">
				<div class="main_title">赠送好友</div>
				<div class="details">
					请点击右上角的【···】 <br />
					并发送给朋友
				</div>
			</div>

		</x-dialog>
	</div>
</template>

<script>
	import api from "fetch/api";
	import {
		Tab,
		TabItem,
		Popup,
		XDialog
	} from "vux";
	export default {
		name: "share_course_details",
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
				showToast: false,
				shareNum: null,
				sharePrice : null
			};
		},
		components: {
			Tab,
			TabItem,
			Popup,
			XDialog
		},
		created() {
			this.getCoursseDetails();
			this.getRuleStepFunc();
			if(this.$route.query.type == 'newShare'){
				this.shareNumAdd();
			}
		},
		methods: {
			getIsZengsong() {
				let params = {
					courseId: this.$route.query.courseId,
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
						courseId: this.$route.query.courseId,
						lecturerId: this.course.lecturer.id
					}
				});
			},
			zixunLecturer() {
				//讲师咨询
				this.$router.push({
					path: "/consult",
					query: {
						courseId: this.$route.query.courseId
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
			//获取课程详情
			getCoursseDetails() {
				let params = {
					courseId: this.$route.query.courseId
				};
				api.getDetail(params).then(res => {
					console.log("获取课程详情" , res)
					if (res.success) {
						this.course = res.data;
						this.getWxShareDoc();
						if (res.data.courseMain.subType == 3) {
							if(res.data.isBuy){
								this.courseVideo = res.data.courseSubList[0].subUrl;
							}else{
								this.courseVideo = ""
							}
						}
					}
				});
			},
			//获取该课程分享进度
			getRuleStepFunc() {
				let params = {
					courseId: this.$route.query.courseId,
					userId: this.$store.state.userInfo.id
				};
				api.getRuleStep(params).then(res => {
					this.shareNum = res.data.appShareCoursePriceDto;
					this.sharePrice = res.data.appShareCoursePriceDto.discountPrice
				});
			},
			//微信分享
			getWxShareDoc(){
				let pageInfo = {
					title : '分享免费读',
					desc : '高抬贵手点击一下，我能获得优惠，好人一生平安',
					img : this.course.courseMain.courseUrlFirst,
					url : "http://"+window.location.host+"/h5-view#/shareFreeCourseDetails?courseId=" +this.$route.query.courseId + '&type=newShare&nowUserId=' + this.$store.state.userInfo.id
					// url : "http://"+window.location.host+"/h5-view/shareFreeCourseDetails#"
				};
				this.$store.dispatch("shareConfig" , pageInfo);
			},
			//分享成功次数+1
			shareNumAdd(){
				let params = {
					courseId : this.$route.query.courseId,
					initiatorId : this.$route.query.nowUserId,
					recipientOpenId : this.$store.state.userInfo.wxOpenid
				}
				api.insertRule(params).then(res => {
					console.log(res)
				})
			},
			onItemClick(index) {
				if (
					!this.course.isBuy &&
					this.course.courseMain.price != 0 &&
					index == 1
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
					courseId: this.$route.query.courseId
				};
				api.joinFreeCourse(params).then(res => {
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
					courseId: this.$route.query.courseId
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
						type: type
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.share_course_details {
		.color-1 {
			color: #6cddc7;
		}

		video {
			width: 100%;
			height: auto;
		}
		.courseBanner{
			position: relative;
			.index_btn{
				overflow: hidden;
				position: absolute;
				top: 0.5rem;
				right: 0 ;
				.to_index{
					width: 1.2rem;
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					border-radius: 2rem 0 0 2rem;
					float: right;
					background: #fff;
					.iconfont{
						font-size: 0.5rem;
						color: #6CDDC7;
					}
				}
			}
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
				  width: 70%;
					float: left;
					font-size: 0.3rem;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
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

					.share_box {
						float: left;
						width: 100%;
						margin-top: 0.18rem;
						display: flex;
						justify-content: space-between;
						font-size: 0.24rem;

						.left {
							background: #fff5f3;
							color: #fe8060;
							padding: 0 0.16rem;
							border-radius: 8px;
						}

						.right {
							color: #9b9b9b;
						}
					}
				}
			}

			.courseHtmlBox {
				background: #fff;
				overflow: hidden;
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

						dd {
							font-size: 0.24rem;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
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
				padding: 0 0.3rem;
				box-sizing: border-box;
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
					width: 4.42rem;
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
				.fenxiang {
					flex: 1;
					height: 0.8rem;
					line-height: 0.8rem;
					font-size: 0.2rem;
					font-weight: 400;
					color: #fff;
					text-align: center;
					background: #fe8060;
					border-radius: 4px;
					margin-right: 0.2rem;
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
	}
</style>
<style lang="less">
	.share_course_details {
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

		.share_box_msg {
			.share_box_msg_main {
				padding: 0.3rem;

				.main_title {
					font-size: 0.36rem;
					font-weight: bold;
					color: #333;
				}

				.details {
					margin-top: 0.32rem;
					line-height: 0.46rem;
					font-size: 0.3rem;
				}
			}
		}
	}
	img.courseUrlFirst{
		height: 4.16rem;
	}
</style>
