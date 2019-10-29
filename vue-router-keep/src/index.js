import { inBrowser } from './util/env'
import Component from './components/router-keep'
import { routerMiddle } from './router-middle/index'
import { routerKeepHelper } from './global-api/router-keep-helper'

let isInstalled = false

function install(Vue, options) {
  if (isInstalled) {
    return
  }
  isInstalled = true
  Vue.component(Component.name, Component)
  Vue.prototype.$routerKeepHelper = routerKeepHelper
  routerMiddle(Vue, options)
}

const RouterKeep = {
  install: install,
}

if (inBrowser && window.Vue) {
  window.Vue.use(RouterKeep)
}

export default RouterKeep
