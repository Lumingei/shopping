<template>
  <div class="category">
    <navi-bar class="navi-bar">
      <div slot="center">商品分类</div>
    </navi-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content" ref="scroll" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @itemClick="tabClick"/>
          <good-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NaviBar from "../../components/common/navibar/NaviBar";
import Scroll from "../../components/common/scroll/Scroll";

import TabControl from "../../components/content/tabControl/TabControl";
import GoodList from "../../components/content/goods/GoodList";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";


import {getCategory, getSubCategory, getCategoryDetail} from "../../network/category";
import {itemListenerMixin, tabControlMixin} from "../../common/mixin";

export default {
  name: "Category",
  mixins: [itemListenerMixin, tabControlMixin],
  components: {
    TabContentCategory,
    TabMenu,
    NaviBar,
    Scroll,
    TabControl,
    GoodList
  },
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1,
    }
  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1){
        return {}
      }
      else{
        return this.categoryData[this.currentIndex].subcategories
      }
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) {
        return []
      }
      else {
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    }
  },

  created() {
    this._getCategory()

    // this.$bus.$on('itemImgLoad', () => {
    //   console.log('image')
    //   this.$refs.scroll.refresh()
    // })
  },

  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },

  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list
        console.log(res)
        for(let i = 0; i < this.categories.length; i ++){
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        this._getSubCategories(0)
      })
    },

    _getSubCategories(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubCategory(maitKey).then(res => {
        console.log(res)
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    selectItem(index) {
      this._getSubCategories(index)
      this.$refs.scroll.scrollTo(0, 0, 0)
    },

    tabClick() {

    }

  },


}
</script>

<style scoped>
  .category{
    height: 100vh;
  }

  .navi-bar {
    background-color: var(--color-tint);
    color: white;
    font-size: 18px;
  }

  .content{
    height: calc(100% - 44px - 49px);
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    display: flex;
  }

  .tab-content {
    height: 100%;
    flex: 1;
    /*overflow: hidden;*/
  }
</style>
