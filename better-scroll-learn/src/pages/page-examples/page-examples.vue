<template>
  <div class="example">
    <ul class="example-list">
      <li class="example-item border-bottom-1px">
        <router-link class="link" to="/examples/index-list/">indexList<i class=""></i></router-link>
      </li>
    </ul>

    <!-- 这里是二级嵌套路由 -->
    <!-- 嵌套路由就是一个组件自己本身是路由组件,它里面又带了router-view -->
    <!-- 路由是一个加载会使得url变化的组件,并且如果没有keep-alive切换会销毁,重新加载的特性 -->
    <!-- 二级嵌套路由常用于侧边栏式切换页面 -->
    <transition name="move">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexListImg: require('../../assets/images/' + this.$i18n.t('examples.indexListImg')),

    };
  }
};
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable.styl";
@import "../../common/stylus/mixin.styl";

.example {
  .example-list {
    padding-left: 16px;
    .example-item {
      position: relative;
      .link {
        background-color: $color-white;
        height: 40px;
        line-height: 40px;
        display: block;
        width: 100%;
        color: #333;
      }
    }
  }
}

.view {
  transition: all 0.3s;
  // tranform和fixed不能同时并存
  // tranform会让fixed失效
  transform: none;
  &.move-enter-active, &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
}

// 推荐写法:
// active在vue过渡动画中要写时间的css代码
// .move-enter-active, .move-leave-active
//   transition: all 0.3s

// 初始态和离开态
// .move-enter, .slide-leave-to
//   transform: translate3d(100%, 0, 0)

</style>
