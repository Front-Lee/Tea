<template>
  <div class="wallet">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="wallet-tab">
      <mt-navbar v-model="selected">
        <mt-tab-item id="balance">余额</mt-tab-item>
        <mt-tab-item id="points">积分</mt-tab-item>
      </mt-navbar>
    </div>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="balance" class="balance">
        <div class="wallet-header">
          <router-link to="" class="wallet-cash">提现</router-link>
          <div class="num-box">余额（元）
            <div class="num-text">{{ userInfo.balance }}</div>
          </div>
          <router-link to="/recharge" class="link-btn">充值</router-link>
        </div>
        <dl class="wallet-detail">
          <dt class="wallet-caption">收支明细</dt>
          <dd v-for="(item,index) in walletList" :key="" class="wallet-item">
            <div class="wallet-name">{{item.type}}</div>
            <div class="wallet-date">{{item.date}}</div>
            <div class="wallet-change">{{item.money_string}}</div>
          </dd>
          <dd class="not_data">没有更多数据~</dd>
        </dl>
      </mt-tab-container-item>
      <!--积分-->
      <mt-tab-container-item id="points" class="points">
        <div class="wallet-header">
          <div class="num-box">积分
            <div class="num-text">{{ userInfo.jifen }}</div>
          </div>
          <router-link to="/auction" class="link-btn">积分商城</router-link>
        </div>
        <dl class="wallet-detail">
          <dt class="wallet-caption">收支明细</dt>
          <dd v-for="(item,index) in jifenList" :key="" class="wallet-item">
            <div class="wallet-name">{{item.type}}</div>
            <div class="wallet-date">{{item.date}}</div>
            <div class="wallet-change">{{item.money_string}}</div>
          </dd>
          <dd class="not_data">没有更多数据~</dd>
        </dl>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import {yuanAjax,getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'wallet',
    data(){
      return {
        propData: {
          title: '钱包',
          link: ''
        },
        selected: "balance",
        walletTab: [],
        walletList: [],
        jifenList: [],
        userInfo: {}
      }
    },
    components: {
      HeaderCon
    },
    mounted() { // 实例上去之后调用该钩子
      var _this = this;
      yuanAjax(_this, 'Api/User/money_panel', {
        uid: getCookie('chaUID'),
      }, function (res) {
        if (res.status == 1) {
          _this.userInfo = res.userinfo;
          _this.walletList = res.logs;
          _this.jifenList = res.jifen_logs;
        }
      })
    },
  }
</script>

<style lang="less" rel="stylesheet/less">
  .wallet {
    .wallet-tab {
      height: 88px;
      border-bottom: 1px solid #ccc;

      .mint-navbar {
        height: 88px;
        box-shadow: 0 5px 10px -1px #f9f9f9 inset;
      }

      .mint-tab-item-label {
        line-height: 88px;
        font-size: 30px;
        display: inline-block;
        box-sizing: border-box;
      }

      .mint-tab-item {
        height: 88px;
        padding: 0;
        color: #999;
      }

      .mint-tab-item.is-selected {
        border: 0;
        color: #e53f55;
      }

      .mint-tab-item.is-selected .mint-tab-item-label {
        border-bottom: 4px solid #e53f55;
        padding: 0 12px;
      }

    }
    .wallet-header {
      height: 510px;
      width: 750px;
      position: relative;
      background: url(../assets/images/wallet-bg.jpg) no-repeat;
      background-size: 100% 100%;
      overflow: hidden;

      .wallet-cash {
        position: absolute;
        right: 45px;
        top: 40px;
        font-size: 30px;
        color: #999;
      }

      .num-box {
        margin: 128px 0 0 90px;
        font-size: 30px;
        color: #999;
        line-height: 58px;

        .num-text {
          color: #ff695a;
          font-size: 90px;
          line-height: 105px;
          font-weight: bold;
        }

      }
      .link-btn {
        width: 688px;
        height: 78px;
        font-size: 30px;
        display: flex;
        color: #b16b2c;
        line-height: 78px;
        text-align: center;
        border: 1px solid #b16b2c;
        border-radius: 10px;
        background: #fff;
        margin: 114px auto 0 auto;
        justify-content: center;
      }

    }
    .balance .link-btn:before {
      content: "";
      display: block;
      width: 32px;
      height: 32px;
      background: url(../assets/images/wallet-icon.png) no-repeat;
      background-size: cover;
      margin: 23px 6px 0 0;
    }

    /*收支明细*/
    .wallet-caption {
      height: 78px;
      font-size: 30px;
      line-height: 78px;
      color: #000;
      padding-left: 28px;
    }

    .wallet-item {
      display: flex;
      color: #999;
      border-bottom: 1px solid #d7d2d0;
      height: 82px;
      line-height: 82px;
      font-size: 24px;
      justify-content: space-between;
      padding: 0 28px;
    }

    .wallet-name {
      min-width: 210px;
    }

    .wallet-date {
      min-width: 210px;
    }

    .wallet-change {
      min-width: 210px;
      text-align: right;
    }

    .not_data {
      text-align: center;
      font-size: 30px;
      color: #999;
    }

  }

</style>
