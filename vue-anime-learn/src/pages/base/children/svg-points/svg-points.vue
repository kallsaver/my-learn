<template>
  <page
    :title="$route.meta.title"
    @start="start">
    <div class="svg-points">
      <div class="demo" v-if="demo === 0">
        <div id="morphing">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <g fill="none" fill-rule="evenodd">
              <g fill="currentColor" fill-opacity=".15" transform="translate(0 6)">
                <polygon points="70 0 136.574 48.369 111.145 126.631 28.855 126.631 3.426 48.369"></polygon>
                <polygon points="70 18 119.455 53.931 100.565 112.069 39.435 112.069 20.545 53.931"></polygon>
                <polygon points="70 34.86 101.727 57.911 89.609 95.209 50.391 95.209 38.273 57.911"></polygon>
                <polygon points="70 50.898 84.864 61.697 79.186 79.171 60.814 79.171 55.136 61.697"></polygon>
              </g>
              <polygon class="polymorph" stroke-width="1" stroke="currentColor" points="70 25.055852794259557 119.51189101210238 60.306891012102376 100.82819886687383 118.56263481846432 51.47608987897621 100.57514720574044 4.481852794259559 54.74165392738573 "></polygon>
            </g>
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
        targets: '#morphing .polymorph',
        points: [
          { value: '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369' },
          { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
          { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
          { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
        ],
        easing: 'easeOutQuad',
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

.svg-points
  width: 100%
  height: 100vh
  padding: 50px

</style>
