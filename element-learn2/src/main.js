import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router/index.js';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 注意使用require语法
  error: require('./assets/img/error.jpg'),
  loading: require('./assets/img/loading.png'),
  // 尝试次数
  attempt: 3,
  // 触发请求正确图片地址的事件行为
  listenEvents: ['scroll', 'mousewheel', 'animationend', 'transitionend'],
  // 开启组件懒加载
  // 通常组件懒加载是通过webpack的懒加载实现(异步引入js)的
  // 但是使用webpack方式不好知道什么时候引入成功了,没有触发时机
  // <lazy-component></lazy-component>也是一个功能型的提供插槽和emit事件的组件
  // 然而vue-lazy-component更好用
  // lazyComponent: true,
  // adapter: {
  //     loaded(listener, fromCache, Init) {
  //         console.log(listener);
  //     },
  //     loading(listener, Init) {
  //         // console.log('loading')
  //     },
  //     error(listener, Init) {
  //         // console.log('error')
  //     }
  // },
});

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
