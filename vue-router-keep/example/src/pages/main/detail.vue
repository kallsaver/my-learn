<template>
  <page>
    <div :class="$style['main-detail']">
      <input class="input" />
      <div class="context">当前页码:{{index}}</div>
      <div class="btn" @click="pageTurnList">push到列表</div>
      <div class="btn" @click="pageTurnBack">返回到上一页</div>
    </div>
  </page>
</template>

<script>
export default {
  computed: {
    index() {
      return this.$route.params.i
    }
  },
  methods: {
    pageTurnList() {
      this.$router.push({
        name: 'mainList',
      })
    },
    pageTurnBack() {
      this.$router.back()
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.main-detail {
  box-sizing: border-box;
  padding: 30 / @rem 10 / @rem;
  :global {
    .input {
      border-radius: 6 / @rem;
    }
    .context {
      font-size: 18 / @rem;
      color: #fff;
      border-radius: 5 / @rem;
      background: #41b883;
      margin-bottom: 10 / @rem;
      height: 100 / @rem;
      line-height: 100 / @rem;
      text-align: center;
    }
    .btn {
      font-size: 16 / @rem;
      color: #fff;
      border-radius: 5 / @rem;
      background: #41b883;
      margin-bottom: 10 / @rem;
      height: 50 / @rem;
      line-height: 50 / @rem;
      text-align: center;
    }
  }
}
</style>
