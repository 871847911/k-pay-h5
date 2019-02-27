<template>
  <div class="container">
    <div class="tip" v-if="!applyStatus">
      <img src="../../../../assets/images/courseDeails/feedback.png" alt>
      <p>正在审核中</p>
      <button @click="toCenter">返回个人中心</button>
    </div>
    <div class="part_top" v-if="applyStatus">
      <div class="agreement">
        <div class="ag_content">风险提示：
          <br>合作的方式多种多样，如合作设立公司、合作开发软件、合作购销产品等等，不同合作方式涉及到不同的项目内容，相应的协议条款可能大不相同。 本协议的条款设置建立在特定项目的基础上，仅供参考。实践中，需要根据双方实际的合作方式、项目内容、权利义务等，修改或重新拟定条款。 经甲、乙双方共同协商，本着互惠互利、共同发展的原则，就开展教育合作事宜，达成如下协议：
          <br>一、合作事项 甲方授权乙方为省市县“________________秘书学院合作基地”。同时为了维护双方的合法权益，乙方一次性向甲方交纳履约保证金___________元。
          <br>风险提示：
          <br>应明确约定合作各方的权利义务，以免在项目实际经营中出现扯皮的情形。 再次温馨提示：因合作方式、项目内容不一致，各方的权利义务条款也不一致，应根据实际情况进行拟定。
          <br>二、甲方职责
          <br>1、向乙方提供合作范围内的《授权书》。
          <br>2、向乙方颁发“_________秘书学院合作基地”的铜牌。
          <br>3、负责协助乙方办理“教育部中国高教秘书学会会员证书”。
          <br>4、向乙方提供甲方的办学许可证、收费许可证复印件等有关证明文件。
          <br>5、负责学生入学资格的审核、面试及录取工作。
          <br>6、负责乙方教学大纲的制定及教学质量的监督和检查。
          <br>7、学生在甲方学习期满成绩合格者，由甲方负责毕业证书的发放。
          <br>8、精品秘书班、现代高等秘书班的学生学习期满成绩合格者，甲方负责安排就业。
          <br>三、乙方职责
          <br>1、负责在当地办理合作办学的有关手续。
          <br>2、负责在当地的招生宣传、报名及入学资格的初步审定等事宜，并及时与甲方联系安排学生入学注册。
          <br>3、负责学生在乙方学习期间的教学及生活管理，并提供教学所需要的教室及教学设施。
          <br>4、乙方必须严格执行甲方所制定的教学大纲，并及时向甲方通报教学计划的执行情况。
          <br>5、负责学生在乙方学习期间的安全并承担由此产生的相关责任。
          <br>6、乙方办学、培训期间自行管理，自负盈亏，并承担相应的责任和义务。
        </div>
      </div>
      <div class="checkbox_group group_check_icon">
        <check-icon :value.sync="state">我已阅读并同意此协议。</check-icon>
      </div>
    </div>

    <div class="btn_box" v-if="applyStatus">
      <div class="btn_next">
        <x-button :disabled="!state" @click.native="goNext">下一步：基本信息</x-button>
      </div>
    </div>
  </div>
</template>


<script>
import { CheckIcon } from "vux";
import api from "fetch/api";
export default {
  name: "agreementPage",
  data() {
    return {
      msg: "agreementPage",
      state: false,
      applyStatus: false
    };
  },
  components: {
    CheckIcon
  },
  methods: {
    getApplyState() {
      api.getUserInfo({}).then(res => {
        this.applyStatus = res.data.applyStatus == 10 ? false : true;
      });
    },
    goNext() {
      this.$router.push({ name: "lectureBaseInfo" });
    },
    toCenter() {
      this.$router.push({ path: "consumersCenter" });
    }
  },
  created() {
    this.getApplyState();
  }
};
</script>

<style lang="less" scoped>
.container {
  margin-bottom: 1rem;
  .part_top {
    padding: 0.3rem;
    box-sizing: border-box;
    .agreement {
      padding: 0 0 0.3rem;
      color: #666666;
      border-bottom: 1px solid #d0d0d0;
    }

    .checkbox_group {
      padding: 0.32rem 0;
      font-size: 0.3rem;
      color: #333333;
    }
  }

  .btn_box {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    background: #f4f4f4;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    .btn_next {
      width: 6.88rem;
      margin: 0 auto;
      .weui-btn:after {
        border: 0;
      }
      .weui-btn_disabled.weui-btn_default {
        color: #ffffff;
        background: #d4d4d4;
      }
      .weui-btn_default {
        color: #ffffff;
        padding: 0.1rem;
        font-size: 0.32rem;
      }
    }
  }

  .tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 3rem;
      height: 1.8rem;
      margin-top: 1rem;
    }
    p {
      height: 0.42rem;
      color: @main_time_color;
      font-size: 0.3rem;
      margin: 0.52rem 0 1.4rem;
    }
    button {
      font-size: 0.36rem;
      font-weight: 900;
      background: @active-color;
      width: 6.88rem;
      height: 0.98rem;
      line-height: 0.98rem;
    }
  }
}
</style>