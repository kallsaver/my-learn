<template>
  <div id="app">
    <div class="box">vueeee</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width:500px;
  height: 500px;
  margin:0 auto;
  margin-top: 60px;
  .box{
    width:200px;height: 200px;
    background-color: darkorange;
    line-height: 200px;
  }
  .box2{
    width:200px;height: 200px;
    background-color: green;
    line-height: 200px;
  }
}
</style>