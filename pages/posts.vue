<template>
    <div>
        <div>
          <Posts />
        </div>
        <v-btn depressed color="error" @click="goBack">
          Back
        </v-btn>
        <router-link to="/login"> go to login </router-link>
        <v-btn depressed color="error" @click="logOut">
          LogOut
        </v-btn>
    </div>
</template>

<script>
import Posts from '../components/Posts.vue';

export default {
  fetch ({store}) {
    // const posts = require('../assets/data/posts.json');
    // store.commit('posts/updateCardList', posts);
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    },
    logOut () {
      this.$store.dispatch('user/signOut');
      console.log('log out');
    }
  },
  components: {
    Posts
  },
  layout: 'AppLayout'
}
</script>