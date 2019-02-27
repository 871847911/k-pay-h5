<template>
    <div class="withdrawal_detail outermost">
		<p class="number">{{ withdraw.amount }}元</p>
		<p class="status">{{ withdraw.withdrawType == 2 ? '对方已转账' : '申请中' }}</p>
		<dl>
			<dt>提现时间</dt>
			<dd>{{ withdraw.createTime }}</dd>
		</dl>
		<dl v-if="withdraw.withdrawType == 2">
			<dt>完成时间</dt>
			<dd>{{ withdraw.finishTime }}</dd>
		</dl>
		<dl>
			<dt>姓名</dt>
			<dd>{{ withdraw.userName }}</dd>
		</dl>
		<dl>
			<dt>卡号</dt>
			<dd>{{ withdraw.cardNumber.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ') }}</dd>
		</dl>
		<dl>
			<dt>银行卡</dt>
			<dd>{{ withdraw.bankName }}</dd>
		</dl>
		<dl v-if="withdraw.withdrawType == 2">
			<dt>剩余可提现</dt>
			<dd>{{ withdraw.surplusAmount }}元</dd>
		</dl>
	</div>
</template>

<script>
	import api from "fetch/api";
    export default {
        name: "withdrawalDetail",
		data() {
        	return {
				withdraw: {}
			}
		},
		created() {
			this.getUserWithdraw()
		},
		methods: {
			getUserWithdraw() {
				let params = {id: this.$route.query.id}
				api.getUserWithdraw(params).then(res => {
					console.log('提现详情', res)
						this.withdraw = res.data
				})
			}
		}
    }
</script>

<style scoped lang="less">
	.withdrawal_detail{
		display: flex;
		flex-direction: column;
		align-items: center;
		.number{
			height: .84rem;
			line-height: .84rem;
			font-size: .6rem;
			margin-top: .6rem;
			font-weight: 900;
		}
		.status{
			height: .42rem;
			line-height: .42rem;
			color: @main_time_color;
			margin: .14rem 0 .6rem;
		}
		dl{
			box-sizing: border-box;
			width: 100%;
			padding: 0 .3rem;
			margin: 0 0 .34rem;
			display: flex;
			justify-content: space-between;
			height: .42rem;
			line-height: .42rem;
			dt{
				font-size: .3rem;
				color: @main_time_color;
			}
			dd{
				font-size: .32rem;
				color: @main_title_color;
			}
		}
	}
</style>
