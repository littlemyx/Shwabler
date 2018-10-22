export default function({ store }) {
  const list = require("../assets/data/caveList.json")
  store.commit("cave/setCaveList", list)
  const waterfall = require("../assets/data/posts.json")
  store.commit("waterfall/updateCardList", waterfall)
  // store.commit('waterfall/updateCardList', waterfall);
  const userList = require("../assets/data/userList.json")
  store.commit("userList/updateUserList", userList)

  const chips = require("../assets/data/chips.json")
  store.commit("chips/updateChipsList", chips)
}
