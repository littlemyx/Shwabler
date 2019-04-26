import { auth } from "@/services/fireinit.js"

export default ({ store }) => {
  return new Promise(resolve => {
    // resolve(true);
    auth.onAuthStateChanged(user => {
      if (user) {
        store.commit("user/setUser", user)
        store.commit("user/setEmailVerified", user.emailVerified)
        store.commit("sidebar/authChanged", user)
      }
      return resolve()
    })
  })
}
