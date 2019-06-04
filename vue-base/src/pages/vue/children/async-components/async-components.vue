<template>
  <page
    :title="$route.meta.title">
    <div class="async-components">
      <div class="show-test" @click="loadAsyncComponents"></div>
      <template v-if="show">
        <test></test>
      </template>
    </div>
  </page>
</template>

<script>
// import Vue from 'vue'

// Vue.component('test', function (resolve) {
//   require(['./components/test'], resolve)
// })

const Test = (resolve) => require(['./components/test.vue'], resolve)

export default {
  components: {
    Test
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    loadAsyncComponents() {
      this.show = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.async-components
  .show-test
    width: 100px
    height: 100px
    background: gold
</style>
