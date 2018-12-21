import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('@/pages/index/index.vue'),
    },
    {
      path: '/base',
      component: () => import('@/pages/base/index.vue'),
      meta: {
        title: '基础',
        index: 1
      },
      children: [
        {
          path: 'emit',
          name: 'emit',
          component: () => import('@/pages/base/children/emit/emit.vue'),
          meta: {
            title: '事件分发/自定义监听事件',
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
