<template>
  <div id="app">
    <section class="page-header">
      <img class="back-last-example" v-if="global.hasSeenExample"  @click="back" />
      <h1>BetterScroll Devtools</h1>
      <router-link to="/test" class="btn">Set Options</router-link>
      <router-link to="/examples" class="btn">Then Go To Examples</router-link>
    </section>

    <!-- router-view加class是为了做过渡动画 -->
    <!-- router-view中的组件如果不使用keep-alive,每次都会重新加载 -->
    <!-- 切换会销毁组件 -->
    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      global: global,
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="stylus" scoped>
.page-header {
  position: relative;
  height: 250px;
  padding-top: 30px;
  color: #fff;
  text-align: center;
  background-color: #5FC3E4;
  background-image: linear-gradient(120deg, #E55D87, #5FC3E4);
  // z-index: 1000;
  // position: relative;
  .back-last-example {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 30px;
    hegiht: 30px;
  }
  h1 {
    line-height: 50px;
    font-size: 28px;
    margin-bottom: 50px;
  }
  .btn {
    display: block;
    text-decoration: none;
    width: 343px;
    font-size: 20px;
    line-height: 35px;
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    border-style: solid;
    border-width: 1px;
    border-radius: 6px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
}

.view {
  opacity: 1;
  &.fade-enter-active, &.fade-leave-active {
    opacity: 0.01;
    transition: all 0.4s ease-in-out;
  }
  &.fade-enter, &.fade-leave {
    transition: opacity .4s;
  }
}

</style>
