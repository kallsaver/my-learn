import './rem.js'
import '@/common/less/index.less'
import Vue from 'vue'
import App from './App'
import router from './router'

import Page from '@/components/page/index.js'

import VueRouterKeep from './plugins/vue-router-keep.esm'

Vue.use(Page)
Vue.use(VueRouterKeep, {
  router: router,
  max: 10
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
