<template>
	<div class="send_pay_success">
		<div class="top">
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
				<div class="title">
					<p class="title_color1">{{groupInfo.courseName}}</p>
					<p class="title_color2"><span>拼课价</span>￥{{groupInfo.collagePrice}}</p>
				</div>
			</div>
			<div class="btm_main" v-if="groupInfo">
				<div v-if="groupInfo.status==0||groupInfo.status==1||groupInfo.status==4||groupInfo.status==7" class="t1">当前参团<span>{{groupInfo.corrent}}</span>人，还剩<span>{{groupInfo.remain}}</span>个优惠名额</div>
				<div v-if="groupInfo.status==0||groupInfo.status==1||groupInfo.status==4||groupInfo.status==7" class="t1">
					<timer :time="groupInfo.endTime" :hour="0" type="0"></timer>
				</div>
				<!-- 成团 -->
				<div v-if="groupInfo.status==2" class="success">您来晚了，该团已成团</div>
				<div v-if="groupInfo.status==3" class="success">您来晚了，该团已解散</div>
				<!-- 成功 -->
				<div v-if="groupInfo.status==5" class="success"><i class="iconfont icon-Group- color-1"></i>拼课成功</div>
				<!-- 失败 -->
				<div v-if="groupInfo.status==6" class="success"><i class="iconfont icon-cuowu-tianchong color-1"></i>拼课失败，等待商家处理退款</div>
				<div class="btn_box">
					<button v-if="groupInfo.status==0" @click="toPayPage(2)">加入拼课</button>
					<button v-if="groupInfo.status==1" @click="goDetail">您已拥有该课程</button>
					<button v-if="groupInfo.status==2" @click="goDetail">我要发起拼课</button>
					<button v-if="groupInfo.status==3" @click="goDetail">我要发起拼课</button>
					<button v-if="groupInfo.status==4" @click="goDetail">您已参团</button>
					<button v-if="groupInfo.status==5" @click="goDetail">查看课程</button>
					<button v-if="groupInfo.status==6" @click="goDetail">查看课程</button>
					<button v-if="groupInfo.status==7" @click="goDetail">您已参与该课程其他拼课</button>
					<p class="qun">分享到3个群后，拼成率高达98%</p>
				</div>
				<!-- <div v-if="groupInfo.status==2" class="success"><i class="iconfont icon-Group- color-1"></i>拼课成功</div>
                <div v-if="groupInfo.status==2" class="btn_box">
                    <button @click="groupShare">查看课程</button>
                    <p class="qun">分享到3个群后，拼成率高达98%</p>
                </div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import html2canvas from "html2canvas";
	import api from "fetch/api";
	import timer from "module/timer";
	import {
		userInfo
	} from "os";
	export default {
		name: "groupShareIn",
		data() {
			return {
				orderDetail: {},
				courseId: this.$route.query.courseId,
				orderId: this.$route.query.orderId,
				qrContentImage: null,
				groupInfo: "" // 团信息
			};
		},
		components: {
			timer
		},
		computed: {
			userInfo() {
				if (this.$store.state.userInfo) {
					return this.$store.state.userInfo;
				}
			}
		},
		created() {
			this.queryCollagByShare();
		},
		methods: {
			queryCollagByShare() {
				// console.log(this.$store.state.userInfo)
				let params = {
					collageId: this.$route.query.collageId,
					courseId: this.$route.query.courseId
				};
				api.queryCollagByShare(params).then(res => {
					console.log(res);
					if (res.success) {
						this.groupInfo = res.data;
					} else {
						this.$vux.toast.text(res.message);
					}
				});
			},
			//参团
			toPayPage(type) {
				this.$router.push({
					name: "orderPay",
					query: {
						courseId: this.$route.query.courseId,
						type: type,
						collageId: this.$route.query.collageId
					}
				});
			},
			//查看课程
			goDetail() {
				this.$router.push({
					name: "courseDetailsGroup",
					query: {
						id: this.$route.query.courseId,
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
		height: 100%;
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
						line-height: normal;
						padding: 0.32rem 0;
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
				padding-top: 0.1rem;
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
				padding-top: 0.1rem;
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
