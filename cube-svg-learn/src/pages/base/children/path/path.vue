<template>
  <base-page
    :title="$route.name">
    <svg>
      <!--path是矢量线 -->
      <!-- 大写M表示绝对定位的起点 -->
      <!-- 大写L表示绝对定位的终点 -->
      <!-- 注意逗号的格式规范 -->
      <path d="M50 50 L100 100"
        style="stroke:#660000; fill:none;"></path>
      <!--30 50是x和y方向的半径-->
      <!-- 第三个参数不需要设置,默认为0就好 -->
      <!-- 0 1表示弧度 -->
      <!-- 两点之间有4条弧度 0,0 0,1 1,0 1,1 -->
      <!-- 0开头表示短弧度,1开头表示长弧度 -->
      <!-- 200 200表示终点 -->
      <path d="M150 150
        A30 50, 0, 0 0, 200 200"
        style="stroke:#333; fill:none;"></path>
      <path d="M150,150
        A30 50, 0, 0 1, 200 200"
        style="stroke:red; fill:none;"></path>
      <path d="M150 150
        A30 50, 0, 1 0, 200 200"
        style="stroke:peru; fill:none;"></path>
      <path d="M150 150
        A30 50, 0, 1 1, 200 200"
      style="stroke:gold; fill:none;"></path>

      <!-- 使用Z闭合线段 -->
      <path d="M150 300 L200 300 L200 350 Z"
        style="stroke: #0000cc;
        stroke-width: 2px;
        fill: #ccccff;"></path>

    </svg>
  </base-page>
</template>

<script>
// https://www.w3cplus.com/svg/svg-animation-guide.html
export default {

}
</script>

<style lang="stylus" scoped>

</style>
