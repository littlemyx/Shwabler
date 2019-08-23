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
        v-for="tag in Object.keys(preselected_tags)" 
        :key="`selected-${tag}`" 
        class="selectedTag" >
        <Tag 
          :text="preselected_tags[tag]" 
          :id="tag"
          :deletable="editable"
          @tagDeleted="deleteSelectedTagHandler"
        />
      </span>
      <input 
        v-if="editable"
        ref="inputRef"
        :value="value"
        :placeholder="placeholder"
        class="tagInput"
        @input="valueChangeHandler" 
        @keypress.enter.capture="enterHandler">
    </div>
    <div v-if="isSuggestOpen" class="suggestsWrapper">
      <div class="suggests">
        <div v-if="isTagsLoading"> 
          <div class="loaderWrapper">
            <v-progress-circular
              :size="30"
              :width="3"
              color="dark-shwabler"
              indeterminate
            />
          </div>
        </div>
        <template v-else >
          <template v-if="!existingTagId && value.length">
            <div v-if="addable" class="loaderWrapper" >
              <span>Press <code>Enter</code> to add <Tag :id="value" :text="value" /></span>
            </div>
            <div v-else class="loaderWrapper" >
              <span>{{ $t("no_tag") }}</span>
            </div>
          </template>
          <ul v-if="Object.keys(tagsPull).length" class="list" >
            <li v-ripple v-for="tag in Object.keys(tagsPull)" :key="tag" class="item" >
              <ListItem :id="tag" @itemClicked="tagSelectedHandler">
                <Tag slot="item" :text="tagsPull[tag]" :id="tag" />
              </ListItem>
            </li>
          </ul>
         
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
    init_value: {
      type: String,
      default: () => ""
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value: this.init_value,
      isFocused: false,
      timeoutId: null,
      isTagsLoading: false,
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
    },
    existingTagId() {
      const pull = Object.keys(this.tagsPull)
      const id =
        pull[pull.findIndex(index => this.tagsPull[index] === this.value)]
      return id !== -1 ? id : null
    }
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
    init_value: function(newValue) {
      this.value = newValue
    },

    preselected_tags: function() {
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
          return !this.preselected_tags[key]
        }
      } else {
        tmp = this.incoming_items
        comparator = key => {
          return tmp[key].includes(this.value) && !this.preselected_tags[key]
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
  beforeDestroy() {
    console.log("test")
  },
  methods: {
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
      // const filtered = { ...this.preselected_tags }
      // delete filtered[event]
      // this.preselected_tags = filtered
      this.$emit("deleteTag", { id: event })
    },
    valueChangeHandler(event) {
      this.value = event.target.value
      this.$emit("valueChanged", this.value)
    },
    enterHandler() {
      if (this.existingTagId) {
        this.tagSelectedHandler(this.existingTagId)
      } else {
        this.addTag()
      }
    },
    addTag() {
      const id = this.value
      this.$emit("tagAdd", { id, text: this.value })
      this.value = ""
      this.$refs.inputRef.focus()
    },
    tagSelectedHandler(event) {
      this.justSelectedTagKey = event
      this.$emit("selectTag", { id: event, text: this.tagsPull[event] })
      this.value = ""
      this.$refs.inputRef.focus()
    }
  }
}
</script>

<style scoped>
.wrapper {
  z-index: 1;
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
