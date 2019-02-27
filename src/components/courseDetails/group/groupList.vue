<template>
    <div class='groupList'>
        <div class='bigTitle'>拼课中</div>
        <div class='groupListBox' v-for="(item,index) in list" :key="index">
            <div class='courseName'>{{item.courseName}}</div>
            <div class='groupList'>
                <div class='grouprImg'>
                    <img :src='item.userImg'>
                </div>
                <div class='grouprName'>{{item.userNickName}}</div>
                <div class='grouprtime'>
                    <div class='cha'>还差
                        <span>{{item.surplusNum}}</span>人成团</div>
                    <div class='price'>￥{{item.price}}</div>
                </div>
                <div :class="{'grouprBtn' : item.isState==0 , 'ngrouprBtn' : item.isState!=0}" @click='gogroupPin(index,2)'>去参团</div>
            </div>
        </div>

        <div class='bigTitle'>相关拼课</div>
        <div class='groupListBox' v-for="(item,index) in list2" :key="index">
            <div class='courseName'>{{item.courseName}}</div>
            <div class='groupList'>
                <div class='grouprImg'>
                    <img :src='item.userImg'>
                </div>
                <div class='grouprName'>{{item.userNickName}}</div>
                <div class='grouprtime'>
                    <div class='cha'>还差
                        <span>{{item.surplusNum}}</span>人成团</div>
                    <div class='price'>￥{{item.price}}</div>
                </div>
                <div :class="{'grouprBtn' : item.isState==0 , 'ngrouprBtn' : item.isState!=0}" @click='gogroupPin2(index,2)'>去参团</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "fetch/api";
export default {
    name: "groupList",
    data() {
        return {
            list: [],
            list2: []
        };
    },
    created() {
        this.getAppGroupBuyList();
    },
    methods: {
        getAppGroupBuyList() {
            let params = {
                courseId: this.$route.query.courseId,
                page: 1,
                size: 100
            };
            api.getAppGroupBuyList(params).then(res => {
                console.log("拼课中", res);
                if (res.success) {
                    this.list = res.data.list;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
            let paramss = {
                courseId: this.$route.query.courseId,
                storeId: this.$store.state.userInfo.storeId,
                page: 1,
                size: 100
            };
            api.getAppGroupBuyList(paramss).then(res => {
                console.log("相关拼课", res);
                if (res.success) {
                    this.list2 = res.data.list;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
        },
        gogroupPin(e,type) {
            console.log(this.$route.query.courseId)
            if(this.list[e].isState==0){
				this.$router.push({
                    name: "orderPay",
                    query: {
                        courseId: this.$route.query.courseId,
                        type: type,
                        collageId: this.list[e].id
                    }
                });
			}
        },
        gogroupPin2(e,type) {
            if(this.list2[e].isState==0){
				this.$router.push({
                    name: "orderPay",
                    query: {
                        courseId: this.list2[e].courseId,
                        type: type,
                        collageId: this.list2[e].id
                    }
                });
			}
        }
    }
};
</script>

<style scoped>
.bigTitle {
    font-size: 0.36rem;
    font-weight: 400;
    color: rgba(72, 72, 72, 1);
    margin: 0.24rem 0 0.32rem 0;
    padding-left: 0.32rem;
    border-left: 0.04rem solid #00b4b9;
}
.groupListBox {
    padding: 0.16rem 0.32rem;
    border-bottom: 0.01rem #f1f1f1 solid;
}
.groupList {
    /* display: flex;
     */
    overflow: hidden;
}
.grouprBtn {
    width: 1.4rem;
    height: 0.64rem;
    background: rgba(254, 128, 96, 1);
    border-radius: 0.04rem;
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.64rem;
    text-align: center;
    float: right;
}
.groupList .grouprImg {
    width: 0.64rem;
    height: 0.64rem;
    float: left;
}
.groupList .grouprImg img {
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 50%;
}
.groupthisRightIcon {
    float: right;
    padding-right: 0.32rem;
}
.groupthisRightIcon img {
    width: 0.2rem;
    height: 0.2rem;
}
.grouprName {
    line-height: 0.64rem;
    width: 1.64rem;
    padding-left: 0.24rem;
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(72, 72, 72, 1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
}
.grouprtime {
    width: 2.58rem;
    font-size: 0.26rem;
    font-weight: 400;
    text-align: right;
    color: rgba(72, 72, 72, 1);
    float: left;
}
.grouprtime .cha text {
    color: rgba(254, 128, 96, 1);
}
.courseName {
    padding: 0 0.32rem 0.08rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.price {
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(254, 128, 96, 1);
}
.ngrouprBtn {
    width: 1.4rem;
    height: 0.64rem;
    background: rgba(254, 128, 96, 0.5);
    border-radius: 0.04rem;
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.64rem;
    text-align: center;
    float: right;
}
</style>
