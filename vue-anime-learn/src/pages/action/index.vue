<template>
  <div class="action">
    <index-list :route-index="routeIndex" title="实战"></index-list>
    <div>{{routeIndex}}</div>
    <transition name="move">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import IndexList from '@/components/index-list/index-list.vue'

export default {
  name: 'keep-alive',
  components: {
    IndexList
  },
  computed: {
    routeIndex() {
      return this.$router.options.routes.findIndex((item) => {
        return this.$route.path.indexOf(item.path) !== -1 && item.path !== '/'
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.view
  transition: all 0.3s
  // tranform和fixed不能同时并存
  // tranform会让fixed失效
  transform: none
  &.move-enter-active, &.move-leave-active
    transform: translate3d(100%, 0, 0)
</style>
