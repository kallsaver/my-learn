<template>
  <page
    :title="$route.meta.title"
    @start="start">
    <div class="css-properties">
      <div class="demo" v-if="demo === 0">
        <div id="svgAttributes">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <polygon points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100 " fill="currentColor"></polygon>
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
      anime({
        targets: '#svgAttributes polygon',
        points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
        easing: 'easeInOutExpo'
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
