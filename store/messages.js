import cloneDeep from "lodash/cloneDeep"
import { firestore, timestamp } from "@/services/fireinit.js"

import { i18n } from "@/plugins/i18n.js"

import Vue from "vue"

export const state = () => ({
  messages: {},
  newMessagesCount: 0,
  listeners: {}
})

export const mutations = {
  resetStore(state) {
    state.messages = {}
    state.listeners = {}
  },
  setMessages(state, payload) {
    state.messages[payload.id] = {
      ...state.messages[payload.id],
      messages: payload.messages
    }
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
  fetchMessagesAsync({ commit, dispatch, state }, payload) {
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
        if (doc.exists) {
          const messages = doc.data().messages
          commit("updateMessgesLoading", {
            id: payload.id,
            isLoading: false
          })
          if (!state.messages[payload.id].messages.length) {
            commit("setMessages", {
              id: payload.id,
              messages
            })
          } else {
            if (
              messages.length !== state.messages[payload.id].messages.length
            ) {
              commit("setMessages", {
                id: payload.id,
                messages
              })
              // console.log(Vue.prototype)
              dispatch(
                "notifications/updateNotificationsList",
                [
                  {
                    type: "info",
                    text: i18n.t("new_message"),
                    id: "info" + new Date().getTime(),
                    autoClose: true
                  }
                ],
                { root: "notifications" }
              )
            }
          }
        }
      })
    commit("updateListeners", {
      id: payload.id,
      listener
    })
  },
  unsubscribeListenerAsync({ commit, state }, id) {
    if (state.listeners[id]) {
      state.listeners[id]()
      commit("unsubscribeListener", id)
    }
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
  },
  removeMessagesThreadAsync({ commit, state, dispatch }, { messages_id: id }) {
    const tmp = state.messages[id]
    if (state.messages[id]) {
      dispatch("unsubscribeListenerAsync", id)
      commit("removeMessagesThread", id)
    }
    firestore
      .collection("messages")
      .doc(id)
      .delete()
      .then(() => {
        console.log("messages succesfully deleted")
      })
      .catch(() => {
        // TODO add tmp back to list and show error message
        let caveListClone = cloneDeep(state.caveList)
        caveListClone.splice(id, 0, tmp)
        commit("setCaveList", caveListClone)
      })
  }
}

export const getters = {
  isLoading: state => id => {
    return state.messages[id].isLoading
  },
  messages: state => id => {
    return state.messages[id].messages
  },
  newMessagesCount: state => state.newMessagesCount
}
