import Vue from 'vue'
import axios from 'axios'
import http from './http.js'

const system = '';

const comAPI = (method, url, params) => {
  if (!params) { params = {} };
  switch (method) {
    case 'post':
      return http.post(url, params).then(res => {
        return res
      })
      break;
    case 'get':
      return http.get(url, { params }).then(res => {
        return res
      })
      break;
    case 'upload':
      http.headers = { 'Content-Type': 'multipart/form-data' };
      return http.post(url, params).then(res => {
        return res
      })
      break;
    case 'local':
      let loacalHttp = axios.create({
        baseURL: './static',
      })
      return loacalHttp.get(url, { params }).then(res => {
        return res.data
      })
      break;
    default:
      break;
  }

}

const api = {
  //登陆
  login(params) { return comAPI('post', system + '/login', params) },
  getToken(params) { return comAPI('get', system + '/getToken', params) },
  getMenu(params) { return comAPI('get', system + '/getMenu', params) },
  addTest(params) { return comAPI('post', system + '/test/addTest', params) },
  //animate
  getAnimate(params) { return comAPI('post', system + '/animate/getAnimate', params) },
  getAnimateType(params) { return comAPI('post', system + '/animate/getAnimateType', params) },
  getAnimateAll(params) { return comAPI('local', '/animation.json', params) },
  getAnimateJson(params) { return comAPI('local', '/animate.json', params) },
  editAnimate(params) { return comAPI('post', system + '/animate/editAnimate', params) },
  deleteAnimate(params) { return comAPI('post', system + '/animate/deleteAnimate', params) },
  //获取天气
  getWeather(params) { return comAPI('post', system + '/weather/getWeather', params) },
  getDailyWeather(params) { return comAPI('post', system + '/weather/getDailyWeather', params) },
  searchCity(params) { return comAPI('post', system + '/weather/searchCity', params) },
  //markdown
  getMarkdown(params) { return comAPI('post', system + '/markdown/getMarkdown', params) },
  editMarkdown(params) { return comAPI('post', system + '/markdown/editMarkdown', params) },
  delMarkdown(params) { return comAPI('post', system + '/markdown/delMarkdown', params) },
  uploadFile(params) { return comAPI('upload', system + '/upload', params) },
  //system
  getShop(params) { return comAPI('post', system + '/shop/getShop', params) },
  editShop(params) { return comAPI('post', system + '/shop/editShop', params) },
  delShop(params) { return comAPI('post', system + '/shop/delShop', params) },
  getSubAccount(params) { return comAPI('post', system + '/shop/getSubAccount', params) },
}

Vue.prototype.$http = http;
Vue.prototype.$api = api;
