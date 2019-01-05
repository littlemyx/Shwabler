// import { firestore } from "@/services/fireinit.js"

export default function({ store }) {
  if (store.getters["user/isUserExist"]) {
    const chips = require("../assets/data/chips.json")
    store.commit("chips/updateChipsList", chips)
  }
}
