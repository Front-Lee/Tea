<template>
  <div class="register">
    <!--<HeaderCon :propData="propData"></HeaderCon>-->
    <div class="user-register">
      <div class="error-msg">{{ errText }}</div>
      <mt-field @focus.native.capture="toggle" label="手机号" placeholder="请输入手机号" v-model="username" type="tel"
                class="register-tel">
        <mt-button @click="getCode" :disabled="disabled" class="get-captcha">{{ codeText }}</mt-button>
      </mt-field>
      <mt-field @focus.native.capture="toggle" :attr="{ maxlength: 6}" label="验证码" placeholder="请输入手机验证码"
                v-model="captcha" class="register-captcha"></mt-field>
      <mt-field @focus.native.capture="toggle" label="密　码" placeholder="请输入您的登录密码" v-model="password" type="password"
                class="register-psd"></mt-field>
      <mt-field @focus.native.capture="toggle" label="邀请码" placeholder="请输入邀请码，没有可不填" v-model="invite"
                class="register-invite"></mt-field>
      <mt-button @click="resBtn" type="danger" class="register-btn" size="large">注册</mt-button>
    </div>

  </div>
</template>

<script>
  import {yuanAjax,setCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'register',
    data() {
      return {
        propData: {
          title: '注册',
          link: ''
        },
        username: "",
        password: "",
        captcha: "",
        invite: "",
        is_getCode: true,
        timer: null,
        codeText: '获取验证码',
        errText: '',
        disabled: false
      }
    },
    components: {
      HeaderCon
    },
    methods: {
      //点击登录按钮
      register() {

      },
      getCode () {
        var _this = this;
        if (!_this.is_getCode) {
          return false;
        }
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
        var num = 60;
        _this.timer = setInterval(function () {
          num -= 1;
          var that = _this;
          if (num <= 1) {
            that.codeText = '重新获取';
            that.is_getCode = true;
            that.disabled = false;
            clearInterval(that.timer);
          } else {
            that.codeText = num + '重新获取'
          }
        }, 1000);

        _this.is_getCode = false;
        _this.disabled = true;
        setCookie('chaUID','login', 24);
        yuanAjax(_this, 'Api/User/sendSms', {
          uid: 0,
          mobile: _this.username
        }, function (res) {
          if (res) {
//            alert(1);
          }
        })
      },
      //获取焦点 - 制空错误信息
      toggle() {
        var _this = this;
        _this.errText = '';
        return false;
      },
      //注册
      resBtn() {
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
        if (!_this.captcha) {
          _this.$toast({
            message: '验证码不能为空',
            duration: 1000
          });
          return false;
        }
        setCookie('chaUID','login', 24);
        yuanAjax(_this, 'api/User/register', {
          mobile: _this.username,
          code: _this.captcha,
          pwd: _this.password,
          join_code: _this.invite
        }, function (res) {
          if (res.status == 1) {
            setCookie('chaUID', res.uid, 24);
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
  .register:before {
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

  .register {
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

    .user-register {
      width: 610px;
      margin: 592px auto 0 auto;
      font-size: 28px;
      text-align: center;

      .register-tel, .register-captcha, .register-psd, .register-invite {
        margin-top: 25px;
        width: 610px;
        height: 88px;
        border-radius: 15px;
        border: 1px solid #e2e1e0;
      }

      .mint-button:not(.is-disabled):active::after {
        opacity: .2
      }

      .get-captcha {
        width: 178px;
        height: 88px;
        background: transparent;
        font-size: 24px;
        color: #b16b2c;
      }

      .get-captcha:before {
        content: "";
        display: block;
        height: 48px;
        width: 1px;
        border-left: 1px solid #e2e1e0;
        position: absolute;
        left: 0;
        top: 20px;
      }

      .register-btn {
        height: 88px;
        background: #e53f55;
        font-size: 30px;
        border-radius: 15px;
        margin-top: 30px;
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
        display: block;
      }

      .mint-field-core {
        font-size: 28px;
        color: #ccc;
      }

      .is-disabled {
        background-color: #e3e2e3;
        color: #fff;
      }

    }

  }
</style>
