<template>
  <page
    :title="$route.meta.title"
    @start="start">
    <div class="css-properties">
      <div class="demo" v-if="demo === 0">
        <div class="el"></div>
      </div>
      <div class="demo" v-if="demo === 1">
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
      demo: 0
    }
  },
  mounted() {
    this.demo = 1
  },
  methods: {
    start() {
      this[`demo${this.demo}`]()
    },
    demo0() {
      anime({
        targets: '.el',
        translateX: [200],
        opacity: 0.5,
        borderRadius: ['50%'],
        easing: 'easeInOutQuad',
      })
    },
    demo1() {
      anime({
        targets: '.el',
        translateX: [200],
        scale: 1.5,
        rotate: '1turn',
        // 默认的回弹效果的easing
        easing: 'easeOutElastic',
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.el
  width: 50px
  height: 50px
  background: red

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
