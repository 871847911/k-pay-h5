
<template>
    <div class="send_pay_success">
		<div class="top">
			<img :src="require('../../../assets/images/courseDeails/has_pay.png')" alt="">
			<p>您已成功购买该课程，好友领取后可以免费阅读</p>
		</div>
		<div class="bottom" v-if="orderDetail">
			<div class="btm_top">
				<img v-lazy="orderDetail.courseMain.courseUrlFirst" alt="">
				<div class="title">
					<p class="title_color1">{{orderDetail.courseMain.courseName}}</p>
					<p class="title_color2">￥{{orderDetail.courseMain.price}}</p>
				</div>
			</div>
			<div class="cour_title">您可以将该课程赠送给好友</div>
			<div class="cour_title_small">（每次赠送仅限一个好友领取）</div>
			<div class="btm_main">
				<div class="btn_box">
					<button @click="showToast = true">赠送给好友</button>
				</div>
			</div>
		</div>



		<!--赠送弹出框-->
		<x-dialog v-model="showToast" hide-on-blur class="share_box_msg">
			<div class="share_box_msg_main">
				<div class="main_title">赠送好友</div>
				<div class="details">
					请点击右上角的【···】 <br/>
					并发送给朋友
				</div>
			</div>

		</x-dialog>
    </div>
</template>

<script>
	import api from "fetch/api";
	import {  XDialog  } from "vux";
export default {
    name: 'send_pay_success',
    data () {
        return {
			orderDetail:null,
			courseId : this.$route.query.courseId,
			orderId : this.$route.query.orderId,
			courseStatus : null,
			showToast : false
        }
    },
	created(){
    	this.queryById();

	},
	components : {
		XDialog
	},
    methods: {
    	//获取课程详情
		queryById(){
			let params = {
				courseId : this.courseId
			}
			api.getDetail(params).then(res => {
				if(res.success){
					this.orderDetail = res.data;
					this.getWxShareDoc();
				}else{
					this.$vux.toast.text(res.message);
				}
			})
		},
		//微信分享
		getWxShareDoc(){
			let pageInfo = {
				title : '赠送课程/专栏',
				desc : '您的朋友送你送了个课程/专栏，正等你领取呢',
				img : this.orderDetail.courseMain.courseUrlFirst,
				url : "http://" +window.location.host +"/h5-view#/sendReturn?orderId=" + this.orderId + "&courseId=" + this.courseId
			};
			this.$store.dispatch("shareConfig" , pageInfo);
		}
    }
}
</script>

<style lang="less" scoped>
.send_pay_success{
	display: flex;
	flex-direction: column;
	background: #F1F1F1;
	overflow-y: scroll;
	height: 100%;
	.top{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
		.cour_title{
			margin-top: 0.5rem;
			font-size: 0.32rem;
			color: #333;
			text-align: center;
			font-weight: bold;
		}
		.cour_title_small{
			margin-top: 0.24rem;
			font-size: 0.24rem;
			color: #999;
			text-align: center;
		}
		.btm_main{
			text-align: center;
			.t1{
				color: #333;
				font-size: 0.32rem;
			}
			.t2{
				color: #999;
				margin-top: 0.24rem;
				font-size: 0.24rem;
			}
			.btn_box{
				margin-top: 0.48rem;
				button{
					border: 0;
					background: #6CDDC7;
					color: #fff;
					font-size: 0.36rem;
					width: 100%;
					text-align: center;
					padding: 0.32rem;
				}
				button.disabled{
					background: #D4D4D4;
				}
			}
		}
	}
}
</style>
<style lang="less">
	.send_pay_success{
		.share_box_msg{
			.share_box_msg_main{
				padding: 0.3rem;
				.main_title{
					font-size: 0.36rem;
					font-weight: bold;
					color: #333;
				}
				.details{
					margin-top: 0.32rem;
					line-height: 0.46rem;
					font-size: 0.3rem;
				}
			}
		}
	}
</style>
