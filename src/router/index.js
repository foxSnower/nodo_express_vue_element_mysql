import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
    { path: '/Login', meta: { title: '欢迎页' }, name: 'Login', component: () => import('@views/Login.vue') },
    {
      path: '/', redirect: 'Markdown', meta: { title: 'Main' }, name: 'Main', component: () => import('@views/Main.vue'), children: [
        { path: '/Animation', meta: { title: 'CSS3 Animation' }, name: 'Animation', component: () => import('@views/Animation/Animation.vue') },
        { path: '/Markdown', meta: { title: 'Markdown' }, name: 'Markdown', component: () => import('@views/Markdown/Markdown.vue') },
        { path: '/SuDu', meta: { title: 'SuDu' }, name: 'SuDu', component: () => import('@views/SuDu/SuDu.vue') },
      ]
    },
    { path: '/AnimationForCss3', meta: { title: 'AnimationForCss3' }, name: 'AnimationForCss3', component: () => import('@views/Animation/AnimationForCss3.vue') },

  ]
})
