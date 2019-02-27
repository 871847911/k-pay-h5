<template>
    <div class='page'>
        <div class='taskDetail'>
            <div class='description'>
                <div class='description_title'>任务说明</div>
                <div class='description_content'>成长值是店铺用户通过完成新手任务、日常任务后获得的数值，对 应数值影响用户等级。</div>
            </div>
            <div class='tasks_title'>
                日常任务
            </div>
            <div class='tasks_tap'>
                <div class='tasks_name'>
                    任务名称
                </div>
                <div class='getPoints'>获得积分</div>
                <div class='todyFinsh'>今日完成</div>
            </div>
            <div class='tasks' v-for="(item,key) in list.dailyList">
                <div class='tasks_content'>{{item.name}}</div>
                <div class='points'>{{item.score}}</div>
                <img class="ifFinsh" v-if="item.isCompleted" src="../../../assets/images/menber/symbols-gouxuan.png" alt="">
                <div class='kong' v-else></div>
            </div>
            <div class='tasks_title'>
                新手任务
            </div>
            <div class='tasks_tap'>
                <div class='tasks_name'>
                    任务名称
                </div>
                <div class='getPoints'>获得积分</div>
                <div class='todyFinsh'>完成情况</div>
            </div>
             <div class='tasks' v-for="(item,key) in list.newbieList">
                <div class='tasks_content'>{{item.name}}</div>
                <div class='points'>{{item.score}}</div>
                <img class="ifFinsh" v-if="item.isCompleted" src="../../../assets/images/menber/symbols-gouxuan.png" alt="">
                <div class='kong' v-else></div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "fetch/api";
export default {
    name: "taskDetail",
    data() {
        return {
            list:""
        };
    },
    created() {
        this.listTask();
    },
    methods: {
        listTask(){
            let params = {};
            api.listTask(params).then(res => {
                console.log("任务", res);
                if (res.success == true) {
                    this.list = res.data;
                } else {
                    this.$vux.toast.text(res.message);
                }
            });
        },
    }
};
</script>

<style scoped>
/* pages/integralCenter/integralCenter.wxss */
.page {
    background: #f8f8f8;
}
.description {
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background: #fff;
}
.description_title {
    padding-top: 0.28rem;
    padding-bottom: 0.2rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 0.01rem solid #f1f1f1;
}
.description_content {
    padding-top: 0.28rem;
    padding-bottom: 0.32rem;
    font-size: 0.24rem;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
}
.tasks_title {
    margin-top: 0.2rem;
    padding-left: 0.3rem;
    padding-top: 0.28rem;
    padding-bottom: 0.2rem;
    background: #fff;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}
.tasks_tap {
    padding: 0.2rem 0.3rem 0.2rem 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.tasks {
    padding: 0.2rem 0.7rem 0.2rem 0.3rem;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.24rem;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
}
.tasks_content {
    width: 1.44rem;
}
.points {
    margin-right: 0.7rem;
}
.ifFinsh {
    height: 0.32rem;
    width: 0.32rem;
}
.kong {
    height: 0.32rem;
    width: 0.32rem;
    background: #fff;
}
</style>
