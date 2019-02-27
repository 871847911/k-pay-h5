<template>
	<div class='scroller' ref="scroll">
		<div class="scroll_slot" ref="scrollSlot">
			<slot></slot>
		</div>

		<div class="load_box" ref="loadBox">
            <load-more :show-loading="show" :tip="loadTip" :background-color="bgColor"></load-more>
        </div>
	</div>
</template>

<script>
import { LoadMore } from 'vux'
export default {
	name: 'scroller',
	props : {
		tip : {
			type : [String ,Number]
		},
		errTip : {
			type : [String ,Number]
		},
		page : {
			type : Number,
			required : true,
			default: 1
		},
		size : {
			type : Number,
			required : true,
			default: 10
		},
		total : {
			type : Number
		},
		bgColor : {
			type : String,
			default: '#fbf9fe'
		},
		showLoading : {
			type : Boolean,
			default: false
		},
		ready : {
			type : Boolean,
			default: true
		}
	},
	data () {
		return {
			show : false
		}
	},
	created(){
		this.show = this.showLoading
	},
	updated(){
		this.show = this.showLoading
	},
	watch : {
		// page(){
		// 	this.scrollChange();
		// },
		// total(){
		// 	this.scrollChange();
		// },
		// ready(){
		//
		// }
	},
	computed : {
		loadTip(){
			if(this.show){
				if(this.tip){
					return this.tip;
				}else{
					return '正在加载'
				}
			}else{
				if(this.total <= this.page*this.size){
					return '没有更多数据了'
				}else{
					if(this.errTip){
						return this.errTip
					}else{
						return '上拉加载更多'
					}
				}

			}
		}
	},
	components : {
		LoadMore
	},
	mounted(){
		// this.$refs.scroll.addEventListener('scroll',this.scrollChange);
		window.addEventListener('scroll',this.scrollChange);
		console.log(document.body.clientHeight)
	},
	methods: {
		getScrollTop(){
			var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
			if(document.body){
				bodyScrollTop = document.body.scrollTop;
			}
			if(document.documentElement){
				documentScrollTop = document.documentElement.scrollTop;
			}
			scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
			return scrollTop;
		},
		getBodyHeight(){
			var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			if(document.body){
				bodyScrollHeight = document.body.scrollHeight;
			}
			if(document.documentElement){
				documentScrollHeight = document.documentElement.scrollHeight;
			}
			scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
			return scrollHeight;
		},
		getEyeHeight(){
			var windowHeight = 0;
			if(document.compatMode == "CSS1Compat"){
				windowHeight = document.documentElement.clientHeight;
			}else{
				windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		},
		scrollChange(){
			// console.log(document.body.scrollHeight)
			// console.log(document.documentElement.scrollTop)
			// console.log(document.documentElement.clientHeight+document.documentElement.scrollTop)
			// let loadBoxHeight = this.$refs.loadBox.clientHeight;
			// let scrollHeight = this.$refs.scroll.clientHeight;
			// let scrollTop = this.$refs.scroll.scrollTop;
			// let scrollSlotHeight = this.$refs.scrollSlot.clientHeight;
			// let num = scrollTop + scrollHeight - loadBoxHeight - scrollSlotHeight;
			//可视区高度
			let eyeHeight = this.getEyeHeight();
			//滚动条高度
			let scrollHeight = this.getScrollTop();
			//总高度
			let bodyHeight = this.getBodyHeight();
			if(bodyHeight == eyeHeight + scrollHeight){
				window.removeEventListener('scroll',this.scrollChange);
				if(this.total <= this.page*this.size){
					this.show = false;
					setTimeout(() => {
						window.addEventListener('scroll',this.scrollChange);
					},500)
				}else{
					this.show = true;
					this.$emit('change' , this.page+1)
					setTimeout(() => {
						window.addEventListener('scroll',this.scrollChange);
					},500)

				}
			}

		}
	}
}
</script>

<style scoped>
	.scroller{
		overflow: auto;
		overflow-scrolling: touch;
	}
	.load_box{
		overflow: hidden;
	}
</style>
