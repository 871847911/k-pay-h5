<template>
    <div class="system_message outermost">
		<p class="title" v-if="messageDetail.type == 11 || messageDetail.type == 12">入驻申请审核通知</p>
		<p class="title" v-if="messageDetail.type == 21 || messageDetail.type == 22">课程审核通知</p>
		<p class="title" v-if="messageDetail.type == 30">课程下架通知</p>
		<div class="status">
			<p>{{ messageDetail.createDate }}</p>
			<p class="agree" v-if="messageDetail.type == 11 || messageDetail.type == 21">通过</p>
			<p class="disagree" v-if="messageDetail.type == 12 || messageDetail.type == 22">拒绝</p>
		</div>
		<p></p>
		<!--11入住通过 12入住拒绝 21审核通过 22审核拒绝 30课程下架-->
		<p class="reason_title">{{ messageDetail.title }}</p>
		<p class="reason">{{ messageDetail.reason }}</p>
		<button @click="toCourseDetail" v-if="messageDetail.type == 21 || messageDetail.type == 22  || messageDetail.type == 30">查看课程</button>
	</div>
</template>

<script>

	import api from "fetch/api";

    export default {
        name: "systemMessage",
		data() {
        	return {
				messageDetail: {}
			}
		},
		created() {
			this.getAndRead()
		},
		methods: {
			getAndRead() {
				let params = { messageId:this.$route.query.id }
				api.getAndRead(params).then(res => {
					console.log('系统消息详情', res)
					if(res.success == true) {
						console.log(res.data)
						this.messageDetail = res.data
					}
				});
			},
			toCourseDetail() {
				this.$router.push({path: '/courseDetails', query: {id: this.messageDetail.bizId} })
			}
		}
    }
</script>

<style scoped lang="less">
	.system_message{
		.title{
			line-height: .45rem;
			font-size: .36rem;
			color: @main_title_color;
			margin: .48rem .32rem 0;
		}
		.status{
			margin: 0 .32rem;
			display: flex;
			p{
				color: @main_title_color;
				height: .36rem;
				line-height: .36rem;
				font-size: .26rem;
				margin-top: .31rem;
				&:nth-of-type(1){
					flex: 1;
				}
				&:nth-of-type(2){
					font-size: .28rem;
				}
			}
			.agree{
				color: rgba(108,221,199,1);
			}
			.disagree{
				color: rgba(241,44,32,1);
			}
		}
		.reason_title{
			margin: .5rem .32rem .12rem;
			color: @main_content_color;
			font-size: .28rem;
			line-height: .4rem;
		}
		.reason{
			margin: 0 .32rem;
			color: @main_content_color;
			font-size: .28rem;
			line-height: .4rem;
		}
		button{
			width: 6.86rem;
			height: .94rem;
			margin: 1.08rem .32rem 0;
			background: @button-default-bg-color;
		}
	}
</style>
