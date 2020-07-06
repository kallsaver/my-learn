<template>
  <page
    :title="$route.meta.title">
    <div ref="loadImg" class="load-img">
      <div class="content"></div>
      <img ref="img" :data-src="bg">
    </div>
  </page>
</template>

<script>
import bg from '@/assets/images/bg03.jpg'

export default {
  data() {
    return {
      bg,
    }
  },
  mounted() {
    this.demo1()
  },
  methods: {
    demo1() {
      // https://www.jianshu.com/p/84a86e41eb2b
      function loadImg(el) {
        if (!el.src) {
          el.src = el.dataset.src
        }
      }
      const io = new IntersectionObserver(entries => {
        entries.forEach((item) => {
          const el = item.target
          const intersectionRatio = item.intersectionRatio
          const isIntersecting = item.isIntersecting
          if (intersectionRatio > 0) {
            loadImg(el)
            io.unobserve(el)
          }
        })
      })
      io.observe(this.$refs.img)
      console.log(io)
    },
    demo2() {
      function loadImg(el) {
        if (!el.src) {
          el.src = el.dataset.src
        }
      }
      window.addEventListener('scroll', () => {
        console.log('scroll')
      }, false)
    }
  },
}
</script>

<style lang="stylus">
.load-img {
  overflow: scroll;
  .content {
    height: 150vh;
    background: peru;
  }
}
</style>
