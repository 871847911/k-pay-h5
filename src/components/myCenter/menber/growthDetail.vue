<template>
    <div class='disFlex'>
        <div class='container'>
            <div class='moneay_all'>
                <img class="allImage" src="../../../assets/images/menber/symbols-mignxi-bg.png" alt="">
                <div class='vip_tasks' @click="goTaskDetail">会员任务说明</div>
                <div class='today_money'>
                    <div class='num'>{{vipInfo.grow}}</div>
                    <div class='text'>当前成长值</div>
                </div>
            </div>

        </div>
        <div class='kong'></div>
        <div class='mid'>
            <div class='integra_item' v-for="(item,key) in pecordList.list">
                <div class='name_time'>
                    <div class='name'>{{item.remark}}</div>
                    <div class='time'>{{item.createDate}}</div>
                </div>
                <div class='integral_add'>+{{item.growChange}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "fetch/api";
export default {
    name: "growthDetail",
    data() {
        return {
            vipInfo: "",
            pecordList: []
        };
    },
    created() {
        this.getVipInfo();
    },
    methods: {
        getVipInfo() {
            let params = {};
            api.getVipInfo(params).then(res => {
                console.log("会员信息", res);
                if (res.success == true) {
                    this.vipInfo = res.data;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
            let paramss = {
                page: 1,
                size: 1000
            };
            api.pageRecord(paramss).then(res => {
                console.log("成长值明细", res);
                if (res.success == true) {
                    this.pecordList = res.data;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
        },
        goTaskDetail() {
            this.$router.push({ path: "/taskDetail", query: {} });
        }
    }
};
</script>

<style scoped>
.disFlex {
    /* display: flex; */
    height: 100%;
    background: #f8f8f8;
}
.container {
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    background: #fff;
}
.moneay_all {
    position: relative;
    height: 2.14rem;
    /* width: 100%; */
    border-radius: 0.08rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.88rem;
    padding-bottom: 0.4rem;
}
.today_money {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.6rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    z-index: 2;
}
.vip_tasks {
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    z-index: 2;
}
.allImage {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.4rem;
    z-index: 1;
}
.num {
    width: 2rem;
    text-align: center;
    font-size: 0.6rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(72, 72, 72, 1);
    z-index: 2;
}
.text {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.4rem;
    z-index: 2;
    padding-top: 0.3rem;
}
.vip_tasks {
    font-size: 0.24rem;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
}
.kong {
    height: 0.2rem;
    width: 100%;
    background: #f8f8f8;
}
.mid {
    background: #fff;
    /* width: 100%; */
    padding: 0 0.3rem;
    /* padding: 0.3rem; */
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
.hui {
    height: 6rem;
    width: 100%;
    background: #f8f8f8;
}
</style>
