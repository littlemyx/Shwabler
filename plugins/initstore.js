// import { firestore } from "@/services/fireinit.js"

export default function({ store }) {
  if (store.getters["user/isUserExist"]) {
    store.dispatch("tags/fetchPopular")
  }
}
