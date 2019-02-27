
<template>
	<div class="share_rule_step">
		<div class="course_box" v-if="courseRuleDetail.appCourseShareDto">
			<div class="course_box_main">
				<p class="course_title" @click="toCoursePage">{{courseRuleDetail.appCourseShareDto.courseName}}</p>
				<p class="share_step_num">
					当前进度：
					<span class="span">{{courseRuleDetail.appShareCoursePriceDto.nowNum}}</span> /
					{{courseRuleDetail.appShareCoursePriceDto.maxNum}}
					<i class="iconfont icon-tishi" @click="showShareBox = true"></i>
				</p>
			</div>
		</div>
		<div class="have_share" v-if="courseRuleDetail.appShareCoursePriceDto">
			<p class="title">已获得优惠</p>
			<div v-if="courseRuleDetail.shareCourseRule.courseType == 1">
				<!-- 普通课程 -->
				<p class="rule_detail" v-for="(item,index) in courseRuleDetail.shareCourseDTOS" :key="index" v-if="item.isAccord == 1">
					分享次数达到 <span class="num">{{item.shareExplain }}</span> 次 可享受课程
					<section v-if="item.details == '0.00'">
						<span class="num" >免费阅读</span>
					</section>
					<section v-if="item.details != '0.00'">
						<span class="num" >{{item.details}}</span>折
					</section>
				</p>
			</div>
			<div v-if="courseRuleDetail.shareCourseRule.courseType == 2">
				<!-- 目录课程 -->
				<p  class="rule_detail" v-for="(item,index) in courseRuleDetail.shareCourseDTOS" :key="index" v-if="item.isAccord == 1">
					<section v-if="item.discountType == 0">
						分享次数达到 <span class="num">{{item.shareExplain }}</span> 次 可享受课程免费阅读 <span class="num">{{item.discountDetails}}</span>节
					</section>
					<section v-if="item.discountType == 1">
						分享次数达到 <span class="num">{{item.shareExplain }}</span> 次 可享受课程 <span class="num">{{item.details == '0.00' ? "免费阅读" :  item.details}}</span> {{item.details == '0.00' ? "" :  '折'}}
					</section>
				</p>
			</div>
		</div>
		<div class="have_share" v-if="courseRuleDetail.shareCourseRule">
			<p class="title">剩余可获得优惠</p>

			<div v-if="courseRuleDetail.shareCourseRule.courseType == 1">
				<!-- 普通课程 -->
				<p class="rule_detail" v-for="(item,index) in courseRuleDetail.shareCourseDTOS" :key="index" v-if="item.isAccord == 0">
					分享次数达到 <span class="num">{{item.shareExplain }}</span> 次 可享受课程
					<section v-if="item.details == '0.00'">
						<span class="num" >免费阅读</span>
					</section>
					<section v-if="item.details != '0.00'">
						<span class="num" >{{item.details}}</span>折
					</section>
				</p>
			</div>
			<div v-if="courseRuleDetail.shareCourseRule.courseType == 2">
				<!-- 目录课程 -->
				<p  class="rule_detail" v-for="(item,index) in courseRuleDetail.shareCourseDTOS" :key="index" v-if="item.isAccord == 0">
					<section v-if="item.discountType == 0">
						分享次数达到 <span class="num">{{item.shareExplain }}</span> 次 可享受课程免费阅读 <span class="num">{{item.discountDetails}}</span>节
					</section>
					<section v-if="item.discountType == 1">
						分享次数达到 <span class="num">{{item.shareExplain }}</span> 次 可享受课程 <span class="num">{{item.details == '0.00' ? "免费阅读" :  item.details}}</span> {{item.details == '0.00' ? "" :  '折'}}
					</section>
				</p>
			</div>
		</div>

		<confirm
			v-model="showShareBox"
			:show-cancel-button="false"
			title="信息提示"
			@on-confirm="onConfirm">
			<p v-if="courseRuleDetail.appShareCoursePriceDto">您分享的好友中当前已有{{courseRuleDetail.appShareCoursePriceDto.nowNum}}人注册成为店铺用户</p>
		</confirm>
	</div>
</template>

<script>
	import api from 'fetch/api'
	import { Confirm } from 'vux'
	export default {
		name: 'share_rule_step',
		data () {
			return {
				courseId : this.$route.query.courseId,
				courseRuleDetail : {},
				showShareBox : false
			}
		},
		components : {
			Confirm
		},
		created(){
			this.getShareDetail();
		},
		methods: {
			getShareDetail(){
				let params = {
					courseId: this.$route.query.courseId,
					userId: this.$store.state.userInfo.id
				};
				api.getRuleStep(params).then(res => {
					console.log(res)
					if(res.success){
						this.courseRuleDetail = res.data;
					}else{
						this.$vux.toast.text(res.message);
					}
				});
			},
			toCoursePage(){
				//查看课程
				this.$router.push({
					name : 'shareFreeCourseDetails',
					query : {
						courseId : this.$route.query.courseId
					}
				})
			},
			onConfirm(){

			}
		}
	}
</script>

<style lang="less" scoped>
	.share_rule_step{
		height: 100%;
		section{
			display: inline;
		}
		.course_box{
			padding:0.4rem 0.32rem;
			.course_box_main{
				border: 1px solid #F8F8F8;
				background: #F8F8F8;
				padding: 0.28rem 0.32rem;
				box-sizing: border-box;
				.course_title{
					color: #333;
					font-size: 0.36rem;
					font-weight: bold;
					word-break: break-all;
				}
				.share_step_num{
					color: #999999;
					font-size: 0.28rem;
					margin-top: 0.28rem;
					.span{
						color: #6CDDC7;
						font-size: 0.36rem;
						font-weight: bold;
					}
					.iconfont{
						color: #6CDDC7;
						font-size: 0.36rem;
						margin-left: 0.2rem;
					}
				}
			}
		}
		.have_share{
			padding: 0.5rem 0;
			border-bottom: 1px solid #f1f1f1;
			.title{
				padding-left: 0.32rem;
				border-left: 2px solid #6CDDC7;
				font-size: 0.36rem;
				font-weight: bold;
				color: #333;
			}
			.rule_detail{
				padding-left: 0.32rem;
				margin-top: 0.24rem;
				.num{
					color: #fe8060;
				}
			}
		}
	}
</style>
