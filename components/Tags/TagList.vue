<template>
  <div 
    ref="wrapper"
    class="wrapper" 
    tabindex="0" 
    @focus.capture="focusHandler" 
    @blur.capture="blurHandler"
  >
    <div class="inputWrapper">
      <span 
        v-for="tag in Object.keys(selectedTags)" 
        :key="`selected-${tag}`" 
        class="selectedTag" >
        <Tag 
          :text="selectedTags[tag]" 
          :id="tag"
          :deletable="editable"
          @tagDeleted="deleteSelectedTagHandler"
        />
      </span>
      <input 
        v-if="editable"
        v-model="value"
        :placeholder="placeholder"
        class="tagInput" 
        @keypress.enter.capture="addTag">
    </div>
    <div v-if="isSuggestOpen" class="suggestsWrapper">
      <div class="suggests">
        <div v-if="isTagsLoading"> 
          <div class="loaderWrapper">
            <v-progress-circular
              :size="48"
              :width="7"
              color="dark-shwabler"
              indeterminate
            />
          </div>
        </div>
        <template v-else >
          <ul v-if="Object.keys(tagsPull).length" class="list" >
            <li v-ripple v-for="tag in Object.keys(tagsPull)" :key="tag" class="item" >
              <ListItem :id="tag" @itemClicked="tagSelectedHandler">
                <Tag slot="item" :text="tagsPull[tag]" :id="tag" />
              </ListItem>
            </li>
          </ul>
          <template v-else>
            <div v-if="addable" class="loaderWrapper" >
              <span>Press <code>Enter</code> to add <Tag :text="value" /></span>
            </div>
            <div v-else class="loaderWrapper" >
              <span>{{ $t("no_tag") }}</span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag"
import ListItem from "./ListItem"

export default {
  components: { Tag, ListItem },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    incoming_items: {
      type: Object,
      required: true
    },
    preselected_tags: {
      type: Object,
      required: true
    },
    addable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: "",
      isFocused: false,
      timeoutId: null,
      isTagsLoading: false,
      selectedTags: this.preselected_tags,
      tagsPull: this.incoming_items,
      justSelectedTagKey: null
    }
  },
  computed: {
    classObject() {
      return {
        messageWrapper: true,
        messageAuthor: this.author === this.$store.getters["user/userId"]
      }
    },
    isSuggestOpen() {
      return this.editable && this.isFocused
    }

    // tagsPull() {
    //   return this.incoming_items.filter(value => !this.selectedTags.includes(value))
    // }
  },
  watch: {
    value: function() {
      this.isTagsLoading = true
      this.$store.dispatch("tags/fetchSearch", this.value).then(() => {
        if (!this.value.length) {
          this.tagsPull = this.$store.getters["tags/popular"]
        } else {
          this.tagsPull = this.incoming_items
        }
        this.isTagsLoading = false
      })
    },
    selectedTags: function() {
      const filtered = { ...this.tagsPull }
      if (this.justSelectedTagKey) {
        delete filtered[this.justSelectedTagKey]
        this.tagsPull = filtered
        this.justSelectedTagKey = null
      }
    },
    isFocused: function(newState, oldState) {
      const filtered = {}
      let tmp
      let comparator
      if (!this.value) {
        tmp = this.$store.getters["tags/popular"]
        comparator = key => {
          return !this.selectedTags[key]
        }
      } else {
        tmp = this.incoming_items
        comparator = key => {
          return !tmp[key].includes(this.value) && !this.selectedTags[key]
        }
      }
      Object.keys(tmp).forEach(key => {
        if (comparator(key)) {
          filtered[key] = tmp[key]
        }
      })
      this.tagsPull = filtered
      if (newState !== oldState && newState === false) {
        this.$emit("blurred")
      }
    }
  },
  methods: {
    fetchTags() {
      setTimeout(
        function() {
          this.isTagsLoading = false
          this.tagsPull = this.incoming_items.filter(
            value =>
              value.includes(this.value) && !this.selectedTags.includes(value)
          )
        }.bind(this),
        1000
      )
    },
    blurHandler() {
      this.timeoutId = setTimeout(() => {
        if (this.isFocused) {
          this.isFocused = false
        }
      }, 0)
    },
    focusHandler() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      if (!this.isFocused) {
        this.isFocused = true
      }
    },
    deleteSelectedTagHandler(event) {
      const filtered = { ...this.selectedTags }
      delete filtered[event]
      this.selectedTags = filtered
      this.$emit("deleteTag", { id: event })
    },
    addTag() {
      // this.tagsPull = [...this.tagsPull, this.value]
      this.$emit("tagAdd", this.value)
    },
    tagSelectedHandler(event) {
      this.justSelectedTagKey = event
      this.selectedTags = {
        ...this.selectedTags,
        [event]: this.tagsPull[event]
      }
      this.$emit("selectTag", { key: event, value: this.tagsPull[event] })
    }
  }
}
</script>

<style scoped>
.wrapper {
  z-index: 2;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 40px;
  outline: none;
  margin: 6px 8px;
}
.inputWrapper {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  line-height: 18px;
}
.list {
  margin: 0;
  padding: 8px 0;
}
.item {
  cursor: pointer;
  width: 50px;
  list-style-type: none;
  margin-left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 48px;
  align-items: center;
  color: inherit;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  height: 48px;
  margin: 0;
  padding: 0 16px;
  position: relative;
  transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.item:hover {
  background: rgba(0, 0, 0, 0.04);
}
.tagInput {
  flex: 1 1;
  width: 100%;
  height: 40px;
  min-width: 100px;
  display: block;
  outline: none;
  border: 0;
  background-color: transparent;
  font-size: 16px;
  padding-left: 8px;
}
.suggestsWrapper {
  position: relative;
}
.suggests {
  width: 100%;
  position: absolute;
  max-height: 300px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.selectedTag {
  display: inline-flex;
  min-width: 50px;
  flex: 0 1 auto;
}

.loaderWrapper {
  padding: 8px 16px;
  display: flex;
  height: 48px;
  justify-content: center;
}
</style>
