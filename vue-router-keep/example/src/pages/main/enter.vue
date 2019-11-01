<template>
  <page>
    <div :class="$style['main-enter']">
      <div class="box">33</div>
    </div>
  </page>
</template>

<script>
export default {
  mounted() {
    console.log(66)
  },
}
</script>

<style lang="less" module>
@rem: 100;

.main-enter {
  :global {
    .box {
      font-size: 12 / @rem;
      color: gold;
    }
  }
}
</style>
