<template>
  <div class="index-list">
    <scroll
      ref="indexList"
      :data="data"
      :options="props_options"
      :listenScroll="true"
      @created-scroll="createdScroll"
      @scroll="scroll">
      <div class="index-list-content" ref="content">
        <div class="index-list-title" v-if="title" ref="title" @click="titleClick">
          {{title}}
        </div>
        <ul ref="groups">
          <li v-for="group in data" :key="group.name" ref="listGroup">
            <h2 class="index-list-anchor" ref="listTitle">{{group.name}}</h2>
            <ul>
              <li
                class="index-list-item border-bottom-1px"
                  v-for="(item, index) in group.items"
                  :key="index"
                  @touchstart="addActiveCls($event)"
                  @touchend="removeActiveCls($event)"
                  @click="selectItem(item)">
                {{item.name}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <!-- touchstart,touchmove写在li外围,这样才有move的效果 -->
    <div class="index-list-nav"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <!-- vue对:class会和class合并,:data-xx会打印在html中 -->
        <li ref="anchor"
          v-for="(item, index) in shortcutList"
          :data-index="index"
          :key="item"
          :class="{active: currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="index-list-fixed" ref="fixed"
      v-show="fixedTitle"
      v-text="fixedTitle">
    </div>
  </div>
</template>

<script>
import Scroll from '../scroll/scroll.vue';
import {
  getData,
  addClass,
  removeClass
} from '../../common/helpers/dom';

const COMPONENT_NAME = 'index-list';
const EVENT_SELECT = 'select';
const ACTIVE_CLS = 'index-list-item-active';

// 18是li渲染出来的px,设计稿量度 / 2
// const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18;
// 应该动态计算出li的高度,最准确的做法

const DEFAULT_OPTIONS = {
  // 这个组件给scroll组件配置是否实时派发scroll事件
  probeType: 3,
  // 这个组件给scroll组件配置滚动条默认隐藏
  scrollbar: false,
  // 这个组件给scroll组件配置需要click
  click: true,
};

// data中有props_[name],说明index-list是起到中间组件的作用
// 作为中间组件,它起到类似插槽的作用,有自己的默认配置
// 最高层组件可以修改配置,从而穿透所有中间组件到达最终作用配置的组件
// 最尾层的组件scroll的兼容性要更高,中间组件是服务于最尾层组件的一种模式

// props_[name]用Object.assign融合上一级组件的options,传递给下一级组件
// 上一级options=>props_options=>下一级options
// index-list组件还嵌套一个scroll组件,options是scroll组件的初始化配置
// vue的组件都是一级一级往下传options,如果需要高度自由配置,
// 最高层组件到最尾层的组件的传递过程都要暴露接口,并且最好是对象
// 而且需要注意vue的生命周期,
// 父组件created=>传递props=>子组件data挂载=>子组件created=>子组件mounted=>父组件mounted
// 如果是基本数据类型,传递的参数过多,并且更改默认配置麻烦(对象可以使用Object.assign合并key)
// 比较好的做法是把组件拆分成功能型插槽(不需要配置数据)和配置型组件以减少props依赖
// 对于最尾层的组件,可配置项最好写成完整的文档配置
// 如果中间组件本身的功能必须带默认配置,那么不用暴露接口给最高层组件,比如listenScroll
// 其实大部分情形没必要向高层组件开发高度自由的配置接口

// 插槽也是一种中间组件,和插槽不同的是,插槽更简化实用
// 插槽的子元素作用域是插槽的父组件,如果直接写结构会导致父组件的代码=父组件本身的代码+插槽的子元素的代码
// 然而可以进一步提取代码,page-index-list嵌套scroll中间没有其他组件
// 把index-list的结构写在scroll的子元素中,或者index-list组件写在scroll中减少父组件的代码量
// 细粒度拆分组件的好处是维护到位,弊端是依赖层级关系复杂

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return [];
      }
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
      props_options: {},
      scrollY: 0,
      listHeight: [],
      diff: 0,
      currentIndex: 0,
      fixedTitle: '',
      bscroll: null,
    };
  },
  // created中要使用DOM,要加上$nextTick
  created() {
    console.log('index-list.vue created');

    // 如果index-list.vue的父组件options.scrollbar不为true,
    // index-list那么传递给scroll.vue组件的options.scrollbar为false
    Object.assign(this.props_options, DEFAULT_OPTIONS, this.options);
    this.$nextTick(() => {
      console.log('index-list.vue created $nextTick');
    });
    this.touch = {};
  },
  // DOM挂载完毕,数据挂载到DOM完毕
  mounted() {
    console.log('index-list.vue mounted');
    // $nextTick的生命周期是在父组件的mounted之后的,所以子组件的mounted调用$nextTick
    // 说明父组件上的所有的子组件都mounted完毕
    // 而一个app如果只有一个最大的父组件,这说明整个视图的组件都mounted完毕
    this.$nextTick(() => {
      console.log('index-list.vue mounted $nextTick');
    });
  },
  // computed用了依赖this.$data里面的变量,所以不能在computed做this.$data的数据的更改
  // 否则会死循环,这时候只能用watch
  computed: {
    shortcutList() {
      console.log('computed');
      return this.data.map((group) => {
        return group.name.substr(0, 1);
      });
    },
  },
  // watch的触发不会像computed是在mounted之前执行,
  // 它的触发是可以预见的,所以可以获取DOM尺寸
  watch: {
    // 从父组件传过来的是异步数据,需要watch
    // 父组件和子组件同时监听一个变量,父组件中的watch先执行
    // 对滚动条的refresh操作也可以在scroll组件封装
    // watch的一个重要作用是组件异步数据处理,相当于异步的created钩子函数
    // watch是computed的加强版,对于有重复代码的computed做合并
    // 如果computed中出现了改变this.$data里的数据时,只能用watch
    data(newVal) {
      console.log(newVal);
      console.log('index-list watch data');
      this.$nextTick(() => {
        this._calculateTitleHeight();
        this._calculateHeight();
        this._calculateAnchorHeight();
        this._calculateListTitleHeight();
      });
    },
    // this.fixedTitle依赖
    // this.diff依赖
    // this.currentIndex依赖
    scrollY(newVal) {
      // 滚动条的实时坐标 > 列表顶部区域的高度(负值)
      if (newVal > -this.titleHeight) {
        this.fixedTitle = '';
      }

      let scrollY = Math.abs(newVal);

      // 在中间部分滚动
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (scrollY >= height1 && scrollY < height2) {
          this.currentIndex = i;
          this.fixedTitle = this.data[this.currentIndex] ? this.data[this.currentIndex].name : '';
          // diff是为了做title的transflate动效
          // 距离下一个区间的高度
          this.diff = height2 - scrollY;
          // watch也是类似于Promise A+规范
          console.log('after change diff');
          // console.log(this.diff);
          return;
        }
      }
      this.currentIndex = 0;
    },
    diff(newVal) {
      console.log('watch diff');
      // 当前title要想上移动的距离,负值
      let fixedTop = (newVal > 0 && newVal < this.listTitleHeight) ? newVal - this.listTitleHeight : 0;
      console.log('diff', newVal);
      console.log('fixedTop', fixedTop);
      console.log('currentIndex', this.currentIndex);
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },
  methods: {
    titleClick() {
      console.log('titleClick');
    },
    addActiveCls(e) {
      addClass(e.currentTarget, ACTIVE_CLS);
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, ACTIVE_CLS);
    },
    selectItem(item) {
      this.$emit(EVENT_SELECT, item);
    },
    onShortcutTouchStart(e) {
      console.log('touchstart');
      // e.target和e.currentTarget的区别是:
      // e.target是事件源,事件捕获的最后的元素
      // e.currentTarget是绑定这个事件的元素,这个值是即时的,打印指针时看不到
      let anchorIndex = getData(e.target, 'index');
      // console.log(anchorIndex);
      let touch = e.touches[0];
      // 记录touchstart点击的鼠标位置
      this.touch.y1 = touch.pageY;
      // 记录锚点
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      // console.log('move');
      let touch = e.touches[0];
      this.touch.y2 = touch.pageY;
      // | 0 相当于Math.floor();
      // touchmove的距离如果超过n个li的高度,那么delta = n,delta可以是负数
      let delta = (this.touch.y2 - this.touch.y1) / this.anchorHeight | 0;
      // console.log(delta);
      // this.touch.anchorIndex是字符串,当然它是整数
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex);
    },
    _scrollTo(index) {
      // _scrollTo不仅仅是touchstart调用,touchmove也调用
      // console.log(this.$refs.indexList);
      // console.log(this.$refs.indexList.scroll.y);
      // scrollToElement方法内部调用scrollTo时做了Math.round处理有点不准,
      // 需要精准计算时使用scrollTo,不需要精准计算使用scrollToElement
      // this.$refs.indexList.scroll.scrollToElement(this.$refs.listGroup[index], 100);
      this.$refs.indexList.scroll.scrollTo(0, -this.listHeight[index], 100);
      // BS类的y属性可以获得滚动条所在位置(即将到达位置)
      // console.log(this.$refs.indexList.scroll.y);
    },
    // 列表顶部的展示区域的高度
    _calculateTitleHeight() {
      this.titleHeight = this.$refs.title.clientHeight;
      return this.titleHeight;
    },
    // 创建一个区间,BS滚动条落在这个区间则映射这个区间对应的div高亮
    _calculateHeight() {
      const list = this.$refs.listGroup;
      this.listHeight = [];
      // title的高度
      let height = this._calculateTitleHeight();
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    },
    // 单个锚点的高度
    _calculateAnchorHeight() {
      this.anchorHeight = this.$refs.anchor[0].clientHeight;
      return this.anchorHeight;
    },
    // 列表中的标题(A, B)等的高度
    _calculateListTitleHeight() {
      this.listTitleHeight = this.$refs.listTitle[0].clientHeight;
      return this.listTitleHeight;
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    createdScroll(bscroll) {
      // 获取BS滚动条
      this.bscroll = bscroll;
      console.log(bscroll);
    }
  },
  components: {
    Scroll,
  },
  // DOM依赖的数据变化导致DOM更新才会触发updated
  // updated不会承诺所有的子组件也都一起被重绘如果你希望等到整个视图都重绘完毕
  // 可以用vm.$nextTick替换掉updated
  // https://cn.vuejs.org/v2/api/#updated
  // $nextTick写在updated里面,表示一个数据变化=>DOM更新流程完毕
  // 父组件的$nextTick意味着子组件DOM也更新完毕,子组件的$nextTick是自己的数据更新到DOM完毕
  // 所以父组件的$nextTick要在子组件之后

  // $nextTick有滞后执行顺序的功能,
  // $nextTick依赖于Promise,没有Promise则setTimeout(()=>{},20);
  // 如果有Promise依赖,请使用$nextTick();
  // 不要主动setTimeout(()=>{},20);会造成周期紊乱
  // Promise优先级高于setTimeout;
  // 父组件created=>子组件created=>子组件mounted=>父组件mounted=>
  // 父组件created $nextTick=>子组件created $nextTick=>子组件mounted $nextTick=>父组件mounted $nextTick
  // 如果在子组件的created $nextTick中创造一个BS滚动条,在父组件的mounted是拿不到BS滚动条
  // 如果需要拿到务必要使用$nextTick滞后
  // 所以使用第三方封装的组件,很可能就是在mounted $nextTick后创造一个BS滚动条
  // 这时候在父组件mounted $nextTick就可以拿到
  // 最好统一在mounted $nextTick中操作DOM,虽然mounted就可以了
  updated() {
    // console.log('updated');
    // this.$nextTick(() => {
    //     console.log('index-list.vue updated $nextTick');
    // });
  }
};

</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl";
@import "../../common/stylus/mixin.styl";
@import "../../common/stylus/base.styl";
.index-list {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .list-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    .index-list-content {
      background: $color-white;
      border-radius: 2px;
      .index-list-title {
        padding: 14px 16px;
        font-size: $fontsize-medium;
        line-height: 1.6;
        color: $color-dark-grey;
      }
      // 布局中能不用margin就不用margin,用padding
      // 使用padding让盒子之间没有间隔区间
      // 计算盒子尺寸可以把padding算进去,margin不行
      .index-list-anchor {
        padding: 16px 16px 10px 16px;
        line-height: 1;
        font-size: $fontsize-medium;
        color: $color-light-grey;
        background: $color-title-background;
      }
      .index-list-item {
        position: relative;
        height: 50px;
        line-height: 50px;
        padding: 0 16px;
        font-size: $fontsize-medium;
        color: $color-dark-grey;
        &:last-child {
          border-none();
        }
      }
      .index-list-item-active {
        background: $color-active-light-gray;
      }
    }
  }
  .index-list-nav {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-family: Helvetica;
    &>ul {
      &>li {
        // 底部的padding为0,顶部的padding为16px
        padding: 6px 16px 0 16px;
        // line-height:1 的意思是和字体的px一样,就是默认
        // 字体如果是12px,字体几乎是贴底部的布局
        line-height: 1;
        text-align: center;
        box-sizing(border-box);
        font-size: $fontsize-small;
        color: $color-grey;
        &.active {
            color: $color-main-l;
        }
      }
      // iphone4:320*480
      @media (max-height: 480px) {
        &>li {
          padding-top: 3px;
        }
      }
    }
  }
  // 和.index-list-anchor的尺寸一样
  .index-list-fixed {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 16px 10px 16px;
    box-sizing: border-box;
    font-size: $fontsize-medium;
    line-height: 1;
    color: $color-light-grey;
    background: $color-title-background;
  }
}
</style>
