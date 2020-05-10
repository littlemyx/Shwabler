<template>
  <div class="cardWrapper">
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
    <WardrobeCard 
      v-for="card in cards"
      v-else
      :key="card.id"
      :id="card.id"
      :title="card.title"
      :card-text="card.text" 
      :tags="card.tags"
      class="wardrobeCard"
      @deleteItem="deleteItem"
    />
    <template v-if="isEmpty">
      <Card color="dark-shwabler">
        <div slot="header" style="width:100%; text-align: center;">
          <h1>{{ endText }}</h1>
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import WardrobeCard from "@/components/Tutorial/WardrobeCard.vue"
import Card from "@/components/Card.vue"

export default {
  components: {
    WardrobeCard,
    Card
  },
  data() {
    return {
      endText: "No chats..."
    }
  },
  computed: {
    cards() {
      return this.$store.getters["tutorial/appState"].cards
    },
    isLoading() {
      return false
    },
    isEmpty() {
      return false
    }
  },
  updated() {
    console.log("wardrobe list updated")
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch("userList/removeFromUserListAsync", { id })
    }
  },
  layout: "AppLayout"
}
</script>

<style scoped>
.cardWrapper {
  position: relative;
}

.wardrobeCard {
  margin-bottom: 20px;
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
