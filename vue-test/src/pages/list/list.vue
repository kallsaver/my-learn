<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
    <input v-model="query">
    <div class="btn" @click="clickHandler"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['vue', 'node', 'python', 'go'],
      query: ''
    }
  },
  mounted() {

  },
  methods: {
    clickHandler() {
      this.list.push('flutter')
    }
  },
}
</script>

<style>

</style>
