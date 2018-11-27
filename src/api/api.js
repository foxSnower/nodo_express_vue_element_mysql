import Vue from 'vue'
import http from './http.js'

const system = Vue.prototype.$GLOBAL.BASE_URL + '/api';
const local = './static'

const comAPI = (method, url, params) => {
  switch (method) {
    case 'post':
      return http.post(url, params).then(res => {
        return res
      })
      break;
    case 'get':
      return http.get(url, {params}).then(res => {
        return res
      })
      break;
    default:
      break;
  }

}

const api = {
  //登陆
  addUser(params) {return comAPI('post', system + '/user/addUser', params)},
  addTest(params) {return comAPI('post', system + '/test/addTest', params)},
  //animate
  getAnimate(params) {return comAPI('post', system + '/animate/getAnimate', params)},
  getAnimateType(params) {return comAPI('post', system + '/animate/getAnimateType', params)},
  getAnimateAll(params) {return comAPI('post', system + '/animate/getAnimateAll', params)},
  getAnimateJson(params) {return comAPI('get', local + '/animate.json', params)},
  addAnimate(params) {return comAPI('post', system + '/animate/addAnimate', params)},
}

Vue.prototype.$http = http;
Vue.prototype.$api = api;
