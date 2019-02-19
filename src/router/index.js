import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/HelloWorld', name: 'HelloWorld', component: HelloWorld },
    { path: '/Login', meta: { title: '欢迎页' }, name: 'Login', component: () => import('@views/Login.vue') },
    {
      path: '/', redirect: 'Markdown', meta: { title: 'Main' }, name: 'Main', component: () => import('@views/Main.vue'), children: [
        { path: '/Animation', meta: { title: 'CSS3 Animation' }, name: 'Animation', component: () => import('@views/Animation/Animation.vue') },
        { path: '/Markdown', meta: { title: 'Markdown' }, name: 'Markdown', component: () => import('@views/Markdown/Markdown.vue') },
        { path: '/SuDu', meta: { title: 'SuDu' }, name: 'SuDu', component: () => import('@views/SuDu/SuDu.vue') },
        { path: '/Index', redirect: 'Welcome', meta: { title: 'Index' }, name: 'Index', component: () => import('@views/System/Index.vue'), children: [
          { path: '/Welcome', meta: { title: 'Welcome' }, name: 'Welcome', component: () => import('@views/System/Welcome.vue') },
          { path: '/Goods/GoodsList', meta: { title: 'GoodsList' }, name: 'GoodsList', component: () => import('@views/System/Goods/GoodsList.vue') },
          { path: '/Users/UsersList', meta: { title: 'UsersList' }, name: 'UsersList', component: () => import('@views/System/Users/UsersList.vue') },
          { path: '/Setting/ModifyPassword', meta: { title: 'ModifyPassword' }, name: 'ModifyPassword', component: () => import('@views/Setting/ModifyPassword.vue') },
          ...generateRoutesFromMenu()
        ] },
      ]
    },
    { path: '/AnimationForCss3', meta: { title: 'AnimationForCss3' }, name: 'AnimationForCss3', component: () => import('@views/Animation/AnimationForCss3.vue') },

  ]
})

function generateRoutesFromMenu(menuList = [], routes = []) {
  if(menuList){
    function forMenuList(menus) {
      menus.forEach(x => {
        if (x.children.length === 0) {
           let urlArray = x.url.split('/');
           let name = urlArray[urlArray.length-1];
           routes.push({
             path:'/'+ x.url,
             name:name,
             meta: { title: x.title },
             component: () => import('@/views/' + x.url + '.vue') //将组件用require引进来
           })
        } else {
          forMenuList(x.children)
        }
      });
    }
    forMenuList(menuList);
  }
  return routes
}

export default router