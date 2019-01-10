export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar
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
  }
}
