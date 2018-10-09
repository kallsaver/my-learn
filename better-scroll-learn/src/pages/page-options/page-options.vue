<template>
  <div class="options">
    <div class="content">
      <div class="group">
        <switch-option
          :disabled="true"
          :value="true">
          <div class="label">scorllbar</div>
        </switch-option>
      </div>
      <div class="group sub1">
        <switch-option
          :value="false"
          @update:value="changeFade">
          <div class="label">fade</div>
        </switch-option>
      </div>
      <div class="group">
        <switch-option
          :value="false"
          @update:value="changeValue">
          <div class="label">pullDownRefresh</div>
        </switch-option>
      </div>
      <div class="group">
        <switch-option
          :value="false"
          @update:value="changeValue">
          <div class="label">pullUpLoad</div>
        </switch-option>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchOption from '../../components/switch-option/switch-option.vue';
import _ from 'lodash';

import BSOptions from '../../common/data/better-scroll-options.js';

console.log(BSOptions);

export default {
  name: 'page-options',
  data() {
    return {
      options: {
        scrollbar: {
          fade: false
        }
      }
    };
  },
  created() {

  },
  methods: {
    changeFade(val) {
      this.options.scrollbar.fade = val;
    },
    changeValue() {

    }
  },
  watch: {
    options: {
      handler(newVal) {
        Object.assign(BSOptions, newVal);
        console.log(BSOptions.scrollbar.fade);
      },
      deep: true
    }
  },
  components: {
    SwitchOption
  },
};
</script>

<style lang="stylus">
.options {
  .content {
    padding: 10px 00px 10px 20px;
    .group {
      padding: 10px 0px;
      border-bottom: 1px solid #ccc;
      &.sub1 {
        margin-left: 30px;
      }
      &.sub2 {
        margin-left: 60px;
      }
      .label {
        font-size: 18px;
        color: #666;
        margin-left: 20px;
      }
    }
  }
}
</style>

