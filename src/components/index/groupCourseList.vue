<template>
    <div class="group_course_list outermost">
		<scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange" v-if="groupCourseList.length>0">
			<groupCourse v-for="(item,index) in groupCourseList" :key="index" @click.native="toCourseDetailsGroup(item)" :id="item.courseMain.id" :img="item.courseMain.courseUrlFirst" :title="item.courseMain.courseName" :num="item.courseMain.buyNumber" :price="item.price" :type="item.courseMain.subType"></groupCourse>
		</scroll>
		<empty :title="notitle" :img="noimg" v-else></empty>
	</div>
</template>

<script>
	import api from "fetch/api";
	import groupCourse from './module/groupCourse'
	import scroll from 'module/scroll'
	import empty from 'module/empty'

    export default {
        name: "groupCourseList",
		data() {
        	return {
				pageNum: 1,
				pageSize: 10,
				groupCourseList: [],
				pageTotal: null,
				notitle : "暂无拼课~快去逛逛吧！",
				noimg : require('@/assets/images/noContent/grouppurchase@2x.png')
			}
		},
		created() {
			this.groupList()
		},
		methods: {
			groupList() {
				let params = {
					// storeId: this.userInfo.storeId,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
				api.groupList(params).then(res => {
					console.log('拼课列表', res)
					if(res.success) {
						this.groupCourseList = [...this.groupCourseList,...res.data.list]
						this.pageTotal = res.data.total
					}
				})
			},
			toCourseDetailsGroup(item) {
				this.$router.push({path: '/courseDetailsGroup', query: {id: item.courseId}})
			},
			pageChange(page) {
				this.pageNum = page;
				this.groupList()
			}
		},
		components: {
			groupCourse,
			scroll,
			empty
		},
		computed: {
        	userInfo() {
        		if(this.$store.state.userInfo) {
					return this.$store.state.userInfo
				}
			}
		}
    }
</script>

<style scoped lang="less">

</style>
