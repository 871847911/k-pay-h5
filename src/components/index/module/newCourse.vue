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
		name: 'new_course',
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
		width: 6.9rem;
		display: flex;
		flex-direction: column;
		margin: .33rem 0 0 .3rem;
		padding-bottom: .2rem;
		box-shadow: 0 .02rem .08rem rgba(4, 4 ,4 , 0.1);
		.course_img{
			width: 6.9rem;
			height: 3.92rem;
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
			margin: .24rem .32rem 0;
			/*width: 100%;*/
			.title{
				color: @main_title_color;
				height: .28rem;
				line-height: .28rem;
				white-space: nowrap;
				overflow : hidden;
				text-overflow: ellipsis;
				margin-top: .13rem;
				font-size: .3rem;
			}
			.price{
				margin-top: .2rem;
				padding-bottom: .32rem;
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
