import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const openUrls = ['/login', '/register', '/register-result', '/forgetPassword']

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
    }, {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import(/* webpackChunkName: "about" */ './views/ForgetPassword.vue'),
      meta: { name: 'forgetPassword' }
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
      }, {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        meta: { path: '首页/about', name: 'about' }
      }, {
        path: '/redPackageList',
        name: 'redPackageList',
        component: () => import(/* webpackChunkName: "about" */ './views/RedPackageList.vue'),
        meta: { path: '首页/红包管理/红包列表', name: 'redPackageList' }
      }, {
        path: '/payHistory',
        name: 'payHistory',
        component: () => import(/* webpackChunkName: "about" */ './views/PayHistory.vue'),
        meta: { path: '首页/充值管理/充值记录', name: 'payHistory' }
      }, {
        path: '/pay',
        name: 'pay',
        component: () => import(/* webpackChunkName: "about" */ './views/Pay.vue'),
        meta: { path: '首页/充值管理/账户充值', name: 'pay' }
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
