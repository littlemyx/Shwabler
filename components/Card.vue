<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-card v-bind:color="color" class="white--text">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>{{card_text}}</div>
            </div>
          </v-card-title>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import MessageCard from '../components/MessageCard.vue';
const colors = [
  'red',
  'pink',
  'purple',
  'indigo',
  'green'
];

export default {
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui.'
    }
  },
  computed: {
    color: function () {
      const length = colors.length;
      return colors[Math.round(-0.5 + Math.random() * (length + 1))] + ' darken-3';
    }
  },
  components: {
    MessageCard
  }
}
</script>
