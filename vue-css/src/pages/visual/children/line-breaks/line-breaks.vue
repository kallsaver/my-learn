<template>
  <base-page
    :title="$route.name"
    @right-click="showPopup">
    <div class="line-breaks">
      <span class="key">Name:</span>
      <span class="br">kallsave</span>
      <span class="key">Github:</span>
      <span class="br">https://github.com/kallsave</span>
    </div>
  </base-page>
</template>

<script>
export default {
  methods: {
    showPopup() {
      this.$createDialog({
        type: 'alert',
        confirmBtn: {
          text: '我知道了',
          active: true
        }
      }, (h) => {
        return (
          [
            <div class={this.$style['dialog-title']} slot="title">提示</div>,
            /* eslint-disable no-octal-escape */
            <div class={this.$style['dialog-content']} slot="content">在Unicode中，0x000A字符是专门控制换行的。在CSS中，我们可以写为\000A或\A,我们可以用它来作为::after伪元素的内容，并将其添加到指定元素的尾部，实现换行效果。</div>
          ]
        )
      }).show()
    }
  }
}
</script>

<style lang="stylus" module>

.dialog-title
  line-height: 36px
  color: #333

.dialog-content
  padding: 10px
  color: #666

.line-breaks
  box-sizing: border-box
  width: 100%
  padding: 39px
  background: rgba(180, 160, 120, 0.1)
  color: #333
  .key
    padding-right: 6px

  .br::after
    content: "\A"
    white-space: pre
</style>
