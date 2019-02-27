
<template>
    <div class="myShare outermost">
		<scroll v-if="shareList.length > 0" :page="pageData.page" :size="pageData.size" :total="pageData.total" @change="pageChange">
			<div class="share_box" v-for="(item,index) in shareList" :key="index">
				<div class="box-top">
					<div class="left">
						<img v-lazy="item.courseUrlFirst" alt="">
					</div>
					<div class="right">
						<p class="right_top">{{item.courseName}}</p>
						<p class="right_middle">
							<span class="name">{{item.buyNumber}}人学习</span>
							<span class="name_r">{{item.shareNum}}人分享</span>
						</p>
						<p class="right_btm">
							<span class="name">￥{{item.price}}</span>
							<span class="name_r">分享免费读</span>
						</p>
					</div>
				</div>
				<div class="box-btm">
					<button type="button" class="look_course" @click="toCoursePage(item.id,item.isEnable)">查看课程</button>
					<button type="button" class="look_share_step" @click="toShareStepPage(item.id)">分享进度</button>
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
    name: 'myShare',
    data () {
        return {
			pageData : {
				page : 1,
				size : 10,
				total : null,
				notitle : "暂无分享",
				noimg : require('@/assets/images/noContent/share@2x.png')
			},
			shareList : []
        }
    },
	components : {
		scroll,
		empty
	},
	created(){
    	this.getList();
	},
    methods: {
    	getList(){
    		let params = {
    			page : this.pageData.page,
				size : this.pageData.size,
				userId : this.$store.state.userInfo.id
			}
			api.getCourseByOpenId(params).then(res => {
				console.log(res)
				if(res.success){
					this.shareList = [...this.shareList , ...res.data.list];
					this.pageData.total = res.data.total;
				}else{
					this.$vux.toast.text(res.message)
				}
			})
		},
		toCoursePage(courseId ,isEnable){
			if(isEnable == 1){
				//查看分享课程
				this.$router.push({
					name : 'shareFreeCourseDetails',
					query : {
						courseId : courseId
					}
				})
			}else{
				//查看普通课程
				this.$router.push({
					name : 'courseDetails',
					query : {
						id : courseId
					}
				})
			}

		},
		toShareStepPage(courseId){
			//去分享进度页面
			this.$router.push({
				name : 'shareStep',
				query : {
					courseId : courseId
				}
			})
		},
		pageChange(page){
			this.pageData.page = page;
			this.getList();
		}
    }
}
</script>

<style lang="less" scoped>
	.myShare{
		.share_box{
			padding: 0.4rem 0.32rem;
			border-bottom: 1px solid #f1f1f1;
			.box-top{
				display: flex;
				.left{
					width: 2.56rem;
					height: 1.62rem;
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
					.float_right{
						float: right;
					}
					.right_top{
						color: #111;
						font-size: 0.3rem;
						font-weight: bold;
						word-break: break-all;
					}
					.right_middle{
						color: #666;
						font-size: 0.24rem;
						.name_r{
							float: right;
						}
					}
					.right_btm{
						color: #FE8060;
						font-size: 0.28rem;
						.name_r{
							float: right;
							padding:0 0.16rem;
							border-radius: 8px;
							background: #FFF5F3;
						}

					}
				}
			}
			.box-btm{
				margin-top: 0.4rem;
				text-align: right;
				button{
					border: 1px solid #6CDDC7;
					background: #fff;
					color: #6CDDC7;
					font-size: 0.3rem;
					padding: 0.1rem 0.36rem;
					border-radius: 4px;
				}
				button.look_share_step{
					border: 1px solid #6CDDC7;
					background: #6CDDC7;
					color: #fff;
					margin-left: 0.32rem;
				}
			}

		}
	}
</style>
