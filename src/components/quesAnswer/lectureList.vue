<template>
  <div class="container_box">
    <scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange">
      <!-- 讲师列表页面 -->
      <div class="lecture_box">
        <div
          class="item"
          v-for="(item,index) in lectureArr"
          :key="index"
          @click="goDetail(item.id,item.realName)"
        >
          <div class="image">
            <img v-lazy="item.photoUrl" alt>
          </div>
          <div class="content">
            <div class="lecture_name">{{item.realName}}</div>
            <div class="total_num">
              <p>课程：{{item.courseNum}}</p>
              <p>购买：{{item.courseSaleNum}}</p>
              <p>订阅：{{item.subscribedNum}}</p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import api from "fetch/api";
import scroll from "module/scroll";
export default {
  name: "lectureList",
  data() {
    return {
      lectureArr: [],
      pageNum: 1,
      pageSize: 5,
      pageTotal: null
    };
  },
  components: {
    scroll,
  },
  methods: {
    getList() {
      let that = this;
      // console.log(that.pageNum);
      let params = {
        storeId: that.$store.state.userInfo.storeId,
        id: that.$store.state.userInfo.id,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      };
      api.listExceptMe(params).then(res => {
        // console.log(res);
        that.pageTotal = res.data.total;
        if (that.pageNum == 1) {
          that.lectureArr = res.data.list;
        } else {
          that.lectureArr = [...that.lectureArr, ...res.data.list];
        }
      });
    },
    goDetail(id, name) {
      // console.log(id);
      this.$router.push({
        name: "questionTitle",
        query: { lecturerId: id, lecturerName: name }
      });
    },
    pageChange(page) {
      // console.log("加载=>", page);
      this.pageNum = page;
      this.getList();
    }
  },
  created() {
    this.getList();
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.container_box {
  height: 100%;
  background:#FFFFFF;
  .lecture_box {
    padding: 0 0.32rem;
    padding-top: 0.34rem;
    .item {
      display: flex;
      align-items: center;
      padding-bottom: 0.48rem;
      // border:1px solid red;
      .image {
        margin-right: 0.32rem;
        min-width: 1.6rem;
        height: 2.08rem;
        img {
          width: 1.6rem;
          height: 2.08rem;
        }
      }
      .content {
        height: 2.08rem;
        width: 100%;
        .lecture_name {
          height: 0.48rem;
          line-height: 0.48rem;
          color: #484848;
          font-size: 0.3rem;
        }
        .total_num {
          padding-top: 1.27rem;
          display: flex;
          justify-content: space-between;
          p {
            height: 0.34rem;
            color: #666666;
            font-size: 0.24rem;
          }
        }
      }
    }
  }
}
</style>
