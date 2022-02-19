<template>
  <div class="wrapper">
    <ul>
      <li>1231</li>
      <li>1232</li>
      <li>1233</li>
      <li>1234</li>
      <li>1235</li>
      <li>1236</li>
      <li>1237</li>
      <li>1238</li>
      <li>1239</li>
      <li>12310</li>
      <li>12311</li>
      <li>12312</li>
      <li>12313</li>
      <li>12314</li>
      <li>12315</li>
      <li>12316</li>
      <li>12317</li>
      <li>12318</li>
      <li>12319</li>
      <li>12320</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  created() {

  },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"))
  }
}
</script>

<style scoped>
  .wrapper {
    height: 100px;
    background-color: #81c0ff;
    overflow: hidden;
  }
</style>
