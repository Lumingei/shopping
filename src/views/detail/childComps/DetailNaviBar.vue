<template>
  <div>
    <navi-bar>
      <div slot="left" class="back">
        <img src="~assets/img/common/back.svg" @click="goBack">
      </div>
      <div slot="center" class="titles">
        <div class="titles-item"
             v-for="(item,index) in titles" :key="index"
             @click="itemClick(index)"
             :class="{active : currentIndex === index}">
          {{item}}
        </div>
<!--        <div>111</div>-->
      </div>
    </navi-bar>
  </div>
</template>

<script>
import NaviBar from "../../../components/common/navibar/NaviBar";

export default {
  name: "DetailNaviBar",
  components: {
    NaviBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // console.log(index)
      // console.log(this.currentIndex)
      this.$emit('itemClick', index)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .titles {
    display: flex;
  }
  .titles-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .titles-item.active {
    color: var(--color-tint);
  }
  .back img {
    margin-top: 13px;
    /*vertical-align: middle;*/
    width: 16px;
    height: 16px;
  }
</style>
