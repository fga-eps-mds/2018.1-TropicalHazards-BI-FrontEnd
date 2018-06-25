/* eslint-disable */
import User from './User.js'
import Vue from 'vue'
import JwtDecode from 'jwt-decode'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE = 'UPDATE'
const REGISTER = 'REGISTER'
const SET_USERS = 'SET_USERS'


const state = {
  user: User.from(localStorage.token),
//   user: state.user,
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
  },
  [REGISTER](state, payload){
    state.user = payload
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
            localStorage.token = response.data.token
            resolve()
        },
          error => {
              reject("Usuário e senha não existem no nosso banco de dados")
          })
      })
    },
    logout ({ commit }, user ) {
        return new Promise((resolve, reject) => {
            Vue.http.post("rest-auth/logout/", { headers: { "content-type": "application/json", "Authorization": "JWT " + localStorage.token } }).then(response => {
                commit(LOGOUT)
                delete localStorage.token
                resolve ()
            },
            error => {
                commit(LOGOUT)
                delete localStorage.token
                reject ()
            })
        })
    },
    register ({ commit }, user){
      return new Promise((resolve, reject) => {
          Vue.http.post("users/", user, { headers: { "content-type": "application/json" } }).then(response => {
            commit(REGISTER)
            resolve(response)
          },
          error => {
              reject(error)
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
    },
    refreshToken({ commit }) {
        const payload = {
            token: localStorage.token
        }

        Vue.http.post("refresh-token/", payload)
            .then((response) => {
                localStorage.token = response.data.token
                commit(UPDATE)
            })
            .catch((error) => {
                this.dispatch("logout")
            })
    },
    inspectToken({ commit }) {
        const token = localStorage.token;
        if (token) {
            const decoded = JwtDecode(token);
            const exp = decoded.exp
            const orig_iat = decoded.orig_iat

            // const lifespan = 1800  token lifespan remaining to update = lifespan - desired time to update
            const expiring = 900 // time frame desired to prompt token to udpate( 15 mins)

            if (exp - (Date.now() / 1000) < expiring ) { //
                this.dispatch("refreshToken")
            }else if(exp - (Date.now() / 1000) < 0) {
                this.dispatch("logout")
                // Prompt user to relogin
            }
        }
    }

}

export default {

    user () {
        return this.state.user
    },
    check() {
        if (this.state.user == null){
            return false
        }
        return true
    },
  name: 'auth',
  state,
  mutations,
  getters,
  actions
}
