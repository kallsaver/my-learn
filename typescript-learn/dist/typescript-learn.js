/*!
 * typescript-learn.js v1.0.0
 * (c) 2020-2020 kallsave
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.TypescriptLearn = factory());
}(this, (function () { 'use strict';

  function init(options) {
      console.log(options.label);
  }
  var init$1 = {
      init: init,
  };

  // import './type/index'
  var index = {
      init: init$1.init,
      version: '1.0.0',
  };

  return index;

})));
