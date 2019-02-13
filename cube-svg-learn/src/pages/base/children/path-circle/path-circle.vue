<template>
  <base-page
    :title="$route.name">
    <svg>
      <!-- A是画圆比较方便的椭圆曲线 -->
      <!-- Q是二次贝塞尔曲线 -->
      <path
        class="path"
        fill="transparent"
        stroke="#000000"
        stroke-width="5"
        stroke-linecap="round"
        d="M100 100 A50 50, 0, 0 0, 100 200 A50 50, 0, 0 0, 100 100"></path>
    </svg>
  </base-page>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>

</style>
