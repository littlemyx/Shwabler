<template>
  <div class="cardWrapper">
    <WardrobeCard 
      v-for="(card, i) in cards"
      :key="i"
      :title="card.title"
      :card-text="card.text" 
      :messages="card.messages"
      class="wardrobeCard"
    />
  </div>
</template>

<script>
import WardrobeCard from "../components/WardrobeCard.vue"

export default {
  components: {
    WardrobeCard
  },
  data() {
    return {}
  },
  computed: {
    cards() {
      return this.$store.state.userList.userList
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
