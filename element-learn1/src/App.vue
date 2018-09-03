<template>
  <div>
    <vheader :seller="seller"></vheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
  </div>
  <!-- 路由组件也可以传值 -->
  <router-view :seller="seller" :obj="obj" keep-alive></router-view>
</template>

<script>
import { urlParse } from 'common/js/util';
import { getUrlParam } from 'common/js/util';
import header from "./components/header/header.vue";
import Vue from 'vue';

const ERR_OK = 0;

export default {
  // .vue文件的data之所以是函数
  // 因为.vue文件是可以复用的,
  // 如果是对象会影响到第二次复用
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = getUrlParam(window.location.href);
          console.log('ddd', queryParam);
          return queryParam.id;
        })()
      },
      obj: {
        name: 'obj'
      }
    };
  },
  created() {
    Vue.obj = this.obj;
    // setTimeout(() => {
    //   console.log(this.obj.name)
    // },3000);

    // seller作为全局路由能用到的数据,header,rating,seller等组件都用到
    // 需要注意的问题是seller一开始传值是空对象,better-scroll要监听seller的变化重新初始化
    this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
      response = response.body;
      //console.log(res);
      if (response.errno == ERR_OK) {
        // 不丢弃id
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
  },
  components: {
    vheader: header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
// stylus支持css,所以是可以用{}的
@import './common/stylus/mixin.styl';

.tab {
  display: flex;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  // html的border-1px是为了适应dpi
  // 这里的border-bottom-1px函数是为了传颜色
  border-bottom-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    flex: 1;
    text-align: center;

    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);

      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>