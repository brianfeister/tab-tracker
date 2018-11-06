import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: window.localStorage.getItem('lgToken') || null,
    user: window.localStorage.getItem('lgLastUser') || null,
    isUserLoggedIn: !!window.localStorage.getItem('lgToken'),
  },
  mutations: {
    setToken (state, token) {
      window.localStorage.setItem('lgToken', token || '')
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      window.localStorage.setItem('lgLastUser', user || '')
      state.user = user
    },
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
  }
})