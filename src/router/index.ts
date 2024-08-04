import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/CustomerView.vue')
  },
  {
    path: '/tear',
    name: 'tear',
    component: () => import(/* webpackChunkName: "tear" */ '../views/TearView.vue')
  },
  {
    path: '/operator',
    name: 'operator',
    component: () => import(/* webpackChunkName: "operator" */ '../views/OperatorView.vue')
  },
  {
    path: '/wire',
    name: 'wire',
    component: () => import(/* webpackChunkName: "wire" */ '../views/WireView.vue')
  },
  {
    path: '/orderOfOperation',
    name: 'orderOfOperation',
    component: () => import(/* webpackChunkName: "orderOfOperation" */ '../views/OrderOfOperation.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
