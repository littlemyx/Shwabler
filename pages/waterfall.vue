<template>
    <div>
        <div>
          <Waterfall />
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
import Waterfall from '../components/Waterfall.vue';

export default {
  fetch ({store}) {
    // const waterfall = require('../assets/data/waterfall.json');
    // store.commit('waterfall/updateCardList', waterfall);
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
    Waterfall
  },
  layout: 'AppLayout'
}
</script>