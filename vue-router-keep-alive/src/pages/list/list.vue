<template>
  <div class="list">
    <div>list</div>
    <div class="button" @click="pageTurnBack">返回</div>
    <div class="button" @click="pageTurnDetail">去detail</div>
  </div>
</template>

<script>
export default {
  methods: {
    pageTurnBack() {
      this.$router.back()
    },
    pageTurnDetail() {
      this.$router.push({
        name: 'detail'
      })
    }
  },
}
</script>

<style lang="stylus" modules>
.list
  font-size: 16px
  text-align: center
  .button
    width: 90%
    margin: 0 auto
    height: 40px
    line-height: 40px
    color: #fff
    background: peru
    margin-bottom: 30px
    border-radius: 5px
</style>
