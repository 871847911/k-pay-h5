<template>
  <div class="container_box">
    <!-- 课程显示 -->
    <div class="courseInfo flex_one" v-if="courseId">
        <div class="left">
            <img v-lazy="courseInfo.courseUrlFirst" alt="">
        </div>
        <div class="right"><p class="text_hidden">{{courseInfo.courseName}}</p></div>
    </div>

    <div class="top">
        <h3 v-if="!courseId">已选讲师：{{lecture_name}}</h3>
        <group class="textarea group">
            <x-textarea :max="50" placeholder="输入您要提的问题（10-50字）" @on-change="changeEvent" v-model="textValue"></x-textarea>
        </group>
    </div>
    <div class="bottom">
        <x-button type="default" class="btn_style" :disabled="btn_state" @click.native="goNext">下一步</x-button>
    </div>
  </div>
</template>

<script>
import { Group, XTextarea, XButton } from "vux";
import api from "fetch/api";
export default {
  name: "questionTitle",
  components: {
    Group,
    XTextarea,
    XButton
  },
  data() {
    return {
      lecture_name: "",
      lecturerId: "",
      textValue: "",
      btn_state: true,
      courseId: "",
      courseInfo: {}
    };
  },
  methods: {
    getCourse() {
      api.getDetail({ courseId: this.courseId }).then(res => {
        this.courseInfo = res.data.courseMain;
      });
    },
    changeEvent(e) {
      if (e.length > 9) {
        this.btn_state = false;
      } else {
        this.btn_state = true;
      }
    },
    goNext() {
      this.$router.push({
        name: "questionCont",
        query: { lecturerId: this.lecturerId, title: this.textValue,courseId:this.courseId }
      });
    }
  },
  mounted() {
    this.lecture_name = this.$route.query.lecturerName;
    this.lecturerId = this.$route.query.lecturerId;
    this.courseId = this.$route.query.courseId
      ? this.$route.query.courseId
      : null;
    if (this.courseId != null) {
      this.getCourse();
    }
  }
};
</script>

<style scoped lang="less">
.container_box {
  height: 100vh;
  background:#FFFFFF;
  .courseInfo {
    background: #ffffff;
    font-size: 0.24rem;
    padding: 0.32rem;
    .left {
      margin-right: 0.2rem;
      img {
        width: 2.56rem;
        height: 1.6rem;
      }
    }
    .right {
      p {
        line-height: 0.34rem;
        color: #333333;
        margin: 0.06rem 0 0.12rem 0;
      }
    }
  }
  .top {
    padding: 0 0.32rem;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 3rem;
    h3 {
      border: none;
      padding: 0.32rem;
      font-size: 0.3rem;
      margin-top: 0.32rem;
      color: #484848;
      background: rgba(248, 248, 248, 1);
    }
  }
  .bottom {
    padding: 0 0.32rem;
    .weui-btn:after{
      border:none;
    }
    .weui-btn_disabled{
      background:#D4D4D4;
    }
    .btn_style {
      color:#ffffff;
      height: 0.98rem;
      font-size: 0.36rem;
    }
  }
}

// .btn_active {
//   color: #ffffff;
// }

.flex_one {
  display: flex;
}

.text_hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
