<template>
  <base-page
    :title="$route.name">
    <svg>
      <circle
        cx="100"
        cy="100"
        r="50"
        style="fill: #3333ff" />
      <circle
        cx="100"
        cy="100"
        r="50"
        style="fill: #3333ff"
        transform="translate(100 200)" />
      <circle
        cx="100"
        cy="100"
        r="50"
        style="fill: #3333ff"
        transform="translate(0 300), scale(0.8)" />
    </svg>
  </base-page>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
</style>
