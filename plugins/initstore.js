import { firestore } from "@/services/fireinit.js"

export default function({ store }) {
  firestore
    .collection("posts")
    // .where("owner", ">=", store.getters["user/activeUser"])
    // .where("owner", "<", store.getters["user/activeUser"])
    .orderBy("owner")
    // .where("text", "==", "test")
    .get()
    .then(querySnapshot => {
      const list = []
      if (querySnapshot.docs.length) {
        querySnapshot.forEach(doc => {
          const data = doc.data()
          console.log(`${doc.id} => ${data}`)
          if (data.owner !== store.getters["user/activeUser"]) {
            list.push(doc.data())
          }
        })
        store.commit("waterfall/updateCardList", list)
      } else {
        store.commit("waterfall/setEnd", true)
      }
      store.commit("waterfall/setLoading", false)
    })
  const list = require("../assets/data/caveList.json")
  store.commit("cave/setCaveList", list)
  //const waterfall = require("../assets/data/posts.json")
  //store.commit("waterfall/updateCardList", waterfall)
  // store.commit('waterfall/updateCardList', waterfall);
  const userList = require("../assets/data/userList.json")
  store.commit("userList/updateUserList", userList)

  const chips = require("../assets/data/chips.json")
  store.commit("chips/updateChipsList", chips)
}
