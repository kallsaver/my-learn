<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <!--动态切换图片,请带上key-->
          <img v-lazy="food.image" :key="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}份</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <!-- 不用v-if也行,buy把cartcontrol-wrapper覆盖住 -->
          <div class="cartcontrol-wrapper">
            <cartcontrol
              :food="food"
              @add="addFood"></cartcontrol>
          </div>
          <!--vue如果加上过渡动画,触发v-show,v-if等生效后不会立刻生效,可以得到DOM位置 -->
          <transition name="fade">
            <div v-show="!food.count" @click.stop.prevent="addFirst($event)" class="buy">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <split class="border-1px"></split>

        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul class="rating-ul" v-if="showList.length">
              <li class="rating-item border-1px" :key="rating.username"
                v-for="rating in showList">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{formatDate(rating.rateTime)}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-if="!showList.length">没有符合的内容</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import Cartcontrol from '../cartcontrol/cartcontrol';
import Split from '../split/split';
import Ratingselect from '../ratingselect/ratingselect';
import { formatDate } from '../../common/helpers/formatDate.js';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {
          ratings: []
        };
      }
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: {
        value: ALL
      },
      onlyContent: {
        value: true
      },
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    show() {
      // props传值如果在子父组件改变值对对方有影响,请使用引用数据类型,不要使用基本数据类型
      // props传入ratingselect后,ratingselect可以改变selectType和onlyContent的值
      // ratingselect组件需要重置默认项,并且应该是父组件里控制
      this.selectType.value = ALL;
      this.onlyContent.value = false;
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.betterScrollRefresh();
        }
      });
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
      // 派发事件,带上事件源参数,到goods父组件调用shopcart子组件的方法
      this.$emit('add', event.target);
    },
    addFood() {
      // 派发事件,带上事件源参数,到goods父组件调用shopcart子组件的方法
      this.$emit('add', event.target);
    },
    hide() {
      this.showFlag = false;
    },
    formatDate(time) {
      // console.log(time)
      // time兼容ios格式应该是new Date('2018/06/20'),或者new Date(1529508157899);
      let date = new Date(time);
      // 这个方法太强,所有连接符包括空格都可以随意兼容
      return formatDate(date, 'yyyy年MM月dd日 hh:mm');
      // return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    betterScrollRefresh() {
      this.scroll.refresh();
    }
  },
  computed: {
    showList() {
      return this.food.ratings.filter((rating) => {
        // 需要有文字内容
        if (this.onlyContent.value && !rating.text) {
          return false;
        }
        if (this.selectType.value === ALL) {
          return true;
        } else {
          return rating.rateType === this.selectType.value;
        }
      });
    },
  },
  components: {
    Cartcontrol,
    Split,
    Ratingselect
  }
};
</script>

<style lang="stylus">

@import '../../common/stylus/mixin.styl';

// stylus可以省略':','{','}'

// less可以使用line-height: 48px / 2;

// stylus只能用line-height: (48/2)px;

// 移动端布局是设计稿尺寸的二分之一

.food {
  position: fixed;
  left:0;
  top:0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  transform: translate3d(0, 0, 0);
  &.move-enter-active, &.move-leave-active {
    transition: all 0.2s linear;
  }
  &.move-enter, &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .image-header {
    position:relative;
    width: 100%;
    height: 0;
    // 相对width的
    padding-top: 100%;
    img {
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left:0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      margin-bottom: 18px;
      line-height: 10px;
      height: 10px;
      font-size: 0;
      .sell-count, .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: (48 / 2)px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: rgb(0, 160, 220);
      //transform: scale(1);
      opacity: 1;
      &.fade-enter-active, &.fade-leave-active {
        transition: opacity 0.2s , transform 0s;
      }
      &.fade-enter,  &.fade-leave-active{
        opacity: 0;
        z-index: -1;
        //transform: scale(0);
      }
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-ul {
        .rating-item {
          position: relative;
          padding: 16px 0;
          border-bottom-1px(rgba(7, 17, 27, 0.1));
          .user {
              position: absolute;
              right: 0;
              top: 16px;
              line-height: 12px;
              font-size: 0;
              .name {
                  display: inline-block;
                  margin-right: 6px;
                  vertical-align: top;
                  font-size: 10px;
                  color: rgb(147, 153, 159);
              }
              .avatar {
                  border-radius: 50%;
              }
          }
          .time {
              margin-bottom: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }

            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
