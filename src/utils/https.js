/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // return response
    switch (response.data.code) {
      case 1000 :
        return response.data
      case 1200 :
        window.localStorage.removeItem('token')

        // 只有在当前路由不是登录页面才跳转
        router.currentRoute.path !== 'login' &&
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.path }
        })
        break
    }
    if (response.data.code !== 1000) {
      Message.error(response.data.message)
      return response.data
    }
  },
  error => {
    if (error.response) {
      Message.error(error.response.data)
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)

export default axios
