<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-slide-y-transition>
        <v-card v-bind:color="color" class="white--text darken-3 card">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ this.title }}</h3>
              <div>{{ this.cardText }}</div>
            </div>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text v-show="show">
              <v-textarea
                dark
                name="input-7-1"
                label="Place your answer here"
                auto-grow
                counter=110
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              ></v-textarea>
            </v-card-text>
          </v-slide-y-transition>

          <v-card-actions v-if="isNew">
            <v-btn fab dark v-bind:color="color" class="lighten-3 ml-3" @click="answer">
              <v-icon v-bind:color="[isLike ? 'red' : '']" medium dark>favorite</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab dark v-bind:color="color" class="darken-1 mr-3" @click="dismiss">
              <v-icon medium dark>clear</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-actions v-if="!isNew">
            <v-btn  dark v-bind:color="color" class="lighten-3" @click="answer" block>Show Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-y-transition>
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
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      show: false,
      isLike: false
    };
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
    MessageCard
  }
}
</script>
