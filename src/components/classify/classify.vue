<template>
	<div class='classify outermost'>
		<ul class="menu_first">
			<li :class="firstActiveIndex == index ? 'active_menu_first' : ''" v-for="(item, index) in menuFirst" :key="index"
			 @click="getSecondMenu(item, index)">{{ item.name }}</li>
		</ul>
		<ul class="menu_second">
			<li :class="secondActiveIndex == index ? 'active_menu_second' : ''" @click="toCourseLIst(index)" v-for="(item, index) in menuSceond"
			 :key="index">{{ item.name }}</li>
		</ul>
	</div>
</template>

<script>
	import api from "fetch/api";
	export default {
		name: 'classify',
		data() {
			return {
				menuFirst: [],
				menuSceond: [],
				firstActiveIndex: 0,
				secondActiveIndex: -1
			}
		},
		created() {
			this.getFirstMenu()
		},
		methods: {
			getFirstMenu() {
				let params = {
					type: 1
				}
				api.listCatalog(params).then(res => {
					console.log(res)
					if (res.success == true) {
						this.menuFirst = res.data
						this.getSecondMenu(res.data[0], 0)
					}
				});
			},
			getSecondMenu(menu, index) {
				this.firstActiveIndex = index
				let params = {
					parentId: menu.id,
					type: 3
				}
				api.listCatalog(params).then(res => {
					console.log(res)
					if (res.success == true) {
						this.menuSceond = res.data
						this.menuSceond.unshift({
							name: '全部',
							id: null
						})
					}
				});
			},
			toCourseLIst(index) {
				this.secondActiveIndex = index
				console.log(this.menuFirst[this.firstActiveIndex].id, this.menuSceond[this.secondActiveIndex].id)
				this.$router.push({
					path: '/courseList',
					query: {
						first: this.menuFirst[this.firstActiveIndex].id,
						second: this.menuSceond[this.secondActiveIndex].id,
						name: this.menuSceond[this.secondActiveIndex].name,
						firstIndex: this.firstActiveIndex,
						secondIndex: this.secondActiveIndex
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.classify {
		display: flex;

		.menu_first {
			width: 2.04rem;
			display: flex;
			flex-direction: column;
			background: rgba(248, 248, 248, 1);
			overflow: auto;

			li {
				height: .96rem;
				text-indent: .32rem;
				line-height: .96rem;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.active_menu_first {
				color: @active-color;
				border-left: .04rem solid @active-color;
				background: #fff;
			}
		}

		.menu_second {
			width: 5.44rem;
			display: flex;
			line-height: .96rem;
			flex-wrap: wrap;
			overflow: auto;
			align-content: flex-start;

			li {
				height: .96rem;
				width: 50%;
				text-align: center;
				box-sizing: border-box;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				&:nth-of-type(n) {
					padding: 0 .16rem 0 .32rem;
				}

				&:nth-of-type(2n) {
					padding: 0 .32rem 0 .16rem;
				}
			}

			.active_menu_second {
				color: @active-color;
			}
		}
	}
</style>
