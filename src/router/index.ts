import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: () => import(/* webpackChunkName: "user" */ '../views/NotFoundView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '../views/LoginView.vue')
  },
  {
    path: '/servererror',
    name: 'servererror',
    component: () => import(/* webpackChunkName: "user" */ '../views/ServerErrorView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/invoicing',
    name: 'invoicing',
    component: () => import(/* webpackChunkName: "user" */ '../views/InvoicingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/production',
    name: 'production',
    component: () => import(/* webpackChunkName: "user" */ '../views/ProductionView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "group" */ '../views/GroupView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/CustomerView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tear',
    name: 'tear',
    component: () => import(/* webpackChunkName: "tear" */ '../views/TearView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/operator',
    name: 'operator',
    component: () => import(/* webpackChunkName: "operator" */ '../views/OperatorView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wire',
    name: 'wire',
    component: () => import(/* webpackChunkName: "wire" */ '../views/WireView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/ArticleView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orderOfOperation',
    name: 'orderOfOperation',
    component: () => import(/* webpackChunkName: "orderOfOperation" */ '../views/OrderOfOperationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/programing',
    name: 'programing',
    component: () => import(/* webpackChunkName: "programing" */ '../views/ProgramingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/configurations',
    name: 'configurations',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/ConfigurationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/ReportsView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!token) {
      next({ name: 'login' })
    } else {
      next()  
    }
  } else {
    next()
  }
})

export default router
