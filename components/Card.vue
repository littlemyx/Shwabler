<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-card v-bind:color="color" class="white--text darken-3">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ this.title }}</h3>
              <div>{{ this.cardText }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn fab dark v-bind:color="color" class="lighten-3 ml-3">
              <v-icon medium dark>favorite</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab dark v-bind:color="color" class="darken-1 mr-3">
              <v-icon medium dark>clear</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import MessageCard from '../components/MessageCard.vue';
const {colors} = require('../assets/data/colors.json');

export default {
  props: {
    title: {
      type: String,
      required: true,
      validator: function (value) {
        return true;
      }
    },
    cardText: {
      type: String,
      required: true,
      validator: function (value) {
        return true;
      }
    }
  },
  computed: {
    color: (function () {
      const length = colors.length;
      return function () {
        let seed = this.cardText.slice(0, 5);
        seed = seed.split('').map((x) => {
          return x.charCodeAt(0);
        });
        seed = seed.reduce((x, y) => { return x + y }, 6);
        seed %= length;
        return colors[seed];
      }
    }())
  },
  components: {
    MessageCard
  }
}
</script>
