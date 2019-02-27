<template>
    <div class='class_list' @click="routerLinkTo">
		<div class="course_img">
			<img class="pro_img" v-lazy="img" alt="">
			<img class="pro_icon" v-if="type == 3" src="../../assets/images/iconImg/video_icon@2x.png" alt="">
			<img class="pro_icon" v-if="type == 2" src="../../assets/images/iconImg/audio_icon@2x.png" alt="">
			<img class="pro_icon" v-if="type == 1" src="../../assets/images/iconImg/Article_icon@2x.png" alt="">
		</div>
		<div class="course_info">
			<p class="title">{{ title }}</p>
			<div class="price_box">
				<span v-if="price == 0" :class="price == 0 ? 'free' : ''">{{ price == 0 ? '免费' : '￥' + price }}</span>
				<p v-else><span>￥</span>{{ price == 0 ? '免费' :  + price }}</p>
				<span>{{ num }}人学习</span>
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
		background: #fff;
		padding: .32rem .32rem .32rem .3rem;
		.course_img{
			width: 2.56rem;
			height: 1.44rem;
			margin-right: .16rem;
			position: relative;
			.pro_img{
				border-radius: .04rem;
				width: 100%;
				height: 100%;
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
			width: 4.16rem;
			.title{
				color: @main_title_color;
				line-height: .35rem;
				font-size: .28rem;
				height: .7rem;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.price_box{
				margin-top: .46rem;
				height: .28rem;
				line-height: .28rem;
				display: flex;
				justify-content: space-between;
				span{
					color: @main_time_color;
					font-size: .24rem;
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
						color: @main_price_color;
					}
				}
				.free{
					color: @active-color;
				}
			}
		}
    }
</style>
