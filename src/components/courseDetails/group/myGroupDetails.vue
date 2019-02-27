<template>
    <div class="content">
        <div class="contentMan">
            <div class="group-state">{{groupInfo.state != 0 ?'已散团' : parseInt(groupInfo.addNum-groupInfo.participateNum) == 0 ?'已成团':'拼课中，差'+ parseInt(groupInfo.addNum-groupInfo.participateNum) +'人'}}</div>
            <!-- 课程信息区域 -->
            <div class="course-info flex" v-if="groupInfo.courseName"> 
                <img v-lazy="groupInfo.courseImg">
                <div class="course-infoBox">
                    <div class="title">{{groupInfo.courseName.length > 38? groupInfo.courseName.slice(0,38) + '...' : groupInfo.courseName}}</div>
                    <!-- <div class="origin-price">￥{{groupInfo.coursePrice}}</div> -->
                    <div class="group-price">
                        <span class="moneyColor">拼</span>
                        <p><span>¥</span>{{groupInfo.groupPrice}}</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="contentMan contentMan2">
            <div class="order-area">
                <div class="box flex bod">
                    <div>订单编号</div>
                    <div>
                        {{groupInfo.groupOrder}}
                        <span class="copy tag-read" :data-clipboard-text="groupInfo.groupOrder" @click="copyOrder">复制</span>
                    </div>
                </div>
                <div class="box flex bod">
                    <div>下单时间</div>
                    <div v-if="groupInfo">{{deleteDate(groupInfo.modifyDate)}}</div>
                </div>
                <div class="box flex">
                    <div>实际付款</div>
                    <div class="payTotal">￥{{groupInfo.price}}</div>
                </div>
            </div>
        </div>
        <div class="contentMan contentMan2" v-if="groupInfo.state != 0">
            <div class="order-area">
                <div v-if="groupInfo.state != 0">
                    <div class="box flex">
                        <div>散团原因</div>
                        <div>{{groupInfo.reason}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentMan contentMan2">
            <div class="order-area">
                <div v-if="groupInfo.state == 0">
                    <div class="box flex bod">
                        <div>支付方式</div>
                        <div>微信支付</div>
                    </div>
                    <div class="box flex">
                        <div>支付时间</div>
                        <div v-if="groupInfo">{{deleteDate(groupInfo.modifyDate)}}</div>
                    </div>
                </div>
                <div v-else>
                    <!-- 1退款中 2已退款 -->
                    <div class="box flex bod">
                        <div>退款时间</div>
                        <div>{{groupInfo.state == 1?'退款中，请等待商家处理':'已退款'}}</div>
                    </div>
                    <div class="box flex">
                        <div>退款金额</div>
                        <div class="payTotal">￥{{groupInfo.groupPrice}}</div>
                    </div>
                    <!-- <div class="cash-state">{{groupInfo.state == 1?'退款中':'已退款'}}</div> -->
                </div>
            </div>
        </div>
        <!-- 按钮区域 -->
        <div class="contentMan btn-area flex">
            <button @click="deleteGroupOrder" class="btn-normal" v-if="groupInfo.state == 0 && parseInt(groupInfo.addNum-groupInfo.participateNum) > 0? false:true">
                删除
            </button>
            <button @click="goIndex" class="btn-normal2" v-if="groupInfo.state == 0 && parseInt(groupInfo.addNum-groupInfo.participateNum) > 0? false:true">
                查看课程
            </button>
            <button @click="gogroupShare" class="active-btn" v-if="groupInfo.state == 0 && parseInt(groupInfo.addNum-groupInfo.participateNum) > 0">
                邀请好友拼课
            </button>
        </div>
    </div>
</template>

<script>
import vue from "vue";
import api from "fetch/api";
import Clipboard from "clipboard";
import { ConfirmPlugin } from "vux";
vue.use(ConfirmPlugin);
export default {
    name: "mygroupDetails",
    data() {
        return {
            groupInfo: {}
        };
    },
    created() {
        this.getMyGroupBuyList();
    },
    methods: {
        // 删除后两位
        deleteDate(e){
            // e = e.substring(0, e.length - 2)
            return e
        },
        getMyGroupBuyList() {
            let params = {
                groupId: this.$route.query.collageId
            };
            api.getGroupListDetails(params).then(res => {
                console.log(res);
                if (res.success) {
                    this.groupInfo = res.data
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
        },
        copyOrder() {
            var clipboard = new Clipboard(".tag-read");
            clipboard.on("success", e => {
                console.log("复制成功");
                this.$vux.toast.text("复制成功");
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                // 不支持复制
                this.$vux.toast.text("不支持复制");
                console.log("该浏览器不支持自动复制");
                // 释放内存
                clipboard.destroy();
            });
        },
        deleteGroupOrder() {
            const _this = this;
            this.$vux.confirm.show({
                cancelText: "确定",
                confirmText: "取消",
                content: "确定删除该拼课信息?",
                onCancel(e) {
                console.log("确定");
                _this.$vux.confirm.hide();
                 let params = {
                    groupId: _this.$route.query.collageId
                };
                api.deleteGroupOrder(params).then(res => {
                    console.log(res);
                    if (res.success) {
                        _this.$vux.toast.text("删除成功");
                        setTimeout(() => {
                            _this.$router.push({
                                path: "/myGroup",
                                query: {
                                    // collageId: this.$route.query.collageId
                                }
                            });
                        }, 2000);
                    } else {
                        _this.$vux.toast.text(res.message);
                    }
                });
                },
                onConfirm() {
                    console.log("取消");
                    _this.$vux.confirm.hide();
                }
            });
           
        },
        gogroupShare() {
            //邀请好友
            // let collageId = this.$route.query.collageId
			// window.location.href ="http://" + window.location.host + '/h5-view/groupShare?collageId=' + collageId
            this.$router.push({
                path: "/groupShare",
                query: {
                    collageId: this.$route.query.collageId
                }
            });
        },
        goIndex() {
			this.$router.push({
                name: "courseDetailsGroup",
                query: {
                    id: this.groupInfo.courseId
                }
            });
		}
    }
};
</script>

<style scoped>
.content{
    height: 100vh
}
.contentMan{
    padding: 0 0.3rem;
}
.contentMan2{
    border-top: 0.1rem solid #F4F4F4;
}
.flex {
    display: flex;
    justify-content: space-between;
}

.active-btn {
    background: #6cddc7;
    color: #ffffff;
    border: none;
    width: 100%;
}
.btn-normal {
    background: #ffffff;
    border: 0.02rem solid #6cddc7;
    color: #6cddc7;
    width: 3.28rem;
}
.btn-normal2 {
    background: #6cddc7;
    border: 0.02rem solid #6cddc7;
    color: #ffffff;
    width: 3.28rem;
}
.content {
    color: #666666;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium;
}
/* 团的状态标题 */
.group-state {
    padding: 0.32rem 0 0.32rem 0;
    font-size: 0.48rem;
    color: #484848;
    border-bottom: 1px solid #f1f1f1;
}
/* 课程信息区域 */
.course-info {
    padding-top: 0.24rem;
    padding-bottom: 0.4rem;
    /* border-bottom: 0.02rem solid #f1f1f1; */
    align-items: center;
}
.course-infoBox{
    /* width: 100%; */
    flex: 1;
    height: 1.44rem;
    padding-left: 0.2rem;
    position: relative;
}
.course-info .title {
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    word-break: break-all;
    overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box;
	/* autoprefixer: off */
	-webkit-box-orient:vertical;
	/* autoprefixer: on */
	-webkit-line-clamp:2;
}
.course-info .origin-price {
    color: #999999;
    padding: 0.18rem 0 0.18rem 0;
    text-decoration: line-through;
}
.course-info .group-price {
    color: #484848;
    padding-top: 0.2rem;
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    
}
.course-info .group-price .moneyColor {
  display: inline-block;
    font-size: 0.22rem;
    color: #fff;
    background: #fe8060;
    border-radius: 4px;
    width: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    margin-right: 0.16rem;
}
.course-info .group-price p{
    color: #FE8060;
    display: inline;
    
}
.course-info .group-price p span{
    /* font-size:0.2rem; */
    font-family:PingFangSC-Regular;
    font-weight:400;
}
.course-info .group-price text {
    color: #fe8060;
    font-size: 0.3rem;
    font-weight: 500;
    margin-left: 0.08rem;
}
.course-info img {
    width: 2.56rem;
    height: 1.44rem;
}
/* 订单信息区域 */
/* .order-area {
}
 */
 .order-area .box{
     padding: 0.26rem 0;
     color:rgba(51,51,51,1);
 }
 .order-area .box.bod{
     border-bottom: 1px solid #f1f1f1;
 }
.order-area .box:nth-child(1) .copy {
    width:0.76rem;
    height:0.40rem;
    color: rgba(102,102,102,1);
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(208,208,208,1);
    padding: 0.01rem 0.16rem;
    margin-left: 0.2rem;
}
.order-area .box:nth-child(2n + 1) {
    /* padding-top: 0.38rem; */
}
.order-area .box:nth-child(2n),
.order-area .box:nth-last-child(1) {
    /* border-bottom: 0.02rem solid #f1f1f1; */
}
.order-area .box div {
    /* padding-bottom: 0.36rem; */
}
.order-area .box div:nth-child(2n + 1) {
    font-size:0.28;
    /* font-family:PingFangSC-Regular; */
    font-weight:400;
    color:rgba(102,102,102,1);
}
.order-area .box .payTotal {
    color: #fe8060;
}
.order-area .cash-state {
    color: #fe8060;
    font-size: 0.32rem;
    padding: 0.36rem 0 1.1rem 0;
    border-top: 0.02rem solid #f1f1f1;
}
/* 按钮区域 */
.btn-area {
    margin-top: 1rem;
}
.btn-area button {
    height: 0.80rem;
    line-height: 0.80rem;
    /* width: 3.28rem; */
    /* flex: 1; */
    text-align: center;
    border-radius: 0.08rem;
}
</style>
