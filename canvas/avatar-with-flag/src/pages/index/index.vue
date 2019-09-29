<template>
  <div :class="$style['index']">
    <avatar class="avatar"></avatar>
  </div>
</template>

<script>
import Avatar from './components/avatar.vue'
export default {
  components: {
    Avatar
  }
}
</script>

<style lang="less" module>
.index {
  height: 100%;
  :global {
    .avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
