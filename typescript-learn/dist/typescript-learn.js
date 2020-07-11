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

  function add(x, y) {
      console.log(x);
      return x + y;
  }
  var myAdd = add;
  myAdd(1, 0);

  // import './type/index'
  var index = {
      version: '1.0.0',
  };

  return index;

})));
