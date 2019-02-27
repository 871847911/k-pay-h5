
<template>
    <div class="share_rule_detail">
		<p class="title">规则基本信息</p>
		<p class="title_small">支持分享类型：</p>
		<div class="rule_details">
			应用内分享也就是网页分享支持： 文字，文字+图片，要分享链接需要链接添加在text里分享 客户端分享支持：文字，图片，文字+图片，图片+文字+链接
		</div>
		<p class="rule_msg">
			注：被分享用户需注册成为店铺用户，分享次数+1
		</p>
		<div class="line"></div>
		<p class="title top50">规则详细说明</p>
		<div class="detail_box" v-if="shareRuleList">
			<div v-if="shareRuleList.shareCourseRule.courseType == 1">
				<!-- 普通课程 -->
				<p v-for="(item,index) in shareRuleList.shareCourseDTOS" :key="index">
					分享次数达到 <span class="color_o">{{item.shareExplain }}</span> 次，可享受课程 <span class="color_o">{{item.details == '0.00' ? "免费阅读" :  item.details}}</span> {{item.details == '0.00' ? "" :  '折'}}
				</p>
			</div>
			<div v-if="shareRuleList.shareCourseRule.courseType == 2">
				<!-- 目录课程 -->
				<p class="list_contont_box" v-for="(item,index) in shareRuleList.shareCourseDTOS" :key="index">
					分享次数达到 <span class="color_o">{{item.shareExplain }}</span> 次，可免费<span class="color_o">{{item.discountType == 0? `阅读 ${item.discountDetails } 章节` :  item.details == '0.00' ? "获取该课程" :  item.details + '折优惠' }}</span>
				</p>
			</div>
		</div>
    </div>
</template>

<script>
	import api from "fetch/api";
export default {
    name: 'share_rule_detail',
    data () {
        return {
			shareRuleList : null
        }
    },
	created(){
    	this.getRuleDetail();
	},
    methods: {
		getRuleDetail(){
			let params = {
				userId : this.$store.state.userInfo.id,
				courseId : this.$route.query.courseId
			}
			api.getRuleDetailPage(params).then(res => {
				this.shareRuleList = res.data;
			})
		}
    }
}
</script>

<style lang="less" scoped>
	.share_rule_detail{
		padding-top: 0.26rem;
		color: #666;
		font-size: 0.28rem;
		.title{
			padding-left: 0.3rem;
			border-left: 2px solid #6CDDC7;
			color: #333333;
			font-size: 0.34rem;
			font-weight: bold;
		}
		.title_small{
			margin-top: 0.22rem;
			padding-left: 0.32rem;
			color: #666;
			font-size: 0.28rem;
		}
		.rule_details{
			padding: 0 0.32rem;
			margin-top: 0.22rem;
			line-height: 0.4rem;
		}
		.rule_msg{
			padding: 0 0.32rem;
			margin-top: 0.22rem;
			color: #FE8060;
		}
		.line{
			width: 100%;
			height: 2px;
			margin-top: 0.48rem;
			background: #f1f1f1;
		}
		.top50{
			margin-top: 0.5rem;
		}
		.detail_box{
			margin-top: 0.1rem;
			p{
				margin-top: 0.12rem;
				padding: 0 0.32rem;
			}
			.color_o{
				color: #FE8060;
			}
		}
	}
</style>
