export default function({ store, redirect, route }) {
  if (store.state.user.user !== null && route.name === "login") {
    redirect("/waterfall")
    console.log("auth")
  }
  if (
    store.state.user.user === null &&
    route.name !== "login" &&
    route.name !== "signup"
  ) {
    redirect("/login")
    console.log("no auth")
  }
}
