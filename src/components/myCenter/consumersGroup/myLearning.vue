<template>
	<div class='my_leaning'>
		<scroll v-if="classList.length > 0" :page="lodingMoreData.page" :size="lodingMoreData.size" :total="lodingMoreData.total"  @change="pageChange">
			<router-link v-for="(item,index) in classList" :key="index" :to="{name : 'courseDetails',query : {id : item.id}}">
				<classList :id="item.catalogId" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price" :type="item.subType"></classList>
			</router-link>
		</scroll>
		<empty v-else :title="lodingMoreData.notitle" :img="lodingMoreData.noimg"></empty>
	</div>
</template>

<script>
	import classList from 'module/classList'
	import api from "fetch/api";
	import scroll from 'module/scroll'
	import empty from 'module/empty'
	export default {
		name: 'my_leaning',
		data () {
			return {
				classList :[] ,
				lodingMoreData : {
					page : 1,
					size : 10,
					total : null,
					notitle : "暂无学习",
					noimg : require('@/assets/images/noContent/search_result.png')
				}

			}
		},
		components : {
			classList,
			scroll,
			empty
		},
		created(){
			this.pagePublish();
		},
		methods: {
			linkToAudit(){
				this.$router.push({
					name : 'myCourseAudit'
				})
			},
			// 获取我的学习列表
			pagePublish(){
				let params = {
					page : this.lodingMoreData.page,
					size : this.lodingMoreData.size
				}
				api.buyPageCourse(params).then(res => {
					console.log(res);
					this.classList =[...this.classList , ...res.data.list] ;
					this.lodingMoreData.total = res.data.total;
				})
			},
			pageChange(page){
				console.log(page)
				this.lodingMoreData.page = page;
				this.pagePublish();
			}
		}
	}
</script>

<style lang="less" scoped>
	.my_leaning{
		height: 100%;
		.line{
			width: 100%;
			height: 0.1rem;
			background: #fafafa;
		}
		.list_ul{
			margin-bottom: 0.1rem;
			background: #fff;
			li{
				padding: 0 0.38rem;
				overflow: hidden;
				display: flex;
				// .img_box{
				//     width:0.5rem;
				//     height : 0.5rem;
				//     margin-right: 0.2rem;
				//     padding : 0.27rem 0;
				//     img{
				//         width: 100%;
				//         height : 100%;
				//     }
				// }
				.text_box{
					flex: 1;
					line-height: 0.5rem;
					font-size: 0.3rem;
					padding : 0.27rem 0;
				}
				.arrow{
					line-height: 0.5rem;
					padding : 0.27rem 0;
					border-bottom: 1px solid #f1f1f1;
				}
			}
			li:not(:last-child){

				.text_box{
					border-bottom: 1px solid #f1f1f1;
				}
			}
		}
	}

</style>
