import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ramjet',
      component: () => import('@/pages/ramjet/ramjet.vue')
    }
  ]
})
