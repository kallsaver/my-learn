import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from './store'

import '@/common/stylus/index.styl'
import Page from '@/components/page/index.js'
import VueRouterCache from 'vue-router-cache'

Vue.use(Cube)
Vue.use(Page)

Vue.use(VueRouterCache, {
  router: router,
  max: 10,
  isSingleMode: true,
  isDebugger: true,
  directionKey: 'direction',
  getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
