<template>
  <div class="auction">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="auction-header">
      <div class="auction-title">积分商城</div>
    </div>
    <div class="pro-list"
     v-infinite-scroll="loadMore"
     infinite-scroll-disabled="loading"
     infinite-scroll-distance="20"
    >
      <router-link :to="{path:'/jifendetails', query: {id: item.id}}" class="pro-box" v-for="(item,index) in proList" :key="index">
        <img :src="item.photo_x" alt="" class="pro-img">
        <div class="pro-text">{{item.name}}</div>
        <div class="pro-points">{{item.price_yh}} <span class="points-txt"> {{ item.price }}</span></div>
      </router-link>
    </div>
    <!--<mt-button class="see-more">查看更多</mt-button>-->
  </div>
</template>

<script>
  import { yuanAjax } from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'auction',
    data(){
      return {
        propData: {
          title: '积分商城',
          link: ''
        },
        page: 1,
        hasloadMore: false,
        proList: []
      }
    },
    components: {
      HeaderCon
    },
    methods: {
      getlist() {
        var _this = this;
        _this.hasloadMore = false;
        yuanAjax(_this,'Api/Index/index_integral',{
          page: _this.page
        },function (res) {
          if (res.prolist.length != 0) {
            _this.hasloadMore = true;
            _this.page++;
          } else if (res.prolist.length == 0 && !_this.hasloadMore) {
            _this.$toast({
              message: '没有更多数据',
              duration: 1000
            });
          }
          _this.proList = _this.proList.concat(res.prolist)
        })
      },
      loadMore() {
        var _this = this;
        if (_this.hasloadMore) {
          _this.getlist();
        }
      }
    },
    mounted () {
      var _this = this;
      _this.getlist();
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .auction {
    min-height: 100vh;
    background: #fdfdfd;

    .auction-header {
      width: 750px;
      height: 270px;
      background: url(../assets/images/header-bg.jpg) no-repeat;
      background-size: 100%;
      overflow: hidden;

      .auction-title {
        width: 320px;
        height: 102px;
        margin: 85px auto 0 auto;
        line-height: 102px;
        font-family: '宋体';
        text-align: center;
        font-size: 60px;
        color: #b16b2c;
        background: url(../assets/images/large-lace.png) no-repeat;
        background-size: cover;
      }

    }
    .pro-list {
      margin-top: 30px;
      width: 750px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px 0 20px;

      .pro-box {
        width: 330px;
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

        .pro-points {
          padding-left: 20px;
          font-size: 36px;
          color: #c51825;
          height: 58px;
          line-height: 58px;
          margin-bottom: 15px;
          .points-txt {
            font-size: 20px;
            color: #cccccc;
            text-decoration: line-through
          }

        }
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

  }
</style>
