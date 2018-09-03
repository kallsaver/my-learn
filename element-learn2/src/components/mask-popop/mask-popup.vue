<template>
  <transition name="fade">
    <div class="mask-popup"
      v-show="isVisible"
      :style="{'z-index': zIndex}"
      @click="maskClick"></div>
  </transition>
</template>

<script>
import maskPopupMixin from '../../common/mixins/mask-popup.js';
import visibilityMixin from '../../common/mixins/visibility.js';

export default {
  name: 'mask-pupop',
  mixins: [maskPopupMixin, visibilityMixin],
  props: {
    zIndex: {
      type: Number,
      default: 100
    }
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
  }
};
</script>

<style lang="stylus">
.mask-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  // backdrop-filter: blur(10px);
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.5s;
  }

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0.6);
  }
}
</style>
