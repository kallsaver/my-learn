<template>
  <div id="app" class="app">
    <transition name="move">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    transition() {
      return this.$route.meta.index === 1 ? 'move' : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.view
  transition: all 0.3s
  // tranform和fixed不能同时并存
  // tranform会让fixed失效
  transform: none
  &.move-enter
    transform: translate3d(100%, 0, 0)
  &.move-enter-active
    background: red
    transform: translate3d(100%, 0, 0)
</style>
