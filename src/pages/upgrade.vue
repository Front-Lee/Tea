<template>
  <div class="upgrade">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="upgrade-title">猜鸡藕</div>
    <div class="upgrade-explanation">促销产品为私人订制款，确定下单后不可退货</div>
    <div class="pro-list">
      <div class="pro-box">
        <div class="pro-price">{{data.origin_product.price_yh}}</div>
        <img class="pro-img" :src="data.origin_product.photo_x"/>
        <div class="pro-txt">{{data.origin_product.name }}</div>
      </div>
      <div class="pro-box">
        <div class="pro-price">{{data.up_product.price_yh}}</div>
        <img class="pro-img" :src="data.up_product.photo_x"/>
        <div class="pro-txt">{{data.up_product.name}}</div>
      </div>
    </div>
    <!-- 开奖计时 -->
    <div class="upgrade-countdown">
      <div>第<span class="upgrade-red">{{num}}</span>期</div>
      <div>开奖倒计时<span class="upgrade-red">{{time}}</span></div>
    </div>
    <div class="upgrade-choose">
      <img @click="jfunc" class="choose-img" :src="jimg[j]"/>
      <img @click="ofunc" class="choose-img" :src="oimg[o]"/>
    </div>
    <mt-button @click="upgradeBtn" class="upgrade-btn">立即升级</mt-button>
    <!-- 已开奖记录 -->
    <ul class="award-record">
      <li class="award-head">
        <div class="award-td">开奖时间</div>
        <div class="award-td">开奖期号</div>
        <div class="award-td">开奖号码</div>
        <div class="award-td">奇/偶</div>
      </li>
      <li class="award-tr" v-for="(item, index) in data.kaijiang_list">
        <div class="award-td">{{item.opentime}}</div>
        <div class="award-td">{{item.expect}}</div>
        <div class="award-td">{{item.opencode}}</div>
        <div class="award-td">{{ item.result == 'odd' ? '鸡' : '藕' }}</div>
      </li>
    </ul>

    <!--模态眶-->
    <mt-popup v-model="is_show_model">
      <div class="msg-box">
        <div class="msg-close" @click="closeBox"></div>
        <div class="msg-title">升级中</div>
        <div class="msg-txt">升级中，请等待第{{num}}期开奖结果</div>
      </div>
    </mt-popup>
  </div>

</template>

<script>
  import {yuanAjax, getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'upgrade',
    data() {
      return {
        propData: {
          title: '猜鸡偶',
          link: ''
        },
        data: {
          origin_product: {
            price_yh: ''
          },
          up_product: {
            price_yh: ''
          }
        },
        list: [],
        jimg: ['data:image/png;base64,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', 'data:image/png;base64,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'],
        oimg: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAzFBMVEUAAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAACaAAD/4WfMcDP502GtKhPZjEDyxVqgDgbmqU2nHA3st1SzOBrAVSe6RyDfmkfGYy3TfjpAhyQiAAAAM3RSTlMABAgRDCwVGh4kVE7iNHOPaUKlrH7aY1nx03luOTAoyPjsvLNeSD78mIqF6LiTwUXNn/XL9SJbAAAOpUlEQVR42uzT2W7aUBCA4X/s4wUbL2wGAzFgY7bQ1DDv/26VUKPeFJXFbSI139VcnfNLo+HLly9f/nfjJEnSwuKTkc20X1bVJPl0ZQBWxOcgYIFv8/HsacBP88SZNnu7Gnkuwsdyxw6/GmUntucgkQfi89GcXj075UvdLla67Za7OJjb2IDFO+PwTxVZf6W/Mdr7WBn4XMjad/k3zPdhtdKrlqf8GIjHOz+u+WvEBFO7zsYvu1xv0N3D+MVwURib1lngxflgdR7EXZ3kept+KFnY2a8NF5FDq9zdsSm8belYpPlW77BL170aGToAErfZZVWv62NzqGID2UTvNPSPwaazcSzaFKYBruUl5R5wSr1f1WGcd0xIe+SgexdvMRPATbb6iHNmfC/sgCe0IqpOIWAMYIYTfdQoknXPwwQpz5PmYPGTl0z0GR0xzHw6luFJMszeJ5yFPqcXvVh894XMNanwsPm3ZsNFtJi7iT6pNOu8h+kAtSM8KtXGBylwhru619enbfOJHgDYjDwe5KWlDRjHzbBPXW3JDIBh4fOQzHbBFsvdyKzAXmpbYgB371Qv3M+uAOtNvtnUNaSq7XaZOn6NuJNbDmwgOdd+COC/aosSuXyxWxXcxXJmAqbR4yzfAJuztupNADnpJL2r6iAAe9XGA8TvXj+uMq7TN73XTgAZqA6FW8lxDjBT7RaXodErRmsvGDx0DE0PIHvVyQHhJsM+QLjarmrAnwbXnp4F+8nji4wA801XPd9wgygGisE6PPdAnDypu1ey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', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAsVBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb///+ysrL19fWDg4PFxcXs7OxwcHDZ2dl5eXni4uKMjIygoKCWlpbPz8+pqam8vLzu94qDAAAAKnRSTlMABQoPFB0sJxhiPzcxT6ThVfnp0ci58Gp7RNlbj0mslHUhv3CAs5qG9Yu5ksuXAAAOLUlEQVR42uzUWXKbUBSE4f/eyzzPIAkkEEbIZ/8LTJUzPMUVDSR2VfwtoLufmi9fvnz532V937eu5pNRQZecl6XpP90yAB3xaWiwLT6e1WX8EPbOWK1m2dseio9lZQ6/GHVRxnZQkQ3YfDQnGOakzEWqRiStL2MWGixA8ZN2+KdcPynkN/arjfZh4rvDZPFvmF23NPKuPCnrTNn8NI0Df43SWWcN/iG6lHKDdIVDpHnjaovNafDm8lhcj2MqTSm3SWL82H31DW9Ch015p7p0vbx2NG0p97i0fjBA5wCoectdein8ulyX0YDfyJ1e7DoLpsDRbCluYyzt9ecVcM5yv2UiK10dsx21yquFV7UKsPpcHnH1te3FE3iKTURLMgBGA+alkUftIw6Bh4lbnqeqVfGD3TfyDFdp5glXG57V+XyncCp5zi6MNDtb4XvaVzwsPFUBb6Iq9Hp5Um38MsC4wODwsFZKG5SL012GXSJPy8tGXgAI9h4P8traAMaxfEySykZaADrX5iG+ZYFR2grU7GJy2coIYL06S8T9zALoMyfDMEAr25kBzDAWIXfy6qMB+utgxwB2IRvq1VvFpXC5i3ZmBaaUet4HQHCVTZ0B1EWaljvoFwWwipQeoKZU3pPX49Ce5V4nBaijSKe4laoDgFYkdQHmSt6xP3jZMZcHfD9Ev5BmRXGTLgGICykGwO4y+b1yzl4beVQVAeYkzW7S3CAcAfd4GK4B4JT9kL4TnMoz8gPASSodKP7I6wGqxFpDONRJnKqz/BX5N1rsdDlRKAjD8AuuiOKCG8Zdokkj4ho1939hMyBGk5hwmKp5fliWf/yq+9CnNQ+Uu9NWoUYiSwdeh4Slzb1UtfGsEO5L8h+0HYB8vZcjycAEFtXME+A06yZPelOkaouyVbDdvh9ExUsZYCwtElTGgCtOJQ80q2Yly1ykbYk63wudNqKgmgWY5M2EVLYGTzIuFgBq5qzKSEReJQXvYq+Ua6oBdNu/57IrkG242QKRbs6di0i3LSkE3sVWVPQvd1s1y88GQ2A+1ogZrWE4km1JY+fFVqKiC+CIxY+0Xh6KYgCYnQnF6PmzW/KzR53aexdLUbK4jC+Tn8waQOVZA3DNGsOGyLA9kp+t/PXbt2TLdLHq0bivNjV+UO0AowJAAVMzrI5MW7/9MIwS+Msvwd5Umxhr60BNRjyWrwKXiasbUG5pma7R7Mkvzl7IX+4eVCsQVXYWaEmZR/TGAspzQkYG3Z6A3ks43v6Dhp28yFGUdYFCfcEjCylcW8gArDEwlwRHL3aWq8N1QARRMOXbcdEo80CrCbkpoSyYrxpkJNG7d+HfngIvFh87FS1As5t8p73M4NkBqMzAgHyhJok2a+/iEFVqufU+8c+ipARUJMc3jhRxeoScsFDwpNkSUmvjMYz0QKBcLkM6fGNNYTgC0AtADliIir33O1EygbxUM3yh1Wdg14j/MyoxKzmi5Oz9KhAlfaAvM74oSQFnypWZaWaqomD1vvYeWW9Py7/OK1Fkgt4e8YXdg54LkMtABrKGJDoEvvfQm6RmAU154hNN+hSlA5AnioUlCd6+1GkfnA/LuHHp1bMw+3YD1QeUpMuVo/Esv1h728+h1sdN2FIvdJJ/0YGC9L6e+AyuzAGN0IS8/CbwvljGd9F1X06vCXpV8tyr9Mg1pAVYFCGxhzvvQ/CxLmyiWfEu/6gMlrjcs+aYUeCiTQ0NyhJSWI2Ph3XYw7CD0ZuDhFbn03a9377v0h36vDS5M2m8MhN5hrlVbOoaWtIo3fiX3l3OuL+6rFn7t6iUd0PjLMqqwLTNHUMWWCIzcN1xJ6mHtyt5+TfC9ctPwTmqzds29TiN6TB74U5fBjRFKjB9ei7HsZJzBdetb715MDUCP+UMM6Eg5qdYRRrSzkCv3MypxZLNKnoN7tbA1S3UfiVxg3cpRgQNlxJXozqIzIFhpoUJTEXNbn/57qhcR9+Lrd9u2/M2xZnHeiZDTK+3KYq4wJQeoYaouAXxV9exdSve9ZCJIhsYWPf3tE1exAGesQCyomJzuhvzIsGlTv7fkMfD6vazXxTVdRj0Na4GYlFsywSooOeBsSgIA3x430anPfgo0nGXekQUPq+oZXGh1zAI1QaAKwl2h/P68+UTxDXbxLGWx9QXpBNGKXM1kQ6O3SuA06GbB7pJ08H7xN/FHy1vEyLeJnaizoUncUAn4oiBZktbK0pJH7tARxIE3y/qMM9+78VOcoofQ3VdcKUGBpGhGGCLTU1yGH1ycSzlbev4Lel+I9vUC2EfxmJ8VGskFbClh97IUHLJYUmy3WF1rY0fj6mbuKm+pGFARWaQvQ75ClrrD61m2pwoEIThZ7jlUGK88daYOIW6imf+/w/bDWxUNAJW7T4fUin8wFs9PT3d7yBL8Abqu4BaofqwTWXX7rorXJ8Wyeo+Qw9M6YEgRsxs+pO3IZQdBsO2SZEJcRe/+FbWYhV9/f37WySfwQNNquCQIODdVeeY4yY1rz1S8mWtr9Ys6UiXSYZHYUb7kI0LI6lDiYQx0DKa0PcZGkZbrcscPpNwpHzSOMWPqedPy7I+dJiS0J1A02mBP6WlaANzlreA6boVnR2kFNtQPoUGlEHxSHDbMGz2BLQIdK3dbRZrTtOn3j4taSefpAYYZcEZvQR+7x2YYrR9tWPIHMI4vTd/9114uNF6WsvnGQB2GVBIeG+ApgIM0fs+NTXXit+H4T5apYNzSfad3J3CzdcsuTjunihbCIUL7aqAqQK4KBWdYPQm84nSZs06ya5NPADdbNNCOIDDFaMOUJs7oJn0pYMYylwOi/sJdrlby/TjpIEunPGCa7oCY9CaWIwmBKUBODKH9WcqIOH3CLtPhfCpCyAb7A7XVGxEUwZg1dFMHUQlp7O5XqZVFLtvi310beH8Wp2Wy2PxAvaioVTHXNMsw0j2A7wG6OT2EGGq20qepDieopQdXiBcfQhunCS7Cm6lYqJOTABXURoZoUov1OauwIbRbcNYbPApd27NQBf6VQALfJtXc56RVWlWf3RuDunw7Y6bVaKt8OHYg0qZFLpsgvtiEeObzH39JdPyTrqF5J2r65bm8yt84aVpLXylYcYq0vgzcGQsVmCiaSbTDMc75hjd14KT/PwjbXu5jYqKXkvVoXXvzE+h+9bvOVBCM23AzZa1OMnNOWy/LkPsTSnbFU0tD6tR5xYLsFuiDbaCaitAJcuI/xV7DN9qNomyUN7JOhTsnSswkz4/ob5OBTFOHethjTiEYXi4Ws1t9Ge8iL5k7b9VL47fbk1YsGwN8RtVwR0zAyqDEjGKZVlCdPIMrnNN2h2WyQmdqN1efJxj/E+RWjqXLe4ZDGH23gPoASWgV0jV5lJgd8lgtlivzifhr2IbcYz5Je2ebk2l9A7Am4nlQIYJvvy87YxPZ1nytN+crd1lwRo/oPXz7b5TnTCy/UBA10MNoO0Y1Ryj+XSWFS0SWYmDtAi38UkpVwU9G1dpSJufaL+peB05AARYhktdjDJa+Xg3XrXMF1mrfZJix3BV8I6/RlN2wOEHSi0YyA8F8KE/wxSinuGMrNaJa3SZG3d39a1gMfXVigxA4weMsYo6lz7QsZgoANaDeSwZ8BNZ0TmI9x8eFFvDGlNZs3hAuYs2kK8q2HV0QY+RCB608qfonOm7bFcn3x75MJnLgEcELxpu8p2jOwQbNDfHjoiyXrstGKwJolNVeUhHQ/lIPveqlVAQJni5RleYeb++WBawcluyyWMsHfyqlDZi4AuwawPdTopExqtPWTV3kV9KA9SPjiCDsTdCLcu6B7gAI6PxWsnu6rPmrWW4LNIs92QJkSHMHs/AH3uVxAEYKehSVuX/5B0wauAJHuP2Be3GxGkDqgtQkf+VV1C8rkMOdROsil9ygLYG9F7k/8QGLZiRh+YZUG1oXRXwY3H/bhFf+q0ffAfKGrnYsqx48yYAhqkBel/+I/r07xOLiUcBuuOS4C1AAAjQVfzGvwjV73bubUlRGAgD8N8hhHASQUEE5aQ42u//gFsGdmZKrS2PO3Phd0FRXHW6fggUgW6pa/5uPyGYNWPXoJVFkJVjBxi1CHb8qD7Qdn/2MgUQlYWr6FQAeazWOHJb07KIH5EuHItkd2FtJw4OruRogs4iGw4AtQ9NrXN+gATOknDA0TTE1TwX8PaRY7q8NVstDny/ELQ9udAMibI73CK14WWRwoigyfFmfK90UpweGc6obopbhHMBP84CjGOyQD7RouDniJXEUePiNh8zgS0n2sxV1hJSw7KAMuYn6DwYMsCtmqyeMCe9hiHyEgCUdFN+VI6Br3E7e/i8PFLKRIyKPJBwNGje80MyB4MN7tINOcgJRwJibqZ6QrupkrtjtZJ4jKjYKNYIcLRlFhjpcBXx7WYKAyFxt7Jgo2rXaQMgzOGH+EuVQcozvkVNGFmE+8n52PqD3wl8UhJG6zrWoks4Nk2t8nJa1v/oYVLiSUTFg2RBXyO0PRG6CiPhi8ALLBg0y/iyLBd4Hn/Cg2JqB+QLjIQ1XYHWAeAB5DswO4C3vFhXfJB4LlXzoHCFWuBTuoBMd02/K/228UxelHP5XmN/0Hg6Wsx5kGxtoG0ERtQtqQbWebjGkSRBxXlRHxKvEdYxDzrX9QnCo+BzTS9VroSxKOI9n4gaidexJzGPimbTs67CZtcvrbCyRKnIbfR0O+cz85LwWvYq4S9DkcfmxBFzxJdkOx//g3Sj65++0lLgO2Xjdcjv+QqFh1OK8Fq6PG1aliTMSWR2ebZd2/gZ1DZD0pKN7TQuQa1ckfK+WwUtfhbZXv1tRnHgO4QLQvxKhN/m538s9fb29vb26/wB9Tl5C+YahvEAAAAASUVORK5CYII='],
        j: 0,
        o: 1,
        time: '00:00:00', // 倒计时
        timers: '',
        num: '',
        is_show_model: false
      }
    },
    components: {
      HeaderCon
    },
    methods: {
      jfunc(){
        this.j = 0;
        this.o = 1
      },
      ofunc(){
        this.j = 1;
        this.o = 0
      },
      //倒计时
      Timer (maxtime, callback) {
        var that = this;
        //maxtime：时间，单位s
        //id：显示计时器信息的容器id
        //callback：计时器结束回调
        var tmp, day, hours, minutes, seconds;

        function CountDown() {
          // console.log(maxtime)
          if (maxtime >= 0) {
            day = Math.floor(maxtime / (60 * 60 * 24));
            tmp = maxtime - day * 60 * 60 * 24;
            hours = Math.floor(tmp / (60 * 60));
            tmp = tmp - hours * 60 * 60;
            minutes = Math.floor(tmp / (60));
            tmp = tmp - minutes * 60;
            seconds = tmp;
            maxtime -= 1;
            that.time = that.MillisecondToDate(parseInt(maxtime))
          }
          else {
            clearInterval(timer);
            if (typeof callback == "function") callback(); //执行倒计时完成后的回调
          }
        }

        var timer = setInterval(function () {
          if (maxtime > 0) {
            CountDown()
          }
        }, 1000);
        that.timers = timer;

      },
      //毫秒转格式
      MillisecondToDate (value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        // alert(theTime);
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result = String(theTime).length == 1 ? "0" + parseInt(theTime) : parseInt(theTime);//秒
        if (theTime1 > 0) { // 分
          String(theTime1).length == 1 ? result = "0" + parseInt(theTime1) + ":" + result : result = "" + parseInt(theTime1) + ":" + result;
        } else {
          result = '00:' + result;
        }
        if (theTime2 > 0) { //小时
          String(theTime2).length == 1 ? result = "0" + parseInt(theTime2) + ":" + result : result = "" + parseInt(theTime2) + ":" + result;
        } else {
          result = '00:' + result;
        }
        return result;
      },
      //立刻升级
      upgradeBtn(){
        var _this = this;
        var kj = _this.j ? 'even' : 'odd';

        yuanAjax(_this, 'Api/Cai/do_cai', {
          uid: getCookie('chaUID'),
          order_sn: _this.$route.query.order_sn,
          pid: _this.$route.query.pid,
          cai: kj
        }, function (res) {
          if (res.status == 1) {
            _this.is_show_model = true;
            setTimeout(function () {
              _this.$router.push({path: '/order'});
            },1000)
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      },
      closeBox(){
        this.is_show_model = false;
      }
    },
    mounted: function () {
      var _this = this;
      yuanAjax(_this, 'Api/Cai/index', {
        uid: getCookie("chaUID"),
        order_sn: _this.$route.query.order_sn
      }, function (res) {
        if (res.status == 1) {
          _this.data = res.data;
          _this.num = res.data.number
          _this.Timer(parseFloat(res.data.next_time), function () {
            _this.time = '00:00:00';
          });
        } else {
          _this.$toast({
            message: res.err,
            duration: 1000
          });
        }
      })
    }

  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .upgrade {
    width: 750px;
    min-height: 100vh;
    background: url(../assets/images/upgrade-bg.jpg) no-repeat;
    background-size: 100%;
    overflow: hidden;
    /*猜鸡藕*/
    .upgrade-title {
      width: 289px;
      height: 92px;
      font-size: 60px;
      margin: 64px auto 30px auto;
      color: #b16b2c;
      text-align: center;
      line-height: 92px;
      background: url(../assets/images/large-lace.png) no-repeat;
      background-size: cover;
    }
    /*说明*/
    .upgrade-explanation {
      min-height: 92px;
      font-size: 28px;
      padding: 0 30px;
      text-align: center;
      letter-spacing: 1px;
      line-height: 46px;
    }
    /* 两款产品 */
    .pro-list {
      width: 750px;
      height: 400px;
      margin-top: 15px;
      background: url(../assets/images/upgrade-sbg.png) no-repeat;
      background-size: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 30px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .pro-box {
      width: 280px;
      height: 100%;
      overflow: hidden;
    }
    .pro-price {
      width: 160px;
      height: 52px;
      text-align: center;
      line-height: 52px;
      border-radius: 50px;
      color: #fff49c;
      background: #e53f55;
      font-size: 36px;
      margin: 15px auto 18px auto;
    }
    .pro-img {
      width: 200px;
      height: 200px;
      margin: auto;
      display: block;
      border-radius: 8px;
    }
    .pro-txt {
      font-size: 24px;
      color: #fff;
      text-align: center;
      width: 100%;
      overflow: hidden;
      height: 65px;
      line-height: 65px;
    }
    /*开奖倒计时*/
    .upgrade-countdown {
      width: 750px;
      height: 100px;
      line-height: 120px;
      padding: 0 82px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      font-size: 28px;
      text-align: center;
    }
    .upgrade-countdown div {
      width: 280px;
    }
    .upgrade-red {
      padding: 0 8px;
      color: #c51825;
    }
    /* 鸡藕选择icon */
    .upgrade-choose {
      display: flex;
      justify-content: space-between;
      width: 750px;
      box-sizing: border-box;
      padding: 13px 170px;
    }
    .choose-img {
      width: 150px;
      height: 150px;
      display: block;
    }
    /*立即升级按钮*/
    .upgrade-btn {
      width: 300px;
      height: 88px;
      line-height: 88px;
      color: #fff;
      background: #e53f55;
      border-radius: 10px;
      margin: 60px auto 70px auto;
      font-size: 30px;
      display: block;
    }
    /* 已开奖记录 */
    .award-record {
      width: 750px;
      overflow: hidden;
      font-size: 24px;
    }
    .award-record::before {
      content: "已开奖记录";
      display: block;
      background: #fff;
      border-bottom: 1px solid #c5c3c4;
      height: 80px;
      line-height: 80px;
      color: #b16b2c;
      font-size: 30px;
      padding-left: 25px;
    }
    .award-head, .award-tr {
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    .award-head {
      background: #e5e5e5;
      color: #999;
    }
    .award-tr:nth-child(odd) {
      background: #fff;
    }
    .award-tr:nth-child(even) {
      background: #f2f2f2;
    }
    .award-td:nth-of-type(1) {
      width: 276px;
    }
    .award-td:nth-of-type(2) {
      width: 204px;
    }
    .award-td:nth-of-type(3) {
      width: 154px;
    }
    .award-td:nth-of-type(4) {
      width: 116px;
    }
    .award-head .award-td:first-child {
      text-align: left;
      text-indent: 25px;
    }
    .model-bg {
      position: fixed;
      width: 750px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .model-wrap {
      width: 610px;
      min-height: 270px;
      box-sizing: border-box;
      padding: 20px;
      background: #fff;
      top: 410px;
      left: 70px;
      position: absolute;
    }
    .model-title {
      color: #b16b2c;
      font-size: 32px;
      text-align: center;
    }
    .model-txt {
      color: #000;
      font-size: 28px;
      text-align: center;
      line-height: 45px;
      word-wrap: wrap;
      padding: 30px 80px;
    }
    .model-btn-upgrade {
      width: 275px;
      height: 70px;
      line-height: 70px;
      font-size: 28px;
      color: #fff;
      text-align: center;
      border-radius: 10px;
      letter-spacing: 2px;
      background: #ad090b;
      margin: auto;
    }

    .model-close {
      width: 60px;
      height: 60px;
      position: absolute;
      right: -28px;
      top: -28px;
      background: url(http://upload-images.jianshu.io/upload_images/5869240-7d704bf362286d98.png) no-repeat;
      background-size: 100%;
    }.msg-box {
       width: 610px;
       background: #fff;
       box-sizing: border-box;
       padding: 20px;
       text-align: center;
       position: relative;
       .msg-title {
         font-size: 32px;
         color: #b16b2c;
         line-height: 70px;
       }
       .msg-txt {
         font-size: 28px;
         color: #000;
         line-height: 82px;
         span {
           color: #ad090b;
         }
       }
       .msg-links {
         display: flex;
         justify-content: space-between;
         .msg-link {
           width: 170px;
           height: 72px;
           line-height: 72px;
           text-align: center;
           color: #fff;
           font-size: 28px;
           border-radius: 10px;
           margin: 20px 0;
         }
         .msg-link:nth-of-type(1) {
           background: #b16b2c;
         }
         .msg-link:nth-of-type(2) {
           background: #ad090b;
         }
         .msg-link:nth-of-type(3) {
           background: #ad090b;
         }
       }
       .msg-close {
         width: 60px;
         height: 60px;
         background: url(../assets/images/msg-close.png) no-repeat;
         background-size: cover;
         position: absolute;
         right: -26px;
         top: -26px;
       }
     }
  }

</style>
