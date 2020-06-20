<template>
  <div class="index">
    <cube-index-list
      :title="title"
      :data="listData"
      @select="selectItem"></cube-index-list>
  </div>
</template>

<script>
export default {
  props: {
    routeIndex: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      listData: []
    }
  },
  created() {
    this._calculatelistData()
  },
  methods: {
    _calculatelistData() {
      let listData = []
      if (!this.$router.options.routes[this.routeIndex].children) {
        return
      }
      let routes = this.$router.options.routes[this.routeIndex].children
      for (let i = 0; i < routes.length; i++) {
        let groupIndex = 0
        let passed = listData.every((item, index) => {
          let pass = item.name !== routes[i].name.slice(0, 1)
          if (!pass) {
            groupIndex = index
          }
          return pass
        })
        if (passed) {
          let group = {}
          group.items = []
          group.name = routes[i].name.slice(0, 1)
          let item = {}
          item.name = routes[i].name
          item.value = routes[i].path
          group.items.push(item)
          listData.push(group)
        } else {
          let item = {}
          item.name = routes[i].name
          item.value = routes[i].path
          listData[groupIndex].items.push(item)
        }
      }
      this.listData = listData

      listData.sort((a, b) => {
        return a.name.charCodeAt() - b.name.charCodeAt()
      })

      listData.forEach((groups) => {
        groups.items.sort((a, b) => {
          return a.name.replace(/-/g, '').charCodeAt() - b.name.replace(/-/g, '').charCodeAt()
        })
      })
    },
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
