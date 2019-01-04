import { firestore } from "@/services/fireinit.js"

export default function({ store }) {
  if (store.getters["user/isUserExist"]) {
    firestore
      .collection("posts")
      // .where("author_id", "array-contains", store.getters["user/userId"])
      // .where("owner", "<", store.getters["user/activeUser"])
      .orderBy("createdAt", "desc")
      // .where("text", "==", "test")
      .get()
      .then(querySnapshot => {
        const list = []
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            if (data.author_id !== store.getters["user/userId"]) {
              list.push(data)
            }
          })
          store.commit("waterfall/updateCardList", list)
        } else {
          store.commit("waterfall/setEnd", true)
        }
        store.commit("waterfall/setLoading", false)
      })

    // const list = require("../assets/data/caveList.json")
    // store.commit("cave/setCaveList", list)

    firestore
      .collection("posts")
      .where("author_id", "==", store.getters["user/userId"])
      // .orderBy("owner")
      // .where("text", "==", "test")
      .get()
      .then(querySnapshot => {
        const list = []
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            list.push(data)
          })
          store.commit("cave/setCaveList", list)
        }

        // store.commit("waterfall/setLoading", false)
      })

    //const waterfall = require("../assets/data/posts.json")
    //store.commit("waterfall/updateCardList", waterfall)
    // store.commit('waterfall/updateCardList', waterfall);

    firestore
      .collection("matches")
      .where("members", "array-contains", store.getters["user/userId"])
      // .where("owner", "<", store.getters["user/activeUser"])
      .orderBy("date")
      // .where("text", "==", "test")
      .onSnapshot(querySnapshot => {
        const list = []
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const data = { messages: [], tags: [], ...doc.data(), id: doc.id }
            console.log(`${doc.id} => ${data}`)
            list.push(data)
          })
          store.commit("userList/setUserList", list)
        } else {
          store.commit("userList/setEmpty", true)
        }
        store.commit("userList/setLoading", false)
      })
    // const userList = require("../assets/data/userList.json")
    // store.commit("userList/updateUserList", userList)

    const chips = require("../assets/data/chips.json")
    store.commit("chips/updateChipsList", chips)
  }
}
