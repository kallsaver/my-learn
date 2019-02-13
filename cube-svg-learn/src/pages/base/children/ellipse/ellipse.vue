<template>
  <base-page
    :title="$route.name">
    <svg>
      <ellipse class="first" />
      <ellipse class="second" />
    </svg>
  </base-page>
</template>

<script>
// 椭圆ellipse完全可以用path的A替代
export default {

}
</script>

<style lang="stylus" scoped>
svg
  .first
    // 圆心相对盒子的位置
    cx: 150px
    cy: 100px
    rx: 50px
    ry: 30px
    // 描边
    stroke: #006600
    stroke-width: 5px
    // 虚线
    stroke-dasharray: 10 5
    // 填充
    fill: peru
    fill-opacity: 1
  .second
    // 圆心相对盒子的位置
    cx: 170px
    cy: 120px
    rx: 50px
    ry: 30px
    // 描边
    stroke: #006600
    stroke-width: 5px
    // 虚线
    // 填充
    fill: transparent
    fill-opacity: 1
</style>
