<template lang="html">
  <div class="class_container bcFFF">
    <HeaderCon :propData="propData"></HeaderCon>
    <ul class="list">
      <li v-for="(item, index) in list" >
        <router-link :to="{path:'/classAuction', query: {id: item.id, name: item.name}}">
          <img :src="item.bz_1" alt="">
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {yuanAjax} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    data(){
      return {
        propData: {
          title: '分类',
          link: 'index'
        },
        list: []
      }
    },
    components: {
      HeaderCon
    },
    mounted() { // 实例上去之后调用该钩子
      var _this = this;
      yuanAjax(_this,'api/Category/index',{

      },function (res) {
        if (res.status == 1) {
          _this.list = res.list;
        }
      })
    },
    methods: { //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .bcFFF {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #faf8f9;
  }
  .list {
    li {
      float: left;
      width: 33.3%;
      height: 220px;
      border:1px solid #e2e1e0;
      border-left: none;
      background-color: #fff;
      text-align: center;
    }
    img {
      width: 50%;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
</style>