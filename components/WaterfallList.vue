<template>
  <div class="cardWrapper">
    <WaterfallCard 
      v-for="(card, i) in cards"
      :key="i"
      :title="card.title"
      :card-text="card.text" 
      :is-new="isNew"
      :tags="card.tags"
      class="waterfallCard"
    />
  </div>
</template>

<script>
import WaterfallCard from "../components/WaterfallCard.vue"

export default {
  components: {
    WaterfallCard
  },
  data() {
    return {
      isNew: false
    }
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
