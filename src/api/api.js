import Vue from 'vue'
import http from './http.js'
import {
  Message
} from 'element-ui';

const SYSTEM = '/sims-service';
const CUSTOMER = '/crm-api-service';
const UPFILE = '/cmp/fms'; //上传附件
const TEST='http://172.16.202.214:33011'

const comAPI = (method, url, params) => {
  switch (method) {
    case 'post':
      return http.post(url, params).then(res => {
        if (res.returnCode == "0000" || res.code == 0 || res.code == "0000") {
          return res
        } else {
          // Message.error(res.codeDesc || res.msg)
          return res
        }
      })
      break;
    case 'get':
      return http.get(url, {
        params
      }).then(res => {
        if (res.returnCode == "0000" || res.code == 0 || res.code == "0000") {
          return res
        } else {
          // Message.error(res.codeDesc || res.msg)
          return res
        }
      })
      break;
    default:
      break;
  }

}

const api = {
  //登陆
  addUser(params) {
    return comAPI('post', '/user/addUser', params)
  },
}

Vue.prototype.$http = http;
Vue.prototype.$api = api;
