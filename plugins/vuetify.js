import Vue from "vue"

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
  VProgressCircular,
  transitions
} from "vuetify"

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
  theme: {
    "indigo-purple": "#841b4d",
    shwabler: "#e94191",
    "dark-shwabler": "#842552"
  }
})
