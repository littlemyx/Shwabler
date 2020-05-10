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
    <template v-else>
      <template v-if="cards.length >= 1">
        <CaveCard 
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :card-text="card.text" 
          :id="card.id"
          class="wardrobeCard"
          @deleteItem="deleteItem"
        />
      </template>
      <Card v-if="cards.length < 1" color="shwabler">
        <div slot="header" style="width:100%; text-align: center;">
          <h1>{{ emptyText }}</h1>
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import CaveCard from "@/components/CaveCard.vue"
import Card from "@/components/Card.vue"

export default {
  components: {
    CaveCard,
    Card
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      emptyText: "No cards yet :-("
    }
  },
  computed: {
    isLoading() {
      return false
    }
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch("cave/removeFromCaveListAsync", { id })
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
