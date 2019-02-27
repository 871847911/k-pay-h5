<template>
	<div class="order_pay outermost">
		<div class="course_info">
			<img v-lazy="courseDetail.courseUrlFirst" alt="">
			<div class="title">
				<p>{{ courseDetail.courseName }}</p>
				<div class="price">
					<span class="ping" v-if="type==2">拼</span>
					<p v-if="type!=2"><span class="sale">￥</span>{{ courseDetail.price }}</p>
					<p v-if="type==2"><span class="sale">￥</span>{{ groupInfo.price }}</p>
				</div>
			</div>
		</div>
		<div class="pay_way">
			<p>支付方式</p>
			<div class="wx_pay">
				<img src="../../assets/images/iconImg/wx_pay.svg" alt="">
				微信支付
			</div>
		</div>
		<div class="pay">
			<p v-if="type != 2">实付:<span>￥</span><span>{{ stringValue ? (courseDetail.discountPrice - option/score.value).toFixed(2) : courseDetail.discountPrice.toFixed(2) }}</span></p>
			<p v-else>实付:<span>￥</span><span>{{ groupInfo.price }}</span></p>
			<button v-if="!btnLoading" @click="toOrderPage">确认支付</button>
			<button v-else>支付请求中...</button>
		</div>
		<div class="score" v-if="type==0 && score.isOpen && score.userTotalScore > score.value && courseDetail.discountPrice*score.orderAmountPro>100">
			<p>积分</p>
			<div>
				共{{ score.userTotalScore }}积分，可用{{ score.orderAmountPro*courseDetail.price*score.value/100>=score.userTotalScore?parseInt(score.userTotalScore/score.value)*score.value:parseInt(score.orderAmountPro*courseDetail.price/100)*score.value }}积分，抵扣￥<span>{{ score.orderAmountPro*courseDetail.price*score.value/100>=score.userTotalScore?parseInt(score.userTotalScore/score.value):parseInt(score.orderAmountPro*courseDetail.price/100) }}</span>元,
				<popup-radio title="" :options="options" v-model="option"></popup-radio>
				积分，抵扣￥<span>{{ option/score.value }}元</span>
				<img @click="showTip = true" src="../../assets/images/iconImg/when@2x.png"/>
			</div>
			<inline-x-switch v-model="stringValue"></inline-x-switch>
		</div>
		<div class="score" v-if="type==0 && score.isOpen && score.userTotalScore < score.value  && courseDetail.discountPrice*score.orderAmountPro>100">
			<p>积分</p>
			<div>
				共{{ score.userTotalScore }}积分,满{{ score.value }}积分可用
			</div>
		</div>
		<div class="mask" v-if="showTip">
			<div class="tip">
				<p class="title">积分使用规则</p>
				<p class="head">使用条件</p>
				<p>1.订单金额大于{{ Math.ceil(100/score.orderAmountPro) }}元(含)；</p>
				<p>2.积分数量大于{{ score.value }}(含)；</p>
				<p>3.积分支付不得超过每笔订单应付金额的{{ score.orderAmountPro }}%；</p>
				<p class="head">使用数量</p>
				<p>1.使用积分数量为{{ score.value }}的整数倍；</p>
				<p>2.{{ Math.round(score.orderAmountPro*Math.floor(courseDetail.price)*score.value/100) }}积分抵扣{{ Math.round(score.orderAmountPro*courseDetail.price/100) }}元；</p>
				<p class="know" @click="showTip = false">我知道了</p>
			</div>
		</div>
		<div class="mask" v-if="hasBuy && type != 2 && type != 3">
			<div class="buyTip">
				<p>恭喜您购买成功</p>
				<div class="btn">
					<button @click="toHome">返回首页</button>
					<button @click="toMyOrderDetail">查看订单</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from "fetch/api";
	import vue from 'vue'
	import  { ConfirmPlugin, InlineXSwitch, PopupRadio  } from 'vux'
	vue.use(ConfirmPlugin)
	export default {
		name: "orderPay",
		data() {
			return {
				courseId: this.$route.query.courseId,
				collageId: this.$route.query.collageId,
				courseDetail: {},
				type: this.$route.query.type, //0.普通购买 1.分享 2.拼团 3.赠送
				orderInfo: {},
				wxOrderInfo: {},
				orderParams: {},
				score: {},
				groupInfo: {},
				showTip: false,
				toName : null,
				stringValue: false,
				option: 1,
				options: [1,2,3],
				hasBuy: false,
				btnLoading: true,
				group: {},
				marketOrder: null,
				marketId: this.$route.query.marketId,
				pushId: this.$route.query.pushId,
				marketInfo: {}
			}
		},
		created() {
			if(this.marketId && this.pushId) {
				this.getAppPeddleGoodsDetail()
			}else{
				this.getDetail()
			}
			switch(Number(this.type)) {
				case 0:
					this.btnLoading = false
					break;
				case 1:
					this.createOrder()
					break;
				case 2:
					this.getGroupBuyById()
					if(this.$route.query.wxOrder) {
						this.orderInfo.wechatOrderId = this.$route.query.wxOrder
						this.createUnifyOrder()
					}else{
						this.createCollagOrder()
					}
					break;
				case 3:
					if(this.$route.query.wxOrder) {
						this.orderInfo = this.$route.query.wxOrder
						this.createUnifyOrder()
					}else {
						this.createGiftOrder()
					}
					break;
			}
		},
		beforeRouteEnter(to,from,next){
			sessionStorage.setItem('toName', from.name)
			sessionStorage.setItem('toQuery', JSON.stringify(from.query))
			console.log('sessionStorage', sessionStorage.getItem('toName'), JSON.parse(sessionStorage.getItem('toQuery')))
			next()
		},
		beforeRouteLeave(to, from, next) {
			const _this = this;
			if(this.hasBuy) {
				next()
			}else {
				this.$vux.confirm.show({
					cancelText: '放弃',
					confirmText: '我在想想',
					content: '确认离开?',
					onCancel () {
						console.log('放弃', sessionStorage.getItem('toName'), JSON.parse(sessionStorage.getItem('toQuery')))
						_this.$vux.confirm.hide()
						// _this.$router.replace({name: sessionStorage.getItem('toName'), query: JSON.parse(sessionStorage.getItem('toQuery'))})
						next()
					},
					onConfirm () {
						console.log('我在想想', from.name , from.query)
						_this.$vux.confirm.hide()
						// _this.$router.replace({name:  from.name, query: from.query})
						next({name: from.name , query: from.query});
					}
				})
			}
		},
		methods: {
			getAppPeddleGoodsDetail() {
				let params = {peddleGoodsId: this.marketId}
				api.getAppPeddleGoodsDetail(params).then(res => {
					console.log('分销商品详情', res)
					if(res.serviceCode === 'E000000000') {
						this.marketInfo = res.data
						this.getDetail()
					}
				})
			},
			getPayInfo() {
				api.getPayInfo({}).then(res => {
					console.log('积分抵用', res)
					if(res.success) {
						this.score = res.data
						this.option = res.data.value
						this.options = []
						for(var i = 1;i <= this.score.orderAmountPro*this.courseDetail.price/100;i ++) {
							if(res.data.userTotalScore >= i * res.data.value) {
								this.options.push(i * res.data.value)
							}
						}
					}
				})
			},
			getDetail() {
				let params = { courseId: this.courseId }
				api.getDetail(params).then(res => {
					console.log('课程详情', res)
					if(res.success) {
						this.courseDetail = res.data.courseMain
						if(this.marketId && this.pushId) {
							this.courseDetail.discountPrice = this.courseDetail.discountPrice / this.courseDetail.price * this.marketInfo.price
							this.courseDetail.price = this.marketInfo.price
						}
						this.getPayInfo()
					}
				})
			},
			createMarketOrder() {
				let data = {
					productKey: this.marketId,
					pusherKey: this.pushId,
				}
				let params = {
					event: "DISB_CREATE",
					data: JSON.stringify(data)
				}
				api.createMarketOrder(params).then(res => {
					console.log('分销订单', res)
					if(res.serviceCode === 'E000000000') {
						this.marketOrder = res.data.alternativeData
						// this.createMarketWxOrder()
						console.log(this.orderInfo)
						// window.location.replace('http://192.168.1.141:8080/marketPay?marketId=' + this.marketId + '&body=' + this.marketOrder.body + '&orderNo=' + this.marketOrder.orderNo + '&discountPrice=' + this.courseDetail.discountPrice + '&kpayOrderNo=' + this.orderInfo.wechatOrderId)
						window.location.replace('http://promote-pro.vdongzc.com/marketPay?marketId=' + this.marketId + '&body=' + this.marketOrder.body + '&orderNo=' + this.marketOrder.orderNo + '&discountPrice=' + this.courseDetail.discountPrice + '&kpayOrderNo=' + this.orderInfo.wechatOrderId)
					}else{
						this.$vux.toast.text(res.serviceMessage, 'center')
					}
				}).catch(err => {
					this.$vux.toast.text(err.data.serviceMessage, 'center')
				})
			},
			createMarketWxOrder() {
				let data = {
					orderAmount: 1,
					tradeType: 2,
					body: this.marketOrder.body,
					orderNo: this.marketOrder.orderNo,
					openId: this.$store.state.userInfo.wxOpenid
				}
				let params = {
					event: "DISB_PAY",
					data: JSON.stringify(data),
					orderNo: this.marketOrder.orderNo
				}
				api.createMarketOrder(params).then(res => {
					console.log('分销微信订单', res)
					if(res.serviceCode === 'E000000000') {
						this.wxOrderInfo = res.data.alternativeData
						this.btnLoading = false
						if(this.type == 0) {
							this.wechatPay()
						}
					}else{
						that.$vux.toast.text(res.serviceMessage, 'center')
					}
				}).catch(err => {
					this.$vux.toast.text(err.data.serviceMessage, 'center')
				})
			},
			getGroupBuyById() {
				let params = { courseId: this.courseId }
				api.getGroupBuyById(params).then(res => {
					console.log('拼团课程详情', res)
					if(res.success) {
						this.courseDetail = res.data.courseMain
						this.group = res.data
						this.groupInfo = res.data.groupBuyRule
					}
				})
			},
			createOrder() {
				let params = {
					productId: this.courseId,
					discountType: Number(this.$route.query.type) + 1,  //1.普通购买 2.分享
					score: this.type==0&&this.stringValue==true ? this.option : ''
				}
				api.createOrder(params).then(res => {
					console.log('创建普通订单', res)
					if(res.success) {
						this.orderInfo = res.data
						if(res.data.status == 2) {
							this.hasBuy = true
							window.history.go(-1)
						}else if(this.marketId && this.pushId) {
							this.createMarketOrder()
						}else{
							this.createUnifyOrder()
						}
					}
				})
				console.log(this.option, this.stringValue)
			},
			createGiftOrder() {
				let params = { productId: this.courseId }
				api.createGiftOrder(params).then(res => {
					console.log('创建赠送订单', res)
					if(res.success) {
						this.orderInfo = res.data.wechatOrderId
						this.createUnifyOrder()
					}
				})
			},
			/*createPaidCollagOrder() {
				let params = {
					collageId: this.collageId || -1,
					wechatOrderId: this.orderInfo.wechatOrderId
				}
				api.createPaidCollagOrder(params).then(res => {
					console.log('创建团', res)
					if(res.success) {
						let collageId = this.collageId?this.collageId:res.data.groupId;
						let type = this.collageId ? 0 : 1;
						// window.location.replace("http://" + window.location.host + '/h5-view/groupShare?collageId=' + collageId + '&type=' + type)
						this.$router.replace({name: 'groupShare', query: {collageId: collageId, type: type}})
					}
				})
			},*/
			createPaidCollagOrder() {
				let params = {
					courseId: this.courseId
				}
				api.getGroupBuyById(params).then(res => {
					console.log('创建团', res)
					if(res.success) {
						let collageId = this.collageId?this.collageId:res.data.groupBuyInfo.id;
						let type = this.collageId ? 0 : 1;
						// window.location.replace("http://" + window.location.host + '/h5-view/groupShare?collageId=' + collageId + '&type=' + type)
						this.$router.replace({name: 'groupShare', query: {collageId: collageId, type: type}})
					}
				})
			},
			createCollagOrder() {
				let params = {
					collageId: this.collageId || -1,
					courseId: this.courseId,
					date: new Date(new Date().getTime()).toLocaleDateString().replace(/\//g, "-") + " " + new Date(new Date().getTime()).toTimeString().substr(0, 8)
				}
				api.createCollagOrder(params).then(res => {
					console.log('创建拼团订单', res)
					if(res.success) {
						this.orderInfo = res.data
						this.createUnifyOrder()
					}
				})
			},
			createUnifyOrder() {
				var params;
				if(this.type == 3) {
					params = {
						wechatOrderId: this.orderInfo,
						openId: this.$store.state.userInfo.wxOpenid
					}
				}else{
					params = {
						wechatOrderId: this.orderInfo.wechatOrderId,
						openId: this.$store.state.userInfo.wxOpenid
					}
				}
				api.createUnifyOrder(params).then(res => {
					console.log('微信订单', res)
					if(res.success) {
						this.wxOrderInfo = res.data
						this.btnLoading = false
						if(this.type == 0) {
							this.wechatPay()
						}
					}
				})
			},
			wechatPay() {
				var that = this
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": that.wxOrderInfo.appId,     //公众号名称，由商户传入
						"timeStamp": that.wxOrderInfo.timeStamp,         //时间戳，自1970年以来的秒数
						"nonceStr": that.wxOrderInfo.nonceStr, //随机串
						"package": that.wxOrderInfo.package || that.wxOrderInfo.packageValue,
						"signType": that.wxOrderInfo.signType,         //微信签名方式：
						"paySign": that.wxOrderInfo.paySign //微信签名
					},
					function(res){
						if(res.err_msg == "get_brand_wcpay_request:ok"){
							that.hasBuy = true
							that.paySuccess()
						}else if(res.err_msg == "get_brand_wcpay_request:cancel") {
							that.$vux.toast.text('取消支付', 'center')
						}else if(res.err_msg == "get_brand_wcpay_request:fail") {
							that.$vux.toast.text('支付失败', 'center')
						}
					})
			},
			toOrderPage() {
				if(this.type == 0) {
					// if(this.marketId && this.pushId){
					// 	this.createMarketOrder()
					// }else{
					// 	this.createOrder()
					// }
					this.createOrder()
				}else if(this.type == 2) {
					if(this.group.appGroupStateDTO.state == 0) {
						this.wechatPay()
					}else {
						this.$vux.toast.text(this.group.appGroupStateDTO.message, 'center')
					}
				}else{
					this.wechatPay()
				}
			},
			paySuccess() {
				switch(Number(this.type)){
					case 2:
						this.createPaidCollagOrder()
						break;
					case 3:
						/*let params = {
							storeId : this.$store.state.userInfo.storeId,
							orderId : this.orderInfo
						}
						api.buyGiftSuccess(params).then(res => {
							if(res.success){
								// window.location.replace("http://" + window.location.host + '/h5-view/sendPaySuccess?orderId=' + this.orderInfo + "&courseId=" + this.courseId)
								this.$router.replace({name : 'sendPaySuccess' , query : {orderId : this.orderInfo , courseId : this.courseId}})
							}else{
								this.$vux.toast.text(res.message, 'top')
							}

						})*/
						this.$router.replace({name : 'sendPaySuccess' , query : {orderId : this.orderInfo , courseId : this.courseId}})
						break;
				}
			},
			toHome() {
				this.$router.replace({name: 'home'})
			},
			toMyOrderDetail() {
				this.$router.replace({name: 'myOrderDetail', query: {orderId: this.orderInfo.id}})
			}
		},
		components: {
			InlineXSwitch,
			PopupRadio
		}
	}
</script>

<style scoped lang="less">
	.order_pay{
		box-sizing: border-box;
		position: relative;
		background: rgba(244,244,244,1);
		.course_info{
			background: #fff;
			display: flex;
			padding: .5rem .32rem .48rem;
			.title{
				flex: 1;
				p:nth-of-type(1) {
					width: 4.04rem;
					color: @main_title_color;
					/*font-weight: 900;*/
					line-height: .35rem;
					height: .7rem;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.price{
					margin-top: .4rem;
					display: flex;
					height: .34rem;
					line-height: .34rem;
					.ping{
						width: .34rem;
						height: .34rem;
						font-size: .11rem;
						line-height: .34rem;
						border-radius: .04rem;
						color: #fff;
						text-align: center;
						background: @main_price_color;
					}
					p{
						color: @main_price_color;
						height: .34rem;
						font-weight: 900;
						font-size: .3rem;
						.sale{
							font-size: .2rem;
							color: @main_price_color;
							font-weight: 100;
							line-height: .34rem;
						}
					}
				}
			}
			img{
				width: 2.56rem;
				height: 1.44rem;
				margin-right: .16rem;
				border-radius: .04rem;
			}
		}
		.pay_way{
			background: #fff;
			display: flex;
			padding: 0 .32rem;
			height: 1.18rem;
			line-height: 1.18rem;
			justify-content: space-between;
			border-top: .1rem solid rgba(244,244,244,1);
			border-bottom: .1rem solid rgba(244,244,244,1);
			p{
				font-size: .32rem;
				color: @main_title_color;
			}
			.wx_pay{
				font-size: .32rem;
				color: @main_title_color;
				img{
					width: .28rem;
					height: .26rem;
					margin-right: .2rem;
				}
			}
		}
		.pay{
			background: #fff;
			display: flex;
			padding: .1rem .32rem;
			border-top: .02rem solid rgba(248,248,248,1);
			justify-content: space-between;
			height: .88rem;
			align-self: flex-end;
			position: absolute;
			bottom: 0;
			width: 6.86rem;
			p{
				color: @main_title_color;
				line-height: .88rem;
				span{
					color: @main_price_color;
					font-weight: 900;
					&:nth-child(1) {
						font-size: .2rem;
						font-weight: 100;
					}
				}
			}
			button{
				width: 3rem;
				height: .8rem;
				background: rgba(254,128,96,1);
				border-radius: .04rem;
				font-size: .28rem;
			}
		}
		.score{
			display: flex;
			padding: .28rem .32rem;
			line-height: .5rem;
			background: #fff;
			p{
				margin-right: .2rem;
				font-size: .32rem;
				line-height: .44rem;
			}
			div{
				flex: 1;
				display: inline-block;
				color: @main_time_color;
				.weui-cell, .vux-tap-active, .weui-cell_access{
					height: .3rem;
					width: 1rem;
					border: .01rem solid #F1F1F1;
					border-radius: .08rem;
					padding-top: 0;
					margin-top: .1rem;
				}
				img{
					width: .3rem;
					height: .3rem;
					margin-left: .2rem;
				}
			}
			span{
				color: @main_price_color;
				font-weight: 900;
			}
			input{
				margin-left: .2rem;
			}
		}

		.mask{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			background: rgba(0,0,0,.4);
			.tip{
				background: #ffffff;
				width: 5.4rem;
				margin: 2rem 0 0 1.05rem;
				border-radius: .28rem;
				.title{
					text-align: center;
					height: .36rem;
					padding: .44rem 0 .28rem;
					font-size: .36rem;
					color: @main_title_color;
				}
				.head{
					font-size: .3rem;
					padding-bottom: .08rem;
					color: @main_title_color;
					&:nth-of-type(2) {
						padding-top: .12rem;
					}
				}
				p{
					color: @main_content_color;
					line-height: .36rem;
					font-size: .26rem;
					margin: 0 .4rem;
					&:nth-of-type(6) {
						padding-top: .12rem;
					}
					&:nth-of-type(8) {
						padding-bottom: .56rem;
					}
				}
				.know{
					color: @active-color;
					height: .44rem;
					line-height: .44rem;
					padding: .18rem 0 .24rem;
					font-size: .32rem;
					text-align: center;
					border-top: .02rem solid rgba(0,0,80,0.05);
					margin: 0;
				}
			}
			.buyTip{
				width: 5.4rem;
				height: 2.8rem;
				background: #fff;
				border-radius: .28rem;
				margin-top: 50%;
				margin-left: 1.04rem;
				overflow: hidden;
				p{
					height: .36rem;
					line-height: .36rem;
					padding: .82rem 0 .74rem;
					font-size: .36rem;
					text-align: center;
				}
				.btn{
					display: flex;
					border-top: .02rem solid rgba(0,0,80,0.05);
					button{
						flex: 1;
						height: .86rem;
						line-height: .86rem;
						background: #fff;
						color: @main_title_color;
						&:nth-of-type(2) {
							color: @active-color;
							border-left: .02rem solid rgba(0,0,80,0.05);
						}
					}
				}
			}

		}
	}
</style>
