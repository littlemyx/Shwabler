<template>
  <div class="cardWrapper">
    <div class="tagsWrapper flex xs12 sm6 offset-sm3">
      <TagList 
        :incoming_items="searchTags" 
        :addable="false" 
        :placeholder="$t('search_tag')" 
        @selectTag="selectTag" 
        @deleteTag="deleteTag"
        @blurred="closeTagSearchHandler"
      />
      
    </div>
    <template v-if="isLoading">
      <Card color="dark-shwabler">
        <div slot="header" style="width:100%; text-align: center;">
          <v-progress-circular
            :size="60"
            :width="7"
            color="white"
            indeterminate
          />
        </div>
      </Card>
    </template>
    <template v-if="!isLoading">
      <template v-if="!isEnd">
        <transition name="bounce" mode="out-in">
          <WaterfallCard 
            v-show="firstCardVisibility"
            key="first"
            :id="firstCard.id"
            :author_id="firstCard.author_id"
            :is-new="isNew"
            :title="firstCard.title"
            :card-text="firstCard.text"
            @dismiss="discard"
          />
        </transition>
        <transition name="bounce" mode="out-in">
          <WaterfallCard 
            v-show="secondCardVisibility" 
            key="second" 
            :id="secondCard.id"
            :author_id="secondCard.author_id"
            :is-new="isNew" 
            :title="secondCard.title" 
            :card-text="secondCard.text"
            @dismiss="discard"
          />
        </transition>
      </template>
      <template v-if="isEnd">
        <Card color="dark-shwabler">
          <div slot="header" style="width:100%; text-align: center;">
            <h1>{{ endText }}</h1>
          </div>
        </Card>
      </template>
    </template>
  </div>
</template>

<script>
import WaterfallCard from "./WaterfallCard.vue"
import Card from "./Card.vue"
import Chips from "./Chips.vue"
import TagList from "./Tags"

export default {
  components: {
    WaterfallCard,
    Card,
    TagList,
    Chips
  },
  data() {
    return {
      isNew: true,
      endText: "No more cards yet :-(",
      loadingText: "Loading...",
      selectedTags: [],
      selectedListChanged: false
    }
  },

  computed: {
    firstCardVisibility() {
      return this.$store.state.waterfall.isFirstCardVisible
    },
    secondCardVisibility() {
      return !this.$store.state.waterfall.isFirstCardVisible
    },
    isEnd() {
      return this.$store.state.waterfall.isEnd
    },
    isLoading() {
      return this.$store.state.waterfall.isLoading
    },
    firstCard() {
      return this.$store.getters["waterfall/nextCard"]
    },
    secondCard() {
      return this.$store.getters["waterfall/nextCard"]
    },
    searchTags() {
      return this.$store.getters["tags/result"]
    }
    // firstCard: {
    //   get () {
    //     const returnValue = this.$store.getters['waterfall/nextCard'];
    //     this.$store.dispatch('waterfall/increaseIndex');
    //     return returnValue;
    //   }
    // },
    // secondCard: {
    //   get () {
    //     const returnValue = this.$store.getters['waterfall/nextCard'];
    //     this.$store.dispatch('waterfall/increaseIndex');
    //     return returnValue;
    //   }
    // }
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/")
    },
    discard() {
      this.$store.dispatch("waterfall/increaseIndex")
      console.log("next card")
    },
    deleteTag(event) {
      const deletedIndex = this.selectedTags.findIndex(
        tag => tag.id === event.id
      )
      const newArray = [...this.selectedTags]
      newArray.splice(deletedIndex, 1)
      this.selectedTags = newArray
    },
    selectTag(event) {
      // this.$store.commit("waterfall/setSearchTags", val)
      this.selectedListChanged = true
      this.selectedTags = [...this.selectedTags, { id: event.key }]
    },
    search() {
      this.selectedListChanged = false
      if (this.selectedTags.length) {
        this.$store.dispatch("waterfall/findByTag", this.selectedTags)
      } else {
        this.$store.dispatch("waterfall/fetchCardsWithMatches")
      }
    },
    closeTagSearchHandler() {
      if (this.selectedListChanged) {
        this.search()
      }
    }
  },
  layout: "AppLayout"
}
</script>

<style scoped>
.tagsWrapper {
  display: flex;
}

.cardWrapper {
  position: relative;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
  top: 0;
  position: absolute;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes height-increase {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
