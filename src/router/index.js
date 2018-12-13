import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
    { path: '/Login', meta: { title: '欢迎页' }, name: 'Login', component: () => import('@views/Login.vue') },
    {
      path: '/', redirect: 'Animation', meta: { title: 'Main' }, name: 'Main', component: () => import('@views/Main.vue'), children: [
        { path: '/Animation', meta: { title: '欢迎页' }, name: 'Animation', component: () => import('@views/Animation/Animation.vue') },
      ]
    },
    { path: '/AnimationForCss3', meta: { title: 'AnimationForCss3' }, name: 'AnimationForCss3', component: () => import('@views/Animation/AnimationForCss3.vue') },

  ]
})
