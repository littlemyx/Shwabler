import { auth } from "@/services/fireinit.js"

export default context => {
  const { store } = context

  return new Promise(resolve => {
    // resolve(true);
    auth.onAuthStateChanged(user => {
      console.log("fireauth")
      console.log(auth.currentUser)
      if (user) {
        // setTimeout(function () {
        store.dispatch("user/setUser", user)
        store.commit("sidebar/authChanged", user)
        // }, 10000);
      }
      return resolve()
    })
  })
}
