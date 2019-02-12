<template>
  <div id="app" class="app">
    <cube-button v-show="isAllComponentMounted">
      <router-link tag="div" to="/visual">视觉效果</router-link>
    </cube-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAllComponentMounted: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('allComponentMounted')
      this.isAllComponentMounted = true
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
