<template>
    <div class="Menber">
        <!-- 黄色背景 -->
        <div class='menber'>
            <div class="vipInfoBox">
                <img class="vipBg" src="../../../assets/images/menber/vipBg.png" alt="">
                <div class="vipheaderBox">
                    <div class="vipInfoContent">
                        <!-- 上面的个人信息 -->
                        <div class="infoTop">
                            <div class="leftDes">
                                <img :src="vipInfo.headUrl" alt="">
                                <div class="name">
                                    <p>{{vipInfo.nickName}}</p>
                                    <p>{{vipInfo.levelName}}</p>
                                </div>
                            </div>
                            <div class="rightBtn">
                                <router-link :to="{name : 'growthDetail'}">成长值明细</router-link>
                            </div>
                        </div>

                        <!-- 上面的进度条 -->
                        <div class="levsBox">
                            <x-progress :percent="percent" :show-cancel="false"></x-progress>
                        </div>
                        <div class="lesName">
                            <p>LV{{vipInfo.level}}</p>
                            <p>LV{{vipInfo.level+1}}</p>
                        </div>
                        <div class="lesTips">当前经验值{{vipInfo.grow}}，还差{{vipInfo.gap}}成长值升为LV{{vipInfo.level+1}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vipClassify">会员特权</div>
        <div class='vipScroll'>
            <div class="vipRights" @click="showZhekou">
                <img class="rightsvip" v-if="tequan" src="../../../assets/images/menber/vip1.png" alt="">
                <img class="rightsvip" v-else src="../../../assets/images/menber/vip2.png" alt="">
                <div class="vipqwBox">
                    <img class="vipzhe" v-if="tequan" src="../../../assets/images/menber/zhe1.png" alt="">
                    <img class="vipzhe" v-else src="../../../assets/images/menber/zhe2.png" alt="">
                    <div class="vipDes" v-if="tequan">尊享折扣特权</div>
                    <div class="vipDes vipDes3" wx:else>尊享折扣特权</div>
                    <div class="vipDes2">查看</div>
                </div>
                
            </div>
            <div class="vipRights">
                <img class="rightsvip" src="../../../assets/images/menber/vip2.png" alt="">
                <div class="vipqwBox">
                    <img class="vipzhe" src="../../../assets/images/menber/nozhe.png" alt="">
                    <div class="vipDes vipDes3">更多特权敬请期待</div>
                </div>
            </div>
        </div>
        <div class="hui"></div>
        <!-- 成长值 -->
        <div class="growUp">
            <div class="growUpTitle">成长值</div>
            <div class="growUpDes">
                成长值是店铺用户通过完成新手任务、日常任务、主线任务后获 得的数值，对应数值影响用户等级。
            </div>
        </div>
        <div class="hui"></div>

        <!-- 等级说明 -->
        <div class="explain">
            <div class="growUpTitle explainTitle">会员等级说明</div>
            <div class="headerBox">
                <p>等级</p>
                <p>会员名称</p>
                <p>所需成长值</p>
            </div>
            <div class="headerList" v-for="(item, key) in vipList">
                <p>{{item.level}}</p>
                <p>{{item.levelName}}</p>
                <p class="text_R">{{item.growMin}}</p>
            </div>
        </div>
        <div>
            <alert v-model="show" title="尊享折扣特权" @on-show="onShow" @on-hide="onHide">
                <div class="vipZhe">
                    <ul>
                        <li v-for="(item, key) in vipZheList" v-if="item.sale">
                            <div>{{item.levelName}}</div>
                            <div>课程<span>{{item.sale}}</span>折</div>
                        </li>
                    </ul>
                </div>
            </alert>
        </div>
    </div>
</template>

<script>
import api from "fetch/api";
import { XProgress, Box, Alert } from "vux";
export default {
    name: "menberCenter",
    data() {
        return {
            vipInfo: "",
            vipList: "",
            vipZheList: "",
            tequan: false,
            percent: 0,
            show: false
        };
    },
    components: {
        XProgress,
        Box,
        Alert
    },
    created() {
        this.getVipInfo();
    },
    methods: {
        //弹窗打开
        showZhekou(){
            this.show = true
        },
        //弹窗打开
        onHide() {
            console.log("on hide");
        },
        //弹窗关闭
        onShow() {
            console.log("on show");
        },
        getVipInfo() {
            //会员信息
            let params = {};
            api.getVipInfo(params).then(res => {
                console.log("会员信息", res);
                if (res.success == true) {
                    this.vipInfo = res.data;
                    this.percent =
                        (1 -
                            Number(res.data.gap) /
                                (Number(res.data.grow) +
                                    Number(res.data.gap))) *
                        100;
                    console.log(this.percent);
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
            //会员等级
            let paramss = {};
            api.listLevel(paramss).then(res => {
                console.log("会员等级", res);
                if (res.success == true) {
                    this.vipList = res.data;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
            //会员特权
            let paramsss = {};
            api.getVipPrivilege(paramsss).then(res => {
                console.log("会员特权", res);
                if (res.success == true) {
                    if (res.data.sale != null) {
                        this.tequan = true;
                    }
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
            //会员折扣
            let paramssss = {};
            api.getStoreVipPrivilege(paramssss).then(res => {
                console.log("会员折扣", res);
                if (res.success == true) {
                    // if (res.data.sale != null) {
                    this.vipZheList = res.data;
                    // }
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
        }
    }
};
</script>

<style lang="less">
.Menber {
    width: 100%;
    overflow: hidden;
}

.menber {
    padding-top: 0.32rem;
}
.vipInfoBox {
    margin: 0.32rem 0.32rem;
    height: 3.98rem;
    position: relative;
}
.vipInfoContent {
    padding: 0 0.3rem;
    display: flex;
    flex-direction: column;
}
.vipheaderBox {
    width: 6.88rem;
    height: 3.98rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}
.vipBg {
    position: absolute;
    width: 6.88rem;
    height: 3.98rem;
    z-index: 1;
}
.infoTop {
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    height: 0.92rem;
    justify-content: space-between;
}
.leftDes {
    width: calc(100% - 1.52rem);
    display: flex;
}
.leftDes img {
    width: 0.92rem;
    height: 0.92rem;
    border-radius: 50%;
    margin-right: 0.18rem;
}
.leftDes .name {
    width: calc(100% - 1.2rem);
    height: 0.92rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: #fff;
}
.name text:nth-child(1) {
    font-size: 0.34rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.name text:nth-child(2) {
    font-size: 0.24rem;
}
.rightBtn {
    width: 1.52rem;
    height: 0.56rem;
    border-radius: 0.3rem;
    border: 0.02rem solid rgba(255, 255, 255, 1);
    color: #fff;
    font-size: 0.22rem;
    line-height: 0.56rem;
    text-align: center;
}
/* 进度条 */
.levsBox {
    margin-top: 0.76rem;
    position: relative;
}
.levs {
    border-radius: 0.4rem;
}
.levNum {
    display: inline-block;
    padding: 0.04rem 0.1rem;
    color: #865c22;
    background-color: #fbe7c1;
    font-size: 0.2rem;
    bottom: 0.14rem;
    position: absolute;
    border-radius: 0.08rem;
}
.lesName {
    color: #fff;
    font-size: 0.24rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.2rem;
}
.lesTips {
    color: #865c22;
    font-size: 0.24rem;
    margin-top: 0.44rem;
}
/* 会员特权 */
.vipClassify {
    padding: 0 0.3rem 0 0.32rem;
    color: #484848;
    font-size: 0.3rem;
    margin-top: 0.4rem;
}
.vipScroll {
    width: 100%;
    white-space: nowrap;
    margin-top: 0.28rem;
    font-size: 0;
    margin-bottom: 0.4rem;
    // display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
}
.vipRights {
    display: inline-table;
    width: 3.88rem;
    height: 2.44rem;
    position: relative;
    // margin-right: 0.2rem;
    vertical-align: top;
    overflow: hidden;
    margin-right: 0.2rem;
}
.vipRights .rightsvip {
    width: 3.88rem;
    height: 2.44rem;
    position: absolute;
    z-index: 1;
}
.vipScroll .vipRights:first-child {
    margin-left: 0.32rem;
}
.vipzhe {
    width: 0.72rem;
    height: 0.62rem;
    display: block;
    margin: 0.3rem auto 0.36rem auto;
    z-index: 2;
}
.vipDes {
    text-align: center;
    color: #865c22;
    font-size: 0.32rem;
}
.vipDes2 {
    text-align: center;
    color:#9B9B9B;
    font-size: 0.12rem;
    margin-top: 0.22rem;
}
.vipDes3 {
    color: #9b9b9b;
}
.hui {
    width: 100%;
    height: 0.1rem;
    background-color: #f8f8f8;
}
/* 成长值 */
.growUp {
    padding: 0 0.3rem 0.32rem 0.32rem;
}
.growUpTitle {
    color: #333;
    font-size: 0.3rem;
    margin-top: 0.4rem;
}
.growUpDes {
    color: #666666;
    font-size: 0.24rem;
    margin-top: 0.5rem;
    text-align: justify;
    line-height: 0.34rem;
}
.explainTitle {
    padding: 0 0.3rem 0 0.3rem;
}
.explain {
    padding-bottom: 0.8rem;
}
.headerBox {
    background-color: #f8f8f8;
    height: 0.76rem;
    margin-top: 0.2rem;
    padding: 0 0.3rem 0 0.32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.26rem;
    color: #666666;
}
.headerList {
    padding: 0 0.3rem 0 0.32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.28rem;
    color: #666666;
    font-size: 0.24rem;
    p {
        width: 30%;
    }
    .text_R {
        text-align: right;
    }
}
.headerBox text:nth-child(1) {
    width: 30%;
}
.headerBox text:nth-child(2) {
    width: 36.6%;
    text-align: center;
}
.headerBox text:nth-child(3) {
    width: 33.3%;
    text-align: right;
}
.headerList text:nth-child(1) {
    width: 30%;
}
.headerList text:nth-child(2) {
    width: 36.6%;
    text-align: center;
}
.headerList text:nth-child(3) {
    width: 33.3%;
    text-align: right;
}
.vipqwBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}
.weui-progress__bar {
    background-color: #d8b77d !important;
}
.weui-progress__inner-bar {
    background-color: #fbe7c1 !important;
}
.weui-dialog__btn_primary {
    color: #6cddc7 !important;
}
.vipZhe {
    ul {
        li {
            display: flex;
            justify-content: space-between;
            padding: 0.28rem 0;
            border-bottom: 0.01rem solid #F8F8F8;
            div{
                font-size: 0.3rem;
                color: #6A6A6A;
                span{
                    color: #FCD289;
                }
            }
        }
    }
}
</style>
