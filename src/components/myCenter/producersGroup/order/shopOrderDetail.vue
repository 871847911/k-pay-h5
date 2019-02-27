<template>
  <div class="container">
    <div class="part_top">
      <h3>{{orderDetailInfo.status==1?"待付款":orderDetailInfo.status==2?"已付款":orderDetailInfo.status==3?"已失效":"已退款"}}</h3>
      <!-- 课程相关没有对应数据 -->
      <div class="course_info">
        <div class="left">
          <div class="title">{{orderDetailInfo.productName}}</div>
          <div class="price">￥{{orderDetailInfo.payPrice}}</div>
        </div>
        <div class="right">
          <img :src="orderDetailInfo.productImage" alt>
        </div>
      </div>

      <div class="same_box">
        <div class="item">
          <div class="label">订单编号</div>
          <div class="data">{{orderDetailInfo.orderNumber}}</div>
        </div>
        <div class="item">
          <div class="label">生成时间</div>
          <div class="data">{{orderDetailInfo.createDate}}</div>
        </div>
      </div>

      <div class="same_box">
        <div class="item">
          <div class="label">商品价格</div>
          <div class="data">￥{{orderDetailInfo.payPrice}}</div>
        </div>
        <div class="item">
          <div class="label">订单类型</div>
          <div
            class="data"
          >{{orderDetailInfo.channelType == 1?"普通订单":orderDetailInfo.channelType == 4?"分享订单":orderDetailInfo.channelType == 3?"拼课订单":"赠送订单"}}</div>
        </div>
        <div class="item">
          <div class="label">用户</div>
          <div class="data">{{orderDetailInfo.buyerName}}</div>
        </div>
      </div>
    </div>

    <!-- 分享订单 -->
    <div class="part_bottom" v-if="orderDetailInfo.channelType == 4">
      <div class="same_box">
        <div class="item">
          <div class="label">分享进度</div>
          <div class="data">{{orderDetailInfo.nowNum}}/{{orderDetailInfo.maxNum}}</div>
        </div>
        <div class="item">
          <div class="label">已享受优惠</div>
          <div class="data">{{orderDetailInfo.discount}}折</div>
        </div>
      </div>
    </div>

    <!-- 拼课订单 -->
    <div class="part_bottom" v-if="orderDetailInfo.channelType == 3">
      <div class="same_box">
        <div class="item">
          <div class="label">开团时间</div>
          <div class="data">{{orderDetailInfo.startDate}}</div>
        </div>
        <div class="item">
          <div class="label">散团截止时间</div>
          <div class="data">{{orderDetailInfo.stopDate}}</div>
        </div>
        <div class="item">
          <div class="label">团有效期</div>
          <div class="data">{{orderDetailInfo.validity}}小时</div>
        </div>
        <div class="item">
          <div class="label">成团人数</div>
          <div class="data">{{orderDetailInfo.sumNum}}人</div>
        </div>
        <div class="item">
          <div class="label">参团顺序</div>
          <div class="data">第{{orderDetailInfo.degreeNum}}位</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "fetch/api";
export default {
  name: "shopOrderDetail",
  data() {
    return {
      msg: "shopOrderDetail",
      orderId: null,
      orderDetailInfo: {}
    };
  },
  components: {},
  computed: {},
  methods: {
    getOrderDetail() {
      api.pageStoreDetail({ orderId: this.orderId }).then(res => {
        this.orderDetailInfo = res.data;
      });
    }
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.getOrderDetail();
  }
};
</script>

<style scoped lang="less">
.container {
  background: #ffffff;
  color: #333333;
  .part_top,
  .part_bottom {
    padding: 0 0.3rem;
  }
  .part_top .same_box,
  .part_bottom .same_box {
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
  .part_top {
    border-bottom: 0.1rem solid #f8f8f8;
    h3 {
      padding: 0.4rem 0 0.5rem 0;
    }
    .course_info,
    .same_box {
      border-bottom: 1px solid #f8f8f8;
    }
    .same_box:nth-last-child(1) {
      border: none;
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
  }

  .part_bottom {
  }
}
</style>