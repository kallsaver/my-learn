<template>
  <page :title="$route.meta.title"
    @start="start">
    <div class="spray-paint">
      <svg xmlns="http://www.w3.org/2000/svg"
        width="100" height="100" viewBox="0 0 100 100">
        <path class="favorite__inactive" d="M50.214 10.067c6.4.204 10.753 25.648 10.753 25.648s26.256-1.803 27.13 2.857c.874 4.66-20.04 16.642-20.04 16.642s9.537 24.303 5.523 26.817c-4.015 2.515-23.545-14.023-23.545-14.023S29.333 84.493 25.633 81.785c-3.7-2.71 6.657-26.472 6.657-26.472S11.234 43.94 12.383 39.108c1.15-4.832 26.55-3.393 26.55-3.393s4.88-25.853 11.28-25.648z" fill="#dbdedd" fill-rule="evenodd"/>
        <defs>
          <mask id="favorite__halo-mask">
            <rect width="100%" height="100%" fill="white"/>
            <circle class="favorite__halo-inner"
              cx="50" cy="50" r="48" fill="black"></circle>
          </mask>
        </defs>
        <circle class="favorite__halo-outer"
          cx="50" cy="50" r="48" fill="#feb53c"
          mask="url(#favorite__halo-mask)"></circle>
      </svg>
    </div>
  </page>
</template>

<script>
import anime from 'animejs'

export default {
  mounted() {
    this._createTimeline()
  },
  methods: {
    _createTimeline() {
      // 配置整个动画的参数
      this.timeline = anime.timeline({
        loop: true,
        easing: 'easeOutQuad',
      })
    },
    start() {
      // .add({
      //   targets: '.favorite__inactive',
      //   duration: 400,
      //   delay: 1000,
      //   easing: 'easeOutQuad',
      //   scale: [
      //     {
      //       value: 1
      //     },
      //     {
      //       value: 0
      //     }
      //   ],
      //   offset: 0,
      // })
      this.timeline
        .add({
          targets: '.favorite__halo-inner',
          r: {
            value: [0, 49],
            duration: 300,
          },
          offset: 0,
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.spray-paint
  padding-top: 50px
  .favorite__inactive
    transform-origin: 50% 50%;

</style>
