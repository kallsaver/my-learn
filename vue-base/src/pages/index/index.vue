<template>
  <div class="index">
    <div class="button">
      <cube-button @click="pageTurn('/base')">基础</cube-button>
    </div>
    <div class="button">
      <cube-button @click="pageTurn('/action')">实战</cube-button>
    </div>
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/vue">vue</router-link>
      </cube-button>
    </div>
    <div class="button">
      <cube-button>
        <router-link tag="div" to="/browser">浏览器</router-link>
      </cube-button>
    </div>
    <div class="button">
      <cube-button @click="pageTurn('/animation')">动画</cube-button>
    </div>
    <img src="http://www.t.com/test.png" />
    <img :src="bg" />
  </div>
</template>

<script>
import bg from '@/assets/images/bg01.jpg'

export default {
  data() {
    return {
      bg,
    }
  },
  mounted() {
    function run() {
      throw new Error('vue mounted')
    }
    run()
  },
  methods: {
    pageTurn(location) {
      const route = this.$router.resolve(location).route
      this.$router.push({
        name: route.name
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.index
  .button
    margin-bottom: 30px
    img
      width: 100px
</style>
