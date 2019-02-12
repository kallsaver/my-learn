<template>
  <page
    :title="$route.meta.title"
    @start="start">
    <div class="css-properties">
      <div class="demo" v-if="demo === 0">
        <div class="el"></div>
      </div>
      <div class="demo" v-if="demo === 1">
        <div class="el" data-x="160"></div>
        <div class="el" data-x="80"></div>
        <div class="el" data-x="250"></div>
      </div>
      <div class="demo" v-if="demo === 2">
        <div class="el"></div>
      </div>
      <div class="demo" v-if="demo === 3">
        <div class="el"></div>
      </div>
    </div>
  </page>
</template>

<script>
import anime from 'animejs'

export default {
  data() {
    return {
      demo: 0,
    }
  },
  mounted() {
    this.demo = 3
  },
  methods: {
    start() {
      this[`demo${this.demo}`]()
    },
    demo0() {
      anime({
        targets: '.el',
        direction: 'alternate',
        translateX: {
          value: '+=150',
          duration: 1000,
        },
        width: {
          value: '-=10',
          duration: 1800,
          easing: 'easeInOutSine'
        },
        height: {
          value: '*=4',
          duration: 1800,
          easing: 'easeInOutSine'
        },
      })
    },
    demo1() {
      anime({
        targets: '.el',
        direction: 'alternate',
        // value函数不会在loop模式下不会再次执行,而是执行一次
        loop: true,
        delay(el, i, length) {
          return anime.random(0, 1000)
        },
        translateX(el) {
          return el.getAttribute('data-x')
        },
        translateY(el, i) {
          return 50 + (-50 * i)
        },
        scale(el, i, length) {
          return (length - i) + 0.25
        },
        rotate() {
          return anime.random(-360, 360)
        },
        duration() {
          return anime.random(1200, 1800)
        },
      })
    },
    demo2() {
      anime({
        targets: '.el',
        // 相同的delay可以让不同的value在相同的时间轴开始执行
        // scaleX多个帧的duration相加刚好是translateX的duration
        // 实现效果叠加
        translateX: [
          { value: 250, duration: 1000, delay: 500, elasticity: 0 },
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 },
        ],
      })
    },
    demo3() {
      anime({
        targets: '.el',
        translateX: [
          { value: 250, duration: 1000, delay: 500, elasticity: 0 },
          { value: 0, duration: 1000, delay: 500, elasticity: 0 }
        ],
        translateY: [
          { value: -40, duration: 500, elasticity: 100 },
          { value: 40, duration: 500, delay: 1000, elasticity: 100 },
          { value: 0, duration: 500, delay: 1000, elasticity: 100 }
        ],
        scaleX: [
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 },
          { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
          { value: 1, duration: 900, elasticity: 300 }
        ],
        scaleY: [
          { value: [1.75, 1], duration: 500 },
          { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 },
          { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
          { value: 1, duration: 450 }
        ],
        loop: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el
  width: 20px
  height: 20px
  background: red
  margin-bottom: 10px

.circle
  width: 50px
  height: 50px
  background: red
  border-radius: 50%

.triangle
  pointer-events: none
  position: relative
  width: 0
  height: 0
  border-style: solid
  border-width: 0 28px 48px 28px
  border-color: transparent transparent red transparent

.square
  width: 50px
  height: 50px
  background: red

.css-properties
  width: 100%
  height: 100vh
  padding: 50px

</style>
