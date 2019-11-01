<template>
  <page>
    <div :class="$style['main-list']">
      <div class="list">
        <div class="item"
            v-for="(item, index) in list"
            :key="index"
            :style="setStyle(index, item)"
            @click="pageTurn(index)"
            @animationend="animationend(index)">
            {{index}}
          </div>
      </div>
    </div>
  </page>
</template>

<script>
function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1) + min) | 0
}

function getRandomColor() {
  return '#' + (getRandomInt(0, 0xffffff)).toString(16)
}

const list = []

for (let i = 0; i < 10; i++) {
  list.push(getRandomColor())
}

export default {
  data() {
    return {
      list: list,
      isMounted: false
    }
  },
  computed: {
    setStyle(index, item) {
      return (index, item) => {
        return {
          background: item,
          animation: !this.isMounted ? `${this.$style['list-load']} ${index * 200 + 400}ms` : 'none'
        }
      }
    },
  },
  methods: {
    pageTurn(index) {
      // this.$router.push({
      //   name: 'mainDetail',
      //   params: {
      //     i: index
      //   }
      // })
      this.$router.push(`/main/detail/${index}`)
    },
    animationend(index) {
      if (index === this.list.length - 1) {
        this.isMounted = true
      }
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.main-list {
  box-sizing: border-box;
  padding: 30 / @rem 10 / @rem;
  :global {
    .list {
      .item {
        font-size: 40 / @rem;
        color: #000;
        margin-bottom: 10 / @rem;
        height: 150 / @rem;
        line-height:  150 / @rem;
        border-radius: 6 / @rem;
        text-align: center;
      }
    }
  }
}

@keyframes list-load {
  0% {
    transform: translateY(100px)
  }
  100% {
    transform: translateY(0px)
  }
}
</style>
