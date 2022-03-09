<template>
  <div id="detail">
<!--    <div>-->
<!--      <ul>-->
<!--        <li v-for="item in $store.state.cartList">{{item}}</li>-->
<!--      </ul>-->
<!--    </div>-->
    <detail-navi-bar ref="nav" @itemClick="itemClick" class="detail-navibar"></detail-navi-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper ref="swiper" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommendGoods"></good-list>
    </scroll>
    <back-top @click.native="scrollTo" v-show="isTrue"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :isShow="isShow"></toast>
  </div>
</template>

<script>
import DetailNaviBar from "./childComps/DetailNaviBar";
import {getDetail, getRecommend} from "../../network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import {Goods, Shop, GoodsParam} from "../../network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodList from "../../components/content/goods/GoodList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Toast from "../../components/common/toast/Toast";

import {itemListenerMixin, backTopMixin} from "../../common/mixin";
import {debounce} from "../../common/utils";

export default {
  name: "Detail",
  components: {
    DetailBaseInfo,
    DetailNaviBar,
    DetailSwiper,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendGoods: [],
      themeTopYs:[],
      getThemeTopY: null,
      currentIndex: 0,
      message: '',
      isShow: false
    }
  },
  created() {
    this.iid = this.$route.params.iid
    //请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(res)
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //请求推荐数据
    getRecommend().then(res => {
      this.recommendGoods = res.data.list
    })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(this.$refs.swiper.$el.offsetTop);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    }, 200)
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      // console.log('load')
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    itemClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 500)
    },
    addToCart() {
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      this.$store.dispatch('addCart', product).then(res => {
        // this.isShow = true
        // this.message = res
        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 2000)
      })
    },
    contentScroll(position) {
      this.isTrue = position.y < -1000 ? true : false
      let posY = -position.y + 44
      let length = this.themeTopYs.length
      // if(posY <= this.themeTopYs[1]){
      //   this.currentIndex = 0
      // }else if(posY <= this.themeTopYs[2]){
      //   this.currentIndex = 1
      // }else if(posY <= this.themeTopYs[3]){
      //   this.currentIndex = 2
      // }else{
      //   this.currentIndex = 3
      // }
      for(let i = 0; i < length - 1; i ++){
        if(this.currentIndex !== i && (posY >=this.themeTopYs[i] && posY <= this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // console.log(this.$refs.nav.currentIndex)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #ffffff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
