<template>
    <div class="upgrade-rule">
      <div class="rule-header">
          <div class="rule-title">升级规则</div>
      </div>
      <div class="rule-list">
        <p v-for="(item,index) in ruleList">{{item.rule}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'upgrade-rule',
      data(){
          return {
            ruleList:[
              {rule:"1、促销商品为活动商品，购买促销商品的客户可以免费升级，升级成功即可获得更高价值的商品；"},
              {rule:"2、促销活动时间为每日10：00-次日2：00，升级方式为购买促销商品选择升级（商品参与升级后根据开奖结果判断升级是否成功）。开奖时间为：每日10：00-22：00每十分钟开奖一次，22：00-次日2：00；"},
              {rule:"3、开奖信息在升级促销界面中的“榜”字查看；"},
              {rule:"4、升级成功后可以选择提货或者退货；升级失败可以选择提货或者兑换积分，积分在商城中兑换积分商品；"},
              {rule:"5、提货和发货：客户购买商品后，需要在我的订单中选择商品提货，这样商城才会安排发货，发货时间为客户提货申请后72小时内处理。"}
            ]
          }
      }
    }
</script>

<style lang="less" scoped>
.upgrade-rule{
min-height:100vh;background:#fff;
  .rule-header{width:750px;height:270px;background:url(../assets/images/header-bg.jpg) no-repeat;background-size:100%;overflow:hidden;
    .rule-title{width:320px;height:102px;margin:85px auto 0 auto;line-height:102px;font-family:'宋体';text-align:center;font-size:60px;color:#b16b2c;background:url(../assets/images/large-lace.png) no-repeat;background-size:cover;}
  }
  .rule-list{padding:0 50px;line-height:50px;font-size:28px;
    p{margin-bottom:28px;}
  }


}
</style>
