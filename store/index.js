const [, locale] = document.cookie
  .split("; ")
  .map(stringCookie => stringCookie.split("="))
  .find(cookie => cookie[0] === "locale") || ["locale", "en"]

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
  locale: locale
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
    commit("settings/resetStore", { root: "settings" })
    commit("messagesNotification/resetStore", { root: "messagesNotification" })
  }
}
