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
      path: '/filepond',
      component: () => import('@/pages/filepond/index.vue'),
      children: [
        {
          path: '/filepond/test',
          name: 'test',
          component: () => import('@/pages/filepond/children/test/test.vue'),
          meta: {
            title: 'test',
          },
        }
      ]
    },
    {
      path: '/cube-ui',
      component: () => import('@/pages/cube-ui/index.vue'),
      children: [
        {
          path: '/cube-ui/upload',
          name: 'upload',
          component: () => import('@/pages/cube-ui/children/upload/upload.vue'),
          meta: {
            title: 'upload',
          },
        }
      ]
    },
  ]
})
