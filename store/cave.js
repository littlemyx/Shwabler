import cloneDeep from "lodash/cloneDeep"

export const state = () => ({
  newCardTitle: null,
  newCardText: null,
  caveList: []
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
  removeFromCaveList(state, id) {
    const oldValue = cloneDeep(state.caveList)
    const removingCardIndex = oldValue.findIndex(card => card.id === id)
    oldValue.splice(removingCardIndex, 1)
    state.caveList = oldValue
  }
}

export const actions = {
  addToCaveListAsync({ commit }, payload) {
    commit("updateCaveList", payload)
  },
  updateCaveCardAsync({ commit }, payload) {
    commit("updateCaveCard", payload)
  },
  setCaveListAsync({ commit }, payload) {
    commit("setCaveList", payload)
  },
  removeFromCaveListAsync({ commit, state }, payload) {
    const tmp = state.caveList[payload]
    let success = true
    commit("removeFromCaveList", payload)
    // TODO send id to server and wait until success will be catched
    if (!success) {
      // TODO add tmp back to list and show error message
      let caveListClone = cloneDeep(state.caveList)
      caveListClone.splice(payload, 0, tmp)
      commit("setCaveList", caveListClone)
    }
  }
}

export const getters = {
  tags: state => desired_id => {
    const card = state.caveList.find(card => card.id === desired_id)
    return (card && card.tags) || null
  }
}
