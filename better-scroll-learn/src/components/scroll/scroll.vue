<template>
  <!--最外围的div元素new BSroll,这样父元素就可以通过$refs.xxx.scroll获取滚动条-->
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
          <!--如果scroll的子元素不存在,那么这里讲被回退默认渲染-->
          <ul class="list-content">
              <li @click="clickItem($event,item)"
                class="list-item"
                v-for="(item,index) in data" :key="index">{{item}}</li>
          </ul>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
const COMPONENT_NAME = 'scroll';

// better-scroll初始化options文档:
// https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#tap

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


export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {

    };
  },
  created() {
    console.log('scroll.vue created');
    console.log(this.options.scrollbar);
    this.$nextTick(() => {
      console.log('scroll.vue created $nextTick');
    });
    // console.log(this.data);
  },
  mounted() {
    console.log('scroll.vue mounted');

    this.$nextTick(() => {
      console.log('scroll.vue mounted $nextTick');
      this.initScroll();
    });
  },
  watch: {
    data() {
      console.log('scroll.vue watch data');
      this.scroll.refresh();
    }
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      let options = Object.assign({}, DEFAULT_OPTIONS, this.options);

      // console.log(options);

      this.scroll = new BScroll(this.$refs.wrapper, options);

      console.log('BS滚动条创建成功');

      this.$emit('created-scroll', this.scroll);

      console.log('this.$refs.wrapper', this.$refs.wrapper);

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos);
        });
      }
    },
    clickItem(e, item) {
      // 派发到父组件
      this.$emit('click', item);
    }
  },


};
</script>

<style lang="stylus">
.list-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: #fff;
    .scroll-content {
        position: relative;
        z-index: 1;
    }
    .list-content {
        position: relative;
        z-index: 10;
        background: #fff;
        .list-item {
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            padding-left: 20px;
            border-bottom: 1px solid #e5e5e5;
        }
    }
}
</style>
