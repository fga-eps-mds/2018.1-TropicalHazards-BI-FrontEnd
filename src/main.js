// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'

import './../node_modules/jquery/dist/jquery.min.js'
import './../node_modules/materialize-css/dist/css/materialize.min.css'
import './../node_modules/materialize-css/dist/js/materialize.min.js'

Vue.use(VueResource)
Vue.config.productionTip = false


Vue.http.options.root = 'http://localhost:8000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
