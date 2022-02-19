<template>
  <div class="navi-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NaviBar"
}
</script>

<style scoped>
  .navi-bar {
    height: 44px;
    display: flex;
    text-align: center;
    line-height: 44px;
  }

  .navi-bar .left {
    width: 60px;
  }

  .navi-bar .right {
    width: 60px;
  }

  .navi-bar .center {
    flex: 1;
  }

</style>
