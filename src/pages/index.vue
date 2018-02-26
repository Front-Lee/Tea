<template>
  <div class="index-wrap">
    <!--顶部通知-->
    <div class="notify">
      <div class="notify-wrap">
        <div :class=" notifyAnimate ?'notify-move': 'notify-fixed'" :ref="item.dataId" v-for="(item,index) in notifyId">
          <div class="notify-txt" v-for="(val,index) in notify" :key="index">{{val.content}}</div>
        </div>
      </div>
    </div>

    <!--轮播图-->
    <mt-swipe :auto="autoTime">
      <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img @click="click_banner(item.type, item.id)" :src="item.photo" data-type="item.type" data-id="item.id">
      </mt-swipe-item>
    </mt-swipe>
    <!--应用中心-->
    <div class="appcenter">
      <router-link to="/class" class="center-a">分类</router-link>
      <router-link to="/auction" class="center-b">积分</router-link>
      <a @click="dosign" class="center-c">签到</a>
      <router-link to="/recharge" class="center-d">充值</router-link>
      <router-link to="/live" class="center-e">爱拍</router-link>
    </div>
    <!--广告-->
    <div class="advertisement">
      <router-link to="/promotion" class="ad-upgrade"></router-link>
      <router-link to="/live" class="ad-auction"></router-link>
    </div>
    <!--广告下方四款产品-->
    <div class="ProA" v-if="proAList.length != 0">
      <div class="pro-list">
        <router-link :to="{path:'/detailsPage', query: {id: item.id}}" class="pro-box" v-for="(item,index) in proAList"
                     :key="index">
          <img :src="item.photo_x" alt="" class="pro-img">
          <div class="pro-text">{{item.name}}</div>
          <div class="pro-price">{{item.price}}</div>
        </router-link>
      </div>
    </div>
    <!--推荐品牌-->
    <div class="brand" v-if="brandList.length != 0">
      <img :src="item.photo" alt="" v-for="(item,index) in brandList" class="brand-img">
    </div>

    <!--推荐产品list-->
    <div class="ProB" v-if="proBList.length != 0">
      <div class="pro-list"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="20"
      >
        <router-link :to="{path:'/detailsPage', query: {id: item.id}}" class="pro-box" v-for="(item,index) in proBList"
                     :key="index">
          <img v-lazy="item.photo_x" alt="" class="pro-img">
          <div class="pro-text">{{item.name}}</div>
          <div class="pro-price">{{item.price_yh}} <span class="pro-old-price">{{item.price}}</span></div>
        </router-link>
      </div>
    </div>
    <FooterCon></FooterCon>
  </div>
</template>

<script>
  import {yuanAjax, getCookie} from '../js/common.js';
  import FooterCon from '@/components/FooterCon'; //公用footer tabBar
  export default {
    name: 'index',
    data(){
      return {
        notifyAnimate: false,
        notifyId: [{dataId: "con1"}, {dataId: "con2"}],
        timer: null,
        timer2: null,
        notify: [],
        bannerList: [],
        autoTime: 4000,
        appList: [
          {appText: "分类", className: "center-a"},
          {appText: "积分", className: "center-b"},
          {appText: "签到", className: "center-c"},
          {appText: "充值", className: "center-d"},
          {appText: "爱拍", className: "center-e"}
        ],
        proAList: [],
        brandList: [],
        proBList: [],
        page: 1,
        hasloadMore: false,
      }

    },
    components: {
      FooterCon
    },
    methods: {
      //点击 -- banner -- 图片
      click_banner (type, id) {
        console.log(type, id);
        if ( type == 'page' ) {
          //底部菜单
        } else if ( type == 'index') {

        } else if ( type == '') {

        }
      },
      //获取 推荐商品
      getRecommend() {
        var _this = this;
        _this.hasloadMore = false;
        yuanAjax(this, 'api/index/getIndexRecommend', {
          page: _this.page,
        }, function (res) {
          if (res.status == 1) {
            if (res.data.length != 0) {
              _this.hasloadMore = true;
              _this.page++;
            } else if (res.data.length == 0 && !_this.hasloadMore) {
              _this.$toast({
                message: '没有更多数据',
                duration: 1000
              });
            }
            _this.proBList = _this.proBList.concat(res.data);
          }
        });
      },
      // 底部无限加载
      loadMore () {
        var _this = this;
        if (_this.hasloadMore) {
          _this.getRecommend();
        }
      },
      animateMove(after, speed) {
        var that = this;
        setTimeout(function () {
          that.notifyAnimate = true;
          let N1 = that.$refs.con1['0'];
          let N2 = that.$refs.con2['0'];
          let x = 0;

          function move() {
            if (!N1) {
              return false;
            }
            let LEN = N1.scrollWidth;//一个完整滚动条的长度
            N1.style.left = x + "px";
            N2.style.left = (x + LEN) + "px";
            x--;
            ((x + LEN) === 0) && (x = 0);
          }

          that.timer = setInterval(move, speed);
        }, after)
      },
      //签到
      dosign: function () {
        var _this = this;
        yuanAjax(_this ,'api/User/doSign',{
          uid: getCookie('chaUID')
        },function (res) {
          if (res.status == 1){
            _this.$toast({
              message: '签到成功',
              duration: 1000
            });
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      }
    },
    mounted: function () {
      var _this = this;
      //获取公告
      yuanAjax(this, 'api/index/getAnnouncement', {}, function (res) {
        if (res.status == 1) {
          _this.notify = res.data;
          _this.animateMove(1000, 20);//that:this after:打开页面多久开始执行动画 speed执行动画的速度
        }
      });
      //获取banner数据
      yuanAjax(this, 'Api/index/get_ad_list', {}, function (res) {
        _this.bannerList = res.adlist;
      });
      //获取首页四个爆款
      yuanAjax(this, 'api/index/getBoomRecommend', {}, function (res) {
        if (res.status == 1) {
          _this.proAList = res.data;
        }
      });
      //获取 推荐品牌
      yuanAjax(this, 'api/index/getBrand', {}, function (res) {
        if (res.status == 1) {
          _this.brandList = res.brand_list;
        }
      });

      //获取 推荐商品
      _this.getRecommend();
    },
    beforeDestroy: function () {
      var _this = this;
      clearInterval(_this.timer);
      clearInterval(_this.timer2)
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .index-wrap {
    padding-bottom: 97px;

    .notify {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 750px;
      height: 52px;
      line-height: 52px;
      color: #fff;
      background: rgba(0, 0, 0, 0.4);
      box-sizing: border-box;
      z-index: 20;
      padding: 0 25px 0 15px;
      font-size: 24px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .notify:before {
      content: "";
      display: block;
      width: 32px;
      height: 27px;
      background: url(../assets/images/notify-icon.png) no-repeat;
      background-size: 100% 100%;
    }

    .notify-wrap {
      width: 640px;
      height: 52px;
      white-space: nowrap;
      overflow: hidden;
      position: relative;

      .notify-move {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 52px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;

        .notify-txt {
          height: 100%;
          line-height: 52px;
          padding-right: 25px;
        }

      }
      .notify-fixed {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 52px;
        margin-right: 10px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;

        .notify-txt {
          overflow: hidden;
          width: 642px;
          white-space: pre-line;
        }

      }

    }

    /*轮播*/
    .mint-swipe {
      height: 360px;
    }

    img {
      width: 100%;
      height: 360px;
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

    /*应用中心*/
    .appcenter {
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: 26px 0;
      background: #eee9e6;

      a {
        color: #e53f55;
        display: block;
        flex-grow: 1;
        text-align: center;
        font-size: 28px;
        line-height: 28px;
      }

      a:before {
        content: '';
        display: block;
        width: 92px;
        height: 92px;
        margin: 0 auto 15px;
      }

      .center-a:before {
        background: url('../assets/images/index-icon-01.png') no-repeat;
        background-size: 100%;
      }

      .center-b:before {
        background: url('../assets/images/index-icon-02.png') no-repeat;
        background-size: 100%;
      }

      .center-c:before {
        background: url('../assets/images/index-icon-03.png') no-repeat;
        background-size: 100%;
      }

      .center-d:before {
        background: url('../assets/images/index-icon-04.png') no-repeat;
        background-size: 100%;
      }

      .center-e:before {
        background: url('../assets/images/index-icon-05.png') no-repeat;
        background-size: 100%;
      }

    }
    /*广告*/
    .advertisement {
      width: 100%;
      height: 250px;
      background: url(../assets/images/index-ad-bg.jpg) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 45px;
      box-sizing: border-box;
      align-items: center;

      a {
        display: block;
        width: 160px;
        height: 160px;
      }

      .ad-upgrade {
        background: url(../assets/images/index-ad-upgrape.png) no-repeat;
        background-size: 100%;
      }

      .ad-auction {
        background: url(../assets/images/index-ad-auction.png) no-repeat;
        background-size: 100%;
      }

    }
    /*广告下方四款产品*/
    .ProA {

      .pro-list {
        width: 750px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 3px 0 3px;

        .pro-box {
          width: 370px;

          img {
            display: block;
            width: 100%;
            margin: 4px auto;
          }

          .pro-text {
            font-size: 24px;
            color: #000;
            height: 52px;
            line-height: 52px;
            padding: 0 36px 0 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .pro-price {
            padding-left: 14px;
            font-size: 32px;
            color: #e53f55;
            height: 40px;
            line-height: 40px;
            margin-bottom: 15px;
          }

        }
      }
    }
    /*推荐品牌*/
    .brand-img {
      width: 710px;
      height: 280px;
      display: block;
      margin: 22px auto 0 auto;
    }

    .brand:before {
      content: "推荐品牌";
      display: block;
      width: 240px;
      height: 52px;
      background: url(../assets/images/btn-lace.png) no-repeat;
      background-size: 100% 100%;
      margin: 24px auto 12px auto;
      text-align: center;
      line-height: 52px;
      color: #b16b2c;
      font-size: 26px;
    }

    /*推荐产品*/
    .ProB:before {
      display: block;
      content: "推荐产品";
      width: 240px;
      height: 52px;
      background: url(../assets/images/btn-lace.png) no-repeat;
      background-size: 100% 100%;
      margin: 30px auto;
      text-align: center;
      line-height: 52px;
      color: #b16b2c;
      font-size: 26px;
    }

    .ProB {

      img[lazy=loading] {
        width: 100px;
        height: 100px;
        margin: auto;
      }

      .pro-list {
        width: 750px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 3px 0 3px;

        .pro-box {
          width: 360px;

          .pro-img {
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
    .v-modal {
      display: none;
    }

    .mint-popup-top {
      width: 100%;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background-color: rgba(0, 0, 0, .7);
      color: #fff;
    }

  }
</style>
