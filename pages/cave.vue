<template>
  <div>
    <CaveList :cards="cards"/>

    <v-btn fab dark class="add dark-gray mr-3" @click="openDialog">
      <v-icon class="addIcon" medium dark>add</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <div v-if="isNewCardLoading">Loading</div>
      <!-- тут эта хрень выперает потому что в скрытом состоянии крестик в чипсах делается широким почему-то  -->
      <Card :new-card-values="newCard" :layoutedt-style="false" color="gray">
        <Chips id="0" slot="chips" :list="[...newCardTags, ...newCardNewTags]" @updated="newCardTagsUpdated" @tag-added="tagAdded" @new-tag-added="newTagAdded" @chips-updated="chipsUpdated"/>

        <InputText 
          slot="header"
          :value="newCardTitle"
          :dark="false"
          :counter="50"
          color="indigo darken-3"
          label="Header of your card"
          @input="inputTitle"
        />

        <InputText 
          :value="newCardText"
          :dark="false"
          :counter="400"
          color="indigo darken-3"
          label="Main plot goes here"
          @input="inputText"
        />
      
        <template slot="footer">
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="add"
          >
            Add
          </v-btn>
        </template>
      </Card>
    </v-dialog>
  </div>
</template>

<script>
import CaveList from "../components/CaveList.vue"
import Card from "../components/Card.vue"
import Chips from "../components/Chips.vue"
import InputText from "../components/InputText.vue"
// <InputText label="Header of your card" slot-scope="head" slot="header" v-bind:value="head.value.title" v-bind:dark="false" v-bind:counter="50"/>
// <InputText label="Main plot goes here" v-model="newCard.text" v-bind:dark="false" v-bind:counter="400"/>
export default {
  components: {
    Card,
    CaveList,
    Chips,
    InputText
  },
  data() {
    return {
      dialog: false,
      newCard: {
        title: "",
        text: ""
      },
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
            this.newCardNewTags.map(newTag => {
              return this.$store
                .dispatch("tags/addToTagsListAsync", {
                  text: newTag.text,
                  card_id: id
                })
                .then(newTagId => {
                  this.chipsUpdated({
                    parent_id: id,
                    id: newTagId,
                    text: newTag.text
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
    cancel() {
      this.dialog = false
      this.newCardTags = []
      this.newCardNewTags = []
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

.footer {
  width: 100%;
}
</style>
