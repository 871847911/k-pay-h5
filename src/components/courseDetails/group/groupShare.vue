<template>
	<div class="send_pay_success">
		<div class="top" v-if="cantuan==1">
			<div class="index_btn">
				<router-link :to="{name : 'home'}" class="to_index">
					<i class="iconfont icon-xiazai44"></i>
				</router-link>
			</div>
			<img :src="require('../../../assets/images/courseDeails/group.png')" alt="">
			<p>开团成功，快找好友参团吧！</p>
		</div>
		<div class="top" v-if="cantuan==0">
			<div class="index_btn">
				<router-link :to="{name : 'home'}" class="to_index">
					<i class="iconfont icon-xiazai44"></i>
				</router-link>
			</div>
			<img :src="require('../../../assets/images/courseDeails/has_lean.png')" alt="">
			<p>发现好内容，邀你一起来学习</p>
		</div>
		<div class="bottom">
			<div class="btm_top">
				<img v-lazy="groupInfo.courseUrl" alt="">
				<div class="title" v-if="groupInfo">
					<p class="title_color1">{{groupInfo.courseName.length > 39? groupInfo.courseName.slice(0,39) + '...' : groupInfo.courseName}}</p>
					<p class="title_color2"><span>拼课价</span>￥{{groupInfo.collagePrice}}</p>
				</div>
			</div>
			<div class="btm_main" v-if="groupInfo">
				<div v-if="groupInfo.status==1" class="t1">当前参团<span>{{groupInfo.corrent}}</span>人，还剩<span>{{groupInfo.remain}}</span>个优惠名额</div>
				<div v-if="groupInfo.status==1" class="t1">
					<timer :time="groupInfo.endTime" :hour="0" type="0"></timer>
				</div>
				<div v-if="groupInfo.status==1" class="btn_box">
					<button @click="groupShare" v-if="cantuan==0">参团成功，邀请好友拼课</button>
					<button @click="groupShare" v-if="cantuan==1">邀请好友拼课</button>
					<p v-if="groupInfo.status==1" class="qun">分享到3个群后，拼成率高达98%</p>
				</div>

				<div v-if="groupInfo.status==2" class="success"><i class="iconfont icon-Group- color-1"></i>拼课成功</div>
				<div v-if="groupInfo.status==2" class="btn_box">
					<button @click="goCourseDetails">查看课程</button>
					<p v-if="groupInfo.status==1" class="qun">分享到3个群后，拼成率高达98%</p>
				</div>
			</div>
		</div>
		<div class="imgBoxBg" v-if="showImg"></div>
		<div class="showImg" v-if="showImg">
			<img :src="qrContentImage">
			<p class="tps">长按保存图片并分享，让好友帮你完成拼课</p>
		</div>
		<div class="imgBox" v-if="groupInfo">
			<div class="imgheader" ref="QrcodePage">
				<div class="headeBox">
					<img :src="headerImg">
					<p>{{userInfo.nickName}}</p>
				</div>
				<div class="tipBox">拼课享优惠，就差你了</div>
				<div class="courseName">{{groupInfo.courseName.length > 34? groupInfo.courseName.slice(0,34) + '...' : groupInfo.courseName}}</div>
				<div class="courseImg">
					<img :src="courseUrl">
				</div>
				<div class="codeBox">
					<div class="codeLeft">{{storeInfo.name}}</div>
					<div class="codeRight">
						<qrcode :value="qrcodeUrl" v-if="qrcodeUrl" :options="{ size: 75 }"></qrcode>
						<p>长按识别</p>
					</div>
				</div>
			</div>
			<p class="tps">长按保存图片并分享，让好友帮你完成拼课</p>
		</div>
		<div class="fenxiang">
			<popup v-model="fenxiang">
				<div class="fenxiangBox">
					<div class="boxImg" @click="showToast = true">
						<i class="iconfont icon-weixin-copy"></i>
						<p>邀请好友</p>
					</div>
					<div class="boxImg" @click="saveImg">
						<div class="baocun">
							<i class="iconfont icon-baocun"></i>
						</div>
						<p>保存图片</p>
					</div>
				</div>
			</popup>
		</div>
		<!--拼课分享弹出框-->
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
	import html2canvas from "html2canvas";
	import api from "fetch/api";
	import timer from "module/timer";
	import QRcode from '@xkeshi/vue-qrcode'
	import {
		userInfo
	} from "os";
	import {
		Popup,
		XDialog
	} from "vux";
	export default {
		name: "groupShare",
		data() {
			return {
				cantuan: this.$route.query.type ? this.$route.query.type : 1,
				orderDetail: {},
				courseId: this.$route.query.courseId,
				orderId: this.$route.query.orderId,
				qrContentImage: null,
				groupInfo: "", // 团信息
				showImg: false, //海报
				fenxiang: false, //分享弹窗
				showToast: false,
				codeImg:'',
				headerImg : "",
				qrcodeUrl:"",
				courseUrl:"",
				storeInfo:""

			};
		},
		components: {
			timer,
			Popup,
			XDialog,
			qrcode : QRcode
		},
		computed: {
			userInfo() {
				if (this.$store.state.userInfo) {
					return this.$store.state.userInfo;
				}
			}
		},
		created() {
			this.queryById();
			this.getWithCount();
		},
		methods: {
			queryById() {
				// console.log(this.$store.state.userInfo)
				let params = {
					collageId: this.$route.query.collageId
				};
				api.queryByCollage(params).then(res => {
					console.log(res);
					if (res.success) {
						this.groupInfo = res.data;
						this.courseId = res.data.courseId;
						let headImgs = this.$store.state.userInfo.headUrl
						let newurl = 'http://' +  window.location.host
						let newurls = 'http://' +  window.location.host
						this.headerImg = headImgs.replace("http://thirdwx.qlogo.cn",newurl)
						this.courseUrl = newurls + "/" + this.groupInfo.courseUrlRelative
						this.qrcodeUrl =  "http://" + window.location.host + "/h5-view#/groupShareIn?collageId=" + this.$route.query.collageId + "&courseId=" + this.courseId
						// this.headerImg = this.getBase64Image(this.headerImg)
						console.log(this.headerImg)
						console.log(this.courseUrl)
						this.getWxShareDoc();
					} else {
						this.$vux.toast.text(res.message);
					}
				});
			},
			//店铺信息
			getWithCount() {
				api.getWithCount({}).then(res => {
					console.log('店铺信息', res)
					if(res.success) {
						this.storeInfo = res.data.store
					}
				})
			},
			saveImg() {
				this.$vux.loading.show({text : '生成中...'})
				var that = this;
				let shareContent = this.$refs.QrcodePage, //需要截图的包裹的（原生的）DOM 对象
					width = shareContent.clientWidth, //shareContent.offsetWidth; //获取dom 宽度
					height = shareContent.clientHeight, //shareContent.offsetHeight; //获取dom 高度
					canvas = document.createElement("canvas"), //创建一个canvas节点
					scale = 4; //定义任意放大倍数 支持小数
				canvas.width = width * scale; //定义canvas 宽度 * 缩放
				canvas.height = height * scale; //定义canvas高度 *缩放
				canvas.style.width = (shareContent.clientWidth * scale) / 100 + "rem";
				canvas.style.height = (shareContent.clientHeight * scale) / 100 + "rem";
				canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
				let opts = {
					scale: scale, // 添加的scale 参数
					canvas: canvas, //自定义 canvas
					logging: true, //日志开关，便于查看html2canvas的内部执行流程
					width: width, //dom 原始宽度
					height: height,
					useCORS: true
				};
				html2canvas(shareContent, opts).then(function(canvas) {
					that.qrContentImage = canvas.toDataURL("image/jpeg", 1.0);
					that.$vux.loading.hide()
					that.showImg = true;
					that.fenxiang = false;
				}).catch(function (reason) {
					that.$vux.loading.hide()
					alert(reason)
				});
				
			},
			groupShare() {
				this.fenxiang = true;
			},
			//微信分享
			getWxShareDoc() {
				let pageInfo = {
					title: "限时拼课",
					desc: "您的朋友邀请你一起参与拼课，限时优惠，赶紧上车",
					img: this.groupInfo.courseUrl,
					url: "http://" + window.location.host + "/h5-view#/groupShareIn?collageId=" + this.$route.query.collageId + "&courseId=" + this.courseId
				};
				this.$store.dispatch("shareConfig", pageInfo);
			},
			//跳转课程详情
			goCourseDetails(){
				this.$router.push({
					name: "courseDetails",
					query: {
						id: this.courseId,
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.send_pay_success {
		
		position: relative;
		display: flex;
		flex-direction: column;
		background: #f1f1f1;
		height: 100vh;
		overflow: hidden;

		.top {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.index_btn {
				overflow: hidden;
				position: absolute;
				top: 0.72rem;
				right: 0;

				.to_index {
					width: 1.2rem;
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					border-radius: 2rem 0 0 2rem;
					float: right;
					background: #fff;

					.iconfont {
						font-size: 0.5rem;
						color: #6cddc7;
					}
				}
			}

			img {
				width: 1.86rem;
				height: 2rem;
			}

			p {
				font-size: 0.24rem;
				color: #999;
				padding-top: 0.4rem;
			}
		}

		.bottom {
			width: 100%;
			// height: 6.5rem;
			background: #fff;
			border-radius: 16px 16px 0 0;
			padding: 0.4rem;
			box-sizing: border-box;

			.btm_top {
				display: flex;

				img {
					width: 2.56rem;
					height: 1.6rem;
				}

				.title {
					flex: 1;
					font-size: 0.3rem;
					display: flex;
					flex-direction: column;
					padding-left: 0.2rem;
					justify-content: space-between;

					.title_color1 {
						color: #333;
						overflow:hidden; 
						text-overflow:ellipsis;
						display:-webkit-box;
						/* autoprefixer: off */
						-webkit-box-orient:vertical;
						/* autoprefixer: on */
						-webkit-line-clamp:2;
						padding-right: 0.32rem;
						word-break: break-all;
					}

					.title_color2 {
						color: #fe8060;

						span {
							font-size: 0.24rem;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
						}
					}
				}
			}

			.btm_main {
				padding-top: 0.9rem;
				text-align: center;

				.success {
					font-size: 0.32rem;
					font-weight: 400;
					padding-bottom: 0.32rem;
					color: rgba(102, 102, 102, 1);
					display: flex;
					align-items: center;
					justify-content: center;

					.color-1 {
						font-size: 0.46rem;
						color: #7ed321;
						margin-right: 0.2rem;
					}
				}

				.t1 {
					color: #333;
					font-size: 0.32rem;
					padding-bottom: 0.32rem;
					span{
						color: #fe8060;
					}
				}

				.t2 {
					color: #999;
					margin-top: 0.24rem;
					font-size: 0.24rem;
				}

				.btn_box {

					// margin-top: 0.48rem;
					button {
						border: 0;
						background: #6cddc7;
						color: #fff;
						font-size: 0.36rem;
						width: 100%;
						text-align: center;
						padding: 0.32rem;
					}

					p {
						font-size: 0.24rem;
						font-weight: 400;
						color: #999999;
						text-align: center;
						padding-top: 0.32rem;
					}

					button.disabled {
						background: #d4d4d4;
					}
				}
			}
		}

		.imgBoxBg {
			width: 100%;
			height: 100%;
			background: #cdc9c9;
			position: absolute;
			left: 0;
			top: 0;
		}

		.showImg {
			width: 6.86rem;
			position: absolute;
			left: 50%;
			top: 0.32rem;
			margin-left: -3.43rem;

			.saveImg {
				width: 6.86rem;
				height: 0.98rem;
				background: rgba(108, 221, 199, 1);
				border-radius: 4px;
				margin-top: 0.32rem;
				text-align: center;
				line-height: 0.98rem;
				font-size: 0.36rem;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}

			.tps {
				font-size: 0.24rem;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				padding-top: 0.3rem;
			}
		}

		.imgBox {
			// display: none;
			width: 6.86rem;
			// height: 9.68rem;
			// background: #fff;
			position: absolute;
			left: -250%;
			top: 0.32rem;
			margin-left: -3.43rem;

			// margin-top: -2.87rem;
			.imgheader {
				// width: 6.86rem;
				padding: 0.32rem;
				// height: 9.68rem;
				background: #fff;

				.headeBox {
					display: flex;
					align-items: center;

					img {
						width: 0.96rem;
						height: 0.96rem;
						border-radius: 50%;
					}

					p {
						padding-left: 0.24rem;
					}
				}

				.tipBox {
					width: 5.9rem;
					height: 0.98rem;
					margin: 0 auto;
					background: url(../../../assets/images/courseDeails/dialogbox_bg@3x.png) no-repeat;
					background-size: 100% 100%;
					text-align: center;
					line-height: 1.37rem;
					font-size: 0.24rem;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}

				.courseName {
					font-size: 0.32rem;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					text-align: left;
					padding: 0.32rem 0 0.22rem 0;
					
					
				}

				.courseImg {
					text-align: center;
					padding-bottom: 0.28rem;
					border-bottom: 0.02rem solid #f1f1f1;

					img {
						width: 3.4rem;
						height: 3.4rem;
					}
				}

				.codeBox {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 0.2rem;

					.codeLeft {
						font-size: 0.32rem;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.codeRight {
						text-align: center;

						img {
							width: 1.12rem;
							height: 1.12rem;
						}

						p {
							font-size: 0.24rem;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(102, 102, 102, 1);
							padding-top: 0.15rem;
						}
					}
				}
			}

			.saveImg {
				width: 6.86rem;
				height: 0.98rem;
				background: rgba(108, 221, 199, 1);
				border-radius: 4px;
				margin-top: 0.32rem;
				text-align: center;
				line-height: 0.98rem;
				font-size: 0.36rem;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}

			.tps {
				font-size: 0.24rem;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				padding-top: 0.3rem;
			}
		}

		.fenxiangBox {
			height: 2.48rem;
			display: flex;
			align-items: center;
			background: #fff;

			.boxImg {
				width: 50%;
				text-align: center;

				i {
					font-size: 1.14rem;
					line-height: 1.14rem;
					color: #62b900;
				}

				p {
					font-size: 0.24rem;
					padding-top: 0.14rem;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.baocun {
					width: 1rem;
					height: 1rem;
					background: rgba(108, 221, 199, 1);
					border-radius: 50%;
					// display: inline;
					margin: 0 auto;
					margin-bottom: 0.08rem;

					i {
						line-height: 1rem;
						font-size: 0.6rem;
						color: #fff;
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.send_pay_success {
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
</style>
