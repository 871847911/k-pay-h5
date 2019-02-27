<template>
	<div class="my_consult outermost">
		<scroll v-if="feedback.length!=0" :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
			<div class="feedback">
				<div class="feedback_list" v-for="(item, index) in feedback" :key="index" @click="toConsult(item)">
					<img v-lazy="item.courseUrlFirst" alt="">
					<div class="feedback_content">
						<div class="title">
							<p>{{ item.courseName }}</p>
							<p>{{ item.createDate }}</p>
						</div>
						<p class="feedback_cont">{{ item.content }}</p>
						<div class="point" v-if="!item.isStudentRead"></div>
					</div>
				</div>
			</div>
		</scroll>
		<empty v-else :title="emtypJSON.title" :img="emtypJSON.img"></empty>
	</div>
</template>

<script>
	import api from "fetch/api";
	import scroll from 'module/scroll'
	import empty from 'module/empty'
    export default {
        name: "myCousult",
		data() {
        	return {
				emtypJSON: {
					title: '暂无相关消息',
					img: require('@/assets/images/noContent/no_message.png')
				},
				pageNum: 1,
				pageSize: 10,
				pageTotal: null,
				feedback: []
			}
		},
		created() {
			this.pageConsult()
		},
		methods: {
			pageConsult() {
				let params = { page:this.pageNum, size:this.pageSize }
				api.pageConsult(params).then(res => {
					console.log('咨询反馈', res)
					if(res.success) {
						this.feedback = [...this.feedback, ...res.data.list]
						this.pageTotal = res.data.total;
					}
				});
			},
			pageChange(page) {
				this.pageNum = page
				this.pageConsult()
			},
			toConsult(item) {
				this.$router.push({ path: '/consult', query: { consultId: item.id, courseId: item.courseId }})
			}
		},
		components: {
			scroll,
			empty
		}
    }
</script>

<style scoped lang="less">
	.my_consult{
		.feedback{
			.feedback_list{
				padding: .32rem;
				border-bottom: .01rem solid rgba(241,241,241,1);
				display: flex;
				position: relative;
				img{
					width: 1.28rem;
					height: 1.28rem;
					margin-right: .32rem;
				}
				.feedback_content{
					flex: 1;
					.title{
						display: flex;
						p{
							line-height: .45rem;
							height: .45rem;
							white-space: nowrap;
							&:nth-of-type(1){
								font-size: .3rem;
								color: rgba(51,51,51,1);
								width: 3.36rem;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							&:nth-of-type(2){
								font-size: .24rem;
								color: rgba(153,153,153,1);
							}
						}
					}
					.feedback_cont{
						color: rgba(153,153,153,1);
						margin-top: .15rem;
						height: .68rem;
						line-height: .34rem;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
				.point{
					width: .2rem;
					height: .2rem;
					border-radius: 50%;
					background: rgba(241,44,32,1);
					position: absolute;
					right: .3rem;
					top: .95rem;
				}
			}
		}
	}
</style>
