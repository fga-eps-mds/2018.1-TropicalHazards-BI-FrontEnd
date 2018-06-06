/* eslint-disable */
import User from './User.js'
import Vue from 'vue'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE = 'UPDATE'

const state = {
  user: User.from(localStorage.token)
}

const mutations = {
  [LOGIN] (state, payload) {
    state.user = User.from(payload)
  },
  [LOGOUT] (state) {
    state.user = null
  },
  [UPDATE] (state) {
    state.user = User.from(localStorage.token)
  }
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const actions = {
  login ({ commit },  user ) {
      return new Promise((resolve, reject) => {
          Vue.http.post("rest-auth/login/", user, { headers: { "content-type": "application/json" } }).then(response => {
              commit(LOGIN, response.data.token)
              resolve()
          },
          error => {
              reject()
          })
      })
    },
  logout ({ commit }) {
    commit(LOGOUT)
  },
  update ({ commit }) {
    commit(UPDATE)
  }
}

export default {
  name: 'auth',
  state,
  mutations,
  getters,
  actions
}
