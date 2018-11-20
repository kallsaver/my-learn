<template>
  <page
    :title="$route.meta.title"
    @right-click="start">
    <div class="timeline">
      <div class="demo demo1" v-if="demo === 0">
        <div class="circle"></div>
        <div class="triangle"></div>
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
  watch: {
  },
  mounted() {
    this.showDemo(0)
  },
  methods: {
    showDemo(index) {
      this.demo = index
    },
    start() {
      this[`demo${this.demo}`]()
    },
    demo0() {
      // 基本的timeline
      let timeline = anime.timeline()
      // 通过add添加动画顺序
      timeline.add({
        targets: '.circle',
        translateX: 250,
        easing: 'easeOutExpo'
      }).add({
        targets: '.triangle',
        translateX: 250,
        easing: 'easeOutExpo'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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

.timeline
  width: 100%
  height: 100vh
  padding: 50px
  .demo
    width: 100%

</style>
