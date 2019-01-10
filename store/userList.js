import cloneDeep from "lodash/cloneDeep"
import { firestore } from "@/services/fireinit.js"

export const state = () => ({
  firstCard: true,
  userList: [],
  isLoading: true,
  isEmpty: false
})

export const mutations = {
  resetStore(state) {
    state.firstCard = true
    state.userList = []
    state.isLoading = true
    state.isEmpty = false
  },
  changeCard(state) {
    state.firstCard = !state.firstCard
  },
  setUserList(state, newList) {
    state.userList = newList
  },
  updateUserList(state, newList) {
    state.userList = [...state.userList, ...newList]
  },
  setLoading(state, flag) {
    state.isLoading = flag
  },
  setEmpty(state, flag) {
    state.isEmpty = flag
  },
  updateCardMessageList(state, newMessage) {
    const oldCardIndex = state.userList.findIndex(
      card => card.id === newMessage.id
    )
    state.userList[oldCardIndex].messages = [
      ...state.userList[oldCardIndex].messages,
      { author: newMessage.author, text: newMessage.text }
    ]
  },
  removeFromUserList(state, payload) {
    const newValue = cloneDeep(state.userList)
    newValue.splice(payload.index, 1)
    state.userList = newValue
    if (!newValue.length) {
      state.isEmpty = true
    }
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
  // updateCardTagsAsync({ commit }, payload){
  //   firestore
  //       .collection("tags")
  //       .add(payload[0])
  //       .then(function(docRef) {
  //         console.log("Document written with ID: ", docRef.id)
  //         payload[0].id = docRef.id
  //         commit("updateTagsList", Array.isArray(payload) ? payload : [payload])
  //         resolve(docRef.id)
  //       })
  //       .catch(function(error) {
  //         console.error("Error adding document: ", error)
  //       })
  // },
  updateCardMessageListAsync({ commit }, payload) {
    commit("updateCardMessageList", payload)
  },
  removeFromUserListAsync({ commit, dispatch, state }, payload) {
    const removingCardIndex = state.userList.findIndex(
      card => card.id === payload.id
    )
    const tmp = state.userList[removingCardIndex]
    const messages_id = state.userList[removingCardIndex].messages_id
    commit("removeFromUserList", { index: removingCardIndex })
    firestore
      .collection("matches")
      .doc(payload.id)
      .delete()
      .then(() => {
        dispatch(
          "messages/removeMessagesThreadAsync",
          { messages_id },
          { root: "messages" }
        )
      })
      .catch(error => {
        console.log(error)
        // TODO add tmp back to list and show error message
        let caveListClone = cloneDeep(state.caveList)
        caveListClone.splice(payload, 0, tmp)
        commit("setCaveList", caveListClone)
      })
  },
  initFetch({ commit, rootGetters }) {
    firestore
      .collection("matches")
      .where("members", "array-contains", rootGetters["user/userId"])
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
          commit("setUserList", list)
        } else {
          commit("setEmpty", true)
        }
        commit("setLoading", false)
      })
  }
}

export const getters = {
  messagesId: state => id => {
    return state.userList.find(card => card.id === id).messages_id
  }
}
