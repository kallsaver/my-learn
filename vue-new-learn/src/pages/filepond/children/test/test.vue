<template>
  <page :title="$route.meta.title">
    <div class="test">

    </div>
  </page>
</template>

<script>
import anime from 'animejs'

export default {
  mounted() {
    console.log(66)
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.test
  padding-top: 50px
</style>
