

<template>
    <div class="send_success">
		<div class="top">
			<div class="index_btn">
				<router-link :to="{name : 'home'}" class="to_index">
					<i class="iconfont icon-xiazai44"></i>
				</router-link>
			</div>
			<img :src="require('../../../assets/images/courseDeails/has_pay.png')" alt="">
			<p>您已成功购买该课程，好友领取后可以免费阅读</p>
		</div>
		<div class="bottom" v-if="orderDetail">
			<div class="btm_top">
				<img v-lazy="orderDetail.courseImage" alt="">
				<div class="title">
					<p class="title_color1">{{orderDetail.courseName}}</p>
					<p class="title_color2">￥{{orderDetail.price}}</p>
				</div>
			</div>
			<div class="btm_main">
				<div class="user_box">
					<div class="left">
						<img v-lazy="orderDetail.headUrl" alt="">
					</div>
					<div class="right">
						<p class="size30">{{orderDetail.userName}}</p>
						<p>{{orderDetail.createDate}}</p>
					</div>
				</div>
			</div>
			<div class="message">
				我已经收到您赠送的课程，非常感谢！
			</div>
		</div>

	</div>
</template>

<script>
	import api from 'fetch/api'
export default {
    name: 'send_success',
    data () {
        return {
			courseId : this.$route.query.courseId,
			orderId : this.$route.query.orderId,
			orderDetail : {}
        }
    },
	created(){
    	this.getCourseSendDetail();
	},
    methods: {
		getCourseSendDetail(){
			let params = {
				id : this.orderId
			}
			api.queryBylingqu(params).then(res => {
				console.log(res)
				if(res.success){
					this.orderDetail = res.data;
				}else{
					this.$vux.toast.text(res.message);
				}
			})
		}
    }
}
</script>

<style lang="less" scoped>
	.send_success{
		display: flex;
		display: flex;
		flex-direction: column;
		background: #F1F1F1;
		height: 100%;

		.top{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			.index_btn{
				overflow: hidden;
				position: absolute;
				top: 0.72rem;
				right: 0;
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
			img{
				width: 1.86rem;
				height: 2rem;
			}
			p{
				font-size: 0.24rem;
				color: #999;
				padding-top: 0.4rem;
			}
		}
		.bottom{
			width: 100%;
			height: 6rem;
			background: #fff;
			border-radius: 16px 16px 0 0;
			padding: 0.4rem;
			box-sizing: border-box;
			.btm_top{
				display: flex;
				border-bottom: 1px solid #f1f1f1;
				img{
					width: 2.56rem;
					height: 1.6rem;
				}
				.title{
					flex: 1;
					font-size: 0.3rem;
					display: flex;
					flex-direction: column;
					padding-left: 0.2rem;
					justify-content: space-between;
					.title_color1{
						color: #333;
					}
					.title_color2{
						color: #FE8060;
					}
				}
			}
			.btm_main{
				margin-top: 0.92rem;
				.user_box{
					display: flex;
					.left{
						width: 0.96rem;
						height: 0.96rem;
						img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.right{
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						word-break: break-all;
						padding-left: 0.32rem;
						font-size: 0.24rem;
						.size30{
							font-size: 0.3rem;
						}
					}
				}
			}
			.message{
				margin-top: 0.8rem;
				color: #6CDDC7;
				text-align: center;
			}
		}
	}
</style>
