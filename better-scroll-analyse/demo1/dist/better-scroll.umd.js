(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.BScroll = factory());
}(this, (function () { 'use strict';

function initMixin(BScroll) {
  BScroll.prototype._init = function (options) {};
}

function coreMixin(BScroll) {
  BScroll.prototype._init = function (options) {};
}

var BScroll = function BScroll(el, options) {
  // scroll-wrapper
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
  // scroll-content
  this.scroller = this.wrapper.children[0];
};

initMixin(BScroll);
coreMixin(BScroll);

return BScroll;

})));
