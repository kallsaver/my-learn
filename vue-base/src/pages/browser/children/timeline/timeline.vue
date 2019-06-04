<template>
  <page
    :title="$route.meta.title"
    @start="move"
    @to-top="toTop">
    <div class="timeline">
      <div class="move-content">
        <div class="move-left" :class="{'left': isMoveLeft}"></div>
      </div>
      <div class="move-transform" :class="{'transform': isMoveTransform}"></div>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
      isMoveLeft: false,
      isMoveTransform: false
    }
  },
  mounted() {
  },
  methods: {
    move() {
      // 4x slowdown
      this.isMoveLeft = true
      // this.isMoveTransform = true
    },
    toTop() {
      this.isMoveTransform = false
    }
  },
}
</script>

<style lang="stylus" scoped>
.timeline
  padding: 30px
  .move-content
    position: relative
    height: 100px
    margin-bottom: 20px
    .move-left
      width: 100px
      height: 100px
      background: gold
      position: absolute
      left: 0
      top: 0
      transition: all 0.5s
      &.left
        left: 200px
  .move-transform
    width: 100px
    height: 100px
    background: gold
    transition: all 0.5s
    &.transform
      transform: translate3d(200px, 0, 0)
</style>
