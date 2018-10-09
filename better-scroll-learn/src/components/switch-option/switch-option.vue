<!-- 更好的做法是用input type="checkbox" 这样可以使用v-model -->
<template>
  <div class="switch-option">
    <div class="switch-input"
      :class="{'active': checked }"
      @click="clickSwitch">
      <div class="switch-circle"
      :class="{'active': checked }"></div>
    </div>
    <div class="switch-label"><slot></slot></div>
  </div>
</template>

<script>
const COMPONENT_NAME = 'switch-option';
export default {
  name: COMPONENT_NAME,
  props: {
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
    return {
      checked: this.value
    };
  },
  watch: {
    checked: function (newValue) {
      this.$emit('update:value', newValue);
    }
  },
  methods: {
    clickSwitch: function () {
      if (this.disabled) {
        return;
      }
      this.checked = !this.checked;
    }
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl";

.switch-option {
  display: flex;
  .switch-input {
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
    &.active {
      background-color: $color-main-l;
      transition: all 0.4s ease;
      // border的底色是background-color;
      // 用父元素的border控制和子元素各个方向的间距
      // active时的间距颜色和background-color一样
      border-color: transparent;
    }
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
      &.active {
        left: 21px;
        transition: all 0.4s  ease 0.1s;
      }
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
