import { firestore } from "@/services/fireinit.js"

export const state = () => ({
  messages: {}
})

export const mutations = {
  updateMessages(state, payload) {
    // state.messages[payload.id] = payload.messages
    state.messages = { ...state.messages, [payload.id]: payload.messages }
  }
}

export const actions = {
  updateMessagesAsync({ commit }, payload) {
    commit("updateMessages", {
      id: payload.id,
      messages: { isLoading: true }
    })
    firestore
      .collection("messages")
      .doc(payload.id)
      // .where("messages_id", "==", payload.id)
      // .orderBy("date")
      .onSnapshot(doc => {
        const messages = doc.data().messages
        commit("updateMessages", {
          id: payload.id,
          messages: { isLoading: false, messages }
        })
      })
  }
}

export const getters = {
  isLoading: state => id => {
    return state.messages[id].isLoading
  },
  messages: state => id => {
    return state.messages[id].messages
  }
}
