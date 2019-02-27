<template>
    <div class='apply_withdrawal outermost'>
		<dl>
			<dt>到账银行卡</dt>
			<dd v-if="!$route.query.id" @click="chooseBink"><p>选择银行卡</p><span class="iconfont icon-jiantou"></span></dd>
			<dd v-else @click="chooseBink"><p>{{ bankInfo.bankName }}（{{cardNumber.substr(-4)}}）</p><span class="iconfont icon-jiantou"></span></dd>
		</dl>
		<p class="tip">提现金额</p>
		<div class="number">
			<span>￥</span>
			<input type="number" v-model="profit" onkeyup="this.value = this.value.replace(/[^\d.]/g,'')" />
			<span class="iconfont icon-ego-guanbi" @click="profit = ''"></span>
		</div>
		<div class="profit">
			<p v-if="!showOver">可提现金额{{amount.profit}}元</p>
			<p v-if="showOver" class="over">金额已超过可提现金额</p>
			<p class="all" @click="profit = amount.profit">全部提现</p>
		</div>
		<button @click="toFeedback">提交</button>
		<p class="times">一个月共可提现<span>3</span>次，本月还可提现<span>{{amount.lastWithdrawNum}}</span>次；大于<span>100</span>元才可提现</p>
    </div>
</template>

<script>
	import api from "fetch/api";
export default {
    name: 'apply_withdrawal',
    data () {
        return {
			amount: {},
			profit: '',
			showOver: false,
			bankInfo: {},
			cardNumber: ''
        }
    },
    created() {
		this.getPayUserBalance()
		if(this.$route.query.id) {
			this.userBankDetail()
		}
    },
	activated() {
		this.getPayUserBalance()
		if(this.$route.query.id) {
			this.userBankDetail()
		}
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
		userBankDetail() {
			let params = {id: this.$route.query.id}
			api.userBankDetail(params).then(res => {
				console.log('银行卡详情', res)
				if(res.success) {
					this.bankInfo = res.data
					this.cardNumber =res.data.cardNumber
				}
			})
		},
		applyWithdraw() {
			let params = {
				bankId: this.$route.query.id,
				amount: this.profit
			}
			api.applyWithdraw(params).then(res => {
				console.log('申请提现', res)
				if(res.success) {
					this.$router.replace({path: '/feedBack'})
				}
 			})
		},
		chooseBink() {
			this.$router.replace({path: '/bankManage', query:{from: 'apply'}})
		},
		toFeedback() {
			if(!this.$route.query.id) {
				this.$vux.toast.text('请选择银行卡', 'center')
			}else if(this.profit == '' || this.profit == 0) {
				this.$vux.toast.text('请输入提现金额', 'center')
			}else if(this.amount.lastWithdrawNum <= 0) {
				this.$vux.toast.text('本月提现次数已为0', 'center')
			}else if(this.showOver) {
				this.$vux.toast.text('提现金额超出账户余额', 'center')
			}else{
				this.applyWithdraw()
			}
		}

    },
	watch: {
		profit: {
			handler:function(val,oldval){
				if(this.profit > this.amount.profit){
					this.showOver = true
				}else{
					this.showOver = false
				}
			}
		}
	},
	beforeRouteLeave(to, from, next) {
	console.log(to.name)
		if(to.name == 'withdrawal' || to.name == 'feedback') {
			this.$destroy()
		}
		next()
	}
}
</script>

<style lang="less" scoped>
    .apply_withdrawal{
		dl{
			display: flex;
			height: .44rem;
			line-height: .44rem;
			margin: 0 .3rem;
			padding: .4rem 0;
			border-bottom: .01rem solid rgba(241,241,241,1);
			dt{
				margin-right: .4rem;
				font-size: .3rem;
				color: @main_time_color;
			}
			dd{
				flex: 1;
				display: flex;
				p{
					font-size: .32rem;
					flex: 1;
				}
				span{
					color: @main_time_color;
					font-size: .2rem;
				}
			}
		}
		.tip{
			height: .42rem;
			line-height: .42rem;
			margin-top: .3rem;
			margin-left: .32rem;
			color: @main_time_color;
		}
		.number{
			display: flex;
			height: 1.34rem;
			line-height: 1.34rem;
			margin: 0 .32rem;
			color: @main_content_color;
			span{
				&:nth-of-type(1) {
					font-size: .4rem;
				}
				&:nth-of-type(2) {
					color: @main_time_color;
					font-size: .24rem;
				}
			}
			input{
				width: 6rem;
				font-size: .68rem;
				border: 0;
			}
		}
		.profit{
			display: flex;
			justify-content: space-between;
			margin: 0 .32rem;
			padding: .2rem 0 0;
			border-top: .01rem solid rgba(241,241,241,1);
			p{
				height: .42rem;
				line-height: .42rem;
				color: @main_time_color;
			}
			.over{
				color: rgba(255,149,149,1);
			}
			.all{
				color: @active-color;
			}
		}
		button{
			margin: 1.04rem 0 0 .32rem;
			font-size: .36rem;
			font-weight: 900;
			background: @active-color;
			width: 6.88rem;
			height: .98rem;
			line-height: .98rem;
		}
		.times{
			color: @main_content_color;
			height: .32rem;
			line-height: .32rem;
			font-size: .22rem;
			margin: .12rem .3rem;
			text-align: center;
			span{
				color: @active-color;
			}
		}
    }
</style>
