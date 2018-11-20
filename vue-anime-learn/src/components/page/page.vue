<template>
  <div class="page" :style="{'z-index': zIndex}">
    <div class="page-header">
      <div class="page-title">{{title}}</div>
      <i class="page-back w-page-icon-back-example" @click="back"></i>
      <i class="page-option w-page-icon-option" @click="rightClick"></i>
    </div>
    <div class="page-wrapper">
      <div class="page-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
const COMPONENT_NAME = 'page'

const EVENT_RIGHT_CLICK = 'right-click'

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      // 必填
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 50
    }
  },
  created () {
  },
  methods: {
    back() {
      this.$router.back()
    },
    rightClick() {
      this.$emit(EVENT_RIGHT_CLICK)
    }
  }
}
</script>

<style lang="stylus">
@import "./fonts/w-page-icon.css"
@import "~@/common/stylus/variable.styl"

.page
  position: fixed
  z-index: 50
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #efeff4
  .page-header
    position: relative
    height: 44px
    line-height: 44px
    text-align: center
    background-color: #f7f7f7
    box-shadow: 0 1px 6px #ccc
    backface-visibility: hidden
    z-index: 99
    .page-title
      margin: 0
      font-size: 16px
      color: $color-main
    // 在http://www.iconfont.cn/下载svg文件
    // https://icomoon.io上传svg文件制作图标,在下载之前配置清除图标的颜色(remove color)
    // https://icomoon.io不仅支持svg,也支持其他格式的图片超级吊
    // https://icomoon.io的缓存做得特别好,基本是只用考虑新增图标,旧图标被缓存了
    // 这样就可以让:before没有默认颜色而是继承实体的颜色
    // color如果不生效是css的权重引起的
    // 下载解压的文件,引入style.css到全局中
    // font-size是量出图片的宽度,通过修改颜色,会有一个默认的颜色
    .page-back
      position: absolute
      top: 11px
      left: 15px
      font-size: 20px
      line-height: 20px
    .page-option
      position: absolute
      top: 9px
      right: 15px
      font-size: 24px
      line-height: 24px
  .page-wrapper
    width: 100%
    display: flex
    flex-direction: column
    height: calc(100% - 44px)
    overflow: hidden
    // 使用具有回弹效果的滚动,
    // 当手指从触摸屏上移开,内容会继续保持一段时间的滚动效果
    // -webkit-overflow-scrolling: touch;
    .page-content
      flex: 1
      position: relative
      margin: 0px 10px 10px 10px
</style>
