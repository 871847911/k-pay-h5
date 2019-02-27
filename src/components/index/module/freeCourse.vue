<template>
	<div class='class_list' @click="routerLinkTo">
		<div class="course_img">
			<img class="pro_img" :src="img" alt="">
			<img class="pro_icon" v-if="type == 3" src="../../../assets/images/iconImg/video_icon@2x.png" alt="">
			<img class="pro_icon" v-if="type == 2" src="../../../assets/images/iconImg/audio_icon@2x.png" alt="">
			<img class="pro_icon" v-if="type == 1" src="../../../assets/images/iconImg/Article_icon@2x.png" alt="">
		</div>
		<div class="course_info">
			<p class="title">{{ title }}</p>
			<div class="price">
				<!--<p>{{ num }}人学习</p>-->
				<p>免费</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'free_course',
		props : {
			id : [String, Number],
			img : [String, Number],
			title :[String, Number],
			num : [String, Number],
			type: [String, Number],
		},
		data () {
			return {

			}
		},
		methods: {
			routerLinkTo(){

			}
		}
	}
</script>

<style lang="less" scoped>
	.class_list{
		width: 2.56rem;
		display: flex;
		flex-direction: column;
		margin: .33rem 0 0 .32rem;
		&:last-of-type{
			padding-right: .32rem;
		}
		.course_img{
			width: 2.56rem;
			height: 1.44rem;
			margin-right: .32rem;
			position: relative;
			.pro_img{
				width: 100%;
				height: 100%;
				border-radius: .04rem;
			}
			.pro_icon{
				width: .28rem;
				height: .28rem;
				position: absolute;
				bottom: .16rem;
				right: .16rem;
			}
		}
		.course_info{
			width: 100%;
			.title{
				color: @main_title_color;
				line-height: .34rem;
				height: .68rem;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-top: .2rem;
				font-size: .28rem;
			}
			.price{
				margin-top: .2rem;
				height: .24rem;
				line-height: .24rem;
				display: flex;
				justify-content: space-between;
				p{
					font-size: .24rem;
					color: @active-color;
					font-weight: 900;
				}
			}
		}
	}
</style>
