<template>
  <div class="detail">
    <div>detail</div>
    <div class="button" @click="pageTurnBack">返回</div>
  </div>
</template>

<script>
export default {
  methods: {
    pageTurnBack() {
      this.$router.back()
    },
    pageTurnIndex() {
      this.$router.push({
        name: 'index'
      })
    }
  },
}
</script>

<style lang="stylus" modules>
.detail
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
