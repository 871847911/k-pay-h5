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
				<div class="zengsong_box" v-if="course.courseMain.price!=0" @click="getIsZengsong"><i class="iconfont icon-liwu-"></i>
					赠送</div>
				<div class="course_info_box">
					<div class="courseInfo">
						<p :class="course.courseMain.price==0?'free':'price'">{{course.courseMain.price==0?"免费":"￥"+course.courseMain.price}}</p>
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
						<dd>{{course.lecturer.introduce.length > 30? course.lecturer.introduce.slice(0,30) + '...' : course.lecturer.introduce}}</dd>
					</dl>
				</div>
				<!-- 拼课内容 -->
				<div v-if="showGroup">
					<div class='groupthis' v-if="true">
						<div class='groupthisLeft' v-if="group.groupBuyRule">拼课价:
							<p>¥{{group.groupBuyRule.price}}</p>
						</div>
						<div class='groupthisMid' v-if="group.groupBuyRule">{{group.groupBuyRule.addNum}}人成团</div>
						<div class='groupthisRightIcon' @click='goGroupList'>
							<img src="../../../assets/images/courseDeails/symbols-turn-left.png" alt="">
						</div>
						<div class='groupthisRight' @click='goGroupList'>{{group.sumNum}}人正在拼单</div>
					</div>
					<div class='groupListBox' v-if="grouplist.length!=0">
						<div class='groupList' v-for="(item,index) in grouplist" :key="index">
							<div class='grouprImg'>
								<img :src='item.userImg'>
							</div>
							<div class='grouprName'>{{item.userNickName}}</div>
							<div class='grouprtime'>
								<div>还差
									<span>{{item.surplusNum}}</span>人成团</div>
								<div>
									<span>
										<timer :time="item.createDateTime" :hour="item.validity" type="0"></timer>
									</span>
								</div>
							</div>
							<!-- <div :class='item.isState==0?"grouprBtn":"ngrouprBtn"'  @click=='gogroupPin(key)'>去拼课</div>  -->
							<div :class="{'grouprBtn' : item.isState==0 , 'ngrouprBtn' : item.isState!=0}" @click='gogroupPin(index,2)'>去拼课</div>
						</div>
					</div>
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

		<!-- 拼课按钮 -->
		<div class="courseBottom" v-if="showGroup">
			<div class="buyBox">
				<div class="zixun" @click="clickZixun">
					<i class="iconfont icon-zixunzhuanyefuwu"></i>
					<p>咨询</p>
				</div>
				<div v-if="isOpen">
					<div class="buy" @click="yaoqing">邀请好友完成拼课</div>
				</div>
				<div v-else>
					<div class="groupBuy" @click="toPayPage(2)">
						<p class="time">
							<timer :time="group.groupBuyRule.stopDate" :hour="0"></timer>
						</p>
						<p>¥{{group.groupBuyRule.price}} 一键开团</p>
					</div>
				</div>
			</div>
		</div>
		<div class="courseBottom" v-else>
			<div class="buyBox" v-if="course.courseMain">
				<div class="zixun" @click="clickZixun">
					<i class="iconfont icon-zixunzhuanyefuwu"></i>
					<p>咨询</p>
				</div>
				<div v-if="course.courseMain.price==0">
					<div class="buy isbuy" v-if="course.courseMain.status==50">已下架</div>
					<div class="buy isbuy" v-if="course.isBuy&&course.courseMain.status==40">已加入</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40" @click="joinFreeCourse">加入课程</div>
				</div>
				<div v-else>
					<div class="buy isbuy" v-if="course.courseMain.status==50">已下架</div>
					<div class="buy isbuy" v-if="course.isBuy&&course.courseMain.status==40">已购买</div>
					<div class="buy" v-if="!course.isBuy&&course.courseMain.status==40" @click="toPayPage(0)">立即购买</div>
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
	</div>
</template>

<script>
	import api from "fetch/api";
	import {
		Tab,
		TabItem,
		Popup
	} from "vux";
	import timer from "module/timer";
	export default {
		name: "courseDetailsGroup",
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
				group: {}, //拼课,
				grouplist: [], //当前拼的团
				showGroup: false, //显示拼课相关内容
				isOpen: false //是否已拼课
			};
		},
		components: {
			Tab,
			TabItem,
			Popup,
			timer
		},
		created() {
			this.getCoursseDetails();
		},
		methods: {
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
			//课程详情
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
				let paramss = {
					courseId: this.$route.query.id
				};
				api.getGroupBuyById(paramss).then(res => {
					console.log("拼课课程详情", res);
					if (res.success == true) {
						this.group = res.data;
						if (res.data.appGroupStateDTO.state == 0) {
							//可开团
							this.showGroup = true;
							let paramsList = {
								courseId: this.$route.query.id,
								page: 1,
								size: 2
							};
							api.getAppGroupBuyList(paramsList).then(res => {
								console.log("正在拼的团", res);
								if (res.success == true) {
									this.grouplist = res.data.list;
								} else {
									this.$vux.toast.text(res.message);
								}
							});
						} else if (res.data.appGroupStateDTO.state == -3) {
							//已开团
							this.showGroup = true;
							this.isOpen = true;
							let paramsList = {
								courseId: this.$route.query.id,
								page: 1,
								size: 2
							};
							api.getAppGroupBuyList(paramsList).then(res => {
								console.log("正在拼的团", res);
								if (res.success == true) {
									this.grouplist = res.data.list;
								} else {
									this.$vux.toast.text(res.message);
								}
							});

							//已开团
						} else {
							//不可开团
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
			//跳转当前课程拼课列表
			goGroupList() {
				this.$router.push({
					path: "/groupList",
					query: {
						courseId: this.$route.query.id
					}
				});
			},
			//去拼课
			gogroupPin(e, type) {
				if(this.grouplist[e].isState==0){
					this.$router.push({
						name: "orderPay",
						query: {
							courseId: this.course.courseMain.id,
							type: type,
							collageId: this.grouplist[e].id
						}
					});
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
			toPayPage(type) {
				this.$router.push({
					name: "orderPay",
					query: {
						courseId: this.course.courseMain.id,
						type: type
					}
				});
			},
			yaoqing() {
				//邀请拼课
				console.log(this.course);
				let collageId = this.group.groupBuyInfo.id
				// window.location.href ="http://" + window.location.host + '/h5-view/groupShare?collageId=' + collageId
				this.$router.push({
					name: "groupShare",
					query: {
						collageId: this.group.groupBuyInfo.id
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
			background: #fff;
			padding: 0.28rem 0 0.38rem 0.3rem;
			border-bottom: 0.1rem solid #f8f8f8;
			overflow: hidden;

			.courseName {
				float: left;
				width: 70%;
				font-size: 0.3rem;
				font-weight: 500;
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

			.groupBuy {
				width: 5.8rem;
				height: 0.8rem;
				background: #fe8060;
				// line-height: 0.8rem;
				color: #fff;
				text-align: center;
				border-radius: 0.08rem;
				font-size: 0.28rem;
				line-height: 0.28rem;
				font-weight: 400;

				p {
					padding-top: 0.02rem;
				}

				p.time {
					font-size: 0.24rem;
					padding-top: 0.1rem;
				}
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

	.groupthis {
		width: 100%;
		height: 0.8rem;
		background: rgba(248, 248, 248, 1);
		overflow: hidden;
		//  display: flex;
		line-height: 0.8rem;
	}

	.groupthisLeft {
		padding-left: 0.32rem;
		float: left;
		font-size: 0.24rem;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}

	.groupthisLeft p {
		font-size: 0.32rem;
		font-weight: 500;
		color: rgba(254, 128, 96, 1);
		padding: 0 0.32rem 0 0.18rem;
		display: inline;
	}

	.groupthisMid {
		float: left;
		background: rgba(244, 55, 55, 0.11);
		border-radius: 0.18rem;
		text-align: center;
		font-size: 0.24rem;
		font-weight: 300;
		color: rgba(254, 128, 96, 1);
		line-height: 0.36rem;
		padding: 0.04rem 0.2rem;
		overflow: hidden;
		margin-top: 0.18rem;
	}

	.groupthisRight {
		float: right;
		padding-right: 0.04rem;
		font-size: 0.24rem;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.groupListBox {
		padding: 0.13rem 0;
		background: rgba(248, 248, 248, 1);
		border-top: 0.01rem #f1f1f1 solid;
	}

	.groupList {
		/* display: flex;
     */
		padding: 0.16rem 0.32rem;
		overflow: hidden;
	}

	.grouprBtn {
		width: 1.4rem;
		height: 0.64rem;
		background: rgba(254, 128, 96, 1);
		border-radius: 0.08rem;
		font-size: 0.28rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 0.64rem;
		text-align: center;
		float: right;
	}

	.ngrouprBtn {
		width: 1.4rem;
		height: 0.64rem;
		background: rgba(254, 128, 96, 0.5);
		border-radius: 0.04rem;
		font-size: 0.28rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 0.64rem;
		text-align: center;
		float: right;
	}

	.groupList .grouprImg {
		width: 0.64rem;
		height: 0.64rem;
		float: left;
	}

	.groupList .grouprImg img {
		width: 0.64rem;
		height: 0.64rem;
		border-radius: 50%;
	}

	.groupthisRightIcon {
		float: right;
		padding-right: 0.32rem;
	}

	.ios_text {
		font-size: 0.38rem;
		text-align: center;
		line-height: 1rem;
		background: rgba(254, 128, 96, 1);
		border-radius: 0.04rem;
		font-family: PingFangSC-Medium;
		color: rgba(255, 255, 255, 1);
	}

	.audio {
		width: 100%;
		height: 4.16rem;
	}

	.groupthisRightIcon img {
		width: 0.2rem;
		height: 0.2rem;
	}

	.grouprName {
		line-height: 0.64rem;
		width: 1.94rem;
		padding-left: 0.24rem;
		font-size: 0.28rem;
		font-weight: 400;
		color: rgba(72, 72, 72, 1);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
	}

	.grouprtime {
		width: 2.28rem;
		font-size: 0.26rem;
		font-weight: 400;
		text-align: right;
		color: rgba(72, 72, 72, 1);
		float: left;
	}

	.groupOldPrice {
		width: 1.4rem;
		background: rgba(245, 182, 165, 1);
		border-radius: 0.08rem 0rem 0rem 0.08rem;
		text-align: center;
	}

	.groupOldPrice div {
		font-size: 0.28rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		padding-top: 0.06rem;
	}

	.groupNewPrice {
		flex: 1;
		text-align: center;
		background: rgba(254, 128, 96, 1);
		border-radius: 0rem 0.08rem 0.08rem 0rem;
	}

	.groupNewPrice div {
		font-size: 0.28rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		padding-top: 0.04rem;
	}

	.course-bottom .newcourse-bottom-item {
		width: auto;
		padding: 0 0.32rem;
	}

	.newbottom-item {
		padding: 0 0.32rem;
	}

	.btn_line {
		width: 0.02rem;
		height: 0.4rem;
		background: rgba(241, 241, 241, 1);
		position: absolute;
		left: 1.34rem;
		top: 0.3rem;
	}

	.groupShare {
		flex: 1;
		text-align: center;
		background: rgba(254, 128, 96, 1);
		border-radius: 0.08rem;
		font-size: 0.28rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 0.98rem;
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
