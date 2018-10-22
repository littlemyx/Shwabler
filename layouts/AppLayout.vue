<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-text="user"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="exit">
          <v-list-tile-action>
            <v-icon v-html="exit_icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Exit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="dark-grey" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Shwabler</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer color="grey" app>
      <span class="white--text">&copy; 6:31 am </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: "black"
    }
  },
  data() {
    return {
      exit_icon: "exit_to_app",
      clipped: false,
      drawer: null,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    items() {
      console.log(this.$store)
      console.log(this.$store.state)
      return this.$store.state.sidebar.items.filter(
        item => item.isAuth === !!this.$store.state.user.user
      ) // getters['sidebar/getItems'];
    },
    user() {
      return this.$store.getters["user/activeUser"]
    }
  },
  methods: {
    exit() {
      this.$store.dispatch("user/signOut").then(() => {
        this.$router.push("/login")
        console.log("exit applayout")
      })
    }
  }
}
</script>
