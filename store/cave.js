import cloneDeep from "lodash/cloneDeep"
import { firestore, timestamp } from "@/services/fireinit.js"

export const state = () => ({
  newCardTitle: null,
  newCardText: null,
  caveList: [],
  isInitialized: false
})

export const mutations = {
  updateCaveList(state, appendix) {
    state.caveList = [...state.caveList, ...appendix]
  },
  updateCaveCard(state, newCard) {
    const oldCardIndex = state.caveList.findIndex(
      card => card.id === newCard.id
    )
    const oldState = state.caveList
    oldState[oldCardIndex] = newCard
    // state.caveList = oldState
    state.caveList = [...oldState]
  },
  setCaveList(state, newList) {
    state.caveList = [...newList]
  },
  setNewCardTitle(state, newValue) {
    state.newCardTitle = newValue
  },
  setNewCardText(state, newValue) {
    state.newCardText = newValue
  },
  setInitialized(state, value) {
    state.isInitialized = value
  },
  removeFromCaveList(state, payload) {
    const oldValue = cloneDeep(state.caveList)
    const removingCardIndex = oldValue.findIndex(card => card.id === payload.id)
    oldValue.splice(removingCardIndex, 1)
    state.caveList = oldValue
  }
}

export const actions = {
  // updateCaveListAsync({ commit, getters, rootState }, payload) {
  updateCaveListAsync({ commit }, payload) {
    payload[0].createdAt = new timestamp.fromDate(new Date())
    firestore
      .collection("posts")
      .add(payload[0])
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id)
        payload[0].id = docRef.id
        commit("updateCaveList", payload)
      })
      .catch(function(error) {
        console.error("Error adding document: ", error)
      })
  },
  updateCaveCardAsync({ commit }, payload) {
    commit("updateCaveCard", payload)
  },
  setCaveListAsync({ commit }, payload) {
    commit("setCaveList", payload)
  },
  removeFromCaveListAsync({ commit, state }, payload) {
    const tmp = state.caveList[payload]
    commit("removeFromCaveList", payload)
    firestore
      .collection("posts")
      .doc(payload.id)
      .delete()
      .catch(() => {
        // TODO add tmp back to list and show error message
        let caveListClone = cloneDeep(state.caveList)
        caveListClone.splice(payload, 0, tmp)
        commit("setCaveList", caveListClone)
      })
    // TODO send id to server and wait until success will be catched
  },
  initFetch({ commit, rootGetters, state }) {
    if (!state.isInitialized) {
      firestore
        .collection("posts")
        .where("author_id", "==", rootGetters["user/userId"])
        // .orderBy("owner")
        // .where("text", "==", "test")
        .get()
        .then(querySnapshot => {
          const list = []
          if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
              const data = doc.data()
              data.id = doc.id
              list.push(data)
            })
            commit("setCaveList", list)
            commit("setInitialized", true)
          }

          // store.commit("waterfall/setLoading", false)
        })
    }
  }
}

export const getters = {
  tags: state => desired_id => {
    const card = state.caveList.find(card => card.id === desired_id)
    return (card && card.tags) || null
  }
}
