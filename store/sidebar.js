export const state = () => ({
  items: [
    { icon: 'email', title: 'Waterfall', to: '/posts', isAuth: true },
    { icon: 'list', title: 'Wardrobe', to: '/wardrobe', isAuth: true },
    { icon: 'apps', title: 'Login', to: '/login', isAuth: false },
    { icon: 'apps', title: 'SignUp', to: '/signup', isAuth: false }
  ]
})

export const mutations = {
  authChanged (state, payload) {
    // const auth = payload === null ? falth : true;
    state.items.map(item => item.isAuth);
  }
}

// export const getters = {
//   getItems: state => {
//     return state.items.filter(item => item.isAuth === !!this.$store.state.user.user);
//   }
// }
