<template>
  <page :title="$route.meta.title"
    :is-show-start="false">
    <div class="css-properties">
      <div class="demo" v-if="demo === 0">
        <div class="el"></div>
      </div>
      <div class="demo" v-if="demo === 1">
        <div class="el" data-x="160"></div>
        <div class="el" data-x="80"></div>
        <div class="el" data-x="250"></div>
      </div>
      <div class="demo" v-if="demo === 2">
        <div class="el"></div>
      </div>
      <div class="demo" v-if="demo === 3">
        <div class="el"></div>
      </div>
    </div>
  </page>
</template>

<script>
import anime from 'animejs'

export default {
  data() {
    return {
      demo: 0,
    }
  },
  mounted() {
    this.demo = 0
  },
  methods: {
    start() {
      this[`demo${this.demo}`]()
    },
    demo0() {
      anime({
        targets: '.el'
      })
    },
    demo1() {
    },
    demo2() {
    },
    demo3() {
    }
  }
}
</script>

<style lang="stylus" scoped>

.el
  width: 20px
  height: 20px
  background: red
  margin-bottom: 10px

.circle
  width: 50px
  height: 50px
  background: red
  border-radius: 50%

.triangle
  pointer-events: none
  position: relative
  width: 0
  height: 0
  border-style: solid
  border-width: 0 28px 48px 28px
  border-color: transparent transparent red transparent

.square
  width: 50px
  height: 50px
  background: red

.css-properties
  width: 100%
  height: 100vh
  padding: 50px

</style>
