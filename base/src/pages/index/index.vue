<template>
  <div class="index">
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/base">基础</router-link>
      </cube-button>
    </div>
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/action">实战</router-link>
      </cube-button>
    </div>
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/vue">vue</router-link>
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
