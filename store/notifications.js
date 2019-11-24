import cloneDeep from "lodash/cloneDeep"

export const state = () => ({
  notificationsList: []
})

export const mutations = {
  resetStore(state) {
    state.notificationsList = []
  },
  setNotificationsList(state, newList) {
    state.notificationsList = newList
  },
  deleteNotification(state, id) {
    const newValue = cloneDeep(state.notificationsList)
    const removingNotificationIndex = newValue.findIndex(
      notification => notification.id === id
    )
    newValue.splice(removingNotificationIndex, 1)
    state.notificationsList = newValue
  },
  updateNotificationsList(state, appendix) {
    state.notificationsList = [...state.notificationsList, ...appendix]
  }
}

//TODO add notification deleting after some interval

export const actions = {
  updateNotificationsList({ commit }, payload) {
    commit("updateNotificationsList", payload)
    payload.forEach(item => {
      if (item.autoClose) {
        setTimeout(() => {
          commit("deleteNotification", payload.id)
        }, 5000)
      }
    })
  }
}
