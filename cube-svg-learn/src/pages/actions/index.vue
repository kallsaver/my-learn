<template>
  <div class="actions">
    <index-list :route-index="routeIndex" :title="title"></index-list>
  </div>
</template>

<script>
import IndexList from '@/components/index-list.vue'

export default {
  components: {
    IndexList
  },
  data() {
    return {
      routeIndex: 1,
      title: '实战'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
