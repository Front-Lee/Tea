<template>
  <div class="newAddress">
    <HeaderCon :propData="propData"></HeaderCon>
    <div class="field-list">
      <mt-field placeholder="收货人" v-model="username" class="field-item" :disableClear="disableClear"></mt-field>
      <mt-field placeholder="联系电话" type="tel" :attr="{ maxlength: 11}" v-model="phone" class="field-item"
                :disableClear="disableClear"></mt-field>
      <div class="sel">选择省份:

      </div>
      <div class="sel">选择城市:

      </div>
      <div class="sel">选择区/县:

      </div>
      <mt-field v-model="xq" placeholder="详细地址" class="field-item" :disableClear="disableClear"></mt-field>
      <!--弹出内容-->
      <template>
        <area-select type='all' :level='2' v-model='selected'></area-select>
      </template>

    </div>
    <!--设为默认地址-->
    <mt-checklist v-model="value" :options="options" class="set-default"></mt-checklist>
    <!--删除和保存-->
    <div class="bottom">
      <a class="bottom-item" @click="clear">删除</a>
      <a class="bottom-item" @click="send">保存</a>
    </div>
  </div>
</template>

<script>
  import {yuanAjax, getCookie} from '../js/common.js';
  import HeaderCon from '@/components/HeaderCon';
  export default {
    name: 'newAddress',
    data() {
      return {
        propData: {
          title: '',
          link: ''
        },
        disableClear: true,
        selected: [],
        username: "",
        phone: "",
        xq: "",
        value: [],
        options: [{label: "设为默认地址", disabled: false}],
        adds: {}
      }
    },
    components: {
      HeaderCon
    },
    mounted(){
      var _this = this;
      if (_this.$route.query.aid) {
        yuanAjax(_this, 'Api/Address/get_addr', {
          user_id: getCookie('chaUID'),
          addr_id: _this.$route.query.aid
        }, function (res) {
          if ( res.status == 1) {
            _this.adds = res.adds
            _this.username = res.adds.name
            _this.phone = res.adds.tel
            _this.xq = res.adds.address_xq
            _this.$set( _this.selected, 0, res.adds.sheng)
            _this.$set( _this.selected, 1, res.adds.city)
            _this.$set( _this.selected, 2, res.adds.quyu)

            if ( res.adds.is_default == 1){
              _this.$set(_this.value,0,{label: "设为默认地址", disabled: false})
            }
          }
        })
      }
    },
    methods: {
      clear(){
        var _this = this;
        if (_this.$route.query.aid){
          yuanAjax(_this,'Api/Address/del_adds',{
            user_id: getCookie('chaUID'),
            id_arr: _this.$route.query.aid
          },function (res) {
            if (res.status == 1) {
              _this.$toast({
                message: '删除成功',
                duration: 1000
              });
              var pm = _this.$route.fullPath.substr(_this.$route.fullPath.indexOf('?'));
              if(_this.$route.query.aid){
                _this.$router.push({path: `/address${pm}`});
              } else {
                _this.$router.push({path: `/address${pm}&aid=${id}`});
              }
            } else{
              _this.$toast({
                message: res.err,
                duration: 1000
              });
            }
          })
        } else{
          _this.$router.push({path: '/address'});
        }
      },
      send(){
        var _this = this;
        if (_this.selected.length <= 0) {
          return false;
        }
        var arr = [];
        for (var i = 0, len = _this.selected.length; i < len; i++) {
          for (var k in _this.selected[i]) {
            arr[i] = k;
          }
        }
        yuanAjax(_this, 'Api/Address/add_adds', {
          user_id: getCookie('chaUID'),
          receiver: _this.username,
          tel: _this.phone,
          sheng: arr[0],
          city: arr[1],
          quyu: arr[2],
          adds: _this.xq,
          code: 0,
          isDefault: _this.value.length ? true : false,
          id: _this.$route.query.aid
        }, function (res) {
          if (res.status == 1) {
            _this.$toast({
              message: '保存成功',
              duration: 1000
            });
            setTimeout(function () {
              var pm = _this.$route.fullPath.substr(_this.$route.fullPath.indexOf('?'));
              _this.$router.push({path: `/address${pm}`});
            }, 1000)
          } else {
            _this.$toast({
              message: res.err,
              duration: 1000
            });
          }
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .newAddress {
    overflow: hidden;

    .field-list {
      margin-top: 20px;
      background: #fff;
      border-top: 1px solid #cdccd3;
      border-bottom: 1px solid #cdccd3;
      padding-left: 28px;
      position: relative;
      .sel {
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        border-top: 1px solid #e2e1e0;
      }
      .field-item {
        display: block;
        background: #fff;
        width: 100%;
        height: 100px;
        line-height: 100px;
        border-top: 1px solid #cdccd3;
        margin-top: -1px;

        .mint-cell-value {
          height: 100px;
          line-height: 100px;
          font-size: 28px;
        }

      }
      .mint-field .mint-cell-title {
        width: 155px;
      }

      .mint-cell-text {
        font-size: 28px;
      }

    }
    .set-default {
      text-align: center;

      .mint-cell {
        background: transparent;
        height: 100px;
        display: block;
      }

      .mint-cell-wrapper {
        line-height: 100px;
        font-size: 28px;
      }

      .mint-checkbox-core {
        width: 28px;
        height: 28px;
      }

      .mint-checkbox-core::after {
        left: 9px;
        top: 6px;
        width: 6px;
        height: 10px;
      }

    }
    .mint-popup-bottom {
      width: 100%;
    }

    .picker-items {
      pointer-events: none;
    }

    .picker-item {
      color: #969696;
      font-size: 35px;
      height: 64px;
      line-height: 64px;
    }

    .picker-item.picker-selected {
      font-size: 40px;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      color: #000;
      height: 78px;
      line-height: 78px;
    }

    /*.picker-toolbar{height:70px;display:flex;justify-content: space-between;border-bottom:1px solid #dfdfdf;}*/
    .popup {

      .tool-bar {
        height: 70px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dfdfdf;
      }

      .cancel, .confirm {
        width: 160px;
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        color: #7b7b7b;
      }

      .confirm {
        color: #00d200;
      }

    }

    .bottom {
      height: 86px;
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      border-top: 1px solid #d0d0d0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;

      .bottom-item {
        width: 50%;
        text-align: center;
        height: 100%;
        line-height: 56px;
        font-size: 26px;
        color: #000;
      }

      .bottom-item:nth-of-type(2) {
        color: #ff0039;
        border-left: 1px solid #d4d4d4;
      }
    }
    .area-select .el-select {
      position: absolute;
      left: 150px;
    }
    .area-select .el-select:nth-of-type(1) {
      top: 215px;
    }
    .area-select .el-select:nth-of-type(2) {
      top: 315px;
    }
    .area-select .el-select:nth-of-type(3) {
      top: 415px;
    }
    .area-select .el-select input {
      border: 0 !important;
    }
  }
</style>
