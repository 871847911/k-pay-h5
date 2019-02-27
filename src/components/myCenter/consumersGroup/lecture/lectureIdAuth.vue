<template>
    <div class="container">
        <!-- <div class="test_area">{{tip?tip:'非空或合法校验提示区域'}}</div> -->

        <div class="form_type_one">
          <div class="title"><span>*</span>手机号码</div>
          <group class="group group_vux_input">
            <x-input v-model="formData.phone" placeholder="请输入手机号" :max=11></x-input>
          </group>
        </div>

        <div class="form_type_one">
          <div class="title"><span>*</span>验证码</div>
          <group class="group group_vux_input">
            <x-input v-model="formData.captcha" placeholder="请输入验证码" :max=6></x-input>
          </group>
          <div class="code_btn" :class="code_state?'code_normal':'code_active'" @click="code_event">{{!code_state?"验证码":code_time>=10?code_time:'0'+code_time}}</div>
        </div>

        <div class="form_type_one">
          <div class="title"><span>*</span>电子邮箱</div>
          <group class="group group_vux_input">
            <x-input v-model="formData.mail" placeholder="请输入电子邮箱"></x-input>
          </group>
        </div>

        <div class="form_type_one">
          <div class="title"><span>*</span>QQ</div>
          <group class="group group_vux_input">
            <x-input v-model="formData.qq" placeholder="请输入QQ" :max="11" :min="5"></x-input>
          </group>
        </div>

        <div class="form_type_two">
            <div class="title">个人介绍</div>
            <div class="right">
                <group class="group group_vux_textarea">
                    <x-textarea v-model="formData.introduce" placeholder="请输入个人介绍" @on-focus="focus_event" @on-change="text_event" :autosize="true" :max="1000" :show-counter="false"></x-textarea>
                </group>
            </div>
        </div>

        <div class="btn_next" @click="next">提交申请</div>
        <!-- <div class="zzc" v-if="zzc_state"></div> -->
    </div>
</template>

<script>
import { Group, XTextarea, XInput } from "vux";
import api from "fetch/api";
import RegTest from "@/assets/js/regExp";
import { setTimeout } from 'timers';
export default {
  name: "lectureIdAuth",
  data() {
    return {
      msg: "lectureIdAuth",
      //   tip:"",
      code_state: false,
      code_time: 60,
      btn_state:false,
      // zzc_state:false,
      formData: {
        phone: null, //手机号
        captcha: null, //验证码
        mail: null, //邮箱
        qq: null, //QQ
        introduce: null, //自我介绍
      }
    };
  },
  components: {
    Group,
    XTextarea,
    XInput
  },
  methods: {
    code_event() {
      let that = this;
      
      if (!that.code_state) {
        // 点按钮判断手机号存在及合法
        if (!that.formData.phone) {
          that.$vux.toast.text("手机号码必填!");
          return;
        } else {
          if (!RegTest.formTest.reg_phone(that.formData.phone)) {
            that.$vux.toast.text("手机号码不正确!");
            return;
          }
        }
        // 发验证码请求
        api.fileUserCode({ phone: that.formData.phone }).then(res => {
          console.log(res);
          if (res.success) {
            that.$vux.toast.text("发送成功!")
            that.code_state = true;
            var timeControl = setInterval(() => {
              that.code_time--;
              if (that.code_time == 0) {
                clearInterval(timeControl);
                that.code_state = false;
                that.code_time = 60;
              }
            }, 1000);
          }else{
            that.$vux.toast.text(res.message)
          }
        });
      } else {
        return;
      }
    },
    next() {
      let that = this;
      if(that.btn_state){
        return
      }
      if (!that.formData.phone) {
        that.$vux.toast.text("手机号码必填!");
        return;
      } else {
        if (!RegTest.formTest.reg_phone(that.formData.phone)) {
          that.$vux.toast.text("手机号码不正确!");
          return;
        }
      }
      if (!that.formData.captcha) {
        that.$vux.toast.text("验证码不能为空!");
        return;
      }
      if (!that.formData.mail) {
        that.$vux.toast.text("电子邮箱不能为空!");
        return;
      } else {
        if (!RegTest.formTest.reg_email(that.formData.mail)) {
          that.$vux.toast.text("邮箱格式不正确!");
          return;
        }
      }
      if (!that.formData.qq) {
        that.$vux.toast.text("QQ不能为空!");
        return;
      } 

      if (!that.formData.introduce) {
        that.$vux.toast.text("自我介绍必填");
        return;
      }



      // console.log(that.formData)
      // let params = {
      //   realName:'haha',
      //   photoUrl:'lecture',
      //   idCardFrontUrl:'front',
      //   idCardBackUrl:'back',
      //   idCardNum:'3333',
      //   province:'浙江省',
      //   city:'绍兴市',
      //   district:'柯桥区',
      //   address:'detail',
      //   mail:'2259367383@qq.com',
      //   qq:2259367383,
      //   phone:13325777821,
      //   captcha:'123456',
      //   introduce:'哈哈哈哈哈'
      // }
      console.log(that.formData)
      api.apply(that.formData).then(res=>{
        console.log('进入请求',res)
        if(res.success){
          // console.log("申请入驻",res)
          that.$vux.toast.text("提交成功!")
          setTimeout((res)=>{
            that.$router.push({name:"home"})
            that.btn_state = false
          },2000)
        }else{
          console.log("success的false的情况",res)
          that.$vux.toast.text(res.message)
          that.btn_state = false
        }
      })
    },
    focus_event() {},
    text_event() {}
  },
  created() {
    let params = this.$route.query.formData;
    console.log(params)
    this.formData.realName = params.realName; //真实姓名
    this.formData.photoUrl = params.lectureImg; //讲师图片
    this.formData.idCardFrontUrl = params.idCardFrontUrl; //身份证正面
    this.formData.idCardBackUrl = params.idCardBackUrl; //身份证反面
    this.formData.idCardNum = params.id_card; //身份证号码
    this.formData.province = params.receiveValue[0]; //省
    this.formData.city = params.receiveValue[1]; //市
    this.formData.district = params.receiveValue[2]; //区
    this.formData.address = params.detail_address; //详细地址
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.container {
  height:100%;
  background:#ffffff;
  font-size: 0.3rem;
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
    &:nth-child(1){
      padding:0.55rem 0 0.25rem;
    }
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
      .group_vux_textarea {
        .vux-x-textarea.weui-cell {
          font-size: 0.3rem;
        }
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

  .zzc{
    position: fixed;
    width: 100%;
    height: 100%;
    left:0;
    top: 0;
    z-index: 9999;
  }
}
</style>

