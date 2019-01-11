<template>
  <page
    :title="$route.meta.title">
    <div class="repaints">
    </div>
  </page>
</template>

<script>
function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
export default {
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style lang="stylus" scoped>

</style>
