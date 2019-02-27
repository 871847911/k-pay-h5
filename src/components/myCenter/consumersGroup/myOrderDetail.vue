
<template>
  <div class="my_order_detail">
    <!-- <scroll
      :page="pageData.page"
      :size="pageData.size"
      :total="pageData.total"
      @change="pageChange"
    ></scroll>-->
    <div
      class="order_state"
    >{{orderDetailInfo.status==1?"待付款":orderDetailInfo.status==2?"已付款":orderDetailInfo.status==3?"已失效":"已退款"}}</div>

    <div class="course_info">
      <div class="left">
        <div class="title">{{orderDetailInfo.productName}}</div>
        <div class="price">￥{{orderDetailInfo.payPrice}}</div>
      </div>
      <div class="right">
        <img :src="orderDetailInfo.productImage" alt>
      </div>
    </div>

    <!-- 订单基本信息 -->
    <div class="same_box">
      <div class="item">
        <div class="label">订单编号</div>
        <div class="data">{{orderDetailInfo.orderNumber}}</div>
      </div>
      <div class="item">
        <div class="label">生成时间</div>
        <div class="data">{{orderDetailInfo.createDate}}</div>
      </div>
      <div class="item">
        <div class="label">商品价格</div>
        <div class="data">{{orderDetailInfo.payPrice}}</div>
      </div>
    </div>

    <!-- 已支付 -->
    <div class="same_box" v-if="orderDetailInfo.status==2">
      <div class="item">
        <div class="label">支付方式</div>
        <div class="data">{{orderDetailInfo.payMethod == 1 ? "微信支付":"免费获得"}}</div>
      </div>
      <div class="item">
        <div class="label">支付时间</div>
        <div class="data">{{orderDetailInfo.payDate}}</div>
      </div>
    </div>

    <!--  已退款 -->
    <div class="same_box" v-if="orderDetailInfo.status == 4">
      <div class="item">
        <div class="label">退款方式</div>
        <div class="data">{{orderDetailInfo.payMethod == 1 ? "微信支付":"免费获得"}}</div>
      </div>
      <div class="item">
        <div class="label">退款时间</div>
        <div class="data">{{orderDetailInfo.refundDate}}</div>
      </div>
    </div>

    <!-- 按钮样式 -->
    <div class="btn_box" v-if="orderDetailInfo.status==1">
      <button type="button" class="btn_left" @click="deletedOrder">取消订单</button>
      <button type="button" class="btn_right" @click="toPay()">去付款</button>
    </div>

    <div class="btn_box" v-else>
      <button type="button" class="btn_left" @click="deletedOrder">删除订单</button>
      <button type="button" class="btn_right" @click="goList">再去逛逛</button>
    </div>
  </div>
</template>

<script>
// import { Tab, TabItem } from 'vux'
import api from "fetch/api";
export default {
  name: "myOrderDetail",
  data() {
    return {
      orderId: null,
      pageData: {
        page: 1,
        size: 10,
        total: null
      },
      orderDetailInfo: {}
    };
  },
  components: {
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.getDetailList();
  },
  methods: {
    getDetailList() {
      api.pageStoreDetail({ orderId: this.orderId }).then(res => {
        this.orderDetailInfo = res.data;
      });
    },
    toPay() {
      // console.log("去支付");
      this.$router.push({name:"orderPay",query:{type:this.orderDetailInfo.channelType,courseId:this.orderDetailInfo.productId}})
    },
    deletedOrder() {
      // console.log("删除订单");
      let that = this
      api.myOrderDeleted({orderId:this.orderDetailInfo.id}).then(res=>{
				// console.log(res)
				if(res.success){
					that.$vux.toast.text("删除成功")
          setTimeout(() => {
            that.$router.push({name:"myOrder"})
          }, 1000);
				}
			})
    },
    goList() {
      // console.log("再去逛逛");
      this.$router.push({name:"home"})
    },
  }
};
</script>

<style lang="less" scoped>
.my_order_detail {
  height: 100%;
  font-size: 0.3rem;
  color: #333333;
  padding: 0 0.3rem;
  .order_state {
    font-size: 0.48rem;
    padding: 0.4rem 0 0.5rem;
  }

  .course_info,
  .same_box {
    border-bottom: 0.01rem solid #f8f8f8;
  }
  .course_info {
    font-size: 0.3rem;
    padding-bottom: 0.45rem;
    display: flex;
    justify-content: space-between;

    .left {
      .title {
        width: 4rem;
        height: 0.85rem;
        margin-bottom: 0.4rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        color: #fe8060;
      }
    }
    .right {
      width: 2.56rem;
      height: 1.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .same_box {
    padding-top: 0.35rem;
    .item {
      padding-bottom: 0.35rem;
      display: flex;
      justify-content: space-between;
      .label {
        font-size: 0.32rem;
      }
      .data {
        font-size: 0.28rem;
        color: #666666;
      }
      .active {
        color: #fe8060;
      }
    }
  }

  .btn_box {
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    button {
      width: 3.28rem;
      height: 0.96rem;
      text-align: center;
      border-radius: 0.08rem;
    }
    .btn_left {
      color: #6cddc7;
      border: 0.02rem solid #6cddc7;
      background: #ffffff;
    }
    .btn_right {
      background: #6cddc7;
    }
  }
}
</style>
