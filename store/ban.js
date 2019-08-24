import { firestore, fieldvalue } from "@/services/fireinit.js"

const firebaseRef = firestore.collection("banned")

export const state = () => ({
  list: [],
  isInitialized: false
})

export const mutations = {
  resetStore(state) {
    state.list = []
  },
  setList(state, payload) {
    state.list = payload
  },
  addToList(state, payload) {
    state.list = [...state.list, payload.id]
  },
  removeFromList(state, payload) {
    const indexToDelete = state.list.findIndex(item => item.id === payload.id)
    if (indexToDelete !== -1) {
      const tmp = [...state.list]
      tmp.list.splice(indexToDelete, 1)
      state.list = tmp
    }
  },
  setInitialized(state, payload) {
    state.initialized = payload
  }
}

export const actions = {
  fetchBanned({ commit, rootGetters }) {
    return new Promise(resolve => {
      firebaseRef
        .doc(rootGetters["user/userId"])
        .get()
        .then(querySnapshot => {
          let list = []
          if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
              const data = doc.data()
              list = [...list, ...data.banned]
            })
          }
          if (list.length) {
            commit("setList", list)
          }
        })
        .catch(error => {
          console.log(error)
        }).finally
    })
  },
  updateList({ commit, rootGetters }, payload) {
    commit("addToList", payload)
    firebaseRef
      .doc(rootGetters["user/userId"])
      .update({
        banned: fieldvalue.arrayUnion(payload.id)
      })
      .then(() => {
        console.log("banned updated")
      })
      .catch(error => {
        console.log(error)
      })
  },
  initFetch({ dispatch, commit, state }) {
    return new Promise(resolve => {
      if (!state.isInitialized) {
        dispatch("fetchBanned").then(() => {
          resolve()
        })
        commit("setInitialized", true)
      } else {
        resolve()
      }
    })
  }
}

export const getters = {
  list: state => state.list
}
