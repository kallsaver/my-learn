<template>
  <page :title="$route.meta.title"
    :is-show-start="false">
    <div class="callback">
      <i class="play" :class="playClass" @click="togglePlay"></i>
      <div class="demo" v-if="demo === 0">
        <div class="el"></div>
        <div class="el"></div>
        <div class="el"></div>
        <div class="text">{{beginText}}</div>
        <div class="text">{{currentTimeText}}</div>
        <div class="text">{{progressText}}</div>
        <div class="text">{{completeText}}</div>
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
      beginText: '',
      currentTimeText: '',
      progressText: '',
      completeText: '',
    }
  },
  computed: {
    playClass() {
      return this.playStatus ? 'w-callback-icon-pause' : 'w-callback-icon-start'
    }
  },
  watch: {
    playStatus(newVal) {
      console.log(newVal)
      newVal ? this.playDemo.play() : this.playDemo.pause()
    }
  },
  mounted() {
    this.demo = 0
    this[`demo${this.demo}`]()
  },
  methods: {
    start() {
      this[`demo${this.demo}`]()
    },
    togglePlay() {
      this.playStatus = !this.playStatus
      this.playStatus ? this.playDemo.play() : this.playDemo.pause()
    },
    demo0() {
      this.playDemo = anime({
        targets: '.el',
        translateX: 250,
        delay(el, i) {
          return 0
        },
        duration(el, i) {
          return 2000
        },
        autoplay: false,
      })

      this.playDemo.begin = (anim) => {
        this.beginText = `begins in ${Math.round(anim.currentTime)}ms`
      }

      this.playDemo.update = (anim) => {
        this.currentTimeText = `currentTime ${anim.currentTime}ms`
        this.progressText = `progress ${Math.round(anim.progress)}%`
      }

      // update和run的功能差不多
      // this.playDemo.run = (anim) => {
      //   console.log('run')
      // }

      this.playDemo.complete = (anim) => {
        this.completeText = `complete in ${Math.round(anim.currentTime)}ms`
      }

      // finished带Promise接口
      this.playDemo.finished.then(() => {
        console.log('finished')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './fonts/w-callback-icon.css'

.el
  width: 20px
  height: 20px
  background: red
  margin-bottom: 10px

.callback
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
  .text
    line-height: 36px
    height: 36px
</style>
