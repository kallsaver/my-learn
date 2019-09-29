<template>
  <div :class="$style['app']">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" module>
.app {
  height: 100%;
}
</style>
