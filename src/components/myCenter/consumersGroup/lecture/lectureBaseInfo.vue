<template>
  <div class="container">
    <!-- <div class="test_area">{{tip?tip:'非空或合法校验提示区域'}}</div> -->
    <div class="form_type_one">
      <div class="title">
        <span>*</span>真实姓名
      </div>
      <group class="group group_vux_input">
        <x-input v-model="formData.realName" placeholder="与身份证名字一致" :max="10"></x-input>
      </group>
    </div>

    <div class="form_type_two">
      <div class="title">
        <span>*</span>讲师照片
      </div>
      <div class="right">
        <div id="singleupload" class="singleupload" v-if="!input_hidden">
          <div class="plus">
            <i class="iconfont icon-jiahao"></i>
          </div>
          <div class="text">点击上传图片</div>
        </div>

        <div id="singleupload" class="singleImg" v-else>
          <img v-lazy="uploadImageHead + '/' + formData.lectureImg" alt>
        </div>

        <div class="limitIntr">
          <p>图片尺寸：3mb以下的正方形图片</p>
          <p>格式要求：Jpg、Bmp、Png</p>
          <!-- <p>仅支持jpg、jpeg、bmp、png格式</p> -->
          <!-- <p>大小不超过3M</p> -->
          
        </div>
      </div>
    </div>

    <div class="btn_next" @click="next">下一步：身份认证</div>

    <div class="backArea">
      <span @click="confirm_dialog">返回个人中心</span>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import { Group, XInput, XButton, ConfirmPlugin } from "vux";
vue.use(ConfirmPlugin);
import { initQiniu } from "@/assets/js/qiniu-api";
import { mapState } from "vuex";
import { userInfo } from "os";

export default {
  name: "lectureBaseInfo",
  data() {
    return {
      input_hidden: false,
      formData: {
        realName: "",
        lectureImg: ""
      }
    };
  },
  computed: {
    ...mapState(["userInfo", "token", "uploadImageHead"])
  },
  components: {
    Group,
    XInput,
    XButton
  },
  methods: {
    getUploadToken() {
      let that = this;
      initQiniu(
        "singleupload",
        2,
        "image/jpeg,image/jpg,image/png",
        (file, info) => {
          that.input_hidden = true;
          let newInfo = JSON.parse(info);
          that.formData.lectureImg = newInfo.key;
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
    next() {
      if (this.formData.realName == "") {
        this.$vux.toast.text("真实姓名不能为空");
        return;
      }
      if (this.formData.lectureImg == "") {
        this.$vux.toast.text("讲师照片不能为空");
        return;
      }
      // this.$store.dispatch("setApplyForm",this.formData)
      this.$router.push({
        name: "lectureContent",
        query: { formData: this.formData }
      });
    },
    confirm_dialog() {
      let that = this
      that.$vux.confirm.show({
        cancelText: "取消",
        confirmText: "确定",
        content: "确定要返回个人中心吗？",
        onCancel() {
          // console.log("取消"); // 非当前 vm
        },
        onConfirm() {
          that.$router.push({name:"consumersCenter"})
        }
      });
    }
  },
  created() {
    this.getUploadToken();
  }
};
</script>

<style lang="less" scoped>
.container {
  height:100%;
  background:#ffffff;
  font-size: 0.28rem;
  padding: 0 0.3rem;
  .test_area {
    // 非法提示区域
    font-size: 0.24rem;
    padding: 0.25rem 0;
    color: #f43737;
    border-bottom: 1px solid #f1f1f1;
  }

  .title {
    // 左边 label区域
    height: 0.42rem;
    margin-right: 0.1rem;
    width: 2rem;
    color: #666666;
    span {
      color: #FF0000;
    }
  }

  .form_type_one,
  .form_type_two {
    padding: 0.25rem 0;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
  }

  .form_type_one {
    padding-top:0.3rem;
    position: relative;
    .code_btn {
      width: 1.68rem;
      text-align: center;
      height: 0.64rem;
      line-height: 0.64rem;
      position: absolute;
      right: 0;
      top: 0.14rem;
      font-size: 0.24rem;
      border-radius: 0.08rem;
    }
    .code_normal {
      background: #ebebeb;
      color: #999999;
    }
    .code_active {
      background: @theme-color;
      color: #ffffff;
    }
  }

  .form_type_two {
    .right {
      // .group_vux_textarea {
      //   .vux-x-textarea.weui-cell {
      //     font-size: 0.3rem;
      //   }
      // }
      .singleupload,
      .singleImg {
        margin: 0 0 0.2rem 0;
        width: 1.6rem;
      }
      .singleupload {
        text-align: center;
        padding: 0.4rem 0 0.2rem 0;
        background: #f7f7f7;
        .plus {
          padding-bottom: 0.15rem;
          i {
            font-size: 0.48rem;
            color: #979797;
          }
        }
        .text {
          font-size: 0.2rem;
          color: #959595;
        }
      }
      .singleImg {
        height: 1.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .limitIntr {
        p {
          font-size: 0.24rem;
          color: #959595;
          line-height: 0.32rem;
          // &:nth-child(1){
          //   margin-bottom:0.05rem;
          // }
        }
      }
    }
  }

  // 通用按钮
  .btn_next {
    font-size: 0.28rem;
    background: @theme-color;
    text-align: center;
    border-radius: 0.04rem;
    color: #ffffff;
    padding: 0.25rem 0;
    margin-top: 1.08rem;
  }

  .backArea {
    text-align: center;
    padding-top: 1.2rem;
    color: #959595;
    font-size: 0.24rem;
    cursor: pointer;
    span {
      border-bottom: 1px solid #959595;
    }
  }
}
</style>

