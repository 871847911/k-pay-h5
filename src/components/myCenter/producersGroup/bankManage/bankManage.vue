<template>
    <div class="bank_manage outermost">
		<div class="bank-list" v-for="(item, index) in bankList" @click="toAppy(item.id)" :key="index">
			<p>{{ item.bankName }}</p>
			<p>{{ item.cardNumber.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ') }}</p>
			<span class="icon-shuxiebianji" @click.stop="updataBank(item.id)"></span>
		</div>
		<button @click="toAddBankCard">新建银行卡</button>
	</div>
</template>

<script>
	import api from "fetch/api";
	export default {
        name: "bankManage",
		data() {
        	return {
				bankList: []
			}
		},
		created() {
			this.getUserBankList()
			console.log(this.$router)
		},
		methods: {
			getUserBankList() {
				api.getUserBankList().then(res => {
					console.log('银行卡列表', res)
					if(res.success) {
						this.bankList = res.data
					}
				})
			},
			toAddBankCard() {
				this.$router.push({path: '/addBankCard'})
			},
			updataBank(e) {
				if(this.$route.query.from == 'apply') {
					this.$router.push({path: '/addBankCard', query: {id: e, from: 'apply'}})
				}else{
					this.$router.push({path: '/addBankCard', query: {id: e}})
				}
			},
			toAppy(e) {
				if(this.$route.query.from == 'apply'){
					this.$router.replace({path : '/applyWithdrawal', query: {id: e}})
				}
			}
		},
    }
</script>

<style scoped lang="less">
	.bank_manage{
		.bank-list{
			background: #F8F8F8;
			width: 6.9rem;
			margin: .3rem;
			border-radius: .08rem;
			position: relative;
			p:nth-of-type(1) {
				height: .34rem;
				line-height: .34rem;
				color: @main_content_color;
				font-size: .24rem;
				padding-top: .28rem;
				text-indent: .24rem;
			}
			p:nth-of-type(2) {
				color: @main_title_color;
				height: .4rem;
				line-height: .4rem;
				font-size: .28rem;
				text-indent: .24rem;
				padding: .14rem 0 .24rem;
			}
			span{
				position: absolute;
				right: .2rem;
				top: .4rem;
				font-family: iconfont;
				color: @main_time_color;
			}
		}
		button{
			margin: 2.32rem 0 0 .32rem;
			font-size: .36rem;
			font-weight: 900;
			width: 6.88rem;
			height: .98rem;
			line-height: .98rem;
			background: @active-color;
		}
	}
</style>
