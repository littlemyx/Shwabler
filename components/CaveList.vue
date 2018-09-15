<template>
  <div class="cardWrapper">
    <CaveCard 
      :key="i"
      class="wardrobeCard"
      v-if="cards.length >= 1"
      v-for="(card, i) in cards"
      v-bind:title="card.title" 
      v-bind:cardText="card.text"
      v-bind:id="i"
      v-on:deleteItem="deleteItem"
    />
    <Card v-if="cards.length < 1" color="red">
      <div slot="header" style="width:100%; text-align: center;">
        <h1>{{ this.emptyText }}</h1>
      </div>
    </Card>
  </div>
</template>

<script>
import CaveCard from '../components/CaveCard.vue';
import Card from '../components/Card.vue';

export default {
  data () {
    return {
      emptyText: 'No cards yet :-('
    }
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  components: {
    CaveCard,
    Card
  },
  methods: {
    deleteItem (id) {
      this.$emit('deleteItem', id);
    }
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
