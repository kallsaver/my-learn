<template>
  <div class="test" v-if="showTest"></div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      showTest: true
    }
  },
  created() {
    console.log('test components create')
  },
  methods: {
    show() {
      this.showTest = true
    },
    hide() {
      this.showTest = false
    }
  }
}
</script>

<style lang="stylus">
.test {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: peru;
}
</style>


