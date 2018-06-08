/* eslint-disable */
import User from './User.js'
import Vue from 'vue'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE = 'UPDATE'
const REGISTER = 'REGISTER'
const SET_USERS = 'SET_USERS'


const state = {
  user: User.from(localStorage.token),
  users: []
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
  },
  [SET_USERS](state, payload) {
    // Vue.set(state, projects, payload) - EVENTO PARA GERAR REATIVIDADE MAYBE
    state.users = payload
  }
}

const getters = {
  currentUser (state) {
    return state.user
  },
  getUsersLength: state =>{
    return state.users.length
  },
  getUsers: state => {
    return state.users
    },
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
    register ({ commit }, user){
      return new Promise((resolve, reject) => {
          Vue.http.post("users/", user, { headers: { "content-type": "application/json" } }).then(response => {
              resolve()
          },
          error => {
              reject()
          })
      })
  },
    update ({ commit }) {
        commit(UPDATE)
  },

    loadUsers({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get("users/", { headers: { "content-type": "application/json" } }).then(response => {
                commit(SET_USERS, response.data)
                resolve()
            },
                error => {
                    reject()
                })
        })
    }

}

export default {
  name: 'auth',
  state,
  mutations,
  getters,
  actions
}
