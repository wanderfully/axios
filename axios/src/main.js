// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import { install as axios } from './api/install'
import store from './store.js'


Vue.config.productionTip = false
Vue.use(axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
