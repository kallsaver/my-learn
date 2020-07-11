<template>
  <div class="index">
    <cube-index-list
      :title="$route.meta.title"
      :data="listData"
      @select="selectItem">
    </cube-index-list>
  </div>
</template>

<script>
import { options } from '@/router/options'

export default {
  data() {
    return {
      listData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const currentRoute = this.$route
      const routes = options
      for (let i = 0; i < routes.length; i++) {
        const item = routes[i]
        if (item.path === currentRoute.path) {
          const children = item.children || []
          this.listData = this.calculatelistData(children)
          break
        }
      }
    },
    calculatelistData(routes) {
      if (!routes.length) {
        return []
      }
      const listData = []
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        const path = route.path
        const meta = route.meta || {}
        const title = meta.title ? meta.title : ''
        if (title) {
          const initial = title.slice(0, 1)
          let groupActive = null
          for (let j = 0; j < listData.length; j++) {
            const group = listData[j]
            if (group.name === initial) {
              groupActive = group
              break
            }
          }
          if (!groupActive) {
            groupActive = {}
            groupActive.name = initial
            groupActive.items = []
            listData.push(groupActive)
          }
          const groupItem = {
            name: title,
            value: path,
          }
          groupActive.items.push(groupItem)
        }
      }

      listData.sort((prev, next) => {
        return prev.name.charCodeAt() - next.name.charCodeAt()
      })

      listData.forEach((group) => {
        group.items.sort((prev, next) => {
          return prev.name.charCodeAt() - next.name.charCodeAt()
        })
      })

      return listData
    },
    selectItem(item) {
      this.$router.push({ name: item.value })
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  width: 100%
  height: 100%
  background: #fff
</style>
