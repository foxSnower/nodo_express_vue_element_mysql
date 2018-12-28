import is from 'is-js';
import Vue from 'vue';
// 设置本地址存储
const utils = {
  setLocalStorage: (name, value) => {
    if (!name || !value) {
      console.log('params is invalid!')
    }
    if (is.object(value)) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(name, value)
  },
  getLocalStorage: (name) => {
    if (!name) {
      console.log('param is empty!')
    }
    try {
      return JSON.parse(localStorage.getItem(name))
    } catch (err) {
      return localStorage.getItem(name)
    }
  },
  delLocalStorage: (name) => {
    if (!name) {
      console.log('param is empty!')
    }
    localStorage.removeItem(name)
  },
  //16进制转10进制
  toParse16: (val) => {
    if (val != null) {
      return parseInt(val, 16);
    } else {
      return val;
    }
  },
  //10进制转16进制
  toParse10: (val) => {
    if (val != null) {
      let zero = '';
      val = val.toString(16);
      if (val.length != 6) {
        for (let i = 0; i < 6 - val.length; i++) {
          zero += '0';
        }
      }
      return zero + val.toString(16)
    } else {
      return val;
    }
  },
  theme: (val) => {
    let theme = utils.toParse16(val.split('#')[1]);
    let lightColor = '#' + utils.toParse10(theme + 4264434);
    let deepColor = '#' + utils.toParse10(theme - 3889035);
    return {
      theme:val,
      lightColor,
      deepColor
    };
  }
}
Vue.prototype.$U = utils;

export default utils
