import { auth, GoogleProvider } from "@/services/fireinit.js"

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    console.log("mutation user/setUser")
    state.user = JSON.parse(JSON.stringify(payload))
  }
}

export const getters = {
  activeUser(state) {
    console.log("activeUser")
    return state.user && state.user.email
  },
  userId(state) {
    return state.user && state.user.l
  }
}

export const actions = {
  autoSignIn({ commit }, payload) {
    commit("setUser", payload)
  },

  signInWithGoogle() {
    return new Promise(resolve => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },

  signOut({ commit }) {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          commit("setUser", null)
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  setUser({ commit }, payload) {
    console.log("action user/setUser")
    commit("setUser", payload)
  }
}
