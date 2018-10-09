<template>
  <div class="switch">
    <!-- ios的type="checkbox"的input没有@input事件,只有change,统一用change -->
    <input class="switch-input"  @change="changeHander"
      type="checkbox" v-model="checkboxValue" :disabled="disabled">
    <div class="switch-ui">
      <div class="switch-circle"></div>
    </div>
    <div class="switch-label"><slot></slot></div>
  </div>
</template>

<script>
import deepAssign from 'deep-assign';
const COMPONENT_NAME = 'switch-input';
const EVENT_CHECK = 'check';
export default {
  name: COMPONENT_NAME,
  props: {
    // v-model对于子组件的props的key是value
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    // 对于父组件传入基本数据类型
    // 最好要另外用一个变量去时刻监听它
    // 包括created和watch和v-model
    return {
      checkboxValue: this.value
    };
  },
  created() {
    console.log(this.checkboxValue);
  },
  watch: {
    value(newVal) {
      this.checkboxValue = newVal;
    },
    checkboxValue(newVal) {
      this.$emit(EVENT_CHECK, this.event, newVal);
    }
  },
  methods: {
    changeHander(e, val) {
      this.event = Object.assign({
        target: e.target.parentNode
      }, e);
    }
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl";

.switch {
  position: relative;
  display: flex;
  .switch-input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 34px;
    width: 54px;
    background-color: $color-white;
    // border-radius的生效值是元素高度和宽度的最大值
    border-radius: 1000px;
    opacity: 0;
    // 不是active时,间距颜色border的颜色是$color-white
    // 这样有一层灰色
    // css中唯一可以操作兄弟元素的选择器'+',其他选择器都是操作子元素
    &:checked + .switch-ui {
      background-color: $color-main-l;
      transition: all 0.4s ease;
      // border的底色是background-color;
      // 用父元素的border控制和子元素各个方向的间距
      // active时的间距颜色和background-color一样
      border-color: transparent;
    }
    &:checked + .switch-ui .switch-circle {
      left: 21px;
      transition: all 0.4s  ease 0.1s;
    }
  }
  .switch-ui {
    position: relative;
    height: 30px;
    width: 50px;
    background-color: $color-white;
    // border-radius的生效值是元素高度和宽度的最大值
    border-radius: 1000px;
    transition: all 0.1s;
    // 不是active时,间距颜色border的颜色是$color-white
    // 这样有一层灰色
    border: 2px solid rgba(0, 0, 0, .1);
    .switch-circle {
      position: absolute;
      height: 30px;
      width: 30px;
      background: white;
      border-radius: 50%;
      box-shadow: -1px 1px 1px #999;
      top: 0;
      left: 0;
      transition: all 0.3s;
    }
  }
  // label的样式可以外部改
  // 距离的样式交给外部
  .switch-label {
    height: 34px;
    line-height: 34px;
    font-size: 18px;
    color: #666;
  }
}

</style>
