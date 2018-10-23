export const state = () => ({
  chipsList: []
})

export const mutations = {
  updateChipsList(state, appendix) {
    state.chipsList = [...state.chipsList, ...appendix]
  }
}

export const actions = {
  addToChipsListAsync({ commit }, payload) {
    commit("updateChipsList", Array.isArray(payload) ? payload : [payload])
  }
}
