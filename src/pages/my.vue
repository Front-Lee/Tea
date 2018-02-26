<template>
  <div class="my">
    <div class="my-header"
         :style="{backgroundImage:`url(${ userinfo.photo })`}">
      <div class="header-bg" :style="{backgroundImage:`url(${ userinfo.photo })`}"></div>
      <div class="user-nickname">
        <img v-if="userinfo.photo" :src="userinfo.photo" alt="" class="header-img">
        <img v-else src='../assets/images/defaultHead.jpg' alt="" class="header-img">
        {{ userinfo.name}}
      </div>
      <div class="header-balance">
        余额: {{ userinfo.balance}}
        <router-link to="/recharge" class="recharge-btn">充值</router-link>
      </div>
    </div>
    <div class="my-section">
      <router-link to="/wallet" class="my-list wallet">我的钱包</router-link>
      <router-link to="" @click.native="myfunc" class="my-list collect">我的收藏</router-link>
      <router-link to="" @click.native="myfunc" class="my-list voucher">代金券</router-link>
      <router-link to="" @click.native="myfunc" class="my-list bankcard">绑定银行卡</router-link>
      <router-link to="" @click.native="myfunc" class="my-list benefit">我的公益</router-link>
      <router-link to="" @click.native="myfunc" class="my-list wealth">我的理财</router-link>
      <router-link to="" @click.native="myfunc" class="my-list share">分享</router-link>
      <router-link to="" @click.native="myfunc" class="my-list download">app下载</router-link>
      <router-link to="" @click.native="myfunc" class="my-list set">设置</router-link>
    </div>
    <FooterCon></FooterCon>
  </div>
</template>
<script>
  import {yuanAjax,getCookie} from '../js/common.js';
  import FooterCon from '@/components/FooterCon' //公用footer tabBar
  export default {
    name: 'my',
    data() {
      return {
        userinfo: {},
        myList: [
          {linkText: "我的钱包", className: "wallet"},
          {linkText: "我的收藏", className: "collect"},
          {linkText: "代金券", className: "voucher"},
          {linkText: "绑定银行卡", className: "bankcard"},
          {linkText: "我的公益", className: "benefit"},
          {linkText: "我的理财", className: "wealth"},
          {linkText: "分享", className: "share"},
          {linkText: "app下载", className: "download"},
          {linkText: "设置", className: "set"}
        ]
      }
    },
    components: {
      FooterCon
    },
    methods: {
      myfunc() {
        this.$toast({
          message: '暂未开放',
          duration: 1000,
        })
      }
    },
    mounted: function () {
      var _this = this;
      yuanAjax(_this, 'Api/User/userinfo', {
        uid: getCookie('chaUID')
      }, function (res) {
        _this.userinfo.phone = '../assets/images/defaultHead.jpg';
        if (res.status == 1) {
          _this.userinfo = res.userinfo;
          if (!res.userinfo.phone) {
          }
        }
      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .my {
    padding-bottom: 97px;
    width: 750px;
    overflow: hidden;

  .my-header {
    width: 750px;
    height: 340px;
    box-sizing: border-box;
    padding: 150px 20px 30px 30px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    background-color: rgba(255, 255, 255, 0.2);
    overflow: hidden;

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    border: 35px solid rgba(0, 0, 0, 0);
    margin: -35px;
    filter: blur(25px) brightness(90%);
  }

  .user-nickname {
    font-size: 32px;
    color: #000;
    display: flex;
    line-height: 245px;
  }

  .header-img {
    width: 152px;
    height: 152px;
    border: 4px solid #fff;
    border-radius: 10px;
    margin-right: 18px;
  }

  .header-balance {
    line-height: 245px;
    font-size: 28px;
    color: #e01b00;

  .recharge-btn {
    background: #c51825;
    color: #fff;
    font-size: 26px;
    text-align: center;
    border-radius: 25px;
    display: inline-block;
    width: 100px;
    height: 50px;
    border: 0;
    line-height: 50px;
    margin-left: 22px;
  }

  }
  }
  .my-section {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    border-top: 1px solid #ccc;
    width: 750px;
    overflow: hidden;

  .my-list {
    width: 250px;
    height: 250px;
    text-align: center;
    font-size: 30px;
    color: #000;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: #fff;
  }

  .my-list:nth-of-type(3n) {
    border-right: 1px solid #fff;
  }

  .my-list:before {
    width: 72px;
    height: 72px;
    display: block;
    content: "";
    margin: 64px auto 30px auto;
  }

  .wallet:before {
    background: url(../assets/images/my-icon-01.png) no-repeat;
    background-size: cover;
  }

  .collect:before {
    background: url(../assets/images/my-icon-02.png) no-repeat;
    background-size: cover;
  }

  .voucher:before {
    background: url(../assets/images/my-icon-03.png) no-repeat;
    background-size: cover;
  }

  .bankcard:before {
    background: url(../assets/images/my-icon-04.png) no-repeat;
    background-size: cover;
  }

  .benefit:before {
    background: url(../assets/images/my-icon-05.png) no-repeat;
    background-size: cover;
  }

  .wealth:before {
    background: url(../assets/images/my-icon-06.png) no-repeat;
    background-size: cover;
  }

  .share:before {
    background: url(../assets/images/my-icon-07.png) no-repeat;
    background-size: cover;
  }

  .download:before {
    background: url(../assets/images/my-icon-08.png) no-repeat;
    background-size: cover;
  }

  .set:before {
    background: url(../assets/images/my-icon-09.png) no-repeat;
    background-size: cover;
  }

  }
  }
</style>
