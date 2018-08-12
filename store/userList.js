export const state = () => ({
  firstCard: true,
  userList: []
})

export const mutations = {
  changeCard (state) {
    state.firstCard = !state.firstCard;
  },
  updateUserList (state, newList) {
    state.userList = [...newList];
  }
}
