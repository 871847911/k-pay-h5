
<template>
  <div class="my_order">
    <tab
      :line-width="1"
      custom-bar-width="0.6rem"
      v-model="index"
      prevent-default
      @on-before-index-change="switchTabItem"
    >
      <tab-item selected>待付款</tab-item>
      <tab-item>已付款</tab-item>
      <tab-item>已失效</tab-item>
      <tab-item>已退款</tab-item>
    </tab>
    <scroll
      :page="pageData.page"
      :size="pageData.size"
      :total="pageData.total"
      @change="pageChange"
      v-if="orderList.length > 0"
    >
      <div class="order_box" v-for="(item,index) in orderList" :key="index">
        <router-link :to="{name : 'myOrderDetail',query :{orderId : item.id}}">
          <div class="box-top">
            <div class="top_left">下单时间：{{item.createDate}}</div>
            <div class="top_right">
              <span class="no_pay" v-if="item.status == '1'">待付款</span>
              <span class="others" v-if="item.status == '2'">已支付</span>
              <span class="others" v-if="item.status == '3'">已失效</span>
              <span class="others" v-if="item.status == '4'">已退款</span>
            </div>
          </div>

          <div class="box-btm">
            <div class="btm_left">
              <img :src="item.productImage" alt>
            </div>
            <div class="btm_center">
              <div class="p_ellipsis">{{item.productName}}</div>
            </div>
            <div class="btm_right">{{item.payPrice}}</div>
          </div>
        </router-link>
        <div class="button_box" v-if="item.status == '1'">
          <button type="button" class="info_btn" @click="cancelOrder(item.id)">取消订单</button>
          <button type="button" class="true_btn" @click="toPay(item.channelType,item.productId,item.wechatOrderId)">去支付</button>
        </div>
        <div class="button_box" v-else>
          <button type="button" class="info_btn" @click="confirm_alert(item.id)">删除订单</button>
          <button type="button" class="true_btn" @click="goList">再去逛逛</button>
        </div>
      </div>
    </scroll>

    <!-- 无数据展示效果 -->
    <empty v-else :title="emtypJSON.title" :img="emtypJSON.img"></empty>
  </div>
</template>

<script>
import { Tab, TabItem, Confirm, ConfirmPlugin } from "vux";
import vue from "vue";
vue.use(ConfirmPlugin);
import api from "fetch/api";
import scroll from "module/scroll";
import empty from "module/empty";
import { setTimeout } from "timers";
export default {
  name: "myOrder",
  data() {
    return {
      pageData: {
        page: 1,
        size: 5,
        total: null
      },
      index: 0,
      orderList: [],
      wxOrderInfo: {},
      emtypJSON: {
        title: "暂无订单~快去逛逛吧！",
        img: require("@/assets/images/noContent/no_order.png")
      },
      zzc_state: false
    };
  },
  components: {
    Tab,
    TabItem,
    scroll,
    empty
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      let params = {
        page: this.pageData.page,
        size: this.pageData.size,
        status:
          this.index == 0
            ? "1"
            : this.index == 1
            ? "2"
            : this.index == 2
            ? "3"
            : "4"
      };
      api.muOrder(params).then(res => {
        // console.log(res);
        this.pageData.total = res.data.total;
        if (this.pageData.page == 1) {
          this.orderList = res.data.list;
          this.zzc_state = false;
        } else {
          this.orderList = [...this.orderList, ...res.data.list];
          this.zzc_state = false;
        }
      });
    },
    switchTabItem(index) {
      this.index = index;
      this.getOrderList();
    },
    toPay(type, courseId, wechatOrderId) {

      let param_type = type == 1 ? 0 : type == 2 ? 3 : type == 3 ? 2 : type == 4 ? 1 : 4
      console.log("订单类型type=>", type);
      console.log("处理后的param_type=>", param_type);
      this.$router.push({
        name: "orderPay",
        query: {
          // 后端 1常规 2赠送 3拼课 4分享 5分销
          // 前端orderPay.vue 0.普通购买 1.分享 2.拼课 3.赠送
          type:param_type,
          courseId: courseId,
          wxOrder: wechatOrderId
        }
      });
    },
    cancelOrder(id) {
      // console.log("取消订单");
      let that = this;
      api.myOrderDeleted({ orderId: id }).then(res => {
        // console.log(res);
        if (res.success) {
          that.$vux.toast.text("删除成功");
          that.getOrderList();
        }
      });
    },
    confirm_alert(id) {
      if (this.zzc_state) {
        return;
      }
      let that = this;
      that.$vux.confirm.show({
        cancelText: "取消",
        confirmText: "确定",
        content: "确定删除订单?",
        onCancel() {
          this.zzc_state = false;
          return;
        },
        onConfirm() {
          that.deletedOrder(id);
        }
      });
    },
    deletedOrder(id) {
      // console.log("删除订单");
      let that = this;
      api.myOrderDeleted({ orderId: id }).then(res => {
        // console.log(res);
        if (res.success) {
          that.$vux.toast.text("删除成功");
          that.getOrderList();
        }
      });
    },
    goList() {
      // console.log("再去逛逛 去课程列表");
      this.$router.push({ name: "home" });
    },
    pageChange(page) {
      console.log(page);
      this.pageData.page = page;
      this.getOrderList();
    }
  }
};
</script>

<style lang="less" scoped>
.my_order {
  display: flex;
  flex-direction: column;
  height: 100%;
  .order_box {
    font-size: 0.3rem;
    padding: 0.45rem 0.32rem;
    border-bottom: 1px solid #f1f1f1;
    .box-top {
      display: flex;

      .top_left {
        flex: 1;
        color: #666;
      }
      .top_right {
        .no_pay {
          color: #fe8060;
        }
        .others {
          color: #999;
        }
      }
    }
    .box-btm {
      margin-top: 0.4rem;
      display: flex;
      .btm_left {
        width: 1.6rem;
        height: 1.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .btm_center {
        flex: 1;
        .p_ellipsis{
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .btm_right {
        margin-left: 0.2rem;
      }
    }
    .button_box {
      margin-top: 0.2rem;
      display: flex;
      justify-content: flex-end;
      .info_btn,
      .true_btn {
        border-radius: 4px;
        width: 2rem;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.28rem;
      }
      .info_btn {
        border: 1px solid #d0d0d0;
        color: #666;
        background: transparent;
        margin-right: 0.32rem;
      }
      .true_btn {
        border: 1px solid #6cddc7;
        color: #6cddc7;
        background: transparent;
      }
    }
  }

  empty {
    flex: 1;
  }
}
</style>
