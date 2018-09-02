<template>
    <div class="cardWrapper">
      <WaterfallCard 
        :key="i"
        class="waterfallCard"
        v-for="(card, i) in cards"
        v-bind:title="card.title" 
        v-bind:cardText="card.text"
        v-bind:isNew="isNew"
      />
    </div>
</template>

<script>
import WaterfallCard from '../components/WaterfallCard.vue';

export default {
  data () {
    return {
      isNew: false
    }
  },
  computed: {
    cards () { return this.$store.state.userList.userList; }
  },
  components: {
    WaterfallCard
  },
  layout: 'AppLayout'
}
</script>

<style scoped>
.cardWrapper {
  position: relative;
}

.bounce-enter-active {
  animation: bounce-in .5s;
  top: 0;
  position: absolute;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
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
