<template>
    <div class="cardWrapper">
      <template v-if="!isEnd">
        <transition name="bounce" mode="out-in">
          <WaterfallCard 
            key="first"
            v-bind:isNew="isNew"
            v-bind:title="firstCard.title"
            v-bind:cardText="firstCard.text"
            v-show="firstCardVisibility"
            v-on:dismiss="dismiss"
          />
        </transition>
        <transition name="bounce" mode="out-in">
          <WaterfallCard 
            key="second" 
            v-bind:isNew="isNew" 
            v-bind:title="secondCard.title" 
            v-bind:cardText="secondCard.text" 
            v-show="secondCardVisibility"
            v-on:dismiss="dismiss"
          />
        </transition>
      </template>
      <template v-if="isEnd">
        <Card color="red">
          <div slot="header" style="width:100%; text-align: center;">
            <h1>{{ this.endText }}</h1>
          </div>
        </Card>
      </template>
    </div>
</template>

<script>
import WaterfallCard from '../components/WaterfallCard.vue';

export default {
  data () {
    return {
      isNew: true,
      endText: 'No more cards yet :-('
    }
  },
  computed: {
    firstCardVisibility () { return this.$store.state.posts.isFirstCardVisible; },
    secondCardVisibility () { return !this.$store.state.posts.isFirstCardVisible; },
    isEnd () { return this.$store.state.posts.isEnd; },
    firstCard () { return this.$store.getters['posts/nextCard']; },
    secondCard () { return this.$store.getters['posts/nextCard']; }
    // firstCard: {
    //   get () {
    //     const returnValue = this.$store.getters['posts/nextCard'];
    //     this.$store.dispatch('posts/increaseIndex');
    //     return returnValue;
    //   }
    // },
    // secondCard: {
    //   get () {
    //     const returnValue = this.$store.getters['posts/nextCard'];
    //     this.$store.dispatch('posts/increaseIndex');
    //     return returnValue;
    //   }
    // }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    },
    dismiss () {
      this.$store.commit('posts/changeCard');
      this.$store.dispatch('posts/increaseIndex');
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
