<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
    <slot v-if="!isActive"  name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  // data() {
  //   return {
  //     isActive: false
  //   }
  // },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick() {
      // this.isActive = !this.isActive
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 10px;
}

.tab-bar-item img{
  height: 24px;
  width: 24px;
  vertical-align: middle;
}

/*.active {*/
/*  color: red;*/
/*}*/

</style>
