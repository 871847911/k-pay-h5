<template>
    <div class='my_course_audit'>
        <tab :line-width="1" custom-bar-width="0.6rem" v-model="index" prevent-default @on-before-index-change="switchTabItem">
            <tab-item selected >未通过</tab-item>
            <tab-item >已通过</tab-item>
            <tab-item >未审核</tab-item>
        </tab>
        <scroll :page="pageData.page" :size="pageData.size" :total="pageData.total" @change="pageChange">
            <div v-for="(item,index) in classList" :key="index">
                <classList :id="item.catalogId" :img="item.courseUrlFirst" :title="item.courseName" :num="item.buyNumber" :price="item.price"></classList> 
            </div>
        </scroll>
        
    </div>
    
</template>

<script>
import { Tab, TabItem } from 'vux'
import classList from 'module/classList'
import api from "fetch/api";
import scroll from 'module/scroll'
export default {
    name: 'my_course_audit',
    data () {
        return {
            index : 0,
            classList : [],
            pageData : {
                page : 1,
                size : 10,
                total : null
            }
        }
    },
    components: {
        Tab,
        TabItem,
        classList,
        scroll
    },
    created(){
        this.myAuditCourse();
    },
    methods: {
        myAuditCourse(){
            let params = {
                status : this.index == 0 ? '30' : this.index == 1 ? '31' : '20',
                page : this.pageData.page,
                size : this.pageData.size
            }
            api.myAuditCourse(params).then(res => {
                this.classList = res.data.list;
                this.pageData.total = res.data.size;
            })
        },
        switchTabItem(index){
            this.index = index;
            this.myAuditCourse();
        },
        pageChange(page){
            this.pageData.page = page;
            this.myAuditCourse();
        }
    }
}
</script>

<style scoped>

</style>
