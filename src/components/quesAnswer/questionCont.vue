<template>
  <div class="container_box">
    <!-- 提问的问题和图片 -->
    <group class="group cont_top">
      <x-textarea
        v-model="describe"
        @on-change="text_event"
        placeholder="详细描述：尽可能详细的描述下你的问题，方便问题快速解决"
        :autosize="true"
        :max="1000"
        :show-counter="false"
      ></x-textarea>
    </group>

    <div class="cont_img_box">
      <p>最多可添加3张图片,每张大小不超过2MB;建议尺寸338px*180px</p>
      <!-- 遍历出来的图片区域 -->
      <div class="upload_area">
        <div class="img_item" v-for="(item,index) in imgArr" :key="index">
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

      <div class="line"></div>
      <group class="group switch">
        <x-switch title="匿名" v-model="switch_state" @on-change="swith_event"></x-switch>
      </group>
      <x-button
        type="default"
        class="btn_style"
        @click.native="saveQuestionAndPics"
        :disabled="btn_state"
        :class="btn_state?'':'btn_active'"
      >提交</x-button>
    </div>

    <div class="zzc" v-if="zzc_state"></div>
  </div>
</template>

<script>
import api from "fetch/api";
import { Group, XTextarea, XSwitch, XButton } from "vux";
import { initQiniu } from "../../assets/js/qiniu-api.js";
import { mapState } from "vuex";


export default {
  name: "questionCont",
  components: {
    Group,
    XTextarea,
    XSwitch,
    XButton,
  },
  data() {
    return {
      switch_state: false,
      btn_state: true,
      imgArr: [],
      lecturerId: null, //讲师ID
      title: "", //问题的标题
      describe: "", //问题的描述
      anonymity: "",
      picUrls: [],
      courseId: "",
      upload_state: 0,
      zzc_state: false
    };
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
          if (this.imgArr.length == 3) {
            this.$vux.toast.text("只能上传三张图片");
            return;
          }
          let newInfo = JSON.parse(info);
          that.imgArr.push(that.uploadImageHead + "/" + newInfo.key);
          that.picUrls.push(newInfo.key);
          // that.tips = "上传成功。";
        },
        file => {
          if (file.isUpload === 1) {
            // that.progress = file.percent;
          } else if (file.isUpload === 2) {
            this.$vux.toast.text("文件大小超出范围！");
          } else {
            this.$vux.toast.text("文件类型不正确！");
          }
        },
        // 此处需要传入登录的token
        that.userInfo.token
      );
    },
    text_event(val) {
      //文本控制
      if (val.length > 19) {
        this.btn_state = false;
      } else {
        this.btn_state = true;
      }
      this.describe = val;
    },
    delectImg(index) {
      let that = this;
      that.imgArr.splice(
        that.imgArr.findIndex((val, ind, arr) => ind === index),
        1
      );
      this.$vux.toast.text("删除成功");
    },
    swith_event(e) {
      //switch控制
      this.switch_state = e;
    },
    saveQuestionAndPics() {
      let that = this;
      //提交按钮
      that.anonymity = that.switch_state ? "1" : "0";
      let params = {
        questionerType: 0,
        questionerId: that.userInfo.id,
        lecturerId: that.lecturerId,
        title: that.title,
        describe: that.describe,
        status: 0,
        anonymity: that.anonymity,
        picUrls: that.picUrls.join(","),
        courseId: that.courseId ? that.courseId : "null",
        storeId: that.userInfo.storeId,
        createUser: that.userInfo.userName
      };
      api.saveQuestionAndPics(params).then(res => {
        if (res.success) {
          that.zzc_state = true;
          this.$vux.toast.text(res.data);

          setTimeout(function() {
            that.$router.push({ name: "quesanswerIndex" });
          }, 2000);
        } else {
        }
      });
    }
  },
  created() {
    this.getUploadToken();
  },
  mounted() {
    this.lecturerId = this.$route.query.lecturerId;
    this.title = this.$route.query.title;
    this.courseId = this.$route.query.courseId;
  }
};
</script>

<style scoped lang="less">
.container_box {
  height: 100vh;
  background:#FFFFFF;
  padding-bottom: 6rem;
  .cont_text,
  .cont_img {
    padding: 0 0.32rem;
  }
  .cont_top {
    z-index: 1000;
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

  // 按钮区域
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
    z-index: 9999;
    img {
      width: 0.48rem;
      margin: 0 0.3rem;
    }
    .line {
      width: 2px;
      background: #f1f1f1;
      height: 0.4rem;
    }
    .switch {
      display: flex;
      align-items: center;
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

  // zzc
  .zzc {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999;
  }
  .weui-btn:after {
    border: none;
  }
}
</style>
