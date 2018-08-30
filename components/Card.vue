<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-slide-y-transition>
        <v-card v-bind:color="color" class="white--text darken-3 card">
          <v-card-title primary-title>
            <slot name="header"></slot>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text>
              <slot></slot>
            </v-card-text>
          </v-slide-y-transition>

          <v-card-actions>
            <slot name="footer"></slot>
          </v-card-actions>
        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import WardrobeCard from './WardrobeCard.vue';
import MessageCard from '../components/MessageCard.vue';
// const {colors} = require('../assets/data/colors.json');

export default {
  props: {
    color: {
      type: String,
      required: false,
      validator: function (value) {
        return true;
      }
    }
  },
  data () {
    return {
      show: false,
      isLike: false
    };
  },
  // computed: {
  //   color: (function () {
  //     const length = colors.length;
  //     return function () {
  //       let seed = this.cardText.slice(0, 5);
  //       seed = seed.split('').map((x) => {
  //         return x.charCodeAt(0);
  //       });
  //       seed = seed.reduce((x, y) => { return x + y }, 6);
  //       seed %= length;
  //       return colors[seed];
  //     }
  //   }())
  // },
  methods: {
    answer () {
      this.show = !this.show;
      this.isLike = !this.isLike;
    },
    dismiss () {
      console.log('dismiss');
      this.show = false;
      this.isLike = false;
      this.$store.commit('posts/changeCard');
    }
  },
  components: {
    MessageCard,
    WardrobeCard
  }
}
</script>
