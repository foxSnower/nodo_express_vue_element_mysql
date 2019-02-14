// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'font-awesome/css/font-awesome.min.css'

import store from './store'
import is from "is-js";

import '@/style/fonts/iconfont.css'
import '@/style/index.scss'
import G_ from './api/global.js'
import U_ from './utils'
import F_ from './utils/filters.js'
// import filters from './utils/filters.js'
import api from './api/api.js'



Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueCookie);

Vue.prototype.$is = is;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
