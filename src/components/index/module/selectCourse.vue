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
				<p :class="price==0?'free':''" v-if="price == 0">免费</p>
				<p v-else><span>￥</span>{{ price == 0 ? '免费' :  + price }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'select_course',
		props : {
			id : [String, Number],
			img : [String, Number],
			title :[String, Number],
			num : [String, Number],
			price : [String, Number],
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
		width: 3.36rem;
		display: flex;
		flex-direction: column;
		margin-top: .32rem;
		&:nth-of-type(2n-1) {
			margin-left: .3rem;
		}
		&:nth-of-type(2n) {
			margin-left: .18rem;
		}
		.course_img{
			width: 3.36rem;
			height: 1.9rem;
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
				line-height: .4rem;
				height: .8rem;
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
				height: .28rem;
				line-height: .28rem;
				display: flex;
				justify-content: space-between;
				.free{
					color: @active-color;
				}
				p{
					font-size: .28rem;
					color: @main_price_color;
					font-weight: 900;
					span{
						font-weight: 100;
						font-size: .2rem;
						line-height: .2rem;
						margin-bottom: .04rem;
					}
				}
			}
		}
	}
</style>
