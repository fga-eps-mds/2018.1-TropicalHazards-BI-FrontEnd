import User from './User.js'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const state = {
  user: User.from(localStorage.token)
}

const mutations = {
  [LOGIN] (state) {
    state.user = User.from(localStorage.token)
  },
  [LOGOUT] (state) {
    state.user = null
  }
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const actions = {
  login ({ commit }) {
    commit(LOGIN)
  },

  logout ({ commit }) {
    commit(LOGOUT)
  }
}

export default {
  name: 'auth',
  state,
  mutations,
  getters,
  actions
}
