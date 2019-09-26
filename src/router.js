import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Canvas from './views/Canvas.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',  //去掉这句话 就是哈希模式啦！
  routes: [
    {
      path: '/',
      name: 'canvas',
      component: Canvas
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
