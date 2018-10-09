
<!-- popup有多种,一种是全局最高z-index,一种是z-index要低于局部模块的popup -->
<!-- 第一种一般作为全局编程式调用,main.js入口用createdAPI注册,只有一个遮罩层 -->
<!-- 第二种由于z-index没确定,可以作为局部模块,props带入z-index,内容可以用slot带入 -->
<!-- 第三种作为全局编程式调用,main.js入口用createdAPI注册,内容用slot带入 -->
<!-- createAPI是可以传配置的 -->
<!-- popup还可以按照功能分成多种,比如内容已经是居中的,或者样式全部交给外部 -->
<!-- 过渡动画有让DOM元素生成transition化 -->
<template>
  <transition name="dialog">
    <div class="popup" v-show="isVisible" @click="maskClick">
      <div v-show="isVisible" class="popup-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import visibilityMixin from '../../common/mixins/visibility.js';
export default {
  name: 'pupop',
  mixins: [visibilityMixin],
  props: {

  },
  data() {
    return {

    };
  },
  methods: {
    hide() {
      this.isVisible = false;
    },
    show() {
      this.isVisible = true;
    },
    maskClick() {
      this.$emit('mask-click');
    }
  },
};
</script>

<style lang="stylus" scope>
.popup {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.dialog-enter-active {
  animation: dialog-in .5s;
}
.dialog-leave-active {
  animation: dialog-out .3s;
}

@keyframes dialog-in {
  0% {
    transform: scale(1.185);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes dialog-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.85);
    opacity: 0;
  }
}
</style>
