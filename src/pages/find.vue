<template>
  <div class="find">
    <!--<div :class="['find-box', {item.photo.length > 1 ? 'find-box-h-b':'find-box-h-a'}]" v-for="(item,index) in findList" :key="index">-->
    <div
      class="find-box"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="20"
    >
      <div class="find-box-h-a" style="width: 100%;" @click="findClick(item.id)" v-for="(item,index) in findList"
           :key="index">
        <div class="find-title">{{item.name}}</div>
        <div class="img-box">
          <img :src="item.photo" alt="" class="find-img" :key="index">
        </div>
        <div class="find-browse">{{item.viewed_count}}人浏览</div>
      </div>
    </div>
    <FooterCon></FooterCon>
  </div>
</template>

<script>
  import {yuanAjax} from '../js/common.js';
  import FooterCon from '@/components/FooterCon' //
  export default {
    name: 'find',
    data() {
      return {
        findList: [],
        page: 1,
        hasloadMore: false

      }
    },
    components: {
      FooterCon
    },
    methods: {
      getEssayList() {
        var _this = this;
        _this.hasloadMore = false;
        yuanAjax(this, 'api/essay/getEssayList', {
          page: _this.page,
        }, function (res) {
          if (res.status == 1) {
            if (res.essaylist.length != 0) {
              _this.hasloadMore = true;
              _this.page++;
            } else if (res.essaylist.length == 0 && !_this.hasloadMore) {
              _this.$toast({
                message: '没有更多数据',
                duration: 1000
              });
            }
            _this.findList = _this.findList.concat(res.essaylist);
          }
        });
      },
      loadMore() {
        var _this = this;
        if (_this.hasloadMore) {
          _this.getEssayList();
        }
      },
      findClick(id) {
        var _this = this;
        _this.$router.push({name: 'findDetails', query: {id: id}})

      }
    },
    mounted: function () {
      var _this = this;
      _this.getEssayList();

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .find {
    min-height: 100vh;
    background: #fff;
    padding-bottom: 97px;

  .find-box {
    border-bottom: 1px solid #e7e6e6;
    box-sizing: border-box;
    padding: 24px 28px;

    position: relative;
    overflow: hidden;

  .find-title {
    color: #000;
    font-size: 32px;
    line-height: 48px;
    height: 90px;
    overflow: hidden;
  }

  .img-box {
    height: 165px;
  }

  .find-img {
    width: 220px;
    height: 165px;
  }

  .find-browse {
    position: absolute;
    left: 0;
    bottom: 24px;
    font-size: 24px;
    color: #999;
  }

  }
  .find-box-h-a {
    position: relative;
    height: 200px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  .find-title {
    width: 420px;
  }

  .img-box {
    margin-top: 5px;
  }

  }
  .find-box-h-b {
    height: 370px;
    display: flex;
    flex-wrap: wrap;

  .find-title {
    width: 100%;
  }

  .img-box {
    margin-left: -17px;
    width: 711px;
    margin-top: -28px;
  }

  .find-img {
    margin-left: 15px;
  }

  }

  }
</style>
