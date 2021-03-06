// import i18n from "~/plugins/i18n"

export const state = () => ({
  items: [
    { icon: "email", title: "feed", to: "/feed", isAuth: true },
    { icon: "home", title: "My cards", to: "/cards", isAuth: true },
    { icon: "list", title: "Dialogs", to: "/dialogs", isAuth: true },
    { icon: "apps", title: "Login", to: "/login", isAuth: false },
    { icon: "apps", title: "SignUp", to: "/signup", isAuth: false }
  ]
})

export const mutations = {
  authChanged(state) {
    // const auth = payload === null ? falth : true;
    state.items.map(item => item.isAuth)
  }
}

// export const getters = {
//   getItems: state => {
//     return state.items.filter(item => item.isAuth === !!this.$store.state.user.user);
//   }
// }
