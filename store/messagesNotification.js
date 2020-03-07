import { firestore } from "@/services/fireinit.js"
import Vue from "vue"

const firebaseRef = firestore.collection("messagesNotifications")

export const state = () => ({
  idsList: [],
  isInitialized: false
})

export const mutations = {
  resetStore(state) {
    state.idsList = []
    state.isInitialized = false
  },

  setIdsList(state, payload) {
    state.idsList = payload.list
  },
  setInitialized(state, value) {
    state.isInitialized = value
  },
  setEmptyMessages(state, payload) {
    // нужно не только при ините выставлять поля для подхватывания реактивности, но и при добавлении новых чатов тоже либо посмотреть в сторону Vue.set()
    const messages = {}
    payload.forEach(card => {
      messages[card] = { messages: [], isLoading: false }
    })
    state.messages = messages
  },
  updateMessages(state, payload) {
    // state.messages[payload.id] = payload.messages
    Vue.set(state.messages, payload.id, {
      ...state.messages[payload.id],
      messages: [...state.messages[payload.id].messages, payload.message]
    })
    // state.messages[payload.id] = {
    //   ...state.messages[payload.id],
    //   messages: [...state.messages[payload.id].messages, payload.message]
    // }
  },
  updateMessgesLoading(state, payload) {
    state.messages[payload.id] = {
      ...state.messages[payload.id],
      isLoading: payload.isLoading
    }
  },
  updateListeners(state, payload) {
    state.listeners = {
      ...state.listeners,
      [payload.id]: payload.listener
    }
  },
  unsubscribeListener(state, payload) {
    const newState = { ...state.listeners }
    delete newState[payload.id]
    state.listeners = newState
  },
  removeMessagesThread(state, messages_id) {
    const newState = { ...state.messages }
    delete newState[messages_id]
    state.messages = newState
  }
}

export const actions = {
  fetchMessagesCountAsync({ commit, rootGetters }) {
    // commit("updateMessgesLoading", {
    //   id: payload.id,
    //   isLoading: true
    // })
    // const listener =
    firebaseRef
      .doc(rootGetters["user/userId"])
      // .where("messages_id", "==", payload.id)
      // .orderBy("date")
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data()
          if (data.updated) {
            commit("setIdsList", {
              list: data.updated
            })
          }

          // if (!state.messages[payload.id].messages.length) {
          //   commit("setMessages", {
          //     id: payload.id,
          //     messages
          //   })
          // } else {
          //   if (
          //     messages.length !== state.messages[payload.id].messages.length
          //   ) {
          //     commit("setMessages", {
          //       id: payload.id,
          //       messages
          //     })
          //     commit(
          //       "notifications/updateNotificationsList",
          //       [
          //         {
          //           type: "info",
          //           text: "You have a new message!",
          //           id: "info" + new Date().getTime()
          //         }
          //       ],
          //       { root: "notifications" }
          //     )
          //   }
          // }
        }
      })
  },
  addNewUser({ rootGetters }) {
    firebaseRef.doc(rootGetters["user/userId"]).set({
      updated: []
    })
  },
  setMessagesCountAsync({ commit, state, rootGetters }, payload) {
    const newCountArray = state.idsList.filter(match => match !== payload.id)
    firebaseRef
      .doc(rootGetters["user/userId"])
      .update({
        updated: newCountArray
      })
      .then(() => {
        commit("setIdsList", { list: newCountArray })
      })
  },
  unsubscribeListenerAsync({ commit, state }, id) {
    if (state.listeners[id]) {
      state.listeners[id]()
      commit("unsubscribeListener", id)
    }
  },
  async initFetch({ dispatch, commit, state }) {
    if (!state.isInitialized) {
      dispatch("fetchMessagesCountAsync")
      commit("setInitialized", true)
    }
  }
}

export const getters = {
  newMessagesCount: state => state.idsList.length,
  idsList: state => state.idsList,
  checkNewMessageById: state => desiredId => {
    return state.idsList.findIndex(id => id === desiredId) !== -1
  }
}
