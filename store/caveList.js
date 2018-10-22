export const state = () => ({
  caveList: []
})

export const mutations = {
  updateCaveList(state, newList) {
    state.caveList = [...newList]
  }
}
