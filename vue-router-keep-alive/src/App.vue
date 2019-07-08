<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.addEventListenerPopstate()
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        console.log(newVal)
        console.log(window.history.length)
      },
      immediate: true
    }
  },
  methods: {
    addEventListenerPopstate() {
      window.addEventListener('popstate', (e) => {
        console.log(e.state)
        console.log(this.$route.name)
      })
    }
  },

}
</script>
