function initMixin(BScroll) {
  BScroll.prototype._init = function (options) {

  };
}

function coreMixin(BScroll) {
  BScroll.prototype._init = function (options) {

  };
}

class BScroll {
  constructor(el, options) {
    // scroll-wrapper
    this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
    // scroll-content
    this.scroller = this.wrapper.children[0];
  }
}

initMixin(BScroll);
coreMixin(BScroll);

export default BScroll;
