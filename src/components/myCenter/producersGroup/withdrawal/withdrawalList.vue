<template>
    <div class="withdrawal_list outermost">
		<scroll :page="pageNum" :size="pageSize" :total="total"  @change="pageChange">
			<div class="list" v-for="(item, index) in list" @click="toWithdrawalDetail(item.id)" :key="index">
				<div class="title">
					<p v-if="$route.query.type == 2">入账—{{ item.bankName }}</p>
					<p v-else>提现申请中</p>
					<p>{{ item.amount }}元</p>
				</div>
				<p class="time" v-if="$route.query.type == 1">{{ item.createTime }}</p>
				<p class="time" v-else>{{ item.finishTime }}</p>
			</div>
		</scroll>
	</div>
</template>

<script>
	import api from "fetch/api";
    import scroll from 'module/scroll'
    export default {
        name: "withdrawalList",
		data() {
        	return {
				pageNum: 1,
				pageSize: 10,
				total: '',
				list: []
			}
		},
		created() {
			this.getUserWithdrawList()
		},
		methods: {
			getUserWithdrawList() {
				let params = {
					withdrawType: this.$route.query.type,
					page: this.pageNum,
					pageSize: this.pageSize
				}
				api.getUserWithdrawList(params).then(res => {
					console.log('提现列表', res)
					if(res.success) {
						this.list = [...this.list, ...res.data.list]
						this.total = res.data.total
					}
				})
			},
			toWithdrawalDetail(e) {
				this.$router.push({name : 'withdrawalDetail', query:{ id: e}})
			},
			pageChange(page) {
				this.pageNum = page
				this.getUserWithdrawList()
			}
		},
		components: {
			scroll
		}
    }
</script>

<style scoped lang="less">
	.withdrawal_list{
		.list{
			display: flex;
			flex-direction: column;
			padding: .4rem 0 .4rem;
			margin: 0 .32rem;
			border-bottom: .01rem solid rgba(241,241,241,1);
			.title{
				display: flex;
				justify-content: space-between;
				height: .4rem;
				line-height: .4rem;
				color: @main_title_color;
				p{
					font-size: .28rem;
					&:nth-of-type(2) {
						margin-top: .08rem;
					}
				}
			}
			.time{
				margin-top: .18rem;
				font-size: .24rem;
				height: .34rem;
				color: @main_time_color;
			}
		}
	}

</style>
