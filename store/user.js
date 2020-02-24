import { auth, GoogleProvider } from "@/services/fireinit.js"

export const state = () => ({
  user: null,
  isEmailVerified: false
})

export const mutations = {
  resetStore(state) {
    state.user = null
    state.isEmailVerified = false
  },
  setUser(state, payload) {
    // console.log("mutation user/setUser")
    // name = user.displayName
    // email = user.email
    // photoUrl = user.photoURL
    // emailVerified = user.emailVerified
    // uid = user.uid
    state.user = JSON.parse(JSON.stringify(payload))
  },
  setEmailVerified(state, payload) {
    state.isEmailVerified = payload
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
    // console.log("action user/setUser")
    commit("setUser", payload)
  }
}

export const getters = {
  activeUser(state) {
    // console.log("activeUser")
    return state.user && state.user.email
  },
  userId(state) {
    return state.user && state.user.uid
  },
  isUserExist(state) {
    return !!state.user
  },
  isUserNeedVerification(state) {
    return state.user.providerData.some(provider => {
      // console.log(provider.providerId)
      return provider.providerId === "password"
    })
  }
}
