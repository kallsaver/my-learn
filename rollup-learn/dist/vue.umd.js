(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vue = factory());
}(this, (function () { 'use strict';

console.log('array.js');

var arrayMethods = {
    name: 'array.js'
}

console.log('observer.js');

var b = function (a) {
 return a * a;
};

var observer = {
    name: 'observer',
    arrayMethods: arrayMethods,
    b: b
}

console.log('index.js');

var b$1 = function (a) {
  return a * a;
};

console.log(b$1(6));

var index = {
  observer: observer
}

return index;

})));
