import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomerView.vue')
  },
  {
    path: '/tear',
    name: 'tear',
    component: () => import(/* webpackChunkName: "about" */ '../views/TearView.vue')
  },
  {
    path: '/operator',
    name: 'operator',
    component: () => import(/* webpackChunkName: "about" */ '../views/OperatorView.vue')
  },
  {
    path: '/wire',
    name: 'wire',
    component: () => import(/* webpackChunkName: "about" */ '../views/WireView.vue')
  },
  {
    path: '/orderOfOperation',
    name: 'orderOfOperation',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderOfOperation.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
