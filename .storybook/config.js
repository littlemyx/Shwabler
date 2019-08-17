/* eslint-disable import/no-extraneous-dependencies */
import Vue from "vue"
import Vuex from "vuex"

import Vuetify, { 
  VApp,
  VCard,
  VDialog,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VForm,
  VTextField,
  VSelect,
  VCheckbox,
  VInput,
  VTextarea,
  VChip,
  VCombobox,
  VProgressCircular,
  transitions 
} from 'vuetify/lib'

import { Ripple } from 'vuetify/lib/directives'

import theme from "@/plugins/theme"

import VueI18n from "vue-i18n"

Vue.use(VueI18n)
Vue.use(Vuex)

// import "mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VDialog,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VForm,
    VTextField,
    VSelect,
    VCheckbox,
    VInput,
    VTextarea,
    VChip,
    VCombobox,
    VProgressCircular,
    transitions
  },
  directives: {
    Ripple
  },
  theme
})




import { configure, addDecorator } from "@storybook/vue";

// import "@mdi/font/css/materialdesignicons.css";


// Ensures every story is wrapped in a v-app tag
addDecorator(() => ({
  template: "<v-app><story/></v-app>"
}));

const req = require.context("../stories", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);