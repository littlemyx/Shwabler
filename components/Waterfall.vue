<template>
  <div class="cardWrapper">
    <template v-if="!isEnd">
      <transition name="bounce" mode="out-in">
        <WaterfallCard 
          v-show="firstCardVisibility"
          key="first"
          :is-new="isNew"
          :title="firstCard.title"
          :card-text="firstCard.text"
          @dismiss="dismiss"
          @accept="accept"
        />
      </transition>
      <transition name="bounce" mode="out-in">
        <WaterfallCard 
          v-show="secondCardVisibility" 
          key="second" 
          :is-new="isNew" 
          :title="secondCard.title" 
          :card-text="secondCard.text"
          @dismiss="dismiss"
          @accept="accept"
        />
      </transition>
    </template>
    <template v-if="isEnd">
      <Card color="red">
        <div slot="header" style="width:100%; text-align: center;">
          <h1>{{ endText }}</h1>
        </div>
      </Card>
    </template>
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
      isNew: true,
      endText: "No more cards yet :-("
    }
  },
  computed: {
    firstCardVisibility() {
      return this.$store.state.waterfall.isFirstCardVisible
    },
    secondCardVisibility() {
      return !this.$store.state.waterfall.isFirstCardVisible
    },
    isEnd() {
      return this.$store.state.waterfall.isEnd
    },
    firstCard() {
      return this.$store.getters["waterfall/nextCard"]
    },
    secondCard() {
      return this.$store.getters["waterfall/nextCard"]
    }
    // firstCard: {
    //   get () {
    //     const returnValue = this.$store.getters['waterfall/nextCard'];
    //     this.$store.dispatch('waterfall/increaseIndex');
    //     return returnValue;
    //   }
    // },
    // secondCard: {
    //   get () {
    //     const returnValue = this.$store.getters['waterfall/nextCard'];
    //     this.$store.dispatch('waterfall/increaseIndex');
    //     return returnValue;
    //   }
    // }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/")
    },
    accept(payload) {
      this.$store.dispatch("waterfall/uploadCardToServer", payload)
    },
    dismiss() {
      this.$store.dispatch("waterfall/increaseIndex")
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