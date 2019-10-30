import config from './config/index'

let isInstalled = false

function install(Vue, options) {
  if (isInstalled) {
    return
  }
  isInstalled = true
  Object.assign(config, options)
  const routerKeepHelper = require('./api/router-keep-helper').default
  Vue.prototype.$routerKeepHelper = routerKeepHelper
  const Component = require('./components/router-keep').default
  Vue.component(Component.name, Component)
  const routerMiddle = require('./router-middle/index').default
  routerMiddle(Vue, config)
}

const RouterKeep = {
  install: install,
}

export default RouterKeep
