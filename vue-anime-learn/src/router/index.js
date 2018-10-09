import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      component: () => import('@/pages/base/index.vue'),
      children: [
        {
          path: 'test',
          name: 'test',
          component: () => import('@/pages/base/children/test/test.vue')
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: () => import('@/pages/base/children/timeline/timeline.vue')
        },
      ]
    },
  ]
})
