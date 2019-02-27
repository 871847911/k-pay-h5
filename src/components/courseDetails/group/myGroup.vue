<template>
  <div class="myGroupBox">
    <div class='myGroup'>
      <tab custom-bar-width="100%">
        <tab-item
          selected
          @on-item-click="onItemClick"
        >全部</tab-item>
        <tab-item @on-item-click="onItemClick">拼课中</tab-item>
        <tab-item @on-item-click="onItemClick">已成团</tab-item>
        <tab-item @on-item-click="onItemClick">已散团</tab-item>
      </tab>
    </div>
    
    <scroll
      :page="pageData.page"
      :size="pageData.size"
      :total="pageData.total"
      @change="changeList"
      v-if="list.length>0"
    >
      <div
        class='gropListBox'
        v-for="(item,index) in list"
        :key="index"
      >
        <div
          class='gropList'
          @click='goListDeatil(index)'
        >
          <div class='courseUrl'>
            <img :src='item.courseImg'>
          </div>
          <div class="courseBox">
            <div class='courseTitle'>{{item.courseName.length > 39? item.courseName.slice(0,39) + '...' : item.courseName}}</div>
            <div class='price'>
              <div class='gropPirce'><p class="shijifu">拼</p><span class="moneyColor"><span>￥</span>{{item.price}}</span>
                <!-- <div
                  v-if="item.state==0"
                  class='tuikuan'
                >
                  <p v-if="item.userState=='1'">退款中</p>
                  <p v-if="item.userState=='2'">已退款</p>
                </div> -->
              </div>
              <!-- <div class='oldPrice'>￥{{item.price}}</div> -->
            </div>
          </div>
        </div>
        <div
          class="btnBox"
          v-if="item.state==0"
        >
          <div class="groupListBtn2">
            <div :class="item.userState=='1'?'textLeftNone yituikun':'textLeftNone'">已散团,
				<span v-if="item.state==0">
                  <span v-if="item.userState=='1'">退款中</span>
                  <span v-if="item.userState=='2'">已退款</span>
                </span>
			</div>
            <div
              class='lookBtn'
              @click='goIndex(index)'
            >查看课程</div>
            <div
              class='deletBtn'
              @click='deletBtn(index)'
            >删除订单</div>
          </div>
        </div>

        <div
          class="btnBox"
          v-if="item.state==1"
        >
          <div class='groupListBtn'>
            <div class='textLeft'>拼课中，差
              <p>{{item.surplusNum}}</p>人</div>
            <div
              class='shareBtn'
              @click='groupShare(index)'
            >邀请好友拼课</div>
          </div>
        </div>
        <div
          class="btnBox"
          v-if="item.state==2"
        >
          <div class='groupListBtn2'>
            <div class='textLeftNone'>已成团</div>
            <div
              class='lookBtn'
              @click='goIndex(index)'
            >查看课程</div>
            <div
              class='deletBtn'
              @click='deletBtn(index)'
            >删除订单</div>
          </div>
        </div>
        <div
          class="btnBox"
          v-if="item.state==3"
        >
          <div class="groupListBtn2">
            <div :class="item.userState=='1'?'textLeftNone yituikun':'textLeftNone'">已散团,
				<span v-if="item.state==0">
                  <span v-if="item.userState=='1'">退款中</span>
                  <span v-if="item.userState=='2'">已退款</span>
                </span>
			</div>
            <div
              class='lookBtn'
              @click='goIndex(index)'
            >查看课程</div>
            <div
              class='deletBtn'
              @click='deletBtn(index)'
            >删除订单</div>
          </div>
        </div>
      </div>
    </scroll>
    <div
      v-else
      class="emptyBox"
    >
      <empty
        :title="pageData.notitle"
        :img="pageData.noimg"
      ></empty>
    </div>
  </div>

</template>

<script>
import vue from "vue";
import scroll from "module/scroll";
import api from "fetch/api";
import empty from "module/empty";
import { Tab, TabItem, ConfirmPlugin } from "vux";
vue.use(ConfirmPlugin);
export default {
  name: "myGroup",
  data() {
    return {
      list: [],
      pageData: {
        page: 1,
        size: 10,
        total: null,
        notitle: "暂无拼课~快去逛逛吧！",
        noimg: require("@/assets/images/noContent/grouppurchase@2x.png")
      },
      state: null
    };
  },
  components: {
    Tab,
    TabItem,
    scroll,
    empty
  },
  created() {
    this.getMyGroupBuyList();
  },
  methods: {
    onItemClick(index) {
      this.pageData = {
        page: 1,
        size: 10,
        total: null,
        notitle: "暂无拼课~快去逛逛吧！",
        noimg: require("@/assets/images/noContent/grouppurchase@2x.png")
      };
      this.state = index;
      let params = {
        page: this.pageData.page,
        size: this.pageData.size,
        state: index == 0 ? null : index == 1 ? 1 : index == 2 ? 2 : 0
      };
      api.getMyGroupBuyList(params).then(res => {
        console.log(res);
        if (res.success) {
          this.list = res.data.list;
          this.pageData.total = res.data.total;
        } else {
          this.$vux.toast.text(res.message);
        }
      });
    },
    changeList(page) {
      this.pageData.page = page;
      this.getMyGroupBuyList();
    },

    getMyGroupBuyList() {
      let params = {
        page: this.pageData.page,
        size: this.pageData.size
      };
      api.getMyGroupBuyList(params).then(res => {
        console.log(res);
        if (res.success) {
          this.list = [...this.list, ...res.data.list];
          this.pageData.total = res.data.total;
        } else {
          this.$vux.toast.text(res.message);
        }
      });
    },
    groupShare(e) {
      // let collageId = this.list[e].id
      // window.location.href ="http://" + window.location.host + '/h5-view/groupShare?collageId=' + collageId
      this.$router.push({
        path: "/groupShare",
        query: {
          collageId: this.list[e].id
        }
      });
    },
    deletBtn(e) {
	  console.log(this.list[e].id);
	  const eId = this.list[e].id
      const _this = this;
      this.$vux.confirm.show({
        cancelText: "确定",
        confirmText: "取消",
        content: "确定删除该拼课信息?",
        onCancel() {
          console.log("确定");
          _this.$vux.confirm.hide();
          let params = {
            groupId: eId
          };
          console.log(params);
          api.deleteGroupOrder(params).then(res => {
            console.log(res);
            if (res.success) {
              _this.$vux.toast.text("删除成功");
              let paramss = {
                page: _this.pageData.page,
                size: _this.pageData.size,
                state:
                  _this.state == 0
                    ? null
                    : _this.state == 1
                    ? 1
                    : _this.state == 2
                    ? 2
                    : 0
              };
              api.getMyGroupBuyList(paramss).then(res => {
                console.log(res);
                if (res.success) {
                  _this.list = res.data.list;
                  _this.pageData.total = res.data.total;
                } else {
                  _this.$vux.toast.text(res.message);
                }
              });
            } else {
              _this.$vux.toast.text(res.message);
            }
          });
        },
        onConfirm() {
          console.log("取消");
          _this.$vux.confirm.hide();
        }
      });
    },
    goListDeatil(e) {
      this.$router.push({
        path: "/mygroupDetails",
        query: {
          collageId: this.list[e].id
        }
      });
    },
    goIndex(e) {
      this.$router.push({
        name: "courseDetailsGroup",
        query: {
          id: this.list[e].courseId
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.myGroupBox {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
  .scroller {
    background: #f4f4f4;
  }
  .myGroup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    .vux-tab-wrap {
      border-bottom: 1px solid #e5e5e5;
      .vux-tab .vux-tab-item {
        background: none;
      }
      .vux-tab .vux-tab-item.vux-tab-selected {
        // font-size: 0.36rem;
      }
    }
  }
  .scroller{
    padding-top: 0.9rem;
  }
  .resPage-title {
    width: 100%;
    line-height: 0.4rem;
    padding-left: 0.32rem;
    /* padding: 0.2rem;
     */
    display: flex;
    flex-wrap: wrap;
    border-bottom: 0.02rem solid #f1f1f1;
  }

  .course {
    box-sizing: border-box;
    width: 100%;
    line-height: 0.4rem;
    padding-top: 0.1rem;
    display: block;
  }

  .course .course-title {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.32rem;
    height: 0.6rem;
    font-size: 0.44rem;
    color: #484848;
    line-height: 0.6rem;
  }

  .course .course-title .more {
    height: 0.4rem;
    font-size: 0.28rem;
    color: #484848;
    font-weight: 500;
  }

  .course div {
    box-sizing: border-box;
  }

  .resPage-title .resPage-title-item {
    /* width: 33.33%;
     */
    margin-right: 0.48rem;
    padding-bottom: 0.22rem !important;
    text-align: center;
    padding: 0.1rem 0;
    color: #999;
    font-size: 0.3rem;
  }

  .resPage-title .active {
    border-bottom: 0.04rem solid #6cddc7;
    font-size: 0.36rem;
    color: #6cddc7;
    font-weight: 800;
  }

  .gropListBox {
    background: #fff;
    border-bottom: 0.01rem solid rgba(241, 241, 241, 1);
    padding: 0.32rem 0.32rem 0 0.32rem;
    margin-top: 0.1rem;
  }

  .gropList {
    display: flex;
    padding-bottom: 0.32rem;
    border-bottom: 1px solid #f1f1f1;
    .courseBox {
      padding: 0 0 0 0.16rem;
      flex: 1;
      height: 1.44rem;
      position: relative;
    }
  }
  .btnBox {
    padding: 0.32rem 0 0.2rem 0;
  }
  .courseUrl {
  }

  .courseTitle {
    width: 4.1rem;
    height: 0.72rem;
    line-height: 0.36rem;
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
    // padding: 0 0.32rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    // padding-right: 0.32rem;
    word-break: break-all;
  }

  .courseUrl img {
    width: 2.56rem;
    height: 1.44rem;
    border-radius: 2px;
  }

  .price {
    // flex: 1;
    // text-align: right;
    position: absolute;
    bottom: 0;
    left: 0.16rem;
    width: 100%;
    // padding-top: 0.3rem;
  }

  .gropPirce {
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(72, 72, 72, 1);
    // padding-bottom: 0.12rem;
    overflow: hidden;
    .moneyColor {
      font-size: 0.25rem;
      color: #fe8060;
      font-weight: 600;
      span {
        font-size: 0.18rem;
        font-weight: normal;
      }
    }
  }

  .shijifu {
    display: inline-block;
    font-size: 0.22rem;
    color: #fff;
    background: #fe8060;
    border-radius: 4px;
    width: 0.34rem;
    height: 0.34rem;
    line-height: 0.38rem;
    text-align: center;
    margin-right: 0.16rem;
  }

  .oldPrice {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-decoration: line-through;
    padding-bottom: 0.12rem;
  }

  .tuikuan {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(254, 128, 96, 1);
    display: inline;
    overflow: hidden;
    float: right;
  }

  .tuikuan p {
    display: inline;
  }

  .groupListBtn {
    display: flex;
    justify-content: space-between;
  }

  .groupListBtn2 {
    overflow: hidden;
  }
 
  .groupListBtn .textLeft {
    line-height: 0.64rem;
    color: #fe8060;
    display: flex;
  }
 
  .shareBtn {
    width: 1.84rem;
    height: 0.48rem;
    text-align: center;
    line-height: 0.48rem;
    background: rgba(255, 255, 255, 1);
    font-size: 0.24rem;
    color: #6cddc7;
    border-radius: 4px;
    border: 0.02rem solid rgba(108, 221, 199, 1);
  }

  .textLeftNone {
    float: left;
    line-height: 0.64rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: #666666;
  }
  .yituikun{
    color: #FE8060;
  }
  .deletBtn {
    float: right;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    border: 0.02rem solid rgba(208, 208, 208, 1);
    width: 1.36rem;
    height: 0.48rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.52rem;
    text-align: center;
    margin-right: 0.32rem;
  }

  .lookBtn {
    float: right;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    border: 0.02rem solid #6cddc7;
    width: 1.36rem;
    height: 0.48rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: #6cddc7;
    line-height: 0.48rem;
    text-align: center;
  }
  // .emptyBox{
  // 	padding-top: 3rem;
  // }
}
</style>
