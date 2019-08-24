export const state = () => ({
  sidebar: false,
  locales: [
    {
      code: "en",
      name: "EN"
    },
    {
      code: "ru",
      name: "Рус"
    }
  ],
  locale: null
})

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar
  },
  SET_LANG(state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
}

export const actions = {
  resetStore({ commit }) {
    commit("user/resetStore", { root: "user" })
    commit("cave/resetStore", { root: "cave" })
    commit("messages/resetStore", { root: "messages" })
    commit("notifications/resetStore", { root: "notifications" })
    commit("userList/resetStore", { root: "userList" })
    commit("waterfall/resetStore", { root: "waterfall" })
    commit("ban/resetStore", { root: "ban" })
  }
}
