<!-- 使用这个组件需要用better-scroll包住外部的父代元素  -->
<template>
  <div class="cartcontrol">
    <!-- 动画效果:外层平移淡入,内层滚动 -->
    <transition name="move">
      <div class="cart-decrease"
        v-show="food.count>0"
        @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {
          count: 0
        };
      }
    }
  },
  created() {},
  methods: {
    add() {
      if (!event._constructed) {
        return;
      }
      console.log('food count change');
      if (!this.food.count) {
        // food传过来是并没有count这个属性,
        // 即使在props上申明了count属性也是不会绑定到视图,data才行
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      // 派发父组件的事件
      this.$emit('add', event.target);
      console.log('after $emit ,add');
      setTimeout(() => {
        console.log('setTimeout0');
      }, 0);
      this.$nextTick(() => {
        console.log('$nextTick in cartcontrol');
      });
    },
    decreaseCart() {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  },
};
</script>

<style lang="stylus">
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear;
    }

    // 动画初始状态
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
