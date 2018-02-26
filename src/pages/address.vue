<template lang="html">
  <div class="addressPage">
    <HeaderCon :propData="propData"></HeaderCon>
    <div v-if="is_show" class="address-list" v-for="(item,index) in adds">
      <div v-if="adds[index].is_default == 1"  @click="thisAid(item.id)" class="address-left address-default">{{adds[index].address}}</div>
      <div v-if="adds[index].is_default == 0"  @click="thisAid(item.id)" class="address-left ">{{adds[index].address}}</div>
      <div class="address-middle"  @click="thisAid(item.id)">
        <div class="address-tel">{{adds[index].tel}}</div>
        <div class="address-text">{{adds[index].sheng}}{{adds[index].city}}{{adds[index].quyu}}</div>
      </div>
      <a @click="gonewAddress(item.id)" class="address-edit">编辑</a>
    </div>
    <div v-if="!is_show" style="text-align: center;">
      <span class="add">暂无地址</span>
    </div>
    <a @click="gonewAddress2" class="new-address">+ 新增地址</a>
  </div>
</template>

<script>
  import {yuanAjax,getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    data(){
      return {
        propData: {
          title: '',
          link: ''
        },
        adds: [],
        is_show: true
      }
    },
    components: {
      HeaderCon
    },
    mounted() { // 实例上去之后调用该钩子
      var _this = this;
      yuanAjax(_this,'Api/Address/index',{
        user_id: getCookie('chaUID')
      },function (res) {
        if (res.status == 1) {
          _this.adds = res.adds;
          if (res.adds.length <= 0){
            _this.is_show = false
          }
        }
      })
    },
    methods: { //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
      thisAid(id){
        var _this = this;
        var pm = _this.$route.fullPath.substr(_this.$route.fullPath.indexOf('?'));
        if(_this.$route.query.aid){
          _this.$router.push({path: `/pay${pm}`});
        } else {
          _this.$router.push({path: `/pay${pm}&aid=${id}`});
        }
      },
      gonewAddress(id){
        var _this = this;
        var pm = _this.$route.fullPath.substr(_this.$route.fullPath.indexOf('?'));
        if(_this.$route.query.aid){
          _this.$router.push({path: `/newAddress${pm.replace(`aid=${_this.$route.query.aid}`,`aid=${id}`)}`});
        } else {
          _this.$router.push({path: `/newAddress${pm}&aid=${id}`});
        }
      },
      gonewAddress2(){
        var _this = this;
        var pm = _this.$route.fullPath.substr(_this.$route.fullPath.indexOf('?'));
        if(_this.$route.query.aid){
          _this.$router.push({path: `/newAddress${pm.replace(`aid=${_this.$route.query.aid}`,'')}`});
        } else {
          _this.$router.push({path: `/newAddress${pm}&aid=${id}`});
        }
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .addressPage {
    overflow: hidden;
    .address-list {
      margin-top: 20px;
      padding: 50px 15px 38px 30px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      min-height: 100px;
      .address-left {
        min-width: 170px;
        font-size: 26px;
        color: #000;
        position: relative;
      }
      .address-default:after {
        display: block;
        content: "默认";
        position: absolute;
        left: 0;
        bottom: 10px;
        height: 40px;
        line-height: 36px;
        width: 70px;
        box-sizing: border-box;
        border: 2px solid #fe436b;
        color: #fe436b;
        border-radius: 5px;
        font-size: 22px;
        text-align: center;
      }
      .address-middle {
        min-width: 418px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .address-tel {
          font-size: 26px;
          color: #000;
        }
        .address-text {
          font-size: 24px;
          color: #949494;
          min-height: 51px;
        }
      }
      .address-edit {
        min-width: 118px;
        text-align: center;
        font-size: 24px;
        color: #949494;
        border-left: 1px solid #e2e2e2;
        line-height: 4;
      }
    }
    .new-address {
      position: fixed;
      display: block;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 24px;
      color: #ff1948;
      height: 84px;
      border-top: 1px solid #cccbd1;
      background: #fff;
      text-align: center;
      line-height: 84px;
    }
    .add {
      display: block;
      font-size:50px;
      margin-top: 55%;
      color:#d0cbc9
    }
  }
</style>