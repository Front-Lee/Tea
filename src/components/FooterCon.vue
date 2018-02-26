<template>
  <div class="page-tabbar">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item :id="item.linkName" v-for="(item,index) in tabList" :key="index" >
        <img slot="icon" :src="selected===item.linkName?'/static/img/'+item.tab_img_active:'/static/img/'+item.tab_img" >
        {{item.title}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
    name:'page-tabbar',
    data(){
        return {
        selected:'/index',
        tabList:[
            {
              title:'首页',
              linkName:'index',
              tab_img:'tab-icon-01.png',
              tab_img_active:'tab-iconing-01.png'
            },
            {
              title:'促销',
              linkName:'promotion',
              tab_img:'tab-icon-02.png',
              tab_img_active:'tab-iconing-02.png'
            },
            {
              title:'发现',
              linkName:'find',
              tab_img:'tab-icon-03.png',
              tab_img_active:'tab-iconing-03.png'
            },
            {
              title:'订单',
              linkName:'order',
              tab_img:'tab-icon-04.png',
              tab_img_active:'tab-iconing-04.png'
            },
            {
              title:'我的',
              linkName:'my',
              tab_img:'tab-icon-05.png',
              tab_img_active:'tab-iconing-05.png'
            }

          ]
        };
    },
    watch:{
      selected:function(val,oldVal){
        this.$router.replace(val);
      }
    },
    mounted: function () {
      var _this = this;
      _this.selected = _this.$route.name
    }

}
</script>

<style lang="less" >
  .page-tabbar{
    max-width:750px;position:relative;
    .mint-tabbar{height:96px;border-top:1px solid #d7d2cf;background:#fff;}
    .mint-tabbar.is-fixed{width:750px;margin:auto;}
    .mint-tab-item{color:#939799;padding:10px 0;}
    .mint-tabbar > .mint-tab-item.is-selected{color:#ff2741;background:#fff;}
    .mint-tab-item-label{font-size:20px;}
    .mint-tab-item-icon{width:54px;height:54px;margin:0 auto;}
    .mint-tab-item-icon > * {display: block !important;  width: 100% !important;  height: 100% !important; }
  }

</style>
