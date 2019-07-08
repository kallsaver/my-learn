<template>
  <div class="index">
    <div>index</div>
    <div class="button" @click="pageTurnList">去list</div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this._vnode)
    // vnode.componentInstance
    console.log('index mounted')
  },
  methods: {
    pageTurnList() {
      this.$router.push({
        name: 'list'
      })
    }
  },
}
</script>

<style lang="stylus" modules>
.index
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
