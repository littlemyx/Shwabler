<template>
  <v-combobox
    v-model="model"
    :hide-details="true"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    :disabled="disabled"
    hide-selected
    label="Search tags"
    multiple
    small-chips
    solo
    background-color="transparent"
    flat
    append-icon="none"
    class="chips-combobox"
  >
    <template slot="no-data">
      <v-list-tile>
        <span class="subheading">Create</span>
        <v-chip
          :color="`${colors[nonce - 1]} lighten-3`"
          label
          small
        >
          {{ search }}
        </v-chip>
      </v-list-tile>
    </template>
    <template
      v-if="item === Object(item)"
      slot="selection"
      slot-scope="{ item, parent, selected }"
    >
      <v-chip
        :color="`${item.color} lighten-3`"
        :selected="selected"
        :small="false"
        label
      >
        <span class="pr-2">
          {{ item.text | capitalize }}
        </span>
        <v-icon
          v-if="!disabled"
          small
          @click="parent.selectItem(item)"
        >close</v-icon>
      </v-chip>
    </template>
    <template
      slot="item"
      slot-scope="{ index, item, parent }"
    >
      <v-list-tile-content>
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        />
        <v-chip
          v-else
          :color="`${item.color} lighten-3`"
          dark
          label
          small
        >
          {{ item.text| capitalize }}
        </v-chip>
      </v-list-tile-content>
      
    </template>
  </v-combobox>
</template>

<script>
const { colors } = require("../assets/data/colors.json")

export default {
  props: {
    id: {
      type: String,
      required: false,
      default: () => {}
    },
    existed: {
      type: Object,
      required: false,
      default: () => {}
    },
    list: {
      type: Array,
      required: false,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      activator: null,
      attach: null,
      colors,
      editing: null,
      index: -1,
      nonce: 1,
      menu: false,
      x: 0,
      search: null,
      y: 0
    }
  },
  computed: {
    items() {
      return this.$store.getters["chips/items"]
    },
    model: {
      get: function() {
        return this.$store.getters["chips/model"](this.list)
      },
      set: function(val) {
        const newVal = val.map(item => {
          return item.text || item
        })
        this.$emit("chips-updated", newVal)
        const newItem = val[val.length - 1].text || val[val.length - 1]
        if (
          this.model.length - val.length <= 0 &&
          !this.$store.state.chips.chipsList.includes(newItem)
        ) {
          this.$store.dispatch("chips/addToChipsListAsync", newItem)
        }
      }
    }
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.index = index
      } else {
        this.editing = null
        this.index = -1
      }
    },
    filter(item, queryText, itemText) {
      const hasValue = val => (val != null ? val : "")

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      )
    }
  }
}
</script>
