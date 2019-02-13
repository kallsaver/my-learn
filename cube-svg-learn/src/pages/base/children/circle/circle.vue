<template>
  <base-page
    :title="$route.name">
    <svg>
      <circle/>
    </svg>
  </base-page>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
svg
  circle
    // 圆心相对盒子的位置
    cx: 100px
    cy: 100px
    r: 50px
    // 描边
    stroke: #006600
    stroke-width: 5px
    // 虚线
    stroke-dasharray: 10 5
    // 填充
    fill: #3333ff
    fill-opacity: 0.5
</style>
