/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './Authentication/auth'
import projects from './Projects/ProjectModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    projects
  }
})
