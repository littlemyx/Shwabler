<template>
  <div>
    <CaveList :cards="cards"/>

    <v-btn :disabled="isNewCardAdding" fab dark class="add dark-gray mr-3" @click="openDialog">
      <v-progress-circular
        v-if="isNewCardAdding"
        :size="30"
        :width="5"
        color="white"
        indeterminate
      />
      <v-icon v-else class="addIcon" medium dark>add</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <Card :new-card-values="newCard" :layoutedt-style="false" class-name="darken-3 card" color="gray">

        <TagList 
          slot="chips" 
          :incoming_items="searchTags"
          :preselected_tags="searchedTags" 
          :addable="true" 
          :placeholder="$t('search_tag')"
          :init_value="newCardTagsText" 
          @selectTag="selectTag" 
          @tagAdd="tagAdd" 
          @deleteTag="deleteTag"
          @valueChanged="valueChanged"
        >
          <v-btn slot="left" :disabled="!Object.keys(searchedTags).length" text icon @click="clear">
            <v-icon>clear</v-icon>
          </v-btn>
        </TagList>

        <InputText 
          slot="header"
          :value="newCardTitle"
          :dark="false"
          :counter="50"
          :label="$t('newCardPlaceholderHead')"
          color="dark-shwabler"
          @input="inputTitle"
        />

        <InputText 
          :value="newCardText"
          :dark="false"
          :counter="400"
          :label="$t('newCardPlaceholderBody')"
          color="dark-shwabler"
          @input="inputText"
        />
      
        <template slot="footer">
          <v-spacer/>
          <v-btn
            color="dark-shwabler darken-1"
            flat
            @click="cancel"
          >
            {{ $t("cancel") }}
          </v-btn>
          <v-btn
            color="dark-shwabler darken-1"
            flat
            @click="addNewCard"
          >
            {{ $t("create") }}
          </v-btn>
        </template>
      </Card>
    </v-dialog>
  </div>
</template>

<router lang="yaml">
    path: /cards
</router>

<script>
import CaveList from "../components/CaveList.vue"
import Card from "../components/Card.vue"
import Chips from "../components/Chips.vue"
import TagList from "../components/Tags"
import InputText from "../components/InputText.vue"
// <InputText label="Header of your card" slot-scope="head" slot="header" v-bind:value="head.value.title" v-bind:dark="false" v-bind:counter="50"/>
// <InputText label="Main plot goes here" v-model="newCard.text" v-bind:dark="false" v-bind:counter="400"/>
export default {
  components: {
    Card,
    CaveList,
    Chips,
    InputText,
    TagList
  },
  data() {
    return {
      dialog: false,
      newCard: {
        title: "",
        text: ""
      },
      newCardTagsText: "",
      isNewCardAdding: false,
      newCardTags: [],
      newCardNewTags: [],
      isNewCardLoading: false
    }
  },
  // fetch({ store }) {
  //   // const list = require('../assets/data/caveList.json');
  //   // store.commit('cave/setCaveList', list);
  // },
  computed: {
    newCardTitle() {
      return this.$store.state.cave.newCardTitle
    },
    newCardText() {
      return this.$store.state.cave.newCardText
    },
    cards() {
      return this.$store.state.cave.caveList
    },
    searchTags() {
      return this.$store.getters["tags/result"]
    },
    searchedTags() {
      return this.$store.getters["cave/searchedTags"]
    },
    newTags() {
      return this.$store.getters["cave/newTags"]
    }
  },
  watch: {
    dialog(value) {
      !value && this.cancel()
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
      this.$store.commit("cave/setNewCardTitle", "")
      this.$store.commit("cave/setNewCardText", "")
    },
    tagAdd(event) {
      this.$store.commit("cave/addNewTag", event)
      this.selectTag(event)
    },
    async addNewCard() {
      this.isNewCardAdding = true
      this.dialog = false
      const tmpTags = { ...this.searchedTags }
      const list = Object.keys(this.newTags).map(tag => this.newTags[tag])
      const newPost = {
        tags: [],
        title: this.newCardTitle,
        text: this.newCardText,
        author_id: this.$store.getters["user/userId"]
      }

      const id = await this.$store.dispatch("cave/updateCaveListAsync", [
        newPost
      ])

      const newTagsIds = await this.$store.dispatch(
        "tags/addListToTagsListAsync",
        {
          id,
          list
        }
      )

      await Promise.all(
        Object.keys(newTagsIds).map(tagId => {
          return this.$store.dispatch("tags/updateActivityAsync", {
            id: tagId,
            card_id: id
          })
        })
      )

      Object.keys(newTagsIds).forEach(tagId => {
        const oldId = tmpTags[newTagsIds[tagId]]
        if (oldId) {
          delete tmpTags[newTagsIds[tagId]]
        }
        tmpTags[tagId] = newTagsIds[tagId]
      })

      this.$store.commit("cave/setSearchTags", tmpTags)

      await this.$store.dispatch("cave/addCaveCardTagsAsync", {
        id,
        tags: Object.keys(this.searchedTags).map(tagId => ({
          [tagId]: this.searchedTags[tagId]
        }))
      })

      this.$store.commit("cave/setSearchTags", {})
      this.$store.commit("cave/setNewTags", {})
      this.isNewCardAdding = false
    },
    add() {
      this.isNewCardLoading = true
      const newPost = {
        tags: [],
        title: this.newCardTitle,
        text: this.newCardText,
        author_id: this.$store.getters["user/userId"]
      }
      this.$store
        .dispatch("cave/updateCaveListAsync", [newPost])
        .then(async id => {
          await Promise.all(
            Object.keys(this.searchedTags).map(newTag => {
              return this.$store
                .dispatch("tags/addToTagsListAsync", {
                  text: this.searchedTags(newTag).text,
                  card_id: id
                })
                .then(newTagId => {
                  this.chipsUpdated({
                    parent_id: id,
                    id: newTagId,
                    text: this.searchedTags(newTag).text
                  })
                })
            })
          )
          await Promise.all(
            this.newCardTags.map(tag => {
              return this.$store
                .dispatch("tags/updateActivityAsync", {
                  id: tag.id,
                  card_id: id
                })
                .then(() => {
                  this.chipsUpdated({
                    parent_id: id,
                    id: tag.id,
                    text: tag.text
                  })
                })
            })
          )
          this.dialog = false
          this.newCardTags = []
          this.isNewCardLoading = false
        })
    },
    deleteTag(event) {
      // const deletedIndex = this.selectedTags.findIndex(
      //   tag => tag.id === event.id
      // )
      // const newArray = [...this.selectedTags]
      // newArray.splice(deletedIndex, 1)
      // this.selectedTags = newArray
      this.$store.commit("cave/removeTagById", event.id)
    },
    selectTag(event) {
      this.$store.commit("cave/setSearchTags", {
        ...this.searchedTags,
        [event.id]: event.text
      })
    },
    clear() {
      this.$store.commit("cave/setSearchTags", {})
    },
    cancel() {
      this.dialog = false
      this.newCardTagsText = ""
      this.$store.commit("cave/setSearchTags", {})
      this.$store.commit("cave/setNewTags", {})
    },
    inputTitle(value) {
      this.$store.commit("cave/setNewCardTitle", value)
    },
    inputText(value) {
      this.$store.commit("cave/setNewCardText", value)
    },
    newCardTagsUpdated(tag) {
      this.newCardTags = tag
    },
    chipsUpdated({ parent_id, id, text, deleted = false }) {
      if (!deleted) {
        const newPost = {
          id: parent_id,
          tags: [{ [id]: text }]
        }

        this.$store.dispatch("cave/addCaveCardTagsAsync", newPost)
      } else {
        if (id) {
          this.$store
            .dispatch("tags/removeTagAsync", {
              parent_id: parent_id,
              id
            })
            .then(() => {
              this.$store.dispatch("cave/removeTagAsync", {
                id: parent_id,
                tag_id: id
              })
            })
        } else {
          const newTagIndex = this.newCardNewTags.findIndex(
            tag => tag.text === text
          )
          if (newTagIndex !== -1) {
            const newTagArray = [...this.newCardNewTags]
            newTagArray.splice(newTagIndex, 1)
            this.newCardNewTags = newTagArray
          }

          const tagIndex = this.newCardTags.findIndex(tag => tag.text === text)
          if (tagIndex !== -1) {
            const tagArray = [...this.newCardTags]
            tagArray.splice(tagIndex, 1)
            this.newCardTags = tagArray
          }
        }
      }
    },
    newTagAdded(tagText) {
      this.newCardNewTags = [
        ...this.newCardNewTags,
        { text: tagText, color: "red", id: 0 }
      ]
    },
    tagAdded(newTag) {
      this.newCardTags = [...this.newCardTags, newTag]
    },
    valueChanged(event) {
      this.newCardTagsText = event
    }
  },
  layout: "AppLayout"
}
</script>

<style scoped>
.add {
  position: fixed;
  bottom: 7vh;
  right: 1vw;
  opacity: 0.8;
}

.addIcon {
  line-height: 56px;
}

.add2 {
  position: fixed;
  bottom: 40px;
  right: 140px;
  opacity: 0.8;
}

.add:hover {
  opacity: 1;
}

.dialogHeader {
  width: 100%;
}
.newCardLoaderWrapper {
  width: 500px;
  height: 60%;
  position: absolute;
  z-index: 10;
}

.newCardLoader {
  width: 500px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  width: 100%;
}
</style>
