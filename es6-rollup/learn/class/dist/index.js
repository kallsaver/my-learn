(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.learn = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Rectangle = function Rectangle(height, width) {
    classCallCheck(this, Rectangle);

    this.height = height;
    this.width = width;
};

var p = new Rectangle();

var Rectangle$1 = function Rectangle(height, width) {
    classCallCheck(this, Rectangle);

    this.height = height;
    this.width = width;
};

var p$1 = new Rectangle$1();

var index = {
    p: p$1
};

return index;

})));
