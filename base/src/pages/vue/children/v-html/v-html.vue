<template>
  <div class="v-html">
    <div v-html="html"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    setTimeout(() => {
      let str = `<div>55</div>`
      this.html = str
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>

</style>
