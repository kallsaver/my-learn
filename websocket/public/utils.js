(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.utils = factory());
}(this, (function () {

  'use strict';

  function checkClass (o) {
    return Object.prototype.toString.call(o).slice(8, -1)
  }

  function deepClone (o) {
    let ret
    let instance = checkClass(o)
    if (instance === 'Array') {
      ret = []
    } else if (instance === 'Object') {
      ret = {}
    } else {
      return o
    }

    for (let key in o) {
      let copy = o[key]
      ret[key] = deepClone(copy)
    }

    return ret
  }

  function deepAssign (to, from) {
    for (let key in from) {
      if (!to[key] || typeof to[key] !== 'object') {
        to[key] = from[key]
      } else {
        deepAssign(to[key], from[key])
      }
    }
  }

  function mulitDeepClone (target, ...rest) {
    for (let i = 0; i < rest.length; i++) {
      let source = deepClone(rest[i])
      deepAssign(target, source)
    }
    return target
  }

  let utils = {
    checkClass: checkClass,
    deepClone: deepClone,
    deepAssign: deepAssign,
    mulitDeepClone: mulitDeepClone
  }

  return utils

})));




