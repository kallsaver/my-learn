<template>
  <page :title="$route.meta.title">
    <template slot="start">
      <i class="play" :class="playClass" @click="togglePlay"></i>
    </template>
    <div class="playback">
      <div class="demo" v-if="demo === 0">
        <div class="el"></div>
        <div class="el"></div>
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
      playStatus: false
    }
  },
  computed: {
    playClass() {
      return this.playStatus ? 'w-playback-icon-pause' : 'w-playback-icon-start'
    }
  },
  mounted() {
    this.demo = 0
  },
  methods: {
    togglePlay() {
      this.playStatus = !this.playStatus
      this[`demo${this.demo}`]()
    },
    demo0() {
      if (!this.clickDemo0) {
        this.clickDemo0 = true
        this.playDemo0 = anime({
          targets: '.el',
          translateX: 250,
          delay(el, i, length) {
            return i * 100
          },
          direction: 'alternate',
          loop: true,
          autoplay: false
        })
      }
      this.playStatus ? this.playDemo0.play() : this.playDemo0.pause()
    },
    demo1() {
    },
    demo2() {
    },
    demo3() {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './fonts/w-playback-icon.css'

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

.play
  position: fixed
  top: 50px
  right: 15px
  font-size: 26px
  color: #666

.playback
  width: 100%
  height: 100vh
  padding: 50px
  position: relative

</style>
