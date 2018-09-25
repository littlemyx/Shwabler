<template>
  <v-layout>
    <Card v-bind:color="color">
      <v-btn slot="controlItems" flat icon color="black" class="deleteIcon" @click="deleteCard">
        <v-icon medium dark>clear</v-icon>
      </v-btn>

      <div slot="header">
        <h3 class="headline mb-0">{{ this.title }}</h3>
        <div>{{ this.cardText }}</div>
      </div>

      <InputText v-show="isShow"/>

      <div class="footer" slot="footer">
        <v-btn v-bind:color="color" class="darken-1 ml-3" @click="answer">
          <v-icon v-bind:color="isLike ? 'red' : ''" medium dark>favorite</v-icon>
        </v-btn>
        <v-btn v-bind:color="color" class="darken-1 mr-3" @click="dismiss">
          <v-icon medium dark>clear</v-icon>
        </v-btn>
      </div>
    </Card>
  </v-layout>
</template>

<script>
import InputText from './InputText.vue';
import Card from './Card.vue';
const {colors} = require('../assets/data/colors.json');

export default {
  props: {
    id: {
      type: Number,
      required: true,
      validator: function (value) {
        return true;
      }
    },
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
    answer () {
      this.isShow = !this.isShow;
      this.isLike = !this.isLike;
    },
    dismiss () {
      console.log('dismiss');
      this.isShow = false;
      this.isLike = false;
      this.$store.commit('waterfall/changeCard');
    },
    deleteCard () {
      this.$emit('deleteItem', this.id);
    }
  },
  components: {
    InputText,
    Card
  }
}
</script>

<style scoped>
.footer{
  width: 100%;
  display: flex;
}
.deleteIcon{
  position: absolute;
  right: 5px;
}
</style>
