<template>
  <div class="base">
    <index-list :route-index="routeIndex" :title="title"></index-list>
  </div>
</template>

<script>
import IndexList from '@/components/index-list/index-list.vue'

export default {
  components: {
    IndexList
  },
  data() {
    return {
      routeIndex: 0,
      title: '基础'
    }
  }
}
</script>

<style>

</style>
