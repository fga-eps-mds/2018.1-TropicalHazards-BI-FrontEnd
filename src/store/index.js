/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './Authentication/auth'
import projects from './Projects/Project'
import dashboards from './Dashboards/Dashboards'
import tags from './Tags/Tags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    projects,
    dashboards,
    tags
  }
})
