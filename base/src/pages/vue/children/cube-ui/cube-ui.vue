<template>
  <page
    :title="$route.meta.title">
    <div class="cube-ui">
      <div
        style="width: 50px;height: 50px;background: red"
        @click="show"></div>
    </div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.actionSheet = this.$createActionSheet({
      title: '标题',
      data: [
        {
          content: '1',
          class: 'left'
        },
        {
          content: '2'
        },
      ],
      onSelect: (item, index) => {
        console.log(item)
      }
    })
  },
  methods: {
    show() {
      this.actionSheet.show()
    }
  }
}
</script>

<style lang="stylus">
.left
  text-align: left!important
</style>

<style lang="stylus" scoped>
.left
  text-align: left!important
</style>
