<template>
  <div class="container_box">
    <scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange"  v-if="myArr.length > 0">
      <!-- 列表数据 -->
      <div class="data_list">
        <!-- 需求显示已答复的问题 -->
        <div class="list_item" v-for="(item,index) in myArr" :key="index" @click="goDetail(index)">
          <h5>{{item.title}}</h5>
          <div class="flex_box">
            <div class="title_name">{{item.lecturerName}}</div>
            <div>回复：{{item.createDate}}</div>
            <div
              :style="{color:item.questionStatus==0?'#FE8060':'#6CDDC7'}"
            >{{item.questionStatus==0?'待解决':'已答复'}}</div>
          </div>
        </div>
      </div>
    </scroll>

    <!-- 无数据展示效果 -->
    <empty v-else :title="emtypJSON.title" :img="emtypJSON.img"></empty>

    <div class="add_lecture" @click="choiceLecture">
      <img src="../../assets/images/quesanswer/add_question@2x.png" alt>
    </div>
  </div>
</template>

<script>
import { Group, XInput, Tab, TabItem } from "vux";
import api from "fetch/api";
import { mapState } from "vuex";
import scroll from "module/scroll";
import empty from "module/empty";
export default {
  name: "searchResult",
  data() {
    return {
      state: 0,
      myArr: [],
      tabIndex: 0,
      pageSize: 10,
      pageNum: 1,
      pageTotal: null,
      emtypJSON: {
        title: "暂无相关问题",
        img: require("@/assets/images/noContent/no_question.png")
      },
    };
  },
  computed: {
    ...mapState(["token", "userInfo"])
  },
  components: { Group, XInput, Tab, TabItem, scroll,empty },
  methods: {
    goDetail(index) {
      this.$router.push({
        name: "quesAnswerDetail",
        query: { id: this.myArr[index].id }
      });
    },

    myQuestionWX() {
      // 我的提问请求
      let params = {
        storeId: this.userInfo.storeId,
        questionerId: this.userInfo.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      api.myQuestionWX(params).then(res => {
        this.pageTotal = res.data.total;
        if(this.pageNum == 1){
          this.myArr = res.data.list
        }else{
          this.myArr = [...this.myArr, ...res.data.list];
        }
      });
    },
    choiceLecture() {
      this.$router.push({ name: "lectureList" });
    },
    pageChange(page) {
      this.pageNum = page;
      this.myQuestionWX();
    }
  },
  mounted() {
    this.myQuestionWX();
  }
};
</script>

<style scoped lang="less">
.container_box {
  height: 100vh;
  background:#FFFFFF;
  color: #999999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // margin-top:0.3rem;
  .data_list {
    
    padding:0.3rem 0.32rem 0.5rem;
    .list_item {
      padding: 0.32rem;
      background: #f8f8f8;
      margin-bottom: 0.32rem;
      h5 {
        word-wrap: break-word;
        font-weight: normal;
        color: #484848;
        font-size: 0.3rem;
        padding-bottom: 0.32rem;
      }
      .flex_box {
        display: flex;
        justify-content: space-between;
        .title_name {
          max-width: 1.6rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .tip {
    text-align: center;
    width: 100%;
    margin-top: 5.5rem;
  }
  empty{
    flex:1;
  }
  .add_lecture {
    height: 0.8rem;
    position: fixed;
    left: 0;
    bottom: 0.4rem;
    width: 100%;
    text-align: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>