import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/visual',
      component: () => import('@/pages/visual/index.vue'),
      children: [
        {
          path: '/visual/line-breaks',
          name: 'line-breaks',
          component: () => import('@/pages/visual/children/line-breaks/line-breaks.vue')
        },
      ],
    },
  ]
})
