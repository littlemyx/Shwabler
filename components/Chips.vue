<template>
  <v-combobox
    v-model="model"
    :hide-details="true"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    :disabled="disabled"
    :dark="dark"
    :label="label"
    hide-selected
    multiple
    small-chips
    solo
    background-color="transparent"
    flat
    append-icon="none"
    class="chips-combobox"
  >
    <template slot="no-data">
      <v-list-tile v-if="isResultsLoading">
        <v-progress-circular
          :size="20"
          :width="3"
          color="purple"
          indeterminate
        />
      </v-list-tile>
      <v-list-tile v-else>
        <span class="subheading">{{ isResultsLoading && "Or p" || "P" }}ress <code>Enter</code> to add tag</span>
        <v-chip
          :color="`${colors[nonce - 1]} lighten-3`"
          label
          dark
          small
          class="chip"
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
        dark
        label
        class="chip"
      >
        <span class="pr-2">
          {{ item.text | hashtagged }}
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
      slot-scope="{ index, item }"
    >
      <v-list-tile-content>
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          dark
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
          class="chip"
        >
          {{ item.text | hashtagged }}
        </v-chip>
      </v-list-tile-content>
      
    </template>
  </v-combobox>
</template>

<script>
import arrDiff from "arr-diff"

const { colors } = require("@/assets/data/colors.json")

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
    reversemap: {
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
    },
    dark: {
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
    searchItems() {
      return this.$store.getters["tags/searchItems"]
    },
    items() {
      const isSearch = Object.keys(this.searchItems).length
      if (isSearch) {
        return this.searchItems
      } else {
        return this.$store.getters["tags/items"]
      }
    },
    isResultsLoading() {
      return this.$store.state.tags.isLoading
    },
    label() {
      return this.$t("search_tag")
    },
    model: {
      get: function() {
        return this.list
      },
      set: function(val) {
        // const newVal = val.map(item => {
        //   return item.text || item
        // })
        if (this.id) {
          // СУПЕРМЕГА КОСТЫЛЬ
          if (this.model.length - val.length <= 0) {
            const newVal = val[val.length - 1]
            const newTag = this.items.find(tag => tag.text === newVal) || newVal
            if (
              typeof newTag === "string" ||
              !this.$store.getters["tags/ids"].includes(newTag.id) // TODO а вот с этим условием нужно разобраться - как определить что тэг новосозданный
            ) {
              this.$store
                .dispatch("tags/addToTagsListAsync", {
                  text: newTag,
                  card_id: this.id
                })
                .then(id => {
                  this.$emit("chips-updated", { id: id, text: newTag })
                })
            } else {
              this.$store.dispatch("tags/updateActivityAsync", {
                id: newTag.id,
                card_id: this.id
              })
            }
          } else {
            const deletedTag = arrDiff(this.model, val)
            this.$store
              .dispatch("tags/removeTagAsync", {
                parent_id: this.id,
                id: this.reversemap[deletedTag[0].text]
              })
              .then(() => {
                this.$emit("chips-updated", {
                  id: this.reversemap[deletedTag[0].text],
                  text: deletedTag[0].text,
                  deleted: true
                })
              })
          }
        }
        this.$emit("updated", val)
      }
    }
  },
  watch: {
    search: function(val) {
      this.$store.dispatch("tags/fetchSearch", val)
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

<style>
.chip {
  font-size: 15px;
}
.chips-combobox .v-input__append-inner {
  display: none;
}
</style>
>
