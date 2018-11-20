<template>
  <div class="base">
    <index-list :route-index="routeIndex" title="基础"></index-list>
  </div>
</template>

<script>
import IndexList from '@/components/index-list/index-list.vue'

export default {
  name: 'keep-alive',
  components: {
    IndexList
  },
  computed: {
    routeIndex() {
      return this.$router.options.routes.findIndex((item) => {
        return this.$route.path.indexOf(item.path) !== -1
      })
    },
  },
}
</script>

<style>

</style>
