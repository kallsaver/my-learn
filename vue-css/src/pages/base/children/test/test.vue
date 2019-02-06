<template>
  <base-page
    :title="$route.name">
    <div class="index">
      <base-vhtml :context="context"></base-vhtml>
    </div>
  </base-page>
</template>

<script>
import BaseVhtml from '@/base-components/vhtml/vhtml.js'

export default {
  components: {
    BaseVhtml,
  },
  data() {
    return {
      context: `<div id="dt" class="context">
                  <ul>
                    <li>123</li>
                    <li>456</li>
                  </ul>
                  <img src="${require('@/assets/images/bg01.jpg')}" />
                </div>`
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.index
  width: 100%
  height: 100vh
  padding: 100px

.context
  width: 200px
  height: 200px
  background: peru
</style>
