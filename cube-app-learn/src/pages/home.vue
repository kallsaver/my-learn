<template>
  <div id="app">
    <div class="header">
      <h1 class="title" @click="showPicker">
        <span>{{source}}赛事</span>
        <i class="cubeic-select" :class="{down: toDown}"></i>
      </h1>
      <div class="navigator">
        <ul class="nav-list">
          <li v-for="(item, index) in tabList" :key="index"
              @click="switchTab(index)" :class="{active: currentPage === index}">
              {{ item.txt }}
          </li>
        </ul>
        <i class="triangle-up" :class="{left: currentPage === 0, right: currentPage === 2}"></i>
      </div>
    </div>
    <div class="content">
      <!--threshold是阀值,滑动的距离占比达到阀值就切换-->
      <cube-slide
        ref="slide"
        :options="options"
        :data="tabList"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.2"
        :speed="200"
        @scroll="scroll"
        @scroll-end="scrollEnd"
        @change="slideChange">
        <cube-slide-item
          v-for="(item, index) in tabList"
          :key="index">
          <div class="match-list-wrapper">
            <match-list ref="scroll"
              :slide="slide"
              :source="source"
              :type="item.type"></match-list>
          </div>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import { ENDED, LIVE, CONCERN } from '../common/config/tabs'
import MatchList from '../components/match-list'

export default {
  name: 'home',
  data() {
    return {
      // cube-slide组件的索引
      // 它关联了cube-slide的slot展示的内容
      // triangle-up的位置等
      currentPage: 1,
      tabList: [
        {
          txt: '已结束',
          type: ENDED
        },
        {
          txt: '我的关注',
          type: CONCERN
        },
        {
          txt: '直播中',
          type: LIVE
        }
      ],
      toDown: false,
      pickerList: [
        {text: 'NBA', value: 'NBA'},
        {text: 'DOTA', value: 'dota'},
        {text: 'SOCCER', value: 'soccer'}
      ],
      source: 'soccer',
      options: {
        probeType: 3,
        listenScroll: true,
        // 当要锁定一个滚动方向时
        // https://github.com/didi/cube-ui/issues/246
        directionLockThreshold: 2,
      },
      slide: {},
      scrollCount: 0,
      firstScrollY: 0,
      secondScrollY: 0,
    }
  },
  created() {
    console.log('App.vue created')

    this.$Lazyload.config({
      // loading: 'http://covteam.u.qiniudn.com/test19.jpg',
      loading: require('../img/loading.png'),
    })

    this.$Lazyload.$on('loaded', ({el, src}) => {
      // console.log(el, src);
      // console.table(this.$Lazyload.performance());
    })
  },
  mounted() {
    this.picker = this.$createPicker({
      title: '赛事',
      data: [this.pickerList],
      selectedIndex: [2],
      onSelect: () => {
        this.toDown = false
      },
      onCancel: () => {
        this.toDown = false
      },
      onValueChange: (selectedVal, selectIndex, selectText) => {
        // 参数都是数组格式
        // console.log(selectedVal[0]);
        this.source = selectedVal[0]
      }
    })
    this.$nextTick(() => {
      // console.log(this.$refs.slide.slide);
      this.slide = this.$refs.slide.slide
    })
  },
  methods: {
    switchTab(index) {
      this.currentPage = index
    },
    // cube-slide组件的change事件的参数是index
    slideChange(index) {
    // console.log(index);
      this.currentPage = index
    },
    showPicker() {
      this.toDown = true
      this.picker.show()
    },
    scroll(pos) {
      // console.log('slide');
    },
    scrollEnd() {
      // console.log('scrollEnd');
    }
  },
  components: {
    MatchList
  }
}
</script>

<style lang="stylus">
// cube-ui 样式文档:https://didi.github.io/cube-ui/#/zh-CN/docs/style

@import './common/stylus/mixin.styl';

.a {
  width: 200px;
}

html, body, #app {
  height: 100%;
  text-align: center;
}
#app {
  background-color: color_grey;
  .header {
    color: white;
    background-color: #15191D;
    .title {
      padding: 20px 0;
      font-size: 16px;
      color: white;
      display: inline-block;
      .down {
        display: inline-block;
        transform: rotate(180deg);
      }
    }
    .navigator {
      position: relative;
      padding-bottom: 12px;
      font-size: 12px;
      .nav-list {
        display: flex;
        justify-content: space-around;
        li {
          width: 60px;
          color: #E0E4E8;
          &.active {
            color: white;
          }
        }
      }
      .triangle-up {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 0;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 8px solid color_grey;
        transition: all 0.4s;
        &.left {
          left: 16.67%;
        }
        &.right {
          left: 83.34%;
        }
      }
    }
  }
  .content {
    // calc的百分比是相对宽度的
    height: calc(100vh - 80px)
    overflow: hidden;
    .match-list-wrapper {
      height: 100%;
      background-color: #E2E5EA;
    }
  }
}


</style>
