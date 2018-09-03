import '@/common/stylus/index.styl'
import './stylus/style.styl'
import { TweenMax, Sine, TimelineMax, Power4 } from 'gsap/TweenMax'

window.onload = function () {
  const tl = new TimelineMax()
  tl.to('.star', 3, {x: 300, ease: Power4.easeOut})
  tl.to('.circle', 3, {x: 300, ease: Power4.easeOut}, '-=2')
  tl.to('.hex', 3, {x: 300, ease: Power4.easeOut})
}
