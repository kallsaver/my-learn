import Vue from 'vue'
import Router from 'vue-router'
import routes from './options'

Vue.use(Router)

const router = new Router({
  base: '/vue-base/',
  routes,
})

export default router
