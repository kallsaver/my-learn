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
        {
          path: 'class',
          name: 'class',
          component: () => import('@/pages/base/children/class/class.vue'),
          meta: {
            title: 'es6的class',
          },
        },
        {
          path: 'async',
          name: 'async',
          component: () => import('@/pages/base/children/async/async.vue'),
          meta: {
            title: 'es6的async/await',
          },
        },
        {
          path: 'proxy',
          name: 'proxy',
          component: () => import('@/pages/base/children/proxy/proxy.vue'),
          meta: {
            title: 'es6的proxy',
          },
        },
        {
          path: 'Object.defineProperty',
          name: 'Object.defineProperty',
          component: () => import('@/pages/base/children/Object.defineProperty/Object.defineProperty.vue'),
          meta: {
            title: 'Object.defineProperty',
          },
        },
      ]
    },
    {
      path: '/action',
      meta: {
        title: '实战',
      },
    },
  ]
})
