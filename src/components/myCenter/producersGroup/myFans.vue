<template>
    <div class='my_fans'>
        <scroll :page="pageData.page" :size="pageData.size" :total="pageData.total" @chang="pageChange">
            <div class="line"></div>
            <div class="new_fans_num">
                共有{{pageData.total}}个粉丝
            </div>
            <div class="fans_box" v-for="(item , index) in fansList" :key="index" :class="{'new_fans_bg' : item.isNew}">
                <div class="left">
                    <img :src="item.headUrl" alt="">
                </div>
                <div class="right">
                    {{item.nickName}}
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import api from "fetch/api";
import scroll from '../../module/scroll'
export default {
    name: 'my_fans',
    data () {
        return {
            pageData : {
                page : 1,
                size : 10,
                total : null
            },
            fansList : []
        }
    },
    components : {
        scroll
    },
    created(){
        this.myFansList();
    },
    methods: {
        myFansList(){
            let params = {
                page : this.pageData.page,
                size : this.pageData.size
            }
            api.myFansList(params).then(res => {
                console.log(res);
                this.fansList = res.data.list;
                this.pageData.total = res.data.total;
            })
        },
        pageChange(page){
            this.pageData = page;
            this.myFansList();
        }
    }
}
</script>

<style lang="less" scoped>
.my_fans{
    height: 100%;
    .line{
        height: 0.1rem;
        background : #FAFAFA;
    }

    .new_fans_num{
        padding: 0.28rem;
        margin-top: 0.1rem;
        box-sizing: border-box;
        font-size: 0.3rem;
        background: #fff;
    }
    .fans_box{
        padding: 0.2rem 0.3rem;
        background: #fff;
        display: flex;
        .left{
            img{
                width: 1.28rem;
                height: 1.28rem;
                border-radius: 50%;
            }
        }
        .right{
            flex: 1 ;
            display: flex;
            align-items: center;
            padding-left: 0.3rem;
            color: #333;
            font-size: 0.3rem;
        }
    }
    .new_fans_bg{
        background: #FAFAFA;
    }
}
</style>
