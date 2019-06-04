<template>
  <page
    :title="$route.meta.title">
    <div class="repaints">
    </div>
  </page>
</template>

<script>
function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
export default {
  data() {
    return {
      list: [
        {
          content: '舒适型'
        },
        {
          content: '七座商务'
        },
        {
          content: '豪华型'
        }
      ],
    }
  },
  mounted() {
    this.sheet = this.$createActionSheet({
      title: '我是标题~~~',
      pickerStyle: true,
      data: this.list,
    }).show()
    setTimeout(() => {
      this.sheet.$updateProps({
        data: [
          {
            content: '豪华型'
          }
        ]
      })
    }, 5000)
  },
  methods: {
  },
}
</script>

<style lang="stylus" scoped>

</style>
