<template>
    <div class='integral'>
        <div class='container'>
            <div class='integral_all'>
                <!-- <image class='allImage' src='../../images/symbols-bg-jifen.png'></image> -->
                <img class="allImage" src="../../../assets/images/menber/symbols-bg-jifen.png" alt="">
                <div class='integral_tip'>
                    <router-link :to="{name : 'integralDetails'}">积分说明</router-link>
                </div>
                <div class='integral_num'>{{jifen.availableScore}}</div>
                <div class='integral_now'>当前积分</div>
            </div>
        </div>
        <tab custom-bar-width="20px">
            <tab-item selected @on-item-click="onItemClick">全部</tab-item>
            <tab-item @on-item-click="onItemClick">获取</tab-item>
            <tab-item @on-item-click="onItemClick">支出</tab-item>
        </tab>
        <div class='tip'>
            您共获得{{jifen.totalScore}}积分，消费使用{{jifen.consumeScore }}积分，累计为您节省
            <div class='save' style='color:red'>￥{{jifen.saveMoney }}</div>
        </div>
        <div class='mid'>
            <div class='integra_item' v-for="(item,index) in list">
                <div class='name_time'>
                    <div class='name'>{{item.remark}}</div>
                    <div class='time'>{{item.createDate}}</div>
                </div>
                <div class='integral_add' v-if="item.type ==1||item.type ==3">+{{item.scoreChange}}</div>
                <div class='integral_add' v-else>-{{item.scoreChange}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "fetch/api";
import { Tab, TabItem } from "vux";
export default {
    name: "integral",
    data() {
        return {
            showItem: 0,
            jifen: 0,
            list: []
        };
    },
    components: {
        Tab,
        TabItem
    },
    created() {
        this.getUserScoreInfo();
    },
    methods: {
        getUserScoreInfo() {
            let params = {};
            api.getUserScoreInfo(params).then(res => {
                console.log("当前积分", res);
                if (res.success == true) {
                    this.jifen = res.data;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
            let paramss = {
                page: 1,
                size: 1000
            };
            api.pageRecordSerch(paramss).then(res => {
                console.log("积分记录", res);
                if (res.success == true) {
                    this.list = res.data.list;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
        },
        onItemClick(index) {
            this.showItem = index;
            if (index == 0) {
                let paramss = {
                    page: 1,
                    size: 1000
                };
                api.pageRecordSerch(paramss).then(res => {
                    console.log("积分记录", res);
                    if (res.success == true) {
                        this.list = res.data.list;
                    } else {
                        this.$vux.toast.text(res.message);
                    }
                });
            } else if (index == 1) {
                let paramss = {
                    page: 1,
                    size: 1000,
                    type: 1
                };
                api.pageRecordSerch(paramss).then(res => {
                    console.log("积分记录", res);
                    if (res.success == true) {
                        this.list = res.data.list;
                    } else {
                        this.$vux.toast.text(res.message);
                    }
                });
            } else if (index == 2) {
                let paramss = {
                    page: 1,
                    size: 1000,
                    type: 2
                };
                api.pageRecordSerch(paramss).then(res => {
                    console.log("积分记录", res);
                    if (res.success == true) {
                        this.list = res.data.list;
                    } else {
                        this.$vux.toast.text(res.message);
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.container {
    background: #fff;
    /* width: 100%; */
    padding-top: 0.32rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
}
.integral_all {
    position: relative;
    height: 2.4rem;
    /* width: 100%; */
    border-radius: 0.08rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.88rem;
    padding-bottom: 0.4rem;
}
.allImage {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.4rem;
}
.integral_tip {
    position: absolute;
    right: 0.28rem;
    top: 0.28rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
}
.integral_num {
    text-align: center;
    /* width: 2rem;
    position: absolute; */
    height: 1rem;
    /* left: 2.29rem; */
    font-size: 0.6rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(72, 72, 72, 1);
}
.integral_now {
    /* width: 1.6rem; */
    margin-top: 0.2rem;
    /* margin-left: 0.2rem; */
    text-align: center;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
}
.tab {
    padding-top: 0.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 0.3rem;
    color: rgba(153, 153, 153, 1);
}
.tabcss {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tab_item {
    padding-bottom: 0.24rem;
}
.line {
    width: 0.48rem;
    height: 0.04rem;
    background: #6cddc7;
    border-radius: 0.04rem;
}
.green {
    color: #6cddc7;
}
.mid {
    background: #fff;
    /* width: 100%; */
    padding-left: 0.3rem;
    padding-right: 0.3rem;
}
.tip {
    padding-top: 0.32rem;
    padding-bottom: 0.32rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.24rem;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    background: #f8f8f8;
}
.integra_item {
    padding-top: 0.28rem;
    padding-bottom: 0.24rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(72, 72, 72, 1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 0.01rem solid #f1f1f1;
}
.time {
    margin-top: 0.16rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
}
.integral_add {
    margin-top: 0.08rem;
}
.vux-tab .vux-tab-item.vux-tab-selected {
}
</style>
