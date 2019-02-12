<template>
  <page>
    <div class="index">
      <div ref="bgWrapper" class="bg-wrapper">
        <div class="bg-cover"></div>
        <div ref="bgImg" class="bg-image"
          :key="index" v-for="(item, index) in images"
          :style="{'background-image': `url(${item.url})`}"></div>
      </div>
    </div>
  </page>
</template>

<script>
import { addClass, removeClass } from '@/common/helpers/dom.js'
export default {
  data() {
    return {
      images: [
        {
          url: require('@/assets/images/bg01.jpg')
        },
        {
          url: require('@/assets/images/bg02.jpg')
        },
        {
          url: require('@/assets/images/bg03.jpg')
        }
      ],
      delay: 10000
    }
  },
  mounted() {
    this.bgAnimmation()
  },
  methods: {
    bgAnimmation() {
      const vh = window.innerHeight
      this.$refs.bgWrapper.style.height = `${vh}px`
      window.onresize = () => {
        this.$refs.bgWrapper.style.height = `${vh}px`
      }
      let index = 0
      let lastIndex = 0
      let img = this.$refs.bgImg
      addClass(img[index], 'visible')
      addClass(img[index], 'top')
      setInterval(() => {
        lastIndex = index
        index++

        if (index >= this.images.length) {
          index = 0
        }

        removeClass(img[lastIndex], top)
        addClass(img[index], 'visible')
        addClass(img[index], 'top')

        setTimeout(() => {
          removeClass(img[lastIndex], 'visible')
        }, this.delay / 2)
      }, this.delay)
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  .bg-wrapper
    position: relative
    width: 100%
    height: 100vh
    transition: opacity 2s ease-in-out
    .bg-cover
      position: absolute
      width: 150%
      height: 100%
      left: 0
      background-color: #000
      z-index: 10
      opacity: 0.6
    .bg-image
      position: absolute
      width: 150%
      height: 100%
      top: 0
      left: 0
      opacity: 0
      visibility: hidden
      background-size: cover
      &.visible
        animation: bg 45s linear infinite
        opacity: 1
        visibility: visible
        z-index: 1
        &.top
          z-index: 2

@media screen and (max-width: 1280px)
  .bg-wrapper .bg-image.visible
    animation: bg 30s linear infinite

@media screen and (max-width: 736px)
  .bg-wrapper .bg-image.visible
    animation: bg 20s linear infinite

@keyframes bg
  0%
    transform: translateX(0)
  100%
    transform: translateX(-25%)

</style>
