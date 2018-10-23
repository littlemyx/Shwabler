<template>
  <v-combobox
    v-model="model"
    :hide-details="true"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="Search for an option"
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
        label
        small
      >
        <span class="pr-2">
          {{ item.text | capitalize }}
        </span>
        <v-icon
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
          {{ item.text | capitalize }}
        </v-chip>
      </v-list-tile-content>
      <v-spacer/>
      <v-list-tile-action @click.stop>
        <v-btn
          icon
          @click.stop.prevent="edit(index, item)"
        >
          <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    existed: {
      type: Object,
      required: false,
      default: () => {}
    },
    list: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      chipsList: {
        monday: true,
        friday: true,
        sunday: true
      },
      activator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      items_old: [
        { header: "Select an option or create one" },
        {
          text: "Foo",
          color: "blue"
        },
        {
          text: "Bar",
          color: "red"
        }
      ],
      nonce: 1,
      menu: false,
      model: [
        {
          text: "Foo",
          color: "blue"
        }
      ],
      x: 0,
      search: null,
      y: 0
    }
  },
  computed: {
    items() {
      return this.$store.state.chips.chipsList
    }
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          }

          //this.items.push(v)
          this.$store.dispatch("chips/addToChipsListAsync", v)

          this.nonce++
        }

        return v
      })
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
      if (item.header) return false

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
