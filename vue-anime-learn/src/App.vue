<template>
  <div id="app" class="app">
    <template v-show="isAllComponentMounted">
      <div class="button">
        <cube-button>
          <router-link tag="div" to="/base">基础</router-link>
        </cube-button>
      </div>
      <div class="button">
        <cube-button>
          <router-link tag="div" to="/action">实战</router-link>
        </cube-button>
      </div>
    </template>
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
.app
  .button
    margin-bottom: 30px
</style>
