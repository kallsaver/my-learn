import { initMixin } from './init.js'

function Vue(options) {
  if (this instanceof Vue) {
    console.warn('要用new使用')
  }
  this._init(options)
}

initMixin(Vue)
