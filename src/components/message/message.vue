<template>
	<div class='message outermost'>
		<!--<scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">-->
		<tab :line-width="3" custom-bar-width="1.12rem" v-model="tabIndex">
			<tab-item @on-item-click="getActiceIndex(index)" v-for="(item, index) in nav" :key="index">{{ item.title }}</tab-item>
		</tab>

		<!--咨询反馈-->
		<!--<scroll v-if="activeIndex == 0 && feedback.length != 0" :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
            <div class="feedback">
                <div class="feedback_list" v-for="(item, index) in feedback" :key="index" @click="toConsult(item)">
                    <img v-lazy="item.courseUrlFirst" alt="">
                    <div class="feedback_content">
                        <div class="title">
                            <p>{{ item.courseName }}</p>
                            <p>{{ item.createDate }}</p>
                        </div>
                        <p class="feedback_cont">{{ item.content }}</p>
                        <div class="point" v-if="showPoint(item)"></div>
                    </div>
                </div>
            </div>
        </scroll>-->
		<!--<empty v-if="activeIndex == 0 && feedback.length == 0" :title="emtypJSON.title" :img="emtypJSON.img"></empty>-->
		<!--系统消息-->
		<scroll v-if="activeIndex == 0 && systemMessage.length != 0" :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
			<div class="system_message">
				<div class="systrm_message_list" v-for="(item, index) in systemMessage" :key="index" @click="toSystemMessage(item)">
					<div class="title">
						<!--<p>{{ item.reason }}</p>-->
						<p v-if="item.type==11||item.type==12">入驻申请审核通知</p>
						<p v-if="item.type==21 || item.type==22">课程审核通知</p>
						<p v-if="item.type==30">课程下架通知</p>
						<p class="agree" v-if=" item.type == 11 || item.type == 21">[通过]</p>
						<p class="disagree" v-if=" item.type == 12 || item.type == 22 ">[拒绝]</p>
						<p>{{ item.createDate }}</p>
					</div>
					<p class="systrm_message_content">{{ item.title }}</p>
					<div class="point" v-if="!item.isRead"></div>
				</div>
			</div>
		</scroll>
		<empty v-if="activeIndex == 0 && systemMessage.length == 0" :title="emtypJSON.title" :img="emtypJSON.img"></empty>
		<!--关注通知-->
		<scroll v-if="activeIndex == 1 && notice.length != 0" :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
			<div class="notice" v-if="">
				<div class="notice_list" v-for="(item, index) in notice" :key="index" @click="toLecturerDetail(item)">
					<img v-lazy="item.photoUrl" alt="">
					<div class="notice_content">
						<div class="title">
							<p>{{ item.lecturerName }}</p>
							<p>{{ item.date }}</p>
						</div>
						<p class="notice_cont">{{ item.message }}</p>
					</div>
				</div>
			</div>
		</scroll>
		<empty v-if="activeIndex == 1 && notice.length == 0" :title="emtypJSON.title" :img="emtypJSON.img"></empty>
		<!--</scroll>-->
	</div>
</template>

<script>
	import api from "fetch/api";
	import { Tab, TabItem } from 'vux'
	import scroll from 'module/scroll'
	import empty from 'module/empty'
	export default {
		components: {
			Tab,
			TabItem,
			scroll,
			empty
		},
		name: 'message',
		data () {
			return {
				nav: [
					/*{
                        title: '咨询反馈',
                        icon: require('../../assets/images/message/advisory.png')
                    },*/
					{
						title: '系统消息',
						icon: require('../../assets/images/message/system.png')
					},
					{
						title: '关注通知',
						icon: require('../../assets/images/message/attention.png')
					}
				],
				emtypJSON: {
					title: '暂无相关消息',
					img: require('@/assets/images/noContent/no_message.png')
				},
				tabIndex: 0,
				pageSize: 10,
				pageNum: 1,
				pageTotal: 1,
				showLoading: false,
				feedback: [],
				systemMessage: [],
				notice: [],
				activeIndex: 0,
			}
		},
		created() {
			this.getActiceIndex(0)
		},
		// activated() {
		// 	this.getActiceIndex(this.activeIndex)
		// },
		computed: {
			info() {
				return this.$store.state.userInfo
			}
		},
		methods: {
			getActiceIndex(index) {
				this.activeIndex = index
				this.feedback = []
				this.systemMessage = []
				this.notice = []
				this.pageNum = 1
				this.pageTotal = 1
				switch(this.activeIndex){
					/*case 0:
                        this.pageConsult()
                        if(this.info.roleId != 3) {
                            this.pageReply()
                        }
                        break;*/
					case 0:
						this.getSystemMessage()
						break;
					case 1:
						this.pageNotice()
						break;
				}
			},
			//咨询我的
			pageReply() {
				let params = { page:this.pageNum, size:this.pageSize }
				api.pageReply(params).then(res => {
					console.log('咨询我的', res)
					if(res.success) {
						this.feedback = [...this.feedback, ...res.data.list]
						if(res.data.total > this.pageTotal) {
							this.pageTotal = res.data.total;
						}
					}
				});
			},
			//咨询反馈
			pageConsult() {
				let params = { page:this.pageNum, size:this.pageSize }
				api.pageConsult(params).then(res => {
					console.log('咨询反馈', res)
					if(res.success) {
						this.feedback = [...this.feedback, ...res.data.list]
						if(res.data.total > this.pageTotal) {
							this.pageTotal = res.data.total;
						}
					}
				});
			},
			//系统消息
			getSystemMessage() {
				let params = { page:this.pageNum, size:this.pageSize }
				console.log(params)
				api.systemMessage(params).then(res => {
					console.log('系统消息', res)
					if(res.success) {
						this.systemMessage = [...this.systemMessage, ...res.data.list]
						this.pageTotal = res.data.total;
					}
				});
			},
			//关注通知
			pageNotice() {
				let params = { page:this.pageNum, size:this.pageSize }
				api.pageNotice(params).then(res => {
					console.log('关注通知', res)
					if(res.success) {
						this.notice = [...this.notice, ...res.data.list]
						this.pageTotal = res.data.total;
					}
				});
			},
			debug() {
				let params = { storeId:80, userId:2 }
				api.debug(params).then(res => {
					console.log('debug', res)
					/*if(res.success == true) {
                        this.menuFirst = res.datapageNoticedebug
                    }*/
				});
			},
			showPoint(item) {
				if(this.info.id == item.lecturerId && item.isLecturerRead == false) {
					return true
				}else if(this.info.id != item.lecturerId && item.isStudentRead == false){
					return true
				}
			},
			toSystemMessage(item) {
				this.$router.push({ path: '/systemMessage', query: { id: item.id }})
			},
			toConsult(item) {
				this.$router.push({ path: '/consult', query: { consultId: item.id, courseId: item.courseId }})
			},
			toLecturerDetail(item) {
				this.$router.push({ path: '/lecturerDetail', query: { id: item.lecturerId }})
			},
			pageChange(page){
				console.log(page)
				this.pageNum = page;
				switch(this.activeIndex){
					case 0:
						// this.pageConsult()
						this.getSystemMessage()
						break;
					case 1:
						// this.getSystemMessage()
						this.pageNotice()
						break;
					/*default:
                        this.pageNotice()
                        break;*/
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.message{
		display: flex;
		flex-direction: column;
		background: rgba(244,244,244,1);
		position: relative;
		.vux-tab-wrap{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 99999;
			border-bottom: .02rem solid rgba(229,229,229,1);
		}
		.vux-tab-item{
			background: 0;
			font-size: .28rem;
		}
		empty{
			flex: 1;
		}
		.vux-tab-wrap{
			img{
				width: .6rem;
				height: .6rem;
				margin: .2rem 0 0 .9rem;
			}
			p{
				font-size: .28rem;
				height: .34rem;
				line-height: .34rem;
				margin-top: .18rem;
			}
		}
		//咨询反馈
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
		//系统消息
		.system_message{
			padding-top: .88rem;
			background: #fff;
			.systrm_message_list{
				padding: .32rem;
				border-bottom: .1rem solid rgba(241,241,241,1);
				position: relative;
				.title{
					display: flex;
					height: .28rem;
					line-height: .28rem;
					p:nth-of-type(1) {
						color: @main_title_color;
						font-size: .28rem;
						/*white-space: nowrap;*/
						overflow: hidden;
						/*text-overflow: ellipsis;*/
						margin-right: .1rem;
					}
					p:nth-last-of-type(1) {
						flex: 1;
						font-size: .24rem;
						text-align: right;
						color: @main_time_color
					}
					.agree{
						width: .96rem;
						font-size: .24rem;
						color: rgba(108,221,199,1);
						text-align: center;
					}
					.disagree{
						width: .96rem;
						font-size: .24rem;
						color: rgba(241,44,32,1);
						text-align: center;
					}
				}
				.systrm_message_content{
					color: rgba(153,153,153,1);
					margin-top: .24rem;
					font-size: .24rem;
					height: .68rem;
					line-height: .34rem;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
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
		//关注通知
		.notice{
			padding-top: .88rem;
			background: #fff;
			.notice_list{
				padding: .32rem;
				border-bottom: .01rem solid rgba(241,241,241,1);
				display: flex;
				img{
					width: .96rem;
					height: .96rem;
					border-radius: 50%;
					margin-right: .32rem;
				}
				.notice_content{
					flex: 1;
					.title{
						display: flex;
						height: .28rem;
						line-height: .28rem;
						font-size: .28rem;
						color: @main_title_color;
						p:nth-of-type(1) {
							flex: 1;
							overflow: hidden;
							width: 1.75rem;
							font-weight: 900;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						p:nth-of-type(2) {
							font-size: .24rem;
							color: @main_time_color;
						}
					}
					.notice_cont{
						height: .34rem;
						color: @main_time_color;
						font-size: .24rem;
						margin-top: .12rem;
					}
				}
			}
		}
	}
</style>
