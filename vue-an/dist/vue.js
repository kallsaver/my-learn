/*!
 * Vue.js v1.0.0
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  /*  */

  var uid = 0;

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm._uid = uid++;

      vm.$options = options;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
