<template>
    <div class='my_class'>
        <div class="line"></div>
        <ul class="list_ul">
            <li @click="linkToAudit">
                <div class="text_box">我的审核课程</div>
                <div class="arrow"><i class="iconfont icon-jiantou"></i></div>
            </li>
        </ul>
        <div class="line"></div>
        <scroll :page="lodingMoreData.page" :size="lodingMoreData.size" :total="lodingMoreData.total"  @change="pageChange">
            <div v-for="(item,index) in classList" :key="index">
                <classList :id="item.catalogId" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price"></classList> 
            </div>
        </scroll>
    </div>
</template>

<script>
import classList from 'module/classList'
import api from "fetch/api";
import scroll from 'module/scroll'

export default {
    name: 'my_class',
    data () {
        return {
            classList :[] ,
            lodingMoreData : {
                page : 1,
                size : 10,
                total : null
            }
            
        }
    },
    components : {
        classList,
        scroll
    },
    created(){
        this.pagePublish();
    },
    methods: {
        linkToAudit(){
            this.$router.push({
                name : 'myCourseAudit'
            })
        },
        // 获取已发布课程
        pagePublish(){
            let params = {
                page : this.lodingMoreData.page,
                size : this.lodingMoreData.size
            }
            api.pagePublish(params).then(res => {
                this.classList =[...this.classList , ...res.data.list] ;
                this.lodingMoreData.total = res.data.total;
            })
        },
        pageChange(page){
            this.lodingMoreData.page = page;
            this.pagePublish();
        }
    }
}
</script>

<style lang="less" scoped>
.my_class{
    .line{
        width: 100%;
        height: 0.1rem;
        background: #fafafa;
    }
    .list_ul{
            margin-bottom: 0.1rem;
            background: #fff;
            li{
                padding: 0 0.38rem;
                overflow: hidden;
                display: flex;
                // .img_box{
                //     width:0.5rem;
                //     height : 0.5rem;
                //     margin-right: 0.2rem;
                //     padding : 0.27rem 0;
                //     img{
                //         width: 100%;
                //         height : 100%;
                //     }
                // }
                .text_box{
                    flex: 1;
                    line-height: 0.5rem;
                    font-size: 0.3rem;
                    padding : 0.27rem 0;
                }
                .arrow{
                    line-height: 0.5rem;
                    padding : 0.27rem 0;
                    border-bottom: 1px solid #f1f1f1;
                }
            }
            li:not(:last-child){
                
                .text_box{
                    border-bottom: 1px solid #f1f1f1;
                }   
            }
        }
}
     
</style>
