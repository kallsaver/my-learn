<template>
  <page
    :title="$route.meta.title"
    @start="start">
    <div class="svg-path">
      <div class="demo" v-if="demo === 0">
        <div id="motion-path">
          <div class="circle"></div>
          <svg width="256" height="112" viewBox="0 0 256 112">
            <path fill="none" stroke="currentColor" stroke-width="1" d="M8,56 C8,33.90861 25.90861,16 48,16 C70.09139,16 88,33.90861 88,56 C88,78.09139 105.90861,92 128,92 C150.09139,92 160,72 160,56 C160,40 148,24 128,24 C108,24 96,40 96,56 C96,72 105.90861,92 128,92 C154,93 168,78 168,56 C168,33.90861 185.90861,16 208,16 C230.09139,16 248,33.90861 248,56 C248,78.09139 230.09139,96 208,96 L48,96 C25.90861,96 8,78.09139 8,56 Z"></path>
          </svg>
        </div>
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
    this.demo = 0
  },
  methods: {
    start() {
      this[`demo${this.demo}`]()
    },
    demo0() {
      let path = anime.path('#motion-path path')
      anime({
        targets: '.circle',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'linear',
        duration: 2000,
        loop: true
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.el
  width: 20px
  height: 20px
  background: red

.circle
  width: 20px
  height: 20px
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

.svg-path
  width: 100%
  height: 100vh
  padding: 50px

</style>
