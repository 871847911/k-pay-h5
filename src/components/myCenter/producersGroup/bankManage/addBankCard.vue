<template>
	<div class="add_bank_card outermost">
		<dl>
			<dt>姓名</dt>
			<dd><input type="text" v-model="userName" /></dd>
		</dl>
		<dl>
			<dt>银行</dt>
			<dd><input type="text" v-model="bankName" /></dd>
		</dl>
		<dl>
			<dt>卡号</dt>
			<dd><input type="number" v-model="cardNumber" onkeyup="this.value = this.value.replace(/[^\d]/g,'')" /></dd>
		</dl>
		<dl>
			<dt>开户行</dt>
			<dd><input type="text" v-model="openBankName" /></dd>
		</dl>
		<button @click="addBank">保存</button>
		<button class="deteteBank" @click="deleteUserBank" v-if="$route.query.id">删除</button>
	</div>
</template>

<script>
	import api from "fetch/api";
    export default {
        name: "addBankCard",
		data() {
        	return {
				userName: '',
				bankName: '',
				cardNumber: '',
				openBankName: '',
			}
		},
		created() {
			if(this.$route.query.id) {
				this.userBankDetail()
			}
		},
		methods: {
			addUserBank() {
				let params = {
					userName: this.userName.trim(),
					bankName: this.bankName.trim(),
					cardNumber: this.cardNumber.trim(),
					openBankName: this.openBankName.trim()
				}
				api.addUserBank(params).then(res => {
					console.log('新建银行卡', res)
					if(res.success) {
						this.$vux.toast.text('添加银行卡成功', 'center')
						window.history.go(-1);
					}
				})
			},
			updateUserBank() {
				let params = {
					id: this.$route.query.id,
					userName: this.userName.trim(),
					bankName: this.bankName.trim(),
					cardNumber: this.cardNumber.trim(),
					openBankName: this.openBankName.trim()
				}
				api.updateUserBank(params).then(res => {
					console.log('修改银行卡', res)
					if(res.success) {
						this.$vux.toast.text('修改成功', 'center')
						window.history.go(-1);
					}
				})
			},
			userBankDetail() {
				let params = {id: this.$route.query.id}
				api.userBankDetail(params).then(res => {
					console.log('银行卡详情', res)
					if(res.success) {
						this.userName = res.data.userName
						this.bankName = res.data.bankName
						this.cardNumber = res.data.cardNumber
						this.openBankName = res.data.openBankName
					}
				})
			},
			addBank() {
				if(this.userName != '' && this.bankName != '' && this.cardNumber != '' && this.openBankName != ''){
					if(this.$route.query.id) {
						this.updateUserBank()
					}else {
						this.addUserBank()
					}
				}else{
					this.$vux.toast.text('请输入信息', 'center')
				}
			},
			deleteUserBank() {
				let params = {id: this.$route.query.id}
				api.deleteUserBank(params).then(res => {
					console.log('删除银行卡', res)
					if(res.success) {
						this.$vux.toast.text('删除成功', 'center')
						window.history.go(-1);
					}
				})
			}
		}
    }
</script>

<style scoped lang="less">
	.add_bank_card{
		dl{
			display: flex;
			margin: 0 .32rem;
			border-bottom: .01rem solid rgba(241,241,241,1);
			dt{
				height: 1.3rem;
				width: 1.1rem;
				font-size: .3rem;
				color: @main_time_color;
				line-height: 1.3rem;
			}
			dd{
				flex: 1;
				input{
					width: 100%;
					line-height: .7rem;
					margin-top: .3rem;
					word-break: break-all;
					border: 0;
					font-size: .32rem;
				}
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
		.deteteBank{
			margin-top: .28rem;
			background: rgba(212,212,212,1);
			width: 6.88rem;
			height: .98rem;
			line-height: .98rem;
		}
	}
</style>
