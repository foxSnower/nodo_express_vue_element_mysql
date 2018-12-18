// 跳转UC修改密码的地址：
// Dev：
// http://172.16.200.110:30131/html/user/changePwdOther.html
// Sit
// http://172.16.200.112:30131/html/user/changePwdOther.html
// UAT：
// http://120.79.154.198:30131/html/user/changePwdOther.html
// PRD：
// http://120.79.162.165:30131/html/user/changePwdOther.html

import Vue from 'vue'

const DEV = 'http://192.168.13.56:8000';
const SIT = 'http://172.16.200.112:30111';
const UAT = 'http://47.106.46.65:30111';
const PRD = 'http://120.79.162.165:30111';

console.log("-----当前环境-------：" + process.env.NODE_ENV_BUILD);

let URL = eval(process.env.NODE_ENV_BUILD);

//默认进件管理系统
const global_ = {
  BASE_URL: URL,
  APP: 'SIMS',
  SYSTEM_NAME: '进件管理系统',
  SYSTEM_SHORT_NAME: 'SIMS',
  TOKENTIME:'120',
  //修改密码的地址
  CHANGE_PASSWORD_URL: URL.substr(0, URL.lastIndexOf(":")) + ':30131/html/user/changePwdOther.html?token='
}

Vue.prototype.$GLOBAL = global_;


export default global_
