import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/AboutView.vue')
  },
  {
    path: '/appName-one/:page*',
    name: 'appName-one',
    component: () => import(/* webpackChunkName: 'vue2' */ '../pages/vue2.vue')
  },
  {
    path: '/studentList/:page*',
    name: 'studentList',
    component: () => import(/* webpackChunkName: 'studentList' */ '../pages/studentList.vue')
  },
  {
    path: '/otherList/:page*',
    name: 'otherList',
    component: () => import(/* webpackChunkName: 'otherList' */ '../pages/otherList.vue')
  },
  // 匹配  不符合路由规则的路径
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: 'notFound' */ '../pages/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
