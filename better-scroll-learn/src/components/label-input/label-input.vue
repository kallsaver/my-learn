<template>
  <div class="label-input">
    <div class="label-text">
      <slot name="label"></slot>
    </div>
    <!-- change是改变了值并且失去焦点了,@input是输入中 -->
    <input type="text"
      v-model="inputValue"
      @change="changeHander">
  </div>
</template>

<script>
const COMPONENT_NAME = 'label-input';
const EVENT_CHANGE = 'change';
export default {
  name: COMPONENT_NAME,
  props: {
    // value不强制类型检查
    value: null,
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
    inputValue(newVal) {

    },
  },
  methods: {
    changeHander(e) {
      this.event = Object.assign({
        target: e.target.parentNode
      }, e);
      this.$emit('change', this.event, this.inputValue);
    }
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/variable.styl";
.label-input {
  padding: 0 10px;
  display: flex;
  .label-text {
    flex: 1 1 auto;
    line-height: 34px;
    color: #666;
    font-size: 18px;
  }
  input {
    // 不可以扩展,可以收缩,基本值依赖其他css属性,例如width
    flex: 0 1 auto;
    color: #666;
    font-size: 16px;
    width: 150px;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 10px;
    background-color: #fff;
    outline: none;
    &:focus {
      color: $color-main-l;
      border: 1px solid $color-main-l;
    }
  }
}


</style>

