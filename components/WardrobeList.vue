<template>
    <div class="cardWrapper">
      <WardrobeCard 
        :key="i"
        class="wardrobeCard"
        v-for="(card, i) in cards"
        v-bind:title="card.title" 
        v-bind:cardText="card.text"
      />
    </div>
</template>

<script>
import WardrobeCard from '../components/WardrobeCard.vue';

export default {
  data () {
    return {
    }
  },
  computed: {
    cards () { return this.$store.state.userList.userList; }
  },
  components: {
    WardrobeCard
  },
  layout: 'AppLayout'
}
</script>

<style scoped>
.cardWrapper {
  position: relative;
}

.wardrobeCard{
  margin-bottom: 20px;
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
