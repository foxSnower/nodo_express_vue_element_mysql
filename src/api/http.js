import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'

const http = axios.create({
  timeout: 1000 * 5,
  baseURL: Vue.prototype.$GLOBAL.BASE_URL + '/api',
  headers: {
    // 'app': Vue.prototype.$GLOBAL.APP,
    // 'X-Forwarded-For': '127.0.0.1',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

const cookieToken = Vue.prototype.$GLOBAL.TOKEN;
const cookieRefreshToken = Vue.prototype.$GLOBAL.REFRESHTOKEN;
const tokenTime = Vue.prototype.$GLOBAL.TOKENTIME;

// /**
//  * 清空 cookie
//  */
const clearToken = () => {
  Vue.cookie.delete(cookieToken);
  Vue.cookie.delete(cookieRefreshToken);
}

/**
 * 获取 token
 */
const getToken = async () => {
  // 从cookie中获取token
  let token = Vue.cookie.get(cookieToken);
  // 如果token失效，则重新获取
  if (!token) {
    return await http.get('/getToken').then(res => {
      if (res.code == '0') {
        // 重置token
        Vue.cookie.set(cookieToken, res.data, { expires: tokenTime / 2 + 'm' });
        Vue.cookie.set(cookieRefreshToken, res.data, { expires: tokenTime + 'm' });
        return  res.data
      } else {
        // 清空cookie
        clearToken()
        // 跳转到登录页
        router.push('/login')
        Message.error('token失效，请重新登录 !')
      }
    }).catch(err => {
      // 清空cookie
      clearToken()
      // 跳转到登录页
      router.push('/login')
      Message.error('token失效，请重新登录 !')
    })
  } 
   return token
}

/**
 * 请求拦截
 */
http.interceptors.request.use(async request => {
  // 如果是登录是不需要任何Authorization的   
  if ('/login' === request.url) {
    return request
    // 如果是重新获取token，则Authorization需要设置为refreshToken
  } else if ('/getToken' === request.url) {
    let token = Vue.cookie.get(cookieRefreshToken);
    if (!token) {
      clearToken();
      router.push('/login');
      Message.error('token失效，请重新登录 !')
      return Promise.reject({})
    } else {
      request.headers['Authorization'] = token
      return request
    }
    // 其余API的Authorization全部使用token
  } else {
    // var token = Vue.cookie.get(Vue.prototype.$GLOBAL.TOKEN);
    var token = await getToken();
    request.headers['Authorization'] = token
    return request;
  }
}, err => {
  return Promise.reject(err)
})

// /**
//  * 响应拦截
//  */
http.interceptors.response.use(res => {
  if (res.data.code) {
    if (res.data.code === '0') {
      return res.data
    } else {
      Message.error(res.data.msg);
      return Promise.reject(res.data.err_code)
    }
  } else {
    return res.data
  }
}, err => {
  let response = err.response;
  if (response) {
    let status = response.status;
    if (status === 500) {
      Message.error('服务器正在维护,请稍后在试')
    } else {
      Message.error(String(status))
    }
  } else {
    if (err.message && err.message.indexOf('timeout') != -1) {
      Message.error('请求超时')
    } else {
      if (err.message) {
        Message.error(err.message)
      }
    }

  }
  return Promise.reject(err)
})

export default http
