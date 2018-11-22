<template>
  <page :title="$route.meta.title"
    :is-show-start="false">
    <div class="playback">
      <i class="play" :class="playClass" @click="togglePlay"></i>
      <i class="restart w-playback-icon-restart" @click="restart"></i>
      <i class="reverse w-playback-icon-reverse" @click="reverse"></i>
      <div class="demo" v-if="demo === 0">
        <div class="el"></div>
        <div class="el"></div>
        <div class="el"></div>
        <div class="input-wrapper">
          <input class="progress" step="2" type="range" min="0" max="100"
            v-model="progress">
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
      demo: 0,
      playStatus: false,
      loop: true,
      progress: 0
    }
  },
  computed: {
    playClass() {
      return this.playStatus ? 'w-playback-icon-pause' : 'w-playback-icon-start'
    }
  },
  watch: {
    playStatus(newVal) {
      newVal ? this.playDemo.play() : this.playDemo.pause()
    },
    progress(newVal) {
      this.playDemo.seek(this.playDemo.duration * (newVal / 100))
    }
  },
  mounted() {
    this.demo = 0
  },
  methods: {
    togglePlay() {
      this[`demo${this.demo}`]()
      this.playStatus = !this.playStatus
    },
    restart() {
      this.playDemo.restart()
    },
    reverse() {
      // reverse貌似有点问题
      this.loop = false
      this[`demo${this.demo}`]()
      this.playDemo.play()
      this.playDemo.reverse()
    },
    demo0() {
      if (!this.clickDemo0) {
        this.clickDemo0 = true
        this.playDemo = anime({
          targets: '.el',
          translateX: 250,
          delay(el, i, length) {
            return i * 100
          },
          direction: 'alternate',
          loop: this.loop,
          autoplay: false,
        })
      }
    },
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

.playback
  width: 100%
  height: 100vh
  padding-top: 150px
  position: relative
  .play
    position: fixed
    top: 50px
    right: 15px
    font-size: 26px
    color: #666

  .restart
    position: fixed
    top: 80px
    right: 20px
    font-size: 18px
    color: #666

  .reverse
    position: fixed
    top: 110px
    right: 16px
    font-size: 24px
    color: #666

  .input-wrapper
    padding-top: 50px
    text-align: center

</style>
