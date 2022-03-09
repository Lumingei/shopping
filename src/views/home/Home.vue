<template>
  <div id="home">
    <navi-bar class="home-nav">
      <div slot="center">平菇街</div>
    </navi-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="{tab-control:isTop}"
                 @tabClick="tabClick"
                 ref="topControl"
                 v-show="isTop">
    </tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperLoad="swimgLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl">
      </tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="scrollTo" v-show="isTrue"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NaviBar from "@/components/common/navibar/NaviBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodList from "../../components/content/goods/GoodList";
import Scroll from "../../components/common/scroll/Scroll";

import {getHomeMultidata,getHomeGoods} from "../../network/home";
import {itemListenerMixin, backTopMixin} from "../../common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,

    NaviBar,
    TabControl,
    GoodList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      offsetTop: 0,
      isTop: false,
      saveY: 0,
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
  },
  activated() {
    // console.log('ac')
    // console.log(this.saveY)
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('dea ')
    this.saveY = this.$refs.scroll.getY()
    // console.log(this.saveY)
    this.$bus.$off('itemImgLoad', this.itemImgListener)

  },

  methods: {
    //事件监听
    tabClick(index){
      this.currentType = Object.keys(this.goods)[index]
      this.$refs.topControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;

    },
    contentScroll(position) {
      // console.log(position.y)
      this.isTrue = position.y < -1000 ? true : false
      this.isTop = position.y < - this.offsetTop ? true : false
    },
    pullingUp() {
      this.getHomeGoods(this.currentType)
    },
    swimgLoad() {
      this.offsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    //网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then( res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>


<style scoped>
  #home {
    /*margin-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    font-size: 18px;
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*z-index: 10;*/
  }

  .tab-control {
    position: relative;
    z-index: 10;
  }

  .content {
    /*height: 400px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
