/* eslint-disable react/react-in-jsx-scope */
import Vue from "vue"
import Vuex from "vuex"

import { storiesOf } from "@storybook/vue"
import { linkTo } from "@storybook/addon-links"

import Message from "../../components/Message"

Vue.use(Vuex)

storiesOf("Message", module).add("with JSX", () => ({
  components: { Message },
  render(h) {
    return <Message author="test" text="test" />
  },
  store: new Vuex.Store({
    state: { user: { uid: "test" } },
    getters: {
      userId(state) {
        return state.user && state.user.uid
      }
    }
  }),
  methods: { action: linkTo("clicked") }
}))
