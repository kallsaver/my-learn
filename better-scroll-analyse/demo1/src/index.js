import { initMixin } from './scroll/init'
import { coreMixin } from './scroll/core'

class BScroll {
  constructor(el, options) {
    // scroll-wrapper
    this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
    // scroll-content
    this.scroller = this.wrapper.children[0]
  }
}

initMixin(BScroll)
coreMixin(BScroll)

export default BScroll
