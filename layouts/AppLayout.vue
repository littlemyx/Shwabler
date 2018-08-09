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
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="exit">
          <v-list-tile-action>
            <v-icon v-html="exit_icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Exit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="dark-grey" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Shwabler</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="grey" app>
      <span class="white--text">&copy; Its your app</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        exit_icon: 'exit_to_app',
        clipped: false,
        drawer: null,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    computed: {
      items () {
        console.log(this.$store);
        console.log(this.$store.state);
        return this.$store.state.sidebar.items.filter(item => item.isAuth === !!this.$store.state.user.user);// getters['sidebar/getItems'];
      }
    },
    methods: {
      exit () {
        this.$store.dispatch('user/signOut').then(() => {
          this.$router.push('/login');
          console.log('exit applayout');
        });
      }
    },
    props: {
      source: String
    }
  }
</script>