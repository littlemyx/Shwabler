const { colors } = require("../assets/data/colors.json")
import { firestore, timestamp, fieldvalue } from "@/services/fireinit.js"

export const state = () => ({
  tagsList: {},
  idsList: [],
  isLoading: false,
  searchResults: {}
})

export const mutations = {
  setTagsList(state, appendix) {
    state.tagsList = appendix
    state.idsList = Object.keys(appendix)
  },
  updateTagsList(state, appendix) {
    state.tagsList = { ...state.tagsList, ...appendix }
    state.idsList = [...state.idsList, ...Object.keys(appendix)]
  },
  setLoading(state, flag) {
    state.isLoading = flag
  },
  setSearchResults(state, results) {
    state.searchResults = results
  },
  resetSearchResults(state) {
    state.searchResults = {}
  },
  removeTag(state, id) {
    const newList = state.tagsList
    delete newList[id]
    state.tagsList = newList
    const idsIndex = state.idList.findIndex(list_id => list_id === id)
    const newIdsList = state.idList
    newIdsList.splice(idsIndex, 1)
    state.idList = newList
  }
}

export const actions = {
  addToTagsListAsync(context, payload) {
    const newTag = {
      last_activity: new timestamp.fromDate(
        new Date(new Date().setUTCHours(0, 0, 0, 0))
      ),
      count: 1,
      posts: [payload.card_id],
      text: payload.text
    }
    return new Promise(resolve => {
      firestore
        .collection("tags")
        .add(newTag)
        .then(function(docRef) {
          // commit("updateTagsList", {
          //   [docRef.id]: newTag.text
          // })
          resolve(docRef.id)
        })
        .catch(function(error) {
          console.error("Error adding document: ", error)
        })
    })
  },
  fetchSearch({ commit }, substring) {
    if (substring) {
      commit("setLoading", true)
      firestore
        .collection("tags")
        .where("searchIndex", "array-contains", substring)
        .limit(20)
        .get()
        .then(querySnapshot => {
          commit("setLoading", false)
          if (querySnapshot.docs.length) {
            const list = {}
            querySnapshot.forEach(doc => {
              const data = doc.data()
              list[doc.id] = data.text
            })
            commit("setSearchResults", list)
          }
        })
    } else {
      commit("resetSearchResults")
    }
  },
  updateActivityAsync(context, payload) {
    // TODO недоделано
    return new Promise(resolve => {
      firestore
        .collection("tags")
        .doc(payload.id)
        .update({
          last_activity: new timestamp.fromDate(
            new Date(new Date().setUTCHours(0, 0, 0, 0))
          ),
          posts: fieldvalue.arrayUnion(payload.card_id)
        })
        .then(() => {
          resolve()
        })
        // .then(function(docRef) {
        //   console.log("Document written with ID: ", docRef.id)
        //   payload[0].id = docRef.id
        //   commit("updateTagsList", Array.isArray(payload) ? payload : [payload])
        //   resolve(docRef.id)
        // })
        .catch(function(error) {
          console.error("Error adding document: ", error)
        })
    })
  },
  removeTagAsync(context, payload) {
    // TODO недоделано
    return new Promise(resolve => {
      firestore
        .collection("tags")
        .doc(payload.id)
        // .update({ posts: firestore.FieldValue.arrayUnion(payload.id)}, { merge: true }) // тут ещё  нужно удалять из массива ссылок на посты
        .update({ posts: fieldvalue.arrayRemove(payload.parent_id) }) // тут ещё  нужно удалять из массива ссылок на посты
        .then(() => {
          resolve()
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  fetchPopular({ commit }) {
    firestore
      .collection("tags")
      .orderBy("last_activity")
      .orderBy("count", "desc")
      .limit(20) // TODO return this
      .onSnapshot(querySnapshot => {
        if (querySnapshot.docs.length) {
          const list = {}
          querySnapshot.forEach(doc => {
            const data = doc.data()
            list[doc.id] = data.text
          })
          commit("setTagsList", list)
        }
      })
  }
}

export const getters = {
  items: state => {
    return Object.keys(state.tagsList).map(tag_id => ({
      id: tag_id,
      text: state.tagsList[tag_id],
      color: colors[tag_id.charCodeAt(0) % colors.length]
    }))
  },
  searchItems: state => {
    return Object.keys(state.searchResults).map(tag_id => ({
      id: tag_id,
      text: state.searchResults[tag_id],
      color: colors[tag_id.charCodeAt(0) % colors.length]
    }))
  },
  ids: state => state.idsList,
  model: (state, getters) => chips => {
    return getters.items.filter(chip => chips.includes(chip.text))
  },
  tagIdByText: (state, getters) => text =>
    getters.items.find(tag => tag.text === text)
}
