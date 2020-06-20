<template>
  <div id="app" class="app">
    <transition
      :name="transitionName"
      :mode="transitionMode"
      :duration="transitionDuration">
      <router-cache>
        <router-view class="router-view"></router-view>
      </router-cache>
    </transition>
  </div>
</template>

<script>
import routerTransitionMixins from '@/common/mixins/router-transition.js'

export default {
  mixins: [
    routerTransitionMixins,
  ]
}
</script>

<style>
</style>
