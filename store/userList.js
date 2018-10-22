export const state = () => ({
  firstCard: true,
  userList: []
})

export const mutations = {
  changeCard(state) {
    state.firstCard = !state.firstCard
  },
  updateUserList(state, newList) {
    state.userList = [...state.userList, ...newList]
  }
}

export const actions = {
  updateUserListAsync({ commit }, payload) {
    let OKstate = true
    // sending data to server & set OKstate to false if error
    if (OKstate) {
      commit("updateUserList", payload)
    } else {
      // revert adding data to store
    }
  }
}
