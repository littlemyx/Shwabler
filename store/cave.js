import cloneDeep from 'lodash/cloneDeep';

export const state = () => ({
  newCardTitle: null,
  newCardText: null,
  caveList: []
})

export const mutations = {
  updateCaveList (state, appendix) {
    state.caveList = [...state.caveList, ...appendix];
  },
  setCaveList (state, newList) {
    state.caveList = [...newList];
  },
  setNewCardTitle (state, newValue) {
    state.newCardTitle = newValue;
  },
  setNewCardText (state, newValue) {
    state.newCardText = newValue;
  },
  removeFromCaveList (state, id) {
    const oldValue = cloneDeep(state.caveList);
    oldValue.splice(id, 1);
    state.caveList = oldValue;
  }
}

export const actions = {
  addToCaveListAsync ({ commit, state }, payload) {
    commit('updateCaveList', payload);
  },
  setCaveListAsync ({ commit, state }, payload) {
    commit('setCaveList', payload);
  },
  removeFromCaveListAsync ({ commit, state }, payload) {
    const tmp = state.caveList[payload];
    let success = true;
    commit('removeFromCaveList', payload);
    // TODO send id to server and wait until success will be catched
    if (!success) {
      // TODO add tmp back to list and show error message
      let caveListClone = cloneDeep(state.caveList);
      caveListClone.splice(payload, 0, tmp);
      commit('setCaveList', caveListClone);
    }
  }
}
