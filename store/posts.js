export const state = () => ({
  firstCard: true,
  cardList: []
})

export const mutations = {
  changeCard (state) {
    state.firstCard = !state.firstCard;
  },
  updateCardList (state, newList) {
    state.cardList = [...newList];
  }
}
