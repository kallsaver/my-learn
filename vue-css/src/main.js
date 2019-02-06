import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'

import '@/common/stylus/index.styl'
import BasePage from '@/base-components/page/index.js'

Vue.use(Cube)
Vue.use(BasePage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
