import cloneDeep from "lodash/cloneDeep"

export const state = () => ({
  notificationsList: []
})

export const mutations = {
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
