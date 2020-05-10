import { firestore, timestamp } from "@/services/fireinit.js"

const firebaseRef = firestore.collection("settings")

export const state = () => ({
  settings: {},
  isInitialized: false,
  isTutorial: false,
  isSaving: false,
  isLoading: true
})

export const mutations = {
  resetStore(state) {
    state.list = []
  },
  setSettings(state, payload) {
    state.isSaved = false
    state.settings = { ...state.settings, ...payload }
  },
  setSaveLoading(state, payload) {
    state.isSaving = payload
  },
  setLoading(state, payload) {
    state.isLoading = payload
  },
  setInitialized(state, payload) {
    state.isInitialized = payload
  }
}

export const actions = {
  fetchSettings({ commit, rootGetters }) {
    return new Promise(resolve => {
      firebaseRef
        .doc(rootGetters["user/userId"])
        .get()
        .then(doc => {
          const data = doc.data()

          commit("setSettings", data)

          resolve()
        })

        .catch(error => {
          console.log(error)
          resolve()
        })
    })
  },
  addNewUser({ rootGetters }) {
    firebaseRef.doc(rootGetters["user/userId"]).set({
      language: "en",
      notifications: true,
      isFirstTime: true,
      lastNotification: new timestamp.fromDate(new Date())
    })
  },
  set({ commit, rootGetters, state }) {
    commit("setSaveLoading", true)
    firebaseRef
      .doc(rootGetters["user/userId"])
      .update({
        ...state.settings
      })
      .finally(() => {
        commit("setSaveLoading", false)
      })
  },
  setSettingsAsync({ rootGetters, state }, payload) {
    firebaseRef.doc(rootGetters["user/userId"]).update({
      ...state.settings,
      ...payload
    })
  },
  initFetch({ dispatch, commit, state }) {
    return new Promise(resolve => {
      if (!state.isInitialized) {
        dispatch("fetchSettings").then(() => {
          commit("setLoading", false)
          resolve()
        })
        commit("setInitialized", true)
      } else {
        resolve()
      }
    })
  }
}

export const getters = {
  lastNotification: state => state.settings.lastNotification,
  language: state => state.settings.language,
  notifications: state => state.settings.notifications,
  isFirstTime: state => state.settings.isFirstTime,
  isTutorial: state => state.isTutorial,
  isSaving: state => state.isSaving,
  isLoading: state => state.isLoading
}
