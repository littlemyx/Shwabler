import storeInitializeMap from "@/services/storeInitializeMap.js"

export default function({ route, store }) {
  const action = storeInitializeMap(route.name)
  action && store.dispatch(action)
  store.dispatch("messagesNotification/initFetch")
}
