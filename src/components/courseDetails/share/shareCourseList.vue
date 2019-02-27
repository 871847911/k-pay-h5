
<template>
    <div class="share_course_list outermost">
		<scroll v-if="courselist.length > 0" :page="pageData.page" :size="pageData.size" :total="pageData.total">
			<div class="course_list_box" v-for="(item,index) in courselist" :key="index" @click="toSharePage(item.id)">
				<div class="box_left">
					<img v-lazy="item.courseUrlFirst" alt="">
				</div>
				<div class="box_right">
					<div class="name">{{item.courseName}}</div>
					<div class="is_share">分享</div>
					<div class="num_box">
						<span class="learn_num">{{item.buyNumber}}人学习</span>
						<span class="price">￥{{item.price}}</span>
					</div>
				</div>
			</div>
		</scroll>
	    <empty v-else :title="pageData.notitle" :img="pageData.noimg"></empty>
    </div>
</template>

<script>
	import scroll from 'module/scroll'
	import api from "fetch/api";
	import empty from 'module/empty'
export default {
    name: 'share_course_list',
    data () {
        return {
			pageData : {
				page : 1,
				size : 10,
				total : null,
				notitle : "暂无分享",
				noimg : require('@/assets/images/noContent/share@2x.png')
			},
			courselist:[]
        }
    },
	components : {
		scroll,
		empty
	},
	created(){
    	this.getCourseList();
	},
    methods: {
		getCourseList(){
			let params = {
				page : this.pageData.page,
				size : this.pageData.size,
				storeId : this.$store.state.userInfo.storeId
			}
			api.getShareCourses(params).then(res => {
				if(res.success){
					this.courselist =[...this.courselist , ...res.data.list] ;
					this.pageData.total = res.data.total;
				}
			})
		},
		toSharePage(id){
			// window.location.href  ="http://" + window.location.host + '/h5-view/shareFreeCourseDetails?courseId=' + id
			this.$router.push({name : "shareFreeCourseDetails" , query: {courseId : id}})
		}

    }
}
</script>

<style lang="less" scoped>
	.share_course_list{
		.course_list_box{
			display: flex;
			padding: 0.32rem;
			box-sizing: border-box;
			.box_left{
				width: 2.56rem;
				height: 1.62rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.box_right{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 0.2rem;
				.name{
					font-style: 0.3rem;
					color: #333;
					font-weight: bold;
					word-break: break-all;
				}
				.is_share{
					font-style: 0.2rem;
					color: #6CDDC7;
				}
				.num_box{
					font-style: 0.2rem;
					display: flex;
					justify-content: space-between;
					.learn_num{
						color: #999;
					}
					.price{
						color: #FE8060;
					}
				}
			}
		}
	}
</style>
