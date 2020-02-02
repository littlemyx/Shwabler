import Vue from "vue"
import theme from "./theme"

import {
  Vuetify,
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
  VTooltip,
  VProgressCircular,
  VSheet,
  VImg,
  transitions
} from "vuetify"

import { Ripple } from "vuetify/lib/directives"

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
    VTooltip,
    VProgressCircular,
    VSheet,
    VImg,
    transitions
  },
  directives: {
    Ripple
  },
  theme
})
