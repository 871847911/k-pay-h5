<template>
  <div class="container_box" :class="text_state?'padding_bot':''">
    <!-- 共有 内容 图片 展开按钮 -->
    <!-- 提问者样式 -->
    <div class="questionArea" v-if="!text_state">
      <!-- 课程显示 -->
      <div class="courseInfo flex_one" v-if="courseId">
        <div class="left">
          <img v-lazy="courseInfo.courseUrlFirst" alt>
        </div>
        <div class="right">
          <p class="text_hidden">{{courseInfo.courseName}}</p>
        </div>
      </div>

      <h2>{{questionArr.title}}</h2>
      <h4>
        <span>{{questionArr.anonymity==0?questionArr.questionerName:'匿名用户'}}</span>
        <span>{{questionArr.createDate}}</span>
      </h4>
      <p :class="ques_state?'':'text_hidden'">{{questionArr.questionDesc}}</p>
      <div
        class="img_box"
        v-if="ques_state && questionImg[index].picUrl != ''"
        v-for="(item,index) in questionImg"
        :key="index"
      >
        <img v-lazy="item.picUrl" alt>
      </div>
      <div class="btn_box">
        <span @click="quesEvent">
          {{ques_state?'收起':'展开'}}
          <i
            class="iconfont"
            :class="ques_state?'icon-jiantoushang':'icon-jiantouxia'"
          ></i>
        </span>
      </div>
    </div>
    <!-- <div class="empty_tag"></div> -->
    <!-- 消费者进入看到问题详情的两种情况 -->
    <div class="answerArea" v-if="userInfo.id != lecturerId">
      <!-- 讲师头像名字点赞 -->
      <div class="flex_one">
        <div class="lecture_img">
          <img v-lazy="questionArr.lecturerHead" alt>
        </div>
        <div class="flex_two">
          <div>
            <h3>{{questionArr.lecturerName}}</h3>
            <h4 v-if="questionArr.questionStatus == 1">{{questionArr.answerTime}}</h4>
          </div>
          <div class="addStart" v-if="questionArr.questionStatus == 1">
            <span @click="addStar">
              <i class="iconfont icon-dianzan" :class="start_state?'active':''"></i>
              {{questionArr.starNum}}
            </span>
          </div>
        </div>
      </div>
      <p
        v-if="questionArr.questionStatus == 1"
        :class="answer_state?'':'text_hidden'"
      >{{questionArr.answerText}}</p>
      <div
        class="img_box"
        v-if="answer_state && answerImg[index].picUrl != ''"
        v-for="(item,index) in answerImg"
        :key="index"
      >
        <img v-lazy="item.picUrl" alt>
      </div>
      <div class="btn_box" v-if="questionArr.questionStatus == 1">
        <span @click="answerEvent">
          {{answer_state?'收起':'展开'}}
          <i
            class="iconfont"
            :class="answer_state?'icon-jiantoushang':'icon-jiantouxia'"
          ></i>
        </span>
      </div>
      <div class="waiting" v-if="questionArr.questionStatus == 0">等待讲师解答</div>
    </div>

    <!-- 讲师进入自己的问题 看到问题详情的二种情况 -->
    <div class="answerArea" v-else>
      <div v-if="questionArr.questionStatus == 1">
        <div class="flex_one">
          <div class="lecture_img">
            <img v-lazy="questionArr.lecturerHead" alt>
          </div>
          <div class="flex_two">
            <div>
              <h3>{{questionArr.lecturerName}}</h3>
              <h4 v-if="questionArr.questionStatus == 1">{{questionArr.answerTime}}</h4>
            </div>
            <div class="addStart">
              <!-- <span>{{questionArr.starNum}}</span> -->
              <span @click="addStar">
                <i class="iconfont icon-dianzan" :class="start_state?'active':''"></i>
                {{questionArr.starNum}}
              </span>
            </div>
          </div>
        </div>
        <p :class="answer_state?'':'text_hidden'">{{questionArr.answerText}}</p>
        <div
          class="img_box"
          v-if="answer_state && answerImg[index].picUrl != ''"
          v-for="(item,index) in answerImg"
          :key="index"
        >
          <img v-lazy="item.picUrl" alt>
        </div>
        <div class="btn_box">
          <span @click="answerEvent">
            {{answer_state?'收起':'展开'}}
            <i
              class="iconfont"
              :class="answer_state?'icon-jiantoushang':'icon-jiantouxia'"
            ></i>
          </span>
        </div>
      </div>

      <div class="lectureAnswerArea" v-else>
        <div class="icon_area" v-if="text_state">
          <i class="iconfont icon-caozuo-quanping-shousuo" @click="icon_event"></i>
        </div>
        <group class="group cont_top">
          <x-textarea
            v-model="answer_text"
            placeholder="讲师在这里答复问题"
            @on-focus="focus_event"
            @on-change="text_event"
            :autosize="true"
            :max="1000"
            :show-counter="false"
          ></x-textarea>
        </group>

        <div class="cont_img_box" v-if="text_state">
          <p>最多可添加3张图片,每张大小不超过2MB;建议尺寸338px*180px</p>
          <div class="upload_area">
            <div class="img_item" v-for="(item,index) in imgAnswerArr" :key="index">
              <img v-lazy="item" alt>
              <div class="delect_x" @click="delectImg(index)">
                <img src="../../assets/images/quesanswer/delete@2x.png" alt>
              </div>
            </div>
          </div>
        </div>

        <div class="box">
          <div id="multipleImg">
            <img src="../../assets/images/quesanswer/camera@2x.png" alt>
          </div>
          <x-button
            type="default"
            class="btn_style"
            @click.native="confirm_alert"
            :disabled="btn_state"
            :class="btn_state?'':'btn_active'"
          >提交</x-button>
        </div>
      </div>
    </div>

    <div class="zzc" v-if="zzc_state"></div>
  </div>
</template>

<script>
import api from "fetch/api";
import vue from "vue";
import { setTimeout } from "timers";
import { mapState } from "vuex";
import {
  Group,
  XTextarea,
  XSwitch,
  XButton,
  Confirm,
  ConfirmPlugin
} from "vux";
vue.use(ConfirmPlugin);
import { initQiniu } from "../../assets/js/qiniu-api.js";
export default {
  name: "quesAnswerDetail",
  data() {
    return {
      msg: "",
      ques_state: false,
      answer_state: false,
      start_state: "",
      questionArr: [],
      questionImg: [],
      answerImg: [],
      lecturerId: "",
      answer_text: "",
      text_state: false,
      imgAnswerArr: [],
      switch_state: false,
      btn_state: true,
      picUrls: [],
      questionId: "",
      zzc_state: false,
      courseInfo: {},
      courseId: null
    };
  },
  components: {
    Group,
    XTextarea,
    XSwitch,
    XButton,
    Confirm
  },
  computed: {
    ...mapState(["token", "userInfo", "uploadImageHead"])
  },
  methods: {
    getUploadToken() {
      let that = this;
      initQiniu(
        "multipleImg",
        2,
        "image/jpeg,image/jpg,image/png",
        (file, info) => {
          if (that.imgAnswerArr.length == 3) {
            this.$vux.toast.text("只能上传三张图片");
            return;
          }
          let newInfo = JSON.parse(info);
          that.imgAnswerArr.push(that.uploadImageHead + "/" + newInfo.key);
          that.picUrls.push(newInfo.key);
        },
        file => {
          if (file.isUpload === 1) {
            that.progress = file.percent;
          } else if (file.isUpload === 2) {
            that.tips = "文件大小超出范围！";
          } else {
            that.tips = "文件类型不正确！";
          }
        },
        // 此处需要传入登录的token
        that.token
      );
    },
    getCourse() {
      api.getDetail({ courseId: this.courseId }).then(res => {
        this.courseInfo = res.data.courseMain;
      });
    },
    delectImg(index) {
      let that = this;
      that.imgAnswerArr.splice(
        that.imgAnswerArr.findIndex((val, ind, arr) => ind === index),
        1
      );
      that.$vux.toast.text("图片删除成功");
    },
    swith_event(e) {
      //switch控制
      this.switch_state = e;
    },
    questionQueryById() {
      let params = this.params;
      api.questionQueryById(params).then(res => {
        this.questionArr = res.data.questionAndAnswerDto;
        this.questionImg = res.data.questionUrl;
        this.answerImg = res.data.answerUrl;
        this.start_state =
          res.data.questionAndAnswerDto.starStatus == 1 ? true : false;
      });
    },

    quesEvent() {
      this.ques_state = !this.ques_state;
    },
    answerEvent() {
      this.answer_state = !this.answer_state;
    },

    text_event(val) {
      //文本控制
      if (val.length > 19) {
        this.btn_state = false;
      } else {
        this.btn_state = true;
      }
      this.answer_text = val;
    },
    confirm_alert() {
      let that = this;
      that.$vux.confirm.show({
        cancelText: "取消",
        confirmText: "确定",
        content: "是否确定提交您的回复?",
        onCancel() {
          return;
        },
        onConfirm() {
          that.addAnswerAndPics();
        }
      });
    },
    addAnswerAndPics() {
      //生产者 回答问题
      // picUrls: that.picUrls.join(","),
      let that = this;
      let params = {
        answererId: that.$store.state.userInfo.id,
        answer: that.answer_text,
        questionId: that.questionId, //问题Id
        storeId: that.$store.state.userInfo.storeId,
        picUrls: that.picUrls.join(","),
        createUser: that.questionArr.lecturerName
      };
      api.addAnswerAndPics(params).then(res => {
        if (res.success) {
          that.zzc_state = true;
          that.$vux.toast.text(res.data);
          setTimeout(function() {
            that.$router.push({ name: "quesanswerIndex" });
          }, 2000);
        } else {
        }
      });
    },

    addStar() {
      let params = {
        answerId: this.questionArr.answerId,
        userId: this.userInfo.id,
        lecturerId: this.lecturerId
      };
      console.log(this.userInfo)
      if(this.lecturerId == this.userInfo.id ){
        this.$vux.toast.text("不能给自己点赞!");
        return
      }
      api.addStar(params).then(res => {
        if (res.data.success) {
          this.start_state = true;
          this.questionArr.starNum = res.data.starnum;
        } else {
          this.$vux.toast.text(res.data.message);
        }
      });
    },
    focus_event() {
      //收回和展开文本
      this.text_state = true;
    },
    icon_event() {
      this.text_state = false;
    }
  },
  created() {
    // console.log("courseId=>", this.$route.query.courseId);
    if (this.$route.query.courseId) {
      // console.log("讲师ID", this.$route.query.courseId);
      this.courseId = this.$route.query.courseId;
      this.getCourse();
    }
    this.lecturerId = this.$route.query.lecturerId; //讲师ID
    this.questionId = this.$route.query.id; //问题ID

    this.params = {
      id: this.questionId, //问题ID
      userId: this.userInfo.id //用户id
    };
    // if (this.userInfo.id == this.lecturerId) {
    //   //临时不等于
    //   this.getUploadToken();
    // }
    this.getUploadToken();
    this.questionQueryById();
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.container_box {
  height: 100%;
  // background:#FFFFFF;
  word-wrap: break-word;
  background: #f8f8f8;
  color: #999999;
  .courseInfo,
  .questionArea,
  .answerArea {
    background: #ffffff;
    font-size: 0.24rem;
    padding: 0.32rem;
  }
  .courseInfo {
    background: #f8f8f8;
    margin-bottom: 0.4rem;
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
  // .empty_tag{
  //     height:0.2rem;
  //     background:#f8f8f8;
  //   }
  .questionArea {
    margin-bottom: 0.2rem;
    h2 {
      font-size: 0.36rem;
    }
    h4 {
      padding: 0.2rem 0;
      font-size: 0.24rem;
      span {
        margin-right: 0.48rem;
      }
    }
  }

  .answerArea {
    .lecture_img {
      height: 0.96rem;
      min-width: 0.96rem;
      margin-right: 0.24rem;
      img {
        height: 0.96rem;
        width: 0.96rem;
      }
    }
    .waiting {
      margin-top: 1rem;
      text-align: center;
      font-size: 0.3rem;
    }
    .flex_two {
      width: 100%;

      h3 {
        padding-bottom: 0.12rem;
      }
      .addStart {
        i {
          font-size: 0.32rem;
          padding-right: 0.12rem;
        }
        .active {
          color: #6cddc7;
        }
      }
    }
    .lectureAnswerArea {
      margin-bottom: 1rem;
      z-index: 1000;
      .icon_area {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 888;
        i {
          font-size: 0.4rem;
        }
      }
      .vux-x-textarea.weui-cell {
        padding: 0;
      }

      // 图片区域
      .cont_img_box {
        background: #ffffff;
        padding: 0.4rem 0;
        border-top: 1px solid #f1f1f1;
        width: 100%;
        position: fixed;
        bottom: 1.06rem;
        left: 0;
        z-index: 888;
        p {
          padding: 0 0.32rem;
          font-size: 0.24rem;
          color: @main_price_color;
        }
        .upload_area {
          padding: 0 0.32rem;
          height: 1.4rem;
          margin: 0.4rem 0 0.1rem 0;
          display: flex;
          justify-content: flex-start;
          .img_item {
            width: 2.18rem;
            height: 1.4rem;
            position: relative;
            z-index: 1000;
            margin-right: 0.15rem;
            &:nth-of-type(3) {
              margin: 0;
            }
            img {
              width: 100%;
              height: 100%;
            }
            .delect_x {
              width: 0.32rem;
              height: 0.32rem;
              position: absolute;
              top: 0;
              right: 0;
              z-index: 9;
            }
          }
        }
      }

      .box {
        background: #ffffff;
        height: 1.06rem;
        border-top: 1px solid #f1f1f1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: fixed;
        width: 99.5%;
        bottom: 0;
        left: 0;
        z-index: 888;
        img {
          width: 0.48rem;
          margin: 0 0.3rem;
        }
        .btn_style {
          height: 0.98rem;
          font-size: 0.36rem;
          color: #ffffff;
          background: #d4d4d4;
        }
        .btn_active {
          background: @active-color;
        }
      }
    }
  }

  .zzc {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999;
  }
}

.text_hidden {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
h2,
h3,
h4 {
  font-weight: normal;
}
h2,
h3,
p {
  color: #333333;
}
p {
  line-height: 0.48rem;
  font-size: 0.28rem;
}
.img_box {
  margin: 0.16rem 0;
  img {
    height: 3.6rem;
  }
}
.btn_box {
  margin-top: 0.16rem;
  text-align: center;
  color: #6cddc7;
  font-size: 0.24rem;

  i {
    font-size: 0.22rem;
  }
}

.flex_one {
  display: flex;
}
.flex_two {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.padding_bot {
  padding-bottom: 5rem;
  background: #ffffff;
}
</style>