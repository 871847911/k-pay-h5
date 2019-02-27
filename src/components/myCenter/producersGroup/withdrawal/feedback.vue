<template>
	<div class="feedback outermost">
		<img src="../../../../assets/images/courseDeails/feedback.png" alt="">
		<p>提现申请已提交</p>
		<button @click="toCenter">返回个人中心</button>
	</div>
</template>

<script>
    export default {
        name: "feedback",
		data(){
        	return {

			}
		},
		methods:{
			toCenter() {
				this.$router.push({path: '/producersCenterCenter'})
			}
		}
    }
</script>

<style scoped lang="less">
	.feedback{
		display: flex;
		flex-direction: column;
		align-items: center;
		img{
			width: 3rem;
			height: 1.8rem;
			margin-top: 1rem;
		}
		p{
			height: .42rem;
			color: @main_time_color;
			font-size: .3rem;
			margin: .52rem 0 1.4rem;
		}
		button{
			font-size: .36rem;
			font-weight: 900;
			background: @active-color;
			width: 6.88rem;
			height: .98rem;
			line-height: .98rem;
		}
	}
</style>
