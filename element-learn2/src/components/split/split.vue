<template>
  <div class="split border-1px"></div>
</template>

<script>
export default {

};
</script>

<style lang="stylus">
.split {
  width: 100%;
  height: 16px;
  position: relative;
  &:before{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: '';
  }
  &:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: '';
  }
  background: #f3f5f7;
}
</style>
