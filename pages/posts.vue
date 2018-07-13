<template>
    <div>
        <Card v-bind:title="title" v-bind:cardText="cardText"></Card>
        <v-btn depressed color="error" @click="goBack">
          Back
        </v-btn>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
export default {
  data () {
    return {
      title: 'Мама мыла раму',
      cardText: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui.'
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