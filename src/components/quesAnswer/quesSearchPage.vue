<template>
  <div class="container_box">
      <group class="search_input group">
        <x-input placeholder="请输入问题" @on-enter="enterEvent">
          <i  slot="label" class="iconfont icon-sousuo"></i>
        </x-input>
      </group>

      <div class="history_title flex_box">
        <h5>搜索历史</h5>
        <div @click="clearArr">清除历史</div>
      </div>

      <div class="history_list flex_box">
        <div class="item" v-for="(item,index) in historyArr " :key="index">{{item}}</div>
      </div>
  </div>
</template>

<script>
import { Group, XInput } from "vux";

export default {
  name: "quesSearchPage",
  components: {
    Group,
    XInput
  },
  data() {
    return {
      historyArr:[],
    };
  },
  methods: {
    enterEvent(e){
      this.historyArr.push(e)
      sessionStorage.setItem("history_log",this.historyArr)
      this.$router.push({name:'searchResult',query:{title:e}})
    },
    clearArr(){
      this.historyArr = []
      sessionStorage.removeItem('history_log')
    }
  },
  mounted () {
    if(sessionStorage.getItem("history_log")){
      this.historyArr = sessionStorage.getItem("history_log").split(',')
    }
  }

};
</script>

<style scoped lang="less">
.flex_box{
  display: flex;
  align-items: center;
}

.container_box{
    height: 100vh;
    background:#FFFFFF;
    color: #999999;
    font-size: 0.28rem;
    padding:0.32rem;
  .search_input {
    margin-bottom:0.56rem;
    i{
      font-size:0.3rem;
      padding:0.2rem;
    }
    .weui-cell{
      font-size:0.3rem;
      background:#F1F1F1;
      padding:0.2rem;
      border-radius: 0.4rem;
    }
  }
  .history_title{
    justify-content: space-between;
    padding-bottom:0.48rem;
    h5{
      font-size:0.36rem;
      color:#333333;
    }
  }
  .history_list{
    flex-wrap: wrap;
    .item{
      margin:0 0.48rem 0.34rem 0;
    }
  }
}
</style>