<template>
	<div class='withdrawal'>
		<div class="head_box">
			<img class="head_img" :src="require('@/assets/images/symbols-bg-jifen1.png')" alt="">
			<div class="price_box">
				<div class="price">{{ amount.profit || 0 }}元</div>
				<div class="title">可提现金额</div>
			</div>
		</div>
		<div class="main_box">
			<div class="line" @click="toIncomeList(4)">
				<p class="name">已结算</p>
				<div class="number">
					<p>{{ amount.payAmount || 0 }}元</p>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</div>
			<div class="line" @click="toWithdrawalList(1)">
				<p class="name">冻结提现</p>
				<div class="number">
					<p>{{ amount.freeze || 0 }}元</p>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</div>
			<div class="line" @click="toIncomeList(5)">
				<p class="name">待结算</p>
				<div class="number">
					<p>{{ income.waitAmount || 0 }}元</p>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</div>
		</div>

		<div class="main_box">
			<div class="line" @click="toIncomeList(1)">
				<p class="name">今日收入</p>
				<div class="number">
					<p>{{ income.dayAmount || 0 }}元</p>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</div>
			<div class="line" @click="toIncomeList(2)">
				<p class="name">本月收入</p>
				<div class="number">
					<p>{{ income.moonAmount || 0 }}元</p>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</div>
			<div class="line" @click="toIncomeList(3)">
				<p class="name">累计收入</p>
				<div class="number">
					<p>{{ income.allAmount || 0 }}元</p>
					<i class="iconfont icon-jiantou"></i>
				</div>
			</div>
		</div>

		<div class="bank" @click="toBankManage">
			<p class="name">银行卡管理</p>
			<div class="number">
				<i class="iconfont icon-jiantou"></i>
			</div>
		</div>

		<button class="price_btn" @click="toApplyWithdrawal">提现</button>

	</div>
</template>

<script>
	import api from "fetch/api";
	export default {
		name: 'my_money',
		data () {
			return {
				amount: {},
				income: {}
			}
		},
		created() {
			this.getPayUserBalance()
			this.getUserIncomeSummary()
		},
		methods: {
			getPayUserBalance() {
				api.getPayUserBalance().then(res => {
					console.log('账户金额', res)
					if(res.success) {
						this.amount = res.data
					}
				})
			},
			getUserIncomeSummary() {
				api.getUserIncomeSummary().then(res => {
					if(res.success) {
						this.income = res.data
					}
				})
			},
			toApplyWithdrawal(){
				this.$router.push({name : 'applyWithdrawal'})
			},
			toWithdrawalList(e) {
				this.$router.push({name : 'withdrawalList', query:{ type: e}})
			},
			toIncomeList(e) {
				this.$router.push({path: '/incomeList', query: {type: e}})
			},
			toBankManage() {
				this.$router.push({name : 'bankManage'})
			}

		}
	}
</script>

<style lang="less" scoped>
	.withdrawal{
		background: rgba(244,244,244,1);
		min-height: 100vh;
		.head_box{
			border-top: .2rem solid #fff;
			border-bottom: .2rem solid #fff;
			border-left: .32rem solid #fff;
			border-right: .32rem solid #fff;
			width: 100%;
			border-radius: .04rem;
			box-sizing: border-box;
			position: relative;
			display: flex;
			height: 2.56rem;
			.head_img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.price_box{
				width: 100%;
				height: 2.16rem;
				margin: auto;
				text-align: center;
				position: relative;
				.title{
					font-size: 0.24rem;
					margin-top: .1rem;
					color: #666;
				}
				.price{
					height: .84rem;
					margin-top: .44rem;
					font-size: .6rem;
					font-weight: 900;
				}
			}
		}
		.main_box{
			display: flex;
			flex-direction: column;
			background: #fff;
			padding: 0 0.32rem;
			border-top: .1rem solid rgba(244,244,244,1);
			.line{
				height: .96rem;
				display: flex;
				justify-content: space-between;
				border-bottom: .01rem solid rgba(229,229,229,1);
				font-size: .28rem;
				&:nth-of-type(3) {
					border: 0;
				}
				.name{
					line-height: .96rem;
					color: @main_content_color;
				}
				.number{
					display: flex;
					line-height: .96rem;
					p{
						color: @main_title_color;
						margin-right: .24rem;
					}
					i{
						color: @main_time_color;
					}
				}
			}
		}
		.bank{
			height: .96rem;
			display: flex;
			justify-content: space-between;
			padding: 0 .32rem;
			background: #fff;
			border-top: .1rem solid rgba(244,244,244,1);
			font-size: .28rem;
			&:nth-of-type(3) {
				border: 0;
			}
			.name{
				line-height: .96rem;
				color: @main_content_color;
			}
			.number{
				display: flex;
				line-height: .96rem;
				p{
					color: @main_title_color;
					margin-right: .24rem;
				}
				i{
					color: @main_time_color;
				}
			}
		}
		.price_btn{
			width: 6.88rem;
			height: .8rem;
			background: #6CDDC7;
			color: #fff;
			margin: .28rem 0 0 .32rem;
			font-size: .28rem;
		}
	}
</style>
