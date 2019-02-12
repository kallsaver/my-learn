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
          path: 'timeline',
          name: 'timeline',
          component: () => import('@/pages/base/children/timeline/timeline.vue'),
          meta: {
            title: '时间队列',
          },
        },
        {
          path: 'css-properties',
          name: 'css-properties',
          component: () => import('@/pages/base/children/css-properties/css-properties.vue'),
          meta: {
            title: 'css属性',
          },
        },
        {
          path: 'svg-properties',
          name: 'svg-properties',
          component: () => import('@/pages/base/children/svg-properties/svg-properties.vue'),
          meta: {
            title: 'svg属性',
          },
        },
        {
          path: 'value',
          name: 'value',
          component: () => import('@/pages/base/children/value/value.vue'),
          meta: {
            title: 'value的用法',
          },
        },
        {
          path: 'playback',
          name: 'playback',
          component: () => import('@/pages/base/children/playback/playback.vue'),
          meta: {
            title: 'playback',
          },
        },
        {
          path: 'callback',
          name: 'callback',
          component: () => import('@/pages/base/children/callback/callback.vue'),
          meta: {
            title: 'callback',
          },
        },
        {
          path: 'svg-path',
          name: 'svg-path',
          component: () => import('@/pages/base/children/svg-path/svg-path.vue'),
          meta: {
            title: 'svg-path',
          },
        },
        {
          path: 'svg-points',
          name: 'svg-points',
          component: () => import('@/pages/base/children/svg-points/svg-points.vue'),
          meta: {
            title: 'svg-points',
          },
        },
        {
          path: 'svg-stroke-dash-offset',
          name: 'svg-stroke-dash-offset',
          component: () => import('@/pages/base/children/svg-stroke-dash-offset/svg-stroke-dash-offset.vue'),
          meta: {
            title: 'svg-stroke-dash-offset',
          },
        },
        {
          path: 'upload',
          name: 'upload',
          component: () => import('@/pages/base/children/upload/upload.vue'),
          meta: {
            title: 'upload',
          },
        }
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
        {
          path: 'twitter',
          name: 'twitter',
          component: () => import('@/pages/action/children/twitter/twitter.vue'),
          meta: {
            title: 'twitter泼墨效果',
          },
        },
      ]
    },
  ]
})
