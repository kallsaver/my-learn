<template>
  <div :class="$style['avatar']">
    <input class="avatar-input"
      type="file"
      multiple="multiple"
      accept="image/*" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" module>
.avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 10px 10px 0;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;;
    height: 2px;
    background-color: #666;
    transform: translate(-50%, -50%);
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: #666;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  :global {
    .avatar-input {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      font-size: 0;
      opacity: 0;
    }
  }
}
</style>
