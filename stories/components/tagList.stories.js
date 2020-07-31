/* eslint-disable react/react-in-jsx-scope */
import { storiesOf } from "@storybook/vue"
import { linkTo } from "@storybook/addon-links"

import Vuex from "vuex"
import VueI18n from "vue-i18n"

import TagList from "@/components/Tags"
import tmpTagPull from "@/components/Tags/tmpTag.js"

storiesOf("Components/TagList", module)
  .add("editable", () => ({
    components: { TagList },
    render(h) {
      return (
        <div style={{ width: "540px" }}>
          <TagList incoming_items={tmpTagPull} placeholder="Input tags" />
        </div>
      )
    },
    store: new Vuex.Store({
      state: { user: { uid: "test" } },
      getters: {
        userId(state) {
          return state.user && state.user.uid
        }
      }
    }),
    i18n: new VueI18n({
      locale: "en",
      fallbackLocale: "en",
      messages: {
        en: require("@/locales/en.json"),
        ru: require("@/locales/ru.json")
      }
    }),
    methods: { action: linkTo("clicked") }
  }))
  .add("uneditable", () => ({
    components: { TagList },
    render(h) {
      return (
        <div style={{ width: "540px" }}>
          <TagList
            editable={false}
            incomingItems={tmpTagPull}
            placeholder="Input tags"
          />
        </div>
      )
    },
    store: new Vuex.Store({
      state: { user: { uid: "test" } },
      getters: {
        userId(state) {
          return state.user && state.user.uid
        }
      }
    }),
    i18n: new VueI18n({
      locale: "en",
      fallbackLocale: "en",
      messages: {
        en: require("@/locales/en.json"),
        ru: require("@/locales/ru.json")
      }
    }),
    methods: { action: linkTo("clicked") }
  }))
