<template>
  <div class="container">
    <div class="shopOrder_tab_box">
      <tab custom-bar-width="1.12rem">
        <tab-item
          @on-item-click="onItemClick"
          v-for="(item,index) in tabArr"
          :key="index"
          :selected="index == tabActiveIndex?true:false"
        >{{item}}</tab-item>
      </tab>
    </div>
    <scroll :page="pageNum" :size="pageSize" :total="pageTotal" @change="pageChange" v-if="list.length > 0" style="margin-top:44px;">
      <div class="order_box" v-for="(item,index) in list" :key="index">
        <div class="order_item" @click="goDetail(item.id)">
          <div class="top">
            <div class="order_time">
              下单时间：
              <span>{{item.createDate}}</span>
            </div>
            <div
              :class="item.status==1?'normal':'active'"
            >{{item.status == 1?"待付款":item.status==2?"已支付":item.status==3?"已失效":"已退款"}}</div>
          </div>
          <div class="bottom">
            <div class="img">
              <img :src="item.productImage" alt>
            </div>
            <div class="info">
              <div class="title">{{item.productName}}</div>
              <div class="name">购买人：{{item.buyerName}}</div>
            </div>
            <div>￥{{item.payPrice}}</div>
          </div>
        </div>
      </div>
    </scroll>

    <!-- 无数据展示效果 -->
    <empty v-else :title="emtypJSON.title" :img="emtypJSON.img"></empty>
        
  </div>
</template>

<script>
import scroll from "module/scroll";
import empty from "module/empty";
import api from "fetch/api";
import { Tab, TabItem } from "vux";
export default {
  name: "shopOrder",
  data() {
    return {
      msg: "shopOrder",
      tabArr: ["普通订单", "分享订单", "拼课订单", "赠送订单"],
      tabActiveIndex: 0,
      list: [],
      pageNum: 1,
      pageSize: 5,
      pageTotal: null,
      emtypJSON: {
        title: "暂无订单~快去逛逛吧！",
        img: require("@/assets/images/noContent/no_order.png")
      }
    };
  },
  components: {
    Tab,
    TabItem,
    scroll,
    empty,
  },
  methods: {
    onItemClick(index) {
      //Tab 事件
      this.tabActiveIndex = index;
      this.pageNum = 1;
      this.getList();
    },
    getList() {
      let params = {
        page: this.pageNum,
        size: this.pageSize,
        channelType: this.tabActiveIndex + 1 == 2?4:this.tabActiveIndex + 1 == 4?2:this.tabActiveIndex + 1
      };
      api.pageStoreOrder(params).then(res => {
        this.pageTotal = res.data.total;
        if (this.pageNum == 1) {
          this.list = res.data.list;
        } else {
          this.list = [...this.list, ...res.data.list];
        }
      });
    },
    goDetail(orderId) {
      //进入 订单详情
      this.$router.push({
        name: "shopOrderDetail",
        query: { orderId: orderId }
      });
    },
    pageChange(page) {
      this.pageNum = page;
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .shopOrder_tab_box {
    z-index: 9999;
    width: 100%;
    position: fixed;
    top:0;
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    .vux-tab-wrap {
      width: 100%;
      .vux-tab .vux-tab-item {
        background: none;
      }
      .vux-tab .vux-tab-item.vux-tab-selected {
        // font-size: 0.36rem;
      }
    }
  }
  .order_box {
    overflow: hidden;
    height: 100%;
    padding: 0 0.3rem;
    .order_item {
      font-size: 0.3rem;
      border-bottom: 1px solid #eeeeee;
      padding: 0.4rem 0;
      .top,
      .bottom {
        display: flex;
        justify-content: space-between;
      }
      .top {
        padding-bottom: 0.4rem;
        .order_time {
          color: #666666;
        }
        .active {
          color: #999999;
        }
        .normal {
          color: #fe8060;
        }
      }
      .bottom {
        color: #333333;
        .img {
          width: 1.6rem;
          height: 1.6rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          .title {
            width: 3.5rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .name {
            font-size: 0.28rem;
            color: #999999;
            margin-top: 0.35rem;
          }
        }
      }
    }
  }
  
  empty{
    flex:1,
  }
}
</style>