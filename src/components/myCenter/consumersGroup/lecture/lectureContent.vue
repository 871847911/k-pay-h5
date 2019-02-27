<template>
  <div class="container">
    <!-- <div class="test_area">{{tip?tip:'非空或合法校验提示区域'}}</div> -->
    <div class="form_type_two style_ts">
      <div class="title">
        <span>*</span>身份件
      </div>
      <div class="right">
        <div class="img_box">
          <div id="singleFront" class="idCardUpload" v-if="!front_state">
            <div class="plus">
              <i class="iconfont icon-jiahao"></i>
            </div>
            <div class="text">身份证正面</div>
          </div>
          <div id="singleFront" class="idCardImg" v-else>
            <img :src="uploadImageHead + '/' + formData.idCardFrontUrl" alt>
          </div>
        </div>

        <div class="img_box">
          <div id="singleBack" class="idCardUpload" v-if="!back_state">
            <div class="plus">
              <i class="iconfont icon-jiahao"></i>
            </div>
            <div class="text">身份证正面</div>
          </div>
          <div id="singleBack" class="idCardImg" v-else>
            <img :src="uploadImageHead + '/' + formData.idCardBackUrl" alt>
          </div>
        </div>
      </div>
    </div>

    <div class="form_type_one">
      <div class="title">
        <span>*</span>身份证号码
      </div>
      <group class="group group_vux_input">
        <x-input v-model="formData.id_card" placeholder="请输入二代身份证" :max="18"></x-input>
      </group>
    </div>

    <div class="form_type_two">
      <div class="title">
        <span>*</span>所在地区
      </div>
      <!-- 放三级联动 -->
      <div class="right">
        <div class="address_info">
          <x-address
            title
            v-model="addressValue"
            :list="addressData"
            :raw-value="true"
            placeholder="请选择地址"
            :show.sync="showAddress"
            @on-hide="addressHide"
            @on-shadow-change="addresChange"
            value-text-align="left"
          ></x-address>
        </div>
      </div>
    </div>

    <div class="form_type_one">
      <div class="title">
        <span>*</span>详细地址 
      </div>
      <group class="group group_vux_input">
        <x-input v-model="formData.detail_address" placeholder="请输入详细地址"></x-input>
      </group>
    </div>

    <div class="btn_next" @click="next">下一步：联系方式</div>
  </div>
</template>

<script>
import { XAddress, Group, ChinaAddressV4Data, Confirm, XInput } from "vux";
import { initQiniu } from "@/assets/js/qiniu-api";
import RegTest from "@/assets/js/regExp";
import { mapState } from "vuex";

export default {
  name: "lectureContent",
  data() {
    return {
      msg: "lectureContent",
      front_state: false,
      back_state: false,
      addressData: ChinaAddressV4Data,
      showAddress: false,
      receiveValue: [],
      addressValue: [],
      formData: {
        idCardFrontUrl: "",
        idCardBackUrl: "",
        id_card: "",
        receiveValue: [],
        detail_address: ""
      }
    };
  },
  computed: {
    ...mapState(["userInfo", "token", "uploadImageHead"])
  },
  components: {
    XAddress,
    Group,
    ChinaAddressV4Data,
    Confirm,
    XInput
  },
  methods: {
    getUploadToken() {
      let that = this;
      initQiniu(
        "singleFront",
        2,
        "image/jpeg,image/jpg,image/png",
        (file, info) => {
          console.log('front=>',info)
          that.front_state = true;
          let newInfo = JSON.parse(info);
          that.formData.idCardFrontUrl = newInfo.key;
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

      initQiniu(
        "singleBack",
        2,
        "image/jpeg,image/jpg,image/png",
        (file, info) => {
          console.log('back=>',info)
          that.back_state = true;
          let newInfo = JSON.parse(info);
          that.formData.idCardBackUrl = newInfo.key;
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
    addressHide(e) {
      if (e) {
        this.addressValue = this.formData.receiveValue;
        console.log("点确定=>", this.formData.receiveValue);
      } else {
        // console.log("点取消=>",this.addressValue)
      }
    },
    addresChange(id, name) {
      this.formData.receiveValue = name;
    },
    next() {
      if (this.formData.idCardFrontUrl == "") {
        this.$vux.toast.text("身份件正面必填!");
        return;
      }
      if (this.formData.idCardBackUrl == "") {
        this.$vux.toast.text("身份件反面必填!");
        return;
      }
      if (this.formData.id_card == "") {
        this.$vux.toast.text("身份证号码必填!");
        return;
      } else {
        console.log(RegTest.formTest.req_idcard(this.formData.id_card));
        if (!RegTest.formTest.req_idcard(this.formData.id_card)) {
          this.$vux.toast.text("身份证不正确!");
          return;
        }
      }
      if (this.addressValue == "") {
        this.$vux.toast.text("所在地区必填!");
        return;
      }
      if (this.formData.detail_address == "") {
        this.$vux.toast.text("详细地址必填!");
        console.log(this.formData.receiveValue);
        return;
      }
      this.$router.push({
        name: "lectureIdAuth",
        query: {
          formData: this.formData
        }
      });
    }
  },
  created() {
    
    this.getUploadToken();
    let params = this.$route.query.formData;
    console.log(params)
    this.formData.lectureImg = params.lectureImg;
    this.formData.realName = params.realName;
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.container {
  font-size: 0.3rem;
  padding: 0 0.3rem;
  height:100%;
  background:#ffffff;
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
    // margin-right: 0.1rem;
    width: 2rem;
    color: #666666;
    span {
      color: red;
    }
  }

  .form_type_one,
  .form_type_two {
    padding: 0.25rem 0;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
  }


  .form_type_one {
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
    &:nth-child(1){
      padding:0.55rem 0 0.25rem;
    }
    .right {
      .img_box {
        margin-bottom: 0.32rem;
        .idCardUpload {
          background: #f7f7f7;
          text-align: center;
          padding: 0.95rem 1.4rem 0.7rem;
          .plus {
            margin-bottom: 0.28rem;
            i {
              color: #979797;
              font-size: 0.48rem;
            }
          }
          .text {
            color: #999999;
            font-size: 0.22rem;
          }
        }
        .idCardImg {
          width: 4rem;
          height: 2.74rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .address_info {
        color: #333333;
        min-width: 4rem;
        font-size: 0.3rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  // 通用按钮
  .btn_next {
    font-size: 0.32rem;
    background: @theme-color;
    text-align: center;
    border-radius: 0.04rem;
    color: #ffffff;
    padding: 0.25rem 0;
    margin-top: 1.08rem;
  }
}
</style>

