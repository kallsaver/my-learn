import Vue from 'vue';
import Router from 'vue-router';
import PageIndexList from '../pages/page-index-list/page-index-list.vue';
import PageExamples from '../pages/page-examples/page-examples.vue';
import PageFeatures from '../pages/page-features/page-features.vue';
import PageTest from '../pages/page-test/page-test.vue';
import PageOptions from '../pages/page-options/page-options.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/test',
      component: PageTest
    },
    {
      path: '/',
      component: PageFeatures
    },
    {
      path: '/options',
      component: PageOptions
    },
    {
      path: '/features',
      component: PageFeatures
    },
    {
      path: '/examples',
      component: PageExamples
    },
    {
      path: '/examples',
      component: PageExamples,
      children: [
        {
          // 子路由前面不能加/
          path: 'index-list',
          component: PageIndexList
        }
      ]
    },
  ]
});
