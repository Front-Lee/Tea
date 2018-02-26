<template lang="html">
  <div class="pay_container">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="pay_init">
      <img class="pay_img" :src="product_info.photo_x" alt="">
      <dl>
        <dt>{{ product_info.name }}</dt>
        <dd  v-if="paytype == 'balance'"  class="red">价格:{{ product_info.price_yh}}</dd>
        <dd  v-if="paytype == 'jifen'" class="red">积分:{{ product_info.price_yh}}</dd>
        <dd class="num">数量: {{ num }}</dd>
      </dl>
    </div>

    <div class="dz">
      <img src="../assets/images/x_right.png" alt="">
      <div>
        <div @click="address" class="mb">收货人: {{addr.name}}
          <span class="tel">{{addr.tel}}</span>
        </div>
        <div @click="address" class="mb">收货地址: {{ addr.address_xq}}
        </div>
        <div class="remark">
          <mt-field label="" placeholder="如您需要备注，请在这里输入" v-model="remark" type="text" class="register-psd"></mt-field>
        </div>
      </div>
    </div>

    <div class="btnGreen">
      <div v-if="paytype == 'balance'" class="balance red">余额: {{balance}}</div>
      <div v-if="paytype == 'jifen'" class="balance red">积分: {{jifen}}</div>

      <button v-if="paytype == 'cai'" @click="caiPay" class="wx_pay_submit">提货</button>
      <button v-if="paytype == 'jifen'" @click="jifenPay" class="wx_pay_submit">支付{{ product_info.price_yh * num}}积分</button>
      <button v-if="paytype == 'balance'" @click="balancePay" class="wx_pay_submit">支付{{ product_info.price_yh * num}}元
      </button>
    </div>
  </div>
</template>

<script>
  import {yuanAjax, getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    data(){
      return {
        propData: {
          title: '',
          link: ''
        },
        remark: '',
        product_info: {},
        balance: '',
        jifen:'',
        addr: '',
        num: '',
        paytype: ''
      }
    },
    components: {
      HeaderCon
    },
    mounted() { // 实例上去之后调用该钩子
      var _this = this;
      _this.num = _this.$route.query.num;
      _this.paytype = _this.$route.query.paytype;
      yuanAjax(_this, 'Api/Payment/prepay', {
        pid: _this.$route.query.pid,
        uid: getCookie('chaUID')
      }, function (res) {
        if (res.status == 1) {
          _this.product_info = res.product_info;
          _this.addr = res.addr;
          _this.balance = res.balance
          _this.jifen = res.jifen
        }
      })
    },
    methods: { //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
      address() {
        var _this = this;
        var pm = _this.$route.fullPath.substr(_this.$route.fullPath.indexOf('?'));
        _this.$router.push({path: `/address${pm}`});
      },
      //普通订单 付款
      balancePay () {
        var _this = this;
//        if (!_this.addr.length){
//          _this.$toast({
//            message: '请选择地址',
//            duration: 1000
//          });
//          return false;
//        }
        yuanAjax(_this, 'Api/Payment/pay_now', {
          uid: getCookie('chaUID'),
          sid: 0,
          order_type: 1,
          paytype: 'balance',
          pid: _this.$route.query.pid,
          price: _this.product_info.price_yh,
          aid: _this.addr.id || _this.$route.query.aid,
          remark: _this.remark,
          num: _this.num,
          total: _this.num * _this.product_info.price_yh,
          buff: 0,
        }, function (res) {
          if (res.status == 1) {
            _this.$toast({
              message: '支付成功',
              duration: 1000
            });
            setTimeout(function () {
              _this.$router.push({path: '/order'});
            }, 2000)
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      },
      //猜 - 提货 订单类型 1-普通订单 2-升级订单 3-积分订单 4-带定义  5-红包订单
      caiPay () {
        var _this = this;
        _this.$toast({
          message: '提货成功',
          duration: 1000
        });
        setTimeout(function () {
          _this.$router.push({path: '/order'});
        },2000)
      },
      jifenPay(){
        var _this = this;

        yuanAjax(_this, 'Api/Payment/pay_now', {
          uid: getCookie('chaUID'),
          sid: 0,
          order_type: 3,
          paytype: 'jifen ',
          is_jifen:1,
          pid: _this.$route.query.pid,
          price: _this.product_info.price_yh,
          aid: _this.addr.id || _this.$route.query.aid,
          remark: _this.remark,
          num: _this.num,
          total: _this.num * _this.product_info.price_yh,
          buff: 0,
        }, function (res) {
          if (res.status == 1) {
            _this.$toast({
              message: '支付成功',
              duration: 1000
            });
            setTimeout(function () {
              _this.$router.push({path: '/order'});
            }, 2000)
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

<style>
  .pay_container {
    /*background-color: #fff;*/
  }

  .pay_init {
    background-color: #fff;
    padding: 40px 20px;
    height: 120px;
    border-bottom: 2px solid #eee;
  }

  .pay_img {
    width: 130px;
    height: 130px;
    float: left;
    margin-right: 20px;
  }

  .pay_init dl {
    float: left;
    width: 560px;
    position: relative;
  }

  .pay_init dt {
    font-size: 30px;
    margin-bottom: 60px;
  }

  .pay_init .num {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .dz {
    position: relative;
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border-top: 2px solid #eee;
    font-size: 30px;
    color: #666;
  }

  .dz .mb {
    margin-bottom: 15px;
  }

  .dz img {
    position: absolute;
    top: 55px;
    right: 25px;
    width: 30px;
  }

  .dz .mint-cell-wrapper {
    border-top: 2px solid #eee;
    padding-left: 0;
  }

  .dz .mint-field-core {
    padding-top: 10px;
    font-size: 30px;
  }

  .balance {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .btnGreen {
    margin-top: 20px;
    padding: 20px;
  }

  .wx_pay_submit {
    width: 100%;
    height: 80px;
    line-height: 80px;
    border: transparent;
    border-radius: 8px;
    color: #fff;
    background-color: #b16b2c;
  }
</style>