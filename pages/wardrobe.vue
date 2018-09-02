<template>
    <div>
      <WardrobeList />
    </div>
</template>

<script>
import WardrobeList from '../components/WardrobeList.vue';

export default {
  fetch ({store}) {
    const list = require('../assets/data/userList.json');
    store.commit('userList/updateUserList', list);
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
    WardrobeList
  },
  layout: 'AppLayout'
}
</script>