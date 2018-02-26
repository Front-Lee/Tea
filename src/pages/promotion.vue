<template>
  <div class="promise">
    <div class="sales-banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          {{ item.photo }}
          <img :src="item.photo" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <router-link to="/upgradeList" class="ranking">榜单</router-link>
    </div>
    <div class="sales-section">
      <mt-navbar v-model="selected">
        <mt-tab-item id="sales-tab-a">精品升值</mt-tab-item>
        <mt-tab-item id="sales-tab-b">超值购</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <!-- id=sales-tab-a 精品升级-->
        <mt-tab-container-item id="sales-tab-a"
        >
          <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="20"
          >
            <div class="pro-list"
                 v-for="(pro,index) in porList"
                 :key="index"
            >
              <!--<div class="sales-active-logo"  :style='"top:"+(Number(5.2*index)+1.733)+"rem"'></div>-->
              <div class="sales-active-logo">立省{{pro.levelto.price - pro.origin.price}}元</div>
              <router-link :to="{path:'/caidetails', query: {id: pro.origin.id}}" class="pro-box">
                <div class="pro-price">{{pro.origin.price_yh}}</div>
                <img :src="pro.origin.photo_x" alt="" class="pro-img">
                <div class="pro-text">{{pro.origin.name}}</div>
              </router-link>

              <router-link :to="{path:'/detailsPage', query: {id: pro.levelto.id}}" class="pro-box">
                <div class="pro-price">{{pro.levelto.price_yh}}</div>
                <img :src="pro.levelto.photo_x" alt="" class="pro-img">
                <div class="pro-text">{{pro.levelto.name}}</div>
              </router-link>
            </div>
          </div>

        </mt-tab-container-item>
        <!-- id=sales-tab-b 超值购-->
        <mt-tab-container-item id="sales-tab-b">
          <div class="pro-list2"
          >
            <router-link :to="{path:'/detailsPage', query: {id: pro.id}}" class="pro-box2"
                         v-for="(pro,index) in superList" :key="index">
              <!--<div class="pro-price">{{pro.price}}</div>-->
              <img :src="pro.photo_x" alt="" class="pro-img">
              <div class="pro-text">{{pro.name}}</div>
              <div class="pro-price">{{pro.price_yh}} <span class="pro-old-price">{{pro.price}}</span></div>
            </router-link>

          </div>
        </mt-tab-container-item>

      </mt-tab-container>
      <!--<mt-button class="see-more">查看更多</mt-button>-->
    </div>
    <FooterCon></FooterCon>
  </div>
</template>

<script>
  import {yuanAjax} from '../js/common.js';
  import FooterCon from '@/components/FooterCon' //公用footer tabBar
  export default {
    name: 'promise',
    data(){
      return {
        bannerList: [
          {imgUrl: "banner.jpg"},
          {imgUrl: "banner3.jpg"},
          {imgUrl: "banner3.jpg"},
          {imgUrl: "banner3.jpg"}
        ],
        selected: "sales-tab-a",
        navList: [
          {
            title: "精品升值",
            selected: "sales-tab-a",
          },
          {
            title: "超值购",
            selected: "sales-tab-b",
          }
        ],
        porList: [], //精品升级
        superList: [], //超值购
        page: 1,
        superpage: 1,
        hasloadMore: false,
        hasloadMore2: false
      }
    },
    components: {
      FooterCon
    },

    methods: {
      //获取精品升级
      getpro () {
        var _this = this;
        _this.hasloadMore = false;
        yuanAjax(_this, 'Api/Product/index_uplevel', {
          cate_id: 0,
          page: _this.page
        }, function (res) {
          if (res.status == 1) {
            _this.bannerList = res.adlist;
            if (res.prolist.length != 0) {
              _this.hasloadMore = true;
              _this.page++;
            } else if (res.prolist.length == 0 && !_this.hasloadMore) {
              _this.$toast({
                message: '没有更多数据',
                duration: 1000
              });
            }
            _this.porList = _this.porList.concat(res.prolist);
          }
        })
      },
      //获取超级购
      super_loadMore(bool) {
        var _this = this;
        _this.hasloadMore2 = bool || false;
        yuanAjax(_this, 'Api/product/getBargainGoods', {
          cate_id: 0,
          page: _this.superpage
        }, function (res) {
          if (res.status == 1) {
            if (res.prolist.length != 0) {
              _this.hasloadMore2 = true;
              _this.superpage++;
            } else if (res.prolist.length == 0 && !_this.hasloadMore2) {
              _this.$toast({
                message: '没有更多数据',
                duration: 1000
              });
            }
            _this.superList = _this.superList.concat(res.prolist);
          }
        })
      },
      // 底部无限加载
      loadMore () {
        var _this = this;
        if (_this.selected == 'sales-tab-a') {
          if (_this.hasloadMore) {
            _this.getpro();
          }
        }
        else if (_this.selected == 'sales-tab-b') {
          if (_this.hasloadMore2) {
            _this.super_loadMore();
          }
        }
      },
    },
    // 键是需要观察的表达式, 值是回调函数、数组或者对象, watch会在实例实例化时调用,遍历watch对象的每一个属性
    watch: {
      //监听 - 导航selected值改变
      selected: function (val, oldVal) {
        if (val == 'sales-tab-b') {
          var _this = this;
          _this.super_loadMore(true);
        }
      }
    },
    mounted: function () {
      var _this = this;
      _this.getpro(); //获取精品升级
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .promise {
    padding-bottom: 97px;
    .sales-banner {
      position: relative;
      height: 408px;
      img {
        width: 100%;
        height: 408px;
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
    }
    /*.theme{  width:750px;height:408px;position:relative;}*/
    /*.theme-img{width:750px;height:408px;}*/
    .ranking {
      position: absolute;
      left: 0;
      top: 200px;
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
    .ranking:before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      margin: 8px auto;
      background: url(../assets/images/icon-ranking.png) no-repeat;
      background-size: cover;
    }
  }

  .sales-section {
    .mint-navbar {
      height: 80px;
    }
    .mint-tab-item {
      height: 80px;
      box-sizing: border-box;
      padding: 0;
    }
    .mint-tab-item-label {
      font-size: 30px;
      display: inline-block;
      height: 80px;
      line-height: 80px;
      box-sizing: border-box;
    }
    .mint-tab-item.is-selected {
      color: #e53f55;
      border: 0;
    }
    .mint-tab-item.is-selected .mint-tab-item-label {
      border-bottom: 4px solid #e53f55;
      padding: 0 12px;
    }

    .mint-tab-container-item {
      width: 100%;
      background: url(../assets/images/sales-pro-bbg.png) repeat-y;
      background-size: 100%;
    }
    .pro-list {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      padding: 0 20px;
      margin: auto;
      background: url(../assets/images/sales-pro-sbg.png) repeat-y;
      background-size: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .sales-active-logo {
      position: absolute;
      width: 200px;
      height: 100px;
      left: 50%;
      top: 34%;
      margin-left: -100px;
      background: url(../assets/images/sales-pro-lace.png) no-repeat;
      background-size: 100%;
      color: #c51825;
      font-size: 36px;
      text-align: center;
      line-height: 85px;
    }
    .pro-box {
      height: 350px;
      margin: 20px 0;
      width: 280px;
      box-sizing: border-box;
      text-align: center;
      .pro-img {
        width: 200px;
        height: 200px;
        display: block;
        margin: auto;
        border-radius: 15px;
      }
      .pro-price {
        margin: 20px auto;
        height: 50px;
        line-height: 50px;
        width: 160px;
        font-size: 36px;
        color: #fff49c;
        background: #e53f55;
        border-radius: 50px;
      }
      .pro-text {
        height: 50px;
        margin-top: 10px;
        overflow: hidden;
        line-height: 50px;
        font-size: 24px;
        color: #fff;
      }

    }
    .see-more {
      width: 400px;
      height: 78px;
      line-height: 78px;
      background: rgba(0, 0, 0, 0);
      border: 2px solid #b16b2c;
      color: #b16b2c;
      font-size: 26px;
      display: block;
      margin: 40px auto;
      border-radius: 10px;
      text-align: center;
    }
    .mint-tab-container-item .pro-list:last-child {
      margin-bottom: 30px;
    }
    .pro-list2 {
      width: 750px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 3px 0 3px;
      .pro-box2 {
        width: 360px !important;
        img {
          display: block;
          width: 100%;
          margin: auto;
        }
        .pro-text {
          font-size: 26px;
          color: #000;
          height: 80px;
          line-height: 40px;
          overflow: hidden;
          padding: 0 20px 0 25px;
          margin-top: 14px;
        }
        .pro-price {
          padding-left: 20px;
          font-size: 36px;
          color: #c51825;
          height: 58px;
          line-height: 58px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
        }
        .pro-old-price {
          text-decoration: line-through;
          font-size: 24px;
          color: #ccc;
          text-align: left;
          width: 170px;
          line-height: 63px;
        }
      }
    }

  }
</style>
