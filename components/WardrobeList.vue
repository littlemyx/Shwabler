<template>
  <div class="cardWrapper">
    <template v-if="isLoading">
      <Card color="green">
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
      v-for="(card, i) in cards"
      v-else
      :key="i"
      :id="card.id"
      :title="card.title"
      :card-text="card.text" 
      :messages="card.messages"
      :tags="card.tags"
      class="wardrobeCard"
    />
    <template v-if="isEmpty">
      <Card color="red">
        <div slot="header" style="width:100%; text-align: center;">
          <h1>{{ endText }}</h1>
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import WardrobeCard from "./WardrobeCard.vue"
import Card from "./Card.vue"

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
      return this.$store.state.userList.userList
    },
    isLoading() {
      return this.$store.state.userList.isLoading
    },
    isEmpty() {
      return this.$store.state.userList.isEmpty
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
