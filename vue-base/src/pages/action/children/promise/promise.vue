<template>
  <page
    :title="$route.meta.title">
    <div class="class">
    </div>
  </page>
</template>

<script>
import loadjs from 'loadjs'

export default {
  mounted() {
    function Promise() {}
    loadjs([
      './static/promise-polyfill.js'
    ], { returnPromise: true }).then(() => {
      const a = new window.ES6Promise((resolve) => {
        resolve()
      })
      console.log(a)
      window.setTimeout(() => {
        console.log(11)
      }, 0)
      a.then(() => {
        console.log(88)
      })
    })
  },
}
</script>

<style>

</style>
