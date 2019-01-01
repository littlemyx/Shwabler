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
          <v-list-tile-action>
            <v-icon @click.stop="drawer = !drawer" v-html="arrow_left"/>
          </v-list-tile-action>
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
      <v-toolbar-title>SHWABLER</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer color="grey" app>
      <span class="white--text">&copy;&nbsp;</span>
      <span class="white--text digitalText"> 6<span class="blinking">:</span>31 AM </span>
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
      arrow_left: "arrow_left",
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

<style>
@font-face {
  font-family: DS;
  src: url(/assets/fonts/DS-Digital.otf);
}

.blinking {
  animation: blink 1s infinite;
}

.digitalText {
  font-family: DS;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
>
