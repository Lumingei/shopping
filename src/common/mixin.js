import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('全局混入')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isTrue: false
    }
  },
  methods: {
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: 'pop'
    }
  },
  methods: {
    tabClick(index) {
      if (index === 0) {
        this.currentType = 'pop';
      } else if (index === 1) {
        this.currentType = 'new'
      } else if (index === 2) {
        this.currentType = 'sell'
      }
    }
  }
}
