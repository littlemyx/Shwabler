import STEPS from "@/assets/data/tutorialSteps"

export const state = () => ({
  step: 0,
  isStart: true,
  isEnd: false,
  appState: STEPS[0]
})

export const mutations = {
  increaseStep(state) {
    state.isStart = false
    if (state.step + 1 >= STEPS.length) {
      state.isEnd = true
    } else {
      const step = state.step + 1

      state.step = step
      const prevRoute = state.appState.route
      state.appState = STEPS[step]
      if (state.appState.route !== prevRoute) {
        this.$router.push(state.appState.route)
      }
    }
  },
  decreaseStep(state) {
    state.isEnd = false
    if (state.step - 1 < 0) {
      state.isStart = true
    } else {
      const step = state.step - 1

      state.step = step
      const prevRoute = state.appState.route
      state.appState = STEPS[step]
      if (state.appState.route !== prevRoute) {
        this.$router.push(state.appState.route)
      }
    }
  },
  goToStep(state, { stepNumber }) {
    if (stepNumber < STEPS.length) {
      const step = stepNumber

      state.step = step
      const prevRoute = state.appState.route
      state.appState = STEPS[step]
      if (state.appState.route !== prevRoute) {
        this.$router.push(state.appState.route)
      }
    }
  },
  updateStepData(store, { stepNumber, newData }) {
    // VEEEEERY BAD
    if (stepNumber) {
      STEPS[stepNumber] = { ...STEPS[stepNumber], newData }
    }
  },
  updateMessages(store, { stepNumber, cardNumber, newData }) {
    // VEEEEERY BAD
    if (stepNumber) {
      STEPS[stepNumber].cards[cardNumber].messages = [
        ...STEPS[stepNumber].cards[cardNumber].messages,
        newData
      ]
    }
  }
}

export const getters = {
  appState: state => state.appState,
  step: state => state.step,
  text: state => state.appState.text,
  isLastStep: state => state.step === STEPS.length - 1,
  popupedElementIds: state => state.appState.popupedElementIds
}
