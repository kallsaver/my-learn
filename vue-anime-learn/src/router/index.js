import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      component: () => import('@/pages/base/index.vue'),
      meta: {
        title: '基础',
      },
      children: [
        {
          path: 'test',
          name: 'test',
          component: () => import('@/pages/base/children/test/test.vue'),
          meta: {
            title: '测试',
          },
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: () => import('@/pages/base/children/timeline/timeline.vue'),
          meta: {
            title: '时间',
          },
        },
      ]
    },
    {
      path: '/action',
      meta: {
        title: '实战',
      },
      component: () => import('@/pages/action/index.vue'),
      children: [
        {
          path: 'spray-paint',
          name: 'spray-paint',
          component: () => import('@/pages/action/children/spray-paint/spray-paint.vue'),
          meta: {
            title: 'twitter泼墨效果',
          },
        },
      ]
    },
  ]
})
