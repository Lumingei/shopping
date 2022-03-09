<template>
  <div class="cart">
    <navi-bar class="navi-bar">
      <div slot="center">
        平菇街({{cartLength}})
      </div>
      <cart-list></cart-list>
    </navi-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
import NaviBar from "../../components/common/navibar/NaviBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NaviBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .navi-bar{
    background-color: var(--color-tint);
    color: white;
    font-size: 18px;
  }

</style>
