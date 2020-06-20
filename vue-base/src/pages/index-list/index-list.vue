<template>
  <div class="index">
    <cube-index-list
      :data="list"
      @select="selectItem">
    </cube-index-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    console.log(66)
  },
  activated() {
    this.list = this.$route.params.data
    console.log(this.list)
  },
  methods: {
    selectItem(item) {
      this.$router.push({name: item.name})
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  position: fixed
  top: 0px
  left: 0;
  bottom: 0
  width: 100%

</style>
