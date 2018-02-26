<template>
    <div class="recharge">
      <HeaderCon :propData="propData"></HeaderCon>
      <div class="recharge-con">
        <div class="recharge-options">
          <div class="recharge-amount" :class="amountIndex===index?'amount-active':''" @click="rechargeClick(index)"   v-for="(item,index) in amountList" :key="index">{{item.options}}元</div>
          <input class="recharge-amount done"  v-model="je"  type="number" placeholder="其他金额" @focus="focusFunc" :class="is_focus ? 'amount-active' : '' ">
        </div>
        <div class="recharge-fun">
          <div class="recharge-pay" :class="payIndex===index?'pay-active':''" v-for="(item,index) in payList" :key="index" @click="payClick(index)" >{{item.payText}}</div>
          <div class="service">充值手续费0.6%</div>
        </div>
      </div>
      <mt-button  type="danger" class="recharge-btn" @click="btn_recharge">立即充值</mt-button>
    </div>
</template>

<script>
  import { yuanAjax,getCookie } from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'recharge',
    data(){
      return {
        propData: {
          title: '充值',
          link: ''
        },
        amountIndex:0,
        je: '',
        is_focus: false,
        payIndex:0,
        amountList:[
          {options:200},
          {options:300},
          {options:400},
          {options:500},
          {options:600},
          {options:700},
          {options:800},
          {options:900},
          {options:1000}
        ],
        payList:[{payText:"微信支付"}]
      }
    },
    components:{
      HeaderCon
    },
    methods:{
      rechargeClick(index){
        this.amountIndex=index;
        this.is_focus = false;
      },
      payClick(index){
        this.payIndex=index;
      },
      focusFunc() {
        this.is_focus = true;
        this.amountIndex = -1;
        return false;
      },
      btn_recharge() {
        var _this = this;
        var money = 0;
        if ( _this.amountIndex < 0) {
          money = _this.je
        } else {
          money = _this.amountList[_this.amountIndex]['options']
        }
        console.log(Number(money));
        if ( Number(money) <=  0) {
          _this.$toast({
            message: '充值金额一元起！',
            duration: 1000
          });
          return false;
        }
        yuanAjax(_this,'Api/Payment/recharge',{
          uid: getCookie('chaUID'),
          money: _this.amountList[_this.amountIndex]['options']
        },function (res) {
          console.log(res);
        })


      }
    }
  }
</script>

<style lang="less" scoped>
.recharge{
  .recharge-con{padding:0 30px;background:#fff;overflow:hidden;box-shadow:0 2px 5px #cfcac8;}
  .recharge-options{margin-top:30px;display:flex;flex-wrap:wrap;justify-content: space-between;
    .recharge-amount{margin-bottom:22px;width:130px;height:68px;font-size:26px;line-height:68px;text-align:center;color:#fff;background:#ccc;border-radius:10px;}
    .amount-active{background:#cfa972;}
  }
  .recharge-fun{margin:8px 0 35px 0;display:flex;justify-content: flex-start;position:relative;
    .recharge-pay{width:145px;height:80px;padding-left:85px;line-height:80px;font-size:26px;position:relative;margin-right:20px;border:4px solid #ccc;display:flex;}
    .pay-active{border:4px solid #cfa972;}
    .recharge-pay:before{content:'';display:block;width:80px;height:80px;left:0;top:0;position:absolute;}
    .recharge-pay:nth-of-type(1):before{background:url(../assets/images/wx-recharge.jpg) no-repeat;background-size:cover;}
    .recharge-pay:nth-of-type(2):before{background:url(../assets/images/unionpay-recharge.jpg) no-repeat;background-size:cover;}
    .pay-active:after{width:22px;height:22px;display:block;content:"";background:url(../assets/images/recharge-selected.jpg) no-repeat;background-size:cover;position:absolute;right:0;bottom:0;}
  }
  .recharge-btn{width:710px;margin:30px auto;height:88px;color:#fff;border-radius:10px;background:#e53f55;display:block;font-size:30px;}
  .done { outline: none; border: 1px solid transparent; color: #fff;
    &::-webkit-input-placeholder { color: #fff;}}
  .service { color: #E53F55; position: absolute; right: 0;bottom: 20px;}
}
</style>
