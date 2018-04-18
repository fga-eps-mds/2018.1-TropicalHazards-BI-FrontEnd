// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
import materialize from '../node_modules/materialize-css/dist/css/materialize.css'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueResource)
Vue.use(materialize)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
