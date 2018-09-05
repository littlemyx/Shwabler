<template>
  <v-layout>
    <Card v-bind:color="color">
      <div slot="header">
        <h3 class="headline mb-0">{{ this.title }}</h3>
        <div>{{ this.cardText }}</div>
      </div>

      <DialogBody v-show="isShow" v-bind:messages="messages" v-bind:color="color"/>

      <v-btn slot="footer" dark v-bind:color="color" class="lighten-1" @click="toggleDialogVisibility" block>
        {{ this.buttonText }}
      </v-btn>
    </Card>
  </v-layout>
</template>

<script>
import Card from './Card.vue';
import DialogBody from './DialogBody.vue';
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
    messages: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isShow: false,
      isLike: false,
      buttonText: 'Show Dialog'
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
    toggleDialogVisibility () {
      this.isShow = !this.isShow;
      this.buttonText = this.isShow ? 'Hide Dialog' : 'Show Dialog';
    },
    dismiss () {
      console.log('dismiss');
      this.isShow = false;
      this.isLike = false;
      this.$store.commit('posts/changeCard');
    }
  },
  components: {
    DialogBody,
    Card
  }
}
</script>
