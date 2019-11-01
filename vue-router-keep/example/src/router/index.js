import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/main/enter',
  },
  {
    path: '/main/enter',
    name: 'mainEnter',
    component: () => import('@/pages/main/enter.vue')
  },
  {
    path: '/main/list',
    name: 'mainList',
    component: () => import('@/pages/main/list.vue')
  },
  {
    path: '/main/detail/:i',
    name: 'mainDetail',
    component: () => import('@/pages/main/detail.vue')
  },
]

const router = new Router({
  mode: 'hash',
  routes: routes
})

export default router
