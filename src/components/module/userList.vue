
<template>
    <div class="user_list">
		<div class="user_img">
			<img v-lazy="img" alt="">
		</div>
		<div class="user_info">
			<div class="name">
				{{name}}
			</div>
			<div class="info">
				<div class="info_left">课程:{{courseNum}}</div>
				<div class="info_center">购买:{{courseSaleNum}}</div>
				<div class="info_right">关注:{{subscribedNum}}</div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    name: 'user_list',
	props : {
    	img : String,
		name : String,
		courseNum : [String , Number],
		courseSaleNum : [String , Number],
		subscribedNum : [String , Number]

	},
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.user_list{
	display: flex;
	padding: 0.33rem 0.28rem;
	box-sizing: border-box;
	.user_img{
		width: 1.6rem;
		height: 2rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.user_info{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 0.32rem;
		.name{
			font-size: 0.3rem;
		}
		.info{
			display: flex;
			font-size: 0.22rem;
			.info_left{
				flex: 1;
				text-align: left;
			}
			.info_center{
				flex: 1;
				text-align: center;
			}
			.info_right{
				flex: 1;
				text-align: right;
			}
		}
	}
}
</style>
