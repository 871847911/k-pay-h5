<template>
    <div class="empty outermost">
		<img :src="img" alt="">
		<p>{{ title }}</p>
	</div>
</template>

<script>
    export default {
        name: "empty",
		props: {
			title: [String, Number],
        	img: [String, Number],
		}
    }
</script>

<style scoped lang="less">
	.empty{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		img{
			width: 3rem;
			height: 1.84rem;
			margin-top: -.48rem;
		}
		p{
			margin-top: .48rem;
			color: @main_time_color;
			font-size: .3rem;
			line-height: .48rem;
			height: .48rem;
			width: 100%;
			text-align: center;
		}
	}

</style>
