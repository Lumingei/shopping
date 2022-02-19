<template>
  <div class="goods-list">
    <good-list-item v-for="item in goods" :goods-item="item">
    </good-list-item>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";

export default {
  name: "GoodList",
  props: {
    goods: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  /*.goods-list .item {*/
  /*  width: 48%;*/
  /*}*/
</style>
