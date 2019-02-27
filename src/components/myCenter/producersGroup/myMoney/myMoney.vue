    <template>
        <div class='my_money'>
            <div class="head_box" >
				<img class="head_img" src='../../../../assets/images/symbols-bg-jifen.png' alt="">
				<div class="monry_in">
					<div class="today" @click="toIncomeList(1)">
						<p>今日收入(元)<span class="iconfont icon-jiantou"></span></p>
						<p>{{ income.dayAmount || 0 }}</p>
					</div>
					<div class="last">
						<div @click="toIncomeList(2)">
							<p>本月收入(元)<span class="iconfont icon-jiantou"></span></p>
							<p>{{ income.moonAmount || 0 }}</p>
						</div>
						<div @click="toIncomeList(3)">
							<p>累计收入(元)<span class="iconfont icon-jiantou"></span></p>
							<p>{{ income.allAmount || 0 }}</p>
						</div>
					</div>
				</div>
			</div>
            <div class="line_box">
                <div class="left" @click="toIncomeList(4)">
                    <span class="title">已结算</span>
                    <span class="price">{{ income.payAmount || 0 }}元</span>
                </div>
                <div class="right">
                    <i class="iconfont icon-jiantou"></i>
                </div>
            </div>
            <div class="line_box">
                <div class="left" @click="toIncomeList(5)">
                    <span class="title">待结算</span>
                    <span class="price">{{ income.waitAmount || 0 }}元</span>
                </div>
                <div class="right">
                    <i class="iconfont icon-jiantou"></i>
                </div>
            </div>
        </div>
    </template>

    <script>
		import api from "fetch/api";
		import scroll from 'module/scroll'
    export default {
        name: 'my_money',
        data () {
            return {
				income: {}
            }
        },
		created() {
        	this.getUserIncomeSummary()
		},
        methods: {
			getUserIncomeSummary() {
				api.getUserIncomeSummary().then(res => {
					if(res.success) {
						this.income = res.data
					}
				})
			},
			toIncomeList(e) {
				this.$router.push({path: '/incomeList', query: {type: e}})
			}
        }
    }
    </script>

    <style lang="less" scoped>
    .my_money{
        padding: 0.3rem;
        box-sizing: border-box;
        .head_box{
            width: 100%;
            height: 3.4rem;
            border-radius: 8px;
            padding: 0.4rem;
            box-sizing: border-box;
            position: relative;
			font-family: PingFangSC-Medium;
			.head_img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
				/*z-index: 5;*/
            }
			.monry_in{
				display: flex;
				flex-direction: column;
				position: relative;
				.today{
					p:nth-of-type(1) {
						height: .4rem;
						margin-bottom: .02rem;
						color: @main_content_color;
					}
					p:nth-of-type(2) {
						height: .84rem;
						line-height: .84rem;
						font-weight: 900;
						font-size: .6rem;
						color: rgba(0,0,0,0.7);
					}
				}
				.last{
					display: flex;
					width: 100%;
					margin-top: .4rem;
					div{
						flex: 1;
						p:nth-of-type(1){
							height: .4rem;
							margin-bottom: .02rem;
							color: @main_content_color;
						}
						p:nth-of-type(2){
							height: .5rem;
							line-height: .5rem;
							font-size: .36rem;
							margin-bottom: .02rem;
							color: rgba(0,0,0,0.7);
						}
					}
				}
			}
        }
        .line_box{
            display: flex;
            padding: 0.38rem;
            border-bottom: 2px solid #f1f1f1;
            .left{
                flex: 1;
                display: flex;
                flex-direction: column;
                .title{
                    color: #666;
                    font-size: 0.28rem;
                }
                .price{
                    margin-top: 0.1rem;
                    color: #484848;
                    font-size: 0.32rem;
                }
            }
            .right{
                display: flex;
                align-items: center;
            }
        }
    }
    </style>
