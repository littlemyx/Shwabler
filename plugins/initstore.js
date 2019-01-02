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

  firestore
    .collection("matches")
    .where("starter_id", "==", store.getters["user/userId"])
    // .where("owner", "<", store.getters["user/activeUser"])
    .orderBy("date")
    // .where("text", "==", "test")
    .get()
    .then(querySnapshot => {
      const list = []
      if (querySnapshot.docs.length) {
        querySnapshot.forEach(doc => {
          const data = { messages: [], tags: [], ...doc.data(), id: doc.id }
          console.log(`${doc.id} => ${data}`)
          list.push(data)
        })
        store.commit("userList/updateUserList", list)
      } else {
        store.commit("userList/setEmpty", true)
      }
      store.commit("userList/setLoading", false)
    })
    .catch(error => {
      console.log(error)
    })
  // const userList = require("../assets/data/userList.json")
  // store.commit("userList/updateUserList", userList)

  const chips = require("../assets/data/chips.json")
  store.commit("chips/updateChipsList", chips)
}
