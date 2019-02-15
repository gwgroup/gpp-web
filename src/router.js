import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const openUrls = ['/login', '/register', '/register-result']

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/register-result',
      name: 'registerResult',
      component: () => import('./views/RegisterResult.vue')
    },
    {
      path: '/',
      name: 'app',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      redirect: {
        name: 'dashboard'
      },
      children: [{
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
        meta: { path: '首页', name: 'dashboard' }
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem('token')) {
    next()
  } else {
    if (openUrls.indexOf(to.path) !== -1) {
      next()
    } else {
      router.push({ path: 'login', query: { redirect: to.path } })
    }
  }
})

export default router
