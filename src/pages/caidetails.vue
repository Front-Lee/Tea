<template>
  <div class="details">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="details-banner">
      <mt-swipe :auto="4000" class="details-wrap">
        <mt-swipe-item v-for="(item, index) in pro.img_arr" :key="index">
          <img :src="item" alt="" class="details-img">
        </mt-swipe-item>
      </mt-swipe>
      <router-link to="/upgrade-rule" class="rule">规则</router-link>
    </div>
    <div class="banner-msg">
      <div class="banner-name">{{ pro.name }}</div>
      <div class="banner-middle">
        <div class="banner-price">￥{{ pro.price_yh }}</div>
        <div class="banner-inventory">库存： {{ pro.num }}</div>
      </div>
      <div class="banner-bottom">运费：10.0（每增加一件加3.0元）</div>
    </div>
    <div class="details-exhibition">
      <div class="exhibition-title">商品详情</div>
      <div v-html="pro.content"></div>
    </div>
    <!--底部内容-->
    <div class="bottom">
      <div :class="['collect' , { collected : is_collect} ]" @click="addFavorites">收藏</div>
      <div class="balance">账户余额：{{ pro.user_balance }}</div>
      <mt-button class="buy-btn" @click="buyone">立即购买</mt-button>
    </div>
    <!--浮层-->
    <mt-popup
      v-model="popupVisible2"
      position="bottom"
      id="popup2"
    >
      <div class="drawer_attr_box">
        <div @click="close_icon" class="close_icon">x</div>
        <div class="drawer_attr_content">
          <div class="text_center">
            <img :src="pro.photo_x" alt="">
            <div class="mingcheng">
              <div
                style="font-size:16px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">
                {{ pro.name}}
              </div>
              <div style="font-size:14px;color:#ff5267;margin-top: 5px;">¥ {{ pro.price_yh}}</div>
              <div style="ffont-size:13px;color:#999;margin-top: 5px;">库存：{{ pro.num}}</div>
            </div>
          </div>
          <div class="commodity_attr_list"></div>
          <div class="shu">
            <span class="cun">数量</span>
          </div>
          <div class="dian">
            <div class="stepper">
              <span @click="changeNum(1)">-</span>
              <div class="nownum">{{ buynum }}</div>
              <span @click="changeNum(2)" class="normal">+</span>
            </div>
          </div>
          <div class="footc" @click="buyClick">立即购买</div>
        </div>
      </div>
    </mt-popup>
    <!--弹出窗口-->
    <mt-popup v-model="popupVisible">
      <div class="msg-box">
        <div class="msg-close" @click="closeBox"></div>
        <div class="msg-title">下单成功</div>
        <div class="msg-txt">可免费升级为价值<span>699</span>元的商品</div>
        <div class="msg-links">
          <router-link :to="{path:'/pay',query: {pid: pid, num: buynum, paytype: 'cai' }}" class="msg-link">立即提货</router-link>
          <a class="msg-link" @click="caiClick">猜奇偶</a>
          <a @click="hongClick" class="msg-link">猜红包</a>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {yuanAjax, getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';

  export default {
    name: 'detailsPage',
    data() {
      return {
        propData: {
          title: '商品详情',
          link: ''
        },
        pid: '',
        popupVisible: false,
        popupVisible2: false,
        pro: [],
        is_collect: false, //是否收藏
        buynum: 1,
        order_sn: ''
      }
    },
    components: {
      HeaderCon
    },
    methods: {
      //一次点击
      buyone () {
        var _this = this;
        if (parseFloat(_this.pro.user_balance) < parseFloat(_this.pro.price)) {
          _this.$toast({
            message: '请先充值',
            duration: 1000,
          });
          setTimeout(function () {
            _this.$router.push({path: '/recharge'});
          }, 1200);

          return false;
        }
        this.popupVisible2 = true;
      },
      // 点击购买
      buyClick(){
        var _this = this;
        _this.paynow();
      },
      // 猜猜猜 , 先调用付款页面
      paynow() {
        var _this = this;
        yuanAjax(_this, 'Api/Payment/pay_now', {
          uid: getCookie('chaUID'),
          sid: 0,
          order_type: 2,
          paytype: 'balance',
          pid: _this.$route.query.id,
          price: _this.pro.price_yh,
          aid: 0,
          remark: 0,
          num: _this.buynum,
          total: _this.buynum * _this.pro.price_yh,
          buff: 0,
        }, function (res) {
          if (res.status == 1) {
            _this.popupVisible2 = false;
            _this.order_sn = res.arr.order_sn;
            _this.$toast({
              message: '下单成功',
              duration: 1000,
            });
            setTimeout(function () {
              _this.popupVisible = true;
            }, 1500);
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      },
      //点击进入猜
      caiClick() {
        var _this = this;
        _this.$router.push({path: `/upgrade?pid=${_this.$route.query.id}&order_sn=${_this.order_sn}`});
      },
      hongClick(){
        var _this = this;
        _this.$router.push({path: `/upgradeEnvelope?pid=${_this.$route.query.id}&order_sn=${_this.order_sn}`});
      },
      closeBox(){
        this.popupVisible = false;
      },
      //数量加减
      changeNum(type) {
        var _this = this;
        if (type == 1) {
          if (_this.buynum <= 1) {
            _this.buynum = 1;
          } else {
            _this.buynum -= 1;
          }
        } else {
          _this.buynum += 1;
        }
      },
      // 关闭浮层
      close_icon () {
        var _this = this;
        _this.popupVisible2 = false;
      },
      //收藏
      addFavorites () {
        var _this = this;
        yuanAjax(_this, 'Api/Product/col', {
          uid: getCookie('chaUID'),
          pid: _this.$route.query.id,
        }, function (res) {
          if (res.status) {
            _this.is_collect = !_this.is_collect
          }
        })
      },
    },
    mounted: function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      var _this = this;
      _this.pid = _this.$route.query.id;
      yuanAjax(_this, 'Api/Product/index', {
        pro_id: _this.$route.query.id,
        uid: getCookie('chaUID')
      }, function (res) {
        if (res.status == 1) {
          _this.pro = res.pro,
            _this.is_collect = (res.pro.collect == 1 ) ? true : false
        }
        else {
          //提示 返回
        }
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .details {
    padding-bottom: 90px;
    .details-banner {
      position: relative;
      .details-wrap {
        width: 750px;
        height: 750px;
        border-bottom: 1px solid #e8e6e7;
      }
      .details-img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .mint-swipe-indicator {
        background: #fff;
        opacity: 0.6;
        width: 16px;
        height: 16px;
        border: 2px solid #ddd;
      }
      .mint-swipe-indicator.is-active {
        background: #ab5a0a;
        opacity: 0.8;
        border: 2px solid #fff;
      }
      .rule {
        position: absolute;
        left: 0;
        top: 300px;
        width: 24px;
        padding: 20px 18px;
        height: 100px;
        line-height: 32px;
        background: rgba(229, 63, 85, 0.8);
        border-radius: 0 15px 15px 0;
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
      .rule:before {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        margin: 8px auto;
        background: url(../assets/images/icon-question.png) no-repeat;
        background-size: cover;
      }
    }
    .banner-msg {
      width: 750px;
      background: #fff;
      padding: 22px 0;
      .banner-name {
        color: #000;
        height: 104px;
        line-height: 52px;
        padding: 0 28px;
        overflow: hidden;
        font-size: 34px;
      }
      .banner-middle {
        display: flex;
        padding: 0 36px 0 22px;
        height: 70px;
        justify-content: space-between;
      }
      .banner-price {
        color: #ff5267;
        font-size: 42px;
        line-height: 70px;
      }
      .banner-inventory {
        color: #999;
        font-size: 26px;
        line-height: 70px;
      }
      .banner-bottom {
        color: #999;
        font-size: 26px;
        height: 40px;
        line-height: 40px;
        padding: 0 28px;
      }
    }
    .details-exhibition {
      margin-top: 18px;
      .exhibition-title {
        height: 88px;
        background: #fff;
        line-height: 88px;
        font-size: 28px;
        color: #000;
        text-align: center;
      }
      .exhibition-img {
        width: 100%;
        display: block;
      }
    }
    .bottom {
      height: 90px;
      background: #fff;
      display: flex;
      position: fixed;
      bottom: 0;
      z-index: 999;
      width: 750px;
      justify-content: space-between;
      .collect {
        border-right: 1px solid #dadada;
        width: 149px;
        color: #999;
        font-size: 24px;
        text-align: center;
      }
      .balance {
        color: #c61724;
        width: 322px;
        text-align: right;
        line-height: 90px;
        font-size: 24px;
      }
      .buy-btn {
        border: 0;
        background: #c61724;
        width: 225px;
        height: 100%;
        color: #fff;
        font-size: 26px;
      }
      .collect:before {
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        margin: 10px auto 0 auto;
        background: url(../assets/images/collect-icon.png) no-repeat;
        background-size: cover;
      }
      .collected:before {
        background: url(../assets/images/collect-icon-active.png) no-repeat;
        background-size: cover;
      }
    }
    .msg-box {
      width: 610px;
      height: 260px;
      background: #fff;
      box-sizing: border-box;
      margin: 0 20px;
      text-align: center;
      /*position: relative;*/
      .msg-title {
        font-size: 32px;
        color: #b16b2c;
        line-height: 70px;
      }
      .msg-txt {
        font-size: 28px;
        color: #000;
        line-height: 82px;
        span {
          color: #ad090b;
        }
      }
      .msg-links {
        display: flex;
        justify-content: space-between;
        .msg-link {
          width: 170px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          color: #fff;
          font-size: 28px;
          border-radius: 10px;
          margin: 20px 0;
        }
        .msg-link:nth-of-type(1) {
          background: #b16b2c;
        }
        .msg-link:nth-of-type(2) {
          background: #ad090b;
        }
        .msg-link:nth-of-type(3) {
          background: #ad090b;
        }
      }
      .msg-close {
        width: 60px;
        height: 60px;
        background: url(../assets/images/msg-close.png) no-repeat;
        background-size: cover;
        position: absolute;
        right: -26px;
        top: -26px;
      }
    }
    #popup2{
      width: 100%;
    }
    .mint-popup {

    }
    .drawer_attr_box {
      width: 100%;
      .text_center {
        height: 250px;
        border-bottom: 1px solid gray;
        img {
          display: block;
          float: left;
          width: 30%;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: -7%;
        }
        .mingcheng {
          float: left;
          width: 55%;
          height: 250px;
          div {
            margin: 15px 0;
          }
        }

      }
      .close_icon {
        width: 3%;
        position: absolute;
        right: 0;
      }
      .drawer_attr_content {
        padding-top: 20px;
        .shu {
          display: inline-block;
          padding: 3% 5%;
        }
        .dian {
          display: inline-block;
          width: 60%;
          .stepper {
            width: 25%;
            border-radius: 15px;
            background: #e1e1e1;
            span, .nownum {
              display: inline-block;
            }
            .nownum {
              padding: 0 10px;
            }
            span {
              width: 30px;
              height: 30px;
              border: 1px solid #000;
              border-radius: 15px;
              text-align: center;
              justify-content: center;
              background: #fff;
            }
          }

        }
        .footc {
          background: red;
          color: white;
          font-size: 16px;
          text-align: center;
          padding: 20px 0;
        }
      }
    }
  }
</style>
