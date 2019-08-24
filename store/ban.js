import { firestore, fieldvalue } from "@/services/fireinit.js"

const firebaseRef = firestore.collection("banned")

const LIMIT = 3

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
        .then(doc => {
          const { banned: data } = doc.data()
          let list = []
          if (data.length) {
            data.forEach(card => {
              list = [...list, card]
            })
          }
          if (list.length) {
            commit("setList", list)
          }
          resolve()
        })

        .catch(error => {
          console.log(error)
          resolve()
        })
    })
  },
  updateList({ state, commit, rootGetters }, payload) {
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
    if (state.list.length > LIMIT) {
      const newList = state.list
      newList.splice(0, 1)
      commit("setList", newList)
      firebaseRef.doc(rootGetters["user/userId"]).set({ banned: newList }) //переделать на фбшные функции
    }
  },
  addNewUser({ rootGetters }) {
    firebaseRef.doc(rootGetters["user/userId"]).set({ banned: [] })
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
