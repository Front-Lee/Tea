<template>
  <div class="order">
    <!--顶部nav-->
    <div class="order-nav">
      <mt-navbar v-model="selected">
        <mt-tab-item :id="item.selected" v-for="(item,index) in navList" :key="index">{{item.t}}</mt-tab-item>
      </mt-navbar>
    </div>
    <!--内容部分-->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item :id="selected">
        <div class="order-box" v-for="(box,index) in orderList" :key="index">
          <div class="order-top">
            <div class="order-date">{{box.date}}</div>
            <div class="order-state">
              <span v-if="box.order_type == 1">【普通订单】</span>
              <span v-if="box.order_type == 2">【猜鸡藕订单】</span>
              <span v-if="box.order_type == 3">【积分订单】</span>
              {{box.order_status}}
            </div>
          </div>
          <div class="order-con">
            <img :src="box.pinfo.photo_x" alt="" class="order-img">
            <div class="order-message">
              <div class="order-text">{{box.pinfo.name}}</div>
              <div class="order-price">￥{{box.pinfo.price_yh}}</div>
              <div class="order-many">数量： {{box.product_num}}</div>
              <div class="order-total">总计:<span class="order-total-num">{{box.product_num * box.pinfo.price_yh }}</span>
              </div>
            </div>
          </div>
          <div class="order-bottom">
            <div v-if="box.status == 30 || box.receiver != '' " :class="detailState?'triangle-up':'triangle-down'"
                 class="order-detail-title" @click="detailClick">详情信息
            </div>
            <div v-else class="order-detail-title" @click="detailClick"></div>
            <div class="order-operate">
              <mt-button v-if="box.show_tuihuo_btn">退货</mt-button>
              <mt-button v-if="box.show_jifen_btn">兑换积分</mt-button>
              <mt-button v-if="box.show_tihuo_btn">提货</mt-button>
              <mt-button v-if="box.show_uplevel_btn">升级</mt-button>
            </div>
          </div>
          <!--detailState-->
          <div class="order-detail" v-if="box.status == 30 || box.receiver != '' ">
            <ul>
              <li><span class="order-detail-dt">订单编号：</span>
                <div class="order-detail-dd">{{ box.order_sn}}</div>
              </li>
              <li><span class="order-detail-dt">快递单号：</span>
                <div class="order-detail-dd">{{ box.kuaidi_num }}</div>
              </li>
              <li><span class="order-detail-dt">快递公司：</span>
                <div class="order-detail-dd">{{ box.kuaidi_name }}</div>
              </li>
              <li><span class="order-detail-dt">收货信息：</span>
                <div class="order-detail-dd">
                  <sapn>{{ box.receiver}} {{box.tel}}</sapn>
                  {{box.address_xq}}
                </div>
              </li>
              <li v-if="box.order_type == 2  && box.luck == 1">
                <span class="order-detail-dt">升级前：</span>
                <div class="order-detail-dd">
                  <img :src=" box.o_pinfo.photo_x" alt="" class="order-detail-img">
                  <div class="order-detail-msg">
                    <div class="order-detail-text">{{ box.o_pinfo.name }}</div>
                    <div class="order-detail-price">￥{{ box.o_pinfo.price_yh}} 数量：{{box.product_num}} 总计：{{ box.o_price
                      }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="orderList.length <= 0" class="notData">
          暂无数据
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <FooterCon></FooterCon>
  </div>
</template>
<script>
  import {yuanAjax,getCookie} from '../js/common.js';
  import FooterCon from '@/components/FooterCon' //公用footer tabBar
  export default {
    name: 'order',
    data() {
      return {
        detailState: false,
        onOff: true,
        selected: "all",
        navList: [
          {
            t: '全部',
            selected: 'all'
          },
          {
            t: '待付款',
            selected: 'pay'
          },
          {
            t: '待发货',
            selected: 'deliver'
          },
          {
            t: '待收货',
            selected: 'receive'
          },
          {
            t: '待评价',
            selected: 'evaluate'
          },
          {
            t: '交易完成',
            selected: 'finish'
          }
        ],
        orderList: []
      }
    },
    components: {
      FooterCon
    },
    watch: {
      selected: function (val, oldVal) {
        var _this = this;
        _this.selected = val;
        if (val == 'all') {
          _this.allData();
        } else {
          _this.getType();
        }
      }
    },
    methods: {
      detailClick(){
        if (this.onOff) {
          this.detailState = true;
          this.onOff = false;
        } else {
          this.detailState = false;
          this.onOff = true;
        }
      },
      // 全部
      allData () {
        var _this = this;
        yuanAjax(_this, 'Api/User/order_list', {
          userId: getCookie('chaUID')
        }, function (res) {
          if (res.status == 1) {
            if (res.order_list) {
              _this.orderList = res.order_list
            }
          }
        })
      },
      //其他类型
      getType () {
        var _this = this;
        _this.orderList = [];
        yuanAjax(_this, 'Api/Order/index', {
          uid: getCookie('chaUID'),
          order_type: _this.selected
        }, function (res) {
          console.log(_this.orderList);
          if (res.status == 1) {
            if (res.order_list) {
              _this.orderList = res.order_list
            }
          }
        })
      }
    },
    mounted: function () {
      var _this = this;
      _this.allData();
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .order {
    padding: 81px 0 97px 0;
    position: relative;
    .order-nav {
      position: fixed;
      top: 0;
      background: #fff;
      .mint-navbar {
        width: 750px;
        overflow: auto;
        border-bottom: 1px solid #d7d2d0;
        padding: 0 12px;
        box-sizing: border-box;
        box-shadow: 0 10px 5px  -5px #f9f9f9 inset;
      }
      .mint-navbar .mint-tab-item {
        min-width: 156px;
        height: 80px;
        padding: 0;
      }
      .mint-navbar .mint-tab-item.is-selected {
        color: #e53f55;
        border: 0;
      }
      .mint-tab-item-label {
        font-size: 28px;
        display: inline-block;
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
      }
      .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
        border-bottom: 3px solid #e53f55;
        padding: 0 12px;
      }
    }
    .order-box {
      min-height: 435px;
      background: #fff;
      margin-top: 20px;
      .order-top {
        padding: 0 30px;
        box-sizing: border-box;
        height: 88px;
        line-height: 88px;
        border-bottom: 1px solid #e7e6e6;
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        .order-date {
          color: #666;
        }
        .order-state {
          color: #fc001d;
        }
      }
      .order-con {
        padding: 30px 30px 28px 30px;
        box-sizing: border-box;
        display: flex;
        .order-img {
          width: 200px;
          height: 200px;
          border: 1px solid #d7d2d0;
          border-radius: 10px;
        }
        .order-message {
          margin-left: 32px;
        }
        .order-text {
          height: 88px;
          line-height: 44px;
          font-size: 28px;
          width: 440px;
          /*overflow: hidden;*/
        }
        .order-price, .order-many {
          display: inline-block;
          height: 68px;
          line-height: 68px;
          color: #999;
        }
        .order-price {
          font-size: 30px;
          margin-right: 30px;
        }
        .order-many {
          font-size: 24px;
        }
        .order-total {
          text-align: right;
          font-size: 30px;
          height: 44px;
          line-height: 44px;
        }
        .order-total-num {
          color: #fc001d;
          display: inline-block;
          min-width: 90px;
        }
      }
      .order-bottom {
        height: 86px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        button {
          background: transparent;
          height: 65px;
          padding: 0 38px;
          font-size: 26px;
          color: #666;
          border: 2px solid #cfcdce;
          border-radius: 10px;
          margin-left: 16px;
        }
        .order-detail-title {
          height: 100%;
          line-height: 100px;
          font-size: 24px;
          color: #bbb;
          position: relative;
        }
        button.active {
          border: 2px solid #fc001d;
          color: #fc001d;
        }
        .triangle-down:after {
          position: absolute;
          right: -25px;
          top: 45px;
          display: block;
          margin-left: 11px;
          content: "";
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-top: 11px solid #bbb;
        }
        .triangle-up:after {
          position: absolute;
          right: -25px;
          top: 34px;
          display: block;
          margin-left: 11px;
          content: "";
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #bbb;
          border-top: 11px solid transparent;
        }
      }
      .order-detail {
        border-top: 1px solid #eee9e6;
        font-size: 24px;
        color: #666;
        ul {
          padding: 12px 30px 14px 30px;
          li {
            min-height: 42px;
            line-height: 42px;
            display: flex;
          }
        }
        .order-detail-dt {
          min-width: 120px;
          text-align: left;
        }
        .order-detail-dd {
          display: flex;
        }
        .order-detail-img {
          width: 80px;
          height: 80px;
          border: 1px solid #eee9e6;
          border-radius: 10px;
          margin-right: 8px;
        }
        .order-detail-text {
          color: #000;
          width: 360px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 40px;
        }
        .order-detail-price {
          color: #ff2741;
        }
      }
    }
    .notData {
      width: 100%;
      text-align: center;
      margin-top: 45%;
      font-size: 40px;
    }
  }
</style>
