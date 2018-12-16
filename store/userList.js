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
  },
  updateCardMessageList(state, newMessage) {
    const oldCardIndex = state.userList.findIndex(
      card => card.id === newMessage.id
    )
    state.userList[oldCardIndex].messages = [
      ...state.userList[oldCardIndex].messages,
      { author: newMessage.author, text: newMessage.text }
    ]
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
  },
  updateCardMessageListAsync({ commit }, payload) {
    commit("updateCardMessageList", payload)
  }
}
