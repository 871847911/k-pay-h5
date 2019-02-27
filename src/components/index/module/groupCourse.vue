<template>
	<div class='class_list' @click="routerLinkTo">
		<div class="course_img">
			<img class="pro_img" v-lazy="img" alt="">
			<img class="pro_icon" v-if="type == 3" src="../../../assets/images/iconImg/video_icon@2x.png" alt="">
			<img class="pro_icon" v-if="type == 2" src="../../../assets/images/iconImg/audio_icon@2x.png" alt="">
			<img class="pro_icon" v-if="type == 1" src="../../../assets/images/iconImg/Article_icon@2x.png" alt="">
		</div>
		<div class="course_info">
			<p class="title">{{ title }}</p>
			<div class="price">
				<p>拼课</p>
				<p>{{ price == 0 ? '免费' : '￥' + price }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'class_list',
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
		display: flex;
		margin: 0 .32rem;
		padding: .33rem 0;
		.course_img{
			width: 2.56rem;
			height: 1.62rem;
			margin-right: .2rem;
			position: relative;
			.pro_img{
				width: 100%;
				height: 100%;
				border-radius: .08rem;
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
			width: 4.1rem;
			.title{
				color: @main_title_color;
				font-weight: 900;
				line-height: .42rem;
				height: .84rem;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.price{
				margin-top: .4rem;
				height: .4rem;
				line-height: .4rem;
				display: flex;
				justify-content: space-between;
				p{
					font-size: .2rem;
					&:nth-of-type(1) {
						color: @active-color;
					}
					&:nth-of-type(2) {
						color:@main_price_color;
						font-weight: 900;
					}
				}
			}
		}
	}
</style>
