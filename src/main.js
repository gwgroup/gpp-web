import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Breadcrumb from './components/Comment/Breadcrumb.vue'
import './plugins/element.js'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.component('Breadcrumb', Breadcrumb)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
