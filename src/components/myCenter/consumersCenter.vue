<template>
  <div class="consumers_center outermost">
    <div class="user_box">
      <div class="user_box_main">
        <div class="header_img">
          <img v-lazy="$store.state.userInfo.headUrl" alt>
        </div>
        <div class="user_name">
          <p class="name">{{$store.state.userInfo.nickName}}</p>
          <p class="user_data">
            <router-link :to="{name : 'setUserInfo'}">查看个人资料并编辑</router-link>
          </p>
        </div>
        <!--<div class="share_fr">-->
        <!--<span>邀请好友推广</span>-->
        <!--</div>-->
      </div>
    </div>

    <div class="flowtop_box">
      <div class="theflow">
        <!--<div class="the_box&#45;&#45;top">-->
        <!--<div class="left">-->
        <!--<p class="the_box_title">-->
        <!--<img :src="require('../../assets/images/iconImg/my_money@2x.png')" alt="">-->
        <!--可提现余额-->
        <!--</p>-->
        <!--<div class="yve">-->
        <!--{{payAmount}}-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="right">-->
        <!--<span>-->
        <!--提现 <i class="iconfont icon-jiantou"></i>-->
        <!--</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="the_box--btm">
          <div class="the_box_line">
            <router-link :to="{name : 'myLearning'}">
              <div class="name">我的学习</div>
              <div class="number">{{lecturerIndex.courseCount}}</div>
            </router-link>
          </div>
          <div class="the_box_line">
            <router-link :to="{name : 'myFocus'}">
              <div class="name">我的关注</div>
              <div class="number">{{lecturerIndex.subscribeCount}}</div>
            </router-link>
          </div>
          <div class="the_box_line">
            <router-link :to="{name : 'quesanswerIndex'}">
              <div class="name">我的提问</div>
              <div class="number">{{lecturerIndex.questionCount}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="btn_lecture" v-if="this.$store.state.userInfo.roleId == 3">
      <!-- <div class="btn_lecture" v-if="true"> -->
      <router-link :to="{name:'agreementPage'}">
        <div class="inner_box">
          <img :src="require('../../assets/images/iconImg/my_shop@2x.png')" alt>一键知识变现
        </div>
      </router-link>
    </div>

    <ul class="list_ul" v-else>
      <!-- <ul class="list_ul" v-if="true"> -->
      <li>
        <router-link :to="{name:'producersCenter'}" class="li_flex">
          <div class="img_box">
            <img :src="require('../../assets/images/iconImg/my_ittle shop@2x.png')" alt>
          </div>
          <div class="text_box">切换知识店铺</div>
          <div class="arrow">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </router-link>
      </li>
    </ul>

    <ul v-for="(item,itemIndex) in dataList" :key="itemIndex" class="list_ul">
      <li v-for="(list,listIndex) in item" :key="listIndex">
        <router-link :to="{name : list.linkName}" class="li_flex">
          <div class="img_box">
            <img :src="list.icon" alt>
          </div>
          <div class="text_box">{{list.text}}</div>
          <div class="arrow">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </router-link>
      </li>
    </ul>
    <ul class="list_ul">
      <li>
        <a href="tel:18967828817" class="li_flex">
          <div class="img_box">
            <img :src="require('../../assets/images/iconImg/Contact_us-icon@2x.png')" alt>
          </div>
          <div class="text_box">联系我们</div>
          <div class="arrow">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </a>
      </li>
    </ul>

    <!--<confirm-->
    <!--v-model="phoneBoxShow"-->
    <!--@on-confirm="onConfirm">-->
    <!--<p>123-456-789</p>-->
    <!--</confirm>-->
  </div>
</template>

<script>
import api from "fetch/api";
// import { Confirm } from 'vux'
export default {
  name: "consumers_center",
  data() {
    return {
      // phoneBoxShow : false,
      dataList: [
        // [
        // 	{
        // 		icon :require('../../assets/images/iconImg/my_ittle shop@2x.png') ,
        // 		text : '切换知识店铺',
        // 		linkName : 'producersCenter'
        // 	}
        // ],
        [
          {
            icon: require("../../assets/images/iconImg/Member_Center@2x.png"),
            text: "会员中心",
            linkName: "menberCenter"
          },
          {
            icon: require("../../assets/images/iconImg/My_points@2x.png"),
            text: "我的积分",
            linkName: "integral"
          }
        ],
        [
          {
            icon: require("../../assets/images/iconImg/Order-icon@2x.png"),
            text: "我的订单",
            linkName: "myOrder"
          },
          {
            icon: require("../../assets/images/iconImg/Consultation-icon@2x.png"),
            text: "我的咨询",
            linkName: "myConsult"
          },
          {
            icon: require("../../assets/images/iconImg/Group_buy-icon@2x.png"),
            text: "我的拼课",
            linkName: "myGroup"
          },
          {
            icon: require("../../assets/images/iconImg/Gift_record-icon@2x.png"),
            text: "赠送记录",
            linkName: "sendRecord"
          },
          {
            icon: require("../../assets/images/iconImg/my_share@2x.png"),
            text: "我的分享",
            linkName: "myShare"
          }
        ]
      ],
      lecturerIndex: {},
      payAmount: null
    };
  },
  // components : {
  // 	Confirm
  // },
  created() {
    this.getLecturerIndex();
  },
  methods: {
    getLecturerIndex() {
      
      api.getConsumersIndex({}).then(res => {
        this.lecturerIndex = res.data;
      });
    },
    getUserInfo() {
      console.log("vuex中的userInfo", this.$store.state.userInfo);
      let that = this;
      api.getUserInfo(that.$store.state.token).then(res => {
        console.log("getUserInfo接口=>",res);
        that.$store.dispatch("updateUserInfo", res.data);
      });
    }
    // onConfirm(){
    // 	window.location.href = "tel:10086";
    // }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserInfo();
    });
  }
};
</script>

<style lang="less" scoped>
.consumers_center {
  background: @background-default-b-color;
  overflow: scroll;
  .user_box {
    width: 100%;
    height: 2.2rem;
    background: @background-default-color;
    padding: 0.3rem;
    box-sizing: border-box;
    .user_box_main {
      .header_img {
        float: left;
        width: 1rem;
        height: 1rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #ddd;
        }
      }
      .user_name {
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 1rem;
        margin-left: 0.2rem;
        .name {
          font-weight: 500;
          font-size: 0.34rem;
          color: #fff;
        }
        .user_data {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.22rem;
        }
      }
      .share_fr {
        height: 1rem;
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          padding: 0.1rem 0.16rem;
          border-radius: 0.2rem;
          background: #5fd3bc;
          color: #fff;
          font-size: 0.24rem;
        }
      }
    }
  }
  .flowtop_box {
    width: 100%;
    background: #f8f8f8;
    padding: 0.3rem;
    box-sizing: border-box;
    .theflow {
      background: #fff;
      width: 100%;
      height: 1.78rem;
      margin-top: -0.8rem;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 0.32rem 0.3rem;
      .the_box--top {
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 0.2rem;
        .left {
          flex: 1;
          display: block;
          .the_box_title {
            font-size: 0.3rem;
            color: #6a6a6a;
            img {
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.2rem;
            }
          }
          .yve {
            padding: 0.2rem;
            color: rgba(0, 0, 0, 0.7);
            font-weight: bold;
            font-size: 0.4rem;
          }
        }
        .right {
          flex: 1;
          color: #999;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            display: inline;
          }
        }
      }
      .the_box--btm {
        display: flex;
        .the_box_line {
          flex: 1;
          text-align: center;
          padding-top: 0.3rem;
          .name {
            margin-bottom: 0.07rem;
            font-size: 0.28rem;
          }
          .number {
            font-size: 0.34rem;
            color: rgba(0, 0, 0, 0.7);
            font-weight: bold;
          }
        }
      }
    }
  }

  // 知识变现按钮
  .btn_lecture {
    color: #ffffff;
    padding: 0 0.32rem;
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
    .inner_box {
      background: @theme-color;
      padding: 0.24rem 0;
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }

  .list_ul {
    margin-bottom: 0.1rem;
    background: #fff;
    li {
      .li_flex {
        padding: 0 0.38rem;
        overflow: hidden;
        display: flex;
        .img_box {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.2rem;
          padding: 0.27rem 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text_box {
          flex: 1;
          line-height: 0.5rem;
          font-size: 0.3rem;
          padding: 0.27rem 0;
        }
        .arrow {
          line-height: 0.5rem;
          padding: 0.27rem 0;
          border-bottom: 1px solid #f1f1f1;
        }
      }
    }
    li:not(:last-child) {
      .text_box {
        border-bottom: 1px solid #f1f1f1;
      }
    }
  }
}
</style>
