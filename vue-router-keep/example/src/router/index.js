import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index/enter',
  },
  {
    path: '/index/enter',
    name: 'indexEnter',
    component: () => import('@/pages/index/enter.vue')
  },
]

const router = new Router({
  mode: 'hash',
  routes: routes
})

export default router
