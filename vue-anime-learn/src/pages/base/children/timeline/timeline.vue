<template>
  <page
    :title="$route.meta.title"
    @start="start">
    <div class="timeline">
      <div class="demo" v-if="demo === 0">
        <div class="circle"></div>
        <div class="triangle"></div>
      </div>
      <div class="demo" v-if="demo === 1">
        <div class="square"></div>
        <div class="circle"></div>
        <div class="triangle"></div>
      </div>
      <div class="demo" v-if="demo === 2">
        <div class="square"></div>
        <div class="circle"></div>
        <div class="triangle"></div>
      </div>
      <div class="demo" v-if="demo === 3">
        <div class="square el"></div>
        <div class="circle el"></div>
        <div class="triangle el"></div>
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
    this.demo = 3
  },
  methods: {
    start() {
      this[`demo${this.demo}`]()
    },
    demo0() {
      // 基本的timeline,配置默认,详情看源码
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
    },
    demo1() {
      let timeline = anime.timeline({
        // ['normal', 'reverse', 'alternate']
        direction: 'normal',
        duration: 1000,
      })
      timeline.add({
        targets: '.square',
        translateX: 250,
        easing: 'easeOutExpo',
        offset: 5000
      }).add({
        targets: '.circle',
        translateX: 250,
        easing: 'easeOutExpo',
        offset: 0
      }).add({
        targets: '.triangle',
        translateX: 250,
        easing: 'easeOutExpo',
        // add默认在一个队列结束另一个才开始
        // offset可以提前滞后offset: '-=600'(相对上一个运动的队列的时间轴)
        // 一个timeline的所有队列的offset都是相对这个timeline绝对时间轴
        // 绝对时间轴队列都是timeline的独立个体,有了offset他们互不干扰
        // 他们默认timeline的动画配置(也可以自己有实例)
        offset: '-=300'
      })
    },
    demo2() {
      let timeline = anime.timeline({
        direction: 'alternate',
        loop: true
      })
      timeline.add({
        targets: '.square',
        // 动画帧 也可写成
        // translateX: [{value: 80}]
        // translateX: [{value: 100, duration: 1200}]
        // rotate: [{value: '1turn', duration: 1200}]
        translateX: [80, 160, 250],
        translateY: [30, 60, 60],
        duration: 3000,
      }).add({
        targets: '.circle',
        translateX: [80, 160, 250],
        translateY: [30, -30, -30],
        offset: 200
      }).add({
        targets: '.triangle',
        translateX: [80, 250],
        translateY: [-60, -30, -30],
        offset: 400
      })
    },
    demo3() {
      let timeline = anime.timeline({
        targets: '.el',
        // offset函数
        delay(el, i) {
          return i * 200
        },
        duration: 500,
        easing: 'easeOutExpo',
        direction: 'alternate',
        loop: true
      })

      timeline.add({
        translateX: 200
      }).add({
        // opacity会保留到下一个队列,transfrom不能
        opacity: 0.5,
        translateX: 200,
        scale: 2,
      }).add({
        opacity: 1,
        translateX: 0,
        scale: 1,
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

.square
  width: 50px
  height: 50px
  background: red

.timeline
  width: 100%
  height: 100vh
  padding: 50px

</style>
