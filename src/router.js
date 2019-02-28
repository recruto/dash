import firebase from '@/plugins/firebase'
import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Companies from './views/Companies.vue'
import Company from './views/Company.vue'
import NewCompany from './views/NewCompany.vue'
import Position from './views/Position.vue'
import NewPosition from './views/NewPosition.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (firebase.auth().currentUser) { next(to.query.redirect) }
        next()
      }
    },
    {
      path: '/',
      name: 'companies',
      component: Companies,
      meta: { requiresAuth: true }
    },
    {
      path: '/new',
      name: 'new-company',
      component: NewCompany,
      meta: { requiresAuth: true }
    },
    {
      path: '/:companyId',
      name: 'company',
      component: Company,
      meta: { requiresAuth: true }
    },
    {
      path: '/:companyId',
      name: 'positions',
      meta: { requiresAuth: true }
    },
    {
      path: '/:companyId/new',
      name: 'new-position',
      component: NewPosition,
      meta: { requiresAuth: true }
    },
    {
      path: '/:companyId/:positionId',
      name: 'position',
      component: Position,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !firebase.auth().currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
