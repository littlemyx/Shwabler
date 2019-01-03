import { firestore, timestamp } from "@/services/fireinit.js"

export const state = () => ({
  messages: {},
  listeners: {}
})

export const mutations = {
  setMessages(state, payload) {
    state.messages = {
      ...state.messages,
      [payload.id]: {
        ...state.messages[payload.id],
        messages: payload.messages
      }
    }
  },
  updateMessages(state, payload) {
    // state.messages[payload.id] = payload.messages
    state.messages = {
      ...state.messages,
      [payload.id]: {
        ...state.messages[payload.id],
        messages: [...state.messages[payload.id].messages, payload.message]
      }
    }
  },
  updateMessgesLoading(state, payload) {
    state.messages = {
      ...state.messages,
      [payload.id]: {
        ...state.messages[payload.id],
        isLoading: payload.isLoading
      }
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
  }
}

export const actions = {
  fetchMessagesAsync({ commit }, payload) {
    commit("updateMessgesLoading", {
      id: payload.id,
      isLoading: true
    })
    const listener = firestore
      .collection("messages")
      .doc(payload.id)
      // .where("messages_id", "==", payload.id)
      // .orderBy("date")
      .onSnapshot(doc => {
        const messages = doc.data().messages
        commit("setMessages", {
          id: payload.id,
          messages
        })

        commit("updateMessgesLoading", {
          id: payload.id,
          isLoading: false
        })
      })
    commit("updateListeners", {
      id: payload.id,
      listener
    })
  },
  unsubscribeListenerAsync({ commit, state }, payload) {
    state.listeners[payload.id]()
    commit("unsubscribeListener", payload)
  },
  updateMessagesAsync({ commit, state }, payload) {
    commit("updateMessages", {
      id: payload.id,
      message: {
        ...payload.message,
        date: new timestamp.fromDate(new Date())
      }
    })
    firestore
      .collection("messages")
      .doc(payload.id)
      .set({
        // TODO переделать на set
        messages: state.messages[payload.id].messages.map(obj => {
          return Object.assign({}, obj)
        })
      })
      .then(() => {
        console.log("message send")
      })
      .catch(error => {
        console.log(error)
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
