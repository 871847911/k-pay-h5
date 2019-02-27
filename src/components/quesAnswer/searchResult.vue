<template>
  <div class="container_box">
    <scroll
      :page="pageNum"
      :size="pageSize"
      :total="pageTotal"
      @change="pageChange"
      v-if="myArr.length > 0"
    >
      <!-- 列表数据 -->
      <div class="data_list">
        <!-- 需求显示已答复的问题 -->
        <div class="list_item" v-for="(item,index) in myArr" :key="index" @click="goDetail(index)">
          <h5>{{item.title}}</h5>
          <div class="flex_box">
            <div>{{item.lecturerName}}</div>
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
      value: "",
      state: 0,
      myArr: [],
      tabIndex: 0,
      pageSize: 10,
      pageNum: 1,
      pageTotal: null,
      emtypJSON: {
        title: "暂无相关问题",
        img: require("@/assets/images/noContent/no_question.png")
      }
    };
  },
  components: { Group, XInput, Tab, TabItem, scroll, empty },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goDetail(index) {
      this.$router.push({
        name: "quesAnswerDetail",
        query: { id: this.myArr[index].id }
      });
    },
    queryQuestionsWX(title) {
      // 问题市场搜索相关条件问题
      let params = {
        storeId: this.userInfo.storeId,
        title: title,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      api.queryQuestionsWX(params).then(res => {
        this.pageTotal = res.data.total;
        if (this.pageNum == 1) {
          this.myArr = res.data.list;
        } else {
          this.myArr = [...this.myArr, ...res.data.list];
        }
      });
    },
    pageChange(page) {
      this.pageNum = page;
      this.queryQuestionsWX();
    }
  },
  mounted() {
    this.queryQuestionsWX(this.$route.query.title);
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
  .data_list {
    overflow: hidden;
    margin-top: 0.32rem;
    padding: 0 0.32rem 0.5rem;
    .list_item {
      padding: 0.32rem;
      background: #f8f8f8;
      margin-bottom: 0.32rem;
      h5 {
        font-weight: normal;
        color: #484848;
        font-size: 0.3rem;
        padding-bottom: 0.32rem;
      }
      .flex_box {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .tip {
    text-align: center;
    width: 100%;
    margin-top: 5.5rem;
  }
}
</style>
