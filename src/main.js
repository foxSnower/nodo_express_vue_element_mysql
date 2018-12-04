// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import is from "is-js";
// import 'element-ui/lib/theme-chalk/index.css'
import '@/style/theme/element-EF8E6B/index.css'
import '@/style/fonts/iconfont.css'
import '@/style/index.scss'
import global_ from './api/global.js'
// import filters from './utils/filters.js'
import api from './api/api.js'

Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.prototype.$is = is;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
