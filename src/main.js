// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue"
import App from "./App"
import VueResource from "vue-resource"
import Vuelidate from "vuelidate"

import router from "./router"
import store from "./store"
import VModal from "vue-js-modal"

import "./../node_modules/jquery/dist/jquery.min.js"
import "./../node_modules/materialize-css/dist/css/materialize.min.css"
import "./../node_modules/materialize-css/dist/js/materialize.min.js"

Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(VModal, { dialog: true, dynamic: true })
Vue.config.productionTip = false

var backend_url

if (process.env.BACKEND_URL) {
    backend_url = process.env.BACKEND_URL
} 
else {
    backend_url = "http://localhost:8000"
}

Vue.http.options.root = backend_url 

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>",
    store
})
