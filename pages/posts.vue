<template>
    <div>
        <div>
          <Posts />
        </div>
        <v-btn depressed color="error" @click="goBack">
          Back
        </v-btn>
    </div>
</template>

<script>
import Posts from '../components/Posts.vue';

export default {
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    }
  },
  components: {
    Posts
  },
  layout: 'AppLayout'
}
</script>