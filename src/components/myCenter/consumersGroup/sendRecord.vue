
<template>
	<div class="sendRecord outermost">

		<scroll v-if="sendList.length > 0" :page="pageData.page" :size="pageData.size" :total="pageData.total" @change="pageChange">
			<div class="send_list" v-for="(item,index) in sendList" :key="index">
				<div class="left">
					<img v-lazy="item.courseImage" alt="">
				</div>
				<div class="right">
					<div class="right_top">
						{{item.courseName}}
					</div>
					<div class="right_btm">
						<button type="buttom" v-if="item.giftStatus == 0" class="is_gift" @click="toSendPage(item.id,item.courseId)">未被领取</button>
						<button type="buttom" v-if="item.giftStatus == 1" class="no_gift" @click="isSuccessSendPage(item.id,item.courseId)">已赠送</button>
					</div>
				</div>
			</div>
		</scroll>
		<empty v-else :title="pageData.notitle" :img="pageData.noimg"></empty>
    </div>
</template>

<script>
	import api from 'fetch/api'
	import scroll from 'module/scroll'
	import empty from 'module/empty'
export default {
    name: 'sendRecord',
    data () {
        return {
        	sendList : [],
			pageData : {
				page : 1,
				size : 10,
				total : null,
				notitle : "暂无赠送记录",
				noimg : require('@/assets/images/noContent/gift@2x.png')
			}
        }
    },
	components : {
		scroll,
		empty
	},
	created(){
    	this.getPageGiftOrder();
	},
    methods: {
		getPageGiftOrder(){
			let params = {
				pageNum : this.pageData.page,
				pageSize : this.pageData.size,
				userId : this.$store.state.userInfo.id,
				storeId : this.$store.state.userInfo.storeId
			}
			api.pageGiftOrder(params).then(res => {
				console.log(res)
				if(res.success){
					this.sendList = [...this.sendList , ...res.data.list];
					this.pageData.total = res.data.total;
				}else{
					this.$vux.toast.text(res.message);
				}
			})
		},
		toSendPage(orderId , courseId){

			// window.location.href ="http://" + window.location.host + '/h5-view/sendPaySuccess?orderId=' + orderId + '&courseId=' + courseId
			this.$router.push({
				name : 'sendPaySuccess',
				query : {
					orderId : orderId,
					courseId : courseId
				}
			})
		},
		isSuccessSendPage(orderId , courseId){
			this.$router.push({
				name : 'sendSuccess',
				query : {
					orderId : orderId,
					courseId : courseId
				}
			})
		},
		pageChange(page){
			this.pageData.page = page;
			this.getPageGiftOrder();
		}
    }
}
</script>

<style lang="less" scoped>
	.sendRecord{
		.send_list{
			padding: 0.4rem 0.32rem;
			border-bottom: 1px solid #F1F1F1;
			display: flex;
			.left{
				width: 2.56rem;
				height: 1.56rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 0.24rem;
				.right_top{
					color: #111;
					font-size: 0.3rem;
					word-break: break-all;
				}
				.right_btm{
					text-align: right;
					button{
						background: transparent;
						color: #6CDDC7;
						font-size: 0.3rem;
						border: 1px solid #6CDDC7;
						border-radius: 4px;
						padding: 0.1rem 0.36rem;
					}
					button.no_gift{
						border: 2px solid #D0D0D0;
						color: #D0D0D0;
						padding: 0.1rem 0.36rem;
					}
				}
			}
		}
	}
</style>
