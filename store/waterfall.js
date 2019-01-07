import { firestore, timestamp } from "@/services/fireinit.js"

export const state = () => ({
  isFirstCardVisible: true,
  cardList: [],
  index: 0,
  firstCard: null,
  secondCard: null,
  isEnd: false,
  isLoading: true,
  isInitialized: false
})

export const mutations = {
  changeCard(state) {
    state.firstCard = !state.firstCard
  },
  updateCardList(state, newList) {
    state.cardList = [...newList]
  },
  increaseIndex(state) {
    state.index++
  },
  setEnd(state, value) {
    state.isEnd = value
  },
  setLoading(state, value) {
    state.isLoading = value
  },
  setInitialized(state, value) {
    state.isInitialized = value
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
  initFetch({ commit, rootGetters, state }) {
    if (!state.isInitialized) {
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
            commit("updateCardList", list)
          } else {
            commit("setEnd", true)
          }
          commit("setLoading", false)
          commit("setInitialized", true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

export const getters = {
  nextCard: state => {
    return state.cardList[state.index]
  },
  tags: state => desired_id => {
    const card = state.cardList.find(card => card.id === desired_id)
    return (
      (card &&
        card.tags.map(tag => ({
          text: Object.values(tag)[0]
        }))) ||
      null
    )
  }
}
