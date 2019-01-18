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
      component: () => import('@/pages/action/index.vue'),
      meta: {
        title: '实战',
      },
    },
    {
      path: '/vue',
      component: () => import('@/pages/vue/index.vue'),
      meta: {
        title: 'vue',
      },
      children: [
        {
          path: 'vuex',
          name: 'vuex',
          component: () => import('@/pages/vue/children/vuex/vuex.vue'),
          meta: {
            title: 'vuex',
          },
        },
        {
          path: 'async-components',
          name: 'async-components',
          component: () => import('@/pages/vue/children/async-components/async-components.vue'),
          meta: {
            title: 'async-components',
          },
        }
      ]
    },
    {
      path: '/browser',
      component: () => import('@/pages/browser/index.vue'),
      meta: {
        title: 'vue',
      },
      children: [
        {
          path: 'repaints',
          name: 'repaints',
          component: () => import('@/pages/browser/children/repaints/repaints.vue'),
          meta: {
            title: '重排',
          },
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: () => import('@/pages/browser/children/timeline/timeline.vue'),
          meta: {
            title: '谷歌浏览器的performance',
          },
        },
      ]
    },
  ]
})
