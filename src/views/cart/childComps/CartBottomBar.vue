<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :checked="isSelectAll" @click.b.native="selectAll"></check-button>
      <span class="all">全选</span>
    </div>
    <div class="totalprice">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calClick">
      去结算({{itemCount}})
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    itemCount() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0)
        return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    selectAll() {
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }
      else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calClick() {
      let flag = false
      for(let item of this.cartList) {
        if(item.checked){
          flag = true
        }
      }
      if(!flag){
        this.$toast.show('请选择商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    background-color: rgba(147, 145, 144, 0.31);
    color: #333333;
    font-size: 17px;
  }

  .check-content{
    width: 80px;
    display: flex;
    padding: 5px;
    font-size: 14px;
  }

  .all{
    margin: 5px;
  }

  .totalprice{
    flex: 1;
    margin: 8px 0 0 30px;
  }

  .calculate{
    width: 90px;
    padding: 10px 5px;
    background-color: #ff8000;
    text-align: center;
  }
</style>
