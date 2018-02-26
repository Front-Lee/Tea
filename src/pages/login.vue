<template>
  <div class="login">
    <div class="user-login">
      <div class="error-msg">{{ errText }}</div>
      <mt-field @focus.native.capture="toggle" :attr="{ maxlength: 11}"  label="手机号" placeholder="请输入手机号" v-model="username" type="tel" class="login-tel"></mt-field>
      <mt-field @focus.native.capture="toggle" label="密　码" placeholder="请输入登录密码" v-model="password" type="password" class="login-psd"></mt-field>
      <div class="login-link">
        <router-link to="/register" class="forget-psd">新用户注册</router-link>
        <router-link to="/forget" class="forget-psd">忘记密码</router-link>
      </div>
      <mt-button type="danger" class="login-btn" size="large" @click="login">登录</mt-button>
    </div>
    <div class="other-login-text">第三方登录</div>
    <div class="other-login-icon">
      <router-link to="" class="login-wx"></router-link>
      <router-link to="" class="login-qq"></router-link>
    </div>
  </div>
</template>

<script>
  import  {yuanAjax, setCookie } from '../js/common.js';
  export default {
    name: 'login',
    data() {
      return {
        username: "",
        password: "",
        errText: ''
      }
    },
    methods: {
      //获取焦点 - 制空错误信息
      toggle() {
        var _this = this;
        _this.errText = '';
        return false;
      },
      //点击登录按钮
      login() {
        setCookie('chaUID','login', 24);
        var _this = this;
        if (!_this.username) {
          _this.$toast({
            message: '手机号不能为空',
            duration: 1000
          });
          return false;
        }
        if (_this.username.length < 11) {
          _this.$toast({
            message: '手机号格式不正确',
            duration: 1000
          });
          return false;
        }
        if (!_this.password) {
          _this.$toast({
            message: '密码不能为空',
            duration: 1000
          });
          return false;
        }
        yuanAjax(_this, 'api/Login/dologin', {
          mobile: _this.username,
          pwd: _this.password
        }, function (res) {
          if (res.status == 1) {
            setCookie('chaUID', res.session.ID, 24);
            _this.$router.push({path: '/index'});
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .login:before {
    content: "";
    display: block;
    position: absolute;
    width: 301px;
    height: 390px;
    background: url(../assets/images/user-logo.png) no-repeat;
    background-size: cover;
    top: 120px;
    left: 200px;
  }

  .login {
    width: 750px;
    min-height: 1334px;
    background: url(../assets/images/user-bg.jpg) no-repeat;
    background-size: 100%;
    overflow: hidden;
    .error-msg {
      width: 100%;
      color: #e01b00;
      font-size: 28px;
      height: 28px;
    }
    .user-login {
      width: 610px;
      margin: 640px auto 0 auto;
      font-size: 28px;
      text-align: center;
      .login-tel, .login-psd {
        width: 610px;
        height: 88px;
        border-radius: 15px;
        border: 1px solid #e2e1e0;
      }
      .login-tel {
        margin-top: 20px;
      }
      .login-psd {
        margin-top: 30px;
      }
      .login-link {
        width: 100%;
        line-height: 76px;
        display: flex;
        justify-content: space-between;
        height: 76px;
        a {
          color: #000;
          font-size: 28px;
        }
      }
      .login-btn {
        height: 88px;
        background: #e53f55;
        font-size: 30px;
        border-radius: 15px;
      }
      .mint-cell-wrapper {
        padding: 0;
        background-image: none;
      }
      .mint-field .mint-cell-title {
        width: 140px;
        height: 88px;
        line-height: 88px;
        display: inline-block;
      }
      .mint-cell-text {
        font-size: 28px;
      }
      .mint-field-core {
        font-size: 28px;
        color: #ccc;
      }

    }
    .other-login-text {
      width: 610px;
      height: 2px;
      margin: 70px auto 60px auto;
      text-align: center;
      color: #be8450;
      font-size: 24px;
      line-height: 2px;
      background: url(../assets/images/line-icon.png) no-repeat;
      background-size: 100%;
    }
    .other-login-icon {
      width: 610px;
      box-sizing: border-box;
      padding: 0 136px;
      display: flex;
      justify-content: space-around;
      margin: auto;
    }
    .login-wx {
      width: 88px;
      height: 88px;
      background: url(../assets/images/wx-icon.png) no-repeat;
      background-size: cover;
    }
    .login-qq {
      width: 88px;
      height: 88px;
      background: url(../assets/images/qq-icon.png) no-repeat;
      background-size: cover;
    }
  }
</style>
