<template>
  <div id="tab-bar">
    <slot></slot>

  </div>

</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  width: 100%;
  background-color: #f3f3f3;

  position: fixed;
  bottom: 0;

  box-shadow: 0 -1px 5px rgb(100, 100, 100, 0.1);
}


</style>
