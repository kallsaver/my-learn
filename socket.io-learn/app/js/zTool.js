(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.zTool = factory());
}(this, (function () {
  'use strict';

  function SimpleMap() {
    this.map = {};
    this.mapSize = 0;
  }

  SimpleMap.prototype.put = function () {

  }

  return {
    SimpleMap,
  };
})));
