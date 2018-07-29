<template>
    <div>
        <div>
          <Card v-bind:title="title" v-bind:cardText="cardText" />
        </div>
        <v-btn depressed color="error" @click="goBack">
          Back
        </v-btn>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
const posts = require('../assets/data/posts.json');

export default {
  data () {
    return {
      title: posts[0].title,
      cardText: posts[0].text
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    }
  },
  components: {
    Card
  }
}
</script>