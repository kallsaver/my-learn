<template>
  <div v-show="isVisible" class="body-transition-demo">
    <popup ref="popup" @mask-click="hide">
      <div class="create-transition-demo-content">
        <img :src="pic" alt="dialog">
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from '../../components/popup/popup';
import visibilityMixin from '../../common/mixins/visibility.js';
export default {
  name: 'body-transition-demo',
  mixins: [visibilityMixin],
  data() {
    return {
      pic: require('../../assets/images/dialog.jpg'),
    };
  },
  methods: {
    hide() {
      this.isVisible = false;
      this.$refs.popup.hide();
      this.$emit('hide');
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
.body-transition-demo {
  .create-transition-demo-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 300px;
    }
  }

}
</style>
