import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: () => import(/* webpackChunkName: "user" */ '../views/NotFoundView.vue')
  },
  {
    path: '/invoicing',
    name: 'invoicing',
    component: () => import(/* webpackChunkName: "user" */ '../views/InvoicingView.vue')
  },
  {
    path: '/production',
    name: 'production',
    component: () => import(/* webpackChunkName: "user" */ '../views/ProductionView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "group" */ '../views/GroupView.vue')
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
    path: '/article',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/ArticleView.vue')
  },
  {
    path: '/orderOfOperation',
    name: 'orderOfOperation',
    component: () => import(/* webpackChunkName: "orderOfOperation" */ '../views/OrderOfOperationView.vue')
  },
  {
    path: '/programing',
    name: 'programing',
    component: () => import(/* webpackChunkName: "programing" */ '../views/ProgramingView.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue')
  },
  {
    path: '/configurations',
    name: 'configurations',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/ConfigurationView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
