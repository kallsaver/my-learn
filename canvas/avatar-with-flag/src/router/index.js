import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/pages/index/index.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    }
  ]
})
