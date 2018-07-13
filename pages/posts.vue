<template>
    <div>
        <Card></Card>
        <button @click="goBack">
          Back
        </button>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
export default {
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