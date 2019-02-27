<template>
    <div class="income outermost">
		<scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
			<div class="income_list" v-if="type != 5" v-for="(item, index) in incomeList" :key="index">
				<div class="title">
					<p v-if="type == 1 || type == 2 || type == 3">{{ item.consumer }}购买《{{ item.productName }}》</p>
					<p v-if="type == 4">结算—《{{ item.productName }}》</p>
					<p>{{ item.amount }}元</p>
				</div>
				<div class="price">
					<p>{{ item.createTime }}</p>
					<p v-if="type != 4">服务费{{ item.serviceRate }}%</p>
				</div>
			</div>
			<div class="need_list" v-if="type == 5" v-for="(item, index) in incomeList" :key="index">
				<img v-lazy="" alt="">
				<div class="course_cont">
					<p>{{ item.productName }}</p>
					<p><span>待结算</span> {{  item.courseAmount || 0 }} 元</p>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script>
	import api from "fetch/api";
	import scroll from 'module/scroll'
    export default {
        name: "incomeList",
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				pageTotal: null,
				type: '',
				incomeList: []
			}
		},
		created() {
			this.type = this.$route.query.type
			switch (this.type) {
				case 1:
					document.title = '今日收入'
					this.getUserIncomeList()
					break;
				case 2:
					document.title = '本月收入'
					this.getUserIncomeList()
					break;
				case 3:
					document.title = '累计收入'
					this.getUserIncomeList()
					break;
				case 4:
					document.title = '已结算'
					this.getSettlementDetailList()
					break;
				case 5:
					document.title = '待结算'
					this.getNeedSettlementList()
					break;
			}
		},
		methods: {
			getUserIncomeList() {
				let params = {
					incomeTime: this.type,//1今日 2本月 3累计
					page: this.pageNum,
					pageSize: this.pageSize,
				}
				api.getUserIncomeList(params).then(res => {
					if(res.success) {
						console.log('生产者收入列表', res)
						this.incomeList = [...this.incomeList, ...res.data.list]
						this.pageTotal = res.data.total
					}
				})
			},
			getSettlementDetailList() {
				let params = {
					productType: 1,
					page: this.pageNum,
					pageSize: this.pageSize,
				}
				api.getSettlementDetailList(params).then(res => {
					if(res.success) {
						console.log('生产者已结算列表', res)
						this.incomeList = [...this.incomeList, ...res.data.list]
						this.pageTotal = res.data.total
					}
				})
			},
			getNeedSettlementList() {
				let params = {
					productType: 1,
					page: this.pageNum,
					pageSize: this.pageSize,
				}
				api.getNeedSettlementList(params).then(res => {
					if(res.success) {
						console.log('生产者待结算列表', res)
						this.incomeList = [...this.incomeList, ...res.data.list]
						this.pageTotal = res.data.total
					}
				})
			},
			pageChange(page) {
				this.pageNum = page;
				switch (Number(this.type)) {
					case 1:
						this.getUserIncomeList()
						break;
					case 2:
						this.getUserIncomeList()
						break;
					case 3:
						this.getUserIncomeList()
						break;
					case 4:
						this.getSettlementDetailList()
						break;
					case 5:
						this.getNeedSettlementList()
						break;
				}
			}
		},
		components: {
			scroll
		}
    }
</script>

<style scoped lang="less">
	.income_list{
		display: flex;
		flex-direction: column;
		margin: 0 .32rem;
		padding: .4rem 0;
		border-bottom: .02rem solid rgba(241,241,241,1);
		.title{
			display: flex;
			color: @main_title_color;
			p:nth-of-type(1) {
				flex: 1;
				overflow: hidden;
				white-space: nowrap;
				line-height: .4rem;
				height: .4rem;
				text-overflow: ellipsis;
			}
			p:nth-of-type(2) {
				width: 1.5rem;
				text-align: right;
				margin-top: .08rem;
			}
		}
		.price{
			display: flex;
			justify-content: space-between;
			margin-top: .08rem;
			p{
				color: @main_time_color;
				height: .34rem;
				line-height: .34rem;
			}
		}
	}
	.need_list{
		display: flex;
		margin: 0 .32rem;
		padding: .4rem 0;
		border-bottom: .02rem solid rgba(241,241,241,1);
		img{
			width: 1.6rem;
			height: 1.6rem;
			border-radius: .08rem;
			margin-right: .32rem;
		}
		.course_cont{
			color: @main_title_color;
			line-height: .42rem;
			p:nth-of-type(1) {
				font-weight: 900;
				height: .84rem;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			p:nth-of-type(2) {
				height: .42rem;
				margin-top: .34rem;
				span{
					color: #9B9B9B;
				}
			}
		}

	}

</style>
