<template>
  <v-layout>
    <Card :color="color">
      

      <v-tooltip slot="controlItems" transition="scale-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn flat icon color="#fff" class="deleteIcon" @click="deleteCard" v-on="on">
            <v-icon medium light>clear</v-icon>
          </v-btn >
        </template>
        <span>{{ $t("delete") }}</span>
      </v-tooltip>

      <!-- <Chips 
        slot="chips" 
        :list="tags" 
        :id="id" 
        :disabled="false" 
        :reversemap="textToId" 
        dark 
        @tag-added="tagAdded" 
        @new-tag-added="newTagAdded" 
        @chips-updated="chipsUpdated"
      /> -->

      <TagList 
        slot="chips"
        :preselected_tags="tags" 
        :editable="false" 
        :addable="false" 
        :id="id"
      />
      <!-- @selectTag="selectTag" 
        @deleteTag="deleteTag" -->

      <div slot="header">
        <h3 class="headline mb-0">{{ title }}</h3>
        <div>{{ cardText }}</div>
      </div>

      <InputText v-show="isShow"/>
    </Card>
  </v-layout>
</template>

<script>
import InputText from "./InputText.vue"
import Card from "./Card.vue"
import TagList from "./Tags"
const { colors } = require("../assets/data/colors.json")

export default {
  components: {
    InputText,
    Card,
    TagList
  },
  props: {
    id: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    title: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    },
    cardText: {
      type: String,
      required: true,
      validator: function() {
        return true
      }
    }
  },
  data() {
    return {
      isShow: false,
      isLike: false,
      buttonText: "Show Dialog"
    }
  },
  computed: {
    tags() {
      return this.$store.getters["cave/tags"](this.id)
    },
    textToId() {
      return this.$store.getters["cave/textToId"](this.id)
    },
    color: (function() {
      const length = colors.length
      return function() {
        let seed = this.cardText.slice(0, 5)
        seed = seed.split("").map(x => {
          return x.charCodeAt(0)
        })
        seed = seed.reduce((x, y) => {
          return x + y
        }, 6)
        seed %= length
        return colors[seed]
      }
    })(),
    chips() {
      return this.$store.getters["cave/tags"](this.id)
    }
  },
  methods: {
    answer() {
      this.isShow = !this.isShow
      this.isLike = !this.isLike
    },
    dismiss() {
      console.log("dismiss")
      this.isShow = false
      this.isLike = false
      this.$store.commit("waterfall/changeCard")
    },
    deleteCard() {
      this.$emit("deleteItem", this.id)
    },
    chipsUpdated({ id, text, deleted = false }) {
      if (!deleted) {
        const newPost = {
          id: this.id,
          tags: [{ [id]: text }]
        }

        this.$store.dispatch("cave/addCaveCardTagsAsync", newPost)
      } else {
        this.$store
          .dispatch("tags/removeTagAsync", {
            parent_id: this.id,
            id
          })
          .then(() => {
            this.$store.dispatch("cave/removeTagAsync", {
              id: this.id,
              tag_id: id
            })
          })
      }
    },
    newTagAdded(tagText) {
      this.$store
        .dispatch("tags/addToTagsListAsync", {
          text: tagText,
          card_id: this.id
        })
        .then(id => {
          this.chipsUpdated({ id: id, text: tagText })
        })
    },
    tagAdded(newTag) {
      this.$store
        .dispatch("tags/updateActivityAsync", {
          id: newTag.id,
          card_id: this.id
        })
        .then(() => {
          this.chipsUpdated({ id: newTag.id, text: newTag.text })
        })
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
}

.deleteIcon {
  flex-shrink: 0;
}
</style>
