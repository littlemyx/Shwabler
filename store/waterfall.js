export const state = () => ({
  isFirstCardVisible: true,
  cardList: [],
  index: 0,
  firstCard: null,
  secondCard: null,
  isEnd: false
})

export const mutations = {
  changeCard (state) {
    state.firstCard = !state.firstCard;
  },
  updateCardList (state, newList) {
    state.cardList = [...newList];
  },
  increaseIndex (state) {
    state.index++;
  },
  setEnd (state, value) {
    state.isEnd = value;
  }
}

export const actions = {
  increaseIndex ({ commit, state }, payload) {
    const newIndex = state.index + 1;
    if (newIndex === 10) {
      // load next pack of cards and set index to 0
      commit('setEnd', true);
    }
    commit('increaseIndex');
  },
  uploadCardToServer ({ commit, state, dispatch }) {
    dispatch('increaseIndex', null);
  }
}

export const getters = {
  nextCard: state => {
    return state.cardList[state.index];
  }
}
