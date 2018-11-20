<template>
  <page
    :title="$route.meta.title">
    <div class="timeline">
      <div ref="circle" class="circle" :key="index"
        v-for="(item, index) in circleList"></div>
      <div class="button" @click="togglePlayStatus">{{playText}}</div>
    </div>
  </page>
</template>

<script>
import anime from 'animejs'

export default {
  data() {
    return {
      rectList: [{name: 0}, {name: 1}],
      circleList: [0, 1, 2],
      playStatus: false,
    }
  },
  computed: {
    playText() {
      return this.playStatus ? '暂停' : '开始'
    }
  },
  watch: {
    playStatus(newVal) {
      if (newVal) {
        this.timeline.play()
      } else {
        this.timeline.pause()
      }
    }
  },
  mounted() {
    anime({
      targets: this.$refs.rect,
      translateX: [
        {
          value: 100,
          duration: 1200
        },
        {
          value: 0,
          duration: 800
        }
      ],
      rotate: [
        {
          value: '1turn',
          duration: 1200
        },
        {
          value: '0turn',
          duration: 800
        }
      ],
      duration: Infinity,
      loop: true,
      delay(target, index) {
        return index * 200
      }
    })

    this.timeline = anime.timeline({
      // ['normal', 'reverse', 'alternate']
      direction: 'alternate',
      duration: 1000,
      loop: Infinity,
      autoplay: this.playStatus
    })

    this.timeline.add({
      targets: this.$refs.circle[0],
      translateX: 100
    }).add({
      targets: this.$refs.circle[1],
      translateX: 100,
      offset: '-=600'
    }).add({
      targets: this.$refs.circle[2],
      translateX: 100
    })
  },
  methods: {
    togglePlayStatus() {
      this.playStatus = !this.playStatus
    }
  }
}
</script>

<style lang="stylus" scoped>
.timeline
  width: 100%
  height: 100vh
  padding: 50px
  .circle
    width: 50px
    height: 50px
    background: red
    border-radius: 50%
</style>
