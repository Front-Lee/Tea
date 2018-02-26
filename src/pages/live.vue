<template lang="html">
  <div class="live">
    <HeaderCon :propData="propData"></HeaderCon>
    <img src="https://cha.iweiji.cc/images/404.png" alt="">
  </div>
</template>

<script>
  import { yuanAjax } from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    data(){
      return {
        propData: {
          title: '爱拍',
          link: '/index'
        },
      }
    },
    components:{
      HeaderCon
    },
    mounted() { // 实例上去之后调用该钩子

    },
    methods: { //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

    }
  }
</script>

<style lang="css">
  .live {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #fff;
    position: relative;
  }
  .live img {
    position: fixed;
    width: 300px;
    height: 300px;
    top: 37%;
    left: 250px ;
  }
</style>