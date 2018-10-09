import Vue from 'vue';
import { createAPI } from '../../common/helpers/create-api';
import BodyTransitionDemo from '../../body-components/body-transition-demo/body-transition-demo.vue';

BodyTransitionDemo.install = function () {
  createAPI(Vue, BodyTransitionDemo, ['hide'], true);
  // createAPI创造出来的方法只能用实例来调用,Vue.prototype不能调用,
  // 因此创建一个中转站bus
  // const AjaxBus = new Vue();

  // Vue.prototype.$ajaxBus = AjaxBus.$createBodyTransitionDemo();
};

export default BodyTransitionDemo;

