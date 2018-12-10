// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import is from "is-js";
import 'element-ui/lib/theme-chalk/index.css'
// import '@/style/theme/element-81B0F1/index.css'
import '@/style/fonts/iconfont.css'
import '@/style/index.scss'
import global_ from './api/global.js'
// import filters from './utils/filters.js'
import api from './api/api.js'

Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.prototype.$is = is;

// 全局指令
// Vue.directive('drag', {
//   // 指令的定义
//   bind: function (el, binding) {
//     let oDiv = el; //当前元素
//     let self = this; //上下文
//     // console.log(binding.value);
//     oDiv.onmousedown = function (e) {
//       //鼠标按下，计算当前元素距离可视区的距离
//       let disX = e.clientX - oDiv.offsetLeft;
//       let disY = e.clientY - oDiv.offsetTop;

//       document.onmousemove = function (e) {
//         if (oDiv.offsetLeft < 0 || oDiv.offsetLeft > 300 || oDiv.offsetTop < 0 || oDiv.offsetTop > 300) {
//           oDiv.style.left = oDiv.offsetLeft < 0 ? 0 : oDiv.offsetLeft;
//           oDiv.style.left = oDiv.offsetLeft > 300 ? 300 + 'px' : oDiv.offsetLeft;
//           oDiv.style.top = oDiv.offsetTop < 0 ? 0 : oDiv.offsetTop;
//           oDiv.style.top = oDiv.offsetTop > 300 ? 300 + 'px' : oDiv.offsetTop;
//           disX = e.clientX - oDiv.offsetLeft;
//           disY = e.clientY - oDiv.offsetTop;
//         } else {
//           //通过事件委托，计算移动的距离
//           let l = e.clientX - disX;
//           let t = e.clientY - disY;
//           //移动当前元素
//           oDiv.style.left = l + 'px';
//           oDiv.style.top = t + 'px';
//           binding.value.left = l;
//           binding.value.top = t;
//         }
//       };
//       document.onmouseup = function (e) {

//         document.onmousemove = null;
//         document.onmouseup = null;
//       };
//     };

//   }
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
