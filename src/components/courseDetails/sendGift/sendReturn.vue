
<template>
    <div class="send_gift_return">
		<p class="page_title">您的好友希望把这个课程赠送给你</p>
		<div class="index_btn">
			<router-link :to="{name : 'home'}" class="to_index">
				<i class="iconfont icon-xiazai44"></i>
			</router-link>
		</div>
		<div class="card_box_main" v-if="courseDetail">
			<div class="card_box">
				<div class="user_box">
					<img v-lazy="$store.state.userInfo.headUrl" alt="">
					<div class="name_box">
						{{$store.state.userInfo.nickName}}
					</div>
				</div>
				<div class="sanjiao_box">
					<span class="sanjiao"></span>
				</div>
				<div class="talk_box">
					这个课程非常实用，希望你能够受益
				</div>
				<div class="detail_box">
					{{courseDetail.courseName}}
				</div>
				<div class="img_box">
					<img v-lazy="courseDetail.courseUrl" alt="">
				</div>

			</div>
			<div class="btn_box">
				<button v-if="courseDetail.status == 0" @click="toCourseDetailPage">非常感谢,我就收下啦~</button>
				<button class="disabled" v-if="courseDetail.status == 1">您已经拥有了这个课程，无法领取</button>
				<button class="disabled" v-if="courseDetail.status == 2">课程已被领取</button>
				<button class="disabled" v-if="courseDetail.status == 3">您正在拼课该课程，无法领取</button>
				<button class="disabled" v-if="courseDetail.status == 4">该团已散团</button>
			</div>
		</div>
    </div>
</template>

<script>
	import api from 'fetch/api'
export default {
    name: 'send_gift_return',
    data () {
        return {
			courseDetail : {}
        }
    },
	created(){

		this.getCourseDetail();
	},
    methods: {
		getCourseDetail(){
			let params = {
				userId : this.$store.state.userInfo.id,
				orderId : this.$route.query.orderId
			}
			api.checkGetGift(params).then(res => {
				this.courseDetail = res.data;
				document.title = res.data.nickName
			})
		},
		toCourseDetailPage(){
			let params = {
				userId : this.$store.state.userInfo.id,
				storeId : this.$store.state.userInfo.storeId,
				orderId : this.$route.query.orderId
			}
			api.receiveGift(params).then(res => {
				if(res.success){
					this.$router.push({
						name : 'courseDetails',
						query : {
							id : this.$route.query.courseId
						}
					})
				}else{
					this.$vux.toast.text(res.message);
				}
			})

		}
    }
}
</script>

<style lang="less" scoped>
	.send_gift_return{
		background: rgba(0,0,0,0.4);
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		.page_title{
			color: #fff;
			font-size: 0.32rem;
			margin-top: 0.32rem;
			text-align: center;
		}
		.index_btn{
			overflow: hidden;
			.to_index{
				width: 1.2rem;
				height: 0.8rem;
				line-height: 0.8rem;
				text-align: center;
				border-radius: 2rem 0 0 2rem;
				float: right;
				background: #fff;
				.iconfont{
					font-size: 0.5rem;
					color: #6CDDC7;
				}
			}
		}
		.card_box_main{
			margin-top: 0.1rem;
			padding: 0.32rem;
			box-sizing: border-box;
			display: block;
			.card_box{
				padding: 0.32rem 0.32rem 0.8rem 0.32rem;
				box-sizing: border-box;
				background: #fff;
				.user_box{
					display: flex;
					img{
						width: 0.96rem;
						height: 0.96rem;
						border-radius: 50%;
					}
					.name_box{
						color: #333;
						font-size: 0.3rem;
						padding-left: 0.24rem;
						display: flex;
						align-items: center;
					}
				}
				.sanjiao_box{
					margin-top: -0.1rem;
					overflow: hidden;
					padding-left: 1rem;
					.sanjiao{
						float: left;
						width: 0;
						height: 0;
						border-left: 0.2rem solid transparent;
						border-right: 0.2rem solid transparent;
						border-bottom: 0.5rem solid #f1f1f1;
						transform: skew(-40deg);
					}
				}
				.talk_box{
					background: #f1f1f1;
					color: #999;
					font-size: 0.24rem;
					padding: 0.2rem 0;
					text-align: center;
				}
				.detail_box{
					color: #333;
					font-size: 0.32rem;
					text-align: center;
					margin-top: 0.48rem;
					word-break: break-all;
				}
				.img_box{
					text-align: center;
					margin-top: 0.32rem;
					img{
						width: 3.4rem;
						height: 3.4rem;
					}
				}

			}
			.btn_box{
				margin-top: 0.32rem;
				button{
					width: 100%;
					border: 0;
					background: #6CDDC7;
					color: #fff;
					font-size: 0.36rem;
					text-align: center;
					padding: 0.3rem 0;
				}
				button.disabled{
					background: #D4D4D4;
				}
			}
		}
	}
</style>
