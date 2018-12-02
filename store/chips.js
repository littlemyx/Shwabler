const { colors } = require("../assets/data/colors.json")

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

export const getters = {
  items: state => {
    return state.chipsList.map(chip => ({
      text: chip,
      color: colors[chip.charCodeAt(0) % colors.length]
    }))
  },
  model: (state, getters) => chips => {
    return getters.items.filter(chip => chips.includes(chip.text))
  }
}
