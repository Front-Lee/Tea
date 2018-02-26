<template>
  <div class="upgradeEnvelope">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="upgrade-title">猜红包</div>
    <div class="upgrade-explanation">促销产品为私人订制款，确定下单后不可退货</div>
    <div class="pro-list">
      <div class="pro-box">
        <div class="pro-price">{{data.origin_product.price_yh}}</div>
        <img class="pro-img" :src="data.origin_product.photo_x"/>
        <div class="pro-txt">{{data.origin_product.name}}</div>
      </div>
      <div class="pro-box">
        <div class="pro-price">{{data.up_product.price_yh}}</div>
        <img class="pro-img" :src="data.up_product.photo_x"/>
        <div class="pro-txt">{{data.up_product.name}}</div>
      </div>
    </div>
    <div class="main">
      <div class="explanation">
        <div class="explanation-title">请从下方选择一个红包</div>
        选择红包可随机获得升级前或升级后商品
      </div>
      <div class="red-bag-wrap">
        <div @click="is_animate_func('A')" :class="{ 'animated flip' : is_animateA }">
          <div :class="!is_animate_classA ? 'red-bag-check' : 'red-bag-checked'">{{is_animate_classA ? num : ''}}</div>
        </div>
        <div @click="is_animate_func('B')" :class="{ 'animated flip' : is_animateB }">
          <div :class="!is_animate_classB ? 'red-bag-check' : 'red-bag-checked'">{{is_animate_classB ? num : ''}}</div>
        </div>
      </div>
      <div class="jump-count">
        界面将于<span class="color-num">5</span>秒钟跳转到订单页面
        <router-link to="/order" class="jump-link">立即跳转</router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import {yuanAjax, getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'upgradeEnvelope',
    data() {
      return {
        propData: {
          title: '猜红包',
          link: ''
        },
        is_show_model: false,
        is_animateA: false,
        is_animateB: false,
        is_animate_classA: false,
        is_animate_classB: false,
        num: '',
        type: false,
        i:5,
        data:{
          up_product:{
            price_yh:''
          },
          origin_product: {
            price_yh:''
          }
        },

      }
    },
    components: {
      HeaderCon
    },
    methods: {
      is_animate_func(e){
        var _this = this;
        if (_this.num) {
          return false;
        }
        e == "A" ? _this.is_animateA = true : _this.is_animateB = true;
        yuanAjax(_this, 'api/Redbag/getRedbagResult', {
          uid: getCookie("chaUID"),
          order_sn: _this.$route.query.order_sn,
          pid: _this.$route.query.pid,
        }, function (res) {
          if (res.status == 1) {
            setTimeout(function () {
              _this.num = res.luck == 1 ? _this.data.up_product.price_yh : _this.data.origin_product.price_yh
              e == "A" ? _this.is_animate_classA = true : _this.is_animate_classB = true;
            }, 1000);
            setTimeout(function () {
              _this.$router.push({path: '/order'});
            },5000)
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      },
    },
    mounted: function () {
      var _this = this;
      yuanAjax(_this, 'api/Redbag/index', {
        uid: getCookie("chaUID"),
        order_sn: _this.$route.query.order_sn,
        pid: _this.$route.query.pid,
      }, function (res) {
        if (res.status == 1) {
          _this.data = res.data;
        } else {
          _this.$toast({
            message: res.err,
            duration: 1000
          });
        }
      })
    }

  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .upgradeEnvelope {
    width: 750px;
    min-height: 100vh;
    background: url(../assets/images/upgrade-bg.jpg) no-repeat;
    background-size: 100%;
    overflow: hidden;
    /*猜鸡藕*/
    .upgrade-title {
      width: 289px;
      height: 92px;
      font-size: 60px;
      margin: 64px auto 30px auto;
      color: #b16b2c;
      text-align: center;
      line-height: 92px;
      background: url(../assets/images/large-lace.png) no-repeat;
      background-size: cover;
    }
    /*说明*/
    .upgrade-explanation {
      min-height: 92px;
      font-size: 28px;
      padding: 0 30px;
      text-align: center;
      letter-spacing: 1px;
      line-height: 46px;
    }
    /* 两款产品 */
    .pro-list {
      width: 750px;
      height: 400px;
      margin-top: 15px;
      background: url(../assets/images/upgrade-sbg.png) no-repeat;
      background-size: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .pro-box {
      width: 280px;
      height: 100%;
      overflow: hidden;
    }
    .pro-price {
      width: 160px;
      height: 52px;
      text-align: center;
      line-height: 52px;
      border-radius: 50px;
      color: #fff49c;
      background: #e53f55;
      font-size: 36px;
      margin: 15px auto 18px auto;
    }
    .pro-img {
      width: 200px;
      height: 200px;
      margin: auto;
      display: block;
      border-radius: 8px;
    }
    .pro-txt {
      font-size: 24px;
      color: #fff;
      text-align: center;
      width: 100%;
      overflow: hidden;
      height: 65px;
      line-height: 65px;
    }
    .explanation {
      padding: 40px;
      text-align: center;
      color: #000;
      font-size: 28px;
      line-height: 50px;
      .explanation-title {
        font-size: 32px;
        color: #b77842;
      }
    }
    .red-bag-wrap {
      display: flex;
      padding: 0 56px;
      justify-content: space-around;
      .red-bag-check {
        width: 250px;
        height: 342px;
        background: url("../assets/images/redbag-check.png") no-repeat;
        background-size: cover;
      }
      .red-bag-checked {
        width: 250px;
        height: 342px;
        text-align: center;
        line-height: 335px;
        background: url("../assets/images/redbag-checked.png") no-repeat;
        background-size: cover;
        font-size: 55px;
        color: #eb2a32;
      }
    }
    .jump-count {
      margin: 24px 0;
      line-height: 50px;
      font-size: 28px;
      text-align: center;
      .color-num {
        color: #e53f55;
      }
      .jump-link {
        color: #e53f55;
        text-decoration: underline;
        display: block;
      }
    }
    .animated {
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    @-webkit-keyframes flip {
      from {
        -webkit-transform: perspective(0px) rotate3d(0, 1, 0, -360deg);
        transform: perspective(0px) rotate3d(0, 1, 0, -360deg);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      40% {
        -webkit-transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
        transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      50% {
        -webkit-transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
        transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      80% {
        -webkit-transform: perspective(0px) scale3d(0.95, 0.95, 0.95);
        transform: perspective(0px) scale3d(0.95, 0.95, 0.95);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      to {
        -webkit-transform: perspective(0px);
        transform: perspective(0px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }
    }

    @keyframes flip {
      from {
        -webkit-transform: perspective(0px) rotate3d(0, 1, 0, -360deg);
        transform: perspective(0px) rotate3d(0, 1, 0, -360deg);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      40% {
        -webkit-transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
        transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      50% {
        -webkit-transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
        transform: perspective(0px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      80% {
        -webkit-transform: perspective(0px) scale3d(0.95, 0.95, 0.95);
        transform: perspective(0px) scale3d(0.95, 0.95, 0.95);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      to {
        -webkit-transform: perspective(0px);
        transform: perspective(0px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }
    }

    .animated.flip {
      -webkit-backface-visibility: visible;
      backface-visibility: visible;
      -webkit-animation-name: flip;
      animation-name: flip;
    }
  }
</style>
