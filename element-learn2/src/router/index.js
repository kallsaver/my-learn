import Vue from 'vue';
import Router from 'vue-router';
import goods from 'components/goods/goods';
import loadingPage from 'components/loading-page/loading-page';
// import ratings from 'components/ratings/ratings';
// import seller from 'components/seller/seller';

// 异步使用路由组件,让js资源按需加载(不是异步加载),因为路由跳转才会执行这个箭头函数
// 有点像后台路由了
const ratings = () => import(/* webpackChunkName: "ratings" */ 'components/ratings/ratings');
const seller = () => import(/* webpackChunkName: "seller" */ 'components/seller/seller');

// 以下更高级的写法的loading配置只适合普通组件,不能用于路由组件
// const ratings = () => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import(/* webpackChunkName: "ratings" */ 'components/ratings/ratings'),
//   // 异步组件加载时使用的组件,貌似没效果
//   loading: loadingPage,
//   // 加载失败时使用的组件
//   // error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 0,
//   // 如果提供了超时时间且组件加载也超时了,
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 0
// });

// const seller = () => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import(/* webpackChunkName: "seller" */ 'components/seller/seller'),
//   // 异步组件加载时使用的组件
//   loading: loadingPage,
//   // 加载失败时使用的组件,貌似没效果
//   // error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 0,
//   // 如果提供了超时时间且组件加载也超时了,
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 0
// });


Vue.use(Router);

const routes = [
  {
    path: '/',
    component: goods,
    name: 'index',
    meta: {
      keepAlive: true,
      title: '商品'
    }
  },
  {
    path: '/goods',
    component: goods,
    name: 'goods',
    meta: {
      keepAlive: true,
      title: '商品'
    }
  },
  {
    path: '/ratings',
    component: ratings,
    name: 'ratings',
    meta: {
      title: '评价'
    }
  },
  {
    path: '/seller',
    component: seller,
    name: 'seller',
    meta: {
      title: '商家'
    }
  }
];

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});
