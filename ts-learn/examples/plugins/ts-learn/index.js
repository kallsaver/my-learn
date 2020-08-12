/*!
 * ts-learn.js v1.0.0
 * (c) 2020-2020 kallsave
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.TsLearn = factory());
}(this, (function () { 'use strict';

  function createSquare(config) {
      config.width += 100;
      return config;
  }
  createSquare({
      name: 'ti',
      color: 'red',
      width: 300,
      height: 100,
      // this不是参数,是函数签名
      getWidth: function () {
          return this.width;
      }
  });

  // import './type/index'
  // import './class/index'
  // import './function/index'
  // import './this/index'
  // import './generics/index'
  // import './reserve/index'
  var index = {
      version: '1.0.0',
  };

  return index;

})));
