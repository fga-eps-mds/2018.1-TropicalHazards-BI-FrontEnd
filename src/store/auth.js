import User from './User.js'
import * as MutationTypes from './MutationTypes'

const state = {
  user: User.from(localStorage.token)
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = User.from(localStorage.token)
  },
  [MutationTypes.LOGOUT] (state) {
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
    commit(MutationTypes.LOGIN)
  },

  logout ({ commit }) {
    commit(MutationTypes.LOGOUT)
  }
}

export default {
  name: 'auth',
  state,
  mutations,
  getters,
  actions
}
