import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index.vue'//首页1
import Promotion from '@/pages/promotion.vue'//促销页1
import Find from '@/pages/find.vue'//发现1
import Order from '@/pages/order.vue'//订单页1
import My from '@/pages/my.vue'//我的1
import Details from '@/pages/details.vue'//商品详情1
import Recharge from '@/pages/recharge.vue'//充值页1
import UpgradeList from '@/pages/upgradeList'//商品升级排行榜
import Upgrade from '@/pages/upgrade.vue'//升级页猜鸡藕
import UpgradeEnvelope from '@/pages/upgradeEnvelope.vue'//升级猜红包
import UpgradeRule from '@/pages/upgradeRule.vue'//升级规则
import Wallet from '@/pages/wallet.vue' //我的钱包 1
import Auction from '@/pages/auction.vue'//积分商城1
import Login from '@/pages/login.vue'//登录页1
import Register from '@/pages/register.vue'//注册页1
import Forget from '@/pages/forget.vue' //忘记密码页1
import Live from '@/pages/live.vue' //美拍页1
import FindDetails from '@/pages/FindDetails.vue' //文章详情1
import Jifendetails from '@/pages/jifendetails.vue' //积分详情1
import Pay from '@/pages/pay.vue' //购买后商品详情
import Address from '@/pages/address.vue' //添加地址页面
import NewAddress from '@/pages/newAddress.vue' //购买后填写地址页
import Class from '@/pages/class.vue' //分类页面
import ClassAuction from '@/pages/classAuction.vue'//分类商城1
import Caidetails from '@/pages/caidetails.vue'//猜商品详情

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path:'/promotion',
      name:'promotion',
      component:Promotion
    },
    {
      path:'/find',
      name:'find',
      component:Find
    },

    {
      path:'/order',
      name:'order',
      component:Order
    },
    {
      path:'/my',
      name:'my',
      component:My
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
    ,
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/forget',
      name:'forget',
      component:Forget
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge
    },
    {
      path: '/upgrade-rule',
      name: 'upgrade-rule',
      component: UpgradeRule
    },
    {
      path: '/auction',
      name: 'auction',
      component: Auction
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/detailsPage',
      name: 'details',
      component: Details
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      component: Upgrade
    },
    {
      path: '/upgradeEnvelope',
      name: 'upgradeEnvelope',
      component: UpgradeEnvelope
    },
    {
      path: '/upgradeList',
      name: 'upgradeList',
      component: UpgradeList
    },
    {
      path: '/live',
      name: 'live',
      component: Live
    },
    {
      path: '/findDetails',
      name: 'findDetails',
      component: FindDetails
    },
    {
      path: '/jifendetails',
      name: 'jifendetails',
      component: Jifendetails
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/newAddress',
      name: 'NewAddress',
      component: NewAddress
    },
    {
      path: '/class',
      name: 'class',
      component: Class
    },
    {
      path: '/classAuction',
      name: 'classAuction',
      component: ClassAuction
    },
    {
      path: '/caidetails',
      name: 'caidetails',
      component: Caidetails
    }
  ]
})
