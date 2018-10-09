// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import i18n from './language';
import router from './router';
import axios from 'axios';
// import fastclick from 'fastclick';
import './common/stylus/main.styl';
import { createAPI } from './common/helpers/create-api.js';
import BodyDialogDemo from './body-components/body-dialog-demo/body-dialog-demo.vue';
// fastclick.attach(document.body);
import BodyTransitionDemo from './vue-plugins/body-body-transition/index.js';

// 里面已经createAPI化了,这种做法有点浪费代码并且可读性不如把createAPI在main.js中声明;
Vue.use(BodyTransitionDemo);

// createAPI创造出来的方法不能通过Vue.prototype方法调用,只能通过实例
createAPI(Vue, BodyDialogDemo, [], true);

Vue.prototype.$http = axios;
Vue.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
});
