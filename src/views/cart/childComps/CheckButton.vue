<template>
  <div>
    <div class="icon-select" :class="{active: checked}">
      <img src="~/assets/img/cart/tick.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    checked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .icon-select{
    width: 18px;
    height: 18px;
    margin: 2px;
    /*margin-top: 35px;*/
    border-radius: 50%;
    border: 2px solid #999999;
  }

  .active{
    border-color: #81c0ff;
    background-color: #81c0ff;
  }
</style>
