<template>
  <div class="container_box">
    <!-- 滚动区域 -->
    <scroll
      :page="pageNum"
      :size="pageSize"
      :total="pageTotal"
      @change="pageChange"
      v-if="myArr.length > 0"
    >
      <!-- 搜索栏 -->
      <div class="search_input group">
        <group>
          <x-input placeholder="请输入问题" @on-focus="goSearch()">
            <i slot="label" class="iconfont icon-sousuo"></i>
          </x-input>
        </group>
      </div>

      <!-- tabs栏 切换 -->
      <div class="tabs question">
        <tab custom-bar-width=".4rem" v-model.number="tabIndex">
          <tab-item
            @on-item-click="onItemClick(index)"
            v-for="(item, index) in tabFocus"
            :key="index"
          >
            <img v-lazy="item.icon" alt>
            <p>{{ item.title }}</p>
          </tab-item>
        </tab>
      </div>

      <!-- 列表数据 -->
      <div class="data_list">
        <div class="list_item" v-for="(item,index) in myArr" :key="index" @click="goDetail(index)">
          <h5>{{item.title}}</h5>
          <div class="flex_box">
            <div
              class="title_name"
            >{{item.anonymity == 1?"匿名用户":userInfo.roleId == 2?item.questionerName:item.lecturerName}}</div>
            <div
              v-if="item.questionStatus==1"
            >回复：{{userInfo.roleId==2?item.createDate:item.answerTime}}</div>
            <div
              :style="{color:item.questionStatus==0?'#FE8060':'#6CDDC7'}"
            >{{item.questionStatus==0?'待解决':'已答复'}}</div>
          </div>
        </div>
      </div>
    </scroll>

    <div class="box_style" v-if="myArr.length == 0">
      <!-- 搜索栏 -->
      <div class="search_input group z_index">
        <group>
          <x-input placeholder="请输入问题" @on-focus="goSearch()">
            <i slot="label" class="iconfont icon-sousuo"></i>
          </x-input>
        </group>
      </div>

      <!-- tabs栏 切换 -->
      <div class="tabs question z_index">
        <tab custom-bar-width=".4rem" v-model.number="tabIndex">
          <tab-item
            @on-item-click="onItemClick(index)"
            v-for="(item, index) in tabFocus"
            :key="index"
          >
            <img v-lazy="item.icon" alt>
            <p>{{ item.title }}</p>
          </tab-item>
        </tab>
      </div>

      <!-- 无数据展示效果 -->
      <empty :title="emtypJSON.title" :img="emtypJSON.img" class="position_style"></empty>
    </div>

    <div class="add_lecture" @click="choiceLecture" v-if="userInfo.roleId != 2 && tabIndex == 0">
      <img src="../../assets/images/quesanswer/add_question@2x.png" alt>
    </div>

    <div class="add_lecture" @click="goMyQuestion" v-if="userInfo.roleId ==2 && tabIndex == 2">
      <img src="../../assets/images/quesanswer/my_question@2x.png" alt>
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
  name: "quesAnswer",
  data() {
    return {
      state: 0,
      tabFocus: [],
      tabCustomer: [
        {
          title: "我的提问",
          icon: require("../../assets/images/quesanswer/myQues@2x.png")
        },
        {
          title: "精选问答",
          icon: require("../../assets/images/quesanswer/selecteQues@2x.png")
        },
        {
          title: "问题市场",
          icon: require("../../assets/images/quesanswer/quesMarket@2x.png")
        }
      ],
      tabProduce: [
        {
          title: "提问我的",
          icon: require("../../assets/images/quesanswer/askMe@2x.png")
        },
        {
          title: "精选问答",
          icon: require("../../assets/images/quesanswer/selecteQues@2x.png")
        },
        {
          title: "问题市场",
          icon: require("../../assets/images/quesanswer/quesMarket@2x.png")
        }
      ],
      myArr: [],
      tabIndex: 0,
      pageSize: 10,
      pageNum: 1,
      pageTotal: null,
      activeIndex: 0,
      emtypJSON: {
        title: "暂无相关问题",
        img: require("@/assets/images/noContent/no_question.png")
      }
    };
  },
  components: { Group, XInput, Tab, TabItem, scroll, empty },
  computed: {
    ...mapState(["userInfo", "token"])
  },
  methods: {
    changeArr() {
      if (this.userInfo.roleId == 2) {
        this.tabFocus = this.tabProduce;
        this.askMeQuestionWX();
      } else {
        this.tabFocus = this.tabCustomer;
        this.myQuestionWX();
      }
    },
    goSearch() {
      this.$router.push({ name: "quesSearchPage" });
    },
    onItemClick(index) {
      this.pageNum = 1;
      this.tabIndex = index;

      switch (index) {
        case 0:
          if (this.userInfo.roleId == 2) {
            this.askMeQuestionWX();
          } else {
            this.myQuestionWX();
          }
          break;
        case 1:
          this.queryStarQuestions();
          break;
        default:
          this.queryQuestionsWX();
          break;
      }
    },
    goDetail(index) {
      // console.log(this.tabIndex);
      this.activeIndex = this.tabIndex;
      this.$router.push({
        name: "quesAnswerDetail",
        query: {
          id: this.myArr[index].id,
          lecturerId: this.myArr[index].lecturerId,
          courseId: this.myArr[index].courseId,
          activeIndex: this.activeIndex
        }
      });
    },
    choiceLecture() {
      this.$router.push({ name: "lectureList" });
    },
    goMyQuestion() {
      this.$router.push({
        name: "myQuestion",
        query: { activeIndex: this.tabIndex }
      });
    },
    myQuestionWX(index) {
      // 我的提问 消费者
      let params = {
        storeId: this.userInfo.storeId,
        questionerId: this.userInfo.id, //提问者id
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      api.myQuestionWX(params).then(res => {
        this.pageTotal = res.data.total;
        if (this.pageNum == 1) {
          this.myArr = res.data.list;
        } else {
          this.myArr = [...this.myArr, ...res.data.list];
        }
      });
    },

    askMeQuestionWX() {
      // 提问我的 生产者
      let params = {
        storeId: this.userInfo.storeId,
        lecturerId: this.userInfo.id, //讲师ID
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      api.askMeQuestionWX(params).then(res => {
        this.pageTotal = res.data.total;
        if (this.pageNum == 1) {
          this.myArr = res.data.list;
        } else {
          this.myArr = [...this.myArr, ...res.data.list];
        }
      });
    },
    queryStarQuestions() {
      // 精选问答请求
      let params = {
        storeId: this.userInfo.storeId,
        // questionerId: this.userInfo.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      api.queryStarQuestions(params).then(res => {
        // 后台没有返回total
        // this.pageTotal = 10
        // if(this.pageNum == 1){
        this.myArr = res.data;
        // }else{
        //   this.myArr = [...this.myArr,...res.data]
        // }
      });
    },
    queryQuestionsWX() {
      // 问答市场请求
      let params = {
        storeId: this.userInfo.storeId,
        // questionerId: this.userInfo.id,
        title: "",
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      api.queryQuestionsWX(params).then(res => {
        // this.myArr = res.data.list
        this.pageTotal = res.data.total;
        if (this.pageNum == 1) {
          this.myArr = res.data.list;
        } else {
          this.myArr = [...this.myArr, ...res.data.list];
        }
      });
    },
    pageChange(page) {
      // console.log(page);
      this.pageNum = page;
      switch (this.tabIndex) {
        case 0:
          if (this.userInfo.roleId == 2) {
            this.askMeQuestionWX();
          } else {
            this.myQuestionWX();
          }
          break;
        case 1:
          this.queryStarQuestions();
          break;
        case 2:
          this.queryQuestionsWX();
          break;
      }
    }
  },
  created() {
    this.changeArr();
  },
  mounted() {
    // console.log(this.userInfo);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(from)
      if (from.query.activeIndex) {
        vm.tabIndex = parseInt(from.query.activeIndex);
        switch (vm.tabIndex) {
          case 0:
            if (vm.userInfo.roleId == 2) {
              vm.askMeQuestionWX();
            } else {
              vm.myQuestionWX();
            }
            break;
          case 1:
            vm.queryStarQuestions();
            break;
          case 2:
            vm.queryQuestionsWX();
            break;
        }
      }
    });
  }
};
</script>
  
  <style scoped lang="less">
.container_box {
  background:#FFFFFF;
  height: 100vh;
  color: #999999;
  display: flex;
  flex-direction: column;
  .search_input {
    padding: 0.32rem;
    i {
      font-size: 0.3rem;
      padding: 0.2rem;
    }
    .weui-cell {
      font-size: 0.3rem;
      background: #f1f1f1;
      padding: 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .tabs {
    margin-bottom: 0.48rem;

    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-top: 0.18rem;
    }
    p {
      height: 0.36rem;
      line-height: 0.1rem;
    }
  }
  .data_list {
    overflow: hidden;
    height: 100%;
    padding: 0 0.32rem;
    .list_item {
      padding: 0.32rem;
      background: #f8f8f8;
      margin-bottom: 0.32rem;
      h5 {
        font-weight: normal;
        color: #484848;
        font-size: 0.3rem;
        padding-bottom: 0.32rem;
        word-wrap: break-word;
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

  .add_lecture {
    z-index: 1000;
    height: 0.8rem;
    position: fixed;
    bottom: 1.32rem;
    width: 100%;
    text-align: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  .box_style {
    display: flex;
    flex-direction: column;
    background:#FFFFFF;
    height: 100%;
    .z_index{
      z-index: 1000;
    }
    .position_style{
      position:absolute;
      top:0;
      z-index: 500;
    }
    empty {
      flex: 1;
    }
  }
}
</style>