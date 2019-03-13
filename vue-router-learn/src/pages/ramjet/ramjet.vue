<template>
  <div>
    <div id='a' style='background-color: red; font-size: 4em; padding: 1em;'>a</div>
    <div id='b' style='background-color: blue; font-size: 4em; padding: 1em;'>b</div>
  </div>
</template>

<script>
import ramjet from 'ramjet'
export default {
  mounted() {
    setTimeout(() => {
      var element1 = document.getElementById('a')
      var element2 = document.getElementById('b')
      ramjet.transform(element1, element2)
    }, 3000)
  },
}
</script>

<style>

</style>
