<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <div class="icon service"></div>
        <span>客服</span>
      </div>
      <div>
        <div class="icon shop"></div>
        <span>店铺</span>
      </div>
      <div>
        <div class="icon select"></div>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 49px;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }

  .bar-item{
    flex: 1;
  }

  .bar-left{
    display: flex;
    background-color: white;
  }

  .bar-left>div{
    flex: 1;
  }

  .icon{
    width: 22px;
    height: 22px;
    margin: 3px auto 3px;
    /*background: url("../../../assets/img/detail/detail_bottom.png");*/
    background: url("../../../assets/img/detail/detail_bottom.png") no-repeat 0 0;
    background-size: 22px 150px;

  }

  .icon.service{
    background-position: 0 -52px;
  }

  .icon.shop{
    background-position: 0 -98px;
  }

  .icon.select{
    background-position: 0 0;
  }

  .bar-right{
    display: flex;
    height: 100%;
    line-height: 49px;
  }

  .bar-right .cart{
    flex: 1;
    background-color: #f9d90d;
  }

  .bar-right .buy{
    flex: 1;
    background-color: #fa7697;
    color: white;
  }


</style>
