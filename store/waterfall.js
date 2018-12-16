export const state = () => ({
  isFirstCardVisible: true,
  cardList: [],
  index: 0,
  firstCard: null,
  secondCard: null,
  isEnd: false,
  isLoading: true
})

export const mutations = {
  changeCard(state) {
    state.firstCard = !state.firstCard
  },
  updateCardList(state, newList) {
    state.cardList = [...newList]
  },
  increaseIndex(state) {
    state.index++
  },
  setEnd(state, value) {
    state.isEnd = value
  },
  setLoading(state, value) {
    state.isLoading = value
  }
}

export const actions = {
  increaseIndex({ commit, state }) {
    const newIndex = state.index + 1
    if (state.cardList.length === newIndex) {
      // load next pack of cards and set index to 0
      commit("setEnd", true)
    }
    commit("increaseIndex")
  },
  uploadCardToServer({ dispatch }, payload) {
    dispatch("userList/updateUserListAsync", [payload], { root: "userList" })
    dispatch("increaseIndex", null)
  }
}

export const getters = {
  nextCard: state => {
    return state.cardList[state.index]
  }
}
