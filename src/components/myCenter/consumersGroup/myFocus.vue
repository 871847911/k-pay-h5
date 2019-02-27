<template>
	<div class='my_focus'>

		<scroll v-if="focusList.length > 0" :page="pageData.page" :size="pageData.size" :total="pageData.total" @change="pageChange">

			<router-link v-for="(item,index) in focusList" :key="index" :to="{name : 'lecturerDetail' , query:{id : item.id}}">
				<userList :img="item.photoUrl" :name="item.realName" :courseNum="item.courseNum" :courseSaleNum="item.courseSaleNum" :subscribedNum="item.subscribedNum"></userList>
			</router-link>

			<!--<div class="focus_box" v-for="(item , index) in focusList" :key="index" :class="{'new_fans_bg' : item.isNew}">-->
				<!--<div class="left">-->
					<!--<img :src="item.photoUrl" alt="">-->
				<!--</div>-->
				<!--<div class="right">-->
					<!--{{item.realName}}-->
				<!--</div>-->
			<!--</div>-->
		</scroll>
		<empty v-else :title="pageData.notitle" :img="pageData.noimg"></empty>
	</div>
</template>

<script>
	import api from "fetch/api";
	import scroll from 'module/scroll'
	import userList from 'module/userList'
	import empty from 'module/empty'
	export default {
		name: 'my_focus',
		data () {
			return {
				pageData : {
					page : 1,
					size : 10,
					total : null,
					notitle : "暂无关注",
					noimg : require('@/assets/images/noContent/search_result.png')
				},
				focusList : []
			}
		},
		components : {
			scroll,
			userList,
			empty
		},
		created(){
			this.myFansList();
		},
		methods: {
			myFansList(){
				let params = {
					page : this.pageData.page,
					size : this.pageData.size
				}
				api.myFocus(params).then(res => {
					console.log(res);
					this.focusList =[...this.focusList , ...res.data.list] ;
					this.pageData.total = res.data.total;
				})
			},
			pageChange(page){
				console.log(page)
				this.pageData.page = page;
				this.myFansList();
			}
		}
	}
</script>

<style lang="less" scoped>
	.my_focus{
		height: 100%;
		.line{
			height: 0.1rem;
			background : #FAFAFA;
		}

		.new_fans_num{
			padding: 0.28rem;
			margin-top: 0.1rem;
			box-sizing: border-box;
			font-size: 0.3rem;
			background: #fff;
		}
		.focus_box{
			padding: 0.2rem 0.3rem;
			background: #fff;
			display: flex;
			.left{
				img{
					width: 1.28rem;
					height: 1.28rem;
					border-radius: 50%;
				}
			}
			.right{
				flex: 1 ;
				display: flex;
				align-items: center;
				padding-left: 0.3rem;
				color: #333;
				font-size: 0.3rem;
			}
		}
		.new_fans_bg{
			background: #FAFAFA;
		}
	}
</style>
