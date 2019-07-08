import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index.vue'
import List from '@/pages/list/list.vue'
import Detail from '@/pages/detail/detail.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/',
      name: 'detail',
      component: Detail
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('fromName', from.name)
  next()
})

export default router
