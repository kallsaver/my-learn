const DEFAULT_OPTIONS = {
  // 当probeType为1的时候,会非实时(屏幕滑动超过一定时间后)派发scroll事件,截流派发scroll事件
  // 当probeType为2的时候,会在屏幕滑动的过程中实时的派发scroll事件
  // 当probeType为3的时候,不仅在屏幕滑动的过程中,而且在momentum滚动动画运行过程中实时派发scroll事件。
  probeType: 0,
  // better-scroll默认会阻止浏览器的原生click事件。
  // 当设置为 true,better-scroll会派发一个click事件
  // event参数加一个私有属性_constructed:true
  click: false,
  // 当设置为true的时候,可以开启横向滚动
  // 当设置eventPassthrough为'horizontal'的时候,该配置无效
  // freeScroll为true时,scrollX为true
  scrollX: false,
  // 当设置eventPassthrough为'vertical'的时候,该配置无效
  scrollY: true,
  // 当设置为true或者Object开启滚动条
  scrollbar: false,
  // 当设置为 true 或者是一个Object的时候，
  // 可以开启下拉刷新,可以配置顶部下拉的距threshold来决定刷新时机以及回弹停留的距离stop，
  pullDownRefresh: false,
  // 当设置为 true或者是一个 Object 的时候，
  // 可以开启上拉加载,可以配置离底部距离阈值threshold来决定开始加载的时机
  pullUpLoad: false,
  mouseWheel: false,
  // 纵轴方向初始化位置
  startY: 0,
  startX: 0,
  // 常默认项:
  // 当设置为true横向和纵向同时滚动
  freeScroll: false,
  // 当滚动超过边缘的时候会有一小段回弹动画,设置为true则开启动画
  bounce: true,
  zoom: false,
  // 弹力动画持续的毫秒数
  bounceTime: 800,
  // 当快速在屏幕上滑动一段距离的时候,会根据滑动的距离和时间计算出动量,并生成滚动动画
  momentum: true,
  // 只有在屏幕上快速滑动的时间小于momentumLimitTime,才能开启momentum动画。
  momentumLimitTime: 300,
  // 只有在屏幕上快速滑动的距离大于momentumLimitDistance,才能开启momentum 动画。
  momentumLimitDistance: 15,
  // 设置 momentum 动画的动画时长
  swipeTime: 250,
};

export default DEFAULT_OPTIONS;

