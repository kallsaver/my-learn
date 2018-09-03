<template>
  <div class="match-list">
    <!--cube-scroll同样是slot穿透的-->
    <!--options开启并设置上下拉的样式-->
    <cube-scroll
      ref="scroll"
      :data="matchList"
      :options="options"
      :scroll-events="['scroll', 'scroll-end', 'before-scroll-start']"
      @scroll="scroll"
      @before-scroll-start="beforeScrollStart"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul class="match-inner">
        <li class="match-item" v-for="(item, index) in matchList" :key="index">
          <div class="left-team">
            <img v-lazy="item.hostLogoUrl" alt="" class="logo">
            <p class="name">{{item.hostTeamName}}</p>
          </div>
          <div class="center">
            <p v-if="item.live" class="guest" :class="{end : item.isEnd}">{{item.live}}</p>
            <p v-if="item.order" class="order" @click="subscribe">{{item.order}}</p>
            <p class="score" :class="{last: item.isEnd}">{{item.hostScore}} - {{item.guestScore}}</p>
            <p v-if="!item.isEnd" class="time">{{item.endTime}}</p>
          </div>
          <div class="right-team">
            <img v-lazy="item.guestLogoUrl" alt="" class="logo">
            <p class="name">{{item.guestTeamName}}</p>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import { ENDED, LIVE, CONCERN } from '../common/config/tabs';
import list from '../common/data/match-list';
import { getRect } from '../common/js/dom.js';
const UP = 'up';
const DOWN = 'down';

const typesMap = {
  [ENDED]: 0,
  [LIVE]: 1,
  [CONCERN]: 2
};

// 根据数据结构过滤数据,有三个match-list组件,它们要渲染的数据不一样
const getMatchList = (source, type) => {
  return list[source][typesMap[type]];
};

export default {
  name: 'match-list',
  props: {
    source: {
      type: String,
      default: 'soccer'
    },
    type: {
      type: String,
      default: LIVE
    },
    slide: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    // props比data先加载
    return {
      matchList: getMatchList(this.source, this.type),
      options: {
        // listenScroll: true,
        scrollbar: {
          // 一开始隐藏滚动条
          fade: true
        },
          // 上拉刷新
        pullDownRefresh: {
          // 阀值
          // 上面空白局域的高度达到阀值会触发拉动
          threshold: 90,
          // 触发拉动后回弹到空白区域50px的位置
          stop: 80,
          txt: '刷新成功'
        },
        // 下拉加载
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多的比赛啦'
          }
        },
        // 当要锁定一个滚动方向时
        // https://github.com/didi/cube-ui/issues/246
        directionLockThreshold: 2,
      },
      // 新数据有限,只能拉三次
      matchListRefreshCount: 4,
      timer: null,
    };
  },
    // picker会导致source的改变,也可以用computed实现
  watch: {
    source() {
      console.log('watch');
      this.matchList = getMatchList(this.source, this.type);
    },
  },

  created() {
    this.subscribeDialog = this.$createSubscribeDialog({
      onShow() {
        console.log('showwww');
      },
      onHide() {
        console.log('hideee');
      }
    });
  },
  mounted() {
    // console.log(getRect(this.$refs.scroll.$el).height);
    // console.log(getRect(this.$refs.scroll.$el.children[0]).height);
    // 可滚动的高度
    this.$nextTick(() => {
      console.log(getRect(this.$refs.scroll.$el.children[0]).height - getRect(this.$refs.scroll.$el).height);
    });
  },
  methods: {
    subscribe() {
      this.subscribeDialog.show();
    },
    onPullingDown() {
      this.loadMatch('down');
    },
    onPullingUp() {
      this.loadMatch('up');
    },
    loadMatch(type) {
      this.matchListRefreshCount--;
      // 假数据
      setTimeout(() => {
        if (this.matchListRefreshCount > 0) {
          console.log(333);
          // 有新数据的情况
          let match = [];
          for (let index = 5; index > 0; index--) {
            match.push(this.matchList[index]);
          }
          // 如果是下拉刷新
          if (type === DOWN) {
            this.matchList.unshift(...match);
          } else if (type === UP) {
            this.matchList = this.matchList.concat(match);
            console.log('开始给matchList添加数据');
          }
        } else {
          console.log('没有更多数据');
          // 没有新数据的情况要forceUpdate,否则拉动loading一直在等待
          // 使用forceUpdate后,noMore的文案会展示
          this.$refs.scroll.forceUpdate();
          // if (type === UP) {
          //     setTimeout(() => {
          //         this.$refs.scroll.scroll.scrollBy(0, 64, 800);
          //     }, 1000);
          // }
        }
      }, 500);
    },
    beforeScrollStart(pos) {
      console.log('beforeScrollStart');
    },
    scroll(pos) {
      // 交互的回调函数是I/O操作,会在Promise A+规范之后
      // 所以交互的回调函数中获取元素的渲染属性,是正确的,不需要加上$nextTick
      // cube-slide嵌套cube-scroll,cube-scroll先触发
      // console.log('scroll');

      // 如果pos.y和可滚动高度相加等于0,说明到底了
      // console.log(getRect(this.$refs.scroll.$el.children[0]).height - getRect(this.$refs.scroll.$el).height);
      // console.log(pos.y);

      // 要做到达一定位置就开始自动请求数据的功能,其实设置threshold就可以
      // 当然也可以编程式来写:
      // 但是使用组件定义好的threshold,more=>noMore文案过渡得更好
      // let scrollableHeight = getRect(this.$refs.scroll.$el.children[0]).height - getRect(this.$refs.scroll.$el).height;
      // if ((scrollableHeight + pos.y) < 100 && (scrollableHeight + pos.y) > 0) {
      //     console.log('差不多到底');
      //     this.onPullingUp();
      // }
    },
  },
  updated() {
    this.$nextTick(() => {
      console.log('updated $nextTick');
    });
  }
};
</script>

<style lang="stylus">
.match-list {
  height: 100%;
  background-color: #E2E5EA;
  .match-inner {
    background-color: #FFFFFF;
    .match-item {
      border-bottom: 1px solid #E4E4E4;
      padding: 10px 0;
      display: flex;
      justify-content: space-around;
      .left-team,.right-team {
        text-align: center;
        width: 80px;
        img {
          display: inline-block;
          // img图片看场景设置height或者width,后者自适应
          height: 38px;
          margin-bottom: 7px;
        }
        .name{
          font-size: 14px;
        }
      }
      .center {
        font-size: 12px;
        width: 80px;
        .guest {
          height: 16px;
          background-color: #3D8F29;
          color: white;
          line-height: 16px;
          padding: 3px 10px;
          border-radius: 25px;
          margin-bottom: 7px;
        }
        .order {
          border:1px #007100 solid;
          color: #49873D;
          border-radius: 25px;
          line-height: 16px;
          padding: 3px 20px;
          margin-bottom: 7px;
        }
        .end {
          background-color: #E86F5D;
        }
        .score {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 7px;
          position: relative;
          .order {
            display: inline-block;
            border-radius: 25px;
            border:1px #2F6220 solid;
            padding: 3px 20px;
            font-size: 100%;
            position: absolute;
            right: -100px;
            transform: translateY(-50%);
          }
        }
        .last {
          font-size: 22px;
          margin-top: 5px;
          color: #878F98;
        }
        .time {
          color: #92929A;
        }
      }
    }
  }
}

img[lazy=loading]{

}

img[lazy=loaded]{
  animation:imglazyload 2s;
}

@keyframes imglazyload {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
