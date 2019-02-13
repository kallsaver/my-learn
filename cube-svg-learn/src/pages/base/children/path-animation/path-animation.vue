<template>
  <base-page
    :title="$route.name">
    <svg>
      <!-- Q是二次贝塞尔曲线 -->
      <!-- T是光滑的二次贝塞尔曲线,是Q的简单模式,只用写终点 -->
      <!-- T总是配合着Q -->
      <path
        class="path"
        fill="transparent"
        stroke="#000000"
        stroke-width="5"
        stroke-linecap="round"
        d="M10 80 Q 77.5 10, 145 80 T 280 80"></path>
      <path
        class="path"
        transform="translate(0 200)"
        fill="transparent"
        stroke="#000000"
        stroke-width="20"
        stroke-linecap="round"
        d="M10 80 L62.5 137.5 A5 5, 0 0,0 70 140 L190 20"></path>

      <path
        class="path"
        transform="translate(0 400)"
        fill="transparent"
        stroke="#000000"
        stroke-width="20"
        stroke-linecap="round"
        d="M10 80 L62.5 137.5 A5 5, 0 0,0 70 140 L190 20"></path>
    </svg>
  </base-page>
</template>

<script>
// https://www.w3cplus.com/svg/svg-animation-guide.html
// http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201506142036.html
// http://cubic-bezier.com/#1,0,1,1
// 二次贝塞尔曲线:
// 如果你从开始点绘制一条直线到控制点,在从控制点绘制一条直线到结束点
// 然后将这两条直线的中心点相连,那么这条连线正好和这条弧线相切
// 典型的,用贝塞尔曲线画一个圆
export default {

}
</script>

<style lang="stylus" scoped>
svg
  .path
    // 空白线的长度
    stroke-dasharray: 1000
    stroke-dashoffset: 1000
    animation-name: dash
    animation-delay: 3s
    animation-duration: 2s
    // 动画结束后css被动画的100%的样式覆盖
    animation-fill-mode: forwards

@keyframes dash
  0%
    stroke-dashoffset: 1000
  100%
    stroke-dashoffset: 0

</style>
