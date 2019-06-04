<template>
  <div class="observerable"></div>
</template>

<script>
function create(fn) {
  let ret = false
  return ({next, complete, error}) => {
    function nextFn(...args) {
      if (ret) {
        return
      }
      next(...args)
    }

    function completeFn(...args) {
      complete(...args)
      ret = true
    }

    function errorFn(...args) {
      error(...args)
    }

    fn({
      next: nextFn,
      complete: completeFn,
      error: errorFn
    })

    return () => (ret = true)
  }
}

export default {
  mounted() {

  },
}
</script>

<style>

</style>
