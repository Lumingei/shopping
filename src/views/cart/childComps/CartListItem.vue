<template>
  <div class="shop-item">
    <div class="item-select">
<!--      <check-button @selectItem="selectItem" v-model="itemInfo.checked"></check-button>-->
      <check-button class="check-button" :checked="itemInfo.checked"
                    @click.native="checkClick">
      </check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{itemInfo.price}}</div>
        <div class="item-count">×{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartListItem",
  components:{
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      // console.log('----')
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>
<style scoped>
  .shop-item{
    width: 100%;
    height: 110px;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #a3a3a5;
  }

  .item-img img{
    margin: 0 5px;
    width: 75px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info{
    width: 70%;
    color: #333333;
    padding: 5px;
  }

  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 5px;
  }

  .item-title{
    font-size: 17px;
  }

  .item-desc{
    padding-top: 10px;
    font-size: 14px;
  }

  .item-bottom{
    margin-top: 10px;
    display: flex;
    position: relative;
  }

  .item-price{
    color: #ff8000;
  }

  .item-count{
    position: absolute;
    right: 20px;
  }

  .check-button{
    margin-top: 150%;
  }

</style>
