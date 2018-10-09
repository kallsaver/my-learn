<template>
  <div v-show="isVisible" class="body-dialog-demo">
    <popup ref="popup" @mask-click="hide">
      <div class="body-dialog-demo-content">
        <template v-if="!$slots.title1">
          <div class="body-dialog-demo-title">{{title}}</div>
        </template>
        <template v-else>
          <div v-show="$slots.title1"><slot name="title1"></slot></div>
        </template>
        <template v-if="!$slots.title2">
          <div class="body-dialog-demo-title">{{title}}</div>
        </template>
        <template v-else>
          <div v-show="$slots.title2"><slot name="title2"></slot></div>
        </template>
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from '../../components/popup/popup';
import visibilityMixin from '../../common/mixins/visibility.js';
export default {
  name: 'body-dialog-demo',
  mixins: [visibilityMixin],
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  methods: {
    hide() {
      this.isVisible = false;
      this.$refs.popup.hide();
    },
    show() {
      this.isVisible = true;
      this.$refs.popup.show();
    },
  },
  components: {
    Popup
  }
};
</script>

<style lang="stylus">
.body-dialog-demo {
  .body-dialog-demo-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .body-dialog-demo-title {
      color: #fff;
    }
  }
}
</style>
