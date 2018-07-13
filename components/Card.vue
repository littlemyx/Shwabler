<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-card v-bind:color="color" class="white--text darken-3">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>{{card_text}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn fab dark small v-bind:color="color" class="lighten-3">
              <v-icon dark>favorite</v-icon>
            </v-btn>
            <v-btn fab dark small v-bind:color="color" class="darken-1">
              <v-icon dark>clear</v-icon>
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
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui.'
    }
  },
  computed: {
    color: (function () {
      const length = colors.length;
      return function () {
        let seed = this.card_text.slice(0, 5);
        seed = seed.split('').map((x) => {
          return x.charCodeAt(0);
        });
        seed = seed.reduce((x, y) => { return x + y });
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
