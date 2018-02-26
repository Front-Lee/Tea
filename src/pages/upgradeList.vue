<template>
  <div class="upgrade-list">
    <div class="theme">
      <img src="https://cha.iweiji.cc/images/5869240-0cbc246c9784bfe2.jpg" alt="" class="theme-img">
      <router-link to="" class="rule">规则</router-link>
    </div>
    <!-- 已开奖记录 -->
    <ul class="award-record">
      <li class="award-head">
        <div class="award-td">开奖时间</div>
        <div class="award-td">开奖期号</div>
        <div class="award-td">开奖号码</div>
        <div class="award-td">鸡/藕</div>
      </li>
      <li class="award-tr" v-for="(item, index) in list">
        <div class="award-td">{{ item.opentime }}</div>
        <div class="award-td">{{ item.expect }}</div>
        <div class="award-td">{{ item.opencode }}</div>
        <div class="award-td">{{ item.result == 'odd' ? '鸡'  : '藕' }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { yuanAjax } from '../js/common.js';
  export default {
    name: 'upgradeList',
    data() {
      return {
        list: []
      }
    },
    mounted: function () {
      var _this = this;
      yuanAjax(_this, 'Api/Cai/lists', {

      }, function (res) {
        if (res.status == 1) {
          _this.list = res.data.list
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .upgrade-list{
  .theme{  width:750px;height:408px;position:relative;}
  .theme-img{width:750px;height:408px;}
  .rule{position:absolute;left:0;top:120px;width:24px;padding:20px 18px;height:100px;line-height:32px;background:rgba(229,63,85,0.8);border-radius:0 15px 15px 0;text-align:center;font-size:24px;color:#fff;}
  .rule:before{content:"";display:block;width:24px;height:24px;margin:8px auto;background:url(../assets/images/icon-question.png) no-repeat;background-size:cover;}
  /*升级榜数据*/
  /*.upgrade-content{font-size:24px;width:750px;}*/
  /*.upgrade-head,.upgrade-tr{display:flex;width:750px;padding:0 20px;box-sizing: border-box;}*/
  /*.upgrade-head{color:#ccc;height:60px;line-height:60px;background:#fff;}*/
  /*.upgrade-tr{height:80px;line-height:80px;color:#000;}*/
  /*.upgrade-tr:nth-of-type(even){background:#f2f2f2;}*/
  /*.upgrade-tr:nth-of-type(odd){background:#fff;}*/
  /*.upgrade-td{overflow:hidden;}*/
  /*.upgrade-td:nth-of-type(1),.upgrade-th:nth-of-type(1){width:330px;box-sizing:border-box;padding-left:54px;position:relative;text-align:left;display:flex;align-items: center;}*/
  /*.upgrade-td:nth-of-type(2),.upgrade-th:nth-of-type(2){width:190px;text-align:left;}*/
  /*.upgrade-td:nth-of-type(3),.upgrade-th:nth-of-type(3){width:190px;text-align:right;box-sizing: border-box;}*/
  /*.upgrade-td:nth-of-type(3){padding-right:15px;}*/
  /*.upgrade-sign{width:40px;height:40px;position:absolute;left:0;top:20px;line-height:40px;text-align:center;color:#666;font-family:Arial, Helvetica, sans-serif;}*/
  /*.upgrade-tr:nth-of-type(2) .upgrade-sign{background:url(http://upload-images.jianshu.io/upload_images/5869240-88e5153d881f8ef1.png) no-repeat;background-size:100%;color:transparent;}*/
  /*.upgrade-tr:nth-of-type(3) .upgrade-sign{background:url(http://upload-images.jianshu.io/upload_images/5869240-504a88784fc5600c.png) no-repeat;background-size:100%;color:transparent;}*/
  /*.upgrade-tr:nth-of-type(4) .upgrade-sign{background:url(http://upload-images.jianshu.io/upload_images/5869240-1126c44339d817bd.png) no-repeat;background-size:100%;color:transparent;}*/
  /*.upgrade-avatar{width:50px;height:50px;border-radius:50%;margin-right:20px;}*/
  /* 已开奖记录 */
  .award-record{width:750px;overflow:hidden;font-size:24px;}
  .award-record::before{content:"已开奖记录";display:block;background:#fff;border-bottom:1px solid #c5c3c4;height:80px;line-height:80px;color:#b16b2c;font-size:30px;padding-left:25px;}
  .award-head,.award-tr{height:60px;line-height:60px;display:flex;justify-content: space-between;text-align:center;}
  .award-head{background:#e5e5e5;color:#999;}
  .award-tr:nth-child(odd){background:#fff;}
  .award-tr:nth-child(even){background:#f2f2f2;}
  .award-td:nth-of-type(1){width:276px;}
  .award-td:nth-of-type(2){width:204px;}
  .award-td:nth-of-type(3){width:154px;}
  .award-td:nth-of-type(4){width:116px;}
  .award-head .award-td:first-child{text-align: left;text-indent: 25px;}
  }
</style>
