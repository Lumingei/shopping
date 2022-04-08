import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "./store";

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.prototype.$bus = new Vue()
Vue.use(toast)

FastClick.attach(document.body)
Vue.use(VueLazyload, {
  error: require('./assets/img/common/load-fail.png'),
  loading: require('./assets/img/common/place-holder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
