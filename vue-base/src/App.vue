<template>
  <div id="app" class="app">
    <router-view class="router-view"></router-view>
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
