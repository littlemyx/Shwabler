import { auth } from "@/services/fireinit.js"
export default function({ store, redirect, route }) {
  if (
    store.state.user.user !== null &&
    store.state.user.user.emailVerified &&
    (route.name === "login" ||
      route.name === "index" ||
      route.name === "welcome") //TODO remove "!"
  ) {
    redirect("/waterfall")
    console.log("auth")
  }
  if (
    store.state.user.user !== null &&
    !store.state.user.isEmailVerified &&
    route.name !== "verification" &&
    route.name !== "login" &&
    route.name !== "sigup"
  ) {
    auth.currentUser.reload().then(() => {
      if (!auth.currentUser.emailVerified) {
        redirect("/verification")
        console.log("no verification")
      } else {
        store.commit("user/setEmailVerified", true)
      }
    })
  }
  if (
    store.state.user.user === null &&
    (route.name === "verification" ||
      (route.name !== "welcome" &&
        route.name !== "login" &&
        route.name !== "signup"))
  ) {
    redirect("/welcome")
    console.log("no auth")
  }
  return false
}
