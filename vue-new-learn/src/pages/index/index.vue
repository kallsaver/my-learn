<template>
  <div class="index">
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/filepond">filepond</router-link>
      </cube-button>
    </div>
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/cube-ui">cube-ui</router-link>
      </cube-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.index
  .button
    margin-bottom: 30px
</style>
