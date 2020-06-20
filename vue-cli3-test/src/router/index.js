import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: () => import('../pages/index/index.vue'),
      name: 'Index',
      meta: {
        isUseRouterTransition: true,
      }
    },
  ]
})

export default router

