<template>
  <base-page
    :title="$route.name">
    <svg>
      <!-- A是画圆比较方便的椭圆曲线 -->
      <!-- Q是二次贝塞尔曲线 -->
      <!-- T是光滑的二次贝塞尔曲线,是Q的简单模式,只用写终点 -->
      <!-- T总是配合着Q -->
      <path
        class="path"
        fill="transparent"
        stroke="#000000"
        stroke-width="5"
        stroke-linecap="round"
        d="M100 100 A50 50, 0, 0 0, 100 200 A50 50, 0, 0 0, 100 100"></path>
      <!-- Q的第二个参数是控制点,也就是弧线起点和终点切线的交点 -->
      <path
        transform="translate(0 200)"
        class="path"
        fill="transparent"
        stroke="#000000"
        stroke-width="5"
        stroke-linecap="round"
        d="M100 100 Q100 50 150 50 T200 100"></path>
    </svg>
  </base-page>
</template>

<script>
// http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201506142036.html
// http://cubic-bezier.com/#1,0,1,1
// http://cubic-bezier.com/#1,0,1,1 使用的是相对定位
// 二次贝塞尔曲线:
// 如果你从开始点绘制一条直线到控制点,在从控制点绘制一条直线到结束点
// 然后将这两条直线的中心点相连,那么这条连线正好和这条弧线相切
// 典型的,用贝塞尔曲线画一个圆
export default {

}
</script>

<style lang="stylus" scoped>

</style>
