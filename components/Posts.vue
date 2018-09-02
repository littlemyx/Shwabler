<template>
    <div class="cardWrapper">
      <transition name="bounce" mode="out-in">
        <WaterfallCard 
          key="first"
          v-bind:isNew="isNew"
          v-bind:title="firstTitle"
          v-bind:cardText="firstCardText"
          v-show="firstCardVisibility"
        />
      </transition>
      <transition name="bounce" mode="out-in">
        <WaterfallCard key="second" v-bind:isNew="isNew" v-bind:title="secondTitle" v-bind:cardText="secondCardText" v-show="secondCardVisibility"/>
      </transition>
    </div>
</template>

<script>
import WaterfallCard from '../components/WaterfallCard.vue';

export default {
  data () {
    return {
      isNew: true
    }
  },
  computed: {
    firstCardVisibility () { return this.$store.state.posts.firstCard; },
    secondCardVisibility () { return !this.$store.state.posts.firstCard; },
    firstTitle () { return this.$store.state.posts.cardList[0].title },
    secondTitle () { return this.$store.state.posts.cardList[1].title },
    firstCardText () { return this.$store.state.posts.cardList[0].text },
    secondCardText () { return this.$store.state.posts.cardList[1].text }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    }
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
