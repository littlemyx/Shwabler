const { colors } = require("../assets/data/colors.json")
import { firestore, timestamp } from "@/services/fireinit.js"

export const state = () => ({
  isFirstCardVisible: true,
  cardList: [],
  index: 0,
  firstCard: null,
  secondCard: null,
  isEnd: false,
  isLoading: true,
  isInitialized: false,
  searchTags: []
})

export const mutations = {
  resetStore(state) {
    state.isFirstCardVisible = true
    state.cardList = []
    state.index = 0
    state.firstCard = null
    state.secondCard = null
    state.isEnd = false
    state.isLoading = true
    state.isInitialized = false
    state.searchTags = []
  },
  changeCard(state) {
    state.firstCard = !state.firstCard
  },
  updateCardList(state, newList) {
    state.cardList = [...newList]
  },
  increaseIndex(state) {
    state.index++
  },
  resetIndex(state) {
    state.index = 0
  },
  setEnd(state, value) {
    state.isEnd = value
  },
  setLoading(state, value) {
    state.isLoading = value
  },
  setInitialized(state, value) {
    state.isInitialized = value
  },
  setSearchTags(state, value) {
    state.searchTags = value
  }
}

export const actions = {
  increaseIndex({ commit, state }) {
    const newIndex = state.index + 1
    if (state.cardList.length === newIndex) {
      // load next pack of cards and set index to 0
      commit("setEnd", true)
    }
    commit("increaseIndex")
  },
  createMatch({ dispatch }, payload) {
    // dispatch("userList/updateUserList", payload) нужно пока не научимся нормально слушать изменения в коллекции

    dispatch("increaseIndex")
    const message = [
      {
        text: payload.message,
        date: new timestamp.fromDate(new Date()),
        author_id: payload.author_id
      }
    ]

    const doc = firestore.collection("messages").doc()
    doc
      .set({
        messages: message.map(obj => {
          return Object.assign({}, obj)
        })
      })
      .then(() => {
        const messages_id = doc.id
        const match = {
          post_id: payload.card_id,
          date: new timestamp.fromDate(new Date()),
          starter_id: payload.card_author_id,
          follower_id: payload.author_id,
          members: [payload.card_author_id, payload.author_id],
          tags: [], //TODO на будущее мб
          text: payload.text,
          title: payload.title,
          messages_id
        }
        firestore
          .collection("matches")
          .doc()
          .set(match)
          .then(error => {
            console.log(error)
          })
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => {
        console.error(error)
      })
  },
  async findByTag({ commit, rootGetters }, payload) {
    const refTags = firestore.collection("tags")
    const refPosts = firestore.collection("posts")
    let posts = []
    const cards = []
    commit("setLoading", true)
    await Promise.all(
      payload.map(tag => {
        return refTags
          .doc(tag.id)
          .get()
          .then(doc => {
            posts = [...posts, ...doc.data().posts]
          })
      })
    )
    posts = new Set(posts)
    await Promise.all(
      [...posts].map(post => {
        return refPosts
          .doc(post)
          .get()
          .then(doc => {
            const data = doc.data()
            data.id = doc.id
            if (data.author_id !== rootGetters["user/userId"]) {
              cards.push(data)
            }
          })
      })
    )

    if (cards.length) {
      commit("setEnd", false)
    }
    commit("resetIndex")
    commit("updateCardList", cards)
    commit("setLoading", false)
  },
  fetchCards({ commit, rootGetters }) {
    firestore
      .collection("posts")
      // .where("author_id", "array-contains", store.getters["user/userId"])
      // .where("owner", "<", store.getters["user/activeUser"])
      .orderBy("createdAt", "desc")
      // .where("text", "==", "test")
      .get()
      .then(querySnapshot => {
        const list = []
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            if (data.author_id !== rootGetters["user/userId"]) {
              list.push(data)
            }
          })
          commit("updateCardList", list) // тут нужно подумать над механикой индекса
          commit("setEnd", false)
          commit("resetIndex")
        } else {
          commit("setEnd", true)
        }
        commit("setLoading", false)
      })
      .catch(error => {
        console.log(error)
      })
  },
  initFetch({ dispatch, commit, state }) {
    if (!state.isInitialized) {
      dispatch("fetchCards")
      commit("setInitialized", true)
    }
  }
}

export const getters = {
  nextCard: state => {
    return state.cardList[state.index]
  },
  // searchTags: state => state.searchTags,
  tags: state => desired_id => {
    const card = state.cardList.find(card => card.id === desired_id)
    return (
      (card &&
        card.tags.map(tag => ({
          text: Object.values(tag)[0],
          color: colors[Object.keys(tag)[0].charCodeAt(0) % colors.length]
        }))) ||
      null
    )
  }
}
