<template>
    <div class="consult outermost">
		<div class="char_box" ref="charBox">
			<div class="consult_time">{{ newDate }}</div>
			<div class="course">
				<img :src="charInfo.course.courseUrlFirst" alt="">
				<div class="courseInfo">
					<p>{{ course.courseName }}</p>
					<p>{{ course.price == 0 ? '免费' : '￥' + course.price	 }}</p>
				</div>
			</div>
			<div class="consult_time consult_24">24小时答疑</div>
			<div class="char_box char_box_reversal">
				<img :src="charInfo.lecturer.headUrl" alt="">
				<p>您好，我是爱学习的大白杨，请问 有什么需要帮助到您呢？（您可以 发送关键词，比如“入驻帮助”、“ 发票”、等，大白杨会尽力帮您解 答）哦~</p>
			</div>
			<div class="char_box" v-for="(item, index) in charInfo.chatList" :key="index" :class="{'' : item.type == 1 , 'char_box_reversal' : item.type != 1}">
				<img v-if="item.type == 1" :src="charInfo.student.headUrl" alt="">
				<img v-else :src="charInfo.lecturer.headUrl" alt="">
				<p>{{ item.content }}</p>
			</div>
		</div>
		<div class="create_char" ref="inputBox">
			<input type="text" v-model="chatValue">
			<img @click="setChat" src="../../assets/images/message/plus+@2x.png" alt="">
		</div>
	</div>
</template>

<script>
	import api from "fetch/api";
    export default {
        name: "consult",
		data() {
        	return {
				charInfo: {},
				course: {},
				newDate: new Date().getHours() + ':' + new Date().getMinutes(),
				chatValue: ''
			}
		},
		created() {
			console.log(this.$route.query)
			this.listChat()
			console.log(new Date())
		},
		updated() {
			this.$refs.charBox.scrollTop = this.$refs.charBox.scrollHeight
		},
		methods: {
			listChat() {
				let params = {}
				if(this.$route.query.consultId != undefined) {
					params.consultId = this.$route.query.consultId
				}
				if(this.$route.query.courseId != undefined) {
					params.courseId = this.$route.query.courseId
				}
				api.listChat(params).then(res => {
					console.log('咨询详情', res)
					if(res.success == true) {
						this.charInfo = res.data
						this.course = res.data.course
					}
				});
			},
			//创建咨询
			createConsult() {
				let	params = {
					courseId: this.$route.query.courseId,
					content: this.chatValue
				}
				api.createConsult(params).then(res => {
					console.log('创建咨询信息', res)
					if(res.success == true) {
						this.initInputValue()
						this.listChat()
					}
				})
			},
			//继续咨询
			createChat() {
				let	params = {
					consultId: this.$route.query.consultId || this.charInfo.consultId,
					content: this.chatValue
				}
				api.createChat(params).then(res => {
					console.log('发送咨询信息', res)
					if(res.success == true) {
						this.initInputValue()
						this.listChat()
					}
				})
			},
			setChat() {
				if(this.chatValue.trim() != ''){
					if(this.$route.query.consultId == undefined || this.charInfo.consultId == null || this.charInfo.consultId == '' ) {
						this.createConsult()
					}else{
						this.createChat()
					}
				}
			},
			initInputValue() {
				this.chatValue = ''
			}
		}
    }
</script>

<style scoped lang="less">
	.consult{
		background: rgba(247,247,247,1);
		overflow: auto;
		display: flex;
		flex-direction: column;
		.char_box{
			flex: 1;
			overflow: auto;
			.consult_time{
				width: .8rem;
				height: .36rem;
				padding: .06rem .2rem;
				border-radius: .23rem;
				background: rgba(215,215,215,1);
				color: #fff;
				text-align: center;
				margin: .32rem auto;
			}
			.consult_24{
				padding: 0.06rem .34rem;
				width: 1.4rem;
				font-size: .26rem;
			}
			.course{
				background: #fff;
				display: flex;
				padding: .32rem;
				img{
					width: 1.28rem;
					height: 1.28rem;
					margin-right: .32rem;
				}
				.courseInfo{
					p:nth-of-type(1){
						width: 5.28rem;
						height: .84rem;
						line-height: .42rem;
						color: @main_title_color;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					p:nth-of-type(2){
						color: @main_price_color;
						margin-top: .1rem;
					}
				}
			}
			.char_box{
				display: flex;
				margin: 0 .32rem;
				img{
					width: .96rem;
					height: .96rem;
					border-radius: 50%;
				}
				p{
					max-width: 4.28rem;
					padding: .21rem .28rem;
					border-radius: .08rem;
					background: #fff;
					color: @main_title_color;
					margin: .12rem 0 .33rem .12rem;
				}
			}
			.char_box_reversal{
				display: flex;
				flex-direction: row-reverse;
				p{
					background: @main_price_color;
					margin: .12rem .12rem .33rem 0;
					color: #fff;
				}
			}
		}
		.create_char{
			width: 100%;
			height: 1.06rem;
			background: #fff;
			display: flex;
			align-items: center;
			input{
				width: 6.16rem;
				height: .78rem;
				margin: .14rem .16rem .14rem .32rem;
				border-radius: .08rem;
				border: .02rem solid #F1F1F1;
				&:focus{
					outline: @active-color auto .02rem
				}
			}
			img{
				width: .56rem;
				height: .56rem;
			}
		}
	}
</style>
