import cloneDeep from "lodash/cloneDeep"
import { firestore, timestamp } from "@/services/fireinit.js"

export const state = () => ({
  newCardTitle: null,
  newCardText: null,
  caveList: [],
  isInitialized: false,
  isLoading: true,
  searchedTags: {},
  newTags: {}
})

export const mutations = {
  resetStore(state) {
    state.newCardTitle = null
    state.newCardText = null
    state.caveList = []
    state.isInitialized = false
  },
  updateCaveList(state, appendix) {
    state.caveList = [...state.caveList, ...appendix]
  },
  updateCaveCard(state, newCard) {
    const oldCardIndex = state.caveList.findIndex(
      card => card.id === newCard.id
    )
    const oldState = state.caveList
    oldState[oldCardIndex] = newCard
    // state.caveList = oldState
    state.caveList = [...oldState]
  },
  setLoading(state, flag) {
    state.isLoading = flag
  },
  setCaveList(state, newList) {
    state.caveList = [...newList]
  },
  setNewCardTitle(state, newValue) {
    state.newCardTitle = newValue
  },
  setNewCardText(state, newValue) {
    state.newCardText = newValue
  },
  setInitialized(state, value) {
    state.newTags = value
  },
  addNewTag(state, value) {
    state.newTags = { ...state.newTags, [value.id]: value.text }
  },
  updateTagsList(state, data) {
    state.caveList[data.index].tags = [
      ...state.caveList[data.index].tags,
      ...data.tags
    ]
  },
  removeFromCaveList(state, payload) {
    const oldValue = cloneDeep(state.caveList)
    const removingCardIndex = oldValue.findIndex(card => card.id === payload.id)
    oldValue.splice(removingCardIndex, 1)
    state.caveList = oldValue
  },
  removeTag(state, payload) {
    const newValue = cloneDeep(state.caveList)
    const removingCardIndex = newValue.findIndex(card => card.id === payload.id)
    const newTags = newValue[removingCardIndex].tags
    const removingTagIndex = newTags.findIndex(
      tag => Object.keys(tag)[0] === payload.tag_id
    )
    newTags.splice(removingTagIndex, 1)
    newValue[removingCardIndex].tags = newTags
    state.caveList = newValue
  },
  setSearchTags(state, value) {
    state.searchedTags = value
  },
  setNewTags(state, value) {
    state.newTags = value
  },
  removeTagById(state, value) {
    const tmpSercheddTags = { ...state.searchedTags }
    delete tmpSercheddTags[value]
    state.searchedTags = tmpSercheddTags
  }
}

export const actions = {
  // updateCaveListAsync({ commit, getters, rootState }, payload) {
  updateCaveListAsync({ commit }, payload) {
    payload[0].createdAt = new timestamp.fromDate(new Date())
    return new Promise(resolve =>
      firestore
        .collection("posts")
        .add(payload[0])
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id)
          payload[0].id = docRef.id
          commit("updateCaveList", payload)
          resolve(docRef.id)
        })
        .catch(function(error) {
          console.error("Error adding document: ", error)
        })
    )
  },
  updateCaveCardAsync({ commit }, payload) {
    commit("updateCaveCard", payload)
  },
  addCaveCardTagsAsync({ commit, state }, payload) {
    const cardIndex = state.caveList.findIndex(card => card.id === payload.id)
    commit("updateTagsList", { index: cardIndex, tags: payload.tags })
    firestore
      .collection("posts")
      .doc(payload.id)
      .set({ tags: state.caveList[cardIndex].tags }, { merge: true })
      .then(() => {
        console.log("message send")
      })
      .catch(error => {
        console.log(error)
      })
  },
  setCaveListAsync({ commit }, payload) {
    commit("setCaveList", payload)
  },
  removeFromCaveListAsync({ commit, state }, payload) {
    const tmp = state.caveList[payload]
    commit("removeFromCaveList", payload)
    firestore
      .collection("posts")
      .doc(payload.id)
      .delete()
      .catch(() => {
        // TODO add tmp back to list and show error message
        let caveListClone = cloneDeep(state.caveList)
        caveListClone.splice(payload, 0, tmp)
        commit("setCaveList", caveListClone)
      })
    // TODO send id to server and wait until success will be catched
  },
  removeTagAsync({ commit, state }, payload) {
    const cardIndex = state.caveList.findIndex(card => card.id === payload.id)
    commit("removeTag", payload)
    firestore
      .collection("posts")
      .doc(payload.id)
      .set({ tags: state.caveList[cardIndex].tags }, { merge: true })
      .then(() => {
        console.log("removed success")
      })
      .catch(error => {
        console.error(error)
      })
  },
  initFetch({ commit, rootGetters, state }) {
    if (!state.isInitialized) {
      firestore
        .collection("posts")
        .where("author_id", "==", rootGetters["user/userId"])
        // .orderBy("owner")
        // .where("text", "==", "test")
        .get()
        .then(querySnapshot => {
          const list = []
          if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
              const data = doc.data()
              data.id = doc.id
              list.push(data)
            })
            commit("setCaveList", list)
            commit("setInitialized", true)
          }
          commit("setLoading", false)

          // store.commit("waterfall/setLoading", false)
        })
    }
  }
}

export const getters = {
  tags: state => desired_id => {
    const card = state.caveList.find(card => card.id === desired_id)
    if (card) {
      let tags = {}
      card.tags.forEach(tag => {
        tags = { ...tags, ...tag }
      })
      return tags
    } else {
      return []
    }
  },
  searchedTags: state => state.searchedTags,
  newTags: state => state.newTags,
  textToId: state => desired_id => {
    const card = state.caveList.find(card => card.id === desired_id)
    if (card) {
      return card.tags.reduce((akk, tag_id) => {
        akk[Object.values(tag_id)[0]] = Object.keys(tag_id)[0]
        return akk
      }, {})
    } else {
      return []
    }
  }
}
