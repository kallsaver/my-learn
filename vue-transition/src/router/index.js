import Vue from 'vue'
import Router from 'vue-router'
import Ramjet from '@/pages/ramjet/ramjet.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ramjet',
      component: Ramjet
    }
  ]
})
