<template>
  <div>
    <WardrobeList />
  </div>
</template>

<router lang="yaml">
    path: /tutorial/dialogs
</router>

<script>
import WardrobeList from "@/components/Tutorial/WardrobeList.vue"

export default {
  // fetch({ store }) {
  //   // const list = require('../assets/data/userList.json');
  //   // store.commit('userList/updateUserList', list);
  // },
  components: {
    WardrobeList
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/")
    },
    logOut() {
      this.$store.dispatch("user/signOut")
      console.log("log out")
    }
  },
  layout: "Tutorial"
}
</script>
