<template lang="html">
  <div class="findDetails">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="find_cont">
      <h3>{{ pro[0].name }}</h3>
      <p>{{ pro[0].viewed_count }}人浏览</p>
      <div class="c">{{ pro[0].content }}</div>
    </div>
  </div>
</template>

<script>
  import { yuanAjax } from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';

  export default {
    data(){
      return {
        propData : {
          title: '文章详情',
          link: '/find'
        },
        num: 10,
        pro: {}
      }
    },
    components:{
      HeaderCon
    },
    methods: { //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

    },
    mounted() { // 实例上去之后调用该钩子
      var _this = this;
      yuanAjax(_this,'api/essay/getEssayDetail',{
        essay_id : _this.$route.query.id
      },function (res) {
        if ( res.status == 1){
          _this.pro = res.data
        }
      })
    },
  }
</script>

<style lang="less">
  .findDetails {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
  }
  .find_cont {
    padding: 20px;
    h3 {
      font-size: 50px;
      margin-bottom: 10px;
    }
    p {
      color: #bab9ba;
      margin-bottom: 10px;
    }
    .c {
      text-indent: 25px;
      color: #555557;
      font-size: 33px;
    }
  }
</style>