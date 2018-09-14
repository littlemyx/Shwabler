// export const state = () => ({
//   newCardTitle: null,
//   newCardText: null,
//   caveList: {}
// })

// export const mutations = {
//   updateCaveList (state, appendix) {
//     state.caveList = {...state.caveList, ...appendix};
//   },
//   setCaveList (state, newList) {
//     state.caveList = {...newList};
//   },
//   setNewCardTitle (state, newValue) {
//     state.newCardTitle = newValue;
//   },
//   setNewCardText (state, newValue) {
//     state.newCardText = newValue;
//   },
//   removeFromCaleList (state, id) {
//     delete state[id];
//   }
// }

// export const actions = {
//   addToCaveListAsync ({ commit, state }, payload) {
//     commit('setCaveList', payload);
//   },
//   setCaveListAsync ({ commit, state }, payload) {
//     commit('setCaveList', payload);
//   },
//   removeFromCaleListAsync ({ commit, state }, payload) {
//     commit('removeFromCaleList', payload);
//   }
// }

export const state = () => ({
  newCardTitle: null,
  newCardText: null,
  caveList: []
})

export const mutations = {
  setCaveList (state, newList) {
    state.caveList = [...newList];
  },
  setNewCardTitle (state, newValue) {
    console.log('setNewCardTitle');
    state.newCardTitle = newValue;
  },
  setNewCardText (state, newValue) {
    state.newCardText = newValue;
  }
}

export const actions = {
  addToCaveListAsync ({ commit, state }, payload) {
    let oldList = [...state.caveList];
    commit('setCaveList', oldList.concat(payload));
  },
  setCaveListAsync ({ commit, state }, payload) {
    commit('setCaveList', payload);
  }
}
