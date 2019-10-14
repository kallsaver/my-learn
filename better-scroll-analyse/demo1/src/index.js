import { initMixin } from './scroll/init'

class BScroll {
  constructor(el, options) {
    // scroll-wrapper
    this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
    // scroll-content
    this.scroller = this.wrapper.children[0]
    console.log(this._init)
  }
}

initMixin(BScroll)

export default BScroll
