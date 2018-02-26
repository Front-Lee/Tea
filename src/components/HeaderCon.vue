<template>
  <div class="page-header">
    <mt-header :title="propData.title">

      <a v-if="!propData.link" onClick="window.history.go(-1)"  slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>


      <router-link v-else :to="propData.link" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>


    </mt-header>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    props: ['propData'],
    mounted() { // 实例上去之后调用该钩子

    },
    methods: { //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
      go() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="less">
  .page-header{
  .mint-header{height:88px;background:#fff;color:#e53f55;font-size:32px;box-shadow: 0 3px 3px 1px #f6f5f4;}
  .mintui-back:before{font-size:40px;}
  .mint-header-title{overflow:visible;}
  .mintui-more:before{font-size:40px;}
  }
</style>