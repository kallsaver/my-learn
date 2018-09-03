<template>
  <div class="subscribe-dialog-view">
    <!-- -->
    <cube-popup ref="popup" @mask-click="hide">
      <div class="subscribe-dialog-wrapper">
        <span class="close" @click="hide"><i class="cubeic-close"></i></span>
        <div class="title">开启推送通知</div>
        <img v-lazy="imgUrl[0]">
        <p class="desc">第一时间获取最新鲜出炉的新闻攻略、赛事咨询、数据专题、精彩视频</p>
        <cube-button class="button" @click="start">现在开启</cube-button>
      </div>
    </cube-popup>
  </div>
</template>

<script>
export default {
  name: 'subscribe-dialog',
  data() {
    return {
      // 不是所有的图片都适合用v-lazy,这里的图片不适合是为了做实验
      // v-lazy="{require('./subscribe.png')}"也是可以的,只是不好看
      // 而且不能使用更好的管理办法
      imgUrl: [
        {
          src: require('./subscribe.png'),
          // 使用webpack开发本地图片不会有error,直接报错
          error: require('../../img/error.jpg'),
          loading: require('../../img/loading.png')
        }
      ]
    };
  },
  methods: {
    show() {
      this.$refs.popup.show();
      // vue的底层就是一切都是编程式触发,不要被结构父组件子组件迷惑了
      // $emit就是订阅者模式,不一定说一定要写在结构上,
      // 而是作者把触发指针写在了结构上
      this.$emit('show');
    },
    hide() {
      this.$refs.popup.hide();
      this.$emit('hide');
    },
    start() {
      this.$refs.popup.hide();
      this.$createToast({
        type: 'correct',
        txt: '开启成功',
        time: 1000
      }).show();
    }
  }
};
</script>

<style lang="stylus">
.subscribe-dialog-wrapper {
  position: relative;
  box-sizing: border-box;
  max-width: 360px;
  margin: 0 25px;
  padding: 38px 20px 20px 20px;
  background-color: #F6F6F6;
  border-radius: 4px;
  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 28px;
    color: #A2A8AF;
  }
  .title {
    font-size: 17px;
    color: #222C36;
  }
  img {
    height: 180px;
    margin: 8px 0 5px 0;
    width: 200px;
  }
  .desc {
    line-height: 20px;
    font-size: 13px;
    color: #C0C8D1;
  }
  .button {
    display: inline-block;
    width: 230px;
    margin-top: 20px;
    padding: 14px;
    border-radius: 4px;
    font-size: 15px;
    background-color: #5B8FDC;
  }
}
</style>
