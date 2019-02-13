<template>
  <base-page
    :title="$route.name">
    <svg>
      <rect/>
    </svg>
  </base-page>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
svg
  rect
    // 相对盒子的位置
    x: 10px
    y: 10px
    // 圆角
    rx: 5px
    ry: 5px
    width: 100px
    height: 100px
    // 描边
    stroke: #006600
    stroke-width: 5px
    // 虚线
    stroke-dasharray: 10 5
    // 填充
    fill: #3333ff
    fill-opacity: 0.5
</style>
