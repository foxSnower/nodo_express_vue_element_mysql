
import Vue from 'vue'

const DEV = 'http://localhost:8000';
const SIT = 'http://172.16.200.112:30111';
const UAT = 'http://47.106.46.65:30111';
const PRD = 'http://120.79.162.165:30111';

console.log("-----当前环境-------：" + process.env.NODE_ENV_BUILD);

let URL = eval(process.env.NODE_ENV_BUILD);

//默认进件管理系统
const global_ = {
  BASE_URL: URL,
  APP: 'FETRUE',
  TOKEN:'FETRUETOKEN',
  REFRESHTOKEN:'FETRUEREFRESHTOKEN',
  SYSTEM_NAME: '进件管理系统',
  SYSTEM_SHORT_NAME: 'SIMS',
  TOKENTIME:'3',
}

Vue.prototype.$GLOBAL = global_;


export default global_
